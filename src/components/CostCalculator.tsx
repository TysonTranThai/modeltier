'use client';

import React, { useState, useMemo } from 'react';
import { Model, WorkloadScenario } from '../types';
import { SCENARIOS_DATA } from '../data/scenarios';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { convertUSDToVND, formatVND } from '../data/models';
import { 
  Calculator, 
  Coins, 
  HelpCircle, 
  Sparkles, 
  TrendingDown, 
  Zap, 
  Coffee, 
  ArrowRight,
  Search
} from 'lucide-react';

interface CostCalculatorProps {
  models: Model[];
  onSelectDetails: (model: Model) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  models,
  onSelectDetails,
}) => {
  const { language, t } = useLanguage();
  const { currency, formatPrice } = useCurrency();

  // Selected scenario or custom words
  const [selectedScenario, setSelectedScenario] = useState<string>('cskh');
  const [inputWords, setInputWords] = useState<number>(400000);
  const [outputWords, setOutputWords] = useState<number>(600000);
  const [calcSearch, setCalcSearch] = useState<string>('');
  const [calcShowAll, setCalcShowAll] = useState<boolean>(false);

  const handleSelectScenario = (scenario: WorkloadScenario) => {
    setSelectedScenario(scenario.id);
    setInputWords(scenario.inputWordsPerMonth);
    setOutputWords(scenario.outputWordsPerMonth);
  };

  // Convert words to tokens (Vietnamese text averages ~1.6 tokens/word, English ~1.3)
  const WORDS_TO_TOKENS_RATIO = 1.5;
  const inputTokens = Math.round(inputWords * WORDS_TO_TOKENS_RATIO);
  const outputTokens = Math.round(outputWords * WORDS_TO_TOKENS_RATIO);

  // Calculate monthly cost for a given model in USD and VND
  const calculateModelCost = (model: Model) => {
    const inputCostUSD = (inputTokens / 1000000) * model.inputPricePerMillionUSD;
    const outputCostUSD = (outputTokens / 1000000) * model.outputPricePerMillionUSD;
    const totalUSD = inputCostUSD + outputCostUSD;
    const totalVND = convertUSDToVND(totalUSD);
    return { totalUSD, totalVND };
  };

  const filteredCalcModels = useMemo(() => {
    let list = models;
    if (calcSearch.trim()) {
      const q = calcSearch.toLowerCase().trim();
      list = list.filter((m) => m.name.toLowerCase().includes(q) || m.creator.toLowerCase().includes(q));
    }
    return list;
  }, [models, calcSearch]);

  const allCalculatedRows = useMemo(() => {
    const rows = filteredCalcModels.map((m) => {
      const { totalUSD, totalVND } = calculateModelCost(m);
      return { model: m, totalUSD, totalVND };
    });
    rows.sort((a, b) => a.totalVND - b.totalVND);
    return rows;
  }, [filteredCalcModels, inputTokens, outputTokens]);

  const calculatedRows = calcShowAll || calcSearch.trim() !== '' ? allCalculatedRows : allCalculatedRows.slice(0, 10);
  const minCost = allCalculatedRows[0]?.totalVND || 1;
  const maxCost = allCalculatedRows[allCalculatedRows.length - 1]?.totalVND || 1;

  const getVietnameseAnalogy = (vndAmount: number) => {
    if (language === 'en') {
      if (vndAmount <= 5000) return '🍵 Less than a cup of iced tea (< $0.20)';
      if (vndAmount <= 30000) return '🥖 About a street sandwich / banh mi (~$1)';
      if (vndAmount <= 60000) return '🍜 About a bowl of hot noodle soup (~$2)';
      if (vndAmount <= 200000) return '☕ About 2-3 specialty coffees (~$8)';
      if (vndAmount <= 500000) return '🍱 A modest team lunch feast (~$20)';
      return '💼 Equivalent to enterprise tier subscription';
    }
    if (vndAmount <= 5000) return '🍵 Rẻ hơn 1 ly trà đá vỉa hè (dưới 5k)';
    if (vndAmount <= 30000) return '🥖 Bằng 1 chiếc bánh mì pate giòn';
    if (vndAmount <= 60000) return '🍜 Bằng 1 tô phở bò đặc biệt';
    if (vndAmount <= 200000) return '☕ Bằng 2-3 ly trà sữa / cà phê';
    if (vndAmount <= 500000) return '🍱 Bằng 1 bữa liên hoan lẩu mini';
    return '💼 Chi phí tương đương mức doanh nghiệp vừa';
  };

  return (
    <section id="calculator" className="py-14 lg:py-20 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/20 mb-3">
            <Calculator className="h-4 w-4" />
            <span>{language === 'vi' ? 'Dự toán ngân sách' : 'Budget Forecaster'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Workload Presets */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left">
            {t.calculator.selectPreset}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {SCENARIOS_DATA.map((scenario) => {
              const isSelected = selectedScenario === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => handleSelectScenario(scenario)}
                  className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/40'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <span className={`text-xs font-bold ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                    {language === 'vi' ? scenario.name.vi : scenario.name.en}
                  </span>
                  <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {language === 'vi' ? scenario.description.vi : scenario.description.en}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliders for Custom Tuning */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Words Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                <span className="font-bold text-white">{t.calculator.inputWordsLabel}</span>
                <span className="text-emerald-400 font-bold">
                  {inputWords.toLocaleString('vi-VN')} {language === 'vi' ? 'từ' : 'words'} (~{Math.round(inputTokens / 1000)}k tokens)
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={5000000}
                step={20000}
                value={inputWords}
                onChange={(e) => {
                  setSelectedScenario('custom');
                  setInputWords(Number(e.target.value));
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                {language === 'vi' ? 'Câu hỏi, yêu cầu, văn bản bạn gửi vào cho AI xử lý' : 'Prompts and documents sent to the AI'}
              </span>
            </div>

            {/* Output Words Slider */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                <span className="font-bold text-white">{t.calculator.outputWordsLabel}</span>
                <span className="text-violet-400 font-bold">
                  {outputWords.toLocaleString('vi-VN')} {language === 'vi' ? 'từ' : 'words'} (~{Math.round(outputTokens / 1000)}k tokens)
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={2000000}
                step={10000}
                value={outputWords}
                onChange={(e) => {
                  setSelectedScenario('custom');
                  setOutputWords(Number(e.target.value));
                }}
                className="w-full accent-violet-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                {language === 'vi' ? 'Bài viết, câu trả lời do AI sinh ra gửi về cho bạn' : 'Responses, essays and code generated by AI'}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400/90 font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              {t.calculator.savingNote}
            </span>
            <span className="text-[11px] text-slate-500">
              {t.calculator.tokensEquivalentNote}
            </span>
          </div>
        </div>

        {/* Search & Show All Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={language === 'vi' ? 'Tìm mô hình trong bảng tính chi phí...' : 'Search model in cost table...'}
              value={calcSearch}
              onChange={(e) => setCalcSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setCalcShowAll(!calcShowAll)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors self-end sm:self-auto"
          >
            {calcShowAll
              ? (language === 'vi' ? 'Thu gọn (Top 10)' : 'Collapse (Top 10)')
              : (language === 'vi' ? `Xem tất cả ${allCalculatedRows.length} mô hình` : `Show all ${allCalculatedRows.length} models`)}
          </button>
        </div>

        {/* Calculation Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold">
                <tr>
                  <th className="p-4 sm:pl-6">{t.calculator.tableModel}</th>
                  <th className="p-4">{t.calculator.tableTier}</th>
                  <th className="p-4">{language === 'vi' ? 'Chi phí tháng' : 'Monthly Cost'}</th>
                  <th className="p-4 hidden md:table-cell">{language === 'vi' ? 'Tỉ lệ chi phí trực quan' : 'Cost Comparison'}</th>
                  <th className="p-4 hidden sm:table-cell">{t.calculator.tableVerdict}</th>
                  <th className="p-4 text-right sm:pr-6">{language === 'vi' ? 'Thao tác' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {calculatedRows.map((row, idx) => {
                  const isCheapest = idx === 0;
                  const percentOfMax = Math.max(5, Math.min(100, Math.round((row.totalVND / maxCost) * 100)));

                  return (
                    <tr key={row.model.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 sm:pl-6">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{row.model.name}</span>
                          {isCheapest && (
                            <span className="rounded-md bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/40">
                              {t.calculator.cheapestBadge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{row.model.creator}</span>
                      </td>

                      <td className="p-4">
                        <span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-black ${
                          row.model.tier === 'S' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          row.model.tier === 'A' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          row.model.tier === 'B' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {row.model.tier}-Tier
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="font-extrabold text-sm text-emerald-400">
                          {currency === 'VND' ? formatVND(row.totalVND) : `$${row.totalUSD.toFixed(2)}`}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {currency === 'VND' ? `~$${row.totalUSD.toFixed(2)}` : formatVND(row.totalVND)}
                        </div>
                      </td>

                      <td className="p-4 hidden md:table-cell w-48">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                          <div
                            className={`h-full rounded-full ${
                              isCheapest ? 'bg-emerald-400' : percentOfMax > 60 ? 'bg-red-400' : 'bg-amber-400'
                            }`}
                            style={{ width: `${percentOfMax}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          {percentOfMax}% {language === 'vi' ? 'so với mức cao nhất' : 'of max'}
                        </span>
                      </td>

                      <td className="p-4 hidden sm:table-cell">
                        <span className="text-xs text-slate-300 flex items-center gap-1.5">
                          {getVietnameseAnalogy(row.totalVND)}
                        </span>
                      </td>

                      <td className="p-4 text-right sm:pr-6">
                        <button
                          onClick={() => onSelectDetails(row.model)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
                        >
                          {language === 'vi' ? 'Chi tiết' : 'Details'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
