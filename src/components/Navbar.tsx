'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useViewMode } from '../context/ViewModeContext';
import { 
  Search, 
  Menu, 
  X, 
  BarChart3, 
  Compass, 
  Calculator, 
  Swords, 
  Radio, 
  BookOpen,
  DollarSign,
  RefreshCw,
  TrendingUp,
  TableProperties,
  Layers,
  FileText,
  Terminal
} from 'lucide-react';

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
    { href: '#tierlist', label: t.nav.tierList, icon: Layers },
    { href: '#finder', label: t.nav.finder, icon: Compass },
    { href: '#calculator', label: t.nav.calculator, icon: Calculator },
    { href: '#battle', label: t.nav.battle, icon: Swords },
    { href: '#leaderboard', label: language === 'vi' ? `Bảng ${totalModels} Model` : `All Models (${totalModels})`, icon: TableProperties },
    { href: '#glossary', label: t.nav.glossary, icon: BookOpen },
  ];

  const cloneNavLinks = [
    { href: '#intelligence', label: 'Intelligence', icon: BarChart3 },
    { href: '#coding-agents', label: 'Coding Agents', icon: Terminal },
    { href: '#price-and-cost', label: 'Cost Index', icon: DollarSign },
    { href: '#speed', label: 'Speed & Latency', icon: TrendingUp },
    { href: '#leaderboard', label: `650+ Models`, icon: TableProperties },
    { href: '#providers', label: 'Providers', icon: Radio },
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
    <header className="sticky top-0 z-50 w-full border-b border-[#3D2216] bg-[#1A0E08]/95 backdrop-blur-md transition-all">
      {/* Top Sync Telemetry Bar with Ledger Technical Border */}
      <div className="bg-[#120804] border-b border-[#2C180E] px-4 py-1.5 text-xs text-[#C7B299]">
        <div className="mx-auto max-w-7xl flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#FF6B35] animate-pulse" />
            <span className="font-semibold text-[#FF6B35]">
              {language === 'vi' ? 'Dữ liệu trực tiếp:' : 'Live Telemetry:'}
            </span>
            <span className="font-bold text-[#FFF6EE]">
              {totalModels} {language === 'vi' ? 'mô hình được theo dõi' : 'models tracked'}
            </span>
            <span className="text-[#5A3522] hidden sm:inline">•</span>
            <span className="text-[#A89280] text-[11px] hidden sm:inline" suppressHydrationWarning>
              {language === 'vi' ? 'Cập nhật:' : 'Updated:'} {mounted ? formatLastSync(lastSyncedAt) : 'Vừa xong'} (tự động mỗi 15 phút)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2A160E] hover:bg-[#3D2014] px-3 py-0.5 text-[11px] font-semibold text-[#FF8452] border border-[#522B19] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? (language === 'vi' ? 'Đang kéo dữ liệu...' : 'Syncing...') : (language === 'vi' ? 'Làm mới ngay' : 'Sync Now')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Ledger Header */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo with Orange Flare */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B35] via-[#E64A19] to-[#BF360C] shadow-glow-orange ring-1 ring-[#FF8452]/40 transition-transform group-hover:scale-105">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xl tracking-tight text-[#FFF6EE]">
                Model<span className="text-[#FF6B35] italic">Tier</span>
              </span>
              <span className="rounded-full bg-[#FF6B35]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#FF8452] border border-[#FF6B35]/30">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-[#A89280] -mt-1 tracking-wider hidden sm:inline uppercase">
              {viewMode === 'simplified'
                ? (language === 'vi' ? 'Bảng xếp hạng AI Tinh hoa' : 'AI Intelligence Suite')
                : (language === 'vi' ? 'Hạ tầng đo đạc độc lập' : 'Independent Benchmark Infrastructure')}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          {currentNavLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#D8C4B6] transition-colors hover:bg-[#2C180E] hover:text-[#FFF6EE]"
              >
                <Icon className="h-3.5 w-3.5 text-[#FF6B35]" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Controls: Mode Switcher, Currency, Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dual Mode Switcher Pill */}
          <div className="flex items-center rounded-full bg-[#24130B] border border-[#472718] p-1 text-xs font-semibold shadow-inner">
            <button
              onClick={() => setViewMode('simplified')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                viewMode === 'simplified'
                  ? 'bg-[#FF6B35] text-white shadow-glow-orange font-bold'
                  : 'text-[#B8A08F] hover:text-[#FFF6EE]'
              }`}
              title="Chế độ Dễ hiểu"
            >
              <Layers className="h-3 w-3" />
              <span className="hidden sm:inline">{language === 'vi' ? 'Dễ hiểu' : 'Simple'}</span>
            </button>
            <button
              onClick={() => setViewMode('clone')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                viewMode === 'clone'
                  ? 'bg-[#FF6B35] text-white shadow-glow-orange font-bold'
                  : 'text-[#B8A08F] hover:text-[#FFF6EE]'
              }`}
              title="Chế độ Benchmark Pro"
            >
              <BarChart3 className="h-3 w-3" />
              <span className="hidden sm:inline">{language === 'vi' ? 'Benchmark Pro' : 'Pro Suite'}</span>
            </button>
          </div>

          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
            className="flex items-center gap-1 rounded-full border border-[#472718] bg-[#24130B] px-3 py-1 text-xs font-medium text-[#D8C4B6] hover:border-[#FF6B35]/50 transition-colors"
            title="Chuyển đổi tiền tệ VNĐ / USD"
          >
            <DollarSign className="h-3.5 w-3.5 text-[#FF6B35]" />
            <span className={currency === 'VND' ? 'font-bold text-[#FF8452]' : 'text-[#8A7262]'}>VNĐ</span>
            <span className="text-[#5A3522]">/</span>
            <span className={currency === 'USD' ? 'font-bold text-[#FFF6EE]' : 'text-[#8A7262]'}>USD</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1.5 rounded-full border border-[#472718] bg-[#24130B] px-3 py-1 text-xs font-semibold text-[#D8C4B6] hover:border-[#FF6B35]/50 transition-colors"
            title="Đổi ngôn ngữ"
          >
            <span className="text-xs leading-none">{language === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
            <span className="hidden sm:inline">{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#472718] bg-[#24130B] text-[#D8C4B6] hover:text-white xl:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#3D2216] bg-[#1A0E08] px-4 py-4 xl:hidden animate-in slide-in-from-top-2">
          {/* Mobile Mode Switcher */}
          <div className="mb-3 flex items-center justify-between p-2 rounded-xl bg-[#24130B] border border-[#472718] text-xs font-semibold">
            <span className="text-[#A89280]">{language === 'vi' ? 'Chế độ xem:' : 'View Mode:'}</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => { setViewMode('simplified'); setMobileMenuOpen(false); }}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  viewMode === 'simplified'
                    ? 'bg-[#FF6B35] text-white font-bold'
                    : 'text-[#B8A08F]'
                }`}
              >
                ⚡ {language === 'vi' ? 'Dễ hiểu' : 'Simple'}
              </button>
              <button
                onClick={() => { setViewMode('clone'); setMobileMenuOpen(false); }}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  viewMode === 'clone'
                    ? 'bg-[#FF6B35] text-white font-bold'
                    : 'text-[#B8A08F]'
                }`}
              >
                🔬 Benchmark Pro
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {currentNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#D8C4B6] hover:bg-[#2A160E] hover:text-[#FFF6EE]"
                >
                  <Icon className="h-4 w-4 text-[#FF6B35]" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
