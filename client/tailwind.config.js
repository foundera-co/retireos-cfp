/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f1729',
        surface: '#1a2235',
        'surface-light': '#1e2a40',
        gold: '#d4af37',
        'gold-light': '#e8c84f',
        cream: '#f5f0e8',
        'text-muted': '#8892a4',
      },
      fontFamily: {
        sans: ['Rubik', 'Assistant', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
