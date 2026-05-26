import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
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
      
    return NextResponse.json({ success: true, bottles: bottleFiles });
  } catch (error: any) {
    console.error('Error listing dynamic bottle assets:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to read public assets folder' },
      { status: 500 }
    );
  }
}
