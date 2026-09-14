'use client';

import React from 'react';
import { Model, Tier, CategoryFilter } from '../types';
import { ModelCard } from './ModelCard';
import { useLanguage } from '../context/LanguageContext';
import { Award, AlertCircle, RefreshCw } from 'lucide-react';

interface TierListProps {
  models: Model[];
  activeCategory: CategoryFilter;
  searchQuery: string;
  onSelectDetails: (model: Model) => void;
  onSelectCompare?: (model: Model) => void;
  onResetFilters: () => void;
}

export const TierList: React.FC<TierListProps> = ({
  models,
  activeCategory,
  searchQuery,
  onSelectDetails,
  onSelectCompare,
  onResetFilters,
}) => {
  const { language, t } = useLanguage();

  // Filter models based on category and search query
  const filteredModels = models.filter((model) => {
    // Search query check
    const matchesSearch =
      searchQuery.trim() === '' ||
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.vietnameseSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.englishSummary.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category filter check
    if (activeCategory === 'all') return true;
    if (activeCategory === 'free_accessible') return model.isFreeTierAvailable;
    if (activeCategory === 'vietnamese') return model.vietnameseRating >= 90;
    if (activeCategory === 'speed') return model.outputSpeed >= 100;
    if (activeCategory === 'budget') return model.outputPricePerMillionUSD <= 2.5 || model.isFreeTierAvailable;
    if (activeCategory === 'coding') return model.codingScore >= 90;
    if (activeCategory === 'reasoning') return model.reasoningScore >= 90;

    return true;
  });

  const tiers: { id: Tier; title: string; description: string; color: string; bgBadge: string }[] = [
    {
      id: 'S',
      title: 'S-Tier (Thần Thoại / Đỉnh Cao)',
      description: t.tierList.tierSDescription,
      color: 'text-red-400',
      bgBadge: 'bg-red-500/10 text-red-300 border-red-500/30'
    },
    {
      id: 'A',
      title: 'A-Tier (Xuất Sắc / Khuyên Dùng)',
      description: t.tierList.tierADescription,
      color: 'text-amber-400',
      bgBadge: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    },
    {
      id: 'B',
      title: 'B-Tier (Thực Dụng / Tiết Kiệm)',
      description: t.tierList.tierBDescription,
      color: 'text-emerald-400',
      bgBadge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'C',
      title: 'C-Tier (Cơ Bản / Chạy Cục Bộ)',
      description: t.tierList.tierCDescription,
      color: 'text-blue-400',
      bgBadge: 'bg-blue-500/10 text-blue-300 border-blue-500/30'
    }
  ];

  return (
    <section id="tierlist" className="py-12 lg:py-16 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-300 border border-violet-500/20 mb-3">
            <Award className="h-4 w-4" />
            <span>{t.tierList.title}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'vi' ? 'Phân Cấp Mô Hình AI Thực Chiến' : 'Practical AI Model Tier List'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.tierList.subtitle}
          </p>
        </div>

        {/* Empty State */}
        {filteredModels.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center max-w-lg mx-auto">
            <AlertCircle className="mx-auto h-12 w-12 text-slate-500" />
            <h3 className="mt-4 text-base font-semibold text-white">
              {language === 'vi' ? 'Không tìm thấy mô hình phù hợp' : 'No matching models found'}
            </h3>
            <p className="mt-2 text-xs text-slate-400">
              {language === 'vi' 
                ? 'Hãy thử thay đổi từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc danh mục.'
                : 'Try adjusting your search terms or clearing the active category filters.'}
            </p>
            <button
              onClick={onResetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-violet-500 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {language === 'vi' ? 'Đặt lại bộ lọc' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="space-y-14">
            {tiers.map((tierInfo) => {
              const tierModels = filteredModels.filter((m) => m.tier === tierInfo.id);
              if (tierModels.length === 0) return null;

              return (
                <div key={tierInfo.id} className="relative">
                  {/* Tier Header Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center justify-center rounded-xl px-3 py-1 text-sm font-black border ${tierInfo.bgBadge}`}>
                        {tierInfo.id}-Tier
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {tierInfo.title}
                      </h3>
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-400">
                        {tierModels.length}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 max-w-xl">
                      {tierInfo.description}
                    </p>
                  </div>

                  {/* Grid of Model Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {tierModels.map((model) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        onSelectDetails={onSelectDetails}
                        onSelectCompare={onSelectCompare}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
