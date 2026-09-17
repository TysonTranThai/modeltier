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
  BarChart2,
  Github,
  Heart,
  Star
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
    <section className="relative overflow-hidden bg-[#180D07] text-[#FFF6EE] pt-8 pb-16 border-b border-[#3D2216] w-full max-w-full">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      {/* Floating Ambient Glow Orbs */}
      <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF6B35]/15 blur-[120px] pointer-events-none rounded-full animate-float-slow" />
      <div className="absolute top-32 left-1/4 w-[350px] h-[250px] bg-[#FF8452]/10 blur-[90px] pointer-events-none rounded-full animate-orange-pulse" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#180D07] via-[#180D07]/60 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 w-full max-w-full">
        {/* Technical Header with Crosshairs (Ledger Style) */}
        <div className="relative mb-10 flex items-center justify-between text-[#A89280] text-[9px] sm:text-[11px] font-mono tracking-normal sm:tracking-[0.2em] uppercase border-y border-[#3D2216] py-2.5 backdrop-blur-sm w-full max-w-full min-w-0">
          <span className="text-[#FF6B35]/70 font-bold text-sm shrink-0">+</span>
          <span className="text-center px-2 sm:px-4 min-w-0 flex-1 truncate">
            {language === 'vi' 
              ? 'BẠN PHÁT TRIỂN SẢN PHẨM. CHÚNG TÔI ĐO LƯỜNG VÀ GIÁM SÁT CÁC MÔ HÌNH AI.' 
              : "YOU BUILT THE PRODUCT. WE'LL WATCH THE AI BENCHMARKS."}
          </span>
          <span className="text-[#FF6B35]/70 font-bold text-sm shrink-0">+</span>
        </div>

        {/* Hero Editorial Headline */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Live Empirical & Community Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-6">
            <div className="inline-flex items-center gap-2 rounded-sm border border-[#FF6B35]/40 bg-[#24130C]/90 px-3.5 py-1.5 text-xs font-mono text-[#FF8452] shadow-sm backdrop-blur-md tracking-wider uppercase">
              <span className="flex h-2 w-2 rounded-full bg-[#FF6B35] animate-ping" />
              <span className="font-semibold">{language === 'vi' ? `DỮ LIỆU ĐỘC LẬP • ${modelCount}+ MÔ HÌNH` : `INDEPENDENT TELEMETRY • ${modelCount}+ MODELS`}</span>
            </div>

            {/* GitHub Repo Pill */}
            <a
              href="https://github.com/TysonTranThai/modeltier"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#472718] bg-[#24130C]/90 hover:bg-[#331A0F] hover:border-[#FF6B35]/70 px-3 py-1.5 text-xs font-mono text-[#D8C4B6] hover:text-[#FFF6EE] shadow-sm backdrop-blur-md transition-all group"
              title="GitHub Repository: TysonTranThai/modeltier"
            >
              <Github className="h-3.5 w-3.5 text-[#FF8452] group-hover:text-white transition-colors" />
              <span>TysonTranThai/modeltier</span>
              <span className="inline-flex items-center gap-0.5 text-[#FF8452] text-[11px] font-bold">
                <Star className="h-3 w-3 fill-[#FF8452]/40" />
                <span>Star</span>
              </span>
            </a>

            {/* Follow Author Pill */}
            <a
              href="https://github.com/TysonTranThai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#FF6B35]/30 bg-[#FF6B35]/10 hover:bg-[#FF6B35]/20 hover:border-[#FF6B35] px-3 py-1.5 text-xs font-mono text-[#FF8452] hover:text-white shadow-sm backdrop-blur-md transition-all group"
              title={language === 'vi' ? 'Theo dõi tác giả Tyson Tran (@TysonTranThai)' : 'Follow author Tyson Tran (@TysonTranThai)'}
            >
              <Heart className="h-3.5 w-3.5 text-[#FF6B35] fill-[#FF6B35]/30 group-hover:fill-[#FF6B35] transition-all" />
              <span>{language === 'vi' ? 'Follow Tác giả' : 'Follow Author'}</span>
            </a>
          </div>

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

          {/* Architectural Rectangular CTA Buttons with Shimmer */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href="#tierlist"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#tierlist')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-sm bg-gradient-to-r from-[#FF6B35] to-[#E64A19] px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-glow-orange hover:shadow-glow-orange-lg hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>{language === 'vi' ? 'Khám Phá Mô Hình Tinh Hoa' : 'Discover the Core'}</span>
              <span className="text-white text-base font-mono">→</span>
            </a>

            <button
              onClick={() => setViewMode('clone')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-sm border border-[#5A3420] bg-[#24130B]/80 hover:bg-[#331C10] px-6 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#EFE2D6] hover:border-[#FF6B35]/70 hover:text-white active:scale-[0.98] transition-all shadow-sm backdrop-blur-sm"
            >
              <BarChart2 className="h-4 w-4 text-[#FF6B35]" />
              <span>{language === 'vi' ? 'Xem Chuẩn Benchmark Pro' : 'Explore Pro Telemetry'}</span>
            </button>

            {/* GitHub Repo Button in CTA row */}
            <a
              href="https://github.com/TysonTranThai/modeltier"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm border border-[#472718] bg-[#24130B]/80 hover:bg-[#331C10] px-5 py-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#EFE2D6] hover:border-[#FF6B35]/70 hover:text-white active:scale-[0.98] transition-all shadow-sm backdrop-blur-sm group"
            >
              <Github className="h-4 w-4 text-[#FF8452] group-hover:text-white transition-colors" />
              <span>GitHub Repo</span>
              <Star className="h-3.5 w-3.5 text-[#FF8452] fill-[#FF8452]/40" />
            </a>
          </div>

          {/* Terminal Search Box in Warm Espresso Style */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-[#FF8452] transition-transform group-focus-within:scale-110" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'vi'
                    ? `Tìm kiếm trong ${modelCount} mô hình AI (Claude 3.7, GPT-4o, DeepSeek, Gemini)...`
                    : `Search ${modelCount} models (Claude 3.7, GPT-4o, DeepSeek, Gemini)...`
                }
                className="w-full rounded-sm border border-[#4A2818] bg-[#24130C]/90 py-3 pl-11 pr-4 text-xs font-mono text-[#FFF6EE] placeholder-[#A89280] shadow-2xl focus:border-[#FF6B35] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]/40 hover:border-[#FF6B35]/50 transition-all backdrop-blur-md"
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
