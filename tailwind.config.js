/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          25:  "#fcfaff",
          50:  "#f9f5ff",
          100: "#f4ebff",
          200: "#e9d7fe",
          300: "#d6bbfb",
          400: "#b692f6",
          500: "#9e77ed",
          600: "#7f56d9",
          700: "#6941c6",
          800: "#53389e",
          900: "#42307d",
        },
        gray: {
          25:  "#fcfcfd",
          50:  "#f9fafb",
          100: "#f2f4f7",
          200: "#eaecf0",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#182230",
          900: "#101828",
          950: "#0c111d",
        },
        error: {
          300: "#fda29b",
          500: "#f04438",
          600: "#d92d20",
          700: "#b42318",
        },
      },
      borderRadius: {
        sm:   "6px",
        md:   "8px",
        lg:   "10px",
        xl:   "12px",
        "2xl":"16px",
        full: "9999px",
      },
      boxShadow: {
        xs:   "0px 1px 2px 0px rgba(10,13,18,0.05)",
        sm:   "0px 1px 3px 0px rgba(10,13,18,0.10), 0px 1px 2px -1px rgba(10,13,18,0.10)",
        "xs-skeuomorphic":
          "0px 1px 2px 0px rgba(10,13,18,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05), inset 0px 0px 0px 1px rgba(10,13,18,0.18)",
        "focus-ring-brand":
          "0px 0px 0px 4px rgba(127,86,217,0.24)",
        "focus-ring-error":
          "0px 0px 0px 4px rgba(240,68,56,0.24)",
        "focus-ring-gray":
          "0px 0px 0px 4px rgba(152,162,179,0.20)",
      },
      spacing: {
        xxs: "2px",
        xs:  "4px",
        sm:  "6px",
        md:  "8px",
        lg:  "12px",
        xl:  "16px",
        "2xl":"20px",
        "3xl":"24px",
      },
    },
  },
  plugins: [],
};
