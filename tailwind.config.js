// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.coolGray,
      teal: colors.teal,
      rose: colors.rose,
      white: colors.white
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
