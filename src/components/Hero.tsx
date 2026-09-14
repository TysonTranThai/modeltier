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
      </div>
    </section>
  );
};
