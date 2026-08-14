import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
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
        display: ["var(--font-amiri)", "Aref Ruqaa", "serif"],
        arabic: ["var(--font-readex)", "Cairo", "sans-serif"],
        latin: ["var(--font-bricolage)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
