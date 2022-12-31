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
      ssm: "450px",
      sm: "640px",
      md: "768px",
      tablet: "769px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded", "h"],
  },
};
