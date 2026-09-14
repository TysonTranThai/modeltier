'use client';

import React from 'react';

interface CompanyLogoProps {
  creator: string;
  className?: string;
  size?: number;
}

export const getCreatorColor = (creator: string, modelName: string = ''): string => {
  const c = creator.toLowerCase();
  const m = modelName.toLowerCase();

  if (c.includes('anthropic') || m.includes('claude')) return '#D97757'; // Terracotta
  if (c.includes('openai') || m.includes('gpt')) return '#1E1E1E'; // Dark slate
  if (c.includes('meta') || m.includes('llama') || m.includes('muse')) return '#0081FB'; // Meta blue
  if (c.includes('zhipu') || m.includes('glm')) return '#0284C7'; // Sky blue
  if (c.includes('xai') || m.includes('grok')) return '#7C3AED'; // Purple
  if (c.includes('moonshot') || m.includes('kimi')) return '#2563EB'; // Blue
  if (c.includes('google') || m.includes('gemini')) return '#10B981'; // Emerald green
  if (c.includes('alibaba') || m.includes('qwen')) return '#F97316'; // Orange
  if (c.includes('deepseek')) return '#1D4ED8'; // Cobalt blue
  if (c.includes('k2') || m.includes('horizon')) return '#4338CA'; // Indigo
  if (c.includes('minimax')) return '#E11D48'; // Rose/Pink
  if (c.includes('nvidia') || m.includes('nemotron')) return '#84CC16'; // Lime
  if (c.includes('mistral')) return '#EA580C'; // Amber
  if (c.includes('inkling')) return '#475569'; // Slate
  return '#6366F1'; // Default Indigo
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ creator, className = 'w-4 h-4', size = 16 }) => {
  const c = creator.toLowerCase();

  if (c.includes('anthropic') || c.includes('claude')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Anthropic">
        <path d="M14.5 4.5L20 19.5H16.5L15.2 16H8.8L7.5 19.5H4L9.5 4.5H14.5ZM14.1 13L12 7.3L9.9 13H14.1Z" fill="#D97757" />
      </svg>
    );
  }

  if (c.includes('openai') || c.includes('gpt')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="OpenAI">
        <path d="M22 10.7c-.2-.9-.8-1.7-1.6-2.1-.2-.8-.7-1.5-1.4-2-.7-.5-1.5-.8-2.4-.7-.5-.7-1.2-1.3-2-1.6-.8-.3-1.7-.3-2.5 0-.6-.7-1.4-1.1-2.3-1.3-.9-.2-1.8 0-2.6.4-.8.5-1.4 1.2-1.7 2.1-.8.2-1.5.7-2 1.4-.5.7-.7 1.6-.6 2.5-.7.5-1.2 1.2-1.5 2-.3.8-.3 1.7 0 2.5.2.9.8 1.7 1.6 2.1.2.8.7 1.5 1.4 2 .7.5 1.5.8 2.4.7.5.7 1.2 1.3 2 1.6.8.3 1.7.3 2.5 0 .6.7 1.4 1.1 2.3 1.3.9.2 1.8 0 2.6-.4.8-.5 1.4-1.2 1.7-2.1.8-.2 1.5-.7 2-1.4.5-.7.7-1.6.6-2.5.7-.5 1.2-1.2 1.5-2 .3-.8.3-1.7 0-2.5zm-8.3 9.4c-1.7 0-3.1-.9-3.9-2.3l1.3-.8c.6 1 1.6 1.6 2.6 1.6 1.6 0 2.9-1.2 3.1-2.8l1.5.3c-.3 2.2-2.1 4-4.6 4zm-6.6-3.8c-1.2-1.2-1.7-2.8-1.5-4.5l1.5.2c-.2 1.3.2 2.6 1.1 3.5 1.1 1.1 2.8 1.4 4.2.7l.8 1.3c-1.9 1-4.4.6-6.1-1.2zm-1.8-7.5c.5-1.6 1.7-2.8 3.3-3.2l.4 1.5c-1.2.3-2.2 1.2-2.6 2.4-.6 1.5-.1 3.1 1.1 4.1l-1 1.2c-1.7-1.4-2.3-3.9-1.2-6zm7.2-4.9c1.7 0 3.1.9 3.9 2.3l-1.3.8c-.6-1-1.6-1.6-2.6-1.6-1.6 0-2.9 1.2-3.1 2.8l-1.5-.3c.3-2.2 2.1-4 4.6-4zm6.6 3.8c1.2 1.2 1.7 2.8 1.5 4.5l-1.5-.2c.2-1.3-.2-2.6-1.1-3.5-1.1-1.1-2.8-1.4-4.2-.7l-.8-1.3c1.9-1 4.4-.6 6.1 1.2zm1.8 7.5c-.5 1.6-1.7 2.8-3.3 3.2l-.4-1.5c1.2-.3 2.2-1.2 2.6-2.4.6-1.5.1-3.1-1.1-4.1l1-1.2c1.7 1.4 2.3 3.9 1.2 6z" fill="#1E1E1E" />
      </svg>
    );
  }

  if (c.includes('meta') || c.includes('llama') || c.includes('muse')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Meta">
        <path d="M12 15.5C10.5 15.5 9.2 14.8 8.2 13.5C7.2 12.2 6.5 10.4 6.5 8.5C6.5 6.6 7.2 4.8 8.2 3.5C9.2 2.2 10.5 1.5 12 1.5C13.5 1.5 14.8 2.2 15.8 3.5C16.8 4.8 17.5 6.6 17.5 8.5C17.5 10.4 16.8 12.2 15.8 13.5C14.8 14.8 13.5 15.5 12 15.5Z" stroke="#0081FB" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 14C4.2 14 2 11.8 2 9C2 6.2 4.2 4 7 4C9 4 10.7 5.2 11.5 7" stroke="#0081FB" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M17 14C19.8 14 22 11.8 22 9C22 6.2 19.8 4 17 4C15 4 13.3 5.2 12.5 7" stroke="#0081FB" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (c.includes('google') || c.includes('gemini')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-label="Google">
        <path d="M12 5C15.3 5 17.6 6.4 18.9 7.6L22.2 4.3C20.2 2.4 16.5 0.5 12 0.5C7.3 0.5 3.3 3.2 1.3 7.1L5.1 10C6 7.1 8.8 5 12 5Z" fill="#EA4335" />
        <path d="M23.5 12.3C23.5 11.5 23.4 10.7 23.2 10H12V14.6H18.5C18.2 16.1 17.3 17.4 15.9 18.3L19.7 21.2C21.9 19.2 23.5 16.1 23.5 12.3Z" fill="#4285F4" />
        <path d="M5.1 14C4.8 13.1 4.7 12.1 4.7 11.1C4.7 10.1 4.8 9.1 5.1 8.2L1.3 5.3C0.5 7 0 8.9 0 11.1C0 13.2 0.5 15.2 1.3 16.9L5.1 14Z" fill="#FBBC05" />
        <path d="M12 23.5C15.5 23.5 18.5 22.3 20.7 20.3L16.9 17.4C15.8 18.1 14.1 18.8 12 18.8C8.8 18.8 6 16.7 5.1 13.8L1.3 16.7C3.3 20.6 7.3 23.5 12 23.5Z" fill="#34A853" />
      </svg>
    );
  }

  if (c.includes('zhipu') || c.includes('glm')) {
    return (
      <div className="flex items-center justify-center font-bold text-[10px] text-white bg-sky-600 rounded-sm w-4 h-4 leading-none">
        Z
      </div>
    );
  }

  if (c.includes('xai') || c.includes('grok')) {
    return (
      <div className="flex items-center justify-center font-bold text-[10px] text-white bg-purple-700 rounded-sm w-4 h-4 leading-none">
        𝕏
      </div>
    );
  }

  if (c.includes('moonshot') || c.includes('kimi')) {
    return (
      <div className="flex items-center justify-center font-bold text-[10px] text-white bg-blue-600 rounded-sm w-4 h-4 leading-none">
        K
      </div>
    );
  }

  if (c.includes('alibaba') || c.includes('qwen')) {
    return (
      <div className="flex items-center justify-center font-bold text-[10px] text-white bg-orange-600 rounded-sm w-4 h-4 leading-none">
        Q
      </div>
    );
  }

  if (c.includes('deepseek')) {
    return (
      <div className="flex items-center justify-center font-bold text-[10px] text-white bg-blue-700 rounded-sm w-4 h-4 leading-none">
        🐋
      </div>
    );
  }

  if (c.includes('nvidia') || c.includes('nemotron')) {
    return (
      <div className="flex items-center justify-center font-bold text-[9px] text-white bg-lime-600 rounded-sm w-4 h-4 leading-none">
        NV
      </div>
    );
  }

  if (c.includes('mistral')) {
    return (
      <div className="flex items-center justify-center font-bold text-[10px] text-white bg-amber-600 rounded-sm w-4 h-4 leading-none">
        M
      </div>
    );
  }

  if (c.includes('minimax')) {
    return (
      <div className="flex items-center justify-center font-bold text-[9px] text-white bg-pink-600 rounded-sm w-4 h-4 leading-none">
        MM
      </div>
    );
  }

  // Fallback icon
  return (
    <div className="flex items-center justify-center font-bold text-[10px] text-white bg-slate-700 rounded-sm w-4 h-4 leading-none">
      {creator.charAt(0).toUpperCase()}
    </div>
  );
};
