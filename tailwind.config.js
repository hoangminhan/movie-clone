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
        primarybg: "#158370",
        textSecond: "#ffffff80",
      },
    },
    screens: {
      sm: "640px",
      md: "px",
      tablet: "769px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
