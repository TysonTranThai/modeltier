'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArticleItem, ChangelogItem } from '../types';
import { 
  FileText, 
  History, 
  Calendar, 
  Tag, 
  BookOpen,
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
    <section id="articles" className="border-t border-[#3D2216] bg-[#180D07] py-16 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B35]/30 bg-[#FF6B35]/10 px-3 py-1 text-xs font-semibold text-[#FF8452] mb-3">
              <FileText className="h-3.5 w-3.5" />
              <span>{language === 'vi' ? 'Bản Tin Nghiên Cứu Độc Lập' : 'Independent Research & Methodology'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF6EE]">
              {language === 'vi' ? 'Đánh Giá Chuyên Sâu & Lịch Sử Đổi Mới' : 'Deep-Dive Articles & Evaluation Changelog'}
            </h2>
            <p className="mt-2 text-sm text-[#A89280] max-w-2xl">
              {language === 'vi'
                ? 'Các bài viết phân tích phương pháp đo lường, cập nhật bộ tiêu chí Intelligence Index, và nhật ký đánh giá mô hình mới nhất.'
                : 'Methodology articles, benchmark revision releases (e.g. Intelligence Index v4.3), and live model evaluation logs.'}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF8452] bg-[#2E170E] px-3.5 py-1.5 rounded-xl border border-[#3D2216]">
            <span>{language === 'vi' ? 'Dữ liệu nghiên cứu & nhật ký đánh giá' : 'Research Memo & Benchmark Logs'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles Column (2 spans) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="flex items-center gap-2 text-base font-bold text-[#FFF6EE]">
              <BookOpen className="h-4 w-4 text-[#FF8452]" />
              <span>{language === 'vi' ? 'Bài Viết Tiêu Điểm' : 'Featured Benchmark Articles'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articles.map((article, idx) => (
                <div
                  key={article.slug || idx}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#3D2216] bg-[#24130C]/90 p-5 hover:border-[#FF6B35]/40 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#FF8452] uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {language === 'vi' ? 'Nghiên cứu phương pháp' : 'Research Brief'}
                      </span>
                      <span className="text-[10px] font-mono text-[#8A7262]">#{idx + 1}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#FFF6EE] group-hover:text-[#FF8452] transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#D8C4B6] line-clamp-3 font-light">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#3D2216] flex items-center justify-between text-[11px] text-[#8A7262]">
                    <span className="font-mono">Benchmark Memo</span>
                    <span className="text-[#FF8452] font-medium">
                      {language === 'vi' ? 'Bản lưu nội bộ' : 'Internal Brief'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Changelog Column (1 span) */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-base font-bold text-[#FFF6EE]">
              <History className="h-4 w-4 text-[#FF8452]" />
              <span>{language === 'vi' ? 'Nhật Ký Đánh Giá Mới Nhất' : 'Recent Evaluation Changelog'}</span>
            </h3>

            <div className="rounded-2xl border border-[#3D2216] bg-[#24130C]/90 p-4 divide-y divide-[#2E170E] max-h-[420px] overflow-y-auto">
              {changelog.slice(0, 8).map((item, idx) => (
                <div
                  key={`${item.slug}-${idx}`}
                  onClick={() => onSelectModelSlug && onSelectModelSlug(item.slug)}
                  className="py-3 first:pt-0 last:pb-0 cursor-pointer group hover:bg-[#2E170E]/50 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-[#FF8452] font-medium font-mono">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#FFF6EE] group-hover:text-[#FF8452] transition-colors">
                      {item.modelName}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-[#5A3420] group-hover:text-[#FF8452] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <span className="text-[10px] text-[#8A7262] font-mono">
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
