/** @type {import('tailwindcss').Config} */
/** @type {import('@material-tailwind/react/utils/withMT').withMT} */

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
        Gabarito: ["Gabarito", "sans-serif"],
      },
      colors: {
        appThemeBlue: "#1d4ed8",
        appThemeYellow: "#fcd34d",
        appThemeDarkBlue: "#101D6B",
      },
    },
  },
  plugins: [],
};
