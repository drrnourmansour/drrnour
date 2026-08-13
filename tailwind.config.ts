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
        brand: {
          lime: "#C9FA3C",
          yellow: "#FFE500",
          pink: "#FF85B3",
          blue: "#40E0D0",
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
