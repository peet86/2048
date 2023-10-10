/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Press Start 2P"', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}

