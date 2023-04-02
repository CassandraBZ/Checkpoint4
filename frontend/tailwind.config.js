/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        blue: "#9DC3BD",
        green: "#B2B8A3",
        pink: "#E09999",
        orange: "#D2916D",
        yellow: "#EDCF85",
        main: "#6D3F50",
        "main-light": "#9D5E76",
        black: "#272727",
        white: "#F8F8F8",
        gray1: "#666666",
        gray2: "#999999",
        gray3: "#CCCCCC",
        gray4: "#F0F0F0",
        validation: "#389542",
        red: "#DA2C2C",
      },
      fontFamily: {
        asap: ["Asap", "sans-serif"],
        lilita: ["Lilita One", "cursive"],
      },
      extend: {
        spacing: {
          128: "32rem",
          144: "36rem",
        },
        borderRadius: {
          "4xl": "2rem",
        },
      },
      backgroundImage: {},
      boxShadow: {
        image: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
      fontSize: {
        xxs: "0.7rem",
      },
    },
  },
  plugins: [],
};
