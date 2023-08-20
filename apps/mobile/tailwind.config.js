const path = require("path");
const tailwindConfig = require("@thechamomileclub/ui/tailwind.config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindConfig],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./library/**/*.{js,ts,jsx,tsx}",
    path.join(workspaceRoot, "./packages/ui/**/*.{js,jsx,ts,tsx}")
  ],
  plugins: [],
}

