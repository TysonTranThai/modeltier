import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    // Dynamically require and run scrapeAll
    const { scrapeAll } = require('../../../../scripts/scrape-artificialanalysis');
    const result = await scrapeAll();

    return NextResponse.json({
      success: true,
      message: 'Successfully pulled fresh data from artificialanalysis.ai',
      totalModels: result.totalModels,
      syncedAt: result.syncedAt,
      durationMs: result.durationMs,
    });
  } catch (error: any) {
    console.error('API sync error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Sync failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return current sync status
  try {
    const statusFile = path.join(process.cwd(), 'src', 'data', 'sync_status.json');
    if (fs.existsSync(statusFile)) {
      const data = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
      return NextResponse.json(data);
    }
    return NextResponse.json({ status: 'unknown' });
  } catch (e: any) {
    return NextResponse.json({ status: 'error', error: e.message });
  }
}
