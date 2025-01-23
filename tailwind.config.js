/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        elementBgDark: "hsl(209, 23%, 22%)",
        elementBgLight: "hsl(0, 0%, 100%)",
        bodyBgDark: "hsl(207, 26%, 17%)",
        bodyBgLight: "hsl(0, 0%, 98%)",
        textColorDark: "hsl(0, 0%, 100%)",
        textColorLight: "hsl(200, 15%, 8%)",
        textColorLight2: "rgba(16, 16, 25, 0.2)",
        hoverBgDark: "hsl(209, 23%, 18%)",
        hoverBgLight: "hsl(0, 0%, 90%)",
      },
      fontFamily: {
        serif: ["Nunito Sans", "sans-serif"],
      },
      fontSize: {
        mxl: "18px",
      },
      boxShadow: {
        custom: "0 0 8px rgba(0, 0, 0, 0.2)",
      },
      width: {
        detailFlag: "500px",
        max: "1440px",
      },
      height: {
        detailFlag: "340px",
        card: "330px",
      },
    },
  },
  plugins: [],
};
