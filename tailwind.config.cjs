/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      mobile: {'max':'480px'},
      tablet: {'max':'768px'},
      laptop: {'max':'1220px'},
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
