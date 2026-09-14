'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.vi;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi');

  useEffect(() => {
    const saved = localStorage.getItem('modeltier_lang') as Language;
    if (saved === 'vi' || saved === 'en') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('modeltier_lang', lang);
  };

  const t = TRANSLATIONS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
