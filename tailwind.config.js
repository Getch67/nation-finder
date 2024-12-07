/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        elementBg: "hsl(209, 23%, 22%)",
        bodyBg: "hsl(207, 26%, 17%)",
        textColor: "hsl(0, 0%, 100%)",
        hoverBg: "hsl(209, 23%, 18%)",
      },
      fontFamily: {
        serif: ["Nunito Sans", "sans-serif"],
      },
      fontSize: {
        mxl: "18px",
      },
    },
  },
  plugins: [],
};
