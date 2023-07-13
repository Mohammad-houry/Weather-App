/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flex: {
        100: '1 1 100%'
      },
      minWidth: {
        110: '110px',
        25: '25%'
      }
    }
  },
  plugins: []
}
