'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { 
  Sparkles, 
  Search, 
  Menu, 
  X, 
  BarChart3, 
  Compass, 
  Calculator, 
  Swords, 
  Radio, 
  BookOpen,
  DollarSign
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#tierlist', label: t.nav.tierList, icon: BarChart3 },
    { href: '#finder', label: t.nav.finder, icon: Compass },
    { href: '#calculator', label: t.nav.calculator, icon: Calculator },
    { href: '#battle', label: t.nav.battle, icon: Swords },
    { href: '#live', label: t.nav.live, icon: Radio },
    { href: '#glossary', label: t.nav.glossary, icon: BookOpen },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-indigo-500/20 ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">Model<span className="text-violet-400">Tier</span></span>
              <span className="rounded-full bg-violet-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-violet-300 border border-violet-500/30">VN</span>
            </div>
            <span className="text-[10px] text-slate-400 -mt-1 hidden sm:inline">AI Simplified</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800/80 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5 text-violet-400" />
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Controls: Currency & Language Switchers */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === 'VND' ? 'USD' : 'VND')}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/50 hover:bg-slate-800 focus:outline-none"
            title="Chuyển đổi tiền tệ / Toggle Currency"
          >
            <DollarSign className="h-3.5 w-3.5 text-amber-400" />
            <span className={currency === 'VND' ? 'font-bold text-amber-300' : 'text-slate-400'}>VNĐ</span>
            <span className="text-slate-600">/</span>
            <span className={currency === 'USD' ? 'font-bold text-emerald-300' : 'text-slate-400'}>USD</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-violet-500/50 hover:bg-slate-800 focus:outline-none"
            title="Đổi ngôn ngữ / Switch Language"
          >
            <span className="text-sm leading-none">{language === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
            <span className="font-semibold text-slate-200">{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 lg:hidden animate-in slide-in-from-top-2">
          <div className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.hero.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-violet-400" />
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
