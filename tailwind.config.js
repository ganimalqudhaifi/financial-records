/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          color: "#fff",
          primary: "#1B262C",
          secondary: "#0F4C75",
          tertiary: "#3282B8",
          quaternary: "#BBE1FA",
        },
        bg: { color: "#222327" },
        main: { color: "#29fd53" },
      },
      animation: {
        pop: "pop .5s",
        wiggle: "wiggle .5s ease-in-out",
      },
      keyframes: {
        pop: {
          "0%": { scale: "0", opacity: ".2" },
          "100%": { scale: "1", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
