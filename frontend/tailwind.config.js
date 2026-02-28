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
          lightGray: '#F5F5F5',
          mediumGray: '#EEEEEE',
        },
        accent: {
          blue: '#0066FF',
          blueLight: '#4D94FF',
          blueDark: '#0052CC',
        },
        neutral: {
          darkGray: '#333333',
          gray: '#666666',
          lightGray: '#999999',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        'primary': '#FFFFFF',
        'secondary': '#F5F5F5',
        'dark': '#000000',
      }
    },
  },
  plugins: [],
}
