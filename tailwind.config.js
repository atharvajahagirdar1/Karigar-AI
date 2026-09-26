/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          dark: '#183C2B',
          DEFAULT: '#24543A',
          muted: '#6F8B78',
        },
        terracotta: '#C96B4B',
        sand: '#F5EBDD',
        cream: '#FFF9F2',
        gold: '#D7A84B',
        charcoal: '#202520',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
