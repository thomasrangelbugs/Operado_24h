import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#10141b",
          muted: "#3d4754",
          soft: "#6b7585",
        },
        paper: {
          DEFAULT: "#e8ecf1",
          surface: "#ffffff",
          muted: "#dce2ea",
          wash: "#cfd8e3",
        },
        accent: {
          DEFAULT: "#0a7a5c",
          soft: "#cfe8df",
          deep: "#065743",
        },        navy: {
          DEFAULT: "#1e3a5f",
          soft: "#d6e0ec",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "42rem",
      },
    },
  },
  plugins: [],
};

export default config;
