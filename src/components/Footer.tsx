'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { Sparkles, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { exchangeRate } = useCurrency();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Model<span className="text-violet-400">Tier</span>.vn
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {language === 'vi'
                ? 'Dự án phi lợi nhuận hướng tới cộng đồng người Việt và người dùng toàn cầu, giúp mọi người tiếp cận, so sánh và lựa chọn công nghệ AI một cách đơn giản, trực quan và minh bạch nhất.'
                : 'An independent initiative designed to make frontier AI model benchmarking accessible, transparent, and practical for everyone.'}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {language === 'vi' ? 'Khám Phá' : 'Navigation'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#leaderboard" className="hover:text-white transition-colors">
                  {language === 'vi' ? 'Bảng 300+ Model' : '300+ Models Leaderboard'}
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-white transition-colors">
                  {language === 'vi' ? 'Tiêu Điểm Hàng Đầu' : 'Highlights'}
                </a>
              </li>
              <li>
                <a href="#scatterplot" className="hover:text-white transition-colors">
                  {language === 'vi' ? 'Đồ Thị Pareto' : 'Pareto Chart'}
                </a>
              </li>
              <li>
                <a href="#tierlist" className="hover:text-white transition-colors">
                  {t.nav.tierList}
                </a>
              </li>
              <li>
                <a href="#finder" className="hover:text-white transition-colors">
                  {t.nav.finder}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  {t.nav.calculator}
                </a>
              </li>
              <li>
                <a href="#battle" className="hover:text-white transition-colors">
                  {t.nav.battle}
                </a>
              </li>
              <li>
                <a href="#glossary" className="hover:text-white transition-colors">
                  {t.nav.glossary}
                </a>
              </li>
            </ul>
          </div>

          {/* Exchange Rate Box */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {language === 'vi' ? 'Tỉ Giá & Chu Kỳ' : 'Live Settings'}
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="rounded-xl bg-slate-900 p-3 border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Tỉ giá tham chiếu VNĐ:</span>
                <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
                  1 USD = {exchangeRate.toLocaleString('vi-VN')} VNĐ
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Tự động đồng bộ: Mỗi 15 phút
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Reference to Artificial Analysis */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            ModelTier.vn • {language === 'vi' ? 'Nền tảng theo dõi và xếp hạng AI độc lập.' : 'Independent AI Model Leaderboard.'}
          </div>

          {/* Reference Attribution */}
          <div className="text-center sm:text-right">
            <span>{language === 'vi' ? 'Dữ liệu benchmark tham chiếu và đồng bộ từ ' : 'Benchmark telemetry referenced & synchronized from '}</span>
            <a
              href="https://artificialanalysis.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 font-semibold inline-flex items-center gap-0.5 underline-offset-2 hover:underline"
            >
              Artificial Analysis (artificialanalysis.ai) <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
