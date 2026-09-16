import { NextResponse } from 'next/server';
import { MODELS_DATA } from '@/data/models';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  let tier: string | null = null;
  let search: string | null = null;
  let sort: string | null = null;

  try {
    const { searchParams } = new URL(request.url);
    tier = searchParams.get('tier');
    search = searchParams.get('search');
    sort = searchParams.get('sort');
  } catch {
    // static export fallback: return all models
  }

  let models = [...MODELS_DATA];

  if (tier) {
    models = models.filter((m) => m.tier.toLowerCase() === tier.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    models = models.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.creator.toLowerCase().includes(q) ||
        m.vietnameseSummary.toLowerCase().includes(q) ||
        m.englishSummary.toLowerCase().includes(q)
    );
  }

  if (sort === 'speed') {
    models.sort((a, b) => b.outputSpeed - a.outputSpeed);
  } else if (sort === 'price') {
    models.sort((a, b) => a.outputPricePerMillionUSD - b.outputPricePerMillionUSD);
  } else if (sort === 'vietnamese') {
    models.sort((a, b) => b.vietnameseRating - a.vietnameseRating);
  } else if (sort === 'intelligence') {
    models.sort((a, b) => b.intelligenceScore - a.intelligenceScore);
  }

  return NextResponse.json({
    total: models.length,
    models,
    updatedAt: new Date().toISOString(),
  });
}
