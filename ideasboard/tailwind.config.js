/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,jsx,tsx,js,ts}'
  ],
  theme: {
    extend: {
      boxShadow: {
        'top': '0 -1px 3px 0 rgb(0 0 0 / 0.1)',
        'top-sm': '0 -1px 2px 0 rgb(0 0 0 / 0.1)',
        'top-md': '0 -4px 6px 0 rgb(0 0 0 / 0.1)'
      }
    },
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
      'wide': '1500px',
    },
  },
  plugins: [],
};
