module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      red: {
        light: "#f5b0b5",
        DEFAULT: "#e63946",
        dark: "#ad2b35"
      },
      melon: {
        light: "#f5fcf3",
        DEFAULT: "#f1faee",
        dark: "#d9e1d6",
        darkest: "#b5bcb3"
      },
      sky: {
        light: "#dcf0f1",
        DEFAULT: "#a8dadc",
        dark: "#7ea4a5"
      },
      blue: {
        light: "#afc9ff",
        DEFAULT: "#3777ff",
        dark: "#2959bf"
      },
      wolf: {
        light: "#75798c",
        DEFAULT: "#3a405a",
        dark: "#2c3044"
      },
      white: "#ffffff",
      black: "#2a2a2a"
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
