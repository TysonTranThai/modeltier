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
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        tier: {
          s: '#ef4444',
          's-bg': 'rgba(239, 68, 68, 0.1)',
          a: '#f59e0b',
          'a-bg': 'rgba(245, 158, 11, 0.1)',
          b: '#10b981',
          'b-bg': 'rgba(16, 185, 129, 0.1)',
          c: '#3b82f6',
          'c-bg': 'rgba(59, 130, 246, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
