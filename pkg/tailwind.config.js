/** @type {import('tailwindcss').Config} */
import nativewindPreset from "nativewind/preset";
const config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [nativewindPreset],
  theme: { extend: {} },
  plugins: []
};

export default config;
