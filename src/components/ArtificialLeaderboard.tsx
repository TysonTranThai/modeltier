'use client';

import React, { useState, useMemo } from 'react';
import { ScrapedModel, Tier } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Search, 
  ArrowUpDown, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  DollarSign, 
  Clock, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Info
} from 'lucide-react';

interface ArtificialLeaderboardProps {
  models: ScrapedModel[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectModel: (model: ScrapedModel) => void;
}

type SortField = 'intelligence' | 'cost' | 'speed' | 'latency' | 'name' | 'vietnamese';
type SortOrder = 'asc' | 'desc';

export const ArtificialLeaderboard: React.FC<ArtificialLeaderboardProps> = ({
  models,
  searchQuery,
  setSearchQuery,
  onSelectModel,
}) => {
  const { language } = useLanguage();
  const { formatCost, currency } = useCurrency();

  const [filterType, setFilterType] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('intelligence');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAll, setShowAll] = useState<boolean>(false);
  const pageSize = 25;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filter and sort
  const filteredModels = useMemo(() => {
    return models
      .filter((m) => {
        // Search
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === '' ||
          m.name.toLowerCase().includes(q) ||
          m.creator.toLowerCase().includes(q) ||
          m.slug.toLowerCase().includes(q);

        if (!matchesSearch) return false;

        // Type filter
        if (filterType === 's_tier') return m.tier === 'S';
        if (filterType === 'a_tier') return m.tier === 'A';
        if (filterType === 'open_weights') return m.isOpenWeights;
        if (filterType === 'proprietary') return !m.isOpenWeights;
        if (filterType === 'speed') return m.outputSpeed >= 100;
        if (filterType === 'budget') return m.costPerTaskUSD > 0 && m.costPerTaskUSD <= 1.0;
        if (filterType === 'vietnamese') return m.vietnameseRating >= 90;

        return true;
      })
      .sort((a, b) => {
        let valA: any;
        let valB: any;

        switch (sortField) {
          case 'name':
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
            break;
          case 'cost':
            valA = a.costPerTaskUSD || 999;
            valB = b.costPerTaskUSD || 999;
            break;
          case 'speed':
            valA = a.outputSpeed || 0;
            valB = b.outputSpeed || 0;
            break;
          case 'latency':
            valA = a.latencyFirstChunk || 999;
            valB = b.latencyFirstChunk || 999;
            break;
          case 'vietnamese':
            valA = a.vietnameseRating || 0;
            valB = b.vietnameseRating || 0;
            break;
          case 'intelligence':
          default:
            valA = a.intelligenceScore || 0;
            valB = b.intelligenceScore || 0;
            break;
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [models, searchQuery, filterType, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredModels.length / pageSize);
  const displayedModels = showAll
    ? filteredModels
    : filteredModels.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getTierPill = (tier: Tier) => {
    switch (tier) {
      case 'S':
        return 'bg-red-950 text-red-300 border-red-800/40';
      case 'A':
        return 'bg-amber-950 text-amber-300 border-amber-800/40';
      case 'B':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800/40';
      case 'C':
        return 'bg-blue-950 text-blue-300 border-blue-800/40';
    }
  };

  return (
    <section id="leaderboard" className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-20">
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif text-2xl font-medium text-white">
              {language === 'vi' ? 'Bảng Xếp Hạng Tổng Hợp (LLM Leaderboard)' : 'LLM Leaderboard'}
            </span>
            <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs text-neutral-400 font-mono">
              {filteredModels.length} / {models.length} models
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            {language === 'vi'
              ? 'Toàn bộ mô hình được đo lường độc lập bởi Artificial Analysis • Tự động cập nhật mỗi 15 phút'
              : 'Complete dataset measured independently by Artificial Analysis · Real-time telemetry'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'all', label: language === 'vi' ? 'Tất cả' : 'All' },
            { id: 's_tier', label: '👑 S-Tier' },
            { id: 'a_tier', label: '⭐ A-Tier' },
            { id: 'vietnamese', label: '🇻🇳 Tiếng Việt tốt' },
            { id: 'speed', label: '⚡ Nhanh (>100 tps)' },
            { id: 'budget', label: '💰 Giá rẻ (<$1)' },
            { id: 'open_weights', label: 'Mã nguồn mở' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => { setFilterType(f.id); setCurrentPage(1); }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                filterType === f.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-neutral-800 bg-neutral-900/90 text-neutral-400 font-semibold sticky top-0 z-10">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="p-3 pl-4 sm:pl-6 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Model ({filteredModels.length})</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="p-3 hidden sm:table-cell">Context</th>
                <th className="p-3 hidden md:table-cell">Creator</th>
                <th
                  onClick={() => handleSort('intelligence')}
                  className="p-3 cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-purple-300 font-bold">
                    <span>Intelligence</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('cost')}
                  className="p-3 cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-orange-300 font-bold">
                    <span>Cost / Task</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('speed')}
                  className="p-3 cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-amber-300 font-bold">
                    <span>Speed (tps)</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('latency')}
                  className="p-3 hidden lg:table-cell cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-cyan-300">
                    <span>TTFT (s)</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('vietnamese')}
                  className="p-3 cursor-pointer hover:text-white transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-emerald-400 font-bold">
                    <span>🇻🇳 VN Rating</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="p-3 pr-4 sm:pr-6 text-right">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 text-neutral-300">
              {displayedModels.map((m, idx) => {
                const rank = (currentPage - 1) * pageSize + idx + 1;

                return (
                  <tr
                    key={m.id}
                    onClick={() => onSelectModel(m)}
                    className="hover:bg-neutral-900/60 transition-colors cursor-pointer group"
                  >
                    {/* Model Name & Rank */}
                    <td className="p-3 pl-4 sm:pl-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-neutral-500 w-5">
                          {rank}.
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-neutral-100 group-hover:text-purple-300 transition-colors truncate">
                              {m.name}
                            </span>
                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-black border ${getTierPill(m.tier)}`}>
                              {m.tier}
                            </span>
                            {m.isOpenWeights && (
                              <span className="bg-neutral-800 text-neutral-400 px-1 py-0.2 rounded text-[9px]">
                                OSS
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-500 block sm:hidden">
                            {m.creator} • {m.contextWindow}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Context Window */}
                    <td className="p-3 hidden sm:table-cell text-neutral-400 font-mono">
                      {m.contextWindow}
                    </td>

                    {/* Creator */}
                    <td className="p-3 hidden md:table-cell text-neutral-400">
                      {m.creator}
                    </td>

                    {/* Intelligence Index */}
                    <td className="p-3 text-right font-mono font-bold text-white">
                      {m.intelligenceScoreRaw !== '--' ? m.intelligenceScoreRaw : '—'}
                    </td>

                    {/* Cost per Task */}
                    <td className="p-3 text-right font-mono text-neutral-300 truncate">
                      {m.costPerTaskUSD > 0
                        ? formatCost(m.costPerTaskUSD)
                        : (m.costPerTaskRaw || '—')}
                    </td>

                    {/* Speed */}
                    <td className="p-3 text-right font-mono text-amber-400">
                      {m.outputSpeedRaw !== '--' ? `${m.outputSpeedRaw}` : '—'}
                    </td>

                    {/* Latency */}
                    <td className="p-3 hidden lg:table-cell text-right font-mono text-neutral-400">
                      {m.latencyRaw !== '--' ? `${m.latencyRaw}s` : '—'}
                    </td>

                    {/* Vietnamese Rating */}
                    <td className="p-3 text-right font-mono font-bold text-emerald-400">
                      {m.vietnameseRating}/100
                    </td>

                    {/* Action Links */}
                    <td className="p-3 pr-4 sm:pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={m.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="rounded p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                          title="View on Artificial Analysis"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Pagination & Count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-neutral-800 bg-neutral-950 text-xs text-neutral-400">
          <div>
            {language === 'vi' ? (
              <>
                Hiển thị <span className="font-bold text-white">{displayedModels.length}</span> trên tổng số{' '}
                <span className="font-bold text-white">{filteredModels.length}</span> mô hình
              </>
            ) : (
              <>
                Showing <span className="font-bold text-white">{displayedModels.length}</span> of{' '}
                <span className="font-bold text-white">{filteredModels.length}</span> models
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              {showAll ? (language === 'vi' ? 'Phân trang' : 'Paginate') : (language === 'vi' ? 'Xem tất cả 301' : 'Show All 301')}
            </button>

            {!showAll && totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-neutral-800 bg-neutral-900 p-1 text-neutral-300 disabled:opacity-30 hover:bg-neutral-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2 font-mono">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-neutral-800 bg-neutral-900 p-1 text-neutral-300 disabled:opacity-30 hover:bg-neutral-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
