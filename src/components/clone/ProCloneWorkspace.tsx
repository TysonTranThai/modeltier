'use client';

import React, { useState, useEffect } from 'react';
import { ScrapedModel } from '../../types';
import { IntelligenceIndexCard } from './IntelligenceIndexCard';
import { CloneSections } from './CloneSections';
import { ScatterPlotArena } from '../ScatterPlotArena';
import { ModelLeaderboard } from '../ModelLeaderboard';
import { LiveTracker } from '../LiveTracker';
import { ArticleItem, ChangelogItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

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
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('intelligence');

  const navItems: NavIndexItem[] = [
    { 
      id: 'intelligence', 
      label: language === 'vi' ? 'Chỉ số Trí tuệ (Intelligence)' : 'Intelligence', 
      hasUpdatedTag: true 
    },
    { 
      id: 'coding-agents', 
      label: language === 'vi' ? 'Tác tử Lập trình (Coding Agent)' : 'Coding Agent Index', 
      hasUpdatedTag: true 
    },
    { 
      id: 'media-leaderboards', 
      label: language === 'vi' ? 'Hình ảnh & Video (Media)' : 'Image & Video' 
    },
    { 
      id: 'speech-leaderboards', 
      label: language === 'vi' ? 'Giọng nói (Speech)' : 'Speech' 
    },
    { 
      id: 'capability-indices', 
      label: language === 'vi' ? 'Bộ chỉ số Năng lực' : 'Capability Indices' 
    },
    { 
      id: 'intelligence-breakdown', 
      label: language === 'vi' ? 'Điểm chuẩn Chi tiết (Benchmarks)' : 'Benchmarks' 
    },
    { 
      id: 'openness', 
      label: language === 'vi' ? 'Độ Mở Mã nguồn (Openness)' : 'Openness Index' 
    },
    { 
      id: 'output-tokens', 
      label: language === 'vi' ? 'Thông lượng Đầu ra' : 'Output Tokens' 
    },
    { 
      id: 'price-and-cost', 
      label: language === 'vi' ? 'Chi phí & Định giá (Cost)' : 'Cost' 
    },
    { 
      id: 'speed', 
      label: language === 'vi' ? 'Tốc độ & Độ trễ (Speed)' : 'Speed & Latency' 
    },
    { 
      id: 'providers', 
      label: language === 'vi' ? 'Hạ tầng Nhà cung cấp' : 'Providers' 
    },
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
    <div className="bg-[#180D07] text-[#FFF6EE] min-h-screen py-10 transition-colors w-full max-w-full overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* ================= LEFT STICKY SIDEBAR INDEX ================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 pt-2">
            <div className="mb-3 px-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8A7262]">
                {language === 'vi' ? 'MỤC LỤC CHỈ SỐ ĐO LƯỜNG' : 'BENCHMARK INDEX'}
              </span>
            </div>
            <nav className="flex flex-col space-y-2.5 pl-3 border-l border-[#3D2216]">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="group flex items-center gap-2.5 transition-colors py-1"
                  >
                    {/* Square Indicator */}
                    <span
                      className={`h-2 w-2 flex-shrink-0 transition-colors rounded-[2px] ${
                        isActive ? 'bg-[#FF6B35] shadow-glow-orange scale-110' : 'bg-[#472718] group-hover:bg-[#8A4A28]'
                      }`}
                    />
                    <span
                      className={`text-xs transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'font-bold text-[#FFF6EE]'
                          : 'text-[#A89280] group-hover:text-[#FFF6EE]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.hasUpdatedTag && (
                        <span className="flex items-center gap-1">
                          <span className="inline-block h-1 w-1 rounded-full bg-[#FF6B35]" />
                          <span className="text-[9px] font-mono font-bold text-[#FF8452] uppercase">
                            {language === 'vi' ? 'Mới' : 'Updated'}
                          </span>
                        </span>
                      )}
                    </span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Mobile & iPad Horizontal Category Bar */}
          <div className="lg:hidden col-span-12 sticky top-16 z-30 bg-[#160B06]/95 backdrop-blur-md py-2.5 px-4 sm:px-6 border-b border-[#3D2216] overflow-x-auto scrollbar-none flex items-center gap-2 w-full max-w-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => scrollToSection(e as any, item.id)}
                  className={`px-3 py-1.5 rounded-sm font-mono text-xs whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF6B35] to-[#E64A19] text-white font-bold shadow-glow-orange'
                      : 'bg-[#24130C] text-[#A89280] border border-[#3D2216] hover:text-[#FFF6EE]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* ================= RIGHT MAIN BENCHMARK WORKSPACE ================= */}
          <div className="col-span-12 lg:col-span-9 space-y-16">
            {/* SECTION 1: INTELLIGENCE */}
            <section id="intelligence" className="scroll-mt-24">
              {/* Main Heading */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
                  <h2 className="text-3xl font-serif font-bold text-[#FFF6EE]">
                    {language === 'vi' ? 'Chỉ số Trí tuệ AI (Intelligence)' : 'Intelligence'}
                  </h2>
                  <span className="rounded-sm bg-[#FF6B35]/20 text-[#FF8452] border border-[#FF6B35]/30 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5">
                    {language === 'vi' ? 'Cập nhật trực tiếp' : 'Updated'}
                  </span>
                </div>
                <p className="text-sm text-[#D8C4B6] max-w-2xl font-light">
                  {language === 'vi' 
                    ? 'Chỉ số năng lực trí tuệ và giải quyết bài toán phức tạp của các mô hình AI tiên phong dựa trên bài đo chuẩn hoá độc lập.'
                    : 'Intelligence of leading AI models based on our independent evaluations'}
                </p>
              </div>

              {/* Exact Intelligence Index Bar Chart Card in Espresso/Orange */}
              <IntelligenceIndexCard models={models} onSelectModel={onSelectModel} />
            </section>

            {/* SECTIONS 2 to 11 (All other categories in luxury espresso with 100% Vietnamese support) */}
            <CloneSections models={models} onSelectModel={onSelectModel} />

            {/* Interactive 2D Scatter Plot & Pareto Frontier */}
            <div id="scatterplot" className="scroll-mt-24 pt-8 border-t border-[#3D2216]">
              <div className="mb-4">
                <h3 className="text-2xl font-serif font-bold text-[#FFF6EE] flex items-center gap-2">
                  <span>{language === 'vi' ? 'Phân tích Đường Biên Hiệu Quả Pareto' : 'Pareto Frontier Analysis'}</span>
                </h3>
                <p className="text-xs text-[#A89280] mt-1 font-mono">
                  {language === 'vi'
                    ? 'Biểu đồ tọa độ 2D đo lường tương quan Trí tuệ vs Chi phí và Tốc độ. Tìm ra các model tối ưu không đối thủ.'
                    : 'Plotting Intelligence vs Cost and Speed to discover optimal models on the Pareto efficiency frontier.'}
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
          </div>
        </div>
      </div>
    </div>
  );
};
