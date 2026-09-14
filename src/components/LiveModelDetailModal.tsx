'use client';

import React from 'react';
import { ScrapedModel } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
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

  if (!model) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/85 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 font-sans text-2xl font-black text-white shadow-lg shadow-violet-600/30">
            {model.tier}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {model.creator}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{model.contextWindow} Context</span>
              {model.isOpenWeights ? (
                <span className="rounded bg-cyan-950 px-1.5 py-0.2 text-[10px] font-bold text-cyan-300 border border-cyan-800/40">
                  Open Weights
                </span>
              ) : (
                <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-400">
                  Proprietary
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">{model.name}</h2>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {/* Intelligence */}
          <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block mb-0.5">Intelligence</span>
            <div className="text-lg font-black text-violet-300 font-mono">
              {model.intelligenceScoreRaw !== '--' ? model.intelligenceScoreRaw : '—'}
            </div>
            <span className="text-[9px] text-slate-500">Index Score</span>
          </div>

          {/* Speed */}
          <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block mb-0.5">Output Speed</span>
            <div className="text-lg font-black text-amber-400 font-mono">
              {model.outputSpeedRaw !== '--' ? model.outputSpeedRaw : '—'}
            </div>
            <span className="text-[9px] text-slate-500">tokens / sec</span>
          </div>

          {/* Cost per Task */}
          <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block mb-0.5">Cost / Task</span>
            <div className="text-sm font-black text-emerald-400 font-mono mt-1 truncate">
              {model.costPerTaskUSD > 0 ? formatCost(model.costPerTaskUSD) : (model.costPerTaskRaw || '—')}
            </div>
            <span className="text-[9px] text-slate-500">{currency}</span>
          </div>

          {/* Vietnamese Rating */}
          <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block mb-0.5">🇻🇳 Tiếng Việt</span>
            <div className="text-lg font-black text-emerald-400 font-mono">
              {model.vietnameseRating}
            </div>
            <span className="text-[9px] text-slate-500">trên 100</span>
          </div>
        </div>

        {/* Plain Language Evaluation */}
        <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 mb-6 space-y-2 text-xs text-slate-300">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span>{language === 'vi' ? 'Đánh giá tóm tắt cho người dùng Việt Nam:' : 'Summary Assessment:'}</span>
          </div>
          <p className="leading-relaxed">
            {language === 'vi' ? (
              <>
                Mô hình <span className="text-white font-semibold">{model.name}</span> phát triển bởi{' '}
                <span className="text-violet-300 font-semibold">{model.creator}</span>, xếp hạng{' '}
                <span className="text-amber-400 font-bold">{model.tier}-Tier</span>.
                {model.vietnameseRating >= 90
                  ? ' Văn phong tiếng Việt tự nhiên và trôi chảy, rất thích hợp cho viết lách, dịch thuật và chatbot CSKH.'
                  : ' Thích hợp cho các tác vụ kỹ thuật, lập trình và xử lý dữ liệu quốc tế.'}
              </>
            ) : (
              <>
                <span className="text-white font-semibold">{model.name}</span> by{' '}
                <span className="text-violet-300 font-semibold">{model.creator}</span> is rated in{' '}
                <span className="text-amber-400 font-bold">{model.tier}-Tier</span> with an intelligence score of{' '}
                <span className="font-bold text-white">{model.intelligenceScoreRaw}</span>.
              </>
            )}
          </p>
        </div>

        {/* External Links */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {language === 'vi' ? 'Đóng' : 'Close'}
          </button>

          <div className="flex items-center gap-2">
            {model.providersUrl && (
              <a
                href={model.providersUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <Server className="h-3.5 w-3.5" />
                <span>{language === 'vi' ? 'Nhà cung cấp' : 'Providers'}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {model.url && (
              <a
                href={model.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/30"
              >
                <span>{language === 'vi' ? 'Xem Benchmark Gốc' : 'View Benchmark Source'}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
