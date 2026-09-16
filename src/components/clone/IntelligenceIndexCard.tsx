'use client';

import React, { useState, useMemo, useRef } from 'react';
import { ScrapedModel } from '../../types';
import { CompanyLogo, getCreatorColor } from './CompanyLogo';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Link2, 
  ImageDown, 
  Table, 
  ChevronsUpDown, 
  SlidersHorizontal, 
  Plus, 
  Info, 
  Check,
  Filter,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface IntelligenceIndexCardProps {
  models: ScrapedModel[];
  onSelectModel?: (model: ScrapedModel) => void;
  searchQuery?: string;
  activeCategory?: string;
}

type SubTab = 'open_weights' | 'reasoning' | 'modalities' | 'country';

export const IntelligenceIndexCard: React.FC<IntelligenceIndexCardProps> = ({
  models,
  onSelectModel,
  searchQuery,
  activeCategory,
}) => {
  const { language } = useLanguage();
  const [modelLimit, setModelLimit] = useState<number>(26);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('open_weights');
  const [openWeightsFilter, setOpenWeightsFilter] = useState<'all' | 'open' | 'proprietary'>('all');
  const [reasoningFilter, setReasoningFilter] = useState<'all' | 'reasoning' | 'standard'>('all');
  const [modalityFilter, setModalityFilter] = useState<'all' | 'vision' | 'text'>('all');
  const [countryFilter, setCountryFilter] = useState<'all' | 'us' | 'cn' | 'fr'>('all');
  
  const [viewFormat, setViewFormat] = useState<'chart' | 'table'>('chart');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSelectorDropdown, setShowSelectorDropdown] = useState(false);
  const chartScrollRef = useRef<HTMLDivElement>(null);

  // Filter and sort models by Intelligence Index
  const displayModels = useMemo(() => {
    let list = [...models].filter((m) => m.intelligenceScore > 0);

    // Global Search Query
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.creator.toLowerCase().includes(q) ||
          m.slug.toLowerCase().includes(q)
      );
    }

    // Global Category Filter
    if (activeCategory && activeCategory !== 'all') {
      if (activeCategory === 'open_weights') list = list.filter((m) => m.isOpenWeights);
      if (activeCategory === 'reasoning') list = list.filter((m) => m.isReasoning || m.name.toLowerCase().includes('r1') || m.name.toLowerCase().includes('o1') || m.name.toLowerCase().includes('o3'));
      if (activeCategory === 'speed') list = list.filter((m) => m.outputSpeed >= 100);
      if (activeCategory === 'budget') list = list.filter((m) => m.costPerTaskUSD > 0 && m.costPerTaskUSD <= 1.0);
      if (activeCategory === 'coding') list = list.filter((m) => m.name.toLowerCase().includes('code') || m.name.toLowerCase().includes('coder') || m.name.toLowerCase().includes('dev') || ((m as unknown as { codingScore?: number }).codingScore ?? 0) >= 70);
      if (activeCategory === 'vietnamese') list = list.filter((m) => m.intelligenceScore >= 60);
    }

    // Apply subtab filters
    if (activeSubTab === 'open_weights') {
      if (openWeightsFilter === 'open') list = list.filter((m) => m.isOpenWeights);
      if (openWeightsFilter === 'proprietary') list = list.filter((m) => !m.isOpenWeights);
    } else if (activeSubTab === 'reasoning') {
      if (reasoningFilter === 'reasoning') list = list.filter((m) => m.isReasoning);
      if (reasoningFilter === 'standard') list = list.filter((m) => !m.isReasoning);
    } else if (activeSubTab === 'modalities') {
      if (modalityFilter === 'vision') list = list.filter((m) => m.hasVision);
      if (modalityFilter === 'text') list = list.filter((m) => !m.hasVision);
    } else if (activeSubTab === 'country') {
      if (countryFilter === 'us') list = list.filter((m) => ['openai', 'anthropic', 'google', 'meta', 'xai'].some(c => m.creator.toLowerCase().includes(c)));
      if (countryFilter === 'cn') list = list.filter((m) => ['deepseek', 'alibaba', 'zhipu', 'moonshot', 'minimax'].some(c => m.creator.toLowerCase().includes(c)));
      if (countryFilter === 'fr') list = list.filter((m) => m.creator.toLowerCase().includes('mistral'));
    }

    list.sort((a, b) => b.intelligenceScore - a.intelligenceScore);
    return list.slice(0, modelLimit);
  }, [models, modelLimit, activeSubTab, openWeightsFilter, reasoningFilter, modalityFilter, countryFilter, searchQuery, activeCategory]);

  const maxScore = useMemo(() => {
    if (displayModels.length === 0) return 60;
    return Math.max(...displayModels.map((m) => m.intelligenceScore), 55);
  }, [displayModels]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleScrollLeft = () => {
    if (chartScrollRef.current) {
      chartScrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (chartScrollRef.current) {
      chartScrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div id="artificial-analysis-intelligence-index" className="scroll-mt-24 w-full max-w-full overflow-hidden rounded-lg border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-8 text-[#FFF6EE] shadow-2xl backdrop-blur-md transition-all">
      {/* Top Header & Toolbar Row */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-[#331A10]">
        {/* Left Title & Description */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#FF6B35] animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF8452]">
              {language === 'vi' ? 'Tiêu chuẩn Đo lường Độc lập' : 'Standardized Benchmark'}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-[#FFF6EE] flex items-center gap-2 flex-wrap">
            <span>
              {language === 'vi' ? 'Chỉ số Trí tuệ Toàn diện' : 'Artificial Analysis Intelligence Index'}
            </span>
            <span className="text-sm font-sans text-[#A89280] font-normal hidden sm:inline">
              (Artificial Analysis Intelligence Index)
            </span>
          </h3>
          <p className="mt-2.5 text-xs leading-relaxed text-[#C7B299] font-light max-w-xl">
            {language === 'vi' ? (
              <>
                Chỉ số <strong className="text-[#FFF6EE] font-medium">Artificial Analysis Intelligence Index v4.3</strong> tổng hợp kết quả từ 10 bài kiểm thử độc lập (incorporates 10 evaluations: AA-Briefcase, GDPval-AA v2, AutomationBench-AA, Terminal-Bench v4.0, SciCode, Humanity&apos;s Last Exam, GDP.pdf, CritPt, AA-Omniscience, AA-LCR v1.1) nhằm xác định năng lực suy luận và giải quyết vấn đề thực chiến.
              </>
            ) : (
              <>
                Artificial Analysis Intelligence Index v4.3 incorporates 10 evaluations: AA-Briefcase, GDPval-AA v2, AutomationBench-AA, Terminal-Bench v4.0, SciCode, Humanity&apos;s Last Exam, GDP.pdf, CritPt, AA-Omniscience, AA-LCR v1.1. Standardized benchmark of frontier models.
              </>
            )}
          </p>
        </div>

        {/* Right Action Controls */}
        <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Scroll Navigation Buttons */}
            {viewFormat === 'chart' && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  onClick={handleScrollLeft}
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#3D2216] bg-[#160B06] text-[#C7B299] hover:border-[#FF6B35] hover:text-[#FFF6EE] transition-colors shadow-sm"
                  title="Scroll Left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleScrollRight}
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#3D2216] bg-[#160B06] text-[#C7B299] hover:border-[#FF6B35] hover:text-[#FFF6EE] transition-colors shadow-sm"
                  title="Scroll Right"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#3D2216] bg-[#160B06] text-[#C7B299] hover:border-[#FF6B35] hover:text-white transition-colors shadow-sm"
              title={language === 'vi' ? 'Sao chép liên kết biểu đồ' : 'Copy link'}
            >
              {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Link2 className="h-4 w-4" />}
            </button>

            {/* Download Image */}
            <button
              onClick={() => window.print()}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#3D2216] bg-[#160B06] text-[#C7B299] hover:border-[#FF6B35] hover:text-white transition-colors shadow-sm"
              title={language === 'vi' ? 'In hoặc Lưu biểu đồ' : 'Print or Save Chart'}
            >
              <ImageDown className="h-4 w-4" />
            </button>

            {/* Table View Toggle */}
            <button
              onClick={() => setViewFormat(viewFormat === 'chart' ? 'table' : 'chart')}
              className={`flex h-8 items-center gap-1.5 px-3 rounded-sm border text-xs font-mono font-medium transition-colors shadow-sm ${
                viewFormat === 'table'
                  ? 'border-[#FF6B35] bg-[#FF6B35] text-white shadow-sm'
                  : 'border-[#3D2216] bg-[#160B06] text-[#C7B299] hover:border-[#FF6B35] hover:text-white'
              }`}
              title="Toggle View"
            >
              <Table className="h-3.5 w-3.5" />
              <span>{viewFormat === 'chart' ? (language === 'vi' ? 'Bảng số liệu' : 'Table') : (language === 'vi' ? 'Biểu đồ' : 'Chart')}</span>
            </button>

            {/* Model Count Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSelectorDropdown(!showSelectorDropdown)}
                className="inline-flex h-8 items-center gap-2 rounded-sm border border-[#3D2216] bg-[#160B06] px-3 font-mono text-xs font-semibold text-[#FFF6EE] hover:border-[#FF6B35] transition-colors shadow-sm"
              >
                <span>
                  {language === 'vi' 
                    ? `Top ${modelLimit} trên ${models.length} mô hình`
                    : `${modelLimit} of ${models.length} models`}
                </span>
                <ChevronsUpDown className="h-3.5 w-3.5 text-[#FF8452]" />
              </button>

              {showSelectorDropdown && (
                <div className="absolute right-0 top-10 z-30 w-48 rounded-sm border border-[#3D2216] bg-[#160B06] p-1.5 text-xs shadow-2xl animate-in fade-in zoom-in-95 font-mono">
                  {[10, 15, 20, 26, 40, 60].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setModelLimit(num);
                        setShowSelectorDropdown(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left font-mono text-xs transition-colors ${
                        modelLimit === num ? 'bg-[#FF6B35] text-white font-bold' : 'text-[#C7B299] hover:bg-[#2A160E] hover:text-[#FFF6EE]'
                      }`}
                    >
                      <span>{language === 'vi' ? `Top ${num} mô hình hàng đầu` : `Top ${num} models`}</span>
                      {modelLimit === num && <Check className="h-3.5 w-3.5 text-white" />}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setModelLimit(models.length);
                      setShowSelectorDropdown(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left font-mono text-xs transition-colors ${
                      modelLimit === models.length ? 'bg-[#FF6B35] text-white font-bold' : 'text-[#C7B299] hover:bg-[#2A160E] hover:text-[#FFF6EE]'
                    }`}
                  >
                    <span>{language === 'vi' ? `Tất cả ${models.length} mô hình` : `All ${models.length} models`}</span>
                    {modelLimit === models.length && <Check className="h-3.5 w-3.5 text-white" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add Model Button & Watermark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModelLimit(Math.min(models.length, modelLimit + 10))}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF8452] hover:text-[#FFF6EE] transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>
                {language === 'vi' ? 'Thêm mô hình từ nhà phát hành' : 'Add model from specific provider'}
              </span>
            </button>
            <span className="text-[#3D2216]">•</span>
            <div className="flex items-center gap-1 font-serif text-xs font-semibold text-[#FF6B35]">
              <span>⁂ Artificial Analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Area - Engineered with Absolute Zero Overlap */}
      {viewFormat === 'chart' ? (
        <div 
          ref={chartScrollRef}
          className="relative w-full max-w-full pt-8 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#3D2216] hover:scrollbar-thumb-[#FF6B35]/50 scrollbar-track-[#140A06]"
        >
          {/* Chart Canvas Area */}
          <div className="relative min-w-max pr-12">
            {/* Horizontal Grid Lines */}
            <div className="absolute inset-x-0 top-8 h-[280px] flex flex-col justify-between pointer-events-none text-[10px] text-[#7D6657] font-mono">
              <div className="border-b border-[#2C160C] w-full flex justify-end pr-2">
                <span className="bg-[#1E0F09] px-1">{Math.round(maxScore)}</span>
              </div>
              <div className="border-b border-[#2C160C] w-full flex justify-end pr-2">
                <span className="bg-[#1E0F09] px-1">{Math.round((maxScore * 3) / 4)}</span>
              </div>
              <div className="border-b border-[#2C160C] w-full flex justify-end pr-2">
                <span className="bg-[#1E0F09] px-1">{Math.round(maxScore / 2)}</span>
              </div>
              <div className="border-b border-[#2C160C] w-full flex justify-end pr-2">
                <span className="bg-[#1E0F09] px-1">{Math.round(maxScore / 4)}</span>
              </div>
              <div className="border-b-2 border-[#4A2617] w-full flex justify-end pr-2">
                <span className="bg-[#1E0F09] px-1 font-bold text-[#A89280]">0</span>
              </div>
            </div>

            {/* Vertical Columns Stack */}
            <div className="relative flex items-end justify-start gap-3 sm:gap-4 px-4 h-[280px] z-10">
              {displayModels.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full h-full text-center py-12">
                  <Info className="h-8 w-8 text-[#FF8452] mb-3 opacity-80" />
                  <p className="text-sm font-semibold text-[#FFF6EE]">
                    {language === 'vi' ? 'Không tìm thấy mô hình phù hợp với bộ lọc' : 'No matching models found'}
                  </p>
                  <p className="text-xs text-[#A89280] mt-1">
                    {language === 'vi' ? 'Hãy thử điều chỉnh từ khóa tìm kiếm hoặc chọn danh mục khác.' : 'Try adjusting your search query or selecting a different filter.'}
                  </p>
                </div>
              ) : (
                displayModels.map((model, idx) => {
                  const heightPercent = Math.max(10, Math.min(100, (model.intelligenceScore / maxScore) * 100));
                  const barColor = getCreatorColor(model.creator, model.name);
                  const scoreInt = Math.round(model.intelligenceScore);

                  return (
                    <div
                      key={model.slug || model.id || idx}
                      onClick={() => onSelectModel && onSelectModel(model)}
                      className="group relative flex flex-col items-center cursor-pointer w-9 sm:w-10 h-full justify-end flex-shrink-0"
                    >
                      {/* Hover Floating Tooltip with Smooth Scale & Backdrop Blur */}
                      <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -top-14 z-30 transition-all duration-200 transform scale-95 group-hover:scale-100 group-hover:-translate-y-1.5 bg-[#120703]/95 backdrop-blur-md border border-[#FF6B35]/60 text-[#FFF6EE] rounded-sm px-3.5 py-2 text-xs shadow-2xl whitespace-nowrap">
                        <div className="font-bold text-[#FFF6EE] flex items-center gap-1.5">
                          <span className="text-[#FF8452]">#{idx + 1}</span>
                          <span>{model.name}</span>
                        </div>
                        <div className="text-[11px] text-[#C7B299] mt-0.5">
                          {language === 'vi' ? 'Điểm Trí tuệ:' : 'Score:'} <strong className="text-[#FF8452] font-mono">{model.intelligenceScore.toFixed(1)}</strong> • {model.creator}
                        </div>
                      </div>

                      {/* Score Number Floating ABOVE the bar (Fixed height container) */}
                      <div className="mb-1.5 flex items-center justify-center shrink-0 h-5">
                        <span className="font-mono text-[11px] font-bold text-[#FFF6EE] group-hover:text-[#FF8452] group-hover:scale-110 transition-all drop-shadow-sm select-none">
                          {scoreInt}
                        </span>
                      </div>

                      {/* Vertical Bar with Solid Color & Headroom-bounded Height */}
                      <div className="w-full h-[225px] flex items-end">
                        <div
                          style={{
                            height: `${heightPercent}%`,
                            backgroundColor: barColor,
                          }}
                          className="w-full rounded-t-lg transition-all duration-500 ease-out group-hover:brightness-125 group-hover:scale-y-[1.02] group-hover:shadow-glow-orange shadow-sm relative"
                        >
                          {/* Subtle Glassmorphic Highlight inside top of bar */}
                          <div className="absolute top-0 inset-x-0 h-1 bg-white/25 rounded-t-lg pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Technical Baseline Divider */}
            <div className="h-0.5 w-full bg-[#4A2617] mt-0 relative z-10" />

            {/* Dedicated Bottom Labels Track (Below Baseline, Zero Collision) */}
            <div className="relative flex items-start justify-start gap-3 sm:gap-4 px-4 pt-3 h-36 z-10">
              {displayModels.map((model, idx) => (
                <div
                  key={`label-${model.slug || model.id || idx}`}
                  onClick={() => onSelectModel && onSelectModel(model)}
                  className="group flex flex-col items-center w-9 sm:w-10 flex-shrink-0 cursor-pointer"
                >
                  {/* Company Logo Badge */}
                  <div className="flex items-center justify-center h-6 w-6 rounded-sm bg-[#160B06] border border-[#3D2216] group-hover:border-[#FF6B35]/60 transition-colors shadow-sm">
                    <CompanyLogo creator={model.creator} size={15} />
                  </div>

                  {/* 45-degree Angled Model Label text angled DOWNWARDS cleanly */}
                  <div className="relative h-28 w-full mt-2 flex justify-center">
                    <div className="absolute top-0 left-1/2 origin-top-left rotate-45 -rotate-45-label whitespace-nowrap pointer-events-none">
                      <span className="text-[11px] font-medium text-[#C7B299] group-hover:text-[#FF8452] group-hover:font-semibold transition-colors block max-w-[140px] truncate select-none">
                        {model.name} {model.effort ? `(${model.effort})` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Footnote Line */}
          <div className="mt-4 pt-4 border-t border-[#331A10] flex items-center justify-between text-xs text-[#A89280]">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-[#FF6B35]" />
              <span>
                {language === 'vi' 
                  ? 'Chỉ số Trí tuệ Nhân tạo Độc lập (Artificial Analysis Intelligence Index) • Cập nhật trực tiếp từ phòng lab'
                  : 'Artificial Analysis Intelligence Index • Real-time telemetry from independent eval harness'}
              </span>
            </div>
            <button 
              onClick={() => setModelLimit(Math.min(models.length, modelLimit + 10))}
              className="inline-flex items-center gap-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#FF8452] hover:text-[#FFF6EE] transition-colors p-1"
              title="Show more models"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{language === 'vi' ? 'Xem thêm 10 mô hình' : 'Add 10 more'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto py-4 w-full max-w-full">
          <table className="w-full text-left text-xs border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-[#331A10] text-[#A89280] font-semibold uppercase tracking-wider font-mono">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Mô hình AI' : 'Model'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Nhà phát triển' : 'Creator'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Chỉ số Trí tuệ' : 'Intelligence Index'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Tốc độ (TPS)' : 'Speed'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Chi phí / 1M token' : 'Cost / 1M'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Bản quyền' : 'License'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C160C]">
              {displayModels.map((m, idx) => (
                <tr 
                  key={m.id || idx}
                  onClick={() => onSelectModel && onSelectModel(m)}
                  className="hover:bg-[#25120B] cursor-pointer transition-colors"
                >
                  <td className="py-3 px-3 font-mono text-[#8A7262]">#{idx + 1}</td>
                  <td className="py-3 px-3 font-semibold text-[#FFF6EE] flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={15} />
                    <span>{m.name}</span>
                  </td>
                  <td className="py-3 px-3 text-[#C7B299]">{m.creator}</td>
                  <td className="py-3 px-3 font-bold text-[#FF8452] font-mono text-sm">{m.intelligenceScore.toFixed(1)}</td>
                  <td className="py-3 px-3 text-[#C7B299]">{m.outputSpeed > 0 ? `${Math.round(m.outputSpeed)} tps` : '—'}</td>
                  <td className="py-3 px-3 text-[#C7B299] font-mono">${m.costPerTaskUSD.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-sm font-mono text-[10px] font-semibold ${
                      m.isOpenWeights ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-[#160B06] text-[#A89280] border border-[#3D2216]'
                    }`}>
                      {m.isOpenWeights ? (language === 'vi' ? 'Mở (Open)' : 'Open') : (language === 'vi' ? 'Độc quyền (API)' : 'Proprietary')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4 Bottom Filter Segment Tabs (Exact match to screenshot with full Vietnamese labels) */}
      <div className="mt-8 border-t border-[#331A10] pt-6 w-full max-w-full">
        <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 rounded-sm bg-[#160B06] p-1 sm:p-1.5 text-xs font-mono text-[#C7B299] border border-[#3D2216]">
          <button
            onClick={() => setActiveSubTab('open_weights')}
            className={`rounded-sm px-2.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 ${
              activeSubTab === 'open_weights'
                ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white shadow-glow-orange font-bold'
                : 'text-[#A89280] hover:text-[#FFF6EE] hover:bg-[#24120A]'
            }`}
          >
            {language === 'vi' ? 'Trọng số Mở / Độc quyền' : 'Open Weights / Proprietary'}
          </button>

          <button
            onClick={() => setActiveSubTab('reasoning')}
            className={`rounded-sm px-2.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 ${
              activeSubTab === 'reasoning'
                ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white shadow-glow-orange font-bold'
                : 'text-[#A89280] hover:text-[#FFF6EE] hover:bg-[#24120A]'
            }`}
          >
            {language === 'vi' ? 'Mô hình Suy luận (Reasoning)' : 'Reasoning / Non-Reasoning'}
          </button>

          <button
            onClick={() => setActiveSubTab('modalities')}
            className={`rounded-sm px-2.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 ${
              activeSubTab === 'modalities'
                ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white shadow-glow-orange font-bold'
                : 'text-[#A89280] hover:text-[#FFF6EE] hover:bg-[#24120A]'
            }`}
          >
            {language === 'vi' ? 'Văn bản / Đa phương thức' : 'Text Only / Multimodal Inputs'}
          </button>

          <button
            onClick={() => setActiveSubTab('country')}
            className={`rounded-sm px-2.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200 ${
              activeSubTab === 'country'
                ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white shadow-glow-orange font-bold'
                : 'text-[#A89280] hover:text-[#FFF6EE] hover:bg-[#24120A]'
            }`}
          >
            {language === 'vi' ? 'Theo Quốc gia' : 'By Country'}
          </button>
        </div>

        {/* Sub-tab active rectangular chip toggles */}
        <div className="mt-3.5 flex items-center gap-2 px-1 text-xs">
          {activeSubTab === 'open_weights' && (
            <div className="flex items-center gap-2 text-[#C7B299] flex-wrap">
              <span className="text-[#8A7262] text-[11px] font-mono">{language === 'vi' ? 'BỘ LỌC:' : 'FILTER:'}</span>
              <button
                onClick={() => setOpenWeightsFilter('all')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${openWeightsFilter === 'all' ? 'bg-[#FF6B35] text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Tất cả mô hình' : 'All'}
              </button>
              <button
                onClick={() => setOpenWeightsFilter('open')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${openWeightsFilter === 'open' ? 'bg-emerald-600 text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Chỉ Trọng số Mở (Open Weights)' : 'Open Weights Only'}
              </button>
              <button
                onClick={() => setOpenWeightsFilter('proprietary')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${openWeightsFilter === 'proprietary' ? 'bg-[#FF6B35] text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Chỉ Độc quyền (Proprietary API)' : 'Proprietary Only'}
              </button>
            </div>
          )}

          {activeSubTab === 'reasoning' && (
            <div className="flex items-center gap-2 text-[#C7B299] flex-wrap">
              <span className="text-[#8A7262] text-[11px] font-mono">{language === 'vi' ? 'BỘ LỌC:' : 'FILTER:'}</span>
              <button
                onClick={() => setReasoningFilter('all')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${reasoningFilter === 'all' ? 'bg-[#FF6B35] text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Tất cả' : 'All'}
              </button>
              <button
                onClick={() => setReasoningFilter('reasoning')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${reasoningFilter === 'reasoning' ? 'bg-purple-600 text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Chỉ Reasoning (Suy luận sâu)' : 'Reasoning Only'}
              </button>
              <button
                onClick={() => setReasoningFilter('standard')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${reasoningFilter === 'standard' ? 'bg-[#FF6B35] text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Mô hình Chuẩn (Standard)' : 'Standard Models'}
              </button>
            </div>
          )}

          {activeSubTab === 'modalities' && (
            <div className="flex items-center gap-2 text-[#C7B299] flex-wrap">
              <span className="text-[#8A7262] text-[11px] font-mono">{language === 'vi' ? 'BỘ LỌC:' : 'FILTER:'}</span>
              <button
                onClick={() => setModalityFilter('all')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${modalityFilter === 'all' ? 'bg-[#FF6B35] text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Tất cả' : 'All'}
              </button>
              <button
                onClick={() => setModalityFilter('vision')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${modalityFilter === 'vision' ? 'bg-sky-600 text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Đa phương thức (Hình ảnh / Video)' : 'Multimodal (Vision)'}
              </button>
              <button
                onClick={() => setModalityFilter('text')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${modalityFilter === 'text' ? 'bg-[#FF6B35] text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Chỉ Văn bản (Text Only)' : 'Text Only'}
              </button>
            </div>
          )}

          {activeSubTab === 'country' && (
            <div className="flex items-center gap-2 text-[#C7B299] flex-wrap">
              <span className="text-[#8A7262] text-[11px] font-mono">{language === 'vi' ? 'BỘ LỌC:' : 'FILTER:'}</span>
              <button
                onClick={() => setCountryFilter('all')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${countryFilter === 'all' ? 'bg-[#FF6B35] text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                {language === 'vi' ? 'Tất cả quốc gia' : 'All Countries'}
              </button>
              <button
                onClick={() => setCountryFilter('us')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${countryFilter === 'us' ? 'bg-blue-600 text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                🇺🇸 Hoa Kỳ (US Labs)
              </button>
              <button
                onClick={() => setCountryFilter('cn')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${countryFilter === 'cn' ? 'bg-red-600 text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                🇨🇳 Trung Quốc (China)
              </button>
              <button
                onClick={() => setCountryFilter('fr')}
                className={`px-3 py-1 rounded-sm font-mono text-xs transition-colors ${countryFilter === 'fr' ? 'bg-indigo-600 text-white font-bold shadow-sm' : 'bg-[#160B06] text-[#A89280] hover:text-white border border-[#3D2216]'}`}
              >
                🇫🇷 Pháp (Mistral AI)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
