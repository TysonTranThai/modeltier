'use client';

import React from 'react';
import { ScrapedModel } from '../../types';
import { CompanyLogo, getCreatorColor } from './CompanyLogo';
import { useLanguage } from '../../context/LanguageContext';
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
  Calculator,
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface CloneSectionsProps {
  models: ScrapedModel[];
  onSelectModel?: (model: ScrapedModel) => void;
}

export const CloneSections: React.FC<CloneSectionsProps> = ({
  models,
  onSelectModel,
}) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-16 mt-16 text-[#FFF6EE]">
      {/* ================= SECTION 2: CODING AGENT INDEX ================= */}
      <section id="coding-agents" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Chỉ số Tác tử Lập trình' : 'Coding Agent Index'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (Coding Agent Index)
              </span>
            </h2>
            <span className="rounded-sm bg-[#FF6B35]/20 text-[#FF8452] border border-[#FF6B35]/30 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5">
              {language === 'vi' ? 'Mới cập nhật' : 'Updated'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Đánh giá năng lực giải quyết bài toán kỹ thuật phần mềm thực tế trọn gói: tỷ lệ sửa lỗi thành công, chi phí mỗi tác vụ và thời gian thực thi (SWE-bench Verified & Terminal-Bench v4.0).'
              : 'Performance, cost, and execution time for leading coding agents on end-to-end software engineering tasks (SWE-bench Verified & Terminal-Bench v4.0).'}
          </p>
        </div>

        <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md w-full max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-3 border-b border-[#2C160C] gap-2">
            <h3 className="text-base font-bold font-serif flex items-center gap-2 text-[#FFF6EE]">
              <span>
                {language === 'vi' 
                  ? 'Bảng xếp hạng Tác tử Lập trình Độc lập' 
                  : 'Agentic Software Engineering Benchmarks'}
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#FF8452]" />
            </h3>
            <span className="text-xs text-[#A89280] font-mono">
              {language === 'vi' ? 'SWE-bench Verified (% Giải quyết)' : 'SWE-bench Verified % Resolved'}
            </span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Claude 3.7 Sonnet (Thinking) + Claude Code', creator: 'Anthropic', score: 70.3, cost: '$1.42', speed: '4m 12s' },
              { name: 'Cursor Agent (Claude 3.7 Sonnet)', creator: 'Anthropic', score: 68.8, cost: '$1.25', speed: '3m 48s' },
              { name: 'Devin 2.0 (Cognition)', creator: 'Cognition', score: 65.2, cost: '$2.10', speed: '5m 30s' },
              { name: 'OpenAI Operator / Codex 5.6', creator: 'OpenAI', score: 64.9, cost: '$1.80', speed: '4m 05s' },
              { name: 'Cline + DeepSeek V3', creator: 'DeepSeek', score: 58.4, cost: '$0.32', speed: '4m 50s' },
              { name: 'Aider + Qwen 2.5 Coder 32B', creator: 'Alibaba', score: 54.6, cost: '$0.28', speed: '3m 15s' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-sm hover:bg-[#25120B] border border-[#2C160C] transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="text-xs font-mono text-[#8A7262] w-5">#{idx + 1}</span>
                  <CompanyLogo creator={item.creator} size={16} />
                  <span className="text-sm font-semibold text-[#FFF6EE]">{item.name}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono">
                  <span className="text-[#A89280]">{language === 'vi' ? 'Chi phí:' : 'Cost:'} <strong className="text-[#FFF6EE]">{item.cost}</strong></span>
                  <span className="text-[#A89280]">{language === 'vi' ? 'Thời gian:' : 'Time:'} <strong className="text-[#FFF6EE]">{item.speed}</strong></span>
                  <div className="flex items-center gap-2 w-28 sm:w-32 justify-end">
                    <div className="w-14 sm:w-16 bg-[#120703] h-2.5 rounded-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-[#E64A19] to-[#FF6B35] h-full rounded-sm" style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="font-bold text-[#FF8452]">{item.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: IMAGE & VIDEO ================= */}
      <section id="media-leaderboards" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Hình ảnh & Video AI' : 'Image & Video'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (Image &amp; Video Arena)
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Xếp hạng các mô hình tạo sinh hình ảnh và video hàng đầu dựa trên khảo sát mù nhân loại (Human Elo Arena) với khoảng tin cậy 95%.'
              : 'Top models from our Image Arena and Video Arena leaderboards, with 95% confidence intervals and human Elo preferences.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-full">
          {/* Image Arena */}
          <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md w-full max-w-full overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2C160C]">
              <h3 className="text-base font-bold font-serif flex items-center gap-2 text-[#FFF6EE]">
                <span>{language === 'vi' ? 'Đấu trường Tạo Ảnh (Text-to-Image)' : 'Text to Image Arena'}</span>
                <ArrowUpRight className="h-4 w-4 text-[#FF8452]" />
              </h3>
              <span className="text-xs text-[#A89280] font-mono">Điểm Arena Elo</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Midjourney v6.1', creator: 'Midjourney', elo: 1248 },
                { name: 'Flux 1.1 Pro', creator: 'Black Forest Labs', elo: 1232 },
                { name: 'Imagen 3 (Fast)', creator: 'Google', elo: 1205 },
                { name: 'DALL-E 3 HD', creator: 'OpenAI', elo: 1180 },
                { name: 'Stable Diffusion 3.5 Large', creator: 'Stability AI', elo: 1162 },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-[#2C160C] last:border-0 font-mono">
                  <span className="font-semibold text-[#FFF6EE] flex items-center gap-2 font-sans">
                    <span className="text-[#8A7262] font-mono">#{idx + 1}</span>
                    <span>{m.name}</span>
                  </span>
                  <span className="font-bold text-[#FF8452] font-mono">{m.elo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Arena */}
          <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md w-full max-w-full overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2C160C]">
              <h3 className="text-base font-bold font-serif flex items-center gap-2 text-[#FFF6EE]">
                <span>{language === 'vi' ? 'Đấu trường Tạo Video (Text-to-Video)' : 'Text to Video Arena'}</span>
                <ArrowUpRight className="h-4 w-4 text-[#FF8452]" />
              </h3>
              <span className="text-xs text-[#A89280] font-mono">Điểm Arena Elo</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Kling 1.5 Pro', creator: 'Kuaishou', elo: 1260 },
                { name: 'Sora Video', creator: 'OpenAI', elo: 1255 },
                { name: 'Runway Gen-3 Alpha Turbo', creator: 'Runway', elo: 1240 },
                { name: 'Luma Dream Machine 1.5', creator: 'Luma AI', elo: 1210 },
                { name: 'Hailuo MiniMax Video 01', creator: 'MiniMax', elo: 1195 },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-[#2C160C] last:border-0 font-mono">
                  <span className="font-semibold text-[#FFF6EE] flex items-center gap-2 font-sans">
                    <span className="text-[#8A7262] font-mono">#{idx + 1}</span>
                    <span>{m.name}</span>
                  </span>
                  <span className="font-bold text-[#FF8452] font-mono">{m.elo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: SPEECH ================= */}
      <section id="speech-leaderboards" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Âm thanh & Giọng nói' : 'Speech'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (Speech Leaderboards)
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Xếp hạng mô hình chuyển văn bản thành giọng nói (TTS), nhận dạng âm thanh (STT) và độ trễ giao tiếp thời gian thực hai chiều.'
              : 'Top models from our Text to Speech Arena, Speech to Text and Speech to Speech evaluations measuring quality Elo and latency.'}
          </p>
        </div>

        <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md w-full max-w-full overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="border-b sm:border-b-0 sm:border-r border-[#2C160C] pb-4 sm:pb-0 sm:pr-4">
              <h4 className="text-xs font-bold text-[#A89280] uppercase tracking-wider mb-3 font-mono">
                {language === 'vi' ? 'Chất lượng Giọng đọc TTS' : 'Text to Speech Quality'}
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold"><span>ElevenLabs v2</span><span className="font-mono text-[#FF8452]">1276 Elo</span></div>
                <div className="flex justify-between text-[#C7B299]"><span>OpenAI TTS HD</span><span className="font-mono">1215 Elo</span></div>
                <div className="flex justify-between text-[#C7B299]"><span>Cartesia Sonic</span><span className="font-mono">1198 Elo</span></div>
              </div>
            </div>

            <div className="border-b sm:border-b-0 sm:border-r border-[#2C160C] pb-4 sm:pb-0 sm:pr-4">
              <h4 className="text-xs font-bold text-[#A89280] uppercase tracking-wider mb-3 font-mono">
                {language === 'vi' ? 'Nhận dạng Giọng nói STT' : 'Speech to Text Accuracy'}
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold"><span>Whisper Large v3</span><span className="font-mono text-emerald-400">97.2%</span></div>
                <div className="flex justify-between text-[#C7B299]"><span>Nova-2 (Deepgram)</span><span className="font-mono">96.8%</span></div>
                <div className="flex justify-between text-[#C7B299]"><span>AssemblyAI Conformer</span><span className="font-mono">95.4%</span></div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#A89280] uppercase tracking-wider mb-3 font-mono">
                {language === 'vi' ? 'Độ trễ Giao tiếp Trực tiếp' : 'Speech to Speech Latency'}
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-semibold"><span>GPT-4o Realtime</span><span className="font-mono text-[#FF8452]">320 ms</span></div>
                <div className="flex justify-between text-[#C7B299]"><span>Gemini 2.0 Flash Live</span><span className="font-mono">350 ms</span></div>
                <div className="flex justify-between text-[#C7B299]"><span>Ultravox v0.4</span><span className="font-mono">410 ms</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: CAPABILITY INDICES ================= */}
      <section id="capability-indices" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Các Chỉ số Năng lực Chuyên biệt' : 'Capability Indices'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (Capability Indices)
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Chuẩn hoá các chỉ số năng lực theo từng miền chuyên môn: Lập trình, Suy luận logic, Giải toán cao cấp và Xử lý ngữ cảnh siêu dài (1M+ tokens).'
              : 'Normalized capability indices testing deep reasoning, code generation, mathematical mastery, and instruction precision.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-full">
          {[
            { 
              title: language === 'vi' ? 'Chỉ số Lập trình' : 'Coding Index', 
              top: 'Claude 3.7 Sonnet', 
              score: '92.4', 
              icon: Code2 
            },
            { 
              title: language === 'vi' ? 'Chỉ số Suy luận' : 'Reasoning Index', 
              top: 'o3-mini / GPT-5', 
              score: '94.8', 
              icon: Cpu 
            },
            { 
              title: language === 'vi' ? 'Chuyên môn Toán học' : 'Math Mastery', 
              top: 'DeepSeek R1', 
              score: '91.2', 
              icon: Calculator 
            },
            { 
              title: language === 'vi' ? 'Ngữ cảnh Dài (1M+)' : 'Long Context (1M+)', 
              top: 'Gemini 2.5 Pro', 
              score: '98.5', 
              icon: Layers 
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-5 shadow-xl hover:border-[#FF6B35]/60 transition-all w-full max-w-full overflow-hidden">
                <div className="flex items-center justify-between text-[#A89280] mb-2">
                  <span className="text-xs font-bold text-[#C7B299]">{item.title}</span>
                  <Icon className="h-4 w-4 text-[#FF6B35]" />
                </div>
                <div className="text-2xl font-bold font-mono text-[#FFF6EE]">{item.score}</div>
                <div className="text-[11px] text-[#A89280] mt-1">
                  {language === 'vi' ? 'Dẫn đầu:' : 'Leader:'} <strong className="text-[#FF8452]">{item.top}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 6: BENCHMARKS ================= */}
      <section id="intelligence-breakdown" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Chi tiết 10 Bài Đo Chuẩn Hoá' : 'Benchmarks'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (Intelligence Evaluations &amp; Benchmarks)
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Phân tích chi tiết 10 bài kiểm thử cấu thành nên chỉ số Artificial Analysis Intelligence Index v4.3.'
              : 'Intelligence Evaluations: Breakdown of the 10 standardized evaluations comprising the Artificial Analysis Intelligence Index v4.3.'}
          </p>
        </div>

        <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md w-full max-w-full overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { 
                id: 'AA-Briefcase', 
                descVi: 'Đánh giá tác tử AI thực hiện công việc tri thức đường dài (bảng tính tài chính, bài thuyết trình, văn bản memo)', 
                descEn: 'Frontier agentic evaluation for long-horizon knowledge work (spreadsheets, presentations, memos)' 
              },
              { 
                id: 'AutomationBench-AA', 
                descVi: 'Thử thách tự động hoá đa bước trên phần mềm và API thực tế của doanh nghiệp', 
                descEn: 'Real-world multi-step software and API automation challenges' 
              },
              { 
                id: 'Terminal-Bench v4.0', 
                descVi: 'Năng lực điều hướng dòng lệnh độc lập (CLI), cài đặt môi trường và gỡ lỗi máy chủ', 
                descEn: 'Autonomous command line navigation, debugging, and environment setup' 
              },
              { 
                id: 'GDPval-AA v2', 
                descVi: 'Phân tích luồng nghiệp vụ kinh tế tài chính phức tạp với kiểm chứng chéo đa bảng dữ liệu', 
                descEn: 'Economic and financial workflow analysis with multi-table cross-verification' 
              },
              { 
                id: 'SciCode', 
                descVi: 'Bài toán khoa học chuyên sâu yêu cầu tự cài đặt thuật toán và mô hình toán học giải tích', 
                descEn: 'Complex scientific problems requiring specialized algorithm and mathematics implementation' 
              },
              { 
                id: 'Humanity\'s Last Exam', 
                descVi: 'Bài kiểm tra đa ngành đỉnh cao thử thách ranh giới tư duy cấp độ chuyên gia nhân loại', 
                descEn: 'Multidisciplinary benchmark probing expert-level reasoning boundaries' 
              },
              { 
                id: 'GDP.pdf', 
                descVi: 'Trích xuất và đọc hiểu tài liệu phức tạp chứa bảng biểu quy chuẩn kinh tế nhiều cột', 
                descEn: 'Complex document parsing with multi-column financial and regulatory tables' 
              },
              { 
                id: 'CritPt', 
                descVi: 'Vật lý điểm tới hạn, động học hoá chất và mô hình hoá nhiệt động lực học', 
                descEn: 'Critical point physics, chemical kinetics, and thermodynamic modeling' 
              },
              { 
                id: 'AA-Omniscience', 
                descVi: 'Độ chuẩn xác thông tin sự thật, khả năng kháng ảo giác (anti-hallucination) và đối chiếu nguồn tin', 
                descEn: 'Precision truthfulness, factual accuracy, and hallucination resistance' 
              },
              { 
                id: 'AA-LCR v1.1', 
                descVi: 'Độ chính xác truy xuất kim trong đáy biển (needle-in-a-haystack) trên ngữ cảnh dài', 
                descEn: 'Long-context multi-needle needle-in-a-haystack retrieval precision' 
              },
            ].map((b, idx) => (
              <div key={idx} className="p-3.5 rounded-sm border border-[#2C160C] bg-[#140A06]/80">
                <span className="font-bold text-[#FF8452] font-mono text-sm">{b.id}</span>
                <p className="text-[#A89280] mt-1.5 leading-relaxed">
                  {language === 'vi' ? b.descVi : b.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: OPENNESS INDEX ================= */}
      <section id="openness" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Độ Mở Trọng số & Mã Nguồn' : 'Openness Index'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (Openness Index)
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Chỉ số Openness Index đo lường mức độ minh bạch của mô hình AI dựa trên 4 trụ cột: tính khả dụng của trọng số mô hình, công bố phương pháp luận huấn luyện, dữ liệu tiền huấn luyện và quyền tự do chạy self-hosted.'
              : 'Artificial Analysis Openness Index assesses how \'open\' models are on the basis of their availability and transparency across pre-training data, post-training data, methodology, and model weights.'}
          </p>
        </div>

        <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-3 sm:p-6 shadow-2xl backdrop-blur-md overflow-x-auto w-full max-w-full">
          <table className="w-full text-left text-xs border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-[#2C160C] text-[#A89280] font-semibold uppercase tracking-wider font-mono">
                <th className="py-3 px-3">{language === 'vi' ? 'Mô hình' : 'Model'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Khả dụng Trọng số' : 'Weights Availability'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Phương pháp luận' : 'Methodology'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Dữ liệu Huấn luyện' : 'Pre-training Data'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Điểm Độ Mở' : 'Overall Openness'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C160C]">
              {[
                { name: 'Nemotron 3 Ultra', creator: 'Nvidia', weights: language === 'vi' ? 'Mở Trọng số' : 'Open Weights', meth: language === 'vi' ? 'Báo cáo Chi tiết' : 'Detailed Paper', data: language === 'vi' ? 'Công bố Chọn lọc' : 'Curated Info', score: '8.5 / 10' },
                { name: 'DeepSeek V3 / R1', creator: 'DeepSeek', weights: language === 'vi' ? 'Mở Trọng số' : 'Open Weights', meth: language === 'vi' ? 'Toàn bộ Kiến trúc' : 'Full Architecture Paper', data: language === 'vi' ? 'Quy chuẩn Bộ lọc' : 'Filtered Spec', score: '8.0 / 10' },
                { name: 'Llama 3.3 70B', creator: 'Meta', weights: language === 'vi' ? 'Mở Trọng số' : 'Open Weights', meth: language === 'vi' ? 'Báo cáo Kỹ thuật' : 'Technical Report', data: language === 'vi' ? 'Tổng quan Vĩ mô' : 'High-Level Overview', score: '7.5 / 10' },
                { name: 'Qwen 2.5 72B', creator: 'Alibaba', weights: language === 'vi' ? 'Mở Trọng số' : 'Open Weights', meth: language === 'vi' ? 'Đã Xuất bản Paper' : 'Paper Published', data: language === 'vi' ? 'Dữ liệu Tổng hợp' : 'Synthetic + Crawl', score: '7.5 / 10' },
                { name: 'Mistral Large 2', creator: 'Mistral', weights: language === 'vi' ? 'Mở Thương mại' : 'Commercial Open', meth: language === 'vi' ? 'Bài viết Tóm tắt' : 'Summary Post', data: language === 'vi' ? 'Độc quyền' : 'Proprietary', score: '6.0 / 10' },
                { name: 'GPT-5 / Claude 3.7', creator: 'OpenAI/Anthropic', weights: language === 'vi' ? 'Chỉ qua API Cloud' : 'API Only', meth: language === 'vi' ? 'System Card An toàn' : 'System Card', data: language === 'vi' ? 'Độc quyền Hoàn toàn' : 'Proprietary', score: '2.0 / 10' },
              ].map((m, idx) => (
                <tr key={idx} className="hover:bg-[#25120B] transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#FFF6EE] flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={15} />
                    <span>{m.name}</span>
                  </td>
                  <td className="py-3 px-3 text-[#C7B299]">{m.weights}</td>
                  <td className="py-3 px-3 text-[#C7B299]">{m.meth}</td>
                  <td className="py-3 px-3 text-[#C7B299]">{m.data}</td>
                  <td className="py-3 px-3 font-bold text-emerald-400 font-mono">{m.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= SECTION 8: OUTPUT TOKENS ================= */}
      <section id="output-tokens" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Độ Dài & Ngân Sách Token Đầu Ra' : 'Output Tokens'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (Output Tokens)
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Phân tích số lượng token tối đa mô hình có thể sinh ra trong một phản hồi, đặc biệt là sự phân bổ giữa chuỗi suy luận ngầm (thinking budget) và câu trả lời hoàn chỉnh.'
              : 'Output tokens of leading AI models based on independent evaluations: comparing reasoning budget tokens vs final answer tokens.'}
          </p>
        </div>

        <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md w-full max-w-full overflow-hidden">
          <div className="space-y-3 text-xs">
            {[
              { name: 'Claude 3.7 Sonnet (Thinking max)', reasoning: '64,000 tokens', answer: '128,000 tokens', context: '200K' },
              { name: 'o3-mini (High reasoning effort)', reasoning: '100,000 tokens', answer: '100,000 tokens', context: '200K' },
              { name: 'Gemini 2.5 Pro (Deep Think)', reasoning: '32,000 tokens', answer: '64,000 tokens', context: '2M' },
              { name: 'DeepSeek R1', reasoning: '32,768 tokens', answer: '64,000 tokens', context: '128K' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-3.5 rounded-sm border border-[#2C160C] bg-[#140A06]/70">
                <span className="font-semibold text-[#FFF6EE] text-sm">{item.name}</span>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[#A89280] font-mono">
                  <span>{language === 'vi' ? 'Suy luận (Reasoning):' : 'Reasoning:'} <strong className="text-[#FF8452]">{item.reasoning}</strong></span>
                  <span>{language === 'vi' ? 'Câu trả lời:' : 'Answer:'} <strong className="text-[#FFF6EE]">{item.answer}</strong></span>
                  <span>{language === 'vi' ? 'Ngữ cảnh:' : 'Context:'} <strong className="text-[#FFF6EE]">{item.context}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 9: COST ================= */}
      <section id="price-and-cost" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Chi Phí & Định Giá Thực Chiến' : 'Cost'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (Price and Cost Index)
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Chi phí sử dụng API chuẩn hoá: Giá nạp token đầu vào, giá sinh token đầu ra, chiết khấu đọc cache (Prompt Caching) và chi phí thực tế cho mỗi bài đo trí tuệ tiêu chuẩn.'
              : 'Price and real-world costs of leading AI models based on standardized task benchmarks: input token price, output token price, prompt caching discounts, and normalized cost per Intelligence Index task.'}
          </p>
        </div>

        <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-3 sm:p-6 shadow-2xl backdrop-blur-md overflow-x-auto w-full max-w-full">
          <table className="w-full text-left text-xs border-collapse font-mono min-w-[550px]">
            <thead>
              <tr className="border-b border-[#2C160C] text-[#A89280] font-semibold uppercase tracking-wider">
                <th className="py-3 px-3 font-sans">{language === 'vi' ? 'Mô hình' : 'Model'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Đầu vào / 1M' : 'Input / 1M'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Đầu ra / 1M' : 'Output / 1M'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Đọc Cache / 1M' : 'Cache Read / 1M'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Chi phí / Tác vụ' : 'Cost per Task'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C160C]">
              {[
                { name: 'Gemini 2.5 Flash', creator: 'Google', in: '$0.075', out: '$0.30', cache: '$0.018', task: '$0.008' },
                { name: 'DeepSeek V3', creator: 'DeepSeek', in: '$0.14', out: '$0.28', cache: '$0.014', task: '$0.012' },
                { name: 'GPT-4o mini', creator: 'OpenAI', in: '$0.15', out: '$0.60', cache: '$0.075', task: '$0.019' },
                { name: 'Claude 3.5 Haiku', creator: 'Anthropic', in: '$0.80', out: '$4.00', cache: '$0.08', task: '$0.085' },
                { name: 'GPT-4o', creator: 'OpenAI', in: '$2.50', out: '$10.00', cache: '$1.25', task: '$0.245' },
                { name: 'Claude 3.7 Sonnet', creator: 'Anthropic', in: '$3.00', out: '$15.00', cache: '$0.30', task: '$0.320' },
                { name: 'Claude 3.5 Opus', creator: 'Anthropic', in: '$15.00', out: '$75.00', cache: '$1.50', task: '$1.850' },
              ].map((m, idx) => (
                <tr key={idx} className="hover:bg-[#25120B] transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#FFF6EE] font-sans flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={15} />
                    <span>{m.name}</span>
                  </td>
                  <td className="py-3 px-3 text-[#C7B299]">{m.in}</td>
                  <td className="py-3 px-3 text-[#C7B299]">{m.out}</td>
                  <td className="py-3 px-3 text-emerald-400">{m.cache}</td>
                  <td className="py-3 px-3 font-bold text-[#FF8452]">{m.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= SECTION 10: SPEED & LATENCY ================= */}
      <section id="speed" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Tốc Độ & Độ Trễ Hạ Tầng' : 'Speed & Latency'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (Speed &amp; Latency)
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Đo lường trực tiếp từ cụm API chính thức: Tốc độ sinh token (tokens mỗi giây), Độ trễ nhận gói đầu tiên (Time to First Token - TTFT) và thời gian hoàn thành tác vụ.'
              : 'Comparison of first-party API performance: Output speed (tokens per second), Time to First Token (TTFT ms), and total execution time.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-full">
          <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md w-full max-w-full overflow-hidden">
            <h3 className="text-base font-bold font-serif mb-4 flex items-center justify-between text-[#FFF6EE]">
              <span>{language === 'vi' ? 'Tốc độ Sinh Token (Tokens / Giây)' : 'Output Speed (Tokens / Sec)'}</span>
              <span className="text-xs text-[#A89280] font-normal font-mono">
                {language === 'vi' ? 'Càng cao càng tốt' : 'Higher is better'}
              </span>
            </h3>
            <div className="space-y-3.5">
              {[
                { name: 'Gemini 2.5 Flash', creator: 'Google', speed: 285 },
                { name: 'Groq Llama 3.3 70B', creator: 'Meta', speed: 275 },
                { name: 'GPT-4o mini', creator: 'OpenAI', speed: 145 },
                { name: 'DeepSeek V3', creator: 'DeepSeek', speed: 92 },
                { name: 'Claude 3.7 Sonnet', creator: 'Anthropic', speed: 78 },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5">
                  <span className="font-semibold text-[#FFF6EE] flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={15} />
                    <span>{m.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-[#120703] h-2 rounded-sm overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-[#FF6B35] h-full rounded-sm" style={{ width: `${(m.speed / 300) * 100}%` }} />
                    </div>
                    <span className="font-mono font-bold text-[#FFF6EE] w-14 text-right">{m.speed} tps</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md w-full max-w-full overflow-hidden">
            <h3 className="text-base font-bold font-serif mb-4 flex items-center justify-between text-[#FFF6EE]">
              <span>{language === 'vi' ? 'Độ trễ Gói Đầu (TTFT Latency)' : 'Time to First Token (Latency TTFT)'}</span>
              <span className="text-xs text-[#A89280] font-normal font-mono">
                {language === 'vi' ? 'Càng thấp càng tốt' : 'Lower is better'}
              </span>
            </h3>
            <div className="space-y-3.5">
              {[
                { name: 'Cerebras Llama 3.3', creator: 'Meta', latency: 190 },
                { name: 'Groq Llama 3.3', creator: 'Meta', latency: 240 },
                { name: 'Gemini 2.5 Flash', creator: 'Google', latency: 310 },
                { name: 'GPT-4o mini', creator: 'OpenAI', latency: 420 },
                { name: 'Claude 3.7 Sonnet', creator: 'Anthropic', latency: 680 },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5">
                  <span className="font-semibold text-[#FFF6EE] flex items-center gap-2">
                    <CompanyLogo creator={m.creator} size={15} />
                    <span>{m.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-[#120703] h-2 rounded-sm overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-sm" style={{ width: `${Math.max(15, 100 - (m.latency / 800) * 100)}%` }} />
                    </div>
                    <span className="font-mono font-bold text-[#FFF6EE] w-14 text-right">{m.latency} ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 11: PROVIDERS ================= */}
      <section id="providers" className="scroll-mt-24 pt-8 border-t border-[#331A10]">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 bg-[#FF6B35] rounded-sm shadow-glow-orange" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF6EE]">
              {language === 'vi' ? 'Hạ Tầng Nhà Cung Cấp Cloud' : 'Providers'}
              <span className="text-xs sm:text-sm font-sans text-[#8A7262] font-normal ml-2">
                (API Inference Providers)
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#C7B299] max-w-3xl font-light leading-relaxed">
            {language === 'vi'
              ? 'Chỉ số độ chuẩn xác API (Endpoint Accuracy Index), độ trễ trung vị TTFT, thông lượng xử lý và thời gian hoạt động ổn định (SLA Uptime) của các nhà cung cấp hạ tầng đám mây toàn cầu.'
              : 'Endpoint Accuracy Index, hosting latencies, and independent benchmark audits across major API inference cloud providers.'}
          </p>
        </div>

        <div className="rounded-sm border border-[#3D2216] bg-[#1E0F09]/95 p-3 sm:p-6 shadow-2xl backdrop-blur-md overflow-x-auto w-full max-w-full">
          <table className="w-full text-left text-xs border-collapse font-mono min-w-[620px]">
            <thead>
              <tr className="border-b border-[#2C160C] text-[#A89280] font-semibold uppercase tracking-wider font-sans">
                <th className="py-3 px-3">{language === 'vi' ? 'Nhà cung cấp' : 'Provider'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Độ chuẩn Endpoint' : 'Endpoint Accuracy Index'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Trung vị TTFT' : 'Median TTFT'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Thông lượng (TPS)' : 'Throughput (TPS)'}</th>
                <th className="py-3 px-3">{language === 'vi' ? 'Thời gian sẵn sàng' : 'Uptime'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C160C]">
              {[
                { name: 'Together AI', accuracy: '99.8%', ttft: '280 ms', tps: '185 tps', uptime: '99.98%' },
                { name: 'Groq Cloud', accuracy: '99.9%', ttft: '210 ms', tps: '480 tps', uptime: '99.95%' },
                { name: 'Cerebras Inference', accuracy: '99.7%', ttft: '180 ms', tps: '1,650 tps', uptime: '99.92%' },
                { name: 'Fireworks AI', accuracy: '99.9%', ttft: '240 ms', tps: '210 tps', uptime: '99.99%' },
                { name: 'DeepInfra', accuracy: '99.6%', ttft: '310 ms', tps: '140 tps', uptime: '99.91%' },
                { name: 'AWS Bedrock', accuracy: '100.0%', ttft: '450 ms', tps: '95 tps', uptime: '99.99%' },
                { name: 'Azure AI Studio', accuracy: '100.0%', ttft: '420 ms', tps: '110 tps', uptime: '99.99%' },
              ].map((p, idx) => (
                <tr key={idx} className="hover:bg-[#25120B] transition-colors">
                  <td className="py-3 px-3 font-semibold text-[#FFF6EE] font-sans">{p.name}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{p.accuracy}</td>
                  <td className="py-3 px-3 text-[#C7B299]">{p.ttft}</td>
                  <td className="py-3 px-3 text-[#FF8452] font-bold">{p.tps}</td>
                  <td className="py-3 px-3 text-[#A89280]">{p.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
