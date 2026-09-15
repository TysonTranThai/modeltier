'use client';

import React, { useState, useMemo } from 'react';
import { ScrapedModel, Tier } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Search, 
  ArrowUpDown, 
  TableProperties, 
  Zap, 
  DollarSign, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Layers,
  Info
} from 'lucide-react';

interface ModelLeaderboardProps {
  models: ScrapedModel[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectModel: (model: ScrapedModel) => void;
}

type SortField = 'intelligence' | 'cost' | 'speed' | 'latency' | 'name' | 'vietnamese';
type SortOrder = 'asc' | 'desc';

export const ModelLeaderboard: React.FC<ModelLeaderboardProps> = ({
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
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          q === '' ||
          m.name.toLowerCase().includes(q) ||
          m.creator.toLowerCase().includes(q) ||
          m.slug.toLowerCase().includes(q);

        if (!matchesSearch) return false;

        if (filterType === 's_tier') return m.tier === 'S';
        if (filterType === 'a_tier') return m.tier === 'A';
        if (filterType === 'open_weights') return m.isOpenWeights;
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

  const getTierBadgeStyle = (tier: Tier) => {
    switch (tier) {
      case 'S':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'A':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'B':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'C':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  return (
    <section id="leaderboard" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-20 overflow-hidden">
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3D2216] pb-5 mb-6 w-full max-w-full">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TableProperties className="h-5 w-5 text-[#FF8452]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#FFF6EE] tracking-tight">
              {language === 'vi' ? `Bảng Xếp Hạng Toàn Bộ ${models.length} Mô Hình` : `Full ${models.length} Models Live Leaderboard`}
            </h2>
            <span className="rounded-sm bg-[#180D07] border border-[#3D2216] px-2.5 py-0.5 text-[11px] text-[#A89280] font-mono font-bold">
              {filteredModels.length} models
            </span>
          </div>
          <p className="text-xs text-[#A89280]">
            {language === 'vi'
              ? 'Dữ liệu được đo lường độc lập và đồng bộ tự động mỗi 15 phút'
              : 'Measured independently and synchronized automatically every 15 minutes'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap w-full max-w-full">
          {[
            { id: 'all', label: language === 'vi' ? 'Tất cả' : 'All' },
            { id: 's_tier', label: '👑 S-Tier' },
            { id: 'a_tier', label: '⭐ A-Tier' },
            { id: 'vietnamese', label: '🇻🇳 Tiếng Việt tốt' },
            { id: 'speed', label: '⚡ Nhanh (>100 tps)' },
            { id: 'budget', label: '💰 Giá rẻ (<$1)' },
            { id: 'open_weights', label: '🔓 Mã nguồn mở' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => { setFilterType(f.id); setCurrentPage(1); }}
              className={`rounded-sm px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                filterType === f.id
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white shadow-glow-orange'
                  : 'bg-[#24130C] text-[#D8C4B6] hover:text-[#FFF6EE] hover:bg-[#2E170E] border border-[#3D2216]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="w-full max-w-full overflow-hidden rounded-sm border border-[#3D2216] bg-[#24130C]/90 shadow-2xl">
        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="border-b border-[#3D2216] bg-[#180D07]/80 text-[#A89280] font-mono font-semibold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="p-3.5 pl-4 sm:pl-6 cursor-pointer hover:text-[#FFF6EE] transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{language === 'vi' ? `Mô hình (${filteredModels.length})` : `Model (${filteredModels.length})`}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="p-3.5 hidden sm:table-cell">{language === 'vi' ? 'Ngữ cảnh' : 'Context'}</th>
                <th className="p-3.5 hidden md:table-cell">{language === 'vi' ? 'Nhà phát triển' : 'Creator'}</th>
                <th
                  onClick={() => handleSort('intelligence')}
                  className="p-3.5 cursor-pointer hover:text-[#FFF6EE] transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-[#FF8452] font-bold">
                    <span>{language === 'vi' ? 'Điểm Thông Minh' : 'Intelligence'}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('cost')}
                  className="p-3.5 cursor-pointer hover:text-[#FFF6EE] transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-emerald-300 font-bold">
                    <span>{language === 'vi' ? `Chi Phí (${currency})` : `Cost (${currency})`}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('speed')}
                  className="p-3.5 cursor-pointer hover:text-[#FFF6EE] transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-amber-300 font-bold">
                    <span>{language === 'vi' ? 'Tốc Độ (tps)' : 'Speed (tps)'}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('latency')}
                  className="p-3.5 hidden lg:table-cell cursor-pointer hover:text-[#FFF6EE] transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-cyan-300">
                    <span>{language === 'vi' ? 'Độ Trễ TTFT' : 'Latency (TTFT)'}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('vietnamese')}
                  className="p-3.5 cursor-pointer hover:text-[#FFF6EE] transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1 text-emerald-400 font-bold">
                    <span>🇻🇳 {language === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="p-3.5 pr-4 sm:pr-6 text-right">{language === 'vi' ? 'Chi tiết' : 'Details'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2E170E] text-[#D8C4B6]">
              {displayedModels.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3 px-4">
                      <div className="rounded-sm bg-[#180D07] border border-[#3D2216] p-4 text-[#A89280]">
                        <Search className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-semibold text-[#FFF6EE]">
                        {language === 'vi' 
                          ? 'Không tìm thấy mô hình nào phù hợp' 
                          : 'No models found matching your criteria'}
                      </p>
                      <p className="text-xs text-[#A89280] max-w-md leading-relaxed">
                        {language === 'vi'
                          ? 'Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem đầy đủ danh sách các mô hình.'
                          : 'Try searching with different terms or reset your filters to see all available models.'}
                      </p>
                      {(searchQuery || filterType !== 'all') && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setFilterType('all');
                            setCurrentPage(1);
                          }}
                          className="mt-2 rounded-sm bg-gradient-to-r from-[#FF6B35] to-[#E64A19] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-glow-orange hover:brightness-110 active:scale-[0.98] transition-all"
                        >
                          {language === 'vi' ? 'Xóa bộ lọc & tìm kiếm' : 'Reset filters & search'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                displayedModels.map((m, idx) => {
                const rank = (currentPage - 1) * pageSize + idx + 1;

                return (
                  <tr
                    key={m.id}
                    onClick={() => onSelectModel(m)}
                    className="hover:bg-[#2E170E]/50 transition-colors cursor-pointer group"
                  >
                    {/* Model Name & Rank */}
                    <td className="p-3.5 pl-4 sm:pl-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#A89280] w-5">
                          {rank}.
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-[#FFF6EE] group-hover:text-[#FF8452] transition-colors truncate">
                              {m.name}
                            </span>
                            <span className={`px-1.5 py-0.2 rounded-sm font-mono text-[9px] font-black border ${getTierBadgeStyle(m.tier)}`}>
                              {m.tier}
                            </span>
                            {m.isOpenWeights && (
                              <span className="bg-[#180D07] border border-[#3D2216] text-[#A89280] px-1 py-0.2 rounded-sm font-mono text-[9px]">
                                OSS
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 block sm:hidden">
                            {m.creator} • {m.contextWindow}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Context Window */}
                    <td className="p-3.5 hidden sm:table-cell text-[#A89280] font-mono">
                      {m.contextWindow}
                    </td>

                    {/* Creator */}
                    <td className="p-3.5 hidden md:table-cell text-[#D8C4B6]">
                      {m.creator}
                    </td>

                    {/* Intelligence Index */}
                    <td className="p-3.5 text-right font-mono font-bold text-[#FFF6EE]">
                      {m.intelligenceScoreRaw !== '--' ? m.intelligenceScoreRaw : '—'}
                    </td>

                    {/* Cost per Task */}
                    <td className="p-3.5 text-right font-mono text-emerald-400 font-semibold truncate">
                      {m.costPerTaskUSD > 0
                        ? formatCost(m.costPerTaskUSD)
                        : (m.costPerTaskRaw || '—')}
                    </td>

                    {/* Speed */}
                    <td className="p-3.5 text-right font-mono text-amber-400 font-semibold">
                      {m.outputSpeedRaw !== '--' ? `${m.outputSpeedRaw}` : '—'}
                    </td>

                    {/* Latency */}
                    <td className="p-3.5 hidden lg:table-cell text-right font-mono text-[#A89280]">
                      {m.latencyRaw !== '--' ? `${m.latencyRaw}s` : '—'}
                    </td>

                    {/* Vietnamese Rating */}
                    <td className="p-3.5 text-right font-mono font-bold text-emerald-400">
                      {m.vietnameseRating}/100
                    </td>

                    {/* Action Links */}
                    <td className="p-3.5 pr-4 sm:pr-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectModel(m);
                        }}
                        className="rounded-sm border border-[#472718] bg-[#24130C] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[#D8C4B6] hover:text-[#FFF6EE] hover:border-[#FF6B35]/50 hover:bg-[#3D2216] transition-all"
                      >
                        {language === 'vi' ? 'Xem' : 'View'}
                      </button>
                    </td>
                  </tr>
                );
              })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination & Count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-[#3D2216] bg-[#180D07] text-xs text-[#A89280]">
          <div>
            {language === 'vi' ? (
              <>
                Hiển thị <span className="font-bold text-[#FFF6EE]">{displayedModels.length}</span> trên tổng số{' '}
                <span className="font-bold text-[#FFF6EE]">{filteredModels.length}</span> mô hình
              </>
            ) : (
              <>
                Showing <span className="font-bold text-[#FFF6EE]">{displayedModels.length}</span> of{' '}
                <span className="font-bold text-[#FFF6EE]">{filteredModels.length}</span> models
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="rounded-sm border border-[#3D2216] bg-[#24130C] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#D8C4B6] hover:text-[#FFF6EE] hover:bg-[#2E170E] hover:border-[#FF6B35]/50 transition-all"
            >
              {showAll ? (language === 'vi' ? 'Phân trang' : 'Paginate') : (language === 'vi' ? `Xem tất cả ${filteredModels.length}` : `Show All ${filteredModels.length}`)}
            </button>

            {!showAll && totalPages > 1 && (
              <div className="flex items-center gap-1 font-mono">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-sm border border-[#3D2216] bg-[#24130C] p-1.5 text-[#D8C4B6] disabled:opacity-30 hover:bg-[#2E170E] hover:border-[#FF6B35]/50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2 font-mono text-xs">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-sm border border-[#3D2216] bg-[#24130C] p-1.5 text-[#D8C4B6] disabled:opacity-30 hover:bg-[#2E170E] hover:border-[#FF6B35]/50"
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
