'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useViewMode } from '../context/ViewModeContext';
import { Menu, X, RefreshCw } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalModels: number;
  lastSyncedAt?: string;
  onTriggerSync: () => void;
  isSyncing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  totalModels,
  lastSyncedAt,
  onTriggerSync,
  isSyncing,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { viewMode, setViewMode } = useViewMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const simplifiedNavLinks = [
    { href: '#tierlist', label: language === 'vi' ? 'Bảng Xếp Hạng' : 'Tier Rankings' },
    { href: '#finder', label: language === 'vi' ? 'Khám Phá AI' : 'AI Finder' },
    { href: '#calculator', label: language === 'vi' ? 'Chi Phí VNĐ' : 'Pricing' },
    { href: '#battle', label: language === 'vi' ? 'So Sánh 1v1' : '1v1 Compare' },
    { href: '#leaderboard', label: language === 'vi' ? `Tất Cả ${totalModels} Model` : `All Models (${totalModels})` },
    { href: '#glossary', label: language === 'vi' ? 'Cẩm Nang' : 'Glossary' },
  ];

  const cloneNavLinks = [
    { href: '#intelligence', label: language === 'vi' ? 'Chỉ Số Trí Tuệ' : 'Intelligence' },
    { href: '#coding-agents', label: language === 'vi' ? 'Coding Agents' : 'Coding Agents' },
    { href: '#price-and-cost', label: language === 'vi' ? 'Chi Phí & Giá' : 'Cost Index' },
    { href: '#speed', label: language === 'vi' ? 'Tốc Độ & Độ Trễ' : 'Speed & Latency' },
    { href: '#providers', label: language === 'vi' ? 'Nhà Cung Cấp' : 'Providers' },
    { href: '#leaderboard', label: language === 'vi' ? `${totalModels}+ Mô Hình` : `${totalModels}+ Models` },
  ];

  const currentNavLinks = viewMode === 'simplified' ? simplifiedNavLinks : cloneNavLinks;

  const formatLastSync = (isoString?: string) => {
    if (!isoString) return 'Vừa xong';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return 'Vừa xong';
    }
  };

  const [activeNavSection, setActiveNavSection] = useState<string>('');

  useEffect(() => {
    const handleScrollNav = () => {
      // Bottom of page check
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        if (currentNavLinks.length > 0) {
          setActiveNavSection(currentNavLinks[currentNavLinks.length - 1].href);
          return;
        }
      }

      const activationOffset = 180;
      let match = '';
      let maxTop = -Infinity;
      for (let i = 0; i < currentNavLinks.length; i++) {
        const link = currentNavLinks[i];
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= activationOffset && rect.top > maxTop) {
            maxTop = rect.top;
            match = link.href;
          }
        }
      }
      setActiveNavSection(match);
    };

    handleScrollNav();
    window.addEventListener('scroll', handleScrollNav, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollNav);
  }, [currentNavLinks]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveNavSection(href);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Pinned Following Navbar with Dynamic Elevation & Scroll Animation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-[#100603]/95 backdrop-blur-xl border-b border-[#FF6B35]/25 shadow-[0_12px_36px_rgba(0,0,0,0.85)]'
            : 'bg-[#160B06]/90 backdrop-blur-md border-b border-[#2C160C]/80 shadow-none'
        }`}
      >
        {/* Animated Glow Hairline at bottom edge when scrolled */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35]/50 to-transparent transition-opacity duration-500 ease-in-out"
          style={{ opacity: isScrolled ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* Slim Telemetry Strip */}
        <div
          className={`px-3 sm:px-4 text-[#A89280] w-full max-w-full overflow-hidden transition-all duration-300 ease-in-out ${
            isScrolled
              ? 'bg-[#090302]/95 border-b border-[#1E0C06] py-0.5 text-[9.5px] sm:text-[10.5px]'
              : 'bg-[#0E0603] border-b border-[#221008] py-1 text-[10px] sm:text-[11px]'
          }`}
        >
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B35] animate-pulse" />
              <span className="text-[#D8C4B6] font-medium shrink-0">
                {language === 'vi' ? 'Dữ liệu:' : 'Telemetry:'}
              </span>
              <span className="text-[#FFF6EE] font-semibold shrink-0">
                {totalModels} {language === 'vi' ? 'mô hình' : 'models'}
              </span>
              <span className="text-[#4A2617] hidden sm:inline">•</span>
              <span className="text-[#8A7262] hidden md:inline truncate" suppressHydrationWarning>
                {language === 'vi' ? 'Cập nhật:' : 'Updated:'} {mounted ? formatLastSync(lastSyncedAt) : 'Vừa xong'} (tự động mỗi 15 phút)
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Currency Minimalist Toggle */}
              <button
                onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
                className="hover:text-[#FFF6EE] transition-colors py-0.5"
                title="Chuyển đổi VNĐ / USD"
              >
                <span className={currency === 'VND' ? 'text-[#FF8452] font-semibold' : 'text-[#7D6657]'}>VNĐ</span>
                <span className="text-[#3D1E11] mx-1">/</span>
                <span className={currency === 'USD' ? 'text-[#FFF6EE] font-semibold' : 'text-[#7D6657]'}>USD</span>
              </button>

              <span className="text-[#3D1E11]">|</span>

              {/* Language Minimalist Toggle */}
              <button
                onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
                className="hover:text-[#FFF6EE] transition-colors py-0.5"
                title="Ngôn ngữ / Language"
              >
                <span className={language === 'vi' ? 'text-[#FF8452] font-semibold' : 'text-[#7D6657]'}>VI</span>
                <span className="text-[#3D1E11] mx-1">/</span>
                <span className={language === 'en' ? 'text-[#FFF6EE] font-semibold' : 'text-[#7D6657]'}>EN</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Luxury Ledger Header */}
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 w-full max-w-full transition-all duration-300 ease-in-out ${
            isScrolled ? 'h-13 sm:h-14 lg:h-15' : 'h-16 lg:h-18'
          }`}
        >
          {/* Left: Brand Identity matching Ledger's clean editorial serif & crisp square mark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none shrink-0 mr-1.5 sm:mr-4 lg:mr-8"
          >
            <div
              className={`flex items-center justify-center rounded-sm bg-[#FF6B35] text-[#160B06] shadow-sm transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'h-6 w-6 sm:h-6.5 sm:w-6.5' : 'h-6 w-6 sm:h-7 sm:w-7'
              }`}
            >
              <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="#160B06" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 18l8-12 8 12" />
                <path d="M7 14h10" />
              </svg>
            </div>
            <span
              className={`font-serif font-normal tracking-tight text-[#FFF6EE] transition-all duration-300 ${
                isScrolled ? 'text-base sm:text-xl' : 'text-lg sm:text-2xl'
              }`}
            >
              Model<span className="text-[#FF6B35]">Tier</span>
            </span>
          </a>

          {/* Center: Clean Text Navigation - shown on XL screens to prevent mobile/iPad crowding */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 mx-auto">
            {currentNavLinks.map((link) => {
              const isActive = activeNavSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative text-sm transition-all whitespace-nowrap tracking-normal shrink-0 py-1 ${
                    isActive
                      ? 'font-bold text-[#FF8452]'
                      : 'font-normal text-[#C7B299] hover:text-[#FFF6EE]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF6B35] to-[#E64A19] shadow-glow-orange rounded-full animate-in fade-in duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Mode Switcher & Ledger Signature Outlined Button */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0 ml-auto xl:ml-0">
            {/* Dual Mode Switcher Segmented Control */}
            <div className="flex items-center rounded-sm bg-[#1A0C06] border border-[#3D1E11] p-0.5 text-xs font-mono shadow-inner shrink-0">
              <button
                onClick={() => setViewMode('simplified')}
                className={`px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-sm text-[10px] sm:text-xs font-medium whitespace-nowrap shrink-0 leading-none transition-all duration-200 ${
                  viewMode === 'simplified'
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white font-semibold shadow-glow-orange'
                    : 'text-[#A89280] hover:text-[#FFF6EE]'
                }`}
              >
                {language === 'vi' ? '⚡ Dễ hiểu' : '⚡ Simple'}
              </button>
              <button
                onClick={() => setViewMode('clone')}
                className={`px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-sm text-[10px] sm:text-xs font-medium whitespace-nowrap shrink-0 leading-none transition-all duration-200 ${
                  viewMode === 'clone'
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white font-semibold shadow-glow-orange'
                    : 'text-[#A89280] hover:text-[#FFF6EE]'
                }`}
              >
                🔬<span className="hidden sm:inline"> Benchmark</span> Pro
              </button>
            </div>

            {/* Ledger Signature Outlined Rectangular Button for Live Telemetry Sync */}
            <button
              onClick={onTriggerSync}
              disabled={isSyncing}
              className="hidden md:inline-flex items-center gap-2 rounded-sm border border-[#FF6B35]/75 hover:border-[#FF6B35] bg-transparent hover:bg-[#FF6B35] text-[#FF8452] hover:text-white px-3 sm:px-3.5 py-1.5 text-xs font-mono font-medium uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 group shrink-0 whitespace-nowrap"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-[#FF6B35] group-hover:bg-white transition-colors'}`} />
              <span className="whitespace-nowrap">
                {isSyncing
                  ? (language === 'vi' ? 'Đang đồng bộ...' : 'Syncing...')
                  : (language === 'vi' ? 'Đồng bộ Dữ liệu' : 'Sync Live')}
              </span>
            </button>

            {/* Mobile & iPad Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#3D1E11] bg-[#201009] text-[#C7B299] hover:text-white xl:hidden transition-colors shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile & iPad Drawer Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-[#2C160C] bg-[#120704]/98 backdrop-blur-2xl px-4 sm:px-6 py-4 xl:hidden animate-in slide-in-from-top-2 duration-200 shadow-2xl space-y-4 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            {/* Mobile Mode Switcher */}
            <div className="flex items-center justify-between p-2 rounded-sm bg-[#1E0F08] border border-[#3D1E11] text-xs font-mono">
              <span className="text-[#A89280] font-medium">{language === 'vi' ? 'Chế độ giao diện:' : 'Display Mode:'}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { setViewMode('simplified'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                    viewMode === 'simplified'
                      ? 'bg-[#FF6B35] text-white font-semibold shadow-glow-orange'
                      : 'text-[#A89280] hover:text-white'
                  }`}
                >
                  ⚡ {language === 'vi' ? 'Dễ hiểu' : 'Simple'}
                </button>
                <button
                  onClick={() => { setViewMode('clone'); setMobileMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${
                    viewMode === 'clone'
                      ? 'bg-[#FF6B35] text-white font-semibold shadow-glow-orange'
                      : 'text-[#A89280] hover:text-white'
                  }`}
                >
                  🔬 Benchmark Pro
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
              {currentNavLinks.map((link) => {
                const isActive = activeNavSection === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`rounded-sm border px-3 py-2 transition-all ${
                      isActive
                        ? 'border-[#FF6B35] bg-[#2E140A] text-[#FF8452] font-bold shadow-sm'
                        : 'border-[#2D160B] bg-[#1B0D07] text-[#C7B299] hover:bg-[#25120A] hover:border-[#FF6B35]/40 hover:text-[#FFF6EE]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* Mobile Live Sync CTA Button */}
            <button
              onClick={() => { onTriggerSync(); setMobileMenuOpen(false); }}
              disabled={isSyncing}
              className="w-full flex items-center justify-center gap-2 rounded-sm border border-[#FF6B35]/75 bg-[#FF6B35]/15 hover:bg-[#FF6B35]/25 text-[#FF8452] py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all disabled:opacity-50"
            >
              <span className={`h-2 w-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-[#FF6B35]'}`} />
              <span>{isSyncing ? (language === 'vi' ? 'Đang đồng bộ...' : 'Syncing...') : (language === 'vi' ? 'Đồng bộ Dữ liệu Ngay' : 'Sync Live Data')}</span>
            </button>
          </div>
        )}
      </header>

      {/* Layout Spacer to preserve document flow underneath the fixed navbar */}
      <div
        className="w-full shrink-0 h-[88px] sm:h-[92px] lg:h-[100px] pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
};
