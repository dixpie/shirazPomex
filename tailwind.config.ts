import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0073bc",
          50: "#eaf5fc",
          100: "#cfe8f7",
          200: "#9fd0ef",
          300: "#6fb9e7",
          400: "#3fa1df",
          500: "#0073bc",
          600: "#00629f",
          700: "#004e7f",
          800: "#003a5f",
          900: "#00263f",
        },
      },
      fontFamily: {
        vazir: ["var(--font-vazir)", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 14px 0 rgba(0, 115, 188, 0.08)",
      },
      keyframes: {
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(0,115,188,0.45)" },
          "100%": { boxShadow: "0 0 0 14px rgba(0,115,188,0)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.6s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
