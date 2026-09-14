/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#120905',
          900: '#1A0E08',
          850: '#22130C',
          800: '#2A170E',
          750: '#331D12',
          700: '#422517',
          600: '#5A3420',
          500: '#7A472C',
        },
        warmOrange: {
          400: '#FF8452',
          500: '#FF6B35', // Signature Ledger Orange
          600: '#F0541E',
          700: '#D84315',
          800: '#BF360C',
        },
        ivory: {
          50: '#FFFDF9',
          100: '#FFF6EE',
          200: '#EFE2D6',
          300: '#D8C4B6',
          400: '#B8A08F',
          500: '#8A7262',
        },
        tier: {
          s: '#FF6B35',
          's-bg': 'rgba(255, 107, 53, 0.12)',
          a: '#F59E0B',
          'a-bg': 'rgba(245, 158, 11, 0.12)',
          b: '#10B981',
          'b-bg': 'rgba(16, 185, 129, 0.12)',
          c: '#38BDF8',
          'c-bg': 'rgba(56, 189, 248, 0.12)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -3px rgba(255, 107, 53, 0.35)',
        'glow-orange-lg': '0 0 50px -5px rgba(255, 107, 53, 0.45)',
        'card-espresso': '0 10px 30px -10px rgba(10, 5, 3, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(10px, -12px) scale(1.04)' },
        },
        'radar-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(255, 107, 53, 0.35)', boxShadow: '0 0 15px rgba(255, 107, 53, 0.15)' },
          '50%': { borderColor: 'rgba(255, 107, 53, 0.8)', boxShadow: '0 0 30px rgba(255, 107, 53, 0.4)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite ease-in-out',
        'float-slow': 'float-slow 8s infinite ease-in-out',
        'radar-spin': 'radar-spin 4s linear infinite',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'border-pulse': 'border-pulse 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
