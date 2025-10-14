/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,elm,html}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'calendar': '50px 1fr'
      },
      colors: {
        'csc-lightblue': '#9DE3EC',
        'csc-darkblue': '#395D73',
        'csc-lightpurple': '#EBD7F2',
        'csc-darkpurple': '#B99EDA',
        'csc-yellow': '#FEBD11',
        'dark-gray': '#333'
      },
      fontSize: {
        'h1': '38px',
        'h2': '32px'
      }
    },
  },
  plugins: [],
}
