const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      blue: {
        50: '#eef8ff',
        100: '#d9efff',
        200: '#bce4ff',
        300: '#8ed4ff',
        400: '#59baff',
        500: '#2997ff',
        600: '#1987f5',
        700: '#1474e1',
        800: '#0066cc',
        900: '#0857A0',
      },
    },
    extend: {},
  },
  plugins: [],
}
