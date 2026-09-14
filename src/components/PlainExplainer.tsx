'use client';

import React, { useState } from 'react';
import { GLOSSARY_DATA } from '../data/glossary';
import { useLanguage } from '../context/LanguageContext';
import { 
  BookOpen, 
  Coins, 
  Zap, 
  Clock, 
  Layers, 
  Award, 
  ShieldCheck, 
  HelpCircle,
  Lightbulb,
  Check 
} from 'lucide-react';

export const PlainExplainer: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTermId, setActiveTermId] = useState<string>('token');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Coins': return Coins;
      case 'Zap': return Zap;
      case 'Clock': return Clock;
      case 'Layers': return Layers;
      case 'Award': return Award;
      case 'ShieldCheck': return ShieldCheck;
      default: return HelpCircle;
    }
  };

  const activeTerm = GLOSSARY_DATA.find((g) => g.id === activeTermId) || GLOSSARY_DATA[0];
  const ActiveIcon = getIcon(activeTerm.iconName);

  return (
    <section id="glossary" className="py-14 lg:py-20 bg-slate-950/60 border-t border-slate-800/80 scroll-mt-16 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-300 border border-violet-500/20 mb-3">
            <BookOpen className="h-4 w-4" />
            <span>{language === 'vi' ? 'Cẩm nang cho người không chuyên' : 'AI for Everyone'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.glossarySection.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            {t.glossarySection.subtitle}
          </p>
        </div>

        {/* Interactive Layout: Side Selector + Spotlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
          {/* Terms Menu */}
          <div className="lg:col-span-5 space-y-2">
            {GLOSSARY_DATA.map((item) => {
              const Icon = getIcon(item.iconName);
              const isSelected = item.id === activeTermId;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTermId(item.id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-violet-500 bg-violet-600/15 text-white ring-1 ring-violet-500/30'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-bold truncate">
                      {language === 'vi' ? item.term.vi : item.term.en}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {language === 'vi' ? item.subtitle.vi : item.subtitle.en}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Spotlight Explanation */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-start gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20">
                  <ActiveIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {language === 'vi' ? activeTerm.term.vi : activeTerm.term.en}
                  </h3>
                  <p className="text-xs text-violet-300 font-medium mt-1">
                    {language === 'vi' ? activeTerm.subtitle.vi : activeTerm.subtitle.en}
                  </p>
                </div>
              </div>

              {/* Simple Definition */}
              <div className="rounded-2xl bg-slate-950/60 p-4 border border-slate-800/80 mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {language === 'vi' ? 'Định nghĩa đơn giản:' : 'Simple Definition:'}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {language === 'vi' ? activeTerm.simpleExplanation.vi : activeTerm.simpleExplanation.en}
                </p>
              </div>

              {/* Real World Analogy Box */}
              <div className="rounded-2xl bg-amber-950/20 p-4 border border-amber-500/30 mb-5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>{t.glossarySection.realWorldAnalogyBadge}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {language === 'vi' ? activeTerm.realWorldAnalogy.vi : activeTerm.realWorldAnalogy.en}
                </p>
              </div>
            </div>

            {/* Why it Matters Box */}
            <div className="rounded-2xl bg-emerald-950/20 p-4 border border-emerald-500/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1">
                <Check className="h-4 w-4" />
                <span>{t.glossarySection.whyItMattersBadge}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'vi' ? activeTerm.whyItMatters.vi : activeTerm.whyItMatters.en}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
