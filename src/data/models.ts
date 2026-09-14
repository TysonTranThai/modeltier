import { Model } from '../types';

export const MODELS_DATA: Model[] = [
  // ================= TIER S =================
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    creator: 'Anthropic',
    tier: 'S',
    category: ['coding', 'reasoning', 'vietnamese'],
    releaseDate: '2025-02',
    vietnameseSummary: 'Mô hình AI lập trình và tư duy mạnh mẽ nhất hiện nay. Có chế độ "Suy nghĩ mở rộng" (hybrid reasoning), viết code cực sạch và hiểu ngữ cảnh tiếng Việt rất tự nhiên.',
    englishSummary: 'The industry-leading AI for coding and hybrid reasoning. Features extended thinking mode, pristine code generation, and outstanding natural context understanding.',
    intelligenceScore: 98,
    vietnameseRating: 95,
    codingScore: 99,
    reasoningScore: 98,
    outputSpeed: 68,
    timeToFirstToken: 0.85,
    inputPricePerMillionUSD: 3.0,
    outputPricePerMillionUSD: 15.0,
    isFreeTierAvailable: true,
    contextWindow: 200000,
    maxOutputTokens: 64000,
    bestFor: {
      vi: ['Lập trình viên chuyên nghiệp', 'Xây dựng dự án phần mềm phức tạp', 'Giải quyết bài toán tư duy logic nhiều bước', 'Dịch thuật kỹ thuật và văn bản đòi hỏi độ chính xác cao'],
      en: ['Senior software engineering', 'Complex architecture & debugging', 'Multi-step advanced reasoning', 'High-precision technical translation']
    },
    pros: {
      vi: ['Khả năng code đứng đầu thế giới hiện nay', 'Suy nghĩ sâu (thinking mode) giải quyết bug khó', 'Văn phong tiếng Việt trôi chảy, không bị dịch máy thô kệch'],
      en: ['World #1 coding capability', 'Hybrid reasoning solves stubborn bugs', 'Fluid prose, minimal robotic artifacts']
    },
    cons: {
      vi: ['Chi phí output tương đối cao ($15/1M token)', 'Tốc độ phản hồi vừa phải khi bật chế độ suy nghĩ'],
      en: ['Output pricing is relatively high ($15/M)', 'Moderate latency when extended thinking is active']
    },
    badge: {
      vi: '👑 Vua Lập Trình & Tư Duy',
      en: '👑 Coding & Reasoning King',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    isOpenWeights: false,
    hasVision: true,
    officialUrl: 'https://www.anthropic.com/claude',
    playgroundUrl: 'https://claude.ai',
    providers: ['Anthropic API', 'AWS Bedrock', 'Google Cloud Vertex AI']
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    creator: 'DeepSeek',
    tier: 'S',
    category: ['reasoning', 'coding', 'budget'],
    releaseDate: '2025-01',
    vietnameseSummary: 'Siêu AI tư duy mở nguồn gây sốc toàn cầu. Sức mạnh giải toán, suy luận logic ngang ngửa OpenAI o1 nhưng giá thành rẻ hơn tới 20-30 lần!',
    englishSummary: 'The breakthrough open-weights reasoning model that shook the industry. Delivers OpenAI o1-grade logical reasoning & math at 1/20th the cost.',
    intelligenceScore: 96,
    vietnameseRating: 88,
    codingScore: 95,
    reasoningScore: 99,
    outputSpeed: 38,
    timeToFirstToken: 1.2,
    inputPricePerMillionUSD: 0.55,
    outputPricePerMillionUSD: 2.19,
    isFreeTierAvailable: true,
    contextWindow: 128000,
    maxOutputTokens: 32768,
    bestFor: {
      vi: ['Giải toán Olympic, thuật toán khó', 'Nghiên cứu khoa học và luận văn', 'Tối ưu hóa chi phí cho tác vụ tư duy cao', 'Tự triển khai trên máy chủ riêng (Self-host)'],
      en: ['Olympiad math & competitive programming', 'Scientific research & analysis', 'Massive cost savings for reasoning tasks', 'Self-hosting on private servers']
    },
    pros: {
      vi: ['Tư duy logic đỉnh cao, giải bài toán cực chi tiết', 'Giá rẻ không tưởng so với các model suy luận khác', 'Mã nguồn mở, cộng đồng đông đảo'],
      en: ['Top-tier step-by-step reasoning', 'Unbeatable price-to-performance ratio', 'Open weights and self-hostable']
    },
    cons: {
      vi: ['Tốc độ sinh chữ chậm hơn các model thông thường', 'API chính hãng đôi khi bị quá tải vào giờ cao điểm', 'Tiếng Việt đôi khi pha trộn chút từ Hán-Việt cổ'],
      en: ['Slower generation due to thinking tokens', 'Official API experiences peak-time congestion', 'Vietnamese phrasing occasionally leans Sino-Vietnamese']
    },
    badge: {
      vi: '🧠 Quái Kiệt Suy Luận Giá Rẻ',
      en: '🧠 Budget Reasoning Beast',
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    },
    isOpenWeights: true,
    hasVision: false,
    officialUrl: 'https://www.deepseek.com',
    playgroundUrl: 'https://chat.deepseek.com',
    providers: ['DeepSeek API', 'Groq', 'Together AI', 'Fireworks AI', 'DeepInfra', 'Azure']
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o (Omni)',
    creator: 'OpenAI',
    tier: 'S',
    category: ['vietnamese', 'coding', 'reasoning'],
    releaseDate: '2024-08',
    vietnameseSummary: 'AI đa năng toàn diện nhất thế giới. Hiểu tiếng Việt cực kỳ tự nhiên, hỗ trợ đa phương thức siêu tốc (văn bản, hình ảnh, giọng nói) và có lượng người dùng đông đảo nhất.',
    englishSummary: 'The world standard for versatile multimodal AI. Exceptional native Vietnamese phrasing, fast multimodal processing (text, vision, audio), and huge ecosystem integration.',
    intelligenceScore: 95,
    vietnameseRating: 97,
    codingScore: 92,
    reasoningScore: 92,
    outputSpeed: 105,
    timeToFirstToken: 0.45,
    inputPricePerMillionUSD: 2.5,
    outputPricePerMillionUSD: 10.0,
    isFreeTierAvailable: true,
    contextWindow: 128000,
    maxOutputTokens: 16384,
    bestFor: {
      vi: ['Trợ lý thông minh hàng ngày cho mọi người', 'Viết lách, sáng tạo nội dung, marketing tiếng Việt', 'Phân tích hình ảnh, biểu đồ, tài liệu scan', 'Ứng dụng thực tế cần độ ổn định 99.9%'],
      en: ['Everyday all-round assistant', 'Creative writing & marketing in Vietnamese', 'Image, diagram & chart interpretation', 'Production apps demanding 99.9% reliability']
    },
    pros: {
      vi: ['Tiếng Việt tự nhiên bậc nhất, hiểu tiếng lóng và văn hóa VN', 'Hệ sinh thái phong phú, kết nối GPTs và Plugins', 'Phản hồi nhanh và rất ổn định'],
      en: ['Top-tier native Vietnamese cultural understanding', 'Massive ecosystem and tool integrations', 'Fast, dependable response times']
    },
    cons: {
      vi: ['Chi phí cao hơn các model thế hệ mới của Google và DeepSeek', 'Khả năng code chuyên sâu kém hơn Claude 3.7 một chút'],
      en: ['More expensive than newer DeepSeek & Gemini models', 'Slightly behind Claude 3.7 in intricate coding']
    },
    badge: {
      vi: '⭐ Toàn Diện & Giỏi Tiếng Việt',
      en: '⭐ All-Round & Vietnamese Ace',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    isOpenWeights: false,
    hasVision: true,
    officialUrl: 'https://openai.com/gpt-4o',
    playgroundUrl: 'https://chatgpt.com',
    providers: ['OpenAI API', 'Microsoft Azure']
  },
  {
    id: 'gemini-2-5-pro',
    name: 'Gemini 2.5 Pro',
    creator: 'Google',
    tier: 'S',
    category: ['reasoning', 'coding', 'vietnamese'],
    releaseDate: '2025-03',
    vietnameseSummary: 'Cỗ máy phân tích tài liệu khổng lồ của Google với cửa sổ ngữ cảnh lên tới 2 triệu token (đọc cùng lúc 40 cuốn sách). Rất giỏi tiếng Việt và xử lý dữ liệu phức tạp.',
    englishSummary: 'Google\'s powerhouse with an unmatched 2M token context window (reads 40 full books simultaneously). Excellent Vietnamese fluency and multimodal depth.',
    intelligenceScore: 96,
    vietnameseRating: 96,
    codingScore: 94,
    reasoningScore: 96,
    outputSpeed: 82,
    timeToFirstToken: 0.7,
    inputPricePerMillionUSD: 1.25,
    outputPricePerMillionUSD: 5.0,
    isFreeTierAvailable: true,
    contextWindow: 2000000,
    maxOutputTokens: 65536,
    bestFor: {
      vi: ['Đọc & tóm tắt toàn bộ sách, bộ luật, báo cáo tài chính dày cộp', 'Lập trình viên cần đưa toàn bộ mã nguồn repo vào ngữ cảnh', 'Nghiên cứu thị trường và dịch thuật văn bản dài', 'Tích hợp dịch vụ Google Workspace'],
      en: ['Whole codebase analysis and large repository ingestion', 'Processing massive PDFs, legal docs & books', 'In-depth research with 2M token memory', 'Google Workspace ecosystem workflows']
    },
    pros: {
      vi: ['Cửa sổ ngữ cảnh 2 triệu token lớn nhất hiện nay', 'Giá rẻ hơn GPT-4o và Claude 3.7 đáng kể', 'Hiểu tiếng Việt rất mượt mà nhờ dữ liệu Google khổng lồ'],
      en: ['Unbeatable 2,000,000 token context capacity', 'Very attractive pricing compared to OpenAI/Anthropic flagship', 'Fluent Vietnamese backed by Google data']
    },
    cons: {
      vi: ['Đôi khi an toàn (censorship) hơi khắt khe với một số chủ đề'],
      en: ['Safety filters can occasionally be overly restrictive']
    },
    badge: {
      vi: '📚 Vua Đọc Tài Liệu 2M Token',
      en: '📚 2M Token Context Titan',
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
    },
    isOpenWeights: false,
    hasVision: true,
    officialUrl: 'https://deepmind.google/technologies/gemini',
    playgroundUrl: 'https://aistudio.google.com',
    providers: ['Google AI Studio', 'Google Cloud Vertex AI']
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    creator: 'DeepSeek',
    tier: 'S',
    category: ['budget', 'coding', 'vietnamese'],
    releaseDate: '2024-12',
    vietnameseSummary: 'Mô hình ngôn ngữ phổ thông xuất sắc nhất về hiệu năng trên giá tiền (P/P). Trí thông minh tiệm cận GPT-4o nhưng giá API rẻ hơn tới 10-15 lần!',
    englishSummary: 'The undisputed champion of price-to-performance. Near GPT-4o intelligence at 1/10th the API cost, capable of general reasoning, code, and chat.',
    intelligenceScore: 93,
    vietnameseRating: 89,
    codingScore: 92,
    reasoningScore: 90,
    outputSpeed: 65,
    timeToFirstToken: 0.6,
    inputPricePerMillionUSD: 0.27,
    outputPricePerMillionUSD: 1.1,
    isFreeTierAvailable: true,
    contextWindow: 128000,
    maxOutputTokens: 8192,
    bestFor: {
      vi: ['Doanh nghiệp cần xây dựng chatbot trả lời khách hàng tiết kiệm tối đa', 'Xử lý lượng lớn bài viết, phân loại email, trích xuất dữ liệu', 'Lập trình hàng ngày không tốn tiền', 'Các startup muốn tối ưu chi phí hạ tầng AI'],
      en: ['High-volume customer support bots on a budget', 'Massive batch text processing & data extraction', 'Budget-friendly daily coding companion', 'Startups minimizing AI infrastructure spend']
    },
    pros: {
      vi: ['Chi phí rẻ đến kinh ngạc ($0.27/1M input)', 'Chất lượng câu trả lời rất khôn ngoan', 'Được hỗ trợ bởi hầu hết các nhà cung cấp đám mây lớn'],
      en: ['Astonishingly low cost ($0.27/M in, $1.10/M out)', 'High general intelligence rivaling closed giants', 'Widely hosted across major inference clouds']
    },
    cons: {
      vi: ['Tiếng Việt đôi khi dịch theo thói quen ngữ pháp tiếng Trung/Anh', 'Tốc độ trên server chính hãng đôi lúc chập chờn'],
      en: ['Vietnamese phrasing can occasionally show translation artifacts', 'Official endpoint has sporadic peak latency']
    },
    badge: {
      vi: '💰 Vô Địch Hiệu Năng / Giá Thành',
      en: '💰 Best Value Champion',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    isOpenWeights: true,
    hasVision: false,
    officialUrl: 'https://www.deepseek.com',
    playgroundUrl: 'https://chat.deepseek.com',
    providers: ['DeepSeek API', 'Together AI', 'Groq', 'DeepInfra', 'Fireworks AI', 'OpenRouter']
  },

  // ================= TIER A =================
  {
    id: 'gemini-2-5-flash',
    name: 'Gemini 2.5 Flash',
    creator: 'Google',
    tier: 'A',
    category: ['speed', 'budget', 'vietnamese'],
    releaseDate: '2025-02',
    vietnameseSummary: 'Tốc độ bàn thờ với 180+ tokens/giây, giá siêu rẻ (chưa tới 2.500đ cho 1 triệu token). Cực kỳ phù hợp cho ứng dụng thực tế cần phản hồi tức thì.',
    englishSummary: 'Blistering speed at 180+ tokens/sec with rock-bottom pricing ($0.10/M). The best choice for real-time customer chats, quick summarization, and interactive apps.',
    intelligenceScore: 90,
    vietnameseRating: 94,
    codingScore: 87,
    reasoningScore: 86,
    outputSpeed: 195,
    timeToFirstToken: 0.28,
    inputPricePerMillionUSD: 0.1,
    outputPricePerMillionUSD: 0.4,
    isFreeTierAvailable: true,
    contextWindow: 1000000,
    maxOutputTokens: 32768,
    bestFor: {
      vi: ['Chatbot tư vấn khách hàng phản hồi trong chớp mắt', 'Tóm tắt bài báo, tin tức, email nhanh', 'Học sinh sinh viên tra cứu kiến thức tức thời', 'Ứng dụng mobile cần tiết kiệm pin và băng thông'],
      en: ['Sub-second instant customer care bots', 'Rapid news, email & transcript summarization', 'Mobile apps demanding low latency', 'High-throughput cost-sensitive pipelines']
    },
    pros: {
      vi: ['Tốc độ siêu nhanh, gần như không có độ trễ', 'Giá rẻ gần như miễn phí ($0.10/1M token)', 'Ngữ cảnh 1 triệu token thoải mái nhồi tài liệu'],
      en: ['Blazing 195 tokens/sec throughput', 'Virtually free pricing at $0.10/M input', 'Massive 1M token context included']
    },
    cons: {
      vi: ['Khả năng giải toán phức tạp không bằng dòng Pro hay R1'],
      en: ['Less capable in advanced mathematical proofs than Pro/R1']
    },
    badge: {
      vi: '⚡ Siêu Tốc & Giá Rẻ',
      en: '⚡ Ultra Fast & Dirt Cheap',
      color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
    },
    isOpenWeights: false,
    hasVision: true,
    officialUrl: 'https://deepmind.google/technologies/gemini',
    playgroundUrl: 'https://aistudio.google.com',
    providers: ['Google AI Studio', 'Google Cloud Vertex AI']
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    creator: 'Anthropic',
    tier: 'A',
    category: ['coding', 'vietnamese', 'reasoning'],
    releaseDate: '2024-10',
    vietnameseSummary: 'Phiên bản huyền thoại đưa Anthropic lên ngôi vương lập trình năm 2024. Vẫn cực kỳ xuất sắc, ổn định, và hiểu tiếng Việt rất tinh tế.',
    englishSummary: 'The legendary release that set the coding gold standard in 2024. Still exceptionally capable, rock-stable, and culturally nuanced.',
    intelligenceScore: 94,
    vietnameseRating: 94,
    codingScore: 96,
    reasoningScore: 92,
    outputSpeed: 75,
    timeToFirstToken: 0.7,
    inputPricePerMillionUSD: 3.0,
    outputPricePerMillionUSD: 15.0,
    isFreeTierAvailable: true,
    contextWindow: 200000,
    maxOutputTokens: 8192,
    bestFor: {
      vi: ['Lập trình web, app, viết API', 'Viết văn nghệ thuật, kịch bản tiếng Việt', 'Phân tích tài liệu có đồ thị/ảnh'],
      en: ['Full-stack web & backend development', 'Creative writing & storytelling', 'Diagram and UI design extraction']
    },
    pros: {
      vi: ['Code rất ít lỗi, hiểu rõ yêu cầu khó', 'Văn phong tự nhiên, có cảm xúc'],
      en: ['Highly reliable code with minimal hallucinations', 'Natural, emotionally resonant tone']
    },
    cons: {
      vi: ['Giá output khá đắt nếu so với DeepSeek và Gemini Flash'],
      en: ['Relatively expensive output pricing']
    },
    badge: {
      vi: '🛠️ Huyền Thoại Lập Trình',
      en: '🛠️ Coding Legend',
      color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    },
    isOpenWeights: false,
    hasVision: true,
    officialUrl: 'https://www.anthropic.com/claude',
    playgroundUrl: 'https://claude.ai',
    providers: ['Anthropic API', 'AWS Bedrock', 'Google Cloud']
  },
  {
    id: 'o3-mini',
    name: 'OpenAI o3-mini',
    creator: 'OpenAI',
    tier: 'A',
    category: ['reasoning', 'coding'],
    releaseDate: '2025-01',
    vietnameseSummary: 'Mô hình tư duy chuyên sâu cỡ nhỏ mới của OpenAI. Được tối ưu hóa cho toán học, khoa học và lập trình thi đấu, có thể điều chỉnh mức độ tư duy (low/medium/high).',
    englishSummary: 'OpenAI’s compact reasoning model tuned for STEM, math, and competitive coding. Features adjustable reasoning effort levels.',
    intelligenceScore: 93,
    vietnameseRating: 88,
    codingScore: 94,
    reasoningScore: 96,
    outputSpeed: 52,
    timeToFirstToken: 1.1,
    inputPricePerMillionUSD: 1.1,
    outputPricePerMillionUSD: 4.4,
    isFreeTierAvailable: true,
    contextWindow: 200000,
    maxOutputTokens: 100000,
    bestFor: {
      vi: ['Lập trình viên giải thuật toán khó', 'Học sinh/sinh viên chuyên ngành Toán, Tin, Lý', 'Rà soát logic hợp đồng & bảo mật'],
      en: ['Competitive algorithmic programming', 'STEM university problem sets', 'Logic verification and security auditing']
    },
    pros: {
      vi: ['Khả năng suy luận từng bước xuất sắc', 'Giá rẻ hơn o1 đáng kể', 'Hỗ trợ Function Calling trong chế độ suy nghĩ'],
      en: ['Top-tier STEM accuracy', 'Significantly cheaper than full o1', 'Supports function calling during reasoning']
    },
    cons: {
      vi: ['Không hỗ trợ xử lý hình ảnh (chỉ thuần text)', 'Cần thời gian chờ mô hình "suy nghĩ"'],
      en: ['Text-only (no vision input)', 'Latency delay while thinking']
    },
    badge: {
      vi: '📐 Chuyên Gia Toán & Thuật Toán',
      en: '📐 STEM & Algo Specialist',
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    isOpenWeights: false,
    hasVision: false,
    officialUrl: 'https://openai.com',
    playgroundUrl: 'https://chatgpt.com',
    providers: ['OpenAI API', 'Microsoft Azure']
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    creator: 'OpenAI',
    tier: 'A',
    category: ['budget', 'speed', 'vietnamese'],
    releaseDate: '2024-07',
    vietnameseSummary: 'Phiên bản thu nhỏ siêu tiết kiệm của GPT-4o. Phù hợp cho 85% tác vụ hàng ngày của người dùng Việt: hỏi đáp, dịch bài, viết email với chi phí siêu rẻ.',
    englishSummary: 'OpenAI’s workhorse budget model. Fast, cost-effective, and capable enough for 85% of everyday chat, translation, and drafting needs.',
    intelligenceScore: 88,
    vietnameseRating: 93,
    codingScore: 85,
    reasoningScore: 84,
    outputSpeed: 110,
    timeToFirstToken: 0.35,
    inputPricePerMillionUSD: 0.15,
    outputPricePerMillionUSD: 0.6,
    isFreeTierAvailable: true,
    contextWindow: 128000,
    maxOutputTokens: 16384,
    bestFor: {
      vi: ['Viết email, dịch bài báo, sửa lỗi ngữ pháp', 'Tích hợp chatbot cho website bán hàng nhỏ & vừa', 'Làm trợ lý học tập cho học sinh phổ thông'],
      en: ['Daily email drafting & translation', 'E-commerce customer service widget', 'High-volume background classification']
    },
    pros: {
      vi: ['Rẻ gấp 17 lần GPT-4o gốc', 'Tiếng Việt mượt mà tự nhiên', 'Độ trễ thấp, phản hồi gần như lập tức'],
      en: ['17x cheaper than full GPT-4o', 'Very solid native Vietnamese support', 'Fast TTFT and stable uptime']
    },
    cons: {
      vi: ['Dễ bị nhầm lẫn khi giải các bài toán suy luận trừu tượng cao'],
      en: ['Prone to errors on abstract complex logic']
    },
    badge: {
      vi: '🎯 Ngon Bổ Rẻ Quốc Dân',
      en: '🎯 Reliable Daily Driver',
      color: 'bg-green-500/20 text-green-300 border-green-500/40'
    },
    isOpenWeights: false,
    hasVision: true,
    officialUrl: 'https://openai.com/index/gpt-4o-mini-advancing-cost-efficient-intelligence/',
    playgroundUrl: 'https://chatgpt.com',
    providers: ['OpenAI API', 'Microsoft Azure']
  },
  {
    id: 'qwen-2-5-coder-32b',
    name: 'Qwen 2.5 Coder 32B',
    creator: 'Alibaba',
    tier: 'A',
    category: ['coding', 'budget'],
    releaseDate: '2024-11',
    vietnameseSummary: 'Mô hình mã nguồn mở chuyên biệt cho lập trình được đánh giá cao nhất hiện nay. Kích thước 32B vừa vặn để tự chạy trên máy tính cá nhân có card đồ họa tốt.',
    englishSummary: 'The premier open-source specialized coding model. 32B parameter size hits the sweet spot for running locally on enthusiast GPUs.',
    intelligenceScore: 90,
    vietnameseRating: 84,
    codingScore: 94,
    reasoningScore: 88,
    outputSpeed: 95,
    timeToFirstToken: 0.4,
    inputPricePerMillionUSD: 0.3,
    outputPricePerMillionUSD: 0.9,
    isFreeTierAvailable: true,
    contextWindow: 128000,
    maxOutputTokens: 8192,
    bestFor: {
      vi: ['Lập trình viên muốn tự host AI trên máy (Ollama/LM Studio)', 'Tự động hoàn thành mã (Code completion) trong VS Code', 'Công ty cần bảo mật mã nguồn nội bộ 100%'],
      en: ['Local AI development on Mac/PC (Ollama)', 'In-editor Copilot replacement via Continue/Aider', 'Enterprise code privacy requirements']
    },
    pros: {
      vi: ['Khả năng code ngang ngửa GPT-4o nhưng chạy được offline', 'Hỗ trợ hơn 40 ngôn ngữ lập trình phổ biến', 'Rất rẻ khi dùng qua API đám mây'],
      en: ['Local-ready with near GPT-4o coding prowess', 'Broad 40+ programming language coverage', 'Ultra cheap on cloud inference providers']
    },
    cons: {
      vi: ['Khả năng viết văn tiếng Việt không sâu sắc bằng các model đa năng'],
      en: ['Less suited for nuanced Vietnamese literary writing']
    },
    badge: {
      vi: '💻 Vua Code Mã Nguồn Mở',
      en: '💻 Open Source Code King',
      color: 'bg-teal-500/20 text-teal-300 border-teal-500/40'
    },
    isOpenWeights: true,
    hasVision: false,
    officialUrl: 'https://qwenlm.github.io/',
    playgroundUrl: 'https://huggingface.co/chat',
    providers: ['DeepInfra', 'Together AI', 'Groq', 'Fireworks AI', 'OpenRouter']
  },
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B Instruct',
    creator: 'Meta',
    tier: 'A',
    category: ['budget', 'vietnamese', 'reasoning'],
    releaseDate: '2024-12',
    vietnameseSummary: 'Model mã nguồn mở 70B mạnh nhất của Meta, cho chất lượng ngang ngửa model 405B trước đó nhưng tiết kiệm tài nguyên gấp nhiều lần.',
    englishSummary: 'Meta\'s premier open-weights 70B instruction-tuned model. Delivers prior 405B-tier intelligence at a fraction of compute requirements.',
    intelligenceScore: 91,
    vietnameseRating: 87,
    codingScore: 89,
    reasoningScore: 89,
    outputSpeed: 140,
    timeToFirstToken: 0.3,
    inputPricePerMillionUSD: 0.4,
    outputPricePerMillionUSD: 0.9,
    isFreeTierAvailable: true,
    contextWindow: 128000,
    maxOutputTokens: 8192,
    bestFor: {
      vi: ['Xây dựng ứng dụng doanh nghiệp độc lập', 'Chạy suy luận siêu tốc trên chip LPU của Groq hay SambaNova', 'Trợ lý tri thức tổng hợp'],
      en: ['Enterprise independent AI deployments', 'Ultra-fast LPU inference (Groq/Cerebras)', 'General-purpose enterprise knowledge agent']
    },
    pros: {
      vi: ['Mã nguồn mở miễn phí bản quyền thương mại', 'Tốc độ cực kỳ khủng khiếp trên Groq/Cerebras (250+ tokens/s)', 'Độ ổn định và an toàn cao'],
      en: ['Permissive commercial open license', 'Mind-boggling inference speeds on specialized LPUs', 'High reliability across tasks']
    },
    cons: {
      vi: ['Tiếng Việt tốt nhưng đôi khi vẫn có văn phong dịch thuật từ ngữ liệu tiếng Anh'],
      en: ['Vietnamese output occasionally betrays English phrasing']
    },
    badge: {
      vi: '🦙 Chuẩn Mực Mã Nguồn Mở',
      en: '🦙 Open Benchmark Standard',
      color: 'bg-blue-600/20 text-blue-300 border-blue-600/40'
    },
    isOpenWeights: true,
    hasVision: false,
    officialUrl: 'https://llama.meta.com',
    playgroundUrl: 'https://groq.com',
    providers: ['Groq', 'Together AI', 'DeepInfra', 'Fireworks AI', 'AWS', 'Azure']
  },

  // ================= TIER B =================
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    creator: 'Anthropic',
    tier: 'B',
    category: ['speed', 'coding'],
    releaseDate: '2024-11',
    vietnameseSummary: 'Model tí hon nhưng cực kỳ nhanh nhẹn của Anthropic. Code nhanh, xử lý lệnh gọn gàng, phù hợp cho các tác vụ cần tốc độ cao.',
    englishSummary: 'Anthropic’s compact, nimble speedster. Rapid code generation and sharp instruction adherence for real-time workflows.',
    intelligenceScore: 86,
    vietnameseRating: 88,
    codingScore: 88,
    reasoningScore: 83,
    outputSpeed: 125,
    timeToFirstToken: 0.35,
    inputPricePerMillionUSD: 0.8,
    outputPricePerMillionUSD: 4.0,
    isFreeTierAvailable: false,
    contextWindow: 200000,
    maxOutputTokens: 8192,
    bestFor: {
      vi: ['Tự động hóa tác vụ lặp lại', 'Phân loại dữ liệu thời gian thực', 'Chatbot nội bộ doanh nghiệp'],
      en: ['Automated background agent loops', 'Real-time classification pipelines', 'Internal team workflows']
    },
    pros: {
      vi: ['Tốc độ sinh chữ rất nhanh', 'Giữ đúng định dạng JSON/Schema tốt'],
      en: ['Rapid response delivery', 'Strict adherence to JSON/structured schemas']
    },
    cons: {
      vi: ['Giá đắt hơn đáng kể so với Gemini Flash và GPT-4o mini'],
      en: ['Priced noticeably higher than Flash & mini competitors']
    },
    badge: {
      vi: '⚡ Nhỏ Gọn & Sắc Bén',
      en: '⚡ Compact & Sharp',
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/40'
    },
    isOpenWeights: false,
    hasVision: true,
    officialUrl: 'https://www.anthropic.com',
    playgroundUrl: 'https://claude.ai',
    providers: ['Anthropic API', 'AWS Bedrock']
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    creator: 'Mistral AI',
    tier: 'B',
    category: ['reasoning', 'coding'],
    releaseDate: '2024-07',
    vietnameseSummary: 'Niềm tự hào công nghệ châu Âu. Rất giỏi đa ngôn ngữ, suy luận toán học và hiểu cấu trúc code chặt chẽ.',
    englishSummary: 'Europe’s flagship multilingual powerhouse. Strong mathematics, coding rigor, and European language mastery.',
    intelligenceScore: 88,
    vietnameseRating: 82,
    codingScore: 88,
    reasoningScore: 87,
    outputSpeed: 60,
    timeToFirstToken: 0.55,
    inputPricePerMillionUSD: 2.0,
    outputPricePerMillionUSD: 6.0,
    isFreeTierAvailable: true,
    contextWindow: 128000,
    maxOutputTokens: 4096,
    bestFor: {
      vi: ['Dịch đa ngôn ngữ Pháp, Đức, Anh, Việt', 'Tạo tài liệu kỹ thuật chuẩn châu Âu (GDPR)'],
      en: ['Multilingual European & Asian translations', 'Strict compliance-conscious setups']
    },
    pros: {
      vi: ['Tuân thủ quy chuẩn dữ liệu châu Âu nghiêm ngặt', 'Khả năng reasoning tương đối tốt'],
      en: ['Strong European data privacy posture', 'Solid mathematical reasoning baseline']
    },
    cons: {
      vi: ['Vốn từ vựng tiếng Việt không phong phú bằng Google hay OpenAI'],
      en: ['Vietnamese vocabulary narrower than Google/OpenAI']
    },
    badge: {
      vi: '🇪🇺 Công Nghệ Châu Âu',
      en: '🇪🇺 European Flagship',
      color: 'bg-red-500/20 text-red-300 border-red-500/40'
    },
    isOpenWeights: true,
    hasVision: false,
    officialUrl: 'https://mistral.ai',
    playgroundUrl: 'https://chat.mistral.ai',
    providers: ['Mistral API', 'Azure', 'AWS Bedrock']
  },
  {
    id: 'grok-2',
    name: 'Grok 2',
    creator: 'xAI (Elon Musk)',
    tier: 'B',
    category: ['vietnamese', 'reasoning'],
    releaseDate: '2024-08',
    vietnameseSummary: 'Mô hình AI gắn liền với mạng xã hội X (Twitter). Cập nhật tin tức thời sự thế giới theo thời gian thực cực nhanh, phong cách trả lời thẳng thắn, hài hước.',
    englishSummary: 'xAI\'s real-time model directly integrated with X (Twitter). Rapid breaking news awareness and witty, unfiltered personality.',
    intelligenceScore: 87,
    vietnameseRating: 85,
    codingScore: 84,
    reasoningScore: 86,
    outputSpeed: 65,
    timeToFirstToken: 0.6,
    inputPricePerMillionUSD: 2.0,
    outputPricePerMillionUSD: 10.0,
    isFreeTierAvailable: false,
    contextWindow: 128000,
    maxOutputTokens: 8192,
    bestFor: {
      vi: ['Tra cứu tin tức thời sự nóng hổi', 'Sáng tạo nội dung mạng xã hội có chất riêng, hài hước'],
      en: ['Real-time news & trending topic tracking', 'Bold, witty social media copywriting']
    },
    pros: {
      vi: ['Nắm bắt trend mạng xã hội rất nhanh', 'Ít bị kiểm duyệt quá đà như các AI khác'],
      en: ['Unmatched access to breaking X trends', 'Less conservative guardrails']
    },
    cons: {
      vi: ['Chỉ hỗ trợ cho tài khoản X Premium hoặc API riêng', 'Chi phí API khá cao'],
      en: ['Requires X Premium or dedicated API key', 'Relatively high token pricing']
    },
    badge: {
      vi: '🌐 Cập Nhật Tin Nóng X',
      en: '🌐 Real-time Social Pulse',
      color: 'bg-neutral-500/20 text-neutral-300 border-neutral-500/40'
    },
    isOpenWeights: false,
    hasVision: true,
    officialUrl: 'https://x.ai',
    playgroundUrl: 'https://x.com/i/grok',
    providers: ['xAI API']
  },

  // ================= TIER C =================
  {
    id: 'llama-3-1-8b',
    name: 'Llama 3.1 8B Instruct',
    creator: 'Meta',
    tier: 'C',
    category: ['speed', 'budget'],
    releaseDate: '2024-07',
    vietnameseSummary: 'Mô hình siêu nhẹ có thể chạy mượt mà trên laptop cá nhân hay điện thoại. Tuy nhỏ nhưng đủ giải quyết các tác vụ cơ bản.',
    englishSummary: 'Ultra-lightweight model that easily runs locally on laptops or phones. Great for edge devices and simple tasks.',
    intelligenceScore: 78,
    vietnameseRating: 75,
    codingScore: 76,
    reasoningScore: 74,
    outputSpeed: 240,
    timeToFirstToken: 0.2,
    inputPricePerMillionUSD: 0.05,
    outputPricePerMillionUSD: 0.08,
    isFreeTierAvailable: true,
    contextWindow: 128000,
    maxOutputTokens: 8192,
    bestFor: {
      vi: ['Chạy cục bộ 100% offline trên máy tính cá nhân', 'Thiết bị IoT, Raspberry Pi', 'Tác vụ phân loại văn bản đơn giản'],
      en: ['100% offline local operation on PCs', 'Edge & IoT embedded hardware', 'Basic text classification and tagging']
    },
    pros: {
      vi: ['Nhẹ, chạy không tốn tài nguyên', 'Tốc độ cực nhanh trên phần cứng phổ thông'],
      en: ['Extremely lightweight', 'Flashes along even on modest hardware']
    },
    cons: {
      vi: ['Hay trả lời sai nếu hỏi logic sâu hoặc tiếng Việt phức tạp'],
      en: ['Easily confused by complex logic or deep Vietnamese subtleties']
    },
    badge: {
      vi: '📱 Siêu Nhẹ Chạy Mọi Máy',
      en: '📱 Ultra-Light Local Edge',
      color: 'bg-slate-500/20 text-slate-300 border-slate-500/40'
    },
    isOpenWeights: true,
    hasVision: false,
    officialUrl: 'https://llama.meta.com',
    playgroundUrl: 'https://ollama.com/library/llama3.1:8b',
    providers: ['Groq', 'Together AI', 'DeepInfra', 'Local Ollama']
  },
  {
    id: 'gemma-2-9b',
    name: 'Gemma 2 9B Instruct',
    creator: 'Google',
    tier: 'C',
    category: ['budget', 'speed'],
    releaseDate: '2024-06',
    vietnameseSummary: 'Mô hình mã nguồn mở cỡ nhỏ của Google. Chất lượng trả lời vượt trội so với kích thước 9 tỷ tham số của nó.',
    englishSummary: 'Google’s open-weights 9B model. Punches well above its weight class in quality and text comprehension.',
    intelligenceScore: 80,
    vietnameseRating: 79,
    codingScore: 78,
    reasoningScore: 77,
    outputSpeed: 180,
    timeToFirstToken: 0.25,
    inputPricePerMillionUSD: 0.08,
    outputPricePerMillionUSD: 0.15,
    isFreeTierAvailable: true,
    contextWindow: 8192,
    maxOutputTokens: 4096,
    bestFor: {
      vi: ['Học tập, nghiên cứu cách AI hoạt động', 'Chatbot nhẹ chạy trên VPS cấu hình thấp'],
      en: ['AI research and fine-tuning on consumer GPUs', 'Lightweight bots on low-spec VPS']
    },
    pros: {
      vi: ['Kiến trúc tối ưu, câu trả lời mạch lạc'],
      en: ['Highly optimized architecture, clean coherent text']
    },
    cons: {
      vi: ['Cửa sổ ngữ cảnh chỉ 8k token (khá ngắn so với chuẩn hiện nay)'],
      en: ['Short 8k context window compared to modern standards']
    },
    badge: {
      vi: '🌱 Tinh Gọn Từ Google',
      en: '🌱 Lean Google Open Model',
      color: 'bg-emerald-600/20 text-emerald-300 border-emerald-600/40'
    },
    isOpenWeights: true,
    hasVision: false,
    officialUrl: 'https://ai.google.dev/gemma',
    playgroundUrl: 'https://huggingface.co/chat',
    providers: ['Groq', 'DeepInfra', 'Together AI', 'Local Ollama']
  }
];

// Helper functions
export const USD_TO_VND_RATE = 25450; // Current approximate exchange rate

export function convertUSDToVND(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_VND_RATE);
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUSD(amount: number): string {
  if (amount < 0.01) {
    return `$${amount.toFixed(4)}`;
  }
  return `$${amount.toFixed(2)}`;
}
