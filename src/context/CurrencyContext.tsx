'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '../types';
import { USD_TO_VND_RATE, formatVND, formatUSD } from '../data/models';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;
  formatCost: (usdAmount: number) => string; // For small per-task costs
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('VND');

  useEffect(() => {
    const saved = localStorage.getItem('modeltier_currency') as Currency;
    if (saved === 'VND' || saved === 'USD') {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('modeltier_currency', c);
  };

  const formatPrice = (usdAmount: number): string => {
    if (currency === 'VND') {
      const vnd = Math.round(usdAmount * USD_TO_VND_RATE);
      return formatVND(vnd);
    }
    return formatUSD(usdAmount);
  };

  const formatCost = (usdAmount: number): string => {
    if (currency === 'VND') {
      const vnd = Math.round(usdAmount * USD_TO_VND_RATE);
      if (vnd < 100) {
        return `${vnd} đ`;
      }
      return formatVND(vnd);
    }
    if (usdAmount < 0.001) {
      return `$${usdAmount.toFixed(4)}`;
    }
    return formatUSD(usdAmount);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        formatCost,
        exchangeRate: USD_TO_VND_RATE,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
