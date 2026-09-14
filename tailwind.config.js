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
      }
    },
  },
  plugins: [],
}
