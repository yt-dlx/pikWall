import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")({ nocompatible: true }), require("@tailwindcss/aspect-ratio")],
  theme: {
    extend: {
      aspectRatio: {
        "w-16": "16",
        "h-9": "9",
      },
      fontFamily: {
        Kurale: ["var(--font-Kurale)"],
        Brittany: ["var(--font-Brittany)"],
      },
    },
  },
};
export default config;
