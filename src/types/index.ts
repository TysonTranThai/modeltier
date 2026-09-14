export type Tier = 'S' | 'A' | 'B' | 'C';

export type CategoryFilter = 
  | 'all' 
  | 'coding' 
  | 'vietnamese' 
  | 'speed' 
  | 'budget' 
  | 'reasoning'
  | 'free_accessible';

export type Language = 'vi' | 'en';
export type Currency = 'VND' | 'USD';

export interface ModelBadge {
  vi: string;
  en: string;
  color: string; // Tailwind color class or hex
}

export interface Model {
  id: string;
  name: string;
  creator: string;
  creatorLogo?: string;
  tier: Tier;
  category: ('coding' | 'vietnamese' | 'speed' | 'budget' | 'reasoning')[];
  releaseDate: string;
  
  // Human-friendly localized summaries
  vietnameseSummary: string;
  englishSummary: string;
  
  // Real-world practical metrics (0 - 100)
  intelligenceScore: number;     // Tổng điểm thông minh
  vietnameseRating: number;      // Độ nhuyễn tiếng Việt, văn phong tự nhiên
  codingScore: number;           // Khả năng viết code & debug
  reasoningScore: number;        // Suy luận logic, toán học, giải quyết bài toán phức tạp
  
  // Performance & Speed
  outputSpeed: number;           // Tokens / second
  timeToFirstToken: number;      // TTFT in seconds
  
  // Cost (USD per 1M tokens)
  inputPricePerMillionUSD: number;
  outputPricePerMillionUSD: number;
  isFreeTierAvailable: boolean;
  
  // Technical capacity
  contextWindow: number;         // Max tokens in context (e.g., 200,000)
  maxOutputTokens: number;
  
  // Pros & Cons in human language
  bestFor: {
    vi: string[];
    en: string[];
  };
  pros: {
    vi: string[];
    en: string[];
  };
  cons: {
    vi: string[];
    en: string[];
  };
  
  // Meta
  badge?: ModelBadge;
  isOpenWeights: boolean;
  hasVision: boolean;
  officialUrl: string;
  playgroundUrl?: string;
  providers: string[];
}

export interface ProviderStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'maintenance';
  uptimePercent: number;
  avgLatencyMs: number;
  throughputTps: number;
  region: string;
  modelsServed: string[];
  updatedAt: string;
}

export interface GlossaryTerm {
  id: string;
  term: {
    vi: string;
    en: string;
  };
  subtitle: {
    vi: string;
    en: string;
  };
  simpleExplanation: {
    vi: string;
    en: string;
  };
  realWorldAnalogy: {
    vi: string;
    en: string;
  };
  whyItMatters: {
    vi: string;
    en: string;
  };
  iconName: string;
}

export interface WorkloadScenario {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  inputWordsPerMonth: number;
  outputWordsPerMonth: number;
  icon: string;
}

export interface RecommendationForm {
  useCase: 'writing' | 'coding' | 'cskh' | 'study' | 'long_doc' | 'general';
  budget: 'free' | 'ultra_cheap' | 'balanced' | 'unlimited';
  priority: 'smartest' | 'vietnamese_best' | 'fastest' | 'reasoning' | 'best_value';
}
