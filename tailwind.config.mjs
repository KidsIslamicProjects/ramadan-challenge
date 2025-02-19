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
        white: "#FCFCFC",
        main: "#1D1A49",
        secondary: "#E96117",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
