'use client';

import React, { useState, useMemo } from 'react';
import { ScrapedModel } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { HelpCircle, Lightbulb, Zap, DollarSign } from 'lucide-react';

interface ScatterPlotArenaProps {
  models: ScrapedModel[];
  onSelectModel: (model: ScrapedModel) => void;
}

export const ScatterPlotArena: React.FC<ScatterPlotArenaProps> = ({
  models,
  onSelectModel,
}) => {
  const { language } = useLanguage();
  const { formatCost, currency } = useCurrency();
  const [metricMode, setMetricMode] = useState<'speed' | 'cost'>('speed');
  const [hoveredModel, setHoveredModel] = useState<ScrapedModel | null>(null);

  // Filter models that have valid numbers
  const plotData = useMemo(() => {
    return models.filter((m) => {
      if (!m.intelligenceScore || m.intelligenceScore <= 0) return false;
      if (metricMode === 'speed') return m.outputSpeed && m.outputSpeed > 0;
      if (metricMode === 'cost') return m.costPerTaskUSD && m.costPerTaskUSD > 0 && m.costPerTaskUSD < 15;
      return false;
    });
  }, [models, metricMode]);

  const maxIntel = 60;
  const minIntel = 15;

  const minX = metricMode === 'speed' ? 20 : 0.1;
  const maxX = metricMode === 'speed' ? 380 : 8.0;

  // Real Pareto Frontier calculation
  const paretoFrontier = useMemo(() => {
    if (plotData.length === 0) return [];
    if (metricMode === 'speed') {
      const frontier: ScrapedModel[] = [];
      for (const p of plotData) {
        let isDominated = false;
        for (const other of plotData) {
          if (
            other.id !== p.id &&
            other.outputSpeed >= p.outputSpeed &&
            other.intelligenceScore >= p.intelligenceScore &&
            (other.outputSpeed > p.outputSpeed || other.intelligenceScore > p.intelligenceScore)
          ) {
            isDominated = true;
            break;
          }
        }
        if (!isDominated) frontier.push(p);
      }
      frontier.sort((a, b) => a.outputSpeed - b.outputSpeed);
      return frontier;
    } else {
      const frontier: ScrapedModel[] = [];
      for (const p of plotData) {
        let isDominated = false;
        for (const other of plotData) {
          if (
            other.id !== p.id &&
            other.costPerTaskUSD <= p.costPerTaskUSD &&
            other.intelligenceScore >= p.intelligenceScore &&
            (other.costPerTaskUSD < p.costPerTaskUSD || other.intelligenceScore > p.intelligenceScore)
          ) {
            isDominated = true;
            break;
          }
        }
        if (!isDominated) frontier.push(p);
      }
      frontier.sort((a, b) => a.costPerTaskUSD - b.costPerTaskUSD);
      return frontier;
    }
  }, [plotData, metricMode]);

  const paretoIds = useMemo(() => new Set(paretoFrontier.map((m) => m.id)), [paretoFrontier]);

  const getCreatorColor = (creator: string) => {
    const c = creator.toLowerCase();
    if (c.includes('openai')) return '#10b981'; // emerald
    if (c.includes('anthropic')) return '#c084fc'; // purple
    if (c.includes('google')) return '#60a5fa'; // blue
    if (c.includes('deepseek')) return '#22d3ee'; // cyan
    if (c.includes('meta')) return '#818cf8'; // indigo
    if (c.includes('xai')) return '#f43f5e'; // rose
    if (c.includes('alibaba') || c.includes('qwen')) return '#f59e0b'; // amber
    return '#a3a3a3';
  };

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 420;
  const padding = { top: 30, right: 40, bottom: 50, left: 60 };

  const scaleX = (val: number) => {
    const width = svgWidth - padding.left - padding.right;
    return padding.left + ((val - minX) / (maxX - minX)) * width;
  };

  const scaleY = (val: number) => {
    const height = svgHeight - padding.top - padding.bottom;
    return svgHeight - padding.bottom - ((val - minIntel) / (maxIntel - minIntel)) * height;
  };

  const paretoPathD = useMemo(() => {
    if (paretoFrontier.length < 2) return '';
    return paretoFrontier
      .map((m, idx) => {
        const xVal = metricMode === 'speed' ? m.outputSpeed : m.costPerTaskUSD;
        const x = scaleX(xVal);
        const y = scaleY(m.intelligenceScore);
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [paretoFrontier, metricMode, scaleX, scaleY]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 overflow-hidden">
      <div className="w-full max-w-full overflow-hidden rounded-lg border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Header & Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#331A10] mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#FFF6EE]">
                {metricMode === 'speed'
                  ? (language === 'vi' ? 'Đồ Thị Tọa Độ: Trí Tuệ vs Tốc Độ' : 'Quality vs Output Speed')
                  : (language === 'vi' ? 'Đồ Thị Tọa Độ: Trí Tuệ vs Chi Phí' : 'Quality vs Cost per Task')}
              </span>
              <span className="rounded-sm bg-[#FF6B35]/20 px-2 py-0.5 text-[10px] text-[#FF8452] font-bold uppercase tracking-wider border border-[#FF6B35]/40 font-mono">
                Pareto Frontier
              </span>
            </div>
            <p className="text-xs text-[#C7B299] mt-1">
              {language === 'vi'
                ? 'Đồ thị phân tán 2 chiều trực quan với đường biên hiệu quả Pareto'
                : 'Interactive 2-axis scatter plot with Pareto Frontier efficiency curve'}
            </p>
          </div>

          <div className="flex items-center rounded-sm bg-[#140A06] border border-[#3D2216] p-1 text-xs">
            <button
              onClick={() => setMetricMode('speed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                metricMode === 'speed'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white shadow-glow-orange'
                  : 'text-[#A89280] hover:text-[#FFF6EE]'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              {language === 'vi' ? 'Trí Tuệ vs Tốc Độ' : 'Quality vs Speed'}
            </button>
            <button
              onClick={() => setMetricMode('cost')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                metricMode === 'cost'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white shadow-glow-orange'
                  : 'text-[#A89280] hover:text-[#FFF6EE]'
              }`}
            >
              <DollarSign className="h-3.5 w-3.5" />
              {language === 'vi' ? 'Trí Tuệ vs Giá Tiền' : 'Quality vs Cost'}
            </button>
          </div>
        </div>

        {/* SVG Interactive Scatter Plot */}
        <div className="relative w-full max-w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#4A2818] scrollbar-track-[#180D07]">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[600px] block">
            {/* Grid lines */}
            {[20, 30, 40, 50].map((level) => (
              <g key={level}>
                <line
                  x1={padding.left}
                  y1={scaleY(level)}
                  x2={svgWidth - padding.right}
                  y2={scaleY(level)}
                  stroke="#262626"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 10}
                  y={scaleY(level) + 4}
                  fill="#737373"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {level}
                </text>
              </g>
            ))}

            {/* X-axis labels */}
            {metricMode === 'speed'
              ? [50, 100, 150, 200, 250, 300, 350].map((tps) => (
                  <g key={tps}>
                    <line
                      x1={scaleX(tps)}
                      y1={padding.top}
                      x2={scaleX(tps)}
                      y2={svgHeight - padding.bottom}
                      stroke="#1e1e1e"
                    />
                    <text
                      x={scaleX(tps)}
                      y={svgHeight - padding.bottom + 18}
                      fill="#737373"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {tps}
                    </text>
                  </g>
                ))
              : [0.5, 1.0, 2.0, 3.0, 5.0, 7.0].map((usd) => (
                  <g key={usd}>
                    <line
                      x1={scaleX(usd)}
                      y1={padding.top}
                      x2={scaleX(usd)}
                      y2={svgHeight - padding.bottom}
                      stroke="#1e1e1e"
                    />
                    <text
                      x={scaleX(usd)}
                      y={svgHeight - padding.bottom + 18}
                      fill="#737373"
                      fontSize="10"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      ${usd}
                    </text>
                  </g>
                ))}

            {/* Axis Titles */}
            <text
              x={padding.left}
              y={padding.top - 10}
              fill="#a3a3a3"
              fontSize="11"
              fontWeight="bold"
            >
              ↑ {language === 'vi' ? 'Độ thông minh (Intelligence Index)' : 'Intelligence Index'}
            </text>
            <text
              x={svgWidth - padding.right}
              y={svgHeight - padding.bottom + 35}
              fill="#a3a3a3"
              fontSize="11"
              fontWeight="bold"
              textAnchor="end"
            >
              {metricMode === 'speed'
                ? (language === 'vi' ? 'Tốc độ sinh chữ (Tokens/s) →' : 'Output Speed (Tokens/s) →')
                : (language === 'vi' ? 'Chi phí mỗi bài kiểm tra ($ USD) →' : 'Cost per Task ($ USD) →')}
            </text>

            {/* Pareto Frontier Line */}
            {paretoPathD && (
              <g className="pointer-events-none">
                <path
                  d={paretoPathD}
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="4"
                  strokeOpacity="0.2"
                  strokeLinecap="round"
                />
                <path
                  d={paretoPathD}
                  fill="none"
                  stroke="#FF8452"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                />
              </g>
            )}

            {/* Scatter Dots */}
            {plotData.map((m) => {
              const xVal = metricMode === 'speed' ? m.outputSpeed : m.costPerTaskUSD;
              const cx = scaleX(xVal);
              const cy = scaleY(m.intelligenceScore);
              const isHovered = hoveredModel?.id === m.id;
              const isPareto = paretoIds.has(m.id);
              const color = getCreatorColor(m.creator);

              return (
                <g key={m.id}>
                  {/* Pareto Frontier Halo */}
                  {isPareto && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 12 : 8}
                      fill="none"
                      stroke="#FF6B35"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      opacity="0.9"
                      className="pointer-events-none animate-pulse"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 8 : 5}
                    fill={color}
                    fillOpacity={isHovered ? 1 : 0.85}
                    stroke={isHovered ? '#ffffff' : (isPareto ? '#FF6B35' : '#140A06')}
                    strokeWidth={isHovered ? 2 : (isPareto ? 1.5 : 1)}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredModel(m)}
                    onMouseLeave={() => setHoveredModel(null)}
                    onClick={() => onSelectModel(m)}
                  />
                  {/* Label for notable top models */}
                  {(m.intelligenceScore >= 44 || (metricMode === 'speed' && m.outputSpeed >= 210) || (metricMode === 'cost' && m.costPerTaskUSD <= 0.3 && m.intelligenceScore >= 35)) && (
                    <text
                      x={cx + 7}
                      y={cy + 3}
                      fill="#e5e5e5"
                      fontSize="9"
                      fontWeight="500"
                      className="pointer-events-none select-none drop-shadow"
                    >
                      {m.name.split(' (')[0]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Floating Tooltip */}
          {hoveredModel && (
            <div className="absolute top-4 right-4 rounded-sm border border-[#3D2216] bg-[#140A06]/95 p-4 shadow-2xl backdrop-blur-md text-xs w-64 animate-in fade-in">
              <div className="text-[10px] font-mono font-bold uppercase text-[#FF8452]">
                {hoveredModel.creator} • {hoveredModel.tier}-Tier
              </div>
              <div className="font-bold text-[#FFF6EE] text-sm mt-0.5">{hoveredModel.name}</div>
              <div className="mt-2.5 space-y-1.5 text-[#C7B299]">
                <div className="flex justify-between">
                  <span className="text-[#8A7262]">{language === 'vi' ? 'Độ thông minh:' : 'Intelligence:'}</span>
                  <span className="font-mono font-bold text-[#FF8452]">{hoveredModel.intelligenceScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7262]">{language === 'vi' ? 'Tốc độ sinh chữ:' : 'Speed:'}</span>
                  <span className="font-mono font-bold text-amber-400">{hoveredModel.outputSpeed} tps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7262]">{language === 'vi' ? 'Chi phí / Tác vụ:' : 'Cost/Task:'}</span>
                  <span className="font-mono font-bold text-emerald-400">{formatCost(hoveredModel.costPerTaskUSD)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7262]">🇻🇳 {language === 'vi' ? 'Độ nhuyễn Tiếng Việt:' : 'Vietnamese:'}</span>
                  <span className="font-mono font-bold text-emerald-400">{hoveredModel.vietnameseRating}/100</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Explainer Box in Plain Language */}
        <div className="mt-6 p-4 rounded-md bg-[#140A06]/90 border border-[#331A10] text-xs text-[#C7B299] leading-relaxed flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-[#FF6B35] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#FFF6EE]">
              {language === 'vi' ? '💡 Hướng dẫn phân tích đường biên Pareto:' : '💡 How to read this chart in simple terms:'}{' '}
            </span>
            {metricMode === 'speed' ? (
              language === 'vi'
                ? 'Các mô hình nằm sát đường biên Pareto (góc trên bên phải) là những mô hình "vừa thông minh đỉnh cao lại vừa sinh chữ siêu tốc" (như Gemini 2.5 Flash, Groq Llama 3.3, Claude 3.7 Sonnet)!'
                : 'Points along the Pareto Frontier (top-right) represent models that deliver premier intelligence at breakthrough speed!'
            ) : (
              language === 'vi'
                ? 'Các mô hình nằm sát đường biên Pareto (góc trên bên trái) là những mô hình "vừa thông minh vượt trội lại vừa có chi phí rẻ nhất" (như DeepSeek V3, Gemini 2.5 Flash, GPT-4o mini) — đây là những lựa chọn tối ưu ROI cao nhất!'
                : 'Points along the Pareto Frontier (top-left) represent models that deliver highest intelligence per dollar spent!'
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
