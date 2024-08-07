/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily : {
      'IBM': ['IBM Plex Sans', 'sans-serif'],
      'IBM-Mono': ['IBM Plex Mono', 'sans-serif']
    },
    colors: {
      'bgMain': '#000804',
      'textColor': '#e0e0e0',
      'borderColor': '#515151',
      'textGray': '#444444'
    }
  },
  plugins: [],
}