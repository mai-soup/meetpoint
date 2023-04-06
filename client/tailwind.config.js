/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "#fffcf2",
        "light-grey": "#ccc5b9",
        "dark-grey": "#403d39",
        "darkest-grey": "#252422",
        "orange-muted": "#eb5e28",
      },
      fontFamily: {
        sans: ["Sora", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
