'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useViewMode } from '../context/ViewModeContext';
import { 
  Code2, 
  Search, 
  Cpu, 
  Activity, 
  Clock, 
  Layers, 
  Zap, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Compass,
  Github,
  Heart,
  Star
} from 'lucide-react';
import { CategoryFilter } from '../types';

interface ProCloneHeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: CategoryFilter;
  setActiveCategory: (cat: CategoryFilter) => void;
  modelCount: number;
}

export const ProCloneHero: React.FC<ProCloneHeroProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  modelCount,
}) => {
  const { language } = useLanguage();
  const { setViewMode } = useViewMode();

  const categories: { id: CategoryFilter; labelVi: string; labelEn: string; icon: any }[] = [
    { id: 'all', labelVi: 'Tất cả mô hình', labelEn: 'All Models', icon: Layers },
    { id: 'reasoning', labelVi: 'Reasoning (Suy luận sâu)', labelEn: 'Reasoning Models', icon: Cpu },
    { id: 'coding', labelVi: 'Lập trình (Coding)', labelEn: 'Coding & Dev', icon: Code2 },
    { id: 'speed', labelVi: 'Tốc độ cao (>100 tps)', labelEn: 'High Speed (>100 tps)', icon: Zap },
    { id: 'budget', labelVi: 'Chi phí rẻ (<$1)', labelEn: 'Budget (<$1/M)', icon: SlidersHorizontal },
    { id: 'open_weights', labelVi: 'Mã nguồn mở (Open Weights)', labelEn: 'Open Weights', icon: Activity },
    { id: 'vietnamese', labelVi: 'Tiếng Việt tốt nhất', labelEn: 'Vietnamese Native', icon: TrendingUp },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#3D2216] bg-[#180D07] py-12 md:py-16 text-[#FFF6EE]">
      {/* Background Amber Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF6B35]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Mode Banner with Technical Crosshairs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-sm border border-[#522B19] bg-[#24130C] px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF8452] shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6B35] animate-pulse" />
            <span className="font-bold text-[#FFF6EE]">PRO BENCHMARK CLONE</span>
            <span className="text-[#5A3522]">•</span>
            <span className="text-[#D8C4B6]">
              {language === 'vi' ? 'Dữ liệu đo đạc độc lập' : 'Independent Benchmark Infrastructure'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* GitHub Repo Button */}
            <a
              href="https://github.com/TysonTranThai/modeltier"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#472718] bg-[#24130C] hover:bg-[#331C10] hover:border-[#FF6B35]/70 px-3 py-1.5 font-mono text-xs font-medium text-[#D8C4B6] hover:text-[#FFF6EE] transition-all shadow-sm group"
              title="GitHub Repository: TysonTranThai/modeltier"
            >
              <Github className="h-3.5 w-3.5 text-[#FF8452] group-hover:text-white transition-colors" />
              <span>GitHub Repo</span>
              <Star className="h-3 w-3 text-[#FF8452] fill-[#FF8452]/40" />
            </a>

            {/* Follow Author Button */}
            <a
              href="https://github.com/TysonTranThai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#FF6B35]/40 bg-[#FF6B35]/10 hover:bg-[#FF6B35]/20 hover:border-[#FF6B35] px-3 py-1.5 font-mono text-xs font-bold text-[#FF8452] hover:text-white transition-all shadow-sm group"
              title={language === 'vi' ? 'Theo dõi & Ủng hộ tác giả Tyson Tran (@TysonTranThai)' : 'Follow & Support author Tyson Tran (@TysonTranThai)'}
            >
              <Heart className="h-3.5 w-3.5 text-[#FF6B35] fill-[#FF6B35]/40" />
              <span>{language === 'vi' ? 'Follow Tác giả' : 'Follow Author'}</span>
            </a>

            <button
              onClick={() => setViewMode('simplified')}
              className="group inline-flex items-center gap-2 rounded-sm border border-[#FF6B35]/40 bg-[#24130C] hover:bg-[#331C10] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FF8452] transition-all shadow-sm"
            >
              <span>⚡ {language === 'vi' ? 'Xem chế độ Dễ hiểu' : 'Switch to Easy Mode'}</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl">
          <h1 className="text-3xl font-serif font-normal tracking-tight text-[#FFF6EE] sm:text-5xl lg:text-6xl">
            {language === 'vi' ? (
              <>
                Đo lường & Phân tích Độc lập <br />
                <span className="text-[#FF6B35] italic font-serif">
                  về Các Mô Hình Trí Tuệ Nhân Tạo
                </span>
              </>
            ) : (
              <>
                Independent Analysis of <br />
                <span className="text-[#FF6B35] italic font-serif">
                  Frontier AI Models & Cloud APIs
                </span>
              </>
            )}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#D8C4B6] sm:text-lg max-w-3xl font-light">
            {language === 'vi' ? (
              <>
                Toàn bộ dữ liệu đo kiểm thực tế trên hạ tầng độc lập: 
                <strong className="text-[#FFF6EE] font-medium"> Điểm thông minh (Intelligence Index)</strong>, 
                <strong className="text-[#FFF6EE] font-medium"> Tốc độ sinh token (Speed TPS)</strong>, 
                <strong className="text-[#FFF6EE] font-medium"> Độ trễ gói đầu (TTFT)</strong>, và 
                <strong className="text-[#FFF6EE] font-medium"> Chi phí trên mỗi tác vụ ($/M tokens & VNĐ)</strong>.
              </>
            ) : (
              <>
                Objective, standardized benchmarks and telemetry for AI models: 
                <strong className="text-[#FFF6EE] font-medium"> Intelligence Index</strong>, 
                <strong className="text-[#FFF6EE] font-medium"> Output Speed (Tokens/s)</strong>, 
                <strong className="text-[#FFF6EE] font-medium"> Time to First Token (TTFT)</strong>, and 
                <strong className="text-[#FFF6EE] font-medium"> Normalized Task Cost ($/1M tokens)</strong>.
              </>
            )}
          </p>
        </div>

        {/* Telemetry Metric Cards in Ledger Chocolate Style */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 w-full max-w-full">
          <div className="rounded-sm border border-[#472718] bg-[#24130C]/90 p-4 shadow-card-espresso">
            <div className="flex items-center gap-2 text-[#FF8452] font-mono text-[11px] font-bold uppercase tracking-wider">
              <Layers className="h-4 w-4" />
              <span>{language === 'vi' ? 'Tổng mô hình' : 'Total Models'}</span>
            </div>
            <div className="mt-2 text-2xl font-serif font-bold text-[#FFF6EE] sm:text-3xl">
              {modelCount > 0 ? `${modelCount}+` : '650+'}
            </div>
            <p className="mt-1 font-mono text-[11px] text-[#A89280]">
              {language === 'vi' ? 'Frontier & Open-source' : 'Frontier & open weights'}
            </p>
          </div>

          <div className="rounded-sm border border-[#472718] bg-[#24130C]/90 p-4 shadow-card-espresso">
            <div className="flex items-center gap-2 text-[#FF8452] font-mono text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>{language === 'vi' ? 'Kiểm thử độc lập' : 'Benchmark Rig'}</span>
            </div>
            <div className="mt-2 text-2xl font-serif font-bold text-[#FFF6EE] sm:text-3xl">
              100%
            </div>
            <p className="mt-1 font-mono text-[11px] text-[#A89280]">
              {language === 'vi' ? 'Đo lường trên GPU thực' : 'Standardized workloads'}
            </p>
          </div>

          <div className="rounded-sm border border-[#472718] bg-[#24130C]/90 p-4 shadow-card-espresso">
            <div className="flex items-center gap-2 text-[#FF8452] font-mono text-[11px] font-bold uppercase tracking-wider">
              <Clock className="h-4 w-4" />
              <span>{language === 'vi' ? 'Chu kỳ đồng bộ' : 'Sync Cadence'}</span>
            </div>
            <div className="mt-2 text-2xl font-serif font-bold text-[#FFF6EE] sm:text-3xl">
              15 phút
            </div>
            <p className="mt-1 font-mono text-[11px] text-[#A89280]">
              {language === 'vi' ? 'Tự động kéo telemetry' : 'Real-time telemetry'}
            </p>
          </div>

          <div className="rounded-sm border border-[#472718] bg-[#24130C]/90 p-4 shadow-card-espresso">
            <div className="flex items-center gap-2 text-[#FF8452] font-mono text-[11px] font-bold uppercase tracking-wider">
              <TrendingUp className="h-4 w-4" />
              <span>{language === 'vi' ? 'Chỉ số đo đạc' : 'Key Metrics'}</span>
            </div>
            <div className="mt-2 text-2xl font-serif font-bold text-[#FFF6EE] sm:text-3xl">
              6 chiều
            </div>
            <p className="mt-1 font-mono text-[11px] text-[#A89280]">
              {language === 'vi' ? 'Trí tuệ, Tốc độ, Giá, TTFT' : 'Quality, Speed, TTFT, Cost'}
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="mt-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#FF8452]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'vi'
                  ? `Tìm kiếm nhanh trong ${modelCount} mô hình AI (Claude, GPT, Gemini, DeepSeek, Llama...)...`
                  : `Search across ${modelCount} models (Claude, GPT, Gemini, DeepSeek, Llama...)...`
              }
              className="w-full rounded-sm border border-[#4A2818] bg-[#24130C]/90 py-3 pl-12 pr-4 font-mono text-xs text-[#FFF6EE] placeholder-[#A89280] shadow-2xl focus:border-[#FF6B35] focus:outline-none focus:ring-1 focus:ring-[#FF6B35]/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-[#A89280] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white shadow-glow-orange'
                    : 'bg-[#24130C] text-[#D8C4B6] border border-[#472718] hover:border-[#FF6B35]/50 hover:text-white'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-[#FF8452]'}`} />
                <span>{language === 'vi' ? cat.labelVi : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Section Quick Jump Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#A89280]">
          <span className="font-semibold text-[#8A7262] uppercase tracking-wider text-[10px]">
            {language === 'vi' ? 'Chuyển nhanh đến:' : 'Quick Navigation:'}
          </span>
          <a
            href="#intelligence"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#intelligence')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#FF8452] transition-colors underline decoration-[#472718] underline-offset-4"
          >
            📊 {language === 'vi' ? 'Biểu Đồ Intelligence Index' : 'Intelligence Index'}
          </a>
          <span className="text-[#472718]">•</span>
          <a
            href="#coding-agents"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#coding-agents')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#FF8452] transition-colors underline decoration-[#472718] underline-offset-4"
          >
            💻 {language === 'vi' ? 'Coding Agent Index' : 'Coding Agent Index'}
          </a>
          <span className="text-[#472718]">•</span>
          <a
            href="#price-and-cost"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#price-and-cost')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#FF8452] transition-colors underline decoration-[#472718] underline-offset-4"
          >
            💰 {language === 'vi' ? 'Chi Phí & Giá Cả' : 'Price & Cost'}
          </a>
          <span className="text-[#472718]">•</span>
          <a
            href="#speed"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#speed')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#FF8452] transition-colors underline decoration-[#472718] underline-offset-4"
          >
            ⚡ {language === 'vi' ? 'Tốc Độ & Độ Trễ' : 'Speed & Latency'}
          </a>
        </div>
      </div>
    </section>
  );
};
