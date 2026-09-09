import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        inkline: "#1C1C1C",
        border: "#2E2E2E",
        paper: "#EDEDED",
        muted: "#8B8B8B",
        amber: "#3ECF8E",
        sage: "#3ECF8E",
        clay: "#F97066",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
