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
  Sparkles, 
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
      if (initialModelA.id === modelBId) {
        const other = models.find((m) => m.id !== initialModelA.id);
        if (other) setModelBId(other.id);
      }
    }
  }, [initialModelA?.id]);

  useEffect(() => {
    if (initialModelB?.id) {
      setModelBId(initialModelB.id);
      if (initialModelB.id === modelAId) {
        const other = models.find((m) => m.id !== initialModelB.id);
        if (other) setModelAId(other.id);
      }
    }
  }, [initialModelB?.id]);

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
    <section id="battle" className="py-14 lg:py-20 bg-slate-950/40 border-t border-slate-800/80 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3.5 py-1 text-xs font-semibold text-red-300 border border-red-500/20 mb-3">
            <Swords className="h-4 w-4" />
            <span>{language === 'vi' ? 'Đấu trường so găng' : 'Head-to-Head Arena'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.battle.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.battle.subtitle}
          </p>
        </div>

        {/* Model Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
          {/* Picker A */}
          <div className="rounded-2xl border border-violet-500/40 bg-slate-900/90 p-4 shadow-xl">
            <label className="block text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">
              {t.battle.selectModel1} (Góc Xanh)
            </label>
            <select
              value={modelAId}
              onChange={(e) => setModelAId(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-sm font-bold text-white focus:border-violet-500 focus:outline-none"
            >
              {groupedModels.map((grp) => (
                <optgroup key={grp.tier} label={grp.label} className="bg-slate-900 text-slate-300 font-bold">
                  {grp.items.map((m) => (
                    <option key={m.id} value={m.id} disabled={m.id === modelBId} className="bg-slate-950 text-white font-normal">
                      {m.name} ({m.creator}) • {m.intelligenceScore} pts
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Picker B */}
          <div className="rounded-2xl border border-amber-500/40 bg-slate-900/90 p-4 shadow-xl">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              {t.battle.selectModel2} (Góc Cam)
            </label>
            <select
              value={modelBId}
              onChange={(e) => setModelBId(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-sm font-bold text-white focus:border-amber-500 focus:outline-none"
            >
              {groupedModels.map((grp) => (
                <optgroup key={grp.tier} label={grp.label} className="bg-slate-900 text-slate-300 font-bold">
                  {grp.items.map((m) => (
                    <option key={m.id} value={m.id} disabled={m.id === modelAId} className="bg-slate-950 text-white font-normal">
                      {m.name} ({m.creator}) • {m.intelligenceScore} pts
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Battle Arena Cards */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Top Overview Cards */}
          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-800 text-center">
            <div className="p-3.5 rounded-2xl bg-violet-950/20 border border-violet-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-violet-400 uppercase">{modelA.creator}</span>
                <h3 className="text-lg sm:text-2xl font-black text-white mt-0.5">{modelA.name}</h3>
                <div className="text-xs font-medium text-slate-300 mt-2 line-clamp-2">
                  {language === 'vi' ? modelA.vietnameseSummary : modelA.englishSummary}
                </div>
              </div>
              <button
                onClick={() => onSelectDetails(modelA)}
                className="mt-3 inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-violet-300 hover:text-white bg-violet-900/40 hover:bg-violet-800 border border-violet-700/50 rounded-lg py-1 px-3 transition-colors self-center"
              >
                <span>{language === 'vi' ? 'Xem chi tiết' : 'View details'}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase">{modelB.creator}</span>
                <h3 className="text-lg sm:text-2xl font-black text-white mt-0.5">{modelB.name}</h3>
                <div className="text-xs font-medium text-slate-300 mt-2 line-clamp-2">
                  {language === 'vi' ? modelB.vietnameseSummary : modelB.englishSummary}
                </div>
              </div>
              <button
                onClick={() => onSelectDetails(modelB)}
                className="mt-3 inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-white bg-amber-900/40 hover:bg-amber-800 border border-amber-700/50 rounded-lg py-1 px-3 transition-colors self-center"
              >
                <span>{language === 'vi' ? 'Xem chi tiết' : 'View details'}</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Metric Confrontations */}
          <div className="py-6 space-y-5">
            {/* 1. Intelligence Score */}
            <div className="rounded-2xl bg-slate-950/60 p-4 border border-slate-800/80">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                <span className={`font-bold ${intelWinner === 'A' ? 'text-violet-400' : 'text-slate-400'}`}>
                  {modelA.intelligenceScore}/100 {intelWinner === 'A' && '🏆 Thắng'}
                </span>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                  {t.battle.intelligenceWinner}
                </span>
                <span className={`font-bold ${intelWinner === 'B' ? 'text-amber-400' : 'text-slate-400'}`}>
                  {intelWinner === 'B' && '🏆 Thắng '} {modelB.intelligenceScore}/100
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex justify-end">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${modelA.intelligenceScore}%` }} />
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${modelB.intelligenceScore}%` }} />
                </div>
              </div>
            </div>

            {/* 2. Vietnamese Fluency */}
            <div className="rounded-2xl bg-slate-950/60 p-4 border border-slate-800/80">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                <span className={`font-bold ${vietnameseWinner === 'A' ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {modelA.vietnameseRating}/100 {vietnameseWinner === 'A' && '🏆 Thắng'}
                </span>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1">
                  <span>🇻🇳</span> {t.battle.vietnameseWinner}
                </span>
                <span className={`font-bold ${vietnameseWinner === 'B' ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {vietnameseWinner === 'B' && '🏆 Thắng '} {modelB.vietnameseRating}/100
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex justify-end">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${modelA.vietnameseRating}%` }} />
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${modelB.vietnameseRating}%` }} />
                </div>
              </div>
            </div>

            {/* 3. Output Speed */}
            <div className="rounded-2xl bg-slate-950/60 p-4 border border-slate-800/80">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                <span className={`font-bold ${speedWinner === 'A' ? 'text-amber-400' : 'text-slate-400'}`}>
                  {modelA.outputSpeed} tps {speedWinner === 'A' && '⚡ Nhanh hơn'}
                </span>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-400" /> {t.battle.speedWinner}
                </span>
                <span className={`font-bold ${speedWinner === 'B' ? 'text-amber-400' : 'text-slate-400'}`}>
                  {speedWinner === 'B' && '⚡ Nhanh hơn '} {modelB.outputSpeed} tps
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex justify-end">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (modelA.outputSpeed / 250) * 100)}%` }} />
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (modelB.outputSpeed / 250) * 100)}%` }} />
                </div>
              </div>
            </div>

            {/* 4. Output Cost */}
            <div className="rounded-2xl bg-slate-950/60 p-4 border border-slate-800/80">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                <span className={`font-bold ${costWinner === 'A' ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {formatPrice(modelA.outputPricePerMillionUSD)}/1M {costWinner === 'A' && '💰 Rẻ hơn'}
                </span>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" /> {t.battle.costWinner}
                </span>
                <span className={`font-bold ${costWinner === 'B' ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {costWinner === 'B' && '💰 Rẻ hơn '} {formatPrice(modelB.outputPricePerMillionUSD)}/1M
                </span>
              </div>
            </div>

            {/* 5. Coding & Logic */}
            <div className="rounded-2xl bg-slate-950/60 p-4 border border-slate-800/80">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                <span className={`font-bold ${codingWinner === 'A' ? 'text-cyan-400' : 'text-slate-400'}`}>
                  {modelA.codingScore}/100 {codingWinner === 'A' && '💻 Vượt trội'}
                </span>
                <span className="font-bold text-white uppercase text-[11px] tracking-wider">
                  {language === 'vi' ? 'Khả năng Lập Trình (Code)' : 'Coding Proficiency'}
                </span>
                <span className={`font-bold ${codingWinner === 'B' ? 'text-cyan-400' : 'text-slate-400'}`}>
                  {codingWinner === 'B' && '💻 Vượt trội '} {modelB.codingScore}/100
                </span>
              </div>
            </div>
          </div>

          {/* Practical Human Verdict */}
          <div className="mt-4 pt-6 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              {t.battle.finalVerdict}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-300">
              <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30">
                <span className="font-bold text-violet-300 block mb-1">
                  {language === 'vi' ? `👉 Khi nào nên chọn ${modelA.name}?` : `👉 When to pick ${modelA.name}?`}
                </span>
                <ul className="space-y-1 mt-2">
                  {(language === 'vi' ? modelA.bestFor.vi : modelA.bestFor.en).slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-violet-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
                <span className="font-bold text-amber-300 block mb-1">
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
