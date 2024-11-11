import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "red-100": "#FA7275",
        "red-200": "#EA6365",
        "dark-200": "#131524",
        "dark-100": "#333F4E",
        "gray-50": "#F2F4F8",
      },
      boxShadow: {
        "custom": 'rgba(0, 0, 0, 0.1) 0px 10px 50px'
      }
    },
  },
  plugins: [],
} satisfies Config;
