'use client';

import React, { useState, useEffect } from 'react';
import initialLiveData from '../data/live_data.json';
import { MODELS_DATA } from '@/data/models';
import { LiveDataPayload, ScrapedModel, Model, ViewMode, CategoryFilter } from '@/types';

// Artificial Analysis Exact Clone Components
import { ArtificialNavbar } from '@/components/ArtificialNavbar';
import { ArtificialHero } from '@/components/ArtificialHero';
import { ArtificialHighlights } from '@/components/ArtificialHighlights';
import { ArtificialBanners } from '@/components/ArtificialBanners';
import { ScatterPlotArena } from '@/components/ScatterPlotArena';
import { ArtificialLeaderboard } from '@/components/ArtificialLeaderboard';
import { ArtificialDetailModal } from '@/components/ArtificialDetailModal';

// Simplified Vietnamese Toolkit Components
import { TierList } from '@/components/TierList';
import { ModelRecommender } from '@/components/ModelRecommender';
import { CostCalculator } from '@/components/CostCalculator';
import { ModelBattle } from '@/components/ModelBattle';
import { LiveTracker } from '@/components/LiveTracker';
import { PlainExplainer } from '@/components/PlainExplainer';
import { ModelDetailModal } from '@/components/ModelDetailModal';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [liveData, setLiveData] = useState<LiveDataPayload>(initialLiveData as any);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('clone');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  // Selected models for modals
  const [selectedScrapedModel, setSelectedScrapedModel] = useState<ScrapedModel | null>(null);
  const [selectedCuratedModel, setSelectedCuratedModel] = useState<Model | null>(null);

  // Background auto-refresh check every 2 minutes
  useEffect(() => {
    const fetchLatestLiveData = async () => {
      try {
        const res = await fetch('/api/live-data');
        if (res.ok) {
          const data = await res.json();
          if (data && data.totalModels) {
            setLiveData(data);
          }
        }
      } catch {
        // silent fallback to current data
      }
    };

    const interval = setInterval(fetchLatestLiveData, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Manual Trigger Sync from artificialanalysis.ai
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      if (res.ok) {
        const result = await res.json();
        // Refresh live data
        const dataRes = await fetch('/api/live-data');
        if (dataRes.ok) {
          const fresh = await dataRes.json();
          setLiveData(fresh);
        }
      }
    } catch (e) {
      console.error('Failed to trigger live sync:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSelectModelBySlug = (slug: string) => {
    const found = liveData.models.find((m) => m.slug === slug || m.id === slug);
    if (found) {
      setSelectedScrapedModel(found);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-neutral-100 font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <ArtificialNavbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalModels={liveData.totalModels}
        lastSyncedAt={liveData.syncedAt}
        onTriggerSync={handleTriggerSync}
        isSyncing={isSyncing}
      />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* 1. EXACT ARTIFICIAL ANALYSIS CLONE VIEW                    */}
        {/* ========================================================= */}
        {(viewMode === 'clone' || viewMode === 'both') && (
          <div className="animate-in fade-in duration-300">
            {/* Hero with Headline & News */}
            <ArtificialHero
              articles={liveData.articles}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalModels={liveData.totalModels}
            />

            {/* Highlights 3-Card Grid (Intelligence, Speed, Cost) */}
            <ArtificialHighlights
              intelligenceData={liveData.highlights.intelligence}
              speedData={liveData.highlights.speed}
              costData={liveData.highlights.costPerTask}
              onSelectModel={handleSelectModelBySlug}
            />

            {/* Optima & Model Recommender Banners & Changelog Feed */}
            <ArtificialBanners
              changelog={liveData.changelog}
              onTriggerRecommender={() => {
                setViewMode('simplified');
                setTimeout(() => {
                  document.querySelector('#finder')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />

            {/* Quality vs Speed / Quality vs Cost Scatter Plot Arena */}
            <ScatterPlotArena
              models={liveData.models}
              onSelectModel={(m) => setSelectedScrapedModel(m)}
            />

            {/* Full 301 Models Leaderboard Table */}
            <ArtificialLeaderboard
              models={liveData.models}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectModel={(m) => setSelectedScrapedModel(m)}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. SIMPLIFIED VIETNAMESE S/A/B/C TOOLKIT VIEW              */}
        {/* ========================================================= */}
        {(viewMode === 'simplified' || viewMode === 'both') && (
          <div className="border-t border-neutral-800 pt-10 animate-in fade-in duration-300 bg-slate-950/40">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
              <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 text-xs text-purple-200 flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold">
                  ⭐ Chế độ dành cho người mới: Phân loại theo Tier S/A/B/C, trắc nghiệm tìm AI và tính tiền VNĐ
                </span>
                <button
                  onClick={() => setViewMode('clone')}
                  className="rounded-lg bg-neutral-900 border border-neutral-700 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-neutral-800"
                >
                  ← Trở về giao diện chuẩn Artificial Analysis
                </button>
              </div>
            </div>

            {/* S/A/B/C Tier List */}
            <TierList
              models={MODELS_DATA}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onSelectDetails={(model) => setSelectedCuratedModel(model)}
              onResetFilters={() => { setSearchQuery(''); setActiveCategory('all'); }}
            />

            {/* Interactive "Find My AI" Wizard */}
            <ModelRecommender
              models={MODELS_DATA}
              onSelectDetails={(model) => setSelectedCuratedModel(model)}
            />

            {/* Real-World Cost Calculator (VND & USD) */}
            <CostCalculator
              models={MODELS_DATA}
              onSelectDetails={(model) => setSelectedCuratedModel(model)}
            />

            {/* Head-to-Head 1-vs-1 Model Battle Arena */}
            <ModelBattle
              models={MODELS_DATA}
              onSelectDetails={(model) => setSelectedCuratedModel(model)}
            />

            {/* Live Provider Radar & Telemetry Tracker */}
            <LiveTracker />

            {/* Plain Language Explainer Guide */}
            <PlainExplainer />
          </div>
        )}
      </main>

      {/* Modals */}
      <ArtificialDetailModal
        model={selectedScrapedModel}
        onClose={() => setSelectedScrapedModel(null)}
      />

      <ModelDetailModal
        model={selectedCuratedModel}
        onClose={() => setSelectedCuratedModel(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
