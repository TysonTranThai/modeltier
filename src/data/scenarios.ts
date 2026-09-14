import { WorkloadScenario } from '../types';

export const SCENARIOS_DATA: WorkloadScenario[] = [
  {
    id: 'cskh',
    name: {
      vi: 'Chatbot Chăm Sóc Khách Hàng (5.000 khách/tháng)',
      en: 'E-commerce Customer Support (5,000 chats/mo)'
    },
    description: {
      vi: 'Trả lời tư vấn sản phẩm, kiểm tra đơn hàng tự động cho Fanpage/Zalo/Website.',
      en: 'Automated order inquiry, product recommendation and customer triage.'
    },
    inputWordsPerMonth: 400000,   // ~530k tokens
    outputWordsPerMonth: 600000,  // ~800k tokens
    icon: 'MessageSquare'
  },
  {
    id: 'content',
    name: {
      vi: 'Sản Xuất 100 Bài Blog & Viết Bài SEO',
      en: '100 SEO Articles & Content Creation'
    },
    description: {
      vi: 'Nghiên cứu từ khóa, lập dàn ý chi tiết và viết 100 bài viết chuyên sâu 1.500 từ.',
      en: 'Keyword research, outlining, and writing 100 in-depth 1,500-word articles.'
    },
    inputWordsPerMonth: 150000,   // ~200k tokens
    outputWordsPerMonth: 300000,  // ~400k tokens
    icon: 'PenTool'
  },
  {
    id: 'coding',
    name: {
      vi: 'Lập Trình Viên Sử Dụng Trợ Lý Code',
      en: 'Developer Daily AI Copilot Workload'
    },
    description: {
      vi: 'Đọc mã nguồn, sinh tính năng mới, viết unit test và sửa lỗi mỗi ngày trong tháng.',
      en: 'Code completion, unit testing, PR reviews, and complex debugging.'
    },
    inputWordsPerMonth: 1200000,  // ~1.6M tokens
    outputWordsPerMonth: 450000,  // ~600k tokens
    icon: 'Code2'
  },
  {
    id: 'docs',
    name: {
      vi: 'Phân Tích 50 Bộ Hợp Đồng & Tài Liệu Dày',
      en: 'Analyze 50 Large Legal Contracts & PDFs'
    },
    description: {
      vi: 'Đọc toàn bộ văn bản pháp lý, hợp đồng song ngữ và trích xuất điều khoản rủi ro.',
      en: 'Ingesting massive bilingual PDF agreements and extracting risk clauses.'
    },
    inputWordsPerMonth: 2500000,  // ~3.3M tokens
    outputWordsPerMonth: 250000,  // ~330k tokens
    icon: 'FileText'
  },
  {
    id: 'student',
    name: {
      vi: 'Học Tập & Dịch Thuật Cá Nhân (Nhẹ nhàng)',
      en: 'Student Study & Language Learning'
    },
    description: {
      vi: 'Hỏi bài tập, giải thích khái niệm, sửa lỗi ngữ pháp tiếng Anh/Việt hàng ngày.',
      en: 'Homework Q&A, language practice, and essay proofreading.'
    },
    inputWordsPerMonth: 50000,    // ~65k tokens
    outputWordsPerMonth: 80000,   // ~105k tokens
    icon: 'GraduationCap'
  }
];
