'use client';

import React, { useEffect } from 'react';
import { ScrapedModel } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  X, 
  FileText, 
  Server
} from 'lucide-react';

interface LiveModelDetailModalProps {
  model: ScrapedModel | null;
  onClose: () => void;
}

export const LiveModelDetailModal: React.FC<LiveModelDetailModalProps> = ({
  model,
  onClose,
}) => {
  const { language } = useLanguage();
  const { formatCost, currency } = useCurrency();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!model) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-[#0D0704]/80 animate-in fade-in duration-150 font-sans"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-lg border border-[#3D2216] bg-[#1E0F09] p-6 sm:p-8 shadow-2xl text-[#FFF6EE] overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-sm border border-[#3D2216] bg-[#2E170E] text-[#A89280] hover:border-[#FF6B35] hover:text-[#FFF6EE] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-[#FF6B35]/40 bg-gradient-to-br from-[#FF6B35] to-[#E64A19] font-mono text-2xl font-black text-white shadow-lg shadow-[#FF6B35]/30">
            {model.tier}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D8C4B6]">
                {model.creator}
              </span>
              <span className="text-[#5A3622]">•</span>
              <span className="font-mono text-xs text-[#A89280]">{model.contextWindow} Context</span>
              {model.isOpenWeights ? (
                <span className="rounded-sm bg-[#2A160E] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF8452] border border-[#FF6B35]/30">
                  Open Weights
                </span>
              ) : (
                <span className="rounded-sm bg-[#24130C] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#A89280] border border-[#3D2216]">
                  Proprietary
                </span>
              )}
              {model.isReasoning && (
                <span className="rounded-sm bg-[#2A160E] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF8452] border border-[#FF6B35]/40">
                  🧠 Reasoning
                </span>
              )}
              {model.effort && (
                <span className="rounded-sm bg-[#24130C] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#D8C4B6] border border-[#3D2216]">
                  Effort: {model.effort}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-[#FFF6EE] mt-1">{model.name}</h2>
            {model.releaseDate && (
              <div className="font-mono text-[11px] text-[#A89280] mt-0.5">
                {language === 'vi' ? 'Ngày phát hành:' : 'Release:'} {model.releaseDate}
              </div>
            )}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {/* Intelligence */}
          <div className="rounded-sm bg-[#140A05] p-3 border border-[#2E170E] text-center">
            <span className="text-[10px] text-[#A89280] block mb-0.5">{language === 'vi' ? 'Độ thông minh' : 'Intelligence'}</span>
            <div className="text-lg font-black text-[#FF6B35] font-mono">
              {model.intelligenceScoreRaw !== '--' ? model.intelligenceScoreRaw : '—'}
            </div>
            <span className="text-[9px] text-[#8A7262]">{language === 'vi' ? 'Chỉ số chuẩn' : 'Index Score'}</span>
          </div>

          {/* Speed */}
          <div className="rounded-sm bg-[#140A05] p-3 border border-[#2E170E] text-center">
            <span className="text-[10px] text-[#A89280] block mb-0.5">{language === 'vi' ? 'Tốc độ sinh chữ' : 'Output Speed'}</span>
            <div className="text-lg font-black text-[#FF8452] font-mono">
              {model.outputSpeedRaw !== '--' ? model.outputSpeedRaw : '—'}
            </div>
            <span className="text-[9px] text-[#8A7262]">{language === 'vi' ? 'tokens / giây' : 'tokens / sec'}</span>
          </div>

          {/* Cost per Task */}
          <div className="rounded-sm bg-[#140A05] p-3 border border-[#2E170E] text-center">
            <span className="text-[10px] text-[#A89280] block mb-0.5">{language === 'vi' ? 'Chi phí / Task' : 'Cost / Task'}</span>
            <div className="text-sm font-black text-emerald-400 font-mono mt-1 truncate">
              {model.costPerTaskUSD > 0 ? formatCost(model.costPerTaskUSD) : (model.costPerTaskRaw || '—')}
            </div>
            <span className="text-[9px] text-[#8A7262]">{currency}</span>
          </div>

          {/* Vietnamese Rating */}
          <div className="rounded-sm bg-[#140A05] p-3 border border-[#2E170E] text-center">
            <span className="text-[10px] text-[#A89280] block mb-0.5">🇻🇳 {language === 'vi' ? 'Độ nhuyễn Việt' : 'Vietnamese'}</span>
            <div className="text-lg font-black text-emerald-400 font-mono">
              {model.vietnameseRating}
            </div>
            <span className="text-[9px] text-[#8A7262]">{language === 'vi' ? 'trên 100' : 'out of 100'}</span>
          </div>
        </div>

        {/* Plain Language Evaluation */}
        <div className="rounded-sm bg-[#140A05] p-4 border border-[#2E170E] mb-6 space-y-2 text-xs text-[#D8C4B6]">
          <div className="font-bold text-[#FFF6EE] flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-[#FF6B35]" />
            <span>{language === 'vi' ? 'Đánh giá tóm tắt cho người dùng Việt Nam:' : 'Summary Assessment:'}</span>
          </div>
          <p className="leading-relaxed">
            {language === 'vi' ? (
              <>
                Mô hình <span className="text-[#FFF6EE] font-semibold">{model.name}</span> phát triển bởi{' '}
                <span className="text-[#FF8452] font-semibold">{model.creator}</span>, xếp hạng{' '}
                <span className="text-[#FF6B35] font-bold">{model.tier}-Tier</span>.
                {model.vietnameseRating >= 90
                  ? ' Văn phong tiếng Việt tự nhiên và trôi chảy, rất thích hợp cho viết lách, dịch thuật và chatbot CSKH.'
                  : ' Thích hợp cho các tác vụ kỹ thuật, lập trình và xử lý dữ liệu quốc tế.'}
              </>
            ) : (
              <>
                <span className="text-[#FFF6EE] font-semibold">{model.name}</span> by{' '}
                <span className="text-[#FF8452] font-semibold">{model.creator}</span> is rated in{' '}
                <span className="text-[#FF6B35] font-bold">{model.tier}-Tier</span> with an intelligence score of{' '}
                <span className="font-bold text-[#FFF6EE]">{model.intelligenceScoreRaw}</span>.
              </>
            )}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#2E170E]">
          <button
            onClick={onClose}
            className="rounded-sm border border-[#3D2216] bg-[#24130C] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#D8C4B6] hover:bg-[#2E170E] hover:text-[#FFF6EE] transition-colors"
          >
            {language === 'vi' ? 'Đóng' : 'Close'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                const el = document.querySelector('#providers') || document.querySelector('#leaderboard');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 rounded-sm bg-gradient-to-r from-[#FF6B35] to-[#E64A19] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-glow-orange hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Server className="h-3.5 w-3.5" />
              <span>{language === 'vi' ? 'Xem Hạ Tầng Providers' : 'View Hosting Providers'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
