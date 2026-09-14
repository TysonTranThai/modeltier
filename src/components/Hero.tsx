'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useViewMode } from '../context/ViewModeContext';
import { 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Zap, 
  Layers, 
  SlidersHorizontal,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  BarChart2
} from 'lucide-react';
import { CategoryFilter } from '../types';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: CategoryFilter;
  setActiveCategory: (cat: CategoryFilter) => void;
  modelCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  modelCount,
}) => {
  const { language } = useLanguage();
  const { setViewMode } = useViewMode();

  return (
    <section className="relative overflow-hidden bg-[#180D07] text-[#FFF6EE] pt-8 pb-16 border-b border-[#3D2216]">
      {/* Subtle Warm Amber Vignette Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#FF6B35]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#26130B]/90 via-[#26130B]/40 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Technical Header with Crosshairs (Ledger Style) */}
        <div className="relative mb-10 flex items-center justify-between text-[#A89280] text-[11px] font-mono tracking-[0.2em] uppercase border-y border-[#3D2216] py-2.5">
          <span className="text-[#FF6B35]/70 font-bold text-sm">+</span>
          <span className="text-center px-4 truncate">
            {language === 'vi' 
              ? 'BẠN PHÁT TRIỂN SẢN PHẨM. CHÚNG TÔI ĐO LƯỜNG VÀ GIÁM SÁT CÁC MÔ HÌNH AI.' 
              : "YOU BUILT THE PRODUCT. WE'LL WATCH THE AI BENCHMARKS."}
          </span>
          <span className="text-[#FF6B35]/70 font-bold text-sm">+</span>
        </div>

        {/* Hero Editorial Headline */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-normal tracking-tight text-[#FFF6EE] sm:text-6xl lg:text-7xl leading-[1.12]">
            {language === 'vi' ? (
              <>
                Chọn đúng <span className="text-[#FF6B35] italic font-serif">mô hình AI</span> bằng số liệu <span className="text-[#FF6B35] italic font-serif">thực chứng</span> và minh bạch
              </>
            ) : (
              <>
                Make smarter <span className="text-[#FF6B35] italic font-serif">AI decisions</span> with empirical <span className="text-[#FF6B35] italic font-serif">telemetry & benchmarks</span>
              </>
            )}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-[#D8C4B6] sm:text-lg max-w-2xl mx-auto font-light">
            {language === 'vi'
              ? 'Đừng chọn AI theo cảm tính. ModelTier mang đến chuẩn đo lường độc lập — phân hạng trực quan, quy đổi chi phí ra VNĐ và đo lường độ nhuyễn tiếng Việt thực chiến.'
              : 'Empirical telemetry for every AI model — independent benchmarks, real-world cost comparisons, and localized performance metrics.'}
          </p>

          {/* Glowing Orange CTA Pill Button */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#tierlist"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#tierlist')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E64A19] px-7 py-3.5 text-sm font-semibold text-white shadow-glow-orange hover:shadow-glow-orange-lg hover:scale-105 transition-all"
            >
              <span>{language === 'vi' ? 'Khám Phá Mô Hình Tinh Hoa' : 'Discover the Core'}</span>
              <span className="text-white text-base">→</span>
            </a>

            <button
              onClick={() => setViewMode('clone')}
              className="inline-flex items-center gap-2 rounded-full border border-[#5A3420] bg-[#24130B]/80 hover:bg-[#331C10] px-6 py-3.5 text-sm font-medium text-[#EFE2D6] hover:border-[#FF6B35]/60 transition-all shadow-sm"
            >
              <BarChart2 className="h-4 w-4 text-[#FF6B35]" />
              <span>{language === 'vi' ? 'Xem Chuẩn Benchmark Pro' : 'Explore Pro Telemetry'}</span>
            </button>
          </div>

          {/* Search Box in Warm Espresso Style */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-[#FF8452]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'vi'
                    ? `Tìm kiếm trong ${modelCount} mô hình AI (Claude 3.7, GPT-4o, DeepSeek, Gemini)...`
                    : `Search ${modelCount} models (Claude 3.7, GPT-4o, DeepSeek, Gemini)...`
                }
                className="w-full rounded-full border border-[#4A2818] bg-[#24130C]/90 py-3 pl-11 pr-4 text-xs text-[#FFF6EE] placeholder-[#A89280] shadow-2xl focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3 text-xs text-[#A89280] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= 3 SIGNATURE LUXURY DASHBOARD CARDS ================= */}
        {/* Directly replicates the bottom visual cards from the Ledger screenshot */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: Outstanding Invoices / Bar Chart Card */}
          <div className="rounded-2xl border border-[#472718] bg-[#24130C]/90 p-6 backdrop-blur-md shadow-card-espresso relative overflow-hidden group hover:border-[#FF6B35]/60 transition-all">
            <div className="flex items-center justify-between text-xs text-[#D8C4B6] font-medium mb-3">
              <span className="font-serif text-sm font-semibold text-[#FFF6EE]">Outstanding Invoices</span>
              <span className="text-[11px] font-mono text-[#FF8452]">Frontier Leaders</span>
            </div>
            
            <div className="flex items-center gap-6 text-[11px] text-[#A89280] font-mono mb-6">
              <div>
                <span>On track</span>
                <div className="text-sm font-bold text-[#FFF6EE]">$56,500</div>
              </div>
              <div>
                <span>Overdue (&gt;30d)</span>
                <div className="text-sm font-bold text-[#FFF6EE]">$12,400</div>
              </div>
            </div>

            {/* Bar Chart with Glowing Solid Orange Bar */}
            <div className="flex items-end justify-between gap-3 h-24 pt-4 border-t border-[#3D2216]">
              <div className="w-1/6 bg-[#381F14] h-10 rounded-t" />
              <div className="w-1/6 bg-[#381F14] h-14 rounded-t" />
              <div className="w-1/6 bg-[#381F14] h-12 rounded-t" />
              {/* Highlight Glowing Orange Bar */}
              <div className="w-1/6 bg-gradient-to-t from-[#E64A19] to-[#FF6B35] h-20 rounded-t shadow-glow-orange relative group-hover:h-22 transition-all">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#FF8452] font-bold">MAX</span>
              </div>
              <div className="w-1/6 bg-[#381F14] h-8 rounded-t" />
              <div className="w-1/6 bg-[#381F14] h-4 rounded-t" />
            </div>
          </div>

          {/* CARD 2: Tax Reserve Status / Dot Matrix Grid Card */}
          <div className="rounded-2xl border border-[#472718] bg-[#24130C]/90 p-6 backdrop-blur-md shadow-card-espresso relative overflow-hidden group hover:border-[#FF6B35]/60 transition-all">
            <div className="flex items-center justify-between text-xs text-[#D8C4B6] font-medium mb-3">
              <span className="font-serif text-sm font-semibold text-[#FFF6EE]">Tax Reserve Status</span>
              <span className="text-[11px] font-mono text-[#FF8452]">Coverage Grid</span>
            </div>

            <div className="flex items-center gap-6 text-[11px] text-[#A89280] font-mono mb-6">
              <div>
                <span>Burn Deceleration</span>
                <div className="text-sm font-bold text-[#FFF6EE]">$84,200</div>
              </div>
              <div>
                <span>Target Runway</span>
                <div className="text-sm font-bold text-[#FFF6EE]">86% funded</div>
              </div>
            </div>

            {/* 5x10 LED Dot Matrix Array (Replicates Screenshot) */}
            <div className="pt-4 border-t border-[#3D2216]">
              <div className="grid grid-cols-10 gap-2.5 justify-items-center">
                {[
                  0, 0, 0, 0, 1, 0, 1, 0, 0, 0,
                  0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
                  0, 1, 0, 0, 1, 0, 0, 0, 1, 0,
                  0, 0, 0, 1, 0, 1, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
                ].map((isOrange, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all ${
                      isOrange
                        ? 'bg-[#FF6B35] shadow-glow-orange scale-110'
                        : 'bg-[#D8C4B6]/25 hover:bg-[#D8C4B6]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CARD 3: Revenue Growth / Sparkline Waveform Card */}
          <div className="rounded-2xl border border-[#472718] bg-[#24130C]/90 p-6 backdrop-blur-md shadow-card-espresso relative overflow-hidden group hover:border-[#FF6B35]/60 transition-all">
            <div className="flex items-center justify-between text-xs text-[#D8C4B6] font-medium mb-2">
              <span className="font-serif text-sm font-semibold text-[#FFF6EE]">Revenue Growth</span>
              <span className="rounded-full bg-[#FF6B35]/20 px-2 py-0.5 text-[10px] font-bold text-[#FF8452] border border-[#FF6B35]/30">
                +18.5% vs forecast
              </span>
            </div>

            <div className="text-3xl font-serif font-bold text-[#FFF6EE] tracking-tight mb-4">
              $487,200
            </div>

            {/* High-density Sparkline Waveform Bars */}
            <div className="pt-2 border-t border-[#3D2216]">
              <div className="flex items-end justify-between gap-1 h-14">
                {[
                  12, 18, 25, 14, 32, 28, 45, 20, 55, 38, 48, 62, 35, 58, 70, 42, 65, 80, 55, 75,
                  48, 60, 85, 68, 72, 90, 64, 82, 95, 78, 60, 45, 65, 50, 40, 30, 25, 35, 20, 15
                ].map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${(val / 95) * 100}%` }}
                    className={`w-1 rounded-t transition-all ${
                      idx >= 22 && idx <= 30
                        ? 'bg-[#FF6B35] shadow-glow-orange'
                        : 'bg-[#472718] group-hover:bg-[#5A3420]'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[#A89280] mt-2">
                <span>10:00</span>
                <span>12:00</span>
                <span>14:00</span>
                <span>16:00</span>
                <span>18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
