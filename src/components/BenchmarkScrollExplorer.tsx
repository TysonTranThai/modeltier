'use client';

import React, { useState, useRef, useMemo } from 'react';
import { ScrapedModel } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  BarChart2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Zap, 
  Clock, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  Brain, 
  ExternalLink,
  Info,
  SlidersHorizontal
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
    { id: 'intelligence', label: language === 'vi' ? '🧠 Điểm Thông Minh' : '🧠 Intelligence Index', icon: Brain },
    { id: 'speed', label: language === 'vi' ? '⚡ Tốc Độ (Tokens/s)' : '⚡ Output Speed', icon: Zap },
    { id: 'latency', label: language === 'vi' ? '⏱️ Độ Trễ (TTFT)' : '⏱️ Latency (TTFT)', icon: Clock },
    { id: 'totalTime', label: language === 'vi' ? '⏳ Thời Gian Phản Hồi' : '⏳ Response Time', icon: Layers },
    { id: 'cost', label: language === 'vi' ? '💰 Chi Phí Mỗi Bài Test' : '💰 Cost per Task', icon: DollarSign },
    { id: 'open_weights', label: language === 'vi' ? '🔓 Mã Nguồn Mở' : '🔓 Open Weights', icon: ShieldCheck },
    { id: 'reasoning', label: language === 'vi' ? '🤖 Mô Hình Tư Duy' : '🤖 Reasoning Models', icon: Sparkles },
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

  const getMetricDisplay = (m: ScrapedModel) => {
    switch (activeMetric) {
      case 'intelligence':
      case 'open_weights':
      case 'reasoning':
        return {
          value: m.intelligenceScoreRaw !== '--' ? m.intelligenceScoreRaw : `${m.intelligenceScore}`,
          unit: 'pts',
          pct: Math.min(100, Math.round(((m.intelligenceScore || 0) / maxValue) * 100)),
          color: 'from-violet-600 to-indigo-500',
        };
      case 'speed':
        return {
          value: m.outputSpeedRaw !== '--' ? m.outputSpeedRaw : `${m.outputSpeed}`,
          unit: 'tps',
          pct: Math.min(100, Math.round(((m.outputSpeed || 0) / maxValue) * 100)),
          color: 'from-amber-500 to-yellow-400',
        };
      case 'latency':
        return {
          value: m.latencyRaw !== '--' ? `${m.latencyRaw}s` : `${m.latencyFirstChunk}s`,
          unit: 'TTFT',
          // For latency, lower is better, so invert percentage for visual height
          pct: Math.max(15, Math.min(100, Math.round((1 - (m.latencyFirstChunk || 0) / maxValue) * 100))),
          color: 'from-cyan-500 to-blue-400',
        };
      case 'totalTime':
        return {
          value: m.totalTimeRaw !== '--' ? `${m.totalTimeRaw}s` : `${m.totalResponseTime}s`,
          unit: 'sec',
          pct: Math.max(15, Math.min(100, Math.round((1 - (m.totalResponseTime || 0) / maxValue) * 100))),
          color: 'from-blue-500 to-teal-400',
        };
      case 'cost':
        return {
          value: formatCost(m.costPerTaskUSD),
          unit: '/task',
          pct: Math.max(15, Math.min(100, Math.round((1 - (m.costPerTaskUSD || 0) / maxValue) * 100))),
          color: 'from-emerald-500 to-green-400',
        };
    }
  };

  const getMethodologyNote = () => {
    switch (activeMetric) {
      case 'intelligence':
        return language === 'vi'
          ? '🎯 Artificial Analysis Intelligence Index tích hợp 10 bài đánh giá tiêu chuẩn (AA-Briefcase, GDPval, AutomationBench, Terminal-Bench, SciCode, Humanity\'s Last Exam...). Điểm số đo lường năng lực giải quyết bài toán phức tạp.'
          : '🎯 Artificial Analysis Intelligence Index incorporates 10 frontier benchmarks. Measures end-to-end complex task problem solving.';
      case 'speed':
        return language === 'vi'
          ? '⚡ Tốc độ sinh chữ (Tokens / s) đo lường lưu lượng thực tế đo được qua API trực tiếp từ nhà cung cấp trong điều kiện tải chuẩn.'
          : '⚡ Output Speed (tps) measures median output token generation throughput across active provider endpoints.';
      case 'latency':
        return language === 'vi'
          ? '⏱️ Time to First Token (TTFT) là độ trễ tính từ lúc gửi prompt cho đến khi AI trả về ký tự đầu tiên. Càng thấp phản hồi càng tức thì.'
          : '⏱️ Time to First Token (TTFT) latency from prompt transmission until the first output chunk streams.';
      case 'cost':
        return language === 'vi'
          ? '💰 Chi phí ước tính cho 1 tác vụ hoàn chỉnh theo chuẩn Intelligence Index, phản ánh trực tiếp số tiền bạn phải trả khi gọi API.'
          : '💰 Cost per Task models realistic API expenditure across benchmark prompts in USD and VND.';
      case 'open_weights':
        return language === 'vi'
          ? '🔓 Mô hình mã nguồn mở (Open Weights) cho phép tải trọng số về chạy trên máy chủ nội bộ hoặc tối ưu riêng tư tuyệt đối.'
          : '🔓 Open Weights models can be self-hosted locally without vendor lock-in or privacy leakage.';
      default:
        return language === 'vi'
          ? '📊 Dữ liệu được đo kiểm độc lập và đồng bộ tự động mỗi 15 phút từ artificialanalysis.ai.'
          : '📊 Independently measured and synced automatically every 15 minutes from artificialanalysis.ai.';
    }
  };

  return (
    <section id="benchmarks" className="py-12 lg:py-16 scroll-mt-16 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-300 border border-violet-500/20 mb-3">
            <BarChart2 className="h-4 w-4" />
            <span>{language === 'vi' ? 'Thước Đo Benchmark Trực Quan' : 'Interactive Benchmark Explorer'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'vi' ? 'Bảng So Sánh Benchmark Đa Chiều' : 'Multidimensional AI Benchmarks'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl">
            {language === 'vi'
              ? 'Cuộn ngang để khám phá thứ hạng chi tiết của hơn 40 mô hình hàng đầu theo từng bài kiểm tra tiêu chuẩn.'
              : 'Scroll horizontally to explore real benchmark rankings of leading frontier and open models.'}
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => scroll('left')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors shadow-lg"
            title="Cuộn sang trái"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors shadow-lg"
            title="Cuộn sang phải"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Benchmark Tabs */}
      <div className="w-full overflow-x-auto pb-2 border-b border-slate-800/80 mb-6 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {metricTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeMetric === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMetric(tab.id as BenchmarkMetric)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-1 ring-violet-400'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-violet-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filter Pills */}
      <div className="flex items-center gap-1.5 flex-wrap mb-6">
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mr-2">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>{language === 'vi' ? 'Lọc nhanh:' : 'Filter:'}</span>
        </div>
        {[
          { id: 'all', label: language === 'vi' ? 'Tất cả' : 'All' },
          { id: 'open_weights', label: '🔓 Mã nguồn mở' },
          { id: 'proprietary', label: '🔒 Đóng quyền' },
          { id: 'reasoning', label: '🧠 Suy luận (Reasoning)' },
          { id: 'speed', label: '⚡ Siêu nhanh (>100 tps)' },
          { id: 'budget', label: '💰 Tiết kiệm (<$1)' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              filterType === f.id
                ? 'bg-violet-900/50 text-violet-200 border border-violet-600'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Main Horizontal Scrollable Benchmark Area */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
        <div
          data-chart-scroll="true"
          ref={scrollContainerRef}
          className="flex items-end gap-3.5 overflow-x-auto pb-4 pt-6 scroll-smooth scrollbar-thin scrollbar-thumb-violet-600/40"
          style={{ minHeight: '340px' }}
        >
          {rankedModels.length === 0 ? (
            <div className="w-full py-16 text-center text-xs text-slate-400">
              {language === 'vi' ? 'Không có mô hình nào khớp với bộ lọc hiện tại.' : 'No models match the active filter.'}
            </div>
          ) : (
            rankedModels.map((m, idx) => {
              const rank = idx + 1;
              const { value, unit, pct, color } = getMetricDisplay(m);
              const isTop3 = rank <= 3;

              return (
                <div
                  key={m.id}
                  onClick={() => onSelectModel(m)}
                  className="group flex-shrink-0 w-36 sm:w-40 flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-3 hover:border-violet-500/60 hover:bg-slate-800/50 transition-all cursor-pointer shadow-lg relative"
                >
                  {/* Top Rank Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-[10px] font-black ${
                        rank === 1
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                          : rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      #{rank}
                    </span>

                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {m.tier}-Tier
                    </span>
                  </div>

                  {/* Model & Creator */}
                  <div className="min-w-0 mb-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                      {m.creator}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                      {m.name}
                    </h4>
                  </div>

                  {/* Proportional Vertical Bar */}
                  <div className="w-full h-32 bg-slate-900 rounded-xl p-1.5 flex flex-col justify-end overflow-hidden mb-3 border border-slate-800/80">
                    <div
                      className={`w-full rounded-lg bg-gradient-to-t ${color} transition-all duration-500 flex items-center justify-center`}
                      style={{ height: `${pct}%`, minHeight: '18px' }}
                    >
                      <span className="text-[10px] font-mono font-black text-white px-1 truncate">
                        {value}
                      </span>
                    </div>
                  </div>

                  {/* Benchmark Value & Unit */}
                  <div className="text-center pt-2 border-t border-slate-800/80">
                    <span className="font-mono text-sm font-black text-white block">
                      {value}
                    </span>
                    <span className="text-[10px] text-slate-400 block -mt-0.5">
                      {unit}
                    </span>
                  </div>

                  {/* Action Link */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectModel(m);
                    }}
                    className="mt-2.5 w-full rounded-lg bg-slate-900 py-1 text-[11px] font-semibold text-slate-300 group-hover:bg-violet-600 group-hover:text-white transition-colors"
                  >
                    {language === 'vi' ? 'Xem chi tiết' : 'View specs'}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Methodology & Measurement Notice */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-start gap-3 text-xs text-slate-400">
          <Info className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {getMethodologyNote()}
          </p>
        </div>
      </div>
    </section>
  );
};
