'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useViewMode } from '../context/ViewModeContext';
import { 
  Sparkles, 
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
  Compass
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
    { id: 'coding', labelVi: 'Lập trình (Coding)', labelEn: 'Coding & Dev', icon: Sparkles },
    { id: 'speed', labelVi: 'Tốc độ cao (>100 tps)', labelEn: 'High Speed (>100 tps)', icon: Zap },
    { id: 'budget', labelVi: 'Chi phí rẻ (<$1)', labelEn: 'Budget (<$1/M)', icon: SlidersHorizontal },
    { id: 'open_weights', labelVi: 'Mã nguồn mở (Open Weights)', labelEn: 'Open Weights', icon: Activity },
    { id: 'vietnamese', labelVi: 'Tiếng Việt tốt nhất', labelEn: 'Vietnamese Native', icon: TrendingUp },
  ];

  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 md:py-16">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-violet-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Mode Banner & Verification Badge */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/40 px-3.5 py-1.5 text-xs text-violet-300 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">PRO BENCHMARK CLONE</span>
            <span className="text-violet-400">•</span>
            <span className="text-slate-300">
              {language === 'vi' ? 'Dữ liệu đo đạc độc lập' : 'Independent Benchmark Infrastructure'}
            </span>
          </div>

          <button
            onClick={() => setViewMode('simplified')}
            className="group inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/30 hover:bg-amber-950/60 px-3.5 py-1.5 text-xs font-semibold text-amber-300 transition-all shadow-sm"
          >
            <span>⚡ {language === 'vi' ? 'Xem chế độ Dễ hiểu (Người dùng & Doanh nghiệp)' : 'Switch to Easy Mode'}</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {language === 'vi' ? (
              <>
                Đo lường & Phân tích Độc lập <br />
                <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
                  về Các Mô Hình Trí Tuệ Nhân Tạo
                </span>
              </>
            ) : (
              <>
                Independent Analysis of AI <br />
                <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
                  Models & Cloud API Providers
                </span>
              </>
            )}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg max-w-3xl">
            {language === 'vi' ? (
              <>
                Toàn bộ dữ liệu đo kiểm thực tế trên hạ tầng độc lập: 
                <strong className="text-white font-medium"> Điểm thông minh (Intelligence Index)</strong>, 
                <strong className="text-white font-medium"> Tốc độ sinh token (Speed TPS)</strong>, 
                <strong className="text-white font-medium"> Độ trễ gói đầu (TTFT)</strong>, và 
                <strong className="text-white font-medium"> Chi phí trên mỗi tác vụ ($/M tokens & VNĐ)</strong>.
              </>
            ) : (
              <>
                Objective, standardized benchmarks and telemetry for AI models: 
                <strong className="text-white font-medium"> Intelligence Index</strong>, 
                <strong className="text-white font-medium"> Output Speed (Tokens/s)</strong>, 
                <strong className="text-white font-medium"> Time to First Token (TTFT)</strong>, and 
                <strong className="text-white font-medium"> Normalized Task Cost ($/1M tokens)</strong>.
              </>
            )}
          </p>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold uppercase tracking-wider">
              <Layers className="h-4 w-4" />
              <span>{language === 'vi' ? 'Tổng mô hình' : 'Total Models'}</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {modelCount > 0 ? `${modelCount}+` : '650+'}
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              {language === 'vi' ? 'Frontier & Open-source' : 'Frontier & open weights'}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>{language === 'vi' ? 'Kiểm thử độc lập' : 'Benchmark Rig'}</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              100%
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              {language === 'vi' ? 'Đo lường trên GPU thực' : 'Standardized workloads'}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Clock className="h-4 w-4" />
              <span>{language === 'vi' ? 'Chu kỳ đồng bộ' : 'Sync Cadence'}</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              15 phút
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              {language === 'vi' ? 'Tự động kéo telemetry' : 'Real-time telemetry'}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <TrendingUp className="h-4 w-4" />
              <span>{language === 'vi' ? 'Chỉ số đo đạc' : 'Key Metrics'}</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              6 chiều
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              {language === 'vi' ? 'Trí tuệ, Tốc độ, Giá, TTFT' : 'Quality, Speed, TTFT, Cost'}
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="mt-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'vi'
                  ? `Tìm kiếm nhanh trong ${modelCount} mô hình AI (Claude, GPT, Gemini, DeepSeek, Llama...)...`
                  : `Search across ${modelCount} models (Claude, GPT, Gemini, DeepSeek, Llama...)...`
              }
              className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/90 py-3 pl-12 pr-4 text-sm text-white placeholder-slate-400 shadow-xl focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-white"
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
                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-1 ring-violet-400/50'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-violet-400'}`} />
                <span>{language === 'vi' ? cat.labelVi : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Section Quick Jump Links */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
            {language === 'vi' ? 'Chuyển nhanh đến:' : 'Quick Navigation:'}
          </span>
          <a
            href="#benchmarks"
            className="hover:text-violet-300 transition-colors underline decoration-slate-700 underline-offset-4"
          >
            📊 {language === 'vi' ? 'Biểu Đồ Benchmark Cuộn' : 'Scrollable Benchmark Charts'}
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#scatterplot"
            className="hover:text-violet-300 transition-colors underline decoration-slate-700 underline-offset-4"
          >
            📈 {language === 'vi' ? 'Đồ Thị Pareto Frontier' : 'Pareto Frontier'}
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#leaderboard"
            className="hover:text-violet-300 transition-colors underline decoration-slate-700 underline-offset-4"
          >
            📋 {language === 'vi' ? 'Bảng Xếp Hạng 650+ Models' : 'Full Leaderboard Table'}
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#live"
            className="hover:text-violet-300 transition-colors underline decoration-slate-700 underline-offset-4"
          >
            📡 {language === 'vi' ? 'Độ Trễ Provider Realtime' : 'API Telemetry Radar'}
          </a>
          <span className="text-slate-700">•</span>
          <a
            href="#articles"
            className="hover:text-violet-300 transition-colors underline decoration-slate-700 underline-offset-4"
          >
            📰 {language === 'vi' ? 'Đánh Giá Chuyên Sâu & Changelog' : 'Articles & Changelog'}
          </a>
        </div>
      </div>
    </section>
  );
};
