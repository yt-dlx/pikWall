import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  plugins: [daisyui],
  theme: { extend: { ontFamily: { Kurale: ["var(--font-Kurale)"], Brittany: ["var(--font-Brittany)"] } } },
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"]
} satisfies Config;
