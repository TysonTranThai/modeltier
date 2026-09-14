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
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#D84315] text-white shadow-glow-orange">
                <BarChart3 className="h-4 w-4" />
              </div>
              <span className="text-lg font-serif font-bold text-[#FFF6EE] tracking-tight">
                Model<span className="text-[#FF6B35] italic">Tier</span>.vn
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
            <span>Tham chiếu phương pháp và dữ liệu đo đạc độc lập từ</span>
            <a
              href="https://artificialanalysis.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#FF8452] hover:underline inline-flex items-center gap-1"
            >
              <span>Artificial Analysis</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div>
            © 2026 ModelTier.vn • Ledger Luxury Editorial Edition.
          </div>
        </div>
      </div>
    </footer>
  );
};
