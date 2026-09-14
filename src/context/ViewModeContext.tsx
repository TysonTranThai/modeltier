'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ViewMode } from '../types';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>('simplified');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('modeltier_view_mode') as ViewMode;
      if (saved === 'simplified' || saved === 'clone' || saved === 'both') {
        setViewModeState(saved);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    try {
      localStorage.setItem('modeltier_view_mode', mode);
    } catch {
      // ignore
    }
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}
