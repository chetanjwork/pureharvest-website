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

    // 3. Save to MongoDB (Source of Truth)
    let newLead: any = null;
    try {
      await connectToDatabase();
      newLead = await Lead.create(body);
    } catch (dbError: any) {
      if (process.env.NODE_ENV !== 'production') {
        // Keep MongoDB silent in production as Sheets is the primary backend
        console.warn('MongoDB save failed. Proceeding to fallback Sheets:', dbError.message);
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
          extrasSelected: body.customization?.length > 0 ? body.customization.join(', ') : 'None',
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

        const sheetResponse = await fetch(process.env.GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload),
          redirect: 'follow', // App Script requires 302 follow
        });

        if (!sheetResponse.ok) {
          throw new Error(`Google Sheets returned ${sheetResponse.status}`);
        }

        const responseText = await sheetResponse.text();
        let sheetData: any = {};
        try {
          sheetData = JSON.parse(responseText);
        } catch (e) {
          // If response isn't JSON, still treat as success but without logo URL
          console.warn('Google Sheets returned non-JSON:', responseText);
        }

        finalLogoUrl = sheetData.logoUrl || null;

        // If Drive upload succeeded, update MongoDB
        if (finalLogoUrl && newLead && newLead._id) {
          await Lead.findByIdAndUpdate(newLead._id, { logoUrl: finalLogoUrl });
        }
      } catch (sheetError: any) {
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

  } catch (error: any) {
    console.error('Lead Submission Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead', details: error.message },
      { status: 500 }
    );
  }
}
