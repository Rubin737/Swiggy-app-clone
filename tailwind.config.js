/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure JSX/TSX files are included
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};
