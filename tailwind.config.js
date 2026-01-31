/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9b87f5',
        dark: '#0a0e1a',
      },
      fontFamily: {
        sans: ['Century Gothic', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        virgo: ['"Virgo 01"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}