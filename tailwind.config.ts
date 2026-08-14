import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: "#FAF9F6",
        ink: "#1A1916",
        brand: {
          gold: "#E8C87A",
          sage: "#9BAF8A",
          terra: "#C4735A",
        },
      },
      fontFamily: {
        display: ["'Arsenica'", "serif"],
        arabic: ["'Arsenica'", "serif"],
        serif: ["'Arsenica'", "serif"],
        sans: ["'Bricolage Grotesque'", "system-ui", "-apple-system", "sans-serif"],
        latin: ["'Bricolage Grotesque'", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
