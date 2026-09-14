'use client';

import React, { useState } from 'react';
import { Model, Tier, CategoryFilter } from '../types';
import { ModelCard } from './ModelCard';
import { useLanguage } from '../context/LanguageContext';
import { Award, AlertCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedTiers, setExpandedTiers] = useState<Record<string, boolean>>({});

  const toggleExpand = (tierId: string) => {
    setExpandedTiers((prev) => ({ ...prev, [tierId]: !prev[tierId] }));
  };

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
      title: language === 'vi' ? 'S-Tier (Thần Thoại / Đỉnh Cao)' : 'S-Tier (Apex / Elite)',
      description:
        language === 'vi'
          ? 'Thông minh nhất thế giới, lý luận siêu phàm, giải toán và viết code chuyên gia.'
          : 'Most capable frontier models, expert reasoning, deep logic, top tier coding.',
      color: 'border-[#FF6B35]/60 bg-[#28140B]/90 animate-border-pulse shadow-glow-orange-lg',
      bgBadge: 'bg-gradient-to-r from-[#FF6B35] to-amber-500 text-white shadow-glow-orange',
    },
    {
      id: 'A',
      title: language === 'vi' ? 'A-Tier (Chiến Thần Đa Năng)' : 'A-Tier (All-Round Champions)',
      description:
        language === 'vi'
          ? 'Cân bằng hoàn hảo giữa tốc độ, độ thông minh và chi phí. Lựa chọn số 1 cho 90% nhu cầu.'
          : 'Sweet spot of speed, cost, and high intelligence for 90% of business tasks.',
      color: 'border-amber-500/50 bg-[#24130C]/90',
      bgBadge: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold',
    },
    {
      id: 'B',
      title: language === 'vi' ? 'B-Tier (Tia Chớp Giá Rẻ)' : 'B-Tier (Speed & Budget Workhorses)',
      description:
        language === 'vi'
          ? 'Tốc độ cực nhanh, giá siêu rẻ hoặc miễn phí. Lý tưởng cho xử lý dữ liệu hàng loạt và CSKH.'
          : 'High throughput, ultra low cost or free. Ideal for high-volume automated pipelines.',
      color: 'border-emerald-500/40 bg-[#20110A]/90',
      bgBadge: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
    },
    {
      id: 'C',
      title: language === 'vi' ? 'C-Tier (Cơ Bản / Nhỏ Gọn)' : 'C-Tier (Lightweight / Legacy)',
      description:
        language === 'vi'
          ? 'Mô hình nhỏ gọn chạy được trên laptop cá nhân, điện thoại hoặc phục vụ tác vụ đơn giản.'
          : 'Lightweight models capable of on-device inference or dedicated lightweight tasks.',
      color: 'border-sky-500/40 bg-[#1C0F08]/90',
      bgBadge: 'bg-gradient-to-r from-sky-500 to-blue-500 text-white',
    },
  ];

  return (
    <section id="tierlist" className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 scroll-mt-20 text-[#FFF6EE]">
      {/* Section Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B35]/30 bg-[#24130C] px-3.5 py-1 text-xs font-semibold text-[#FF8452] mb-3">
          <Award className="h-3.5 w-3.5" />
          <span>{language === 'vi' ? 'Phân Hạng Thực Tiễn 2026' : 'Practical Tier Rankings 2026'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#FFF6EE]">
          {t.tierList.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#D8C4B6] font-light">
          {t.tierList.subtitle}
        </p>
      </div>

      {/* Tiers Container */}
      <div className="space-y-12">
        {tiers.map((tier) => {
          const tierModels = filteredModels.filter((m) => m.tier === tier.id);
          const isExpanded = !!expandedTiers[tier.id];
          const displayedTierModels = (searchQuery.trim() !== '' || activeCategory !== 'all' || isExpanded)
            ? tierModels
            : tierModels.slice(0, 6);

          if (tierModels.length === 0 && searchQuery) {
            return null;
          }

          return (
            <div
              key={tier.id}
              className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-md shadow-card-espresso transition-all duration-300 ${tier.color}`}
            >
              {/* Tier Heading Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#381E12]">
                <div className="flex items-center gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-black ${tier.bgBadge}`}>
                    {tier.id}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FFF6EE]">
                      {tier.title}
                    </h3>
                    <p className="text-xs text-[#D8C4B6] font-light mt-0.5">
                      {tier.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#180D07] px-3 py-1 text-xs font-mono font-semibold text-[#FF8452] border border-[#381E12]">
                    {tierModels.length} {language === 'vi' ? 'mô hình' : 'models'}
                  </span>
                </div>
              </div>

              {/* Models Grid */}
              {tierModels.length > 0 ? (
                <div className="mt-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {displayedTierModels.map((model) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        onSelectDetails={onSelectDetails}
                        onSelectCompare={onSelectCompare}
                      />
                    ))}
                  </div>

                  {/* Show more button if tier has more than 6 models */}
                  {tierModels.length > 6 && !searchQuery && activeCategory === 'all' && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => toggleExpand(tier.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#472718] bg-[#1A0E08] px-5 py-2 text-xs font-semibold text-[#FF8452] hover:border-[#FF6B35] hover:text-white transition-all shadow-sm"
                      >
                        {isExpanded ? (
                          <>
                            <span>{language === 'vi' ? `Thu gọn (hiển thị 6 / ${tierModels.length})` : `Show less (6 / ${tierModels.length})`}</span>
                            <ChevronUp className="h-3.5 w-3.5" />
                          </>
                        ) : (
                          <>
                            <span>{language === 'vi' ? `Xem thêm ${tierModels.length - 6} mô hình ${tier.id}-Tier khác` : `Show ${tierModels.length - 6} more ${tier.id}-Tier models`}</span>
                            <ChevronDown className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 text-center py-8 text-xs text-[#A89280]">
                  {language === 'vi' ? 'Không có mô hình nào khớp bộ lọc trong Tier này.' : 'No models match your filter in this tier.'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results Fallback */}
      {filteredModels.length === 0 && (
        <div className="mt-12 rounded-3xl border border-[#472718] bg-[#24130C]/90 p-12 text-center shadow-card-espresso">
          <AlertCircle className="mx-auto h-12 w-12 text-[#FF6B35]" />
          <h3 className="mt-4 text-lg font-serif font-bold text-[#FFF6EE]">
            {language === 'vi' ? 'Không tìm thấy mô hình phù hợp' : 'No models found'}
          </h3>
          <p className="mt-2 text-xs text-[#D8C4B6]">
            {language === 'vi'
              ? `Không có kết quả nào cho từ khóa "${searchQuery}". Vui lòng thử lại.`
              : `No models match the search term "${searchQuery}". Please try another keyword.`}
          </p>
          <button
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-2.5 text-xs font-bold text-white shadow-glow-orange hover:brightness-110 transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{language === 'vi' ? 'Đặt lại bộ lọc' : 'Reset filters'}</span>
          </button>
        </div>
      )}
    </section>
  );
};
