'use client';

import React, { useState } from 'react';
import { Model, CategoryFilter } from '@/types';
import { MODELS_DATA } from '@/data/models';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TierList } from '@/components/TierList';
import { ModelRecommender } from '@/components/ModelRecommender';
import { CostCalculator } from '@/components/CostCalculator';
import { ModelBattle } from '@/components/ModelBattle';
import { LiveTracker } from '@/components/LiveTracker';
import { PlainExplainer } from '@/components/PlainExplainer';
import { ModelDetailModal } from '@/components/ModelDetailModal';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedModelForModal, setSelectedModelForModal] = useState<Model | null>(null);

  // Model battle selections
  const [battleModelA, setBattleModelA] = useState<Model | undefined>(MODELS_DATA[0]);
  const [battleModelB, setBattleModelB] = useState<Model | undefined>(MODELS_DATA[2]);

  const handleSelectCompare = (model: Model) => {
    // If not already in A, set in B, and scroll to battle
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

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {/* Hero Section with Quick Search & Metrics */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          modelCount={MODELS_DATA.length}
        />

        {/* Tier List (S/A/B/C) Hub */}
        <TierList
          models={MODELS_DATA}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onSelectDetails={(model) => setSelectedModelForModal(model)}
          onSelectCompare={handleSelectCompare}
          onResetFilters={handleResetFilters}
        />

        {/* Interactive "Find My AI" Wizard */}
        <ModelRecommender
          models={MODELS_DATA}
          onSelectDetails={(model) => setSelectedModelForModal(model)}
        />

        {/* Real-World Cost Calculator (VND & USD) */}
        <CostCalculator
          models={MODELS_DATA}
          onSelectDetails={(model) => setSelectedModelForModal(model)}
        />

        {/* Head-to-Head 1-vs-1 Model Battle Arena */}
        <ModelBattle
          models={MODELS_DATA}
          initialModelA={battleModelA}
          initialModelB={battleModelB}
          onSelectDetails={(model) => setSelectedModelForModal(model)}
        />

        {/* Live Provider Radar & Telemetry Tracker */}
        <LiveTracker />

        {/* Plain Language Explainer Guide */}
        <PlainExplainer />
      </main>

      {/* Detail Modal Popup */}
      <ModelDetailModal
        model={selectedModelForModal}
        onClose={() => setSelectedModelForModal(null)}
        onSelectCompare={handleSelectCompare}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
