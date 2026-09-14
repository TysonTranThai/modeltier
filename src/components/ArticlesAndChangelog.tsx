'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArticleItem, ChangelogItem } from '../types';
import { 
  FileText, 
  History, 
  ExternalLink, 
  ArrowUpRight, 
  Calendar, 
  Tag, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ArticlesAndChangelogProps {
  articles: ArticleItem[];
  changelog: ChangelogItem[];
  onSelectModelSlug?: (slug: string) => void;
}

export const ArticlesAndChangelog: React.FC<ArticlesAndChangelogProps> = ({
  articles,
  changelog,
  onSelectModelSlug,
}) => {
  const { language } = useLanguage();

  return (
    <section id="articles" className="border-t border-slate-800/80 bg-slate-950 py-16 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/40 px-3 py-1 text-xs font-semibold text-sky-400 mb-3">
              <FileText className="h-3.5 w-3.5" />
              <span>{language === 'vi' ? 'Bản Tin Nghiên Cứu Độc Lập' : 'Independent Research & Methodology'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {language === 'vi' ? 'Đánh Giá Chuyên Sâu & Lịch Sử Đổi Mới' : 'Deep-Dive Articles & Evaluation Changelog'}
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              {language === 'vi'
                ? 'Các bài viết phân tích phương pháp đo lường, cập nhật bộ tiêu chí Intelligence Index, và nhật ký đánh giá mô hình mới nhất.'
                : 'Methodology articles, benchmark revision releases (e.g. Intelligence Index v4.3), and live model evaluation logs.'}
            </p>
          </div>

          <a
            href="https://artificialanalysis.ai/articles"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
          >
            <span>{language === 'vi' ? 'Xem toàn bộ bài viết gốc tại Artificial Analysis' : 'View all articles on Artificial Analysis'}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Column (2 spans) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-200">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>{language === 'vi' ? 'Bài Viết Tiêu Điểm' : 'Featured Benchmark Articles'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles.map((article, idx) => (
                <a
                  key={article.slug || idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-violet-500/50 hover:bg-slate-900 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-violet-400 uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {language === 'vi' ? 'Nghiên cứu phương pháp' : 'Research Brief'}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-3">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                    <span>artificialanalysis.ai</span>
                    <span className="group-hover:text-violet-400 font-medium transition-colors flex items-center gap-1">
                      {language === 'vi' ? 'Đọc bài' : 'Read article'} &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Changelog Column (1 span) */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-200">
              <History className="h-4 w-4 text-sky-400" />
              <span>{language === 'vi' ? 'Nhật Ký Đánh Giá Mới Nhất' : 'Recent Evaluation Changelog'}</span>
            </h3>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 divide-y divide-slate-800/80 max-h-[420px] overflow-y-auto">
              {changelog.slice(0, 8).map((item, idx) => (
                <div
                  key={`${item.slug}-${idx}`}
                  onClick={() => onSelectModelSlug && onSelectModelSlug(item.slug)}
                  className="py-3 first:pt-0 last:pb-0 cursor-pointer group hover:bg-slate-800/40 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-sky-400 font-medium">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {item.modelName}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    id: {item.slug}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
