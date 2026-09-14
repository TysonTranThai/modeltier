'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { Sparkles, Heart, ExternalLink, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { currency, exchangeRate } = useCurrency();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Model<span className="text-violet-400">Tier</span>.vn
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {t.footer.aboutText}
            </p>
            <p className="text-[11px] text-slate-500 mt-2">
              {t.footer.inspiredBy}{' '}
              <a
                href="https://artificialanalysis.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:underline inline-flex items-center gap-0.5"
              >
                artificialanalysis.ai <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {language === 'vi' ? 'Khám Phá Nhanh' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
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
                <a href="#live" className="hover:text-white transition-colors">
                  {t.nav.live}
                </a>
              </li>
              <li>
                <a href="#glossary" className="hover:text-white transition-colors">
                  {t.nav.glossary}
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Currency Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              {language === 'vi' ? 'Thông Tin & Tỉ Giá' : 'Info & Currency'}
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="rounded-xl bg-slate-900 p-3 border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Tỉ giá tham chiếu:</span>
                <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
                  1 USD = {exchangeRate.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                {language === 'vi'
                  ? 'Số liệu chi phí được cập nhật theo bảng giá API công khai của các hãng.'
                  : 'Costs are estimated from officially published API token pricing.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>{t.footer.copyright}</div>
          <div className="flex items-center gap-1">
            <span>Xây dựng với</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" />
            <span>cho cộng đồng AI Việt Nam & thế giới.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
