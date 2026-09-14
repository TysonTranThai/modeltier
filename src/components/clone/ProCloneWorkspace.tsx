'use client';

import React, { useState, useEffect } from 'react';
import { ScrapedModel } from '../../types';
import { IntelligenceIndexCard } from './IntelligenceIndexCard';
import { CloneSections } from './CloneSections';
import { ScatterPlotArena } from '../ScatterPlotArena';
import { ModelLeaderboard } from '../ModelLeaderboard';
import { LiveTracker } from '../LiveTracker';
import { ArticlesAndChangelog } from '../ArticlesAndChangelog';
import { ArticleItem, ChangelogItem } from '../../types';

interface ProCloneWorkspaceProps {
  models: ScrapedModel[];
  articles: ArticleItem[];
  changelog: ChangelogItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectModel: (model: ScrapedModel) => void;
  onSelectModelSlug?: (slug: string) => void;
}

interface NavIndexItem {
  id: string;
  label: string;
  hasUpdatedTag?: boolean;
}

export const ProCloneWorkspace: React.FC<ProCloneWorkspaceProps> = ({
  models,
  articles,
  changelog,
  searchQuery,
  setSearchQuery,
  onSelectModel,
  onSelectModelSlug,
}) => {
  const [activeSection, setActiveSection] = useState<string>('intelligence');

  const navItems: NavIndexItem[] = [
    { id: 'intelligence', label: 'Intelligence', hasUpdatedTag: true },
    { id: 'coding-agents', label: 'Coding Agent Index', hasUpdatedTag: true },
    { id: 'media-leaderboards', label: 'Image & Video' },
    { id: 'speech-leaderboards', label: 'Speech' },
    { id: 'capability-indices', label: 'Capability Indices' },
    { id: 'intelligence-breakdown', label: 'Benchmarks' },
    { id: 'openness', label: 'Openness Index' },
    { id: 'output-tokens', label: 'Output Tokens' },
    { id: 'price-and-cost', label: 'Cost' },
    { id: 'speed', label: 'Speed & Latency' },
    { id: 'providers', label: 'Providers' },
  ];

  // ScrollSpy to update active sidebar link on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#180D07] text-[#FFF6EE] min-h-screen py-10 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* ================= LEFT STICKY SIDEBAR INDEX ================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 pt-2">
            <nav className="flex flex-col space-y-3 pl-3 border-l border-[#3D2216]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="group flex items-center gap-2.5 transition-colors py-0.5"
                  >
                    {/* Square Indicator */}
                    <span
                      className={`h-2.5 w-2.5 flex-shrink-0 transition-colors rounded-[1px] ${
                        isActive ? 'bg-[#FF6B35] shadow-glow-orange' : 'bg-[#472718] group-hover:bg-[#8A4A28]'
                      }`}
                    />
                    <span
                      className={`text-xs transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'font-bold text-[#FFF6EE]'
                          : 'text-[#A89280] group-hover:text-[#FFF6EE]'
                      }`}
                    >
                      {item.label}
                      {item.hasUpdatedTag && (
                        <span className="flex items-center gap-1">
                          <span className="inline-block h-1 w-1 rounded-full bg-[#FF6B35]" />
                          <span className="text-[10px] font-bold text-[#FF8452]">Updated</span>
                        </span>
                      )}
                    </span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* ================= RIGHT MAIN BENCHMARK WORKSPACE ================= */}
          <div className="col-span-12 lg:col-span-9 space-y-16">
            {/* SECTION 1: INTELLIGENCE */}
            <section id="intelligence" className="scroll-mt-24">
              {/* Main Heading */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
                  <h2 className="text-3xl font-serif font-bold text-[#FFF6EE]">Intelligence</h2>
                  <span className="rounded-full bg-[#FF6B35]/20 text-[#FF8452] border border-[#FF6B35]/30 text-xs font-bold px-2.5 py-0.5">
                    Updated
                  </span>
                </div>
                <p className="text-sm text-[#D8C4B6] max-w-2xl font-light">
                  Intelligence of leading AI models based on our independent evaluations
                </p>
              </div>

              {/* Exact Intelligence Index Bar Chart Card in Espresso/Orange */}
              <IntelligenceIndexCard models={models} onSelectModel={onSelectModel} />
            </section>

            {/* SECTIONS 2 to 11 (All other categories in luxury espresso) */}
            <CloneSections models={models} onSelectModel={onSelectModel} />

            {/* Interactive 2D Scatter Plot & Pareto Frontier */}
            <div id="scatterplot" className="scroll-mt-24 pt-8 border-t border-[#3D2216]">
              <div className="mb-4">
                <h3 className="text-2xl font-serif font-bold text-[#FFF6EE] flex items-center gap-2">
                  <span>Pareto Frontier Analysis</span>
                </h3>
                <p className="text-xs text-[#A89280] mt-1 font-mono">
                  Plotting Intelligence vs Cost and Speed to discover optimal models on the Pareto efficiency frontier.
                </p>
              </div>
              <ScatterPlotArena models={models} onSelectModel={onSelectModel} />
            </div>

            {/* Complete 650+ Models Leaderboard Table */}
            <div id="leaderboard" className="scroll-mt-24 pt-8 border-t border-[#3D2216]">
              <ModelLeaderboard
                models={models}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSelectModel={onSelectModel}
              />
            </div>

            {/* Provider Radar Latency Tracker */}
            <div id="live" className="scroll-mt-24 pt-8 border-t border-[#3D2216]">
              <LiveTracker />
            </div>

            {/* Articles and Evaluation Changelog */}
            <div id="articles" className="scroll-mt-24 pt-8 border-t border-[#3D2216]">
              <ArticlesAndChangelog
                articles={articles}
                changelog={changelog}
                onSelectModelSlug={onSelectModelSlug}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
