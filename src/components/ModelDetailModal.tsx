'use client';

import React, { useEffect } from 'react';
import { Model } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { convertUSDToVND, formatVND } from '../data/models';
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  Clock, 
  Layers, 
  DollarSign, 
  Cpu, 
  BarChart3,
  Server,
  BookOpen
} from 'lucide-react';

interface ModelDetailModalProps {
  model: Model | null;
  onClose: () => void;
  onSelectCompare?: (model: Model) => void;
}

export const ModelDetailModal: React.FC<ModelDetailModalProps> = ({
  model,
  onClose,
  onSelectCompare,
}) => {
  const { language, t } = useLanguage();
  const { formatPrice, currency } = useCurrency();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!model) return null;

  // Approximate cost for 1 typical article of 1,500 Vietnamese words (~2,500 output tokens)
  const singleArticleCostUSD = (2500 / 1000000) * model.outputPricePerMillionUSD;
  const singleArticleCostVND = convertUSDToVND(singleArticleCostUSD);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-[#0D0704]/80 animate-in fade-in duration-200 font-sans">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-[#3D2216] bg-[#1E0F09] p-6 sm:p-8 shadow-2xl text-[#FFF6EE] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-[#2E170E] p-2 text-[#A89280] hover:bg-[#3D2216] hover:text-[#FFF6EE] transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#E64A19] text-2xl font-black text-white font-serif shadow-lg shadow-[#FF6B35]/30">
            {model.tier}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D8C4B6]">
                {model.creator}
              </span>
              <span className="text-[#5A3622]">•</span>
              <span className="text-xs text-[#A89280]">
                {language === 'vi' ? 'Phát hành:' : 'Released:'} {model.releaseDate}
              </span>
              {model.isOpenWeights ? (
                <span className="rounded-md bg-[#2A160E] px-2 py-0.5 text-[10px] font-bold text-[#FF8452] border border-[#FF6B35]/40">
                  {t.card.openWeights}
                </span>
              ) : (
                <span className="rounded-md bg-[#24130C] px-2 py-0.5 text-[10px] font-medium text-[#A89280] border border-[#3D2216]">
                  {t.card.proprietary}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-serif font-black text-[#FFF6EE] mt-1">{model.name}</h2>
            {model.badge && (
              <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold border mt-2 ${model.badge.color}`}>
                {language === 'vi' ? model.badge.vi : model.badge.en}
              </span>
            )}
          </div>
        </div>

        {/* Human Summary */}
        <p className="text-xs sm:text-sm text-[#D8C4B6] leading-relaxed rounded-2xl bg-[#140A05] p-4 border border-[#2E170E] mb-6">
          {language === 'vi' ? model.vietnameseSummary : model.englishSummary}
        </p>

        {/* Scores & Benchmarks in Human Terms */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#D8C4B6] flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5 text-[#FF6B35]" />
            {language === 'vi' ? 'Điểm Đánh Giá Năng Lực Thực Chiến (Thang điểm 100)' : 'Practical Capability Scores (Out of 100)'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Vietnamese */}
            <div className="rounded-xl bg-[#140A05] p-3 border border-[#2E170E] text-center">
              <span className="text-[10px] text-[#A89280] block mb-1">🇻🇳 Tiếng Việt</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{model.vietnameseRating}</span>
              <span className="text-[9px] text-[#6B4735] block mt-0.5">
                {model.vietnameseRating >= 90 ? 'Tự nhiên như bản xứ' : 'Tốt, chuẩn ngữ pháp'}
              </span>
            </div>

            {/* Intelligence */}
            <div className="rounded-xl bg-[#140A05] p-3 border border-[#2E170E] text-center">
              <span className="text-[10px] text-[#A89280] block mb-1">🧠 Trí thông minh</span>
              <span className="text-lg font-black text-[#FF6B35] font-mono">{model.intelligenceScore}</span>
              <span className="text-[9px] text-[#6B4735] block mt-0.5">
                {model.intelligenceScore >= 95 ? 'Top đầu toàn cầu' : 'Rất khôn ngoan'}
              </span>
            </div>

            {/* Coding */}
            <div className="rounded-xl bg-[#140A05] p-3 border border-[#2E170E] text-center">
              <span className="text-[10px] text-[#A89280] block mb-1">💻 Lập trình & Code</span>
              <span className="text-lg font-black text-[#FF8452] font-mono">{model.codingScore}</span>
              <span className="text-[9px] text-[#6B4735] block mt-0.5">
                {model.codingScore >= 95 ? 'Kỹ sư cao cấp' : 'Trợ lý lập trình tốt'}
              </span>
            </div>

            {/* Reasoning */}
            <div className="rounded-xl bg-[#140A05] p-3 border border-[#2E170E] text-center">
              <span className="text-[10px] text-[#A89280] block mb-1">📐 Tư duy & Toán</span>
              <span className="text-lg font-black text-amber-400 font-mono">{model.reasoningScore}</span>
              <span className="text-[9px] text-[#6B4735] block mt-0.5">
                {model.reasoningScore >= 95 ? 'Giải toán chuyên sâu' : 'Logic mạch lạc'}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Real-World Estimate */}
        <div className="rounded-2xl bg-[#140A05] border border-[#3D2216] p-4 mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" />
              {t.modal.estimatedVNPrice}
            </span>
            <span className="text-[#A89280]">
              Output: {formatPrice(model.outputPricePerMillionUSD)} / 1M token
            </span>
          </div>
          <p className="text-xs text-[#D8C4B6]">
            {language === 'vi' ? (
              <>
                Viết 1 bài luận hoặc bài blog dài 1.500 từ chỉ tốn khoảng{' '}
                <span className="font-bold text-emerald-400">{formatVND(singleArticleCostVND)}</span> (~$
                {singleArticleCostUSD.toFixed(4)} USD).
              </>
            ) : (
              <>
                Generating a full 1,500-word article costs approximately{' '}
                <span className="font-bold text-emerald-400">{formatVND(singleArticleCostVND)}</span> (~$
                {singleArticleCostUSD.toFixed(4)} USD).
              </>
            )}
          </p>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
          {/* Pros */}
          <div className="rounded-2xl bg-[#140A05] p-4 border border-[#2E170E]">
            <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" />
              {t.modal.strengths}
            </h4>
            <ul className="space-y-1.5 text-[#D8C4B6]">
              {(language === 'vi' ? model.pros.vi : model.pros.en).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="rounded-2xl bg-[#140A05] p-4 border border-[#2E170E]">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" />
              {t.modal.weaknesses}
            </h4>
            <ul className="space-y-1.5 text-[#D8C4B6]">
              {(language === 'vi' ? model.cons.vi : model.cons.en).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Supported Providers */}
        <div className="mb-6">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#A89280] mb-2 flex items-center gap-1.5">
            <Server className="h-3.5 w-3.5 text-[#FF6B35]" />
            {t.modal.supportedProviders}
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {model.providers.map((p, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-[#2E170E] bg-[#24130C] px-2.5 py-1 text-xs text-[#D8C4B6] font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#2E170E]">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#3D2216] bg-[#24130C] px-4 py-2 text-xs font-semibold text-[#D8C4B6] hover:bg-[#2E170E] hover:text-[#FFF6EE] transition-colors"
          >
            {t.modal.close}
          </button>

          <div className="flex items-center gap-2">
            {onSelectCompare && (
              <button
                onClick={() => {
                  onSelectCompare(model);
                  onClose();
                }}
                className="rounded-xl border border-[#3D2216] bg-[#24130C] px-4 py-2 text-xs font-semibold text-[#D8C4B6] hover:bg-[#2E170E] hover:text-[#FFF6EE] transition-colors"
              >
                {language === 'vi' ? 'Đưa vào so sánh' : 'Compare'}
              </button>
            )}

            {model.playgroundUrl && (
              <a
                href={model.playgroundUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF6B35] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#FF6B35]/25 hover:bg-[#FF8452] transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {t.card.tryOfficial}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
