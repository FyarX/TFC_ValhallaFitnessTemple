/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily:{
        'bebas': ['"Bebas Neue"', 'sans-serif'],
        'anton': ['Anton SC', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      },
      colors: {
        'gold': '#FFD700',
        'negro_mate': '#28282B'
      },
      screens: {
        'movil': {'max':'600px'},
        'movil_pequeno': {'max':'450px'},
        'tablet': {'min':'450px','max': '850px'}
      }
    },
  },
  plugins: [],
}
