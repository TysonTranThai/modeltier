'use client';

import React, { useState, useRef, useMemo } from 'react';
import { ScrapedModel } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { getCreatorColor } from './clone/CompanyLogo';
import { 
  BarChart2, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  Zap, 
  Clock, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  Brain, 
  Info,
  SlidersHorizontal,
  Timer
} from 'lucide-react';

export type BenchmarkMetric = 
  | 'intelligence'
  | 'speed'
  | 'latency'
  | 'totalTime'
  | 'cost'
  | 'open_weights'
  | 'reasoning';

interface BenchmarkScrollExplorerProps {
  models: ScrapedModel[];
  onSelectModel: (model: ScrapedModel) => void;
}

export const BenchmarkScrollExplorer: React.FC<BenchmarkScrollExplorerProps> = ({
  models,
  onSelectModel,
}) => {
  const { language } = useLanguage();
  const { formatCost, currency } = useCurrency();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [activeMetric, setActiveMetric] = useState<BenchmarkMetric>('intelligence');
  const [filterType, setFilterType] = useState<string>('all');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const metricTabs = [
    { id: 'intelligence', label: language === 'vi' ? 'Điểm Thông Minh' : 'Intelligence Index', icon: Brain },
    { id: 'speed', label: language === 'vi' ? 'Tốc Độ (Tokens/s)' : 'Output Speed', icon: Zap },
    { id: 'latency', label: language === 'vi' ? 'Độ Trễ (TTFT)' : 'Latency (TTFT)', icon: Clock },
    { id: 'totalTime', label: language === 'vi' ? 'Thời Gian Phản Hồi' : 'Response Time', icon: Timer },
    { id: 'cost', label: language === 'vi' ? 'Chi Phí / Task' : 'Cost per Task', icon: DollarSign },
    { id: 'open_weights', label: language === 'vi' ? 'Mã Nguồn Mở' : 'Open Weights', icon: ShieldCheck },
    { id: 'reasoning', label: language === 'vi' ? 'Mô Hình Suy Luận' : 'Reasoning Models', icon: Cpu },
  ];

  // Process and sort models for the active benchmark
  const rankedModels = useMemo(() => {
    let list = models.filter((m) => {
      // Sub-filter
      if (filterType === 'open_weights' && !m.isOpenWeights) return false;
      if (filterType === 'proprietary' && m.isOpenWeights) return false;
      if (filterType === 'reasoning' && !m.isReasoning) return false;
      if (filterType === 'speed' && m.outputSpeed < 100) return false;
      if (filterType === 'budget' && (m.costPerTaskUSD <= 0 || m.costPerTaskUSD > 1.0)) return false;

      // Metric validity
      if (activeMetric === 'intelligence') return m.intelligenceScore > 0;
      if (activeMetric === 'speed') return m.outputSpeed > 0;
      if (activeMetric === 'latency') return m.latencyFirstChunk > 0;
      if (activeMetric === 'totalTime') return m.totalResponseTime > 0;
      if (activeMetric === 'cost') return m.costPerTaskUSD > 0;
      if (activeMetric === 'open_weights') return m.isOpenWeights && m.intelligenceScore > 0;
      if (activeMetric === 'reasoning') return (m.isReasoning || m.name.toLowerCase().includes('r1') || m.name.toLowerCase().includes('o1') || m.name.toLowerCase().includes('o3')) && m.intelligenceScore > 0;
      return true;
    });

    list.sort((a, b) => {
      switch (activeMetric) {
        case 'intelligence':
        case 'open_weights':
        case 'reasoning':
          return b.intelligenceScore - a.intelligenceScore;
        case 'speed':
          return b.outputSpeed - a.outputSpeed;
        case 'latency':
          return a.latencyFirstChunk - b.latencyFirstChunk;
        case 'totalTime':
          return a.totalResponseTime - b.totalResponseTime;
        case 'cost':
          return a.costPerTaskUSD - b.costPerTaskUSD;
        default:
          return b.intelligenceScore - a.intelligenceScore;
      }
    });

    return list.slice(0, 40); // Top 40 models for horizontal scroll
  }, [models, activeMetric, filterType]);

  // Max value for bar scaling
  const maxValue = useMemo(() => {
    if (rankedModels.length === 0) return 1;
    switch (activeMetric) {
      case 'intelligence':
      case 'open_weights':
      case 'reasoning':
        return Math.max(...rankedModels.map((m) => m.intelligenceScore || 0), 55);
      case 'speed':
        return Math.max(...rankedModels.map((m) => m.outputSpeed || 0), 300);
      case 'latency':
        return Math.max(...rankedModels.map((m) => m.latencyFirstChunk || 0), 3);
      case 'totalTime':
        return Math.max(...rankedModels.map((m) => m.totalResponseTime || 0), 10);
      case 'cost':
        return Math.max(...rankedModels.map((m) => m.costPerTaskUSD || 0), 5);
      default:
        return 100;
    }
  }, [rankedModels, activeMetric]);

  const getMetricValueDisplay = (m: ScrapedModel) => {
    switch (activeMetric) {
      case 'intelligence':
      case 'open_weights':
      case 'reasoning':
        return {
          num: m.intelligenceScore.toFixed(1),
          unit: 'Index',
          ratio: Math.min(100, Math.max(12, (m.intelligenceScore / maxValue) * 100)),
        };
      case 'speed':
        return {
          num: Math.round(m.outputSpeed).toString(),
          unit: 'tokens/s',
          ratio: Math.min(100, Math.max(12, (m.outputSpeed / maxValue) * 100)),
        };
      case 'latency':
        return {
          num: m.latencyFirstChunk.toFixed(2),
          unit: 'giây (TTFT)',
          ratio: Math.min(100, Math.max(12, 100 - (m.latencyFirstChunk / maxValue) * 80)),
        };
      case 'totalTime':
        return {
          num: m.totalResponseTime.toFixed(1),
          unit: 'giây hoàn tất',
          ratio: Math.min(100, Math.max(12, 100 - (m.totalResponseTime / maxValue) * 80)),
        };
      case 'cost':
        return {
          num: currency === 'VND' ? formatCost(m.costPerTaskUSD) : `$${m.costPerTaskUSD.toFixed(2)}`,
          unit: '/task chuẩn',
          ratio: Math.min(100, Math.max(12, 100 - (m.costPerTaskUSD / maxValue) * 80)),
        };
      default:
        return { num: '0', unit: '', ratio: 10 };
    }
  };

  return (
    <section id="benchmarks" className="border-t border-[#3D2216] bg-[#180D07] py-16 scroll-mt-20 text-[#FFF6EE]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B35]/30 bg-[#24130C] px-3.5 py-1 text-xs font-semibold text-[#FF8452] mb-3">
              <BarChart2 className="h-3.5 w-3.5" />
              <span>{language === 'vi' ? 'Khám Phá Biểu Đồ Cuộn Ngang' : 'Horizontal Benchmark Explorer'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#FFF6EE]">
              {language === 'vi' ? 'Đo Lường & So Sánh Từng Chỉ Số' : 'Interactive Metric Explorer'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#D8C4B6] max-w-2xl font-light">
              {language === 'vi'
                ? 'Tái hiện chuẩn xác tính năng cuộn ngang của Artificial Analysis. Chọn thang đo và cuộn sang phải để xem thứ hạng của tất cả mô hình.'
                : 'Full replication of Artificial Analysis horizontal chart. Pick any evaluation metric and scroll horizontally to explore ranked models.'}
            </p>
          </div>

          {/* Scroll Direction Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#472718] bg-[#24130C] text-[#D8C4B6] hover:border-[#FF6B35] hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Cuộn sang trái"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#472718] bg-[#24130C] text-[#D8C4B6] hover:border-[#FF6B35] hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Cuộn sang phải"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Primary Metric Tabs (Horizontal Scrollable on Mobile) */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {metricTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeMetric === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMetric(tab.id as BenchmarkMetric)}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white shadow-glow-orange'
                    : 'border border-[#472718] bg-[#24130C] text-[#D8C4B6] hover:border-[#FF6B35]/50 hover:text-white'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-[#FF8452]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Pills */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#8A7262] font-mono text-[11px] mr-1">
            {language === 'vi' ? 'Bộ lọc:' : 'Filter:'}
          </span>
          {[
            { id: 'all', label: language === 'vi' ? 'Tất cả' : 'All Models' },
            { id: 'open_weights', label: language === 'vi' ? 'Chỉ Mã nguồn mở' : 'Open Weights Only' },
            { id: 'proprietary', label: language === 'vi' ? 'Độc quyền' : 'Proprietary Only' },
            { id: 'reasoning', label: language === 'vi' ? 'Có Suy luận sâu' : 'Reasoning' },
            { id: 'speed', label: language === 'vi' ? 'Tốc độ > 100 tps' : 'Speed > 100 tps' },
            { id: 'budget', label: language === 'vi' ? 'Chi phí < $1/task' : 'Budget < $1' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`rounded-full px-3 py-1 font-medium transition-all ${
                filterType === f.id
                  ? 'bg-[#FFF6EE] text-[#180D07] font-bold shadow-sm'
                  : 'bg-[#201009] text-[#B8A08F] border border-[#3D2216] hover:border-[#FF6B35]/40 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-[#A89280] font-mono">
            {language === 'vi' ? `Hiển thị ${rankedModels.length} mô hình` : `Showing ${rankedModels.length} models`}
          </span>
        </div>

        {/* The Signature Horizontal Scroll Container (data-chart-scroll="true") */}
        <div className="relative rounded-2xl border border-[#472718] bg-[#24130C]/90 p-6 backdrop-blur-md shadow-card-espresso">
          <div
            ref={scrollContainerRef}
            data-chart-scroll="true"
            className="flex items-end gap-3.5 overflow-x-auto pb-4 pt-8 scrollbar-thin scrollbar-thumb-[#4A2818] scrollbar-track-[#180D07]"
            style={{ minHeight: '340px' }}
          >
            {rankedModels.map((model, index) => {
              const { num, unit, ratio } = getMetricValueDisplay(model);
              const isTop3 = index < 3;
              const barColor = getCreatorColor(model.creator, model.name);

              return (
                <div
                  key={model.id || index}
                  onClick={() => onSelectModel(model)}
                  className="group relative flex w-24 sm:w-28 flex-shrink-0 cursor-pointer flex-col items-center justify-end rounded-xl p-2.5 hover:bg-[#2F1910]/90 hover:-translate-y-1.5 hover:shadow-card-espresso transition-all duration-300"
                >
                  {/* Rank Podium Badge */}
                  <div className="absolute top-0 flex flex-col items-center">
                    {index === 0 && (
                      <span className="rounded-full bg-gradient-to-r from-amber-500 to-[#FF6B35] px-2 py-0.5 text-[10px] font-bold text-white shadow-glow-orange animate-pulse">
                        #1 🥇
                      </span>
                    )}
                    {index === 1 && (
                      <span className="rounded-full bg-slate-300 text-slate-950 px-2 py-0.5 text-[10px] font-bold shadow-sm">
                        #2 🥈
                      </span>
                    )}
                    {index === 2 && (
                      <span className="rounded-full bg-amber-700 text-amber-100 px-2 py-0.5 text-[10px] font-bold shadow-sm">
                        #3 🥉
                      </span>
                    )}
                    {index > 2 && (
                      <span className="text-[10px] font-mono text-[#8A7262] group-hover:text-[#FFF6EE] transition-colors">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  {/* Value Above Bar */}
                  <div className="mb-2 text-center">
                    <span className={`text-sm font-bold font-mono transition-transform group-hover:scale-110 inline-block ${isTop3 ? 'text-[#FF8452]' : 'text-[#FFF6EE]'}`}>
                      {num}
                    </span>
                    <span className="block text-[9px] text-[#A89280] truncate">
                      {unit}
                    </span>
                  </div>

                  {/* Proportional Vertical Bar */}
                  <div className="relative flex w-full justify-center h-48 items-end">
                    <div
                      style={{
                        height: `${ratio}%`,
                        backgroundColor: isTop3 ? undefined : barColor,
                      }}
                      className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ease-out group-hover:scale-y-105 ${
                        isTop3
                          ? 'bg-gradient-to-t from-[#E64A19] to-[#FF6B35] shadow-glow-orange'
                          : 'opacity-90 group-hover:opacity-100 group-hover:brightness-110'
                      }`}
                    />
                  </div>

                  {/* Model Metadata Under Bar */}
                  <div className="mt-3 text-center w-full">
                    <h4 className="text-xs font-bold text-[#FFF6EE] truncate group-hover:text-[#FF8452] transition-colors" title={model.name}>
                      {model.name}
                    </h4>
                    <span className="text-[10px] text-[#A89280] block truncate">
                      {model.creator}
                    </span>
                    <span className={`mt-1 inline-block rounded-full px-1.5 py-0.2 text-[9px] font-medium ${
                      model.isOpenWeights ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-neutral-800 text-[#B8A08F]'
                    }`}>
                      {model.isOpenWeights ? 'Open' : 'API'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Methodology Card at Bottom */}
          <div className="mt-6 pt-4 border-t border-[#381E12] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#A89280]">
            <div className="flex items-center gap-1.5">
              <Info className="h-4 w-4 text-[#FF6B35] shrink-0" />
              <span>
                {language === 'vi'
                  ? 'Kiểm thử chuẩn hóa trên cụm GPU độc lập. Đo lường tốc độ xử lý gói token đầu (TTFT) và throughput thực tế.'
                  : 'Empirical benchmark runs using standardized workloads across dedicated AI benchmarking rigs.'}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 font-semibold text-[#FF8452] shrink-0 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
              <span>{language === 'vi' ? 'Tiêu chuẩn: Artificial Analysis' : 'Standard: Artificial Analysis'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
