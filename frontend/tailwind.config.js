/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        honk: ['"Honk"', 'system-ui'],
      },
      colors: {
        guc: '#d32f2f', 
        dark: '#121212',
      },
      backgroundImage: {
        'hero-pattern': "url('/background.png')"
      }
    },
  },
  plugins: [],
}