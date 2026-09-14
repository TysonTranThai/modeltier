'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { ViewMode } from '../types';
import { 
  Search, 
  Share2, 
  Menu, 
  X, 
  RefreshCw, 
  Layers, 
  Compass, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  DollarSign
} from 'lucide-react';

interface ArtificialNavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
  totalModels: number;
  lastSyncedAt?: string;
  onTriggerSync: () => void;
  isSyncing: boolean;
}

export const ArtificialNavbar: React.FC<ArtificialNavbarProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  totalModels,
  lastSyncedAt,
  onTriggerSync,
  isSyncing,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: language === 'vi' ? 'Mô hình (Models)' : 'Models', href: '#leaderboard' },
    { label: language === 'vi' ? 'Coding Agents' : 'Coding Agents', href: '#leaderboard' },
    { label: language === 'vi' ? 'Âm thanh & Hình ảnh' : 'Speech, Image, Video', href: '#leaderboard' },
    { label: language === 'vi' ? 'Hạ tầng (Inference)' : 'Inference', href: '#live' },
    { label: language === 'vi' ? 'Bảng Xếp Hạng' : 'Leaderboards', href: '#leaderboard' },
    { label: language === 'vi' ? 'AI Trends' : 'AI Trends', href: '#highlights' },
    { label: language === 'vi' ? 'Đấu Trường (Arenas)' : 'Arenas', href: '#battle' },
  ];

  const formatLastSync = (isoString?: string) => {
    if (!isoString) return 'Vừa xong';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Vừa xong';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/90 backdrop-blur-md transition-colors">
      {/* Top Banner: Real-Time Sync Status */}
      <div className="bg-gradient-to-r from-neutral-900 via-purple-950/40 to-neutral-900 border-b border-neutral-800 px-4 py-1.5 text-xs">
        <div className="mx-auto max-w-7xl flex items-center justify-between flex-wrap gap-2 text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-emerald-400">
              {language === 'vi' ? 'Đồng bộ trực tiếp từ' : 'Live Syncing from'} artificialanalysis.ai:
            </span>
            <span className="font-bold text-white">
              {totalModels} {language === 'vi' ? 'mô hình thực tế' : 'live models'}
            </span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="text-neutral-400 text-[11px] hidden sm:inline">
              {language === 'vi' ? 'Cập nhật lúc:' : 'Last updated:'} {formatLastSync(lastSyncedAt)} (chu kỳ 15 phút)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 rounded-full bg-purple-900/60 hover:bg-purple-800 px-2.5 py-0.5 text-[11px] font-semibold text-purple-200 border border-purple-700/50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? (language === 'vi' ? 'Đang kéo dữ liệu...' : 'Syncing...') : (language === 'vi' ? 'Kéo dữ liệu mới ngay' : 'Sync Now')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Artificial Analysis Logo */}
        <a href="/" className="flex items-center gap-2.5 select-none group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black p-1.5 transition-transform group-hover:scale-105">
            {/* Exact Artificial Analysis Geometric Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="20" height="20" style={{ width: '20px', height: '20px', maxWidth: '20px', maxHeight: '20px' }} className="h-5 w-5 text-black">
              <path fill="currentColor" d="M13.982 16h1.996v-3.997h-3.992V16zM7.984 0 3.992 3.997H0v3.998h5.988L9.98 3.997h2.006V0zM7.984 7.995l-3.992 4.008H0V16h5.988l3.992-3.997h2.006V7.995zM15.978 7.995V3.997h-3.992v3.998h3.992" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg tracking-tight font-medium text-white">
              Artificial Analysis
            </span>
            <span className="rounded-full bg-purple-500/20 px-1.5 py-0.2 text-[9px] font-bold text-purple-300 border border-purple-500/30">
              VN Clone
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden xl:flex items-center gap-1 rounded-full bg-neutral-900/90 border border-neutral-800 p-1">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="hidden sm:flex items-center rounded-xl bg-neutral-900 border border-neutral-800 p-1 text-xs">
            <button
              onClick={() => setViewMode('clone')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'clone'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Giao diện nguyên bản Artificial Analysis"
            >
              📊 Chuẩn AA
            </button>
            <button
              onClick={() => setViewMode('simplified')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'simplified'
                  ? 'bg-purple-900/60 text-purple-200 border border-purple-500/30 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Chế độ dễ hiểu cho người mới (S/A/B/C Tier List)"
            >
              ⭐ Dễ Hiểu
            </button>
            <button
              onClick={() => setViewMode('both')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewMode === 'both'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Hiện cả hai chế độ"
            >
              Tất cả
            </button>
          </div>

          {/* Currency Switcher */}
          <button
            onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
            className="flex items-center gap-1 rounded-xl border border-neutral-800 bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800 transition-colors"
            title="Đổi đơn vị tiền tệ VNĐ / USD"
          >
            <DollarSign className="h-3.5 w-3.5 text-amber-400" />
            <span className={currency === 'VND' ? 'font-bold text-amber-300' : 'text-neutral-500'}>VNĐ</span>
            <span className="text-neutral-600">/</span>
            <span className={currency === 'USD' ? 'font-bold text-emerald-400' : 'text-neutral-500'}>USD</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 px-2.5 py-1.5 text-xs font-semibold text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800 transition-colors"
            title="Chuyển ngôn ngữ / Switch Language"
          >
            <span>{language === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
            <span>{language === 'vi' ? 'VI' : 'EN'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white xl:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-neutral-800 bg-neutral-950 px-4 py-4 xl:hidden animate-in slide-in-from-top-2">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder={language === 'vi' ? 'Tìm 300+ model AI...' : 'Search 300+ AI models...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-2 pl-9 pr-4 text-xs text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg bg-neutral-900 p-2.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile View Mode Switcher */}
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span>{language === 'vi' ? 'Chế độ xem:' : 'View Mode:'}</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => { setViewMode('clone'); setMobileMenuOpen(false); }}
                className={`px-2 py-1 rounded text-xs ${viewMode === 'clone' ? 'bg-white text-black font-bold' : 'bg-neutral-800'}`}
              >
                Chuẩn AA
              </button>
              <button
                onClick={() => { setViewMode('simplified'); setMobileMenuOpen(false); }}
                className={`px-2 py-1 rounded text-xs ${viewMode === 'simplified' ? 'bg-purple-600 text-white font-bold' : 'bg-neutral-800'}`}
              >
                Dễ Hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
