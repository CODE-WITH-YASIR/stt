import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        violet: {
          DEFAULT: "#300C41",
          deep: "#300C41",
          dark: "#240831",
          light: "#42125A",
        },
        lime: {
          DEFAULT: "#DEE948",
          light: "#E8F072",
          dark: "#CCD736",
        },
        brand: {
          violet: "#300C41",
          lime: "#DEE948",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "blueprint-grid": "linear-gradient(#300C41 1px, transparent 1px), linear-gradient(90deg, #300C41 1px, transparent 1px)",
      },
      animation: {
        "hero-float-center": "heroFloatCenter 5s ease-in-out infinite",
        "hero-float-1": "heroFloat1 6s ease-in-out infinite",
        "hero-float-2": "heroFloat2 5.5s ease-in-out infinite 0.75s",
        "hero-float-3": "heroFloat3 6.5s ease-in-out infinite 1.5s",
        "hero-float-4": "heroFloat4 5.8s ease-in-out infinite 2.25s",
        "hero-pulse": "heroPulse 3.5s ease-in-out infinite",
        "hero-line": "heroLineFlow 3s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        heroFloatCenter: {
          "0%, 100%": { transform: "translate(-50%, -50%) translateY(0px)" },
          "50%": { transform: "translate(-50%, -50%) translateY(-6px)" },
        },
        heroFloat1: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        heroFloat2: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        heroFloat3: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-7px)" },
        },
        heroFloat4: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-9px)" },
        },
        heroPulse: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(1.08)" },
        },
        heroLineFlow: {
          "0%": { strokeDashoffset: "28" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
