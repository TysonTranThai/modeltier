import { ScrapedModel, Model, Tier } from '../types';
import { MODELS_DATA } from './models';

function parseContextTokens(str: string): number {
  if (!str) return 128000;
  const lower = str.toLowerCase().trim();
  if (lower.includes('m')) {
    const num = parseFloat(lower.replace('m', ''));
    return isNaN(num) ? 1000000 : Math.round(num * 1000000);
  }
  if (lower.includes('k')) {
    const num = parseFloat(lower.replace('k', ''));
    return isNaN(num) ? 128000 : Math.round(num * 1000);
  }
  const num = parseInt(lower, 10);
  return isNaN(num) ? 128000 : num;
}

export function buildUnifiedModels(
  scrapedModels: ScrapedModel[],
  curatedModels: Model[] = MODELS_DATA
): Model[] {
  if (!scrapedModels || scrapedModels.length === 0) {
    return curatedModels;
  }

  // Create lookup for curated models
  const curatedMap = new Map<string, Model>();
  for (const cm of curatedModels) {
    curatedMap.set(cm.id.toLowerCase(), cm);
    const cleanId = cm.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    curatedMap.set(cleanId, cm);
  }

  const seenIds = new Set<string>();
  const unified: Model[] = [];

  // 1. Process all scraped models (full catalog of 650+ models)
  for (const sm of scrapedModels) {
    const smId = (sm.slug || sm.id).toLowerCase();
    const cleanSmId = smId.replace(/[^a-z0-9]/g, '');

    let curated = curatedMap.get(smId) || curatedMap.get(cleanSmId);

    if (!curated) {
      for (const cm of curatedModels) {
        const cmId = cm.id.toLowerCase();
        if (smId.includes(cmId) || cmId.includes(smId)) {
          curated = cm;
          break;
        }
      }
    }

    if (curated) {
      // Merge curated with live scraped measurements
      seenIds.add(curated.id);
      unified.push({
        ...curated,
        // Update live benchmarks from scraper
        intelligenceScore: sm.intelligenceScore > 0 ? Math.round(sm.intelligenceScore) : curated.intelligenceScore,
        outputSpeed: sm.outputSpeed > 0 ? Math.round(sm.outputSpeed) : curated.outputSpeed,
        timeToFirstToken: sm.latencyFirstChunk > 0 ? sm.latencyFirstChunk : curated.timeToFirstToken,
        outputPricePerMillionUSD: sm.costPerTaskUSD > 0 ? Number((sm.costPerTaskUSD * 1.5).toFixed(2)) : curated.outputPricePerMillionUSD,
        vietnameseRating: sm.vietnameseRating > 0 ? sm.vietnameseRating : curated.vietnameseRating,
        tier: sm.tier || curated.tier,
        creatorLogo: sm.creatorLogo || curated.creatorLogo,
        releaseDate: sm.releaseDate || curated.releaseDate,
        officialUrl: sm.url || curated.officialUrl,
        playgroundUrl: sm.providersUrl || curated.playgroundUrl,
      });
    } else {
      // Synthesize rich Model from ScrapedModel
      const parsedContext = parseContextTokens(sm.contextWindow);
      const isHighSpeed = sm.outputSpeed >= 100;
      const isBudget = sm.costPerTaskUSD <= 1.0;
      const isElite = sm.intelligenceScore >= 42;
      const isReasoning = sm.isReasoning || sm.name.toLowerCase().includes('reason') || sm.name.toLowerCase().includes('r1') || sm.name.toLowerCase().includes('o1') || sm.name.toLowerCase().includes('o3');

      const categories: ('coding' | 'vietnamese' | 'speed' | 'budget' | 'reasoning')[] = [];
      if (isElite || sm.name.toLowerCase().includes('code')) categories.push('coding');
      if (isReasoning) categories.push('reasoning');
      if (isHighSpeed) categories.push('speed');
      if (isBudget || sm.isOpenWeights) categories.push('budget');
      if (sm.vietnameseRating >= 88) categories.push('vietnamese');
      if (categories.length === 0) categories.push('coding');

      // Best for bullets
      const bestForVi: string[] = [];
      const bestForEn: string[] = [];

      if (isHighSpeed) {
        bestForVi.push('Ứng dụng chatbot tương tác phản hồi thời gian thực');
        bestForEn.push('Real-time conversational chatbots and user agents');
      }
      if (isBudget) {
        bestForVi.push('Xử lý khối lượng tài liệu lớn với chi phí tối ưu nhất');
        bestForEn.push('High-volume document ingestion at minimal API cost');
      }
      if (sm.isOpenWeights) {
        bestForVi.push('Tự triển khai trên hạ tầng máy chủ riêng (Self-hosted)');
        bestForEn.push('Self-hosting and on-premise privacy deployments');
      }
      if (isReasoning || isElite) {
        bestForVi.push('Tư duy giải toán, suy luận logic phức tạp và lập trình chuyên sâu');
        bestForEn.push('Complex multi-step reasoning, Olympiad logic & coding');
      }
      if (bestForVi.length === 0) {
        bestForVi.push('Đa dạng tác vụ tự động hóa và xử lý ngôn ngữ hàng ngày');
        bestForEn.push('General automation and day-to-day text processing');
      }

      // Pros
      const prosVi: string[] = [
        sm.outputSpeed > 0 ? `Tốc độ phản hồi đạt ${sm.outputSpeed} tokens/s` : 'Hiệu năng xử lý ổn định',
        sm.costPerTaskUSD > 0 ? `Chi phí ước tính chỉ khoảng $${sm.costPerTaskUSD}/task` : 'Tối ưu chi phí vận hành',
      ];
      const prosEn: string[] = [
        sm.outputSpeed > 0 ? `Measured throughput of ${sm.outputSpeed} tps` : 'Consistent processing performance',
        sm.costPerTaskUSD > 0 ? `Estimated cost around $${sm.costPerTaskUSD}/task` : 'Optimized running costs',
      ];

      // Cons
      const consVi: string[] = [
        sm.outputSpeed < 40 ? 'Tốc độ phản hồi vừa phải khi sinh câu trả lời dài' : 'Cần tối ưu prompt cụ thể theo từng trường hợp',
      ];
      const consEn: string[] = [
        sm.outputSpeed < 40 ? 'Moderate output speed during extended token generation' : 'Requires task-specific prompt tuning',
      ];

      // Badge
      let badge = undefined;
      if (isElite) {
        badge = { vi: '👑 Đỉnh Cao Trí Tuệ', en: '👑 Elite Intelligence', color: 'bg-red-500/20 text-red-300 border-red-500/40' };
      } else if (isHighSpeed) {
        badge = { vi: '⚡ Siêu Tốc Độ', en: '⚡ Blazing Speed', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      } else if (isBudget) {
        badge = { vi: '💰 Giá Cực Rẻ', en: '💰 Ultra Value', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
      } else if (sm.isOpenWeights) {
        badge = { vi: '🔓 Mã Nguồn Mở', en: '🔓 Open Weights', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
      }

      unified.push({
        id: sm.slug || sm.id,
        name: sm.name,
        creator: sm.creator,
        creatorLogo: sm.creatorLogo || undefined,
        tier: sm.tier,
        category: categories,
        releaseDate: sm.releaseDate || '2024-2025',
        vietnameseSummary: `Mô hình AI ${sm.name} được phát triển bởi ${sm.creator}. Đạt điểm Intelligence Index ${sm.intelligenceScore > 0 ? sm.intelligenceScore : 'chuẩn'}/100 với tốc độ ${sm.outputSpeed > 0 ? `${sm.outputSpeed} tokens/s` : 'nhanh'}.`,
        englishSummary: `The ${sm.name} model developed by ${sm.creator}. Achieves an Intelligence Index score of ${sm.intelligenceScore > 0 ? sm.intelligenceScore : 'benchmark'}/100 with ${sm.outputSpeed > 0 ? `${sm.outputSpeed} tps` : 'fast'} output speed.`,
        intelligenceScore: sm.intelligenceScore > 0 ? Math.round(sm.intelligenceScore) : 35,
        vietnameseRating: sm.vietnameseRating,
        codingScore: Math.min(99, Math.round((sm.intelligenceScore || 25) * 1.8 + 10)),
        reasoningScore: isReasoning ? Math.min(99, Math.round((sm.intelligenceScore || 25) * 1.9 + 15)) : Math.round((sm.intelligenceScore || 25) * 1.6 + 10),
        outputSpeed: sm.outputSpeed > 0 ? Math.round(sm.outputSpeed) : 60,
        timeToFirstToken: sm.latencyFirstChunk > 0 ? sm.latencyFirstChunk : 0.8,
        inputPricePerMillionUSD: sm.costPerTaskUSD > 0 ? Number((sm.costPerTaskUSD * 0.4).toFixed(2)) : 0.2,
        outputPricePerMillionUSD: sm.costPerTaskUSD > 0 ? Number((sm.costPerTaskUSD * 1.2).toFixed(2)) : 0.6,
        isFreeTierAvailable: sm.isOpenWeights || sm.costPerTaskUSD <= 0.2,
        contextWindow: parsedContext,
        maxOutputTokens: 8192,
        bestFor: { vi: bestForVi, en: bestForEn },
        pros: { vi: prosVi, en: prosEn },
        cons: { vi: consVi, en: consEn },
        badge,
        isOpenWeights: sm.isOpenWeights,
        hasVision: sm.hasVision,
        officialUrl: sm.url,
        playgroundUrl: sm.providersUrl,
        providers: [sm.creator, 'API Provider'],
      });
    }
  }

  // 2. Add any remaining curated models that weren't in scraped catalog
  for (const cm of curatedModels) {
    if (!seenIds.has(cm.id)) {
      unified.push(cm);
    }
  }

  return unified;
}
