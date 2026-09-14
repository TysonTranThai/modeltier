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

  useEffect(() => {
    setMounted(true);
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
    { href: '#intelligence', label: 'Intelligence' },
    { href: '#coding-agents', label: 'Coding Agents' },
    { href: '#price-and-cost', label: 'Cost Index' },
    { href: '#speed', label: 'Speed & Latency' },
    { href: '#leaderboard', label: `${totalModels}+ Models` },
    { href: '#providers', label: 'Providers' },
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2C160C] bg-[#160B06]/95 backdrop-blur-md transition-all">
      {/* Slim Telemetry Strip */}
      <div className="bg-[#0E0603] border-b border-[#221008] px-4 py-1 text-[11px] text-[#A89280]">
        <div className="mx-auto max-w-7xl flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span className="text-[#D8C4B6] font-medium">
              {language === 'vi' ? 'Dữ liệu trực tiếp:' : 'Live Telemetry:'}
            </span>
            <span className="text-[#FFF6EE] font-semibold">
              {totalModels} {language === 'vi' ? 'mô hình được theo dõi' : 'models tracked'}
            </span>
            <span className="text-[#4A2617] hidden sm:inline">•</span>
            <span className="text-[#8A7262] hidden sm:inline" suppressHydrationWarning>
              {language === 'vi' ? 'Cập nhật:' : 'Updated:'} {mounted ? formatLastSync(lastSyncedAt) : 'Vừa xong'} (tự động mỗi 15 phút)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
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
      <div className="mx-auto flex h-16 lg:h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity matching Ledger's clean editorial serif & circular mark */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF6B35] text-[#160B06] shadow-sm transition-transform group-hover:scale-105">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="#160B06" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18l8-12 8 12" />
              <path d="M7 14h10" />
            </svg>
          </div>
          <span className="font-serif text-2xl font-normal tracking-tight text-[#FFF6EE]">
            Model<span className="text-[#FF6B35]">Tier</span>
          </span>
        </a>

        {/* Center: Clean Text Navigation - NO icons, NO multi-line wrap */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {currentNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-normal text-[#C7B299] hover:text-[#FFF6EE] transition-colors whitespace-nowrap tracking-normal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Mode Switcher & Ledger Signature Outlined Pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Dual Mode Switcher Pill */}
          <div className="flex items-center rounded-full bg-[#201009] border border-[#3D1E11] p-0.5 text-xs font-medium">
            <button
              onClick={() => setViewMode('simplified')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                viewMode === 'simplified'
                  ? 'bg-[#FF6B35] text-white font-semibold shadow-sm'
                  : 'text-[#A89280] hover:text-[#FFF6EE]'
              }`}
            >
              {language === 'vi' ? 'Dễ hiểu' : 'Simple'}
            </button>
            <button
              onClick={() => setViewMode('clone')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                viewMode === 'clone'
                  ? 'bg-[#FF6B35] text-white font-semibold shadow-sm'
                  : 'text-[#A89280] hover:text-[#FFF6EE]'
              }`}
            >
              Benchmark Pro
            </button>
          </div>

          {/* Ledger Signature Outlined Pill Button for Live Telemetry Sync */}
          <button
            onClick={onTriggerSync}
            disabled={isSyncing}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#FF6B35]/75 hover:border-[#FF6B35] bg-transparent hover:bg-[#FF6B35] text-[#FF8452] hover:text-white px-4 lg:px-5 py-1.5 text-xs font-medium tracking-wide transition-all shadow-sm disabled:opacity-50 group"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-[#FF6B35] group-hover:bg-white transition-colors'}`} />
            <span className="whitespace-nowrap">
              {isSyncing
                ? (language === 'vi' ? 'Đang đồng bộ...' : 'Syncing...')
                : (language === 'vi' ? 'Đồng bộ Dữ liệu' : 'Sync Live')}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3D1E11] bg-[#201009] text-[#C7B299] hover:text-white lg:hidden transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#2C160C] bg-[#140A06] px-5 py-4 lg:hidden animate-in slide-in-from-top-2 space-y-3">
          {/* Mobile Mode Switcher */}
          <div className="flex items-center justify-between p-1.5 rounded-full bg-[#1E0F08] border border-[#3D1E11] text-xs">
            <span className="text-[#A89280] pl-2 font-medium">{language === 'vi' ? 'Chế độ:' : 'Mode:'}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => { setViewMode('simplified'); setMobileMenuOpen(false); }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  viewMode === 'simplified'
                    ? 'bg-[#FF6B35] text-white font-semibold'
                    : 'text-[#A89280]'
                }`}
              >
                {language === 'vi' ? 'Dễ hiểu' : 'Simple'}
              </button>
              <button
                onClick={() => { setViewMode('clone'); setMobileMenuOpen(false); }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  viewMode === 'clone'
                    ? 'bg-[#FF6B35] text-white font-semibold'
                    : 'text-[#A89280]'
                }`}
              >
                Benchmark Pro
              </button>
            </div>
          </div>

          {/* Clean Nav Links without Icons */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {currentNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="rounded-lg px-3 py-2 text-xs font-medium text-[#C7B299] hover:bg-[#201009] hover:text-[#FFF6EE] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Live Sync CTA Button */}
          <button
            onClick={() => { onTriggerSync(); setMobileMenuOpen(false); }}
            disabled={isSyncing}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-[#FF6B35]/75 bg-[#FF6B35]/10 text-[#FF8452] py-2 text-xs font-medium transition-colors disabled:opacity-50"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-[#FF6B35]'}`} />
            <span>{isSyncing ? (language === 'vi' ? 'Đang đồng bộ...' : 'Syncing...') : (language === 'vi' ? 'Đồng bộ Dữ liệu Ngay' : 'Sync Live Data')}</span>
          </button>
        </div>
      )}
    </header>
  );
};
