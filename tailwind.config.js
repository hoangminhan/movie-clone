/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppin: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#467aeb",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
