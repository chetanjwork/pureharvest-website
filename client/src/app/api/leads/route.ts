import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Lead from '@/models/Lead';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

const leadSchema = z.object({
  refId: z.string().optional(),
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email").max(150),
  phone: z.string().max(20).optional(),
  whatsapp: z.string().max(20).optional(),
  company: z.string().max(100).optional(),
  industry: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
  orderType: z.enum(['recurring', 'event', 'onetime']).optional(),
  volume: z.string().max(50).optional(),
  customization: z.array(z.string()).optional(),
  message: z.string().max(2000).optional(),
  eventDate: z.string().max(50).optional(),
  gstNumber: z.string().max(50).optional(),
  requestSample: z.boolean().optional(),
  targetSheet: z.string().max(50).optional(),
  leadSource: z.string().max(100).optional(),
  logoName: z.string().max(255).optional(),
  logoBase64: z.string().optional(),
  _honey: z.string().optional()
}).passthrough();

// Initialize Redis if variables exist
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Create a sliding window ratelimiter (5 requests per 15 mins per IP)
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true,
    })
  : null;

// Helper for Google Sheets fetch with exponential backoff & 10s timeout
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`Google Sheets returned ${res.status}`);
      }
      return res;
    } catch (error: unknown) {
      attempt++;
      if (attempt >= maxRetries) throw error;
      // Exponential backoff: 1s, 2s, 4s...
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
    }
  }
}

export async function POST(req: Request) {
  try {
    // 1. Parse Body
    const rawBody = await req.json();

    // 2. Strict Zod Validation (Prevents NoSQL injection & dirty data)
    const validation = leadSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json({ success: false, error: 'Invalid payload format', details: validation.error.format() }, { status: 400 });
    }
    const body = validation.data;

    // 3. Honeypot & Basic Bot Protection
    const userAgent = req.headers.get('user-agent') || '';
    if (body._honey || userAgent.length < 10 || userAgent.toLowerCase().includes('curl')) {
      console.warn('Bot detected by honeypot or UA', { ip: req.headers.get('x-forwarded-for') });
      // Return fake success to confuse the bot
      return NextResponse.json({ success: true, message: 'Saved successfully' }, { status: 201 });
    }

    // 3. Rate Limiting Check (Upstash Redis)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (ratelimit) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    }

    // 3. Save to MongoDB (Source of Truth)
    let newLead: Record<string, unknown> & { _id?: string } | null = null;
    try {
      await connectToDatabase();
      newLead = await Lead.create(body);
    } catch (dbError: unknown) {
      if (process.env.NODE_ENV !== 'production') {
        // Keep MongoDB silent in production as Sheets is the primary backend
        console.warn('MongoDB save failed. Proceeding to fallback Sheets:', dbError instanceof Error ? dbError.message : 'Unknown error');
      }
    }

    // 4. Send to Google Sheets (Drive Upload)
    let finalLogoUrl = null;
    if (process.env.GOOGLE_SCRIPT_URL) {
      try {
        const sheetPayload = {
          refId: body.refId || 'UNKNOWN',
          name: body.name || '',
          brand: body.company || '',
          email: body.email || '',
          whatsapp: body.whatsapp ? "'" + body.whatsapp : '', // Force text format
          orderType: body.orderType || 'recurring',
          bottleSelection: `${body.industry || ''} | ${body.volume || ''}`,
          extrasSelected: (body.customization && body.customization.length > 0) ? body.customization.join(', ') : 'None',
          city: body.city || '',
          gstNumber: body.gstNumber || '',
          eventDate: body.eventDate || '',
          requestSample: body.requestSample ? 'Yes' : 'No',
          message: body.message || '',
          phone: body.phone ? "'" + body.phone : '',
          targetSheet: body.targetSheet || 'Sheet1',
          fileName: body.logoName || '',
          base64: body.logoBase64 || '',
          mimeType: body.logoName ? `image/${body.logoName.split('.').pop()}` : '',
          leadSource: body.leadSource || 'Website Form',
          createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
        };

        const sheetResponse = await fetchWithRetry(process.env.GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload),
          redirect: 'follow', // App Script requires 302 follow
        });

        if (!sheetResponse) {
          throw new Error('No response from Google Sheets');
        }

        const responseText = await sheetResponse.text();
        let sheetData: Record<string, unknown> & { logoUrl?: string } = {};
        try {
          sheetData = JSON.parse(responseText);
        } catch {
          // If response isn't JSON, still treat as success but without logo URL
          console.warn('Google Sheets returned non-JSON:', responseText);
        }

        finalLogoUrl = sheetData.logoUrl || null;

        // If Drive upload succeeded, update MongoDB
        if (finalLogoUrl && newLead && newLead._id) {
          await Lead.findByIdAndUpdate(newLead._id, { logoUrl: finalLogoUrl });
        }
      } catch (sheetError: unknown) {
        console.error('Google Sheets/Drive Error:', sheetError);

        // Requirements: If Drive upload fails, save anyway, mark logoUrl as UPLOAD_FAILED, do not block submission.
        if (newLead && newLead._id && body.logoBase64) {
          await Lead.findByIdAndUpdate(newLead._id, { logoUrl: 'UPLOAD_FAILED' });
        }
      }
    }

    // 5. Return Success
    if (newLead) {
      return NextResponse.json({ success: true, data: newLead, logoUrl: finalLogoUrl }, { status: 201 });
    } else {
      // If MongoDB failed but Sheets succeeded (fallback)
      return NextResponse.json({ success: true, message: 'Saved to Sheets fallback', logoUrl: finalLogoUrl }, { status: 201 });
    }

  } catch (error: unknown) {
    console.error('Lead Submission Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
