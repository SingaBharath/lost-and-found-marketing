/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        kb: {
          bg: '#050508',
          card: '#0D0B14',
          cardBorder: '#261B3E',
          purple: '#8B5CF6',
          violet: '#7C3AED',
          pink: '#EC4899',
          cyan: '#06B6D4',
        },
      },
    },
  },
  plugins: [],
}
