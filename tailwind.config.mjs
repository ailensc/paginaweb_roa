/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rose: { 950: "#1a0a14", 900: "#2d0f1e", 800: "#4c1a30", 700: "#7a2d50", 600: "#b8487a" },
        violet: { 950: "#0f081a", 900: "#1c0f2d", 800: "#2f1a4c", 700: "#50307a", 600: "#7a48b8" },
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        grotesk: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
