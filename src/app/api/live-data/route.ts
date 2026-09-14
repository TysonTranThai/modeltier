import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const liveDataFile = path.join(process.cwd(), 'src', 'data', 'live_data.json');
    if (fs.existsSync(liveDataFile)) {
      const data = JSON.parse(fs.readFileSync(liveDataFile, 'utf8'));
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: 'Live data file not yet generated' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
