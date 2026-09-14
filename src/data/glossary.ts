import { GlossaryTerm } from '../types';

export const GLOSSARY_DATA: GlossaryTerm[] = [
  {
    id: 'token',
    term: {
      vi: 'Token là gì?',
      en: 'What is a Token?'
    },
    subtitle: {
      vi: 'Đơn vị đo lường cơ bản mà AI dùng để "đọc" và "viết"',
      en: 'The fundamental unit AI uses to read and write text'
    },
    simpleExplanation: {
      vi: 'AI không nhìn văn bản từng chữ cái như con người, mà chia nhỏ thành các mẩu ký tự gọi là "Token". Trung bình, 1 từ tiếng Anh là khoảng 1.3 token, còn với tiếng Việt có dấu, 1 từ thường tốn khoảng 1.5 - 2 token.',
      en: 'AI doesn\'t process words letter-by-letter. Instead, it breaks text into chunks called "Tokens". Roughly, 1,000 tokens equal about 750 English words.'
    },
    realWorldAnalogy: {
      vi: '📖 Hình dung thực tế: 1 triệu token tương đương khoảng 1.500 trang sách A4 đặc chữ! Một cuộc trò chuyện bình thường chỉ tốn vài trăm token.',
      en: '📖 Real-world scale: 1 Million tokens is roughly 1,500 printed A4 pages of text. A casual question only consumes a few hundred tokens.'
    },
    whyItMatters: {
      vi: 'Biết số lượng token giúp bạn tính toán chính xác số tiền bỏ ra hàng tháng khi dùng AI, tránh bị bất ngờ vì hóa đơn.',
      en: 'Understanding tokens is crucial because all AI providers bill per million tokens.'
    },
    iconName: 'Coins'
  },
  {
    id: 'speed',
    term: {
      vi: 'Tokens/giây (Tốc độ) là gì?',
      en: 'What is Output Speed (Tokens/sec)?'
    },
    subtitle: {
      vi: 'Tốc độ "bắn chữ" của AI nhanh hay chậm',
      en: 'How fast the AI generates text on your screen'
    },
    simpleExplanation: {
      vi: 'Đây là số lượng chữ (token) mà mô hình AI có thể tạo ra trong vòng một giây sau khi nó bắt đầu trả lời.',
      en: 'The count of tokens generated per second once the model starts responding.'
    },
    realWorldAnalogy: {
      vi: '⚡ Tương quan: Mắt người đọc sách trung bình chỉ khoảng 25-30 từ/giây (khoảng 35 tokens/giây). Nếu AI đạt 150 tokens/giây, nó đang "bắn chữ" nhanh gấp 4 lần tốc độ đọc của bạn!',
      en: '⚡ Reference: A fast human reads around 30 words/sec (~40 tokens/sec). An AI running at 150 tokens/sec produces text 4x faster than human reading speed!'
    },
    whyItMatters: {
      vi: 'Rất quan trọng nếu bạn làm Chatbot chăm sóc khách hàng, ứng dụng dịch thuật thời gian thực hoặc cần câu trả lời ngay lập tức.',
      en: 'Critical for live chat interfaces, autocomplete, and voice assistants where every millisecond counts.'
    },
    iconName: 'Zap'
  },
  {
    id: 'ttft',
    term: {
      vi: 'TTFT (Độ trễ) là gì?',
      en: 'What is Time to First Token (TTFT)?'
    },
    subtitle: {
      vi: 'Khoảng thời gian từ lúc bấm "Gửi" tới khi chữ đầu tiên xuất hiện',
      en: 'The delay between hitting "Send" and seeing the first letter'
    },
    simpleExplanation: {
      vi: 'TTFT (Time To First Token) là thời gian AI cần để đọc hiểu câu hỏi của bạn và chuẩn bị câu trả lời trước khi bắt đầu gõ chữ đầu tiên.',
      en: 'The duration needed for the AI system to process your prompt before generating the very first token.'
    },
    realWorldAnalogy: {
      vi: '⏱️ Thực tế: TTFT dưới 0.4 giây cho cảm giác "nhanh như chớp", giống như nói chuyện với người trực tiếp. TTFT trên 2 giây sẽ khiến bạn cảm thấy AI đang "ngập ngừng suy nghĩ".',
      en: '⏱️ Experience: Under 0.4s feels immediate and conversational. Over 2 seconds creates noticeable hesitation.'
    },
    whyItMatters: {
      vi: 'Đối với các mô hình suy luận (như DeepSeek R1 hay OpenAI o1), TTFT thường lâu hơn vì nó cần "suy nghĩ" các bước logic trước.',
      en: 'Reasoning models naturally have higher TTFT because they think through logic steps before speaking.'
    },
    iconName: 'Clock'
  },
  {
    id: 'context-window',
    term: {
      vi: 'Cửa sổ ngữ cảnh (Context Window) là gì?',
      en: 'What is the Context Window?'
    },
    subtitle: {
      vi: 'Dung lượng "bộ nhớ ngắn hạn" của AI trong một lần làm việc',
      en: 'The short-term memory capacity of the AI in a single conversation'
    },
    simpleExplanation: {
      vi: 'Là giới hạn tối đa số lượng chữ mà AI có thể nhớ cùng một lúc bao gồm cả câu hỏi của bạn, các tài liệu đính kèm và lịch sử đoạn chat.',
      en: 'The maximum total tokens an AI can hold in active memory, including prompts, uploads, and chat history.'
    },
    realWorldAnalogy: {
      vi: '🧠 Ví dụ: Model 128k token nhớ được khoảng 1 cuốn tiểu thuyết dày 300 trang. Nhưng model Gemini 2M token nhớ được tới 40 cuốn sách hoặc toàn bộ mã nguồn một dự án khổng lồ!',
      en: '🧠 Example: 128k tokens holds about one 300-page book. Google Gemini\'s 2M token context can absorb 40 whole books or an entire software codebase.'
    },
    whyItMatters: {
      vi: 'Nếu bạn cần tóm tắt tài liệu PDF hàng trăm trang hoặc phân tích dự án code lớn, bạn bắt buộc phải chọn model có Context Window lớn.',
      en: 'Crucial when analyzing long PDF contracts, video files, or large enterprise codebases.'
    },
    iconName: 'Layers'
  },
  {
    id: 'tier-system',
    term: {
      vi: 'Bảng Xếp Hạng Tier S/A/B/C tính như thế nào?',
      en: 'How are Tiers (S/A/B/C) Determined?'
    },
    subtitle: {
      vi: 'Hệ thống xếp loại thực chiến, trực quan và dễ hiểu nhất',
      en: 'Our practical, human-centered ranking tier system'
    },
    simpleExplanation: {
      vi: 'Thay vì dùng những biểu đồ phân tán rối mắt, chúng tôi tổng hợp 4 yếu tố: Trí thông minh thực tế, Khả năng tiếng Việt, Tốc độ và Chi phí hiệu năng (P/P) để phân hạng rõ ràng.',
      en: 'Instead of dense multi-axis scatter plots, we synthesize practical intelligence, multilingual fluency, speed, and price-to-performance into clear tiers.'
    },
    realWorldAnalogy: {
      vi: '🏆 Phân hạng:\n• Tier S (Siêu cấp): Đỉnh cao công nghệ thế giới, giải quyết việc khó nhất.\n• Tier A (Xuất sắc): Cực kỳ khuyên dùng, đáp ứng 90% nhu cầu người dùng và doanh nghiệp.\n• Tier B (Tiết kiệm): Nhanh, rẻ, phù hợp tác vụ tự động hóa lặp lại.\n• Tier C (Cơ bản): Siêu nhẹ, thích hợp chạy cục bộ trên máy tính cá nhân.',
      en: '🏆 Breakdown:\n• Tier S: Flagship state-of-the-art powerhouses.\n• Tier A: Excellent value, recommended for 90% of use cases.\n• Tier B: Highly efficient for repetitive automation.\n• Tier C: Ultra-lightweight, runs locally offline.'
    },
    whyItMatters: {
      vi: 'Giúp bạn chọn đúng AI trong 5 giây mà không cần đọc hàng chục bài báo cáo khoa học phức tạp.',
      en: 'Helps anyone choose the right model in 5 seconds without deciphering research papers.'
    },
    iconName: 'Award'
  },
  {
    id: 'open-weights',
    term: {
      vi: 'Mã nguồn mở (Open Weights) khác gì AI đóng?',
      en: 'Open Weights vs. Closed Proprietary AI?'
    },
    subtitle: {
      vi: 'Quyền tự do kiểm soát và bảo mật dữ liệu của bạn',
      en: 'Your freedom of control, self-hosting, and data privacy'
    },
    simpleExplanation: {
      vi: 'AI đóng (như GPT-4o, Claude 3.7) chỉ dùng được qua máy chủ của OpenAI/Anthropic. AI mã nguồn mở (như DeepSeek R1, Llama 3.3, Qwen 2.5) cho phép bạn tải về máy tính riêng hoặc máy chủ công ty để chạy tự do.',
      en: 'Closed models (GPT-4o, Claude) are hosted exclusively by their creators. Open-weight models (DeepSeek, Llama, Qwen) can be downloaded and run privately on your own infrastructure.'
    },
    realWorldAnalogy: {
      vi: '🏠 Tương tự: Dùng AI đóng như ở nhà thuê cao cấp đầy đủ tiện nghi nhưng phải phụ thuộc chủ nhà. Dùng AI mở như tự xây nhà trên đất của mình, riêng tư 100% và không ai tắt được.',
      en: '🏠 Analogy: Closed AI is like a luxury serviced rental. Open weights is owning the house — 100% private, nobody can revoke your access.'
    },
    whyItMatters: {
      vi: 'Nếu công ty bạn xử lý tài liệu mật, hợp đồng ngân hàng, hồ sơ bệnh nhân không được lọt ra ngoài, bạn nên ưu tiên mô hình mã nguồn mở.',
      en: 'Vital for confidential legal, banking, medical, or internal proprietary data that cannot leave premises.'
    },
    iconName: 'ShieldCheck'
  }
];
