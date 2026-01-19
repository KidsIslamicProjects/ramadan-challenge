/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tufuli: ["Tufuli", "sans-serif"], // Add Tufuli font
      },
      colors: {
        white: "#F9FFF6",
        main: "#86977D",
        secondary: "#DA8568",
        thirdly: "#414C62",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
