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
        'tablet': {'min':'450px','max': '850px'},
        'exactly1400': {'max': '1400px'},
        'exactly1250': {'max': '1250px'},
        'exactly1350': {'max': '1350px'},
        'exactly850': {'max': '850px'},
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out both',
        'slide-in-left': 'slide-in-left 1s ease-out both',
        'slide-in-right': 'slide-in-right 1s ease-out both',
        'zoom-in': 'zoomIn 1s ease-out both' ,
      },
      keyframes: {
        'fadeIn': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
         },
      },
    },
  },
  plugins: [],
}
