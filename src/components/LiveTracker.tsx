'use client';

import React, { useState } from 'react';
import { ProviderStatus } from '../types';
import { PROVIDERS_DATA } from '../data/providers';
import { useLanguage } from '../context/LanguageContext';
import { 
  Radio, 
  RefreshCw, 
  Activity, 
  Server, 
  Clock, 
  Zap, 
  ShieldCheck, 
  AlertTriangle,
  ExternalLink 
} from 'lucide-react';

export const LiveTracker: React.FC = () => {
  const { language, t } = useLanguage();
  const [providers, setProviders] = useState<ProviderStatus[]>(PROVIDERS_DATA);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate live jitter
      const jittered = providers.map((p) => {
        const jitterLatency = Math.max(80, p.avgLatencyMs + Math.floor((Math.random() - 0.5) * 40));
        const jitterThroughput = Math.max(30, p.throughputTps + Math.floor((Math.random() - 0.5) * 15));
        return {
          ...p,
          avgLatencyMs: jitterLatency,
          throughputTps: jitterThroughput,
          updatedAt: new Date().toISOString(),
        };
      });
      setProviders(jittered);
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <section id="live" className="py-14 lg:py-20 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title & Refresh Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/20 mb-3">
              <Radio className="h-4 w-4 animate-pulse" />
              <span>{language === 'vi' ? 'Theo dõi hạ tầng thời gian thực' : 'Real-time Infrastructure Telemetry'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.liveRadar.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl">
              {t.liveRadar.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              {language === 'vi' ? 'Cập nhật lúc:' : 'Updated:'} {lastRefreshed.toLocaleTimeString()}
            </span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 hover:border-slate-600 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-violet-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              {t.liveRadar.refreshButton}
            </button>
          </div>
        </div>

        {/* Notice Card: Why Provider Selection Matters */}
        <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-4 mb-8 text-xs text-slate-300 flex items-start gap-3">
          <Zap className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-violet-200">
              {language === 'vi' ? '💡 Bí quyết bạn nên biết:' : '💡 Pro Tip:'}{' '}
            </span>
            {language === 'vi' 
              ? 'Cùng một mô hình AI (như DeepSeek R1 hoặc Llama 3.3), tốc độ sinh chữ trên chip LPU của Groq hoặc Cerebras có thể nhanh gấp 5 - 7 lần so với máy chủ API gốc mà chi phí lại tương đương hoặc rẻ hơn!'
              : 'The exact same model (like DeepSeek R1 or Llama 3.3) can run 5 to 7 times faster on specialized LPUs (like Groq or Cerebras) compared to the original creator endpoint at identical or lower cost!'}
          </div>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {providers.map((provider) => {
            const isOperational = provider.status === 'operational';

            return (
              <div
                key={provider.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl backdrop-blur-sm transition-all hover:border-slate-700 hover:-translate-y-0.5"
              >
                {/* Header: Name & Status Badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-white text-base">{provider.name}</h3>
                    <span className="text-[10px] text-slate-500">{provider.region}</span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold border">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isOperational ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    <span className={isOperational ? 'text-emerald-300' : 'text-amber-300'}>
                      {isOperational ? t.liveRadar.operational : t.liveRadar.degraded}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-950/60 p-3 border border-slate-800/60 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Zap className="h-3 w-3 text-amber-400" /> {t.liveRadar.speedLabel}
                    </span>
                    <div className="text-base font-black text-white mt-0.5">
                      {provider.throughputTps} <span className="text-[10px] font-normal text-slate-400">tps</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-cyan-400" /> {t.liveRadar.latencyLabel}
                    </span>
                    <div className="text-base font-black text-white mt-0.5">
                      {provider.avgLatencyMs} <span className="text-[10px] font-normal text-slate-400">ms</span>
                    </div>
                  </div>
                </div>

                {/* Uptime & Models Served */}
                <div className="mt-3.5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Uptime 30 ngày:</span>
                    <span className="font-bold text-emerald-400">{provider.uptimePercent}%</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      {t.liveRadar.modelsLabel}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {provider.modelsServed.map((m, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300 font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
