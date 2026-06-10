import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis if variables exist
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Create a sliding window ratelimiter (100 requests per 1 hr per IP)
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(100, '1 h'),
      analytics: false,
    })
  : null;

export async function GET(req: Request) {
  try {
    // Rate Limiting Check (Upstash Redis)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (ratelimit) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    const publicDir = path.join(process.cwd(), 'public');
    const files = fs.readdirSync(publicDir);
    
    // Filter C_Bottle*.png and S_Bottle*.png files and sort them naturally
    const bottleFiles = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        const isWebp = ext === '.webp';
        const isBottle = file.startsWith('C_Bottle') || file.startsWith('S_Bottle');
        return isWebp && isBottle;
      })
      .sort((a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
      });
      
    return NextResponse.json(
      { success: true, bottles: bottleFiles },
      { 
        headers: { 
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' 
        } 
      }
    );
  } catch (error: unknown) {
    console.error('Error listing dynamic bottle assets:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to read public assets folder';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
