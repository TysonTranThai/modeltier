import { NextResponse } from 'next/server';
import { PROVIDERS_DATA } from '@/data/providers';

export async function GET() {
  // Add live dynamic telemetry jitter
  const liveTelemetry = PROVIDERS_DATA.map((p) => {
    const jitterLatency = Math.max(80, p.avgLatencyMs + Math.floor((Math.random() - 0.5) * 30));
    const jitterThroughput = Math.max(30, p.throughputTps + Math.floor((Math.random() - 0.5) * 10));
    return {
      ...p,
      avgLatencyMs: jitterLatency,
      throughputTps: jitterThroughput,
      updatedAt: new Date().toISOString(),
    };
  });

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    providers: liveTelemetry,
  });
}
