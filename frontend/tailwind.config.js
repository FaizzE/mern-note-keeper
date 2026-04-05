// tailwind.config.js
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Defining the exact navy from your input image
        brand: "#16113A",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        professional_serious: {
          primary: "#0EA5E9", // Serious Cyan-Blue
          "primary-content": "#FFFFFF",
          "base-100": "#16113A", // Your Image Background
          "base-200": "#0F0B29", // Slightly darker for depth
          "base-300": "#1E1B4B", // For subtle borders
          "base-content": "#F8FAFC", // Off-white text link color
          "--rounded-btn": "0.375rem", // Professional, serious corner radius
        },
      },
    ],
  },
};
