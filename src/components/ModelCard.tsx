'use client';

import React from 'react';
import { Model, Tier } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Sparkles, 
  Zap, 
  Clock, 
  Layers, 
  ExternalLink, 
  Info, 
  Check, 
  Swords, 
  DollarSign, 
  BookOpen 
} from 'lucide-react';

interface ModelCardProps {
  model: Model;
  onSelectDetails: (model: Model) => void;
  onSelectCompare?: (model: Model) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  onSelectDetails,
  onSelectCompare,
}) => {
  const { language, t } = useLanguage();
  const { formatPrice, currency } = useCurrency();

  const getTierBadgeStyle = (tier: Tier) => {
    switch (tier) {
      case 'S':
        return 'bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-red-500/20';
      case 'A':
        return 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold shadow-amber-500/20';
      case 'B':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/20';
      case 'C':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/20';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  const getSpeedLabel = (speed: number) => {
    if (speed >= 150) return language === 'vi' ? '⚡ Siêu nhanh (Gấp 5x đọc)' : '⚡ Ultra-Fast (5x reading)';
    if (speed >= 90) return language === 'vi' ? '🚀 Nhanh mượt (Gấp 3x đọc)' : '🚀 Fast & Smooth';
    if (speed >= 50) return language === 'vi' ? '⏱️ Tiêu chuẩn' : '⏱️ Standard';
    return language === 'vi' ? '🧠 Chậm vì suy nghĩ sâu' : '🧠 Deep Thinking Delay';
  };

  const formatContextReadable = (tokens: number) => {
    if (tokens >= 2000000) return '2M token (~40 cuốn sách)';
    if (tokens >= 1000000) return '1M token (~20 cuốn sách)';
    if (tokens >= 200000) return '200k token (~300 trang A4)';
    if (tokens >= 128000) return '128k token (~200 trang A4)';
    return `${(tokens / 1000).toFixed(0)}k token`;
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-violet-900/10">
      <div>
        {/* Card Header: Creator, Name & Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {model.creator}
              </span>
              {model.isOpenWeights && (
                <span className="rounded-md bg-cyan-950 px-1.5 py-0.5 text-[10px] font-medium text-cyan-300 border border-cyan-800/40">
                  {t.card.openWeights}
                </span>
              )}
              {model.isFreeTierAvailable && (
                <span className="rounded-md bg-emerald-950 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-800/40">
                  Free
                </span>
              )}
            </div>
            <h3 className="mt-1 text-lg font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors truncate">
              {model.name}
            </h3>
          </div>

          {/* Tier Badge */}
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-black shadow-lg ${getTierBadgeStyle(model.tier)}`}>
            {model.tier}
          </div>
        </div>

        {/* Custom Special Highlight Badge */}
        {model.badge && (
          <div className="mt-2.5">
            <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium border ${model.badge.color}`}>
              {language === 'vi' ? model.badge.vi : model.badge.en}
            </span>
          </div>
        )}

        {/* Human-Friendly Summary */}
        <p className="mt-3 text-xs leading-relaxed text-slate-300 line-clamp-3">
          {language === 'vi' ? model.vietnameseSummary : model.englishSummary}
        </p>

        {/* Visual Metric Gauges */}
        <div className="mt-4 space-y-2.5 border-t border-slate-800/80 pt-3">
          {/* Vietnamese Fluency Gauge */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span>🇻🇳</span> {t.card.vietnameseFluency}
              </span>
              <span className="font-bold text-emerald-400">{model.vietnameseRating}/100</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${model.vietnameseRating}%` }}
              />
            </div>
          </div>

          {/* Practical Intelligence Score */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-violet-400" /> {t.card.intelligence}
              </span>
              <span className="font-bold text-violet-300">{model.intelligenceScore}/100</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all duration-500"
                style={{ width: `${model.intelligenceScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Practical Performance Quick Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/60 text-xs">
          {/* Speed */}
          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Zap className="h-3 w-3 text-amber-400" /> {t.card.speed}
            </span>
            <span className="font-bold text-white mt-0.5">
              {model.outputSpeed} <span className="font-normal text-[10px] text-slate-400">{t.card.tokensPerSec}</span>
            </span>
            <span className="text-[10px] text-amber-300/80 truncate">{getSpeedLabel(model.outputSpeed)}</span>
          </div>

          {/* Pricing */}
          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <DollarSign className="h-3 w-3 text-emerald-400" /> {t.card.costOutput}
            </span>
            <span className="font-bold text-emerald-400 mt-0.5 truncate">
              {formatPrice(model.outputPricePerMillionUSD)}
            </span>
            <span className="text-[10px] text-slate-500">{t.card.per1M}</span>
          </div>
        </div>

        {/* Memory Capacity */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <Layers className="h-3 w-3 text-cyan-400" /> {t.card.context}:
          </span>
          <span className="font-medium text-slate-200">
            {formatContextReadable(model.contextWindow)}
          </span>
        </div>

        {/* Recommended For Highlights */}
        <div className="mt-3.5 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">{t.card.bestForLabel}</span>
          <ul className="space-y-1 text-xs text-slate-300">
            {(language === 'vi' ? model.bestFor.vi : model.bestFor.en).slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2">
        <button
          onClick={() => onSelectDetails(model)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700 hover:border-slate-600"
        >
          <Info className="h-3.5 w-3.5 text-violet-400" />
          {t.card.viewDetails}
        </button>

        {model.playgroundUrl && (
          <a
            href={model.playgroundUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-violet-600/20 p-2 text-violet-300 border border-violet-500/30 hover:bg-violet-600/30 hover:text-white transition-colors"
            title={t.card.tryOfficial}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}

        {onSelectCompare && (
          <button
            onClick={() => onSelectCompare(model)}
            className="inline-flex items-center justify-center rounded-xl bg-slate-800 p-2 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
            title={language === 'vi' ? 'Đưa vào so sánh 1-đối-1' : 'Compare 1-vs-1'}
          >
            <Swords className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
