'use client';

import React, { useState, useEffect, useMemo } from 'react';
import initialLiveData from '../data/live_data.json';
import { MODELS_DATA } from '@/data/models';
import { buildUnifiedModels } from '@/data/unifiedModels';
import { LiveDataPayload, ScrapedModel, Model, CategoryFilter } from '@/types';
import { useViewMode } from '@/context/ViewModeContext';

// Core Clean ModelTier Components
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProCloneHero } from '@/components/ProCloneHero';
import { Highlights } from '@/components/Highlights';
import { BenchmarkScrollExplorer } from '@/components/BenchmarkScrollExplorer';
import { ProCloneWorkspace } from '@/components/clone/ProCloneWorkspace';
import { ScatterPlotArena } from '@/components/ScatterPlotArena';
import { ModelLeaderboard } from '@/components/ModelLeaderboard';
import { TierList } from '@/components/TierList';
import { ModelRecommender } from '@/components/ModelRecommender';
import { CostCalculator } from '@/components/CostCalculator';
import { ModelBattle } from '@/components/ModelBattle';
import { LiveTracker } from '@/components/LiveTracker';
import { ArticlesAndChangelog } from '@/components/ArticlesAndChangelog';
import { PlainExplainer } from '@/components/PlainExplainer';
import { LiveModelDetailModal } from '@/components/LiveModelDetailModal';
import { ModelDetailModal } from '@/components/ModelDetailModal';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const { viewMode } = useViewMode();
  const [liveData, setLiveData] = useState<LiveDataPayload>(initialLiveData as any);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Synchronized unified models across all 650+ live models and rich curated metadata
  const unifiedModels = useMemo(() => {
    return buildUnifiedModels(liveData.models, MODELS_DATA);
  }, [liveData.models]);

  // Selected models for detail modals
  const [selectedScrapedModel, setSelectedScrapedModel] = useState<ScrapedModel | null>(null);
  const [selectedCuratedModel, setSelectedCuratedModel] = useState<Model | null>(null);

  // Battle models (defaults to top champions)
  const [battleModelA, setBattleModelA] = useState<Model | undefined>(unifiedModels[0] || MODELS_DATA[0]);
  const [battleModelB, setBattleModelB] = useState<Model | undefined>(unifiedModels[2] || MODELS_DATA[2]);

  // Periodic polling check
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
        // silent fallback
      }
    };

    const interval = setInterval(fetchLatestLiveData, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const [syncToast, setSyncToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Manual Trigger Sync from artificialanalysis.ai
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setLiveData(json.data);
          const timeStr = new Date(json.syncedAt).toLocaleTimeString();
          const durationSec = (json.durationMs / 1000).toFixed(1);
          setSyncToast({
            type: 'success',
            message: `✅ Đã đồng bộ thành công ${json.totalModels} mô hình lúc ${timeStr} (${durationSec}s)!`,
          });
          setTimeout(() => setSyncToast(null), 5000);
          return;
        }
      }
      // Fallback
      const dataRes = await fetch(`/api/live-data?t=${Date.now()}`, { cache: 'no-store' });
      if (dataRes.ok) {
        const fresh = await dataRes.json();
        setLiveData(fresh);
        const timeStr = new Date(fresh.syncedAt).toLocaleTimeString();
        setSyncToast({
          type: 'success',
          message: `✅ Đã làm mới dữ liệu lúc ${timeStr}!`,
        });
        setTimeout(() => setSyncToast(null), 5000);
      }
    } catch (e) {
      console.error('Failed to trigger live sync:', e);
      setSyncToast({
        type: 'error',
        message: '⚠️ Lỗi khi kéo dữ liệu trực tiếp. Vui lòng thử lại sau giây lát.',
      });
      setTimeout(() => setSyncToast(null), 5000);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSelectModelBySlug = (slug: string) => {
    const cleanSlug = slug.toLowerCase().trim();
    // Check in unifiedModels first so user gets rich details and compare button
    const foundModel = unifiedModels.find(
      (m) =>
        m.id.toLowerCase() === cleanSlug ||
        m.name.toLowerCase().includes(cleanSlug) ||
        cleanSlug.includes(m.id.toLowerCase())
    );
    if (foundModel) {
      setSelectedCuratedModel(foundModel);
      return;
    }
    const found = liveData.models.find((m) => m.slug === slug || m.id === slug);
    if (found) {
      setSelectedScrapedModel(found);
    }
  };

  const handleSelectScrapedModel = (scraped: ScrapedModel) => {
    const found = unifiedModels.find(
      (m) => m.id === scraped.slug || m.id === scraped.id || m.name.toLowerCase() === scraped.name.toLowerCase()
    );
    if (found) {
      setSelectedCuratedModel(found);
    } else {
      setSelectedScrapedModel(scraped);
    }
  };

  const handleSelectCompare = (model: Model) => {
    if (battleModelA?.id !== model.id) {
      setBattleModelB(model);
    } else {
      setBattleModelA(model);
    }
    const element = document.querySelector('#battle');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 font-sans selection:bg-violet-600 selection:text-white">
      {/* Top ModelTier Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalModels={liveData.totalModels}
        lastSyncedAt={liveData.syncedAt}
        onTriggerSync={handleTriggerSync}
        isSyncing={isSyncing}
      />

      {/* Live Sync Status Toast Notification */}
      {syncToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300 max-w-md">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-semibold backdrop-blur-md ${
            syncToast.type === 'success'
              ? 'bg-emerald-950/95 text-emerald-200 border-emerald-500/50 shadow-emerald-950/50'
              : 'bg-rose-950/95 text-rose-200 border-rose-500/50 shadow-rose-950/50'
          }`}>
            <span className="flex-1 leading-relaxed">{syncToast.message}</span>
            <button
              onClick={() => setSyncToast(null)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {viewMode === 'simplified' ? (
          /* ================= EASY MODE (DỄ HIỂU & THỰC TIỄN) ================= */
          <>
            {/* Easy Hero with Quick Filter & Search */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              modelCount={liveData.totalModels}
            />

            {/* Highlights 3-Card Grid (Intelligence, Speed, Cost) */}
            <div id="highlights">
              <Highlights
                intelligenceData={liveData.highlights.intelligence}
                speedData={liveData.highlights.speed}
                costData={liveData.highlights.costPerTask}
                onSelectModel={handleSelectModelBySlug}
              />
            </div>

            {/* Interactive 2D Scatter Plot & Pareto Frontier */}
            <div id="scatterplot" className="scroll-mt-20">
              <ScatterPlotArena
                models={liveData.models}
                onSelectModel={handleSelectScrapedModel}
              />
            </div>

            {/* S/A/B/C Practical Tier List */}
            <TierList
              models={unifiedModels}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onSelectDetails={(model) => setSelectedCuratedModel(model)}
              onSelectCompare={handleSelectCompare}
              onResetFilters={() => { setSearchQuery(''); setActiveCategory('all'); }}
            />

            {/* Interactive "Find My AI" Wizard */}
            <ModelRecommender
              models={unifiedModels}
              onSelectDetails={(model) => setSelectedCuratedModel(model)}
            />

            {/* Real-World Cost Calculator (VND & USD with real analogies) */}
            <CostCalculator
              models={unifiedModels}
              onSelectDetails={(model) => setSelectedCuratedModel(model)}
            />

            {/* Head-to-Head 1-vs-1 Model Battle Arena */}
            <ModelBattle
              models={unifiedModels}
              initialModelA={battleModelA}
              initialModelB={battleModelB}
              onSelectDetails={(model) => setSelectedCuratedModel(model)}
            />

            {/* Full Models Leaderboard Table */}
            <ModelLeaderboard
              models={liveData.models}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectModel={handleSelectScrapedModel}
            />

            {/* Realtime Cloud Provider Latency Telemetry Radar */}
            <LiveTracker />

            {/* Plain Language Explainer Guide */}
            <PlainExplainer />
          </>
        ) : (
          /* ================= PRO CLONE MODE (EXACT ARTIFICIAL ANALYSIS CLONE) ================= */
          <>
            {/* Artificial Analysis Benchmark Clone Hero */}
            <ProCloneHero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              modelCount={liveData.totalModels}
            />

            {/* Authentic Artificial Analysis Horizontal Scroll Benchmark Explorer */}
            <div id="benchmarks" className="scroll-mt-20">
              <BenchmarkScrollExplorer
                models={liveData.models}
                onSelectModel={handleSelectScrapedModel}
              />
            </div>

            {/* Full High-Fidelity 11-Section Workspace with Left Sidebar & Intelligence Index Chart */}
            <ProCloneWorkspace
              models={liveData.models}
              articles={liveData.articles}
              changelog={liveData.changelog}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectModel={handleSelectScrapedModel}
              onSelectModelSlug={handleSelectModelBySlug}
            />
          </>
        )}
      </main>

      {/* Detail Modals (Shared across both modes) */}
      <LiveModelDetailModal
        model={selectedScrapedModel}
        onClose={() => setSelectedScrapedModel(null)}
      />

      <ModelDetailModal
        model={selectedCuratedModel}
        onClose={() => setSelectedCuratedModel(null)}
        onSelectCompare={handleSelectCompare}
      />

      {/* Clean Footer with Artificial Analysis Reference at the Bottom */}
      <Footer />
    </div>
  );
}
