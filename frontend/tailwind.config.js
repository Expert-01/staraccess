/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#FFFFFF',
          black: '#000000',
          darkBg: '#0A0A0A',
          charcoal: '#1A1A1A',
          darkGray: '#2D2D2D',
          lightGray: '#F5F5F5',
          mediumGray: '#EEEEEE',
        },
        accent: {
          gold: '#D4AF37',
          goldLight: '#E8C547',
          goldDark: '#B8860B',
          bronze: '#CD7F32',
        },
        neutral: {
          darkGray: '#333333',
          gray: '#666666',
          lightGray: '#999999',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundColor: {
        'primary': '#FFFFFF',
        'secondary': '#F5F5F5',
        'dark': '#0A0A0A',
        'darkerBg': '#1A1A1A',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
        'hero-overlay': 'linear-gradient(rgba(10, 10, 10, 0.6), rgba(10, 10, 10, 0.6))',
      }
    },
  },
  plugins: [],
}
