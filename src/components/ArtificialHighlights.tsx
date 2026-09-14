'use client';

import React from 'react';
import { HighlightItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

interface ArtificialHighlightsProps {
  intelligenceData: HighlightItem[];
  speedData: HighlightItem[];
  costData: HighlightItem[];
  onSelectModel?: (slug: string) => void;
}

export const ArtificialHighlights: React.FC<ArtificialHighlightsProps> = ({
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
    return url.replace('/models/', '');
  };

  return (
    <section id="highlights" className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14 lg:mb-20 scroll-mt-20">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          {language === 'vi' ? 'Tiêu Điểm Nổi Bật (Highlights)' : 'Highlights'}
        </h2>
        <span className="text-[11px] text-neutral-500">
          {language === 'vi' ? 'Đo lường độc lập trên phần cứng chuyên dụng' : 'Independent test runs on dedicated hardware'}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {/* Card 1: Intelligence Index */}
        <div className="border border-neutral-800 rounded-xl bg-neutral-950/80 p-5 relative shadow-xl backdrop-blur-sm">
          <div className="absolute top-4 right-4">
            <span className="rounded-full bg-purple-900/60 text-purple-200 border border-purple-700/50 text-[10px] font-semibold px-2 py-0.5">
              Updated
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-1.5">
            <div className="w-3.5 h-3.5 bg-purple-500 rounded-sm shrink-0" />
            <h3 className="text-2xl font-serif font-medium text-white">
              {language === 'vi' ? 'Trí Thông Minh (Intelligence)' : 'Intelligence'}
            </h3>
          </div>

          <div className="text-xs text-neutral-400 mb-5">
            {language === 'vi'
              ? 'Chỉ số thông minh Artificial Analysis • Càng cao càng tốt'
              : 'Artificial Analysis Intelligence Index · Higher is better'}
          </div>

          {/* Bar Chart */}
          <div className="space-y-2">
            {intelligenceData.slice(0, 11).map((item, idx) => {
              const val = item.artificialAnalysisIntelligenceIndex || 0;
              const widthPct = Math.round((val / maxIntel) * 100);
              const slug = getSlugFromDetailsUrl(item.detailsUrl);

              return (
                <div
                  key={idx}
                  onClick={() => onSelectModel && slug && onSelectModel(slug)}
                  className="group/item flex items-center justify-between text-xs py-0.5 cursor-pointer hover:bg-neutral-900/60 px-1.5 rounded transition-colors"
                >
                  <span className="text-neutral-300 truncate max-w-[150px] group-hover/item:text-purple-300 transition-colors">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2 flex-1 max-w-[160px] justify-end">
                    <div className="h-4 bg-neutral-900 rounded-sm overflow-hidden flex-1 max-w-[100px] flex justify-end">
                      <div
                        className="h-full bg-purple-500 group-hover/item:bg-purple-400 transition-all duration-300"
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

        {/* Card 2: Speed (Tokens / s) */}
        <div className="border border-neutral-800 rounded-xl bg-neutral-950/80 p-5 relative shadow-xl backdrop-blur-sm">
          <div className="flex items-baseline gap-2 mb-1.5">
            <div className="w-3.5 h-3.5 bg-amber-400 rounded-sm shrink-0" />
            <h3 className="text-2xl font-serif font-medium text-white">
              {language === 'vi' ? 'Tốc Độ (Speed)' : 'Speed'}
            </h3>
          </div>

          <div className="text-xs text-neutral-400 mb-5">
            {language === 'vi'
              ? 'Tốc độ sinh chữ trung vị (Tokens/giây) • Càng cao càng tốt'
              : 'Output tokens per second · Higher is better'}
          </div>

          {/* Bar Chart */}
          <div className="space-y-2">
            {speedData.slice(0, 11).map((item, idx) => {
              const val = item.medianOutputSpeed || 0;
              const widthPct = Math.round((val / maxSpeed) * 100);
              const slug = getSlugFromDetailsUrl(item.detailsUrl);

              return (
                <div
                  key={idx}
                  onClick={() => onSelectModel && slug && onSelectModel(slug)}
                  className="group/item flex items-center justify-between text-xs py-0.5 cursor-pointer hover:bg-neutral-900/60 px-1.5 rounded transition-colors"
                >
                  <span className="text-neutral-300 truncate max-w-[150px] group-hover/item:text-amber-300 transition-colors">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2 flex-1 max-w-[160px] justify-end">
                    <div className="h-4 bg-neutral-900 rounded-sm overflow-hidden flex-1 max-w-[100px] flex justify-end">
                      <div
                        className="h-full bg-amber-400 group-hover/item:bg-amber-300 transition-all duration-300"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-white w-9 text-right">
                      {val.toFixed(0)} <span className="text-[9px] font-normal text-neutral-500">tps</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 3: Cost per Task */}
        <div className="border border-neutral-800 rounded-xl bg-neutral-950/80 p-5 relative shadow-xl backdrop-blur-sm">
          <div className="flex items-baseline gap-2 mb-1.5">
            <div className="w-3.5 h-3.5 bg-orange-500 rounded-sm shrink-0" />
            <h3 className="text-2xl font-serif font-medium text-white">
              {language === 'vi' ? 'Chi Phí / Nhiệm Vụ (Cost)' : 'Cost per Task'}
            </h3>
          </div>

          <div className="text-xs text-neutral-400 mb-5">
            {language === 'vi'
              ? `Chi phí bình quân (${currency}) cho 1 tác vụ Index • Càng thấp càng tốt`
              : `Weighted average cost (${currency}) per task · Lower is better`}
          </div>

          {/* Bar Chart */}
          <div className="space-y-2">
            {costData.slice(0, 11).map((item, idx) => {
              const valUSD = item.costPerIntelligenceIndexTask || 0;
              const widthPct = Math.round((valUSD / maxCost) * 100);
              const slug = getSlugFromDetailsUrl(item.detailsUrl);

              return (
                <div
                  key={idx}
                  onClick={() => onSelectModel && slug && onSelectModel(slug)}
                  className="group/item flex items-center justify-between text-xs py-0.5 cursor-pointer hover:bg-neutral-900/60 px-1.5 rounded transition-colors"
                >
                  <span className="text-neutral-300 truncate max-w-[150px] group-hover/item:text-orange-300 transition-colors">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2 flex-1 max-w-[160px] justify-end">
                    <div className="h-4 bg-neutral-900 rounded-sm overflow-hidden flex-1 max-w-[100px] flex justify-end">
                      <div
                        className="h-full bg-orange-500 group-hover/item:bg-orange-400 transition-all duration-300"
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
      </div>
    </section>
  );
};
