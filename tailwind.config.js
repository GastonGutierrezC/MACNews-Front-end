
const {fontFamily} = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",        // Archivos dentro de la carpeta "pages"
    "./Viuw/**/*.{js,ts,jsx,tsx}",         // Archivos dentro de la carpeta "Viuw"
    "./Controller/**/*.{js,ts,jsx,tsx}",   // Archivos dentro de la carpeta "Controller"
    "./Model/**/*.{js,ts,jsx,tsx}"         // Archivos dentro de la carpeta "Model"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
