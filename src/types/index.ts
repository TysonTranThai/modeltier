export type Tier = 'S' | 'A' | 'B' | 'C';

export type CategoryFilter = 
  | 'all' 
  | 'coding' 
  | 'vietnamese' 
  | 'speed' 
  | 'budget' 
  | 'reasoning'
  | 'open_weights'
  | 'free_accessible';

export type Language = 'vi' | 'en';
export type Currency = 'VND' | 'USD';
export type ViewMode = 'clone' | 'simplified' | 'both';

export interface ModelBadge {
  vi: string;
  en: string;
  color: string;
}

export interface Model {
  id: string;
  name: string;
  creator: string;
  creatorLogo?: string;
  tier: Tier;
  category: ('coding' | 'vietnamese' | 'speed' | 'budget' | 'reasoning')[];
  releaseDate: string;
  
  vietnameseSummary: string;
  englishSummary: string;
  
  intelligenceScore: number;
  vietnameseRating: number;
  codingScore: number;
  reasoningScore: number;
  
  outputSpeed: number;
  timeToFirstToken: number;
  
  inputPricePerMillionUSD: number;
  outputPricePerMillionUSD: number;
  isFreeTierAvailable: boolean;
  
  contextWindow: number;
  maxOutputTokens: number;
  
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
  
  badge?: ModelBadge;
  isOpenWeights: boolean;
  hasVision: boolean;
  officialUrl: string;
  playgroundUrl?: string;
  providers: string[];
}

export interface ScrapedModel {
  id: string;
  slug: string;
  name: string;
  creator: string;
  contextWindow: string;
  tier: Tier;
  isOpenWeights: boolean;
  hasVision: boolean;
  intelligenceScore: number;
  intelligenceScoreRaw: string;
  costPerTaskUSD: number;
  costPerTaskRaw: string;
  outputSpeed: number;
  outputSpeedRaw: string;
  latencyFirstChunk: number;
  latencyRaw: string;
  totalResponseTime: number;
  totalTimeRaw: string;
  vietnameseRating: number;
  creatorLogo?: string | null;
  isReasoning?: boolean;
  effort?: string | null;
  deprecated?: boolean;
  releaseDate?: string | null;
  url: string;
  providersUrl: string;
}

export interface HighlightItem {
  label: string;
  detailsUrl?: string;
  artificialAnalysisIntelligenceIndex?: number;
  medianOutputSpeed?: number;
  costPerIntelligenceIndexTask?: number;
}

export interface ChangelogItem {
  date: string;
  slug: string;
  modelName: string;
}

export interface ArticleItem {
  slug: string;
  title: string;
  summary: string;
  url: string;
}

export interface LiveDataPayload {
  source: string;
  syncedAt: string;
  durationMs: number;
  totalModels: number;
  highlights: {
    intelligence: HighlightItem[];
    speed: HighlightItem[];
    costPerTask: HighlightItem[];
    intelligenceIndexTop20: HighlightItem[];
  };
  articles: ArticleItem[];
  changelog: ChangelogItem[];
  models: ScrapedModel[];
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
