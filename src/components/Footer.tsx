'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { BarChart3, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { exchangeRate } = useCurrency();

  return (
    <footer className="border-t border-[#3D2216] bg-[#120804] py-14 text-[#A89280] text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF6B35] text-[#160B06] shadow-sm">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="#160B06" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 18l8-12 8 12" />
                  <path d="M7 14h10" />
                </svg>
              </div>
              <span className="font-serif text-xl font-normal tracking-tight text-[#FFF6EE]">
                Model<span className="text-[#FF6B35]">Tier</span>.vn
              </span>
            </div>
            <p className="text-xs text-[#B8A08F] leading-relaxed max-w-md font-light">
              {language === 'vi'
                ? 'Nền tảng đo lường và xếp hạng AI độc lập, giúp doanh nghiệp và cộng đồng công nghệ tiếp cận, đánh giá và lựa chọn giải pháp AI tối ưu, minh bạch và thực chứng nhất.'
                : 'An independent AI intelligence platform designed to make frontier model benchmarking transparent, empirical, and actionable for modern enterprises.'}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#FFF6EE] mb-3">
              {language === 'vi' ? 'Khám Phá' : 'Navigation'}
            </h4>
            <ul className="space-y-2 font-light">
              <li>
                <a href="#leaderboard" className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Bảng Xếp Hạng 650+ Models' : 'Full Models Leaderboard'}
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Tiêu Điểm Tinh Hoa' : 'Highlights'}
                </a>
              </li>
              <li>
                <a href="#scatterplot" className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Đồ Thị Pareto' : 'Pareto Chart'}
                </a>
              </li>
              <li>
                <a href="#tierlist" className="hover:text-[#FF8452] transition-colors">
                  {t.nav.tierList}
                </a>
              </li>
              <li>
                <a href="#finder" className="hover:text-[#FF8452] transition-colors">
                  {t.nav.finder}
                </a>
              </li>
            </ul>
          </div>

          {/* Reference & Exchange Rate */}
          <div>
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#FFF6EE] mb-3">
              {language === 'vi' ? 'Hạ Tầng Dữ Liệu' : 'Telemetry'}
            </h4>
            <ul className="space-y-2 font-light">
              <li>
                <a href="#live" className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Radar Đo Độ Trễ Provider' : 'Provider Telemetry'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Máy Tính Chi Phí API' : 'Cost Forecaster'}
                </a>
              </li>
              <li>
                <a href="#glossary" className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Cẩm Nang Thuật Ngữ' : 'Plain Guide'}
                </a>
              </li>
              <li className="text-[11px] text-[#8A7262] pt-2 font-mono">
                Tỷ giá quy đổi: 1 USD = {exchangeRate.toLocaleString('vi-VN')} VNĐ
              </li>
            </ul>
          </div>
        </div>

        {/* Artificial Analysis Attribution Box with Technical Crosshair */}
        <div className="mt-8 pt-6 border-t border-[#381E12] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7262]">
          <div className="flex items-center gap-2">
            <span>
              {language === 'vi' 
                ? 'Tham chiếu phương pháp và dữ liệu đo đạc độc lập từ' 
                : 'Benchmarking methodology and standardized data referenced from'}
            </span>
            <a
              href="https://artificialanalysis.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF8452] hover:text-[#FFF6EE] font-semibold underline underline-offset-2 flex items-center gap-1 transition-colors"
            >
              <span>Artificial Analysis</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#8A7262]">
            <span>© 2026 ModelTier.vn</span>
            <span>•</span>
            <span>{language === 'vi' ? 'Hạ Tầng Đo Lường AI Độc Lập' : 'Independent AI Intelligence Infrastructure'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
