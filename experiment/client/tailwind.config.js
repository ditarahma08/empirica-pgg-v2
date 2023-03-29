const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Fredoka One", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },

      textShadow: {
        md4: "0px 6px 10px rgba(14, 31, 53, 0.12), 0px 12px 18px rgba(14, 31, 53, 0.2), 0px 20px 40px rgba(14, 31, 53, 0.12);",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-text-fill-stroke"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
}
