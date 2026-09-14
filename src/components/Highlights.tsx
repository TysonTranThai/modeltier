'use client';

import React from 'react';
import { HighlightItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { TrendingUp, Sparkles, Zap, DollarSign, Lightbulb } from 'lucide-react';

interface HighlightsProps {
  intelligenceData: HighlightItem[];
  speedData: HighlightItem[];
  costData: HighlightItem[];
  onSelectModel?: (slug: string) => void;
}

export const Highlights: React.FC<HighlightsProps> = ({
  intelligenceData,
  speedData,
  costData,
  onSelectModel,
}) => {
  const { language } = useLanguage();
  const { formatCost, currency } = useCurrency();

  const maxIntel = Math.max(...intelligenceData.map((d) => d.artificialAnalysisIntelligenceIndex || 0), 60);
  const maxSpeed = Math.max(...speedData.map((d) => d.medianOutputSpeed || 0), 300);
  const maxCost = Math.max(...costData.map((d) => d.costPerIntelligenceIndexTask || 0), 8);

  const getSlugFromDetailsUrl = (url?: string) => {
    if (!url) return '';
    const parts = url.split('/models/');
    return parts[parts.length - 1].replace(/\/$/, '');
  };

  return (
    <section id="highlights" className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14 lg:mb-20 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-6 gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-violet-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            {language === 'vi' ? 'Tiêu Điểm Hàng Đầu (Top Highlights)' : 'Top Performance Highlights'}
          </h2>
        </div>
        <span className="text-[11px] text-slate-400">
          {language === 'vi' ? 'Đo lường độc lập trên phần cứng chuyên dụng • Cập nhật trực tiếp' : 'Independent test runs on dedicated hardware'}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {/* Card 1: Intelligence Index */}
        <div className="border border-slate-800 rounded-2xl bg-slate-900/80 p-5 relative shadow-xl backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-violet-900/40 text-violet-300 border border-violet-700/50 text-[10px] font-semibold px-2 py-0.5">
                Top 11
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-violet-500 rounded-sm shrink-0" />
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {language === 'vi' ? 'Độ Thông Minh' : 'Intelligence'}
              </h3>
            </div>

            <div className="text-xs text-slate-400 mb-4">
              {language === 'vi'
                ? 'Điểm chuẩn Intelligence Index • Càng cao càng tốt'
                : 'Intelligence Index · Higher is better'}
            </div>

            {/* Bar Chart */}
            <div className="space-y-1.5">
              {intelligenceData.slice(0, 11).map((item, idx) => {
                const val = item.artificialAnalysisIntelligenceIndex || 0;
                const widthPct = Math.round((val / maxIntel) * 100);
                const slug = getSlugFromDetailsUrl(item.detailsUrl);

                return (
                  <div
                    key={idx}
                    onClick={() => onSelectModel && slug && onSelectModel(slug)}
                    className="group/item flex items-center justify-between text-xs py-0.5 cursor-pointer hover:bg-slate-800/80 px-2 rounded-lg transition-colors"
                  >
                    <span className="text-slate-300 truncate max-w-[145px] group-hover/item:text-violet-300 transition-colors">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2 flex-1 max-w-[160px] justify-end">
                      <div className="h-3.5 bg-slate-950 rounded overflow-hidden flex-1 max-w-[100px] flex justify-end">
                        <div
                          className="h-full bg-violet-500 group-hover/item:bg-violet-400 transition-all duration-300"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-white w-8 text-right">
                        {val.toFixed(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            {language === 'vi'
              ? `👑 ${intelligenceData[0]?.label || 'Hàng đầu'} ${intelligenceData[1] ? `& ${intelligenceData[1].label}` : ''} dẫn đầu điểm số thế giới.`
              : `👑 ${intelligenceData[0]?.label || 'Top models'} lead the global intelligence index.`}
          </div>
        </div>

        {/* Card 2: Speed (Tokens / s) */}
        <div className="border border-slate-800 rounded-2xl bg-slate-900/80 p-5 relative shadow-xl backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-amber-900/40 text-amber-300 border border-amber-700/50 text-[10px] font-semibold px-2 py-0.5">
                Top 11
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-amber-400 rounded-sm shrink-0" />
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {language === 'vi' ? 'Tốc Độ Bắn Chữ' : 'Speed (Tokens/s)'}
              </h3>
            </div>

            <div className="text-xs text-slate-400 mb-4">
              {language === 'vi'
                ? 'Tốc độ sinh chữ trung vị (Tokens/giây) • Càng cao càng tốt'
                : 'Output tokens per second · Higher is better'}
            </div>

            {/* Bar Chart */}
            <div className="space-y-1.5">
              {speedData.slice(0, 11).map((item, idx) => {
                const val = item.medianOutputSpeed || 0;
                const widthPct = Math.round((val / maxSpeed) * 100);
                const slug = getSlugFromDetailsUrl(item.detailsUrl);

                return (
                  <div
                    key={idx}
                    onClick={() => onSelectModel && slug && onSelectModel(slug)}
                    className="group/item flex items-center justify-between text-xs py-0.5 cursor-pointer hover:bg-slate-800/80 px-2 rounded-lg transition-colors"
                  >
                    <span className="text-slate-300 truncate max-w-[145px] group-hover/item:text-amber-300 transition-colors">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2 flex-1 max-w-[160px] justify-end">
                      <div className="h-3.5 bg-slate-950 rounded overflow-hidden flex-1 max-w-[100px] flex justify-end">
                        <div
                          className="h-full bg-amber-400 group-hover/item:bg-amber-300 transition-all duration-300"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-white w-9 text-right">
                        {val.toFixed(0)} <span className="text-[9px] font-normal text-slate-500">tps</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            {language === 'vi'
              ? `⚡ ${speedData[0]?.label || 'Hàng đầu'} bắn chữ cực nhanh (${(speedData[0]?.medianOutputSpeed || 0).toFixed(0)} tokens/s).`
              : `⚡ ${speedData[0]?.label || 'Top throughput'} leads speed with ${(speedData[0]?.medianOutputSpeed || 0).toFixed(0)} tps.`}
          </div>
        </div>

        {/* Card 3: Cost per Task */}
        <div className="border border-slate-800 rounded-2xl bg-slate-900/80 p-5 relative shadow-xl backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 text-[10px] font-semibold px-2 py-0.5">
                Top 11
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-emerald-400 rounded-sm shrink-0" />
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {language === 'vi' ? 'Chi Phí Thực Tế' : 'Cost per Task'}
              </h3>
            </div>

            <div className="text-xs text-slate-400 mb-4">
              {language === 'vi'
                ? `Chi phí bình quân (${currency}) cho 1 tác vụ • Càng thấp càng tốt`
                : `Average cost (${currency}) per task · Lower is better`}
            </div>

            {/* Bar Chart */}
            <div className="space-y-1.5">
              {costData.slice(0, 11).map((item, idx) => {
                const valUSD = item.costPerIntelligenceIndexTask || 0;
                const widthPct = Math.round((valUSD / maxCost) * 100);
                const slug = getSlugFromDetailsUrl(item.detailsUrl);

                return (
                  <div
                    key={idx}
                    onClick={() => onSelectModel && slug && onSelectModel(slug)}
                    className="group/item flex items-center justify-between text-xs py-0.5 cursor-pointer hover:bg-slate-800/80 px-2 rounded-lg transition-colors"
                  >
                    <span className="text-slate-300 truncate max-w-[145px] group-hover/item:text-emerald-300 transition-colors">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2 flex-1 max-w-[160px] justify-end">
                      <div className="h-3.5 bg-slate-950 rounded overflow-hidden flex-1 max-w-[100px] flex justify-end">
                        <div
                          className="h-full bg-emerald-500 group-hover/item:bg-emerald-400 transition-all duration-300"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-emerald-400 w-14 text-right truncate">
                        {formatCost(valUSD)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            {language === 'vi'
              ? `💰 ${costData[0]?.label || 'Hàng đầu'} ${costData[1] ? `& ${costData[1].label}` : ''} tối ưu chi phí vượt trội.`
              : `💰 ${costData[0]?.label || 'Top value models'} deliver best performance-to-cost ratio.`}
          </div>
        </div>
      </div>
    </section>
  );
};
