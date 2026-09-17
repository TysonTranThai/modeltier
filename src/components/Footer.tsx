'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { BarChart3, Heart, Github, Star, UserPlus, ExternalLink } from 'lucide-react';

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
    <footer className="border-t border-[#381E12] bg-[#110804] text-[#D8C4B6] transition-all w-full max-w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info & Author Support Card */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-sm bg-[#FF6B35] text-[#160B06] shadow-sm">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="#160B06" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 18l8-12 8 12" />
                  <path d="M7 14h10" />
                </svg>
              </div>
              <span className="text-xl font-serif font-normal tracking-tight text-[#FFF6EE]">
                Model<span className="text-[#FF6B35]">Tier</span>
              </span>
            </div>
            <p className="text-xs text-[#A89280] leading-relaxed max-w-sm font-light">
              {language === 'vi' 
                ? 'Hạ tầng kiểm chuẩn và đo lường độc lập các mô hình trí tuệ nhân tạo. Đem lại bức tranh minh bạch về chi phí thực tế và năng lực giải quyết vấn đề bằng tiếng Việt.'
                : 'Independent benchmarking and telemetry infrastructure for frontier AI models. Transparent pricing and empirical performance intelligence.'}
            </p>

            {/* Author & Project Support Box */}
            <div className="p-3.5 rounded-sm border border-[#3D2216] bg-[#1A0D07]/90 max-w-sm space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-[#FF6B35] fill-[#FF6B35]/40" />
                  <span className="text-xs font-serif font-bold text-[#FFF6EE]">
                    {language === 'vi' ? 'Ủng Hộ Tác Giả & Dự Án' : 'Support Author & Project'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#FF8452] bg-[#FF6B35]/15 px-1.5 py-0.5 rounded-sm border border-[#FF6B35]/30">
                  Open Source
                </span>
              </div>
              <p className="text-[11px] text-[#A89280] font-light leading-relaxed">
                {language === 'vi'
                  ? 'Được kiến tạo & duy trì độc lập bởi Tyson Tran (@TysonTranThai). Hãy theo dõi tác giả và tặng sao GitHub để ủng hộ dự án.'
                  : 'Created & maintained independently by Tyson Tran (@TysonTranThai). Follow the author and star the repository on GitHub.'}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                <a
                  href="https://github.com/TysonTranThai/modeltier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-[#472718] bg-[#24130C] hover:bg-[#331C10] hover:border-[#FF6B35]/70 px-2.5 py-1.5 text-[11px] text-[#D8C4B6] hover:text-[#FFF6EE] transition-all group"
                  title="Star modeltier on GitHub"
                >
                  <Github className="h-3.5 w-3.5 text-[#FF8452] group-hover:text-white transition-colors" />
                  <span>Repo GitHub</span>
                  <Star className="h-2.5 w-2.5 text-[#FF8452] fill-[#FF8452]/40" />
                </a>
                <a
                  href="https://github.com/TysonTranThai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-[#FF6B35]/50 bg-[#FF6B35]/15 hover:bg-[#FF6B35]/25 px-2.5 py-1.5 text-[11px] font-bold text-[#FF8452] hover:text-white transition-all group"
                  title="Follow Tyson Tran (@TysonTranThai) on GitHub"
                >
                  <UserPlus className="h-3.5 w-3.5 text-[#FF6B35]" />
                  <span>Follow @TysonTranThai</span>
                </a>
              </div>
            </div>
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

          {/* Reference & Telemetry */}
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

          {/* Community & Open Source */}
          <div>
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#FFF6EE] mb-3">
              {language === 'vi' ? 'Cộng Đồng & Mã Nguồn' : 'Community & Code'}
            </h4>
            <ul className="space-y-2 font-light text-xs">
              <li>
                <a
                  href="https://github.com/TysonTranThai/modeltier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#FF8452] transition-colors text-[#FFF6EE]"
                >
                  <Github className="h-3 w-3 text-[#FF8452]" />
                  <span>{language === 'vi' ? 'Mã Nguồn GitHub Repo' : 'GitHub Repository'}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TysonTranThai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#FF8452] transition-colors text-[#FFF6EE]"
                >
                  <Heart className="h-3 w-3 text-[#FF6B35]" />
                  <span>{language === 'vi' ? 'Follow Tác Giả @TysonTranThai' : 'Follow @TysonTranThai'}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TysonTranThai/modeltier/stargazers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#FF8452] transition-colors"
                >
                  <Star className="h-3 w-3 text-[#FF8452]" />
                  <span>{language === 'vi' ? 'Tặng Sao Dự Án (Star)' : 'Star on GitHub'}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TysonTranThai/modeltier/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF8452] transition-colors text-[#8A7262]"
                >
                  {language === 'vi' ? 'Báo Cáo Lỗi & Góp Ý' : 'Report Issue / Bug'}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TysonTranThai/modeltier/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF8452] transition-colors text-[#8A7262]"
                >
                  {language === 'vi' ? 'Tài Liệu Hướng Dẫn' : 'Documentation (README)'}
                </a>
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

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#8A7262]">
            <span>© 2026 modeltier.notlimitedteam.cloud</span>
            <span>•</span>
            <a
              href="https://github.com/TysonTranThai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF8452] hover:underline"
            >
              Tyson Tran (@TysonTranThai)
            </a>
            <span>•</span>
            <a
              href="https://github.com/TysonTranThai/modeltier"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFF6EE] transition-colors"
            >
              GitHub Open Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
