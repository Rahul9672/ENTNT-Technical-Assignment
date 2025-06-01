/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 8px 32px 0 rgba(135, 206, 250, 0.5), 0 1px 8px rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [],
};
