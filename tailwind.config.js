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
      'textColor': '#e8e8e8',
      'borderColor': '#515151'
    }
  },
  plugins: [],
}