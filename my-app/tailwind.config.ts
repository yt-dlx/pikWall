import type { Config } from "tailwindcss";

export default {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        nordic: {
          bg0: "#2E3440",
          bg1: "#3B4252",
          bg2: "#434C5E",
          bg3: "#4C566A",
          fg0: "#D8DEE9",
          fg1: "#E5E9F0",
          fg2: "#ECEFF4",
          frost0: "#8FBCBB",
          frost1: "#88C0D0",
          frost2: "#81A1C1",
          frost3: "#5E81AC",
          aurora0: "#BF616A",
          aurora1: "#D08770",
          aurora2: "#EBCB8B",
          aurora3: "#A3BE8C",
          aurora4: "#B48EAD"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  darkMode: "class",
  plugins: []
} satisfies Config;
