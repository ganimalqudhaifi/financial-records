/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
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
      // Design system: trustworthy fintech (see design-system/financial-records/MASTER.md)
      fontFamily: {
        plex: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
      },
      animation: {
        pop: "pop .5s",
        wiggle: "wiggle .5s ease-in-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up .6s ease-out both",
        shimmer: "shimmer 2.2s linear infinite",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
