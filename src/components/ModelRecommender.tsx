'use client';

import React, { useState } from 'react';
import { Model, RecommendationForm } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Compass, 
  Target, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle, 
  Flame, 
  ChevronRight,
  HelpCircle,
  ThumbsUp
} from 'lucide-react';

interface ModelRecommenderProps {
  models: Model[];
  onSelectDetails: (model: Model) => void;
}

interface RecommendationResult {
  model: Model;
  matchScore: number;
  reason: {
    vi: string;
    en: string;
  };
}

export const ModelRecommender: React.FC<ModelRecommenderProps> = ({
  models,
  onSelectDetails,
}) => {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [form, setForm] = useState<RecommendationForm>({
    useCase: 'general',
    budget: 'balanced',
    priority: 'best_value',
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [results, setResults] = useState<RecommendationResult[]>([]);

  const calculateRecommendations = () => {
    const scored = models.map((model) => {
      let score = 50;
      let reasonVi = '';
      let reasonEn = '';

      // 1. Use Case Scoring
      switch (form.useCase) {
        case 'coding':
          score += (model.codingScore - 80) * 2;
          if (model.codingScore >= 95) {
            reasonVi = 'Khả năng lập trình và sửa lỗi đứng top đầu thế giới, viết code cực sạch.';
            reasonEn = 'World-class coding and debugging capability with clean output syntax.';
          }
          break;
        case 'writing':
          score += (model.vietnameseRating - 80) * 2.5;
          if (model.vietnameseRating >= 94) {
            reasonVi = 'Văn phong tiếng Việt trôi chảy, tự nhiên như người bản xứ, giàu cảm xúc.';
            reasonEn = 'Natural, fluent native-grade prose without translation stiffness.';
          }
          break;
        case 'cskh':
          // Prioritize speed + low cost
          score += (model.outputSpeed / 10);
          score += (10 - Math.min(10, model.outputPricePerMillionUSD)) * 3;
          reasonVi = 'Tốc độ phản hồi tức thì và chi phí cực thấp, lý tưởng để vận hành hàng ngàn tin nhắn khách hàng.';
          reasonEn = 'Sub-second reply latency and rock-bottom API costs, ideal for high-volume customer messages.';
          break;
        case 'long_doc':
          if (model.contextWindow >= 1000000) {
            score += 40;
            reasonVi = 'Bộ nhớ ngữ cảnh khủng (hàng triệu token), đọc nuốt trọn toàn bộ sách và tài liệu dày.';
            reasonEn = 'Massive million-token context window that digests entire books and documents effortlessly.';
          } else if (model.contextWindow >= 200000) {
            score += 20;
          }
          break;
        case 'study':
          score += (model.reasoningScore - 80) * 1.5;
          score += (model.vietnameseRating - 80);
          reasonVi = 'Giải thích kiến thức mạch lạc, tư duy toán học và khoa học tốt.';
          reasonEn = 'Clear instructional breakdowns, strong STEM and logic fundamentals.';
          break;
        default:
          score += (model.intelligenceScore - 80) * 1.5;
          reasonVi = 'Mô hình toàn diện, xử lý mượt mà hầu hết mọi câu hỏi thường nhật.';
          reasonEn = 'Well-rounded general assistant that handles varied daily prompts smoothly.';
      }

      // 2. Budget Scoring
      if (form.budget === 'free') {
        if (model.isFreeTierAvailable) score += 25;
        else score -= 40;
      } else if (form.budget === 'ultra_cheap') {
        if (model.outputPricePerMillionUSD <= 1.0) score += 30;
        else if (model.outputPricePerMillionUSD <= 3.0) score += 10;
        else score -= 25;
      } else if (form.budget === 'unlimited') {
        score += (model.intelligenceScore - 85) * 2;
      }

      // 3. Priority Scoring
      if (form.priority === 'smartest') {
        score += (model.intelligenceScore - 85) * 2.5;
      } else if (form.priority === 'vietnamese_best') {
        score += (model.vietnameseRating - 85) * 3;
      } else if (form.priority === 'fastest') {
        score += (model.outputSpeed / 8);
      } else if (form.priority === 'reasoning') {
        score += (model.reasoningScore - 85) * 3;
      } else if (form.priority === 'best_value') {
        // Price to performance ratio
        const pToP = model.intelligenceScore / (model.outputPricePerMillionUSD + 0.5);
        score += pToP * 1.5;
      }

      // Cap match score between 75 and 99%
      const matchScore = Math.min(99, Math.max(75, Math.round(score)));

      return {
        model,
        matchScore,
        reason: {
          vi: reasonVi || model.vietnameseSummary,
          en: reasonEn || model.englishSummary,
        },
      };
    });

    // Sort descending and take top 3
    scored.sort((a, b) => b.matchScore - a.matchScore);
    setResults(scored.slice(0, 3));
    setHasSubmitted(true);
  };

  const handleReset = () => {
    setHasSubmitted(false);
    setResults([]);
  };

  return (
    <section id="finder" className="py-14 lg:py-20 bg-[#180D07] border-y border-[#3D2216] scroll-mt-28 relative overflow-hidden w-full max-w-full">
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#FF6B35]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-sm bg-indigo-500/10 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-300 border border-indigo-500/20 mb-3">
            <Compass className="h-4 w-4" />
            <span>{language === 'vi' ? 'Trợ lý gợi ý thông minh' : 'Smart AI Finder'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFF6EE] tracking-tight">
            {t.recommender.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A89280]">
            {t.recommender.subtitle}
          </p>
        </div>

        {/* Wizard Form */}
        {!hasSubmitted ? (
          <div className="max-w-3xl mx-auto rounded-lg border border-[#3D2216] bg-[#24130C]/90 p-4 sm:p-10 shadow-2xl backdrop-blur-xl w-full max-w-full overflow-hidden">
            <div className="space-y-8">
              {/* Question 1: Use Case */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-[#FFF6EE] mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#FF6B35] font-mono text-xs font-bold text-[#FFF6EE]">1</span>
                  {t.recommender.q1Title}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(Object.keys(t.recommender.q1Options) as (keyof typeof t.recommender.q1Options)[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm({ ...form, useCase: key as any })}
                      className={`flex items-start text-left p-3.5 rounded-sm border text-xs sm:text-sm transition-all ${
                        form.useCase === key
                          ? 'border-[#FF6B35] bg-[#FF6B35]/15 text-[#FFF6EE] font-medium ring-1 ring-[#FF6B35]/50'
                          : 'border-[#3D2216] bg-[#180D07] text-[#D8C4B6] hover:border-[#FF6B35]/40 hover:bg-[#24130C]'
                      }`}
                    >
                      <div className="flex-1 leading-snug">
                        {t.recommender.q1Options[key]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Budget */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-[#FFF6EE] mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#FF6B35] font-mono text-xs font-bold text-[#FFF6EE]">2</span>
                  {t.recommender.q2Title}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(Object.keys(t.recommender.q2Options) as (keyof typeof t.recommender.q2Options)[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm({ ...form, budget: key as any })}
                      className={`flex items-start text-left p-3.5 rounded-sm border text-xs sm:text-sm transition-all ${
                        form.budget === key
                          ? 'border-[#FF6B35] bg-[#FF6B35]/15 text-[#FFF6EE] font-medium ring-1 ring-[#FF6B35]/50'
                          : 'border-[#3D2216] bg-[#180D07] text-[#D8C4B6] hover:border-[#FF6B35]/40 hover:bg-[#24130C]'
                      }`}
                    >
                      <div className="flex-1 leading-snug">
                        {t.recommender.q2Options[key]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Priority */}
              <div>
                <label className="block text-sm sm:text-base font-bold text-[#FFF6EE] mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#FF6B35] font-mono text-xs font-bold text-[#FFF6EE]">3</span>
                  {t.recommender.q3Title}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(Object.keys(t.recommender.q3Options) as (keyof typeof t.recommender.q3Options)[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm({ ...form, priority: key as any })}
                      className={`flex items-start text-left p-3.5 rounded-sm border text-xs sm:text-sm transition-all ${
                        form.priority === key
                          ? 'border-[#FF6B35] bg-[#FF6B35]/15 text-[#FFF6EE] font-medium ring-1 ring-[#FF6B35]/50'
                          : 'border-[#3D2216] bg-[#180D07] text-[#D8C4B6] hover:border-[#FF6B35]/40 hover:bg-[#24130C]'
                      }`}
                    >
                      <div className="flex-1 leading-snug">
                        {t.recommender.q3Options[key]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#3D2216] flex justify-center">
                <button
                  type="button"
                  onClick={calculateRecommendations}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-[#FF6B35] to-[#E64A19] px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-[#FFF6EE] shadow-glow-orange hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  {t.recommender.submitBtn}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFF6EE] flex items-center gap-2">
                <Target className="h-6 w-6 text-[#FF8452]" />
                {t.recommender.resultsTitle}
              </h3>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-sm border border-[#3D2216] bg-[#24130C] px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#D8C4B6] hover:bg-[#2E170E] hover:text-[#FFF6EE] hover:border-[#FF6B35]/40 transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t.recommender.resetBtn}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-full">
              {results.map((item, index) => {
                const rankLabels = ['🥇 Quán Quân', '🥈 Á Quân 1', '🥉 Á Quân 2'];
                const rankLabelsEn = ['🥇 Top Match', '🥈 2nd Pick', '🥉 3rd Pick'];
                const isTop = index === 0;

                return (
                  <div
                    key={item.model.id}
                    className={`relative rounded-sm border p-4 sm:p-6 flex flex-col justify-between transition-all w-full max-w-full overflow-hidden ${
                      isTop
                        ? 'border-[#FF6B35] bg-[#24130C]/95 shadow-2xl shadow-glow-orange ring-1 ring-[#FF6B35]'
                        : 'border-[#3D2216] bg-[#24130C]/80'
                    }`}
                  >
                    {/* Rank Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center rounded-sm px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider ${
                        isTop ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-[#180D07] border border-[#3D2216] text-[#D8C4B6]'
                      }`}>
                        {language === 'vi' ? rankLabels[index] : rankLabelsEn[index]}
                      </span>
                      <span className="rounded-sm bg-emerald-950 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400 border border-emerald-800/40">
                        {item.matchScore}% {language === 'vi' ? 'Hợp' : 'Match'}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-mono font-semibold text-[#A89280] uppercase tracking-wider">
                        {item.model.creator} • {item.model.tier}-Tier
                      </div>
                      <h4 className="text-xl font-black text-[#FFF6EE] mt-1">
                        {item.model.name}
                      </h4>

                      {/* Why Recommended */}
                      <div className="mt-4 rounded-sm bg-[#180D07] p-3.5 border border-[#3D2216]/60">
                        <span className="text-[11px] font-mono font-bold text-[#FF8452] uppercase tracking-wider block mb-1 flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {t.recommender.whyRecommended}
                        </span>
                        <p className="text-xs text-[#D8C4B6] leading-relaxed">
                          {language === 'vi' ? item.reason.vi : item.reason.en}
                        </p>
                      </div>

                      {/* Quick Snapshot Metrics */}
                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="rounded-sm bg-[#180D07] border border-[#2E170E] p-2 text-center">
                          <span className="text-[10px] text-[#A89280] block font-sans">🇻🇳 Tiếng Việt</span>
                          <span className="font-bold text-emerald-400">{item.model.vietnameseRating}/100</span>
                        </div>
                        <div className="rounded-sm bg-[#180D07] border border-[#2E170E] p-2 text-center">
                          <span className="text-[10px] text-[#A89280] block font-sans">⚡ Tốc độ</span>
                          <span className="font-bold text-amber-400">{item.model.outputSpeed} tps</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t border-[#3D2216]">
                      <button
                        onClick={() => onSelectDetails(item.model)}
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-sm bg-gradient-to-r from-[#FF6B35] to-[#E64A19] px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-glow-orange hover:brightness-110 active:scale-[0.98] transition-all"
                      >
                        {t.card.viewDetails}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
