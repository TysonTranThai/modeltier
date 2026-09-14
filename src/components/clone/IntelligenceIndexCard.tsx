'use client';

import React, { useState, useMemo } from 'react';
import { ScrapedModel } from '../../types';
import { CompanyLogo, getCreatorColor } from './CompanyLogo';
import { 
  ArrowUpRight, 
  Link2, 
  ImageDown, 
  Table, 
  ChevronsUpDown, 
  SlidersHorizontal, 
  Plus, 
  Info, 
  Check,
  Filter,
  Sparkles,
  BarChart2
} from 'lucide-react';

interface IntelligenceIndexCardProps {
  models: ScrapedModel[];
  onSelectModel?: (model: ScrapedModel) => void;
}

type SubTab = 'open_weights' | 'reasoning' | 'modalities' | 'country';

export const IntelligenceIndexCard: React.FC<IntelligenceIndexCardProps> = ({
  models,
  onSelectModel,
}) => {
  const [modelLimit, setModelLimit] = useState<number>(26);
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('open_weights');
  const [openWeightsFilter, setOpenWeightsFilter] = useState<'all' | 'open' | 'proprietary'>('all');
  const [reasoningFilter, setReasoningFilter] = useState<'all' | 'reasoning' | 'standard'>('all');
  const [modalityFilter, setModalityFilter] = useState<'all' | 'vision' | 'text'>('all');
  const [countryFilter, setCountryFilter] = useState<'all' | 'us' | 'cn' | 'fr'>('all');
  
  const [viewFormat, setViewFormat] = useState<'chart' | 'table'>('chart');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSelectorDropdown, setShowSelectorDropdown] = useState(false);

  // Filter and sort models by Intelligence Index
  const displayModels = useMemo(() => {
    let list = [...models].filter((m) => m.intelligenceScore > 0);

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
  }, [models, modelLimit, activeSubTab, openWeightsFilter, reasoningFilter, modalityFilter, countryFilter]);

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

  return (
    <div id="artificial-analysis-intelligence-index" className="scroll-mt-24 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 text-neutral-900 shadow-sm transition-all">
      {/* Top Header & Toolbar Row */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6">
        {/* Left Title & Description */}
        <div className="max-w-2xl">
          <h3 className="text-2xl font-serif font-semibold tracking-tight text-neutral-950 flex items-center gap-1.5">
            <a 
              href="https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index"
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1 group"
            >
              <span>Artificial Analysis Intelligence Index</span>
              <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-black transition-colors" />
            </a>
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500 font-normal max-w-xl">
            Artificial Analysis Intelligence Index v4.3 incorporates 10 evaluations: AA-Briefcase, GDPval-AA v2, AutomationBench-AA, Terminal-Bench v4.0, SciCode, Humanity&apos;s Last Exam, GDP.pdf, CritPt, AA-Omniscience, AA-LCR v1.1
          </p>
        </div>

        {/* Right Action Controls */}
        <div className="flex flex-col items-end gap-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900 hover:text-black transition-colors"
              title="Copy link"
            >
              {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
            </button>

            {/* Download Image */}
            <button
              onClick={() => window.print()}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900 hover:text-black transition-colors"
              title="Print or Save Chart"
            >
              <ImageDown className="h-4 w-4" />
            </button>

            {/* Table View Toggle */}
            <button
              onClick={() => setViewFormat(viewFormat === 'chart' ? 'table' : 'chart')}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                viewFormat === 'table'
                  ? 'border-neutral-900 bg-neutral-900 text-white'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900 hover:text-black'
              }`}
              title="Toggle Table View"
            >
              <Table className="h-4 w-4" />
            </button>

            {/* Model Count Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSelectorDropdown(!showSelectorDropdown)}
                className="inline-flex h-8 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-800 hover:border-neutral-900 transition-colors shadow-sm"
              >
                <span>{modelLimit} of {models.length} models</span>
                <ChevronsUpDown className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              {showSelectorDropdown && (
                <div className="absolute right-0 top-10 z-30 w-44 rounded-xl border border-neutral-200 bg-white p-1 text-xs shadow-xl animate-in fade-in zoom-in-95">
                  {[10, 15, 20, 26, 40, 60].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setModelLimit(num);
                        setShowSelectorDropdown(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-medium transition-colors ${
                        modelLimit === num ? 'bg-neutral-100 text-black font-bold' : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <span>Top {num} models</span>
                      {modelLimit === num && <Check className="h-3.5 w-3.5 text-black" />}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setModelLimit(models.length);
                      setShowSelectorDropdown(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-medium transition-colors ${
                      modelLimit === models.length ? 'bg-neutral-100 text-black font-bold' : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>All {models.length} models</span>
                    {modelLimit === models.length && <Check className="h-3.5 w-3.5 text-black" />}
                  </button>
                </div>
              )}
            </div>

            {/* Filter */}
            <button
              onClick={() => {
                const nextTab: Record<SubTab, SubTab> = {
                  open_weights: 'reasoning',
                  reasoning: 'modalities',
                  modalities: 'country',
                  country: 'open_weights',
                };
                setActiveSubTab(nextTab[activeSubTab]);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900 hover:text-black transition-colors"
              title="Rotate Sub-Filter"
            >
              <Filter className="h-4 w-4" />
            </button>

            {/* Sliders */}
            <button
              onClick={() => setModelLimit(modelLimit === 26 ? 15 : 26)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-900 hover:text-black transition-colors"
              title="Reset or Adjust Limit"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* Add Model Button & Watermark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModelLimit(Math.min(models.length, modelLimit + 10))}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-800 hover:text-black transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add model from specific provider</span>
            </button>
            <span className="text-neutral-300">•</span>
            <div className="flex items-center gap-1 font-serif text-xs font-semibold text-purple-700">
              <span>⁂ Artificial Analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Area */}
      {viewFormat === 'chart' ? (
        <div className="relative pt-6 pb-20 overflow-x-auto min-h-[460px]">
          {/* Subtle Horizontal Grid Lines */}
          <div className="absolute inset-x-0 top-6 bottom-24 flex flex-col justify-between pointer-events-none text-[10px] text-neutral-300 font-mono">
            <div className="border-b border-neutral-100 w-full flex justify-end pr-2">{Math.round(maxScore)}</div>
            <div className="border-b border-neutral-100 w-full flex justify-end pr-2">{Math.round((maxScore * 3) / 4)}</div>
            <div className="border-b border-neutral-100 w-full flex justify-end pr-2">{Math.round(maxScore / 2)}</div>
            <div className="border-b border-neutral-100 w-full flex justify-end pr-2">{Math.round(maxScore / 4)}</div>
            <div className="border-b border-neutral-200 w-full flex justify-end pr-2">0</div>
          </div>

          {/* Vertical Bars Container */}
          <div className="relative flex items-end justify-start gap-2.5 sm:gap-3 px-4 min-w-max h-[300px] z-10">
            {displayModels.map((model, idx) => {
              const heightPercent = Math.max(8, Math.min(100, (model.intelligenceScore / maxScore) * 100));
              const barColor = getCreatorColor(model.creator, model.name);
              const scoreInt = Math.round(model.intelligenceScore);

              return (
                <div
                  key={model.slug || model.id || idx}
                  onClick={() => onSelectModel && onSelectModel(model)}
                  className="group relative flex flex-col items-center cursor-pointer w-7 sm:w-8 h-full justify-end"
                >
                  {/* Hover Floating Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -top-16 z-30 transition-opacity bg-neutral-900 text-white rounded-xl px-3 py-1.5 text-xs shadow-2xl whitespace-nowrap">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>#{idx + 1} {model.name}</span>
                    </div>
                    <div className="text-[11px] text-neutral-300">
                      Score: <strong className="text-emerald-400 font-mono">{model.intelligenceScore.toFixed(1)}</strong> • {model.creator}
                    </div>
                  </div>

                  {/* Vertical Bar with Company Color */}
                  <div
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: barColor,
                    }}
                    className="w-full rounded-t-md relative flex items-end justify-center pb-2 transition-all group-hover:scale-y-105 group-hover:brightness-110 shadow-sm"
                  >
                    {/* Score inside bar */}
                    <span className="text-[11px] font-bold text-white tracking-tight drop-shadow-sm select-none">
                      {scoreInt}
                    </span>
                  </div>

                  {/* Creator Logo Icon below the bar */}
                  <div className="mt-2 flex items-center justify-center h-5 w-5">
                    <CompanyLogo creator={model.creator} size={16} />
                  </div>

                  {/* 45-degree Angled Model Label Text */}
                  <div className="absolute top-[330px] left-1/2 -translate-x-1/2 w-36 origin-top-left transform -rotate-45 pointer-events-none">
                    <span className="text-[11px] font-medium text-neutral-700 whitespace-nowrap block truncate group-hover:text-black group-hover:font-semibold transition-colors">
                      {model.name} {model.effort ? `(${model.effort})` : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Footnote Line */}
          <div className="mt-28 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-1">
              <Info className="h-3.5 w-3.5" />
              <span>Artificial Analysis Intelligence Index</span>
            </div>
            <button 
              onClick={() => setModelLimit(Math.min(models.length, modelLimit + 10))}
              className="p-1 hover:text-black transition-colors"
              title="Add more models"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto py-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Model</th>
                <th className="py-2.5 px-3">Creator</th>
                <th className="py-2.5 px-3">Intelligence Index</th>
                <th className="py-2.5 px-3">Speed</th>
                <th className="py-2.5 px-3">Cost / 1M</th>
                <th className="py-2.5 px-3">License</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {displayModels.map((m, idx) => (
                <tr 
                  key={m.id || idx}
                  onClick={() => onSelectModel && onSelectModel(m)}
                  className="hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono text-neutral-400">#{idx + 1}</td>
                  <td className="py-2.5 px-3 font-semibold text-neutral-900 flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={14} />
                    <span>{m.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-neutral-600">{m.creator}</td>
                  <td className="py-2.5 px-3 font-bold text-violet-700 font-mono">{m.intelligenceScore.toFixed(1)}</td>
                  <td className="py-2.5 px-3 text-neutral-600">{m.outputSpeed > 0 ? `${Math.round(m.outputSpeed)} tps` : '—'}</td>
                  <td className="py-2.5 px-3 text-neutral-600 font-mono">${m.costPerTaskUSD.toFixed(2)}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      m.isOpenWeights ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {m.isOpenWeights ? 'Open' : 'Proprietary'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4 Bottom Filter Segment Tabs (Exact match to screenshot) */}
      <div className="mt-8 border-t border-neutral-100 pt-6">
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-neutral-100/80 p-1 text-xs font-semibold text-neutral-700">
          <button
            onClick={() => setActiveSubTab('open_weights')}
            className={`rounded-lg px-4 py-2 transition-all ${
              activeSubTab === 'open_weights'
                ? 'bg-white text-black shadow-sm ring-1 ring-neutral-200'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Open Weights / Proprietary
          </button>

          <button
            onClick={() => setActiveSubTab('reasoning')}
            className={`rounded-lg px-4 py-2 transition-all ${
              activeSubTab === 'reasoning'
                ? 'bg-white text-black shadow-sm ring-1 ring-neutral-200'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Reasoning / Non-Reasoning
          </button>

          <button
            onClick={() => setActiveSubTab('modalities')}
            className={`rounded-lg px-4 py-2 transition-all ${
              activeSubTab === 'modalities'
                ? 'bg-white text-black shadow-sm ring-1 ring-neutral-200'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Text Only / Multimodal Inputs
          </button>

          <button
            onClick={() => setActiveSubTab('country')}
            className={`rounded-lg px-4 py-2 transition-all ${
              activeSubTab === 'country'
                ? 'bg-white text-black shadow-sm ring-1 ring-neutral-200'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            By Country
          </button>
        </div>

        {/* Sub-tab active pill toggles */}
        <div className="mt-3 flex items-center gap-2 px-1 text-xs">
          {activeSubTab === 'open_weights' && (
            <div className="flex items-center gap-1.5 text-neutral-600">
              <span className="text-neutral-400 text-[11px]">Filter:</span>
              <button
                onClick={() => setOpenWeightsFilter('all')}
                className={`px-2.5 py-0.5 rounded-full ${openWeightsFilter === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setOpenWeightsFilter('open')}
                className={`px-2.5 py-0.5 rounded-full ${openWeightsFilter === 'open' ? 'bg-emerald-600 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                Open Weights Only
              </button>
              <button
                onClick={() => setOpenWeightsFilter('proprietary')}
                className={`px-2.5 py-0.5 rounded-full ${openWeightsFilter === 'proprietary' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                Proprietary Only
              </button>
            </div>
          )}

          {activeSubTab === 'reasoning' && (
            <div className="flex items-center gap-1.5 text-neutral-600">
              <span className="text-neutral-400 text-[11px]">Filter:</span>
              <button
                onClick={() => setReasoningFilter('all')}
                className={`px-2.5 py-0.5 rounded-full ${reasoningFilter === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setReasoningFilter('reasoning')}
                className={`px-2.5 py-0.5 rounded-full ${reasoningFilter === 'reasoning' ? 'bg-purple-600 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                Reasoning Only
              </button>
              <button
                onClick={() => setReasoningFilter('standard')}
                className={`px-2.5 py-0.5 rounded-full ${reasoningFilter === 'standard' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                Standard Models
              </button>
            </div>
          )}

          {activeSubTab === 'modalities' && (
            <div className="flex items-center gap-1.5 text-neutral-600">
              <span className="text-neutral-400 text-[11px]">Filter:</span>
              <button
                onClick={() => setModalityFilter('all')}
                className={`px-2.5 py-0.5 rounded-full ${modalityFilter === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setModalityFilter('vision')}
                className={`px-2.5 py-0.5 rounded-full ${modalityFilter === 'vision' ? 'bg-sky-600 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                Multimodal (Vision)
              </button>
              <button
                onClick={() => setModalityFilter('text')}
                className={`px-2.5 py-0.5 rounded-full ${modalityFilter === 'text' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                Text Only
              </button>
            </div>
          )}

          {activeSubTab === 'country' && (
            <div className="flex items-center gap-1.5 text-neutral-600">
              <span className="text-neutral-400 text-[11px]">Filter:</span>
              <button
                onClick={() => setCountryFilter('all')}
                className={`px-2.5 py-0.5 rounded-full ${countryFilter === 'all' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                All Countries
              </button>
              <button
                onClick={() => setCountryFilter('us')}
                className={`px-2.5 py-0.5 rounded-full ${countryFilter === 'us' ? 'bg-blue-600 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                🇺🇸 United States
              </button>
              <button
                onClick={() => setCountryFilter('cn')}
                className={`px-2.5 py-0.5 rounded-full ${countryFilter === 'cn' ? 'bg-red-600 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                🇨🇳 China
              </button>
              <button
                onClick={() => setCountryFilter('fr')}
                className={`px-2.5 py-0.5 rounded-full ${countryFilter === 'fr' ? 'bg-indigo-600 text-white' : 'bg-neutral-100 hover:bg-neutral-200'}`}
              >
                🇫🇷 France (Mistral)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
