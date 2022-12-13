/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        text: {
          color: '#fff',
          primary: '#1B262C',
          secondary: '#0F4C75',
          tertiary: '#3282B8',
          quaternary: '#BBE1FA',
        },
        bg: {
          color: '#222327',
        },
        main: {
          color: '#29fd53',
        },
      },
      animation: {
        pop: 'pop .5s',
      },
      keyframes: {
        pop: {
          '0%': { scale: '0', opacity: '.2' },
          '100%': { scale: '1', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
