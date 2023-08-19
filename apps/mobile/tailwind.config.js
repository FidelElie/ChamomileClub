const tailwindConfig = require("@thechamomileclub/tailwind/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindConfig],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./library/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      heading: ["Poller-One"],
      body: ["Not-Courier"]
    }
  },
  plugins: []
}

