'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Model } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Swords, 
  Trophy, 
  Zap, 
  DollarSign, 
  Brain, 
  Layers, 
  CheckCircle, 
  ArrowRight,
  ExternalLink 
} from 'lucide-react';

interface ModelBattleProps {
  models: Model[];
  initialModelA?: Model;
  initialModelB?: Model;
  onSelectDetails: (model: Model) => void;
}

export const ModelBattle: React.FC<ModelBattleProps> = ({
  models,
  initialModelA,
  initialModelB,
  onSelectDetails,
}) => {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [modelAId, setModelAId] = useState<string>(
    initialModelA?.id || 'claude-3-7-sonnet'
  );
  const [modelBId, setModelBId] = useState<string>(
    initialModelB?.id || 'gpt-4o'
  );

  const groupedModels = useMemo(() => {
    const s = models.filter((m) => m.tier === 'S').sort((a, b) => b.intelligenceScore - a.intelligenceScore);
    const a = models.filter((m) => m.tier === 'A').sort((a, b) => b.intelligenceScore - a.intelligenceScore);
    const b = models.filter((m) => m.tier === 'B').sort((a, b) => b.intelligenceScore - a.intelligenceScore);
    const c = models.filter((m) => m.tier === 'C').sort((a, b) => b.intelligenceScore - a.intelligenceScore);
    return [
      { tier: 'S', label: language === 'vi' ? '👑 S-Tier (Đỉnh cao / Thần thoại)' : '👑 S-Tier (Apex & Frontier)', items: s },
      { tier: 'A', label: language === 'vi' ? '⭐ A-Tier (Xuất sắc / Khuyên dùng)' : '⭐ A-Tier (Outstanding)', items: a },
      { tier: 'B', label: language === 'vi' ? '⚡ B-Tier (Thực dụng / Giá rẻ)' : '⚡ B-Tier (Pragmatic / Budget)', items: b },
      { tier: 'C', label: language === 'vi' ? '📦 C-Tier (Cơ bản / Nhẹ)' : '📦 C-Tier (Basic & Lightweight)', items: c },
    ];
  }, [models, language]);

  useEffect(() => {
    if (initialModelA?.id) {
      setModelAId(initialModelA.id);
      setModelBId((currentBId) => {
        if (currentBId === initialModelA.id) {
          const other = models.find((m) => m.id !== initialModelA.id);
          return other ? other.id : currentBId;
        }
        return currentBId;
      });
    }
  }, [initialModelA?.id, models]);

  useEffect(() => {
    if (initialModelB?.id) {
      setModelBId(initialModelB.id);
      setModelAId((currentAId) => {
        if (currentAId === initialModelB.id) {
          const other = models.find((m) => m.id !== initialModelB.id);
          return other ? other.id : currentAId;
        }
        return currentAId;
      });
    }
  }, [initialModelB?.id, models]);

  const modelA = models.find((m) => m.id === modelAId) || models[0];
  const modelB = models.find((m) => m.id === modelBId) || models[1];

  const compareWinner = (valA: number, valB: number, lowerIsBetter = false) => {
    if (valA === valB) return 'tie';
    if (lowerIsBetter) {
      return valA < valB ? 'A' : 'B';
    }
    return valA > valB ? 'A' : 'B';
  };

  const intelWinner = compareWinner(modelA.intelligenceScore, modelB.intelligenceScore);
  const vietnameseWinner = compareWinner(modelA.vietnameseRating, modelB.vietnameseRating);
  const speedWinner = compareWinner(modelA.outputSpeed, modelB.outputSpeed);
  const costWinner = compareWinner(modelA.outputPricePerMillionUSD, modelB.outputPricePerMillionUSD, true);
  const contextWinner = compareWinner(modelA.contextWindow, modelB.contextWindow);
  const codingWinner = compareWinner(modelA.codingScore, modelB.codingScore);

  return (
    <section id="battle" className="py-14 lg:py-20 bg-[#1A0E08]/40 border-t border-[#3D2216] scroll-mt-28 w-full max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-sm bg-[#FF6B35]/10 px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF8452] border border-[#FF6B35]/20 mb-3">
            <Swords className="h-4 w-4" />
            <span>{language === 'vi' ? 'Đấu trường so găng' : 'Head-to-Head Arena'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFF6EE] tracking-tight">
            {t.battle.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A89280]">
            {t.battle.subtitle}
          </p>
        </div>

        {/* Model Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8 w-full max-w-full">
          {/* Picker A */}
          <div className="rounded-sm border border-[#FF6B35]/40 bg-[#24130C]/90 p-4 shadow-xl">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#FF8452] mb-2">
              {t.battle.selectModel1} {language === 'vi' ? '(Mô hình A)' : '(Corner A)'}
            </label>
            <select
              value={modelAId}
              onChange={(e) => setModelAId(e.target.value)}
              className="w-full rounded-sm border border-[#472718] bg-[#1A0E08] p-2.5 font-mono text-xs font-bold text-[#FFF6EE] focus:border-[#FF6B35] focus:outline-none"
            >
              {groupedModels.map((grp) => (
                <optgroup key={grp.tier} label={grp.label} className="bg-[#24130C] text-[#D8C4B6] font-bold">
                  {grp.items.map((m) => (
                    <option key={m.id} value={m.id} disabled={m.id === modelBId} className="bg-[#1A0E08] text-[#FFF6EE] font-normal">
                      {m.name} ({m.creator}) • {m.intelligenceScore} pts
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Picker B */}
          <div className="rounded-sm border border-amber-500/40 bg-[#24130C]/90 p-4 shadow-xl">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
              {t.battle.selectModel2} {language === 'vi' ? '(Mô hình B)' : '(Corner B)'}
            </label>
            <select
              value={modelBId}
              onChange={(e) => setModelBId(e.target.value)}
              className="w-full rounded-sm border border-[#472718] bg-[#1A0E08] p-2.5 font-mono text-xs font-bold text-[#FFF6EE] focus:border-amber-500 focus:outline-none"
            >
              {groupedModels.map((grp) => (
                <optgroup key={grp.tier} label={grp.label} className="bg-[#24130C] text-[#D8C4B6] font-bold">
                  {grp.items.map((m) => (
                    <option key={m.id} value={m.id} disabled={m.id === modelAId} className="bg-[#1A0E08] text-[#FFF6EE] font-normal">
                      {m.name} ({m.creator}) • {m.intelligenceScore} pts
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Battle Arena Cards */}
        <div className="max-w-4xl mx-auto rounded-sm border border-[#3D2216] bg-[#24130C]/90 p-4 sm:p-10 shadow-2xl backdrop-blur-xl w-full max-w-full overflow-hidden">
          {/* Top Overview Cards with Glowing VS Badge */}
          <div className="relative">
            <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-br from-[#FF6B35] to-[#E64A19] text-white font-mono font-black text-xs shadow-glow-orange border border-[#1E0F09] animate-orange-pulse">
              VS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-[#3D2216] text-center">
              <div className="p-4 rounded-sm bg-[#FF6B35]/10 border border-[#FF6B35]/30 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#FF8452] uppercase">{modelA.creator}</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#FFF6EE] mt-0.5">{modelA.name}</h3>
                  <div className="text-xs font-medium text-[#D8C4B6] mt-2 line-clamp-2">
                    {language === 'vi' ? modelA.vietnameseSummary : modelA.englishSummary}
                  </div>
                </div>
                <button
                  onClick={() => onSelectDetails(modelA)}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FF8452] hover:text-[#FFF6EE] bg-[#2E170E] hover:bg-[#3D2216] border border-[#FF6B35]/30 rounded-sm py-2 px-4 transition-all self-center"
                >
                  <span>{language === 'vi' ? 'Xem chi tiết' : 'View details'}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Mobile VS indicator between stacked cards */}
              <div className="flex sm:hidden justify-center -my-2 z-10">
                <span className="h-7 w-7 flex items-center justify-center rounded-sm bg-gradient-to-br from-[#FF6B35] to-[#E64A19] text-white font-mono font-black text-xs shadow-glow-orange border border-[#1E0F09]">
                  VS
                </span>
              </div>

              <div className="p-4 rounded-sm bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">{modelB.creator}</span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#FFF6EE] mt-0.5">{modelB.name}</h3>
                  <div className="text-xs font-medium text-[#D8C4B6] mt-2 line-clamp-2">
                    {language === 'vi' ? modelB.vietnameseSummary : modelB.englishSummary}
                  </div>
                </div>
                <button
                  onClick={() => onSelectDetails(modelB)}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-[#FFF6EE] bg-amber-900/40 hover:bg-amber-800 border border-amber-700/50 rounded-sm py-2 px-4 transition-all self-center"
                >
                  <span>{language === 'vi' ? 'Xem chi tiết' : 'View details'}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 5-Round Head-to-Head Telemetry */}
          <div className="mt-8 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#A89280] text-center">
              {language === 'vi' ? 'So sánh 5 chỉ số trực diện' : '5-Pillar Metric Breakdown'}
            </h4>

            {/* 1. Intelligence Score */}
            <div className="rounded-sm bg-[#180D07] p-4 border border-[#3D2216]">
              <div className="flex flex-wrap sm:flex-nowrap justify-between items-center text-xs text-[#A89280] mb-2 font-mono gap-1">
                <span className={`font-bold ${intelWinner === 'A' ? 'text-[#FF8452]' : 'text-[#A89280]'}`}>
                  {modelA.intelligenceScore}/100 {intelWinner === 'A' && '🏆 Thắng'}
                </span>
                <span className="font-bold text-[#FFF6EE] uppercase text-[11px] tracking-wider flex items-center gap-1 font-sans">
                  <Brain className="h-3.5 w-3.5 text-[#FF8452]" />
                  {t.battle.intelligenceWinner}
                </span>
                <span className={`font-bold ${intelWinner === 'B' ? 'text-amber-400' : 'text-[#A89280]'}`}>
                  {intelWinner === 'B' && '🏆 Thắng '} {modelB.intelligenceScore}/100
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 rounded-sm bg-[#2A160E] overflow-hidden flex justify-end">
                  <div className="h-full bg-[#FF6B35] rounded-sm transition-all duration-700 ease-out" style={{ width: `${modelA.intelligenceScore}%` }} />
                </div>
                <div className="h-2 rounded-sm bg-[#2A160E] overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-sm transition-all duration-700 ease-out" style={{ width: `${modelB.intelligenceScore}%` }} />
                </div>
              </div>
            </div>

            {/* 2. Vietnamese Fluency */}
            <div className="rounded-sm bg-[#180D07] p-4 border border-[#3D2216]">
              <div className="flex flex-wrap sm:flex-nowrap justify-between items-center text-xs text-[#A89280] mb-2 font-mono gap-1">
                <span className={`font-bold ${vietnameseWinner === 'A' ? 'text-emerald-400' : 'text-[#A89280]'}`}>
                  {modelA.vietnameseRating}/100 {vietnameseWinner === 'A' && '🏆 Thắng'}
                </span>
                <span className="font-bold text-[#FFF6EE] uppercase text-[11px] tracking-wider flex items-center gap-1 font-sans">
                  <span>🇻🇳</span> {t.battle.vietnameseWinner}
                </span>
                <span className={`font-bold ${vietnameseWinner === 'B' ? 'text-emerald-400' : 'text-[#A89280]'}`}>
                  {vietnameseWinner === 'B' && '🏆 Thắng '} {modelB.vietnameseRating}/100
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 rounded-sm bg-[#2A160E] overflow-hidden flex justify-end">
                  <div className="h-full bg-emerald-500 rounded-sm transition-all duration-700 ease-out" style={{ width: `${modelA.vietnameseRating}%` }} />
                </div>
                <div className="h-2 rounded-sm bg-[#2A160E] overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-sm transition-all duration-700 ease-out" style={{ width: `${modelB.vietnameseRating}%` }} />
                </div>
              </div>
            </div>

            {/* 3. Output Speed */}
            <div className="rounded-sm bg-[#180D07] p-4 border border-[#3D2216]">
              <div className="flex flex-wrap sm:flex-nowrap justify-between items-center text-xs text-[#A89280] mb-2 font-mono gap-1">
                <span className={`font-bold ${speedWinner === 'A' ? 'text-amber-400' : 'text-[#A89280]'}`}>
                  {modelA.outputSpeed} tps {speedWinner === 'A' && '⚡ Nhanh hơn'}
                </span>
                <span className="font-bold text-[#FFF6EE] uppercase text-[11px] tracking-wider flex items-center gap-1 font-sans">
                  <Zap className="h-3.5 w-3.5 text-amber-400" /> {t.battle.speedWinner}
                </span>
                <span className={`font-bold ${speedWinner === 'B' ? 'text-amber-400' : 'text-[#A89280]'}`}>
                  {speedWinner === 'B' && '⚡ Nhanh hơn '} {modelB.outputSpeed} tps
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 rounded-sm bg-[#2A160E] overflow-hidden flex justify-end">
                  <div className="h-full bg-amber-500 rounded-sm transition-all duration-700 ease-out" style={{ width: `${Math.min(100, (modelA.outputSpeed / 250) * 100)}%` }} />
                </div>
                <div className="h-2 rounded-sm bg-[#2A160E] overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-sm transition-all duration-700 ease-out" style={{ width: `${Math.min(100, (modelB.outputSpeed / 250) * 100)}%` }} />
                </div>
              </div>
            </div>

            {/* 4. Output Cost */}
            <div className="rounded-sm bg-[#180D07] p-4 border border-[#3D2216]">
              <div className="flex flex-wrap sm:flex-nowrap justify-between items-center text-xs text-[#A89280] mb-2 font-mono gap-1">
                <span className={`font-bold ${costWinner === 'A' ? 'text-emerald-400' : 'text-[#A89280]'}`}>
                  {formatPrice(modelA.outputPricePerMillionUSD)}/1M {costWinner === 'A' && '💰 Rẻ hơn'}
                </span>
                <span className="font-bold text-[#FFF6EE] uppercase text-[11px] tracking-wider flex items-center gap-1 font-sans">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" /> {t.battle.costWinner}
                </span>
                <span className={`font-bold ${costWinner === 'B' ? 'text-emerald-400' : 'text-[#A89280]'}`}>
                  {costWinner === 'B' && '💰 Rẻ hơn '} {formatPrice(modelB.outputPricePerMillionUSD)}/1M
                </span>
              </div>
            </div>

            {/* 5. Coding & Logic */}
            <div className="rounded-sm bg-[#180D07] p-4 border border-[#3D2216]">
              <div className="flex flex-wrap sm:flex-nowrap justify-between items-center text-xs text-[#A89280] mb-2 font-mono gap-1">
                <span className={`font-bold ${codingWinner === 'A' ? 'text-cyan-400' : 'text-[#A89280]'}`}>
                  {modelA.codingScore}/100 {codingWinner === 'A' && '💻 Vượt trội'}
                </span>
                <span className="font-bold text-[#FFF6EE] uppercase text-[11px] tracking-wider font-sans">
                  {language === 'vi' ? 'Khả năng Lập Trình (Code)' : 'Coding Proficiency'}
                </span>
                <span className={`font-bold ${codingWinner === 'B' ? 'text-cyan-400' : 'text-[#A89280]'}`}>
                  {codingWinner === 'B' && '💻 Vượt trội '} {modelB.codingScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Winner Final Verdict */}
          <div className="mt-8 pt-6 border-t border-[#3D2216]">
            <h4 className="font-serif font-bold text-base text-[#FFF6EE] mb-4 text-center">
              {t.battle.finalVerdict}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-[#D8C4B6]">
              <div className="p-4 rounded-sm bg-[#FF6B35]/10 border border-[#FF6B35]/30">
                <span className="font-bold text-[#FF8452] block mb-1 font-mono">
                  {language === 'vi' ? `👉 Khi nào nên chọn ${modelA.name}?` : `👉 When to pick ${modelA.name}?`}
                </span>
                <ul className="space-y-1 mt-2">
                  {(language === 'vi' ? modelA.bestFor.vi : modelA.bestFor.en).slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-[#FF8452] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-sm bg-amber-950/30 border border-amber-500/30">
                <span className="font-bold text-amber-300 block mb-1 font-mono">
                  {language === 'vi' ? `👉 Khi nào nên chọn ${modelB.name}?` : `👉 When to pick ${modelB.name}?`}
                </span>
                <ul className="space-y-1 mt-2">
                  {(language === 'vi' ? modelB.bestFor.vi : modelB.bestFor.en).slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
