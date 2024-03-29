/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Be Vietnam Pro', 'sans-serif']
    },
    extend: {
      colors: {
        'usr-black': '#1B1D1F',
        'usr-gray': '#282B30',
        'usr-lightgray': '#6C727F',
        'usr-blue': '#4E80EE',
        'usr-white': '#D2D5DA'
      }
    }
  },
  plugins: []
}
