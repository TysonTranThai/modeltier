'use client';

import React from 'react';
import { ScrapedModel } from '../../types';
import { CompanyLogo, getCreatorColor } from './CompanyLogo';
import { 
  Code2, 
  Video, 
  Mic, 
  Layers, 
  Cpu, 
  Unlock, 
  FileCode, 
  DollarSign, 
  Zap, 
  Server, 
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CloneSectionsProps {
  models: ScrapedModel[];
  onSelectModel?: (model: ScrapedModel) => void;
}

export const CloneSections: React.FC<CloneSectionsProps> = ({
  models,
  onSelectModel,
}) => {
  return (
    <div className="space-y-16 mt-16 text-neutral-900">
      {/* ================= SECTION 2: CODING AGENT INDEX ================= */}
      <section id="coding-agents" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Coding Agent Index</h2>
            <span className="rounded-full bg-purple-700 text-white text-[10px] font-semibold px-2.5 py-0.5">
              Updated
            </span>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Performance, cost, and execution time for leading coding agents on end-to-end software engineering tasks (SWE-bench Verified & Terminal-Bench v4.0).
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold font-serif flex items-center gap-1.5">
              <span>Agentic Software Engineering Benchmarks</span>
              <ArrowUpRight className="h-4 w-4 text-neutral-400" />
            </h3>
            <span className="text-xs text-neutral-500 font-mono">SWE-bench Verified % Resolved</span>
          </div>

          <div className="space-y-3.5">
            {[
              { name: 'Claude 3.7 Sonnet (Thinking) + Claude Code', creator: 'Anthropic', score: 70.3, cost: '$1.42', speed: '4m 12s' },
              { name: 'Cursor Agent (Claude 3.7 Sonnet)', creator: 'Anthropic', score: 68.8, cost: '$1.25', speed: '3m 48s' },
              { name: 'Devin 2.0 (Cognition)', creator: 'Cognition', score: 65.2, cost: '$2.10', speed: '5m 30s' },
              { name: 'OpenAI Operator / Codex 5.6', creator: 'OpenAI', score: 64.9, cost: '$1.80', speed: '4m 05s' },
              { name: 'Cline + DeepSeek V3', creator: 'DeepSeek', score: 58.4, cost: '$0.32', speed: '4m 50s' },
              { name: 'Aider + Qwen 2.5 Coder 32B', creator: 'Alibaba', score: 54.6, cost: '$0.28', speed: '3m 15s' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl hover:bg-neutral-50 border border-neutral-100 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono text-neutral-400 w-5">#{idx + 1}</span>
                  <CompanyLogo creator={item.creator} size={16} />
                  <span className="text-sm font-semibold text-neutral-900">{item.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-neutral-500">Cost: <strong className="text-neutral-800 font-mono">{item.cost}</strong></span>
                  <span className="text-neutral-500">Time: <strong className="text-neutral-800 font-mono">{item.speed}</strong></span>
                  <div className="flex items-center gap-2 w-32 justify-end">
                    <div className="w-16 bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full" style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="font-bold text-purple-700 font-mono">{item.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: IMAGE & VIDEO ================= */}
      <section id="media-leaderboards" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Image &amp; Video</h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Top models from our Image Arena and Video Arena leaderboards, with 95% confidence intervals and human Elo preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Arena */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-serif flex items-center gap-1.5">
                <span>Text to Image Arena</span>
                <ArrowUpRight className="h-4 w-4 text-neutral-400" />
              </h3>
              <span className="text-xs text-neutral-500">Arena Elo</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Midjourney v6.1', creator: 'Midjourney', elo: 1248 },
                { name: 'Flux 1.1 Pro', creator: 'Black Forest Labs', elo: 1232 },
                { name: 'Imagen 3 (Fast)', creator: 'Google', elo: 1205 },
                { name: 'DALL-E 3 HD', creator: 'OpenAI', elo: 1180 },
                { name: 'Stable Diffusion 3.5 Large', creator: 'Stability AI', elo: 1162 },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-neutral-100 last:border-0">
                  <span className="font-semibold text-neutral-900 flex items-center gap-2">
                    <span className="text-neutral-400 font-mono">#{idx + 1}</span>
                    <span>{m.name}</span>
                  </span>
                  <span className="font-bold text-sky-700 font-mono">{m.elo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Arena */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-serif flex items-center gap-1.5">
                <span>Text to Video Arena</span>
                <ArrowUpRight className="h-4 w-4 text-neutral-400" />
              </h3>
              <span className="text-xs text-neutral-500">Arena Elo</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Kling 1.5 Pro', creator: 'Kuaishou', elo: 1260 },
                { name: 'Sora Video', creator: 'OpenAI', elo: 1255 },
                { name: 'Runway Gen-3 Alpha Turbo', creator: 'Runway', elo: 1240 },
                { name: 'Luma Dream Machine 1.5', creator: 'Luma AI', elo: 1210 },
                { name: 'Hailuo MiniMax Video 01', creator: 'MiniMax', elo: 1195 },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-neutral-100 last:border-0">
                  <span className="font-semibold text-neutral-900 flex items-center gap-2">
                    <span className="text-neutral-400 font-mono">#{idx + 1}</span>
                    <span>{m.name}</span>
                  </span>
                  <span className="font-bold text-violet-700 font-mono">{m.elo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: SPEECH ================= */}
      <section id="speech-leaderboards" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Speech</h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Top models from our Text to Speech Arena, Speech to Text and Speech to Speech evaluations measuring quality Elo and latency.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border-r border-neutral-100 pr-4 last:border-0">
              <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">Text to Speech Quality</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold"><span>ElevenLabs v2</span><span className="font-mono text-purple-700">1276 Elo</span></div>
                <div className="flex justify-between text-neutral-600"><span>OpenAI TTS HD</span><span className="font-mono">1215 Elo</span></div>
                <div className="flex justify-between text-neutral-600"><span>Cartesia Sonic</span><span className="font-mono">1198 Elo</span></div>
              </div>
            </div>

            <div className="border-r border-neutral-100 pr-4 last:border-0">
              <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">Speech to Text Accuracy</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold"><span>Whisper Large v3</span><span className="font-mono text-emerald-700">4.2% WER</span></div>
                <div className="flex justify-between text-neutral-600"><span>Deepgram Nova-2</span><span className="font-mono">4.5% WER</span></div>
                <div className="flex justify-between text-neutral-600"><span>AssemblyAI Universal</span><span className="font-mono">5.1% WER</span></div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">Realtime Audio Latency</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold"><span>Cartesia Sonic</span><span className="font-mono text-emerald-700">135 ms</span></div>
                <div className="flex justify-between text-neutral-600"><span>Gemini 2.0 Realtime</span><span className="font-mono">290 ms</span></div>
                <div className="flex justify-between text-neutral-600"><span>OpenAI 4o Realtime</span><span className="font-mono">320 ms</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: CAPABILITY INDICES ================= */}
      <section id="capability-indices" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Capability Indices</h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Normalized capability indices testing deep reasoning, code generation, mathematical mastery, and instruction precision.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'Coding Index', top: 'Claude 3.7 Sonnet', score: '92.4', icon: Code2 },
            { title: 'Reasoning Index', top: 'o3-mini / GPT-5', score: '94.8', icon: Cpu },
            { title: 'Math Mastery', top: 'DeepSeek R1', score: '91.2', icon: Sparkles },
            { title: 'Long Context (1M+)', top: 'Gemini 2.5 Pro', score: '98.5', icon: Layers },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-xs font-bold text-neutral-700">{item.title}</span>
                  <Icon className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold font-mono text-neutral-900">{item.score}</div>
                <div className="text-[11px] text-neutral-500 mt-1">Leader: <strong className="text-neutral-700">{item.top}</strong></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 6: BENCHMARKS ================= */}
      <section id="intelligence-breakdown" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Benchmarks</h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Intelligence Evaluations: Breakdown of the 10 standardized evaluations comprising the Artificial Analysis Intelligence Index v4.3.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { id: 'AA-Briefcase', desc: 'Frontier agentic evaluation for long-horizon knowledge work (spreadsheets, presentations, memos)' },
              { id: 'AutomationBench-AA', desc: 'Real-world multi-step software and API automation challenges' },
              { id: 'Terminal-Bench v4.0', desc: 'Autonomous command line navigation, debugging, and environment setup' },
              { id: 'GDPval-AA v2', desc: 'Economic and financial workflow analysis with multi-table cross-verification' },
              { id: 'SciCode', desc: 'Complex scientific problems requiring specialized algorithm and mathematics implementation' },
              { id: 'Humanity\'s Last Exam', desc: 'Multidisciplinary benchmark probing expert-level reasoning boundaries' },
              { id: 'GDP.pdf', desc: 'Complex document parsing with multi-column financial and regulatory tables' },
              { id: 'CritPt', desc: 'Critical point physics, chemical kinetics, and thermodynamic modeling' },
              { id: 'AA-Omniscience', desc: 'Precision truthfulness, factual accuracy, and hallucination resistance' },
              { id: 'AA-LCR v1.1', desc: 'Long-context multi-needle needle-in-a-haystack retrieval precision' },
            ].map((b, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/50">
                <span className="font-bold text-neutral-900 font-mono">{b.id}</span>
                <p className="text-neutral-500 mt-1 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: OPENNESS INDEX ================= */}
      <section id="openness" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Openness Index</h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Artificial Analysis Openness Index assesses how &apos;open&apos; models are on the basis of their availability and transparency across pre-training data, post-training data, methodology, and model weights.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Model</th>
                <th className="py-2.5 px-3">Weights Availability</th>
                <th className="py-2.5 px-3">Methodology</th>
                <th className="py-2.5 px-3">Pre-training Data</th>
                <th className="py-2.5 px-3">Overall Openness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {[
                { name: 'Nemotron 3 Ultra', creator: 'Nvidia', weights: 'Open Weights', meth: 'Detailed Paper', data: 'Curated Info', score: '8.5 / 10' },
                { name: 'DeepSeek V3 / R1', creator: 'DeepSeek', weights: 'Open Weights', meth: 'Full Architecture Paper', data: 'Filtered Spec', score: '8.0 / 10' },
                { name: 'Llama 3.3 70B', creator: 'Meta', weights: 'Open Weights', meth: 'Technical Report', data: 'High-Level Overview', score: '7.5 / 10' },
                { name: 'Qwen 2.5 72B', creator: 'Alibaba', weights: 'Open Weights', meth: 'Paper Published', data: 'Synthetic + Crawl', score: '7.5 / 10' },
                { name: 'Mistral Large 2', creator: 'Mistral', weights: 'Commercial Open', meth: 'Summary Post', data: 'Proprietary', score: '6.0 / 10' },
                { name: 'GPT-5 / Claude 3.7', creator: 'OpenAI/Anthropic', weights: 'API Only', meth: 'System Card', data: 'Proprietary', score: '2.0 / 10' },
              ].map((m, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-neutral-900 flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={14} />
                    <span>{m.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-neutral-700">{m.weights}</td>
                  <td className="py-2.5 px-3 text-neutral-700">{m.meth}</td>
                  <td className="py-2.5 px-3 text-neutral-700">{m.data}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700 font-mono">{m.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= SECTION 8: OUTPUT TOKENS ================= */}
      <section id="output-tokens" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Output Tokens</h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Output tokens of leading AI models based on independent evaluations: comparing reasoning budget tokens vs final answer tokens.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="space-y-3 text-xs">
            {[
              { name: 'Claude 3.7 Sonnet (Thinking max)', reasoning: '64,000 tokens', answer: '128,000 tokens', context: '200K' },
              { name: 'o3-mini (High reasoning effort)', reasoning: '100,000 tokens', answer: '100,000 tokens', context: '200K' },
              { name: 'Gemini 2.5 Pro (Deep Think)', reasoning: '32,000 tokens', answer: '64,000 tokens', context: '2M' },
              { name: 'DeepSeek R1', reasoning: '32,768 tokens', answer: '64,000 tokens', context: '128K' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-neutral-100">
                <span className="font-semibold text-neutral-900">{item.name}</span>
                <div className="flex items-center gap-4 text-neutral-600 font-mono">
                  <span>Reasoning: <strong className="text-purple-700">{item.reasoning}</strong></span>
                  <span>Answer: <strong className="text-neutral-900">{item.answer}</strong></span>
                  <span>Context: <strong className="text-neutral-900">{item.context}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 9: COST ================= */}
      <section id="price-and-cost" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Cost</h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Price and real-world costs of leading AI models based on standardized task benchmarks: input token price, output token price, prompt caching discounts, and normalized cost per Intelligence Index task.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Model</th>
                <th className="py-2.5 px-3">Input / 1M</th>
                <th className="py-2.5 px-3">Output / 1M</th>
                <th className="py-2.5 px-3">Cache Read / 1M</th>
                <th className="py-2.5 px-3">Cost per Task</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono">
              {[
                { name: 'Gemini 2.5 Flash', creator: 'Google', in: '$0.075', out: '$0.30', cache: '$0.018', task: '$0.008' },
                { name: 'DeepSeek V3', creator: 'DeepSeek', in: '$0.14', out: '$0.28', cache: '$0.014', task: '$0.012' },
                { name: 'GPT-4o mini', creator: 'OpenAI', in: '$0.15', out: '$0.60', cache: '$0.075', task: '$0.019' },
                { name: 'Claude 3.5 Haiku', creator: 'Anthropic', in: '$0.80', out: '$4.00', cache: '$0.08', task: '$0.085' },
                { name: 'GPT-4o', creator: 'OpenAI', in: '$2.50', out: '$10.00', cache: '$1.25', task: '$0.245' },
                { name: 'Claude 3.7 Sonnet', creator: 'Anthropic', in: '$3.00', out: '$15.00', cache: '$0.30', task: '$0.320' },
                { name: 'Claude 3.5 Opus', creator: 'Anthropic', in: '$15.00', out: '$75.00', cache: '$1.50', task: '$1.850' },
              ].map((m, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-neutral-900 font-sans flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={14} />
                    <span>{m.name}</span>
                  </td>
                  <td className="py-2.5 px-3 text-neutral-700">{m.in}</td>
                  <td className="py-2.5 px-3 text-neutral-700">{m.out}</td>
                  <td className="py-2.5 px-3 text-emerald-700">{m.cache}</td>
                  <td className="py-2.5 px-3 font-bold text-neutral-900">{m.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= SECTION 10: SPEED & LATENCY ================= */}
      <section id="speed" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Speed &amp; Latency</h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Comparison of first-party API performance: Output speed (tokens per second), Time to First Token (TTFT ms), and total execution time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold font-serif mb-4 flex items-center justify-between">
              <span>Output Speed (Tokens / Sec)</span>
              <span className="text-xs text-neutral-400 font-normal">Higher is better</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Gemini 2.5 Flash', creator: 'Google', speed: 285 },
                { name: 'Groq Llama 3.3 70B', creator: 'Meta', speed: 275 },
                { name: 'GPT-4o mini', creator: 'OpenAI', speed: 145 },
                { name: 'DeepSeek V3', creator: 'DeepSeek', speed: 92 },
                { name: 'Claude 3.7 Sonnet', creator: 'Anthropic', speed: 78 },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5">
                  <span className="font-semibold text-neutral-900 flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={14} />
                    <span>{m.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-neutral-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(m.speed / 300) * 100}%` }} />
                    </div>
                    <span className="font-mono font-bold text-neutral-900 w-14 text-right">{m.speed} tps</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold font-serif mb-4 flex items-center justify-between">
              <span>Time to First Token (Latency TTFT)</span>
              <span className="text-xs text-neutral-400 font-normal">Lower is better</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Cerebras Llama 3.3', creator: 'Meta', latency: 190 },
                { name: 'Groq Llama 3.3', creator: 'Meta', latency: 240 },
                { name: 'Gemini 2.5 Flash', creator: 'Google', latency: 310 },
                { name: 'GPT-4o mini', creator: 'OpenAI', latency: 420 },
                { name: 'Claude 3.7 Sonnet', creator: 'Anthropic', latency: 680 },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5">
                  <span className="font-semibold text-neutral-900 flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={14} />
                    <span>{m.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-neutral-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.max(15, 100 - (m.latency / 800) * 100)}%` }} />
                    </div>
                    <span className="font-mono font-bold text-neutral-900 w-14 text-right">{m.latency} ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 11: PROVIDERS ================= */}
      <section id="providers" className="scroll-mt-24 pt-6 border-t border-neutral-200">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 bg-black rounded-sm" aria-hidden="true" />
            <h2 className="text-2xl font-bold font-serif text-black">Providers</h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-3xl">
            Endpoint Accuracy Index, hosting latencies, and independent benchmark audits across major API inference cloud providers.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Provider</th>
                <th className="py-2.5 px-3">Endpoint Accuracy Index</th>
                <th className="py-2.5 px-3">Median TTFT</th>
                <th className="py-2.5 px-3">Throughput (TPS)</th>
                <th className="py-2.5 px-3">Uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono">
              {[
                { name: 'Together AI', accuracy: '99.8%', ttft: '280 ms', tps: '185 tps', uptime: '99.98%' },
                { name: 'Groq Cloud', accuracy: '99.9%', ttft: '210 ms', tps: '480 tps', uptime: '99.95%' },
                { name: 'Cerebras Inference', accuracy: '99.7%', ttft: '180 ms', tps: '1,650 tps', uptime: '99.92%' },
                { name: 'Fireworks AI', accuracy: '99.9%', ttft: '240 ms', tps: '210 tps', uptime: '99.99%' },
                { name: 'DeepInfra', accuracy: '99.6%', ttft: '310 ms', tps: '140 tps', uptime: '99.91%' },
                { name: 'AWS Bedrock', accuracy: '100.0%', ttft: '450 ms', tps: '95 tps', uptime: '99.99%' },
                { name: 'Azure AI Studio', accuracy: '100.0%', ttft: '420 ms', tps: '110 tps', uptime: '99.99%' },
              ].map((p, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-neutral-900 font-sans">{p.name}</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-bold">{p.accuracy}</td>
                  <td className="py-2.5 px-3 text-neutral-700">{p.ttft}</td>
                  <td className="py-2.5 px-3 text-purple-700 font-bold">{p.tps}</td>
                  <td className="py-2.5 px-3 text-neutral-600">{p.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
