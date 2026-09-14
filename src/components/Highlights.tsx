'use client';

import React from 'react';
import { HighlightItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { TrendingUp, Award, Zap, DollarSign, Lightbulb } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#3D2216] pb-3 mb-6 gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#FF6B35]" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D8C4B6]">
            {language === 'vi' ? 'Tiêu Điểm Tinh Hoa (Top Highlights)' : 'Top Performance Highlights'}
          </h2>
        </div>
        <span className="text-[11px] text-[#A89280] font-mono">
          {language === 'vi' ? 'Đo lường độc lập trên phần cứng chuyên dụng • Cập nhật trực tiếp' : 'Independent test runs on dedicated hardware'}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {/* Card 1: Intelligence Index */}
        <div className="border border-[#472718] rounded-2xl bg-[#24130C]/90 p-6 relative shadow-card-espresso backdrop-blur-sm flex flex-col justify-between hover:border-[#FF6B35]/50 transition-all">
          <div>
            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-[#FF6B35]/15 text-[#FF8452] border border-[#FF6B35]/30 text-[10px] font-semibold px-2.5 py-0.5 font-mono">
                Top 11
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shrink-0 shadow-glow-orange" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF6EE] tracking-tight">
                {language === 'vi' ? 'Độ Thông Minh' : 'Intelligence'}
              </h3>
            </div>

            <div className="text-xs text-[#A89280] mb-4">
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
                    className="group/item flex items-center justify-between text-xs py-1 cursor-pointer hover:bg-[#2F1910] px-2 rounded-lg transition-colors"
                  >
                    <span className="text-[#D8C4B6] truncate max-w-[145px] group-hover/item:text-[#FFF6EE] transition-colors font-medium">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2 flex-1 max-w-[160px] justify-end">
                      <div className="h-3.5 bg-[#140A06] rounded overflow-hidden flex-1 max-w-[100px] flex justify-end">
                        <div
                          className="h-full bg-gradient-to-r from-[#E64A19] to-[#FF6B35] group-hover/item:brightness-110 transition-all duration-300"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-[#FFF6EE] w-8 text-right">
                        {val.toFixed(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#381E12] flex items-center justify-between text-[11px] text-[#A89280]">
            <span>{language === 'vi' ? 'Mô hình dẫn đầu:' : 'Leader:'} <strong className="text-[#FF8452] font-semibold">{intelligenceData[0]?.label || 'Frontier Models'}</strong></span>
            <Award className="h-3.5 w-3.5 text-[#FF6B35]" />
          </div>
        </div>

        {/* Card 2: Output Speed */}
        <div className="border border-[#472718] rounded-2xl bg-[#24130C]/90 p-6 relative shadow-card-espresso backdrop-blur-sm flex flex-col justify-between hover:border-[#F59E0B]/50 transition-all">
          <div>
            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-semibold px-2.5 py-0.5 font-mono">
                Top 11
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-amber-500 rounded-sm shrink-0" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF6EE] tracking-tight">
                {language === 'vi' ? 'Tốc Độ Phản Hồi' : 'Output Speed'}
              </h3>
            </div>

            <div className="text-xs text-[#A89280] mb-4">
              {language === 'vi'
                ? 'Số token sinh ra mỗi giây (TPS) • Càng cao càng tốt'
                : 'Tokens generated per second · Higher is better'}
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
                    className="group/item flex items-center justify-between text-xs py-1 cursor-pointer hover:bg-[#2F1910] px-2 rounded-lg transition-colors"
                  >
                    <span className="text-[#D8C4B6] truncate max-w-[145px] group-hover/item:text-[#FFF6EE] transition-colors font-medium">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2 flex-1 max-w-[160px] justify-end">
                      <div className="h-3.5 bg-[#140A06] rounded overflow-hidden flex-1 max-w-[100px] flex justify-end">
                        <div
                          className="h-full bg-amber-500 group-hover/item:bg-amber-400 transition-all duration-300"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-[#FFF6EE] w-12 text-right">
                        {Math.round(val)} tps
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#381E12] flex items-center justify-between text-[11px] text-[#A89280]">
            <span>{language === 'vi' ? 'Nhanh nhất hiện nay:' : 'Fastest:'} <strong className="text-amber-400 font-semibold">{speedData[0]?.label || 'High-speed models'}</strong></span>
            <Zap className="h-3.5 w-3.5 text-amber-400" />
          </div>
        </div>

        {/* Card 3: Cost Efficiency */}
        <div className="border border-[#472718] rounded-2xl bg-[#24130C]/90 p-6 relative shadow-card-espresso backdrop-blur-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all">
          <div>
            <div className="absolute top-4 right-4">
              <span className="rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2.5 py-0.5 font-mono">
                Top 11
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <div className="w-3.5 h-3.5 bg-emerald-500 rounded-sm shrink-0" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF6EE] tracking-tight">
                {language === 'vi' ? 'Chi Phí Tác Vụ' : 'Cost per Task'}
              </h3>
            </div>

            <div className="text-xs text-[#A89280] mb-4">
              {language === 'vi'
                ? 'Chi phí chạy 1 tác vụ chuẩn hóa • Càng thấp càng rẻ'
                : 'Cost per benchmark task · Lower is cheaper'}
            </div>

            {/* Bar Chart */}
            <div className="space-y-1.5">
              {costData.slice(0, 11).map((item, idx) => {
                const val = item.costPerIntelligenceIndexTask || 0;
                const widthPct = Math.max(10, Math.min(100, Math.round((val / maxCost) * 100)));
                const slug = getSlugFromDetailsUrl(item.detailsUrl);

                return (
                  <div
                    key={idx}
                    onClick={() => onSelectModel && slug && onSelectModel(slug)}
                    className="group/item flex items-center justify-between text-xs py-1 cursor-pointer hover:bg-[#2F1910] px-2 rounded-lg transition-colors"
                  >
                    <span className="text-[#D8C4B6] truncate max-w-[145px] group-hover/item:text-[#FFF6EE] transition-colors font-medium">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2 flex-1 max-w-[160px] justify-end">
                      <div className="h-3.5 bg-[#140A06] rounded overflow-hidden flex-1 max-w-[100px] flex justify-end">
                        <div
                          className="h-full bg-emerald-500 group-hover/item:bg-emerald-400 transition-all duration-300"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-[#FFF6EE] w-14 text-right">
                        {currency === 'VND' ? formatCost(val) : `$${val.toFixed(2)}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#381E12] flex items-center justify-between text-[11px] text-[#A89280]">
            <span>{language === 'vi' ? 'Tiết kiệm nhất:' : 'Best value:'} <strong className="text-emerald-400 font-semibold">{costData[0]?.label || 'Budget models'}</strong></span>
            <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Quick Takeaway Banner */}
      <div className="mt-6 rounded-2xl bg-[#201009] border border-[#3D2216] p-4 flex items-start gap-3 text-xs text-[#D8C4B6]">
        <Lightbulb className="h-4 w-4 text-[#FF6B35] shrink-0 mt-0.5" />
        <div className="flex-1 leading-relaxed">
          <strong className="text-[#FFF6EE] font-serif font-bold text-sm">
            {language === 'vi' ? 'Nhận xét từ ModelTier:' : 'ModelTier Takeaway:'}
          </strong>{' '}
          {language === 'vi' ? (
            <>
              Các mô hình suy luận sâu (Reasoning models) đang dẫn đầu tuyệt đối về trí tuệ và lập trình, tuy nhiên các dòng Flash/Mini lại có tốc độ vượt trội gấp 3–5 lần với chi phí tiết kiệm hơn 80%.
            </>
          ) : (
            <>
              Frontier reasoning models hold the lead in pure intelligence, while Flash/Mini models deliver 3–5x higher output throughput at less than one-fifth of the inference cost.
            </>
          )}
        </div>
      </div>
    </section>
  );
};
