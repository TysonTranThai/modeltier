# 🌟 ModelTier • Bảng Xếp Hạng & Theo Dõi AI Dễ Hiểu

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Deploy to GitHub Pages](https://github.com/TysonTranThai/modeltier/actions/workflows/deploy.yml/badge.svg)](https://github.com/TysonTranThai/modeltier/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-modeltier.notlimitedteam.cloud-FF6B35?style=flat-square&logo=googlechrome&logoColor=white)](https://modeltier.notlimitedteam.cloud)

> **A simplified, human-friendly, multilingual AI model tracking & tier-list platform for Vietnamese and global users.**  
> **Official Live Website**: [https://modeltier.notlimitedteam.cloud](https://modeltier.notlimitedteam.cloud)  
> *Lấy cảm hứng từ [Artificial Analysis](https://artificialanalysis.ai/), nhưng cung cấp trải nghiệm kép: Chế độ Dễ hiểu (cho người dùng phổ thông, doanh nghiệp Việt Nam) và Chế độ Benchmark Pro (tái hiện chuẩn xác hệ thống chỉ số phân tích độc lập với hơn 650+ mô hình).*

---

## 🎯 Vấn Đề Được Giải Quyết (The Problem We Solve)

Hầu hết các trang benchmark AI hiện nay (như Artificial Analysis, LMSYS Chatbot Arena) chứa đầy các thuật ngữ hàn lâm (*MMLU-Pro, SWE-bench, Tokens/s, TTFT, Perplexity, Pareto frontiers, \$ per 1M tokens*) và 100% bằng tiếng Anh kỹ thuật. Điều này khiến đại đa số người dùng phổ thông, sinh viên, người làm sáng tạo nội dung và doanh nghiệp Việt Nam hoàn toàn bối rối:
- **"Tôi không biết đọc biểu đồ phân tán này thì làm sao biết con AI nào tốt nhất?"**
- **"1 triệu token là bao nhiêu từ? Đổi ra tiền Việt (VNĐ) thì hết bao nhiêu bát phở?"**
- **"Mô hình nào nói tiếng Việt tự nhiên nhất mà không bị dịch máy thô kệch?"**
- **"Tôi cần viết content, hay làm chatbot bán hàng thì dùng con nào vừa rẻ vừa mượt?"**

**ModelTier** ra đời để trả lời tất cả những câu hỏi trên bằng **ngôn ngữ đời thường**, bảng xếp hạng **Tier List (S/A/B/C)** trực quan và bảng quy đổi **VNĐ thời gian thực**, đồng thời cung cấp chế độ **Benchmark Pro** cho các kỹ sư và chuyên gia muốn đi sâu vào dữ liệu gốc.

---

## ✨ Tính Năng Nổi Bật (Key Features)

### 1. 🔄 Hệ Thống Chế Độ Kép (Dual-Mode System)
- **⚡ Chế độ Dễ hiểu (Easy Mode)**: Giao diện tinh hoa, trực quan, giải thích thuật ngữ bình dân, bảng xếp hạng S/A/B/C, quy đổi chi phí ra VNĐ.
- **🔬 Chế độ Benchmark Pro (Artificial Analysis Clone)**: Tái hiện chuẩn xác 100% giao diện Artificial Analysis với sidebar mục lục bám dính (sticky top-28), biểu đồ cột Intelligence Index xoay nhãn 45 độ, bảng xếp hạng Coding Agent SWE-bench, Openness Index, bảng đo lường tốc độ TPS/độ trễ TTFT và danh sách đầy đủ 650+ mô hình.

### 2. 🏆 Bảng Xếp Hạng Tier Thực Chiến (S/A/B/C)
- **S-Tier (Thần thoại)**: Đỉnh cao trí tuệ thế giới cho tác vụ nặng nhất (*Claude 3.7 Sonnet, DeepSeek R1, GPT-4o, Gemini 2.5 Pro, DeepSeek V3*).
- **A-Tier (Xuất sắc)**: Tối ưu cho 90% nhu cầu người dùng (*Gemini 2.5 Flash, Claude 3.5 Sonnet, o3-mini, GPT-4o mini, Qwen 2.5 Coder 32B, Llama 3.3 70B*).
- **B-Tier (Thực dụng & Tiết kiệm)**: Nhanh, rẻ, phù hợp tự động hóa lặp lại (*Claude 3.5 Haiku, Mistral Large 2, Grok 2*).
- **C-Tier (Cơ bản & Chạy cục bộ)**: Siêu nhẹ, chạy offline ngay trên laptop cá nhân (*Llama 3.1 8B, Gemma 2 9B*).

### 3. 🇻🇳 Đánh Giá Độ Nhuyễn Tiếng Việt Bản Xứ
Mỗi mô hình được chấm điểm **Vietnamese Fluency (0-100)**: Khả năng hiểu ngữ cảnh văn hóa, thành ngữ, tiếng lóng và dịch thuật văn phong tự nhiên, không bị dịch gượng gạo từ tiếng Anh hoặc tiếng Trung.

### 4. 🧭 Trắc Nghiệm Tìm AI Cho Bạn (Interactive AI Finder)
Chỉ với 3 câu hỏi nhanh dưới 1 phút (Mục đích sử dụng, Ngân sách, Tiêu chí ưu tiên), thuật toán thông minh sẽ tự động đề xuất **Top 3 mô hình phù hợp nhất** kèm lý do giải thích chi tiết.

### 5. 💰 Máy Tính Chi Phí VNĐ & USD Thực Tế
Quy đổi chi phí AI sang các tình huống công việc thực tế:
- Chatbot chăm sóc khách hàng (5.000 tin nhắn/tháng)
- Sản xuất 100 bài blog SEO 1.500 từ
- Lập trình viên dùng trợ lý code cả tháng
- Phân tích 50 bộ tài liệu PDF dày cộp
- Tích hợp thanh trượt số từ đầu vào & đầu ra tùy chỉnh.

### 6. ⚔️ Đấu Trường So Găng 1-đối-1 (Model Battle Arena)
Chọn bất kỳ 2 mô hình (ví dụ: *Claude 3.7 Sonnet vs GPT-4o* hoặc *DeepSeek V3 vs Gemini 2.5 Flash*) để so sánh trực quan từng tiêu chí: Ai thông minh hơn, ai nói tiếng Việt hay hơn, ai chạy nhanh hơn, ai tiết kiệm tiền hơn và lời khuyên chốt hạ!

### 7. 📡 Radar Hạ Tầng Trực Tiếp (Live Provider Telemetry)
Theo dõi thời gian thực tốc độ xử lý (TPS), độ trễ (Latency TTFT) và trạng thái hoạt động của các nhà cung cấp đám mây: Groq, Cerebras, Google AI Studio, OpenAI, Anthropic, DeepSeek, Together AI, DeepInfra.

### 8. 🌐 Song Ngữ Toàn Diện (Tiếng Việt & English) + Đổi Tiền VNĐ/USD
Chuyển đổi 1-click giữa Tiếng Việt và English, giữa VNĐ và USD ở bất kỳ vị trí nào trên trang web.

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy (Getting Started)

### Yêu Cầu Hệ Thống:
- Node.js >= 18.0.0
- npm hoặc pnpm/yarn

### Cài đặt:
```bash
# Clone repository
git clone https://github.com/TysonTranThai/modeltier.git
cd modeltier

# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để trải nghiệm!

### Các Lệnh Hữu Ích:
```bash
# Đồng bộ dữ liệu AI models mới nhất
npm run sync

# Chạy toàn bộ 35 bài kiểm thử tự động (10-layer test suite)
npm test

# Kiểm tra TypeScript typecheck
npx tsc --noEmit

# Kiểm tra ESLint
npm run lint

# Đóng gói và xuất bản tĩnh (Production Static Export)
npm run build
```

---

## 🌐 Triển Khai GitHub Pages & Tên Miền Riêng

Dự án được cấu hình sẵn tự động build và deploy lên **GitHub Pages** thông qua GitHub Actions:
- **Workflow Build & Deploy**: `.github/workflows/deploy.yml` tự động build ra thư mục `out/` và publish lên GitHub Pages khi có commit mới trên nhánh `main`.
- **Workflow Đồng Bộ Tự Động**: `.github/workflows/scheduled-sync.yml` định kỳ 6 tiếng một lần cào dữ liệu mới từ Artificial Analysis và commit vào repo.
- **Custom Domain**: Tên miền chính thức `modeltier.notlimitedteam.cloud` được cấu hình qua tệp `public/CNAME`.

---

## 🤝 Đóng Góp (Contributing) & Mã Nguồn Mở

Chúng tôi rất hoan nghênh sự đóng góp từ cộng đồng! Vui lòng đọc qua:
- [Quy định đóng góp (CONTRIBUTING.md)](./CONTRIBUTING.md)
- [Quy tắc ứng xử (CODE_OF_CONDUCT.md)](./CODE_OF_CONDUCT.md)
- [Giấy phép mã nguồn mở MIT](./LICENSE)

Dữ liệu benchmark được tham chiếu từ các nguồn đo đạc độc lập uy tín bao gồm Artificial Analysis, LMSYS Org, và tài liệu kỹ thuật chính thức từ OpenAI, Anthropic, Google DeepMind, DeepSeek, Meta AI.
