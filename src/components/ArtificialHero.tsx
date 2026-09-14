'use client';

import React from 'react';
import { ArticleItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Search, Sparkles, RefreshCw } from 'lucide-react';

interface ArtificialHeroProps {
  articles: ArticleItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalModels: number;
}

export const ArtificialHero: React.FC<ArtificialHeroProps> = ({
  articles,
  searchQuery,
  setSearchQuery,
  totalModels,
}) => {
  const { language } = useLanguage();

  return (
    <section className="container mx-auto max-w-7xl pt-10 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Big Headline & Search */}
        <div className="md:col-span-7 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 text-xs text-neutral-400 mb-5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{language === 'vi' ? `Dữ liệu thời gian thực từ ${totalModels}+ mô hình` : `Live telemetry across ${totalModels}+ models`}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-serif font-normal text-white leading-[1.08] tracking-tight">
            {language === 'vi' ? 'Phân tích độc lập về AI' : 'Independent analysis of AI'}
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-[42ch] leading-relaxed">
            {language === 'vi' 
              ? 'Nắm bắt bức tranh toàn cảnh các mô hình AI để chọn model và nhà cung cấp API tốt nhất cho bạn.'
              : 'Understand the AI landscape to choose the best model and provider for your use case.'}
          </p>

          {/* Search bar inside Hero */}
          <div className="mt-6 max-w-lg">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'vi' ? 'Tìm trong 300+ model (Claude, GPT, Gemini, DeepSeek, K2...)' : 'Search 300+ models (Claude, GPT, Gemini, DeepSeek, K2...)'}
                className="w-full rounded-2xl border border-neutral-800 bg-neutral-900 py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-xs text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Exact Artificial Analysis News / Updates Cards */}
        <div className="md:col-span-5 lg:col-span-5 flex flex-col divide-y divide-neutral-800 border-t md:border-t-0 md:border-l border-neutral-800 md:pl-8">
          {articles.map((art, idx) => (
            <a
              key={idx}
              href={art.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 first:pt-0 last:pb-0 flex items-start justify-between group hover:text-white transition-colors"
            >
              <div className="flex-1 pr-4">
                <span className="uppercase text-purple-400 font-semibold text-[10px] tracking-wider mb-1 block">
                  {idx === 0 ? 'Update' : 'Launch'}
                </span>
                <p className="text-sm sm:text-base font-medium text-neutral-100 group-hover:text-purple-300 transition-colors">
                  {art.title}
                </p>
                <p className="text-xs text-neutral-400 leading-snug mt-1 line-clamp-2">
                  {art.summary}
                </p>
              </div>
              <div className="bg-neutral-900 group-hover:bg-purple-600 rounded-lg flex items-center justify-center h-8 w-8 transition-colors shrink-0 border border-neutral-800">
                <ArrowUpRight className="h-4 w-4 text-neutral-300 group-hover:text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
