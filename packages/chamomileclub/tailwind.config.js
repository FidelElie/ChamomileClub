module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#35654d",
        secondary: "#CA2F00",
        inverted: "#4c3f5b",
        invertedLight: "#67567a",
        invertedDark: "#282130",
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms")
  ],
  variants: {
    scrollbar: ["dark", "rounded"],
    extend: {
      opacity: ["disabled"],
    },
  },

}
