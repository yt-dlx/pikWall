/** @type {import('tailwindcss').Config} */
import nativewindPreset from "nativewind/preset";
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [nativewindPreset],
  theme: {
    extend: {}
  },
  plugins: []
};
