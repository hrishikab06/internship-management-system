/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#2c3e50',
          blue: '#4a90e2',
          lightBlue: '#e3f2fd',
          accent: '#2980b9'
        }
      }
    },
  },
  plugins: [],
}
