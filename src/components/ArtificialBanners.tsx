'use client';

import React from 'react';
import { ChangelogItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

interface ArtificialBannersProps {
  changelog: ChangelogItem[];
  onTriggerRecommender: () => void;
}

export const ArtificialBanners: React.FC<ArtificialBannersProps> = ({
  changelog,
  onTriggerRecommender,
}) => {
  const { language } = useLanguage();

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14 lg:mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 7 Columns: Optima + Model Recommender */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Optima */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-black p-6 border border-neutral-800 shadow-xl">
            {/* Animated Halo Glows */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-75 transition-opacity duration-700 group-hover:opacity-100">
              <span className="absolute -left-1/4 -top-1/3 h-2/3 w-2/3 rounded-full bg-purple-600/30 blur-3xl" />
              <span className="absolute -bottom-1/3 -right-1/4 h-2/3 w-2/3 rounded-full bg-emerald-500/25 blur-3xl" />
              <span className="absolute left-1/4 top-1/2 h-1/2 w-1/2 rounded-full bg-purple-500/20 blur-2xl" />
            </span>

            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-baseline gap-2.5">
                <div className="font-serif text-2xl sm:text-3xl text-white font-medium">
                  Optima
                </div>
                <span className="text-xs text-neutral-400">by Artificial Analysis</span>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 group-hover:bg-white transition-colors">
                <ArrowUpRight className="h-4 w-4 text-white group-hover:text-black transition-colors" />
              </div>
            </div>

            <div className="relative mt-8">
              <span className="inline-block bg-emerald-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black rounded mb-2">
                New
              </span>
              <p className="font-serif text-xl sm:text-2xl text-white leading-tight">
                {language === 'vi' ? 'Tự tạo bài kiểm tra Benchmark riêng của bạn' : 'Build your own custom benchmark'}
              </p>
            </div>
          </div>

          {/* Card 2: Model Recommender */}
          <div
            onClick={onTriggerRecommender}
            className="group flex flex-col justify-between rounded-2xl bg-[#37193b] hover:bg-[#431f48] p-6 border border-purple-900/50 shadow-xl transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-serif text-2xl sm:text-3xl text-white font-medium leading-tight">
                {language === 'vi' ? 'Gợi Ý Mô Hình (Recommender)' : 'Model Recommender'}
              </p>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 group-hover:bg-white transition-colors">
                <ArrowUpRight className="h-4 w-4 text-white group-hover:text-black transition-colors" />
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
                {language === 'vi'
                  ? 'Nhận gợi ý mô hình phù hợp tối ưu nhất theo nhu cầu riêng của bạn về độ thông minh, tốc độ và chi phí.'
                  : 'Get personalized model recommendations that optimize for your priorities across intelligence, speed, and cost.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Changelog Timeline Feed */}
        <div className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-[#0c1424] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
            <h3 className="font-serif text-lg font-medium text-white">
              {language === 'vi' ? 'Nhật Ký Cập Nhật (Changelog)' : 'Changelog'}
            </h3>
            <span className="rounded-full bg-blue-950 px-2 py-0.5 text-[10px] text-blue-300 font-semibold border border-blue-800/40">
              Live
            </span>
          </div>

          {/* Scrollable Changelog Items */}
          <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
            {changelog.slice(0, 8).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-neutral-400">
                    {item.date || 'Recent evaluation'}
                  </div>
                  <div className="font-medium text-neutral-200 hover:text-purple-300 transition-colors truncate">
                    {item.modelName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
