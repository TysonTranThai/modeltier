'use client';

import React from 'react';
import { Model, Tier } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
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
        return 'bg-gradient-to-r from-[#FF6B35] to-amber-500 text-white font-bold shadow-glow-orange';
      case 'A':
        return 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold shadow-amber-500/20';
      case 'B':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/20';
      case 'C':
        return 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-blue-500/20';
      default:
        return 'bg-[#472718] text-white';
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
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[#472718] bg-[#24130C]/90 p-5 shadow-card-espresso transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF6B35]/80 hover:shadow-glow-orange-lg">
      <div>
        {/* Card Header: Creator, Name & Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#A89280]">
                {model.creator}
              </span>
              {model.isOpenWeights && (
                <span className="rounded-md bg-emerald-950/80 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-800/40">
                  {language === 'vi' ? 'Mở' : 'Open'}
                </span>
              )}
              {model.isFreeTierAvailable && (
                <span className="rounded-md bg-amber-950/80 px-1.5 py-0.5 text-[10px] font-medium text-amber-300 border border-amber-800/40">
                  {language === 'vi' ? 'Miễn phí' : 'Free tier'}
                </span>
              )}
            </div>
            <h3 className="mt-1 text-lg font-serif font-bold text-[#FFF6EE] truncate group-hover:text-[#FF8452] transition-colors">
              {model.name}
            </h3>
          </div>

          {/* Tier Badge */}
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-black shadow-lg ${getTierBadgeStyle(model.tier)}`}>
            {model.tier}
          </div>
        </div>

        {/* Plain Language Summary */}
        <p className="mt-3 text-xs leading-relaxed text-[#D8C4B6] line-clamp-2">
          {language === 'vi' ? model.vietnameseSummary : model.englishSummary}
        </p>

        {/* Quick Benchmark Mini-Dashboard */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-[#1A0E08] border border-[#381E12] p-3 text-xs font-mono">
          <div>
            <span className="text-[#8A7262] text-[11px] block">
              {language === 'vi' ? 'Độ thông minh' : 'Intelligence'}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-12 bg-[#2D160C] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#E64A19] to-[#FF6B35] h-full rounded-full" 
                  style={{ width: `${Math.min(100, (model.intelligenceScore / 60) * 100)}%` }} 
                />
              </div>
              <span className="font-bold text-[#FF8452] text-xs">{model.intelligenceScore.toFixed(1)}</span>
            </div>
          </div>

          <div>
            <span className="text-[#8A7262] text-[11px] block">
              {language === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-12 bg-[#2D160C] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-500 h-full rounded-full" 
                  style={{ width: `${model.vietnameseRating}%` }} 
                />
              </div>
              <span className="font-bold text-amber-400 text-xs">{model.vietnameseRating}/100</span>
            </div>
          </div>

          <div className="mt-1">
            <span className="text-[#8A7262] text-[11px] block">
              {language === 'vi' ? 'Tốc độ' : 'Speed'}
            </span>
            <span className="font-semibold text-[#FFF6EE] text-xs">
              {model.outputSpeed > 0 ? `${Math.round(model.outputSpeed)} tps` : '—'}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[#8A7262] text-[11px] block">
              {language === 'vi' ? 'Giá đầu ra' : 'Output Price'}
            </span>
            <span className="font-semibold text-emerald-400 text-xs">
              {model.outputPricePerMillionUSD === 0
                ? (language === 'vi' ? 'Miễn phí' : 'Free')
                : `$${model.outputPricePerMillionUSD.toFixed(2)}/1M`}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex items-center gap-2 pt-3 border-t border-[#381E12]">
        <button
          onClick={() => onSelectDetails(model)}
          className="flex-1 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E64A19] py-2 text-center text-xs font-bold text-white shadow-glow-orange hover:brightness-110 transition-all"
        >
          {language === 'vi' ? 'Chi tiết' : 'Details'}
        </button>

        {onSelectCompare && (
          <button
            onClick={() => onSelectCompare(model)}
            className="flex items-center justify-center gap-1 rounded-xl border border-[#472718] bg-[#1A0E08] px-3 py-2 text-xs font-semibold text-[#D8C4B6] hover:border-[#FF6B35] hover:text-white transition-colors"
            title="So sánh 1-vs-1"
          >
            <Swords className="h-3.5 w-3.5 text-[#FF6B35]" />
            <span>{language === 'vi' ? 'So tài' : 'VS'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
