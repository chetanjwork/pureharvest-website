import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Lead from '@/models/Lead';

// Lightweight In-Memory Rate Limiter (Note: Resets on Serverless Cold Boot)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 submissions
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const requestData = rateLimitMap.get(ip);

    if (requestData) {
      if (now - requestData.timestamp < RATE_LIMIT_WINDOW) {
        if (requestData.count >= RATE_LIMIT_MAX) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429 }
          );
        }
        requestData.count += 1;
      } else {
        // Reset window
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // 2. Parse Body
    const body = await req.json();

    // 3. Optional Database Save (Gracefully fail if local DB is offline)
    let newLead = null;
    try {
      await connectToDatabase();
      newLead = await Lead.create(body);
    } catch (dbError: any) {
      console.warn('MongoDB is offline or failed. Proceeding with Google Sheets fallback. Error:', dbError.message);
    }

    // 4. Send to Google Sheets (Primary or Fallback)
    if (process.env.GOOGLE_SCRIPT_URL) {
      try {
        // Map payload to match the exact keys the App Script expects
        // Prepend apostrophe to WhatsApp so Sheets doesn't treat "+91" as a formula
        const sheetPayload = {
          name: body.name,
          brand: body.company,
          email: body.email,
          whatsapp: "'" + body.whatsapp,
          bottleSelection: `${body.industry} | ${body.volume}`,
          extrasSelected: body.customization?.length > 0 ? body.customization.join(', ') : 'None'
        };

        const sheetResponse = await fetch(process.env.GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload),
          redirect: 'follow', // App Script requires following 302 redirects
        });
        if (!sheetResponse.ok) {
          throw new Error('Google Sheets responded with an error status');
        }
      } catch (sheetError: any) {
        console.error('Google Sheets Submission Error:', sheetError);
        return NextResponse.json(
          { error: 'Failed to save to Google Sheets', details: sheetError.message },
          { status: 500 }
        );
      }
    }

    // Return success if either DB or Sheets worked
    return NextResponse.json({ success: true, data: newLead || body }, { status: 201 });
  } catch (error: any) {
    console.error('Lead Submission Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead', details: error.message },
      { status: 500 }
    );
  }
}
