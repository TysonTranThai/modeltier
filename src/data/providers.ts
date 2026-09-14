import { ProviderStatus } from '../types';

export const PROVIDERS_DATA: ProviderStatus[] = [
  {
    id: 'groq',
    name: 'Groq (LPU)',
    status: 'operational',
    uptimePercent: 99.95,
    avgLatencyMs: 140,
    throughputTps: 310,
    region: 'North America (Multi-region)',
    modelsServed: ['DeepSeek R1', 'DeepSeek V3', 'Llama 3.3 70B', 'Llama 3.1 8B'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cerebras',
    name: 'Cerebras Inference',
    status: 'operational',
    uptimePercent: 99.88,
    avgLatencyMs: 110,
    throughputTps: 450,
    region: 'US West',
    modelsServed: ['Llama 3.3 70B', 'Llama 3.1 8B'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'anthropic-api',
    name: 'Anthropic Direct API',
    status: 'operational',
    uptimePercent: 99.92,
    avgLatencyMs: 420,
    throughputTps: 75,
    region: 'Global CDN / AWS',
    modelsServed: ['Claude 3.7 Sonnet', 'Claude 3.5 Sonnet', 'Claude 3.5 Haiku'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'openai-api',
    name: 'OpenAI Direct API',
    status: 'operational',
    uptimePercent: 99.91,
    avgLatencyMs: 380,
    throughputTps: 115,
    region: 'US East / Azure Global',
    modelsServed: ['GPT-4o', 'GPT-4o mini', 'o3-mini', 'o1'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio / Vertex',
    status: 'operational',
    uptimePercent: 99.98,
    avgLatencyMs: 260,
    throughputTps: 195,
    region: 'Global Edge (incl. Singapore/Tokyo)',
    modelsServed: ['Gemini 2.5 Pro', 'Gemini 2.5 Flash', 'Gemma 2 9B'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'deepseek-api',
    name: 'DeepSeek Official API',
    status: 'degraded',
    uptimePercent: 97.8,
    avgLatencyMs: 950,
    throughputTps: 42,
    region: 'Asia Pacific',
    modelsServed: ['DeepSeek R1', 'DeepSeek V3'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'together-ai',
    name: 'Together AI',
    status: 'operational',
    uptimePercent: 99.85,
    avgLatencyMs: 320,
    throughputTps: 135,
    region: 'US & EU',
    modelsServed: ['DeepSeek R1', 'DeepSeek V3', 'Qwen 2.5 Coder 32B', 'Llama 3.3 70B'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'deepinfra',
    name: 'DeepInfra',
    status: 'operational',
    uptimePercent: 99.89,
    avgLatencyMs: 290,
    throughputTps: 145,
    region: 'North America / Europe',
    modelsServed: ['DeepSeek R1', 'DeepSeek V3', 'Qwen 2.5 Coder 32B', 'Llama 3.1 8B'],
    updatedAt: new Date().toISOString()
  }
];
