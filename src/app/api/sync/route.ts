import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

let activeSyncPromise: Promise<any> | null = null;

export async function POST() {
  try {
    // Dynamically require and run scrapeAll
    const { scrapeAll } = require('../../../../scripts/scrape-artificialanalysis');
    if (!activeSyncPromise) {
      activeSyncPromise = scrapeAll().finally(() => {
        activeSyncPromise = null;
      });
    }
    const result = await activeSyncPromise;

    return NextResponse.json({
      success: true,
      message: 'Successfully pulled fresh data from artificialanalysis.ai',
      totalModels: result.totalModels,
      syncedAt: result.syncedAt,
      durationMs: result.durationMs,
      data: result,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
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
