import { NextResponse } from 'next/server';
import { MODELS_DATA } from '@/data/models';
import { RecommendationForm } from '@/types';

export async function POST(request: Request) {
  try {
    const body: RecommendationForm = await request.json();

    const scored = MODELS_DATA.map((model) => {
      let score = 50;

      // Use case
      if (body.useCase === 'coding') score += (model.codingScore - 80) * 2;
      else if (body.useCase === 'writing') score += (model.vietnameseRating - 80) * 2.5;
      else if (body.useCase === 'cskh') {
        score += model.outputSpeed / 10;
        score += (10 - Math.min(10, model.outputPricePerMillionUSD)) * 3;
      } else if (body.useCase === 'long_doc' && model.contextWindow >= 1000000) {
        score += 35;
      } else if (body.useCase === 'study') {
        score += (model.reasoningScore - 80) * 2;
      } else {
        score += (model.intelligenceScore - 80) * 1.5;
      }

      // Budget
      if (body.budget === 'free') {
        score += model.isFreeTierAvailable ? 25 : -35;
      } else if (body.budget === 'ultra_cheap') {
        if (model.outputPricePerMillionUSD <= 1.0) score += 30;
      }

      // Priority
      if (body.priority === 'smartest') score += (model.intelligenceScore - 85) * 2.5;
      if (body.priority === 'vietnamese_best') score += (model.vietnameseRating - 85) * 3;
      if (body.priority === 'fastest') score += model.outputSpeed / 8;
      if (body.priority === 'reasoning') score += (model.reasoningScore - 85) * 3;

      const matchScore = Math.min(99, Math.max(75, Math.round(score)));

      return {
        model,
        matchScore,
      };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      recommendations: scored.slice(0, 3),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
