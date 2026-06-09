/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flipkart: {
          primary: '#2874f0',
          blue: '#2874f0',
          light: '#f1f3f6',
          gray: '#878787',
          dark: '#000000',
          white: '#ffffff',
        }
      },
    },
  },
  plugins: [],
}
