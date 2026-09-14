'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { BarChart3, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const { exchangeRate } = useCurrency();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#381E12] bg-[#110804] text-[#D8C4B6] transition-all">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF6B35] shadow-glow-orange text-white font-serif font-black text-xs">
                M
              </span>
              <span className="text-xl font-serif font-black tracking-tight text-[#FFF6EE]">
                Model<span className="text-[#FF8452]">Tier</span>
              </span>
            </div>
            <p className="text-xs text-[#A89280] leading-relaxed max-w-sm font-light">
              {language === 'vi' 
                ? 'Hạ tầng kiểm chuẩn và đo lường độc lập các mô hình trí tuệ nhân tạo. Đem lại bức tranh minh bạch về chi phí thực tế và năng lực giải quyết vấn đề bằng tiếng Việt.'
                : 'Independent benchmarking and telemetry infrastructure for frontier AI models. Transparent pricing and empirical performance intelligence.'}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#FFF6EE] mb-3">
              {language === 'vi' ? 'Khám Phá' : 'Navigation'}
            </h4>
            <ul className="space-y-2 font-light text-xs">
              <li>
                <a href="#leaderboard" onClick={(e) => scrollToSection(e, '#leaderboard')} className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Bảng Xếp Hạng 650+ Models' : 'Full Models Leaderboard'}
                </a>
              </li>
              <li>
                <a href="#highlights" onClick={(e) => scrollToSection(e, '#highlights')} className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Tiêu Điểm Tinh Hoa' : 'Highlights'}
                </a>
              </li>
              <li>
                <a href="#scatterplot" onClick={(e) => scrollToSection(e, '#scatterplot')} className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Đồ Thị Pareto' : 'Pareto Chart'}
                </a>
              </li>
              <li>
                <a href="#tierlist" onClick={(e) => scrollToSection(e, '#tierlist')} className="hover:text-[#FF8452] transition-colors">
                  {t.nav.tierList}
                </a>
              </li>
              <li>
                <a href="#finder" onClick={(e) => scrollToSection(e, '#finder')} className="hover:text-[#FF8452] transition-colors">
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
            <ul className="space-y-2 font-light text-xs">
              <li>
                <a href="#live" onClick={(e) => scrollToSection(e, '#live')} className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Radar Đo Độ Trễ Provider' : 'Provider Telemetry'}
                </a>
              </li>
              <li>
                <a href="#calculator" onClick={(e) => scrollToSection(e, '#calculator')} className="hover:text-[#FF8452] transition-colors">
                  {language === 'vi' ? 'Máy Tính Chi Phí API' : 'Cost Forecaster'}
                </a>
              </li>
              <li>
                <a href="#glossary" onClick={(e) => scrollToSection(e, '#glossary')} className="hover:text-[#FF8452] transition-colors">
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
            <span className="text-[#FF8452] font-semibold">
              Artificial Analysis
            </span>
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
