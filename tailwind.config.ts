import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A3D91",
          50: "#EAF0FB",
          100: "#D5E1F7",
          200: "#ABC3EF",
          300: "#81A5E7",
          400: "#5787DF",
          500: "#2D69D7",
          600: "#0A3D91",
          700: "#083174",
          800: "#062557",
          900: "#04193A",
        },
        accent: {
          DEFAULT: "#FF7A00",
          50: "#FFF2E5",
          100: "#FFE0C2",
          200: "#FFC285",
          300: "#FFA347",
          400: "#FF8A1F",
          500: "#FF7A00",
          600: "#CC6200",
          700: "#994A00",
        },
        surface: "#F8FAFC",
        dark: "#111827",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(10, 61, 145, 0.08)",
        "soft-lg": "0 12px 48px -8px rgba(10, 61, 145, 0.12)",
        glass: "0 8px 32px 0 rgba(10, 61, 145, 0.10)",
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle, rgba(10,61,145,0.08) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        "slide-in-left": "slide-in-left 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
