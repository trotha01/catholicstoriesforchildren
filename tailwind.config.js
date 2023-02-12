/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./feastdayactivities/index.html",
    "./feastdayactivities/**/*.{html,js}",
    "./src/**/*.elm"
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
        'csc-darkpurple': '#B99EDA'
      }
    },
  },
  plugins: [],
}
