'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CategoryFilter } from '../types';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Compass, 
  Zap, 
  TableProperties,
  Calculator
} from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: CategoryFilter;
  setActiveCategory: (c: CategoryFilter) => void;
  modelCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  modelCount,
}) => {
  const { language, t } = useLanguage();

  const filterCategories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: t.filters.all },
    { id: 'vietnamese', label: t.filters.vietnamese },
    { id: 'coding', label: t.filters.coding },
    { id: 'speed', label: t.filters.speed },
    { id: 'budget', label: t.filters.budget },
    { id: 'reasoning', label: t.filters.reasoning },
    { id: 'open_weights', label: language === 'vi' ? '🔓 Mã Nguồn Mở' : '🔓 Open Weights' },
    { id: 'free_accessible', label: t.filters.free_accessible },
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-12 lg:pt-16 lg:pb-20">
      {/* Background Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/25 via-slate-900/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-medium text-violet-300 shadow-sm backdrop-blur-sm mb-5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{language === 'vi' ? `Theo dõi dữ liệu thực tế ${modelCount} mô hình AI` : `Live tracking across ${modelCount} frontier AI models`}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
            {t.hero.headingStart}{' '}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              {t.hero.headingAccent}
            </span>{' '}
            {t.hero.headingEnd}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {language === 'vi'
              ? 'Không còn bối rối trước những biểu đồ phân tán phức tạp hay thuật ngữ tiếng Anh học thuật. Chúng tôi đơn giản hóa dữ liệu thành Bảng Xếp Hạng trực quan, tính toán chi phí bằng VNĐ và chấm điểm độ nhuyễn tiếng Việt.'
              : 'No more confusing academic scatter plots or dense ML jargon. We simplify frontier AI data into intuitive Tier Lists, real-world VND/USD costs, and native language evaluations.'}
          </p>

          {/* Search Bar */}
          <div className="mt-7 relative max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    document.querySelector('#leaderboard')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                placeholder={language === 'vi' ? 'Tìm nhanh model (ví dụ: Claude 3.7, DeepSeek R1, GPT-4o, Gemini, K2)...' : 'Search models (e.g. Claude 3.7, DeepSeek R1, GPT-4o, Gemini, K2)...'}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 py-3 pl-11 pr-24 text-xs sm:text-sm text-white placeholder-slate-400 shadow-xl backdrop-blur-md transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
              />
              <div className="absolute right-2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-xs text-slate-400 hover:text-white"
                    title="Xóa tìm kiếm"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={() => document.querySelector('#leaderboard')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 transition-colors shadow-sm"
                >
                  {language === 'vi' ? 'Tìm' : 'Search'}
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="#leaderboard"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 hover:from-violet-500 hover:to-indigo-500"
            >
              <TableProperties className="h-4 w-4" />
              {language === 'vi' ? `Bảng Đầy Đủ ${modelCount} Model` : `View All ${modelCount} Models`}
            </a>
            <a
              href="#finder"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Compass className="h-4 w-4 text-purple-400" />
              {t.hero.ctaFinder}
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Calculator className="h-4 w-4 text-emerald-400" />
              {t.nav.calculator}
            </a>
          </div>

          {/* Live Metrics Ticker Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-3.5 backdrop-blur-sm">
            <div className="text-center border-r border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-white">{modelCount}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{language === 'vi' ? 'Mô hình trực tiếp' : 'Models Synced'}</div>
            </div>
            <div className="text-center sm:border-r border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{language === 'vi' ? 'Tiếng Việt hóa' : 'Plain Language'}</div>
            </div>
            <div className="text-center border-r border-slate-800/60">
              <div className="text-xl sm:text-2xl font-black text-amber-400">25.450 đ</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{language === 'vi' ? 'Tỉ giá VNĐ/USD' : 'VND/USD Live Rate'}</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black text-violet-400">15m</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{language === 'vi' ? 'Chu kỳ tự động kéo' : 'Sync Interval'}</div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    document.querySelector('#tierlist')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30 scale-105 ring-1 ring-white/30'
                      : 'border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
