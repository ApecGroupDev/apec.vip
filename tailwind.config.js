/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',      // Adjusted path to include src
    './src/components/**/*.{js,ts,jsx,tsx}', // Adjusted path to include src
    './src/app/**/*.{js,ts,jsx,tsx}',        // Adjusted path to include src
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#e82228', // Custom color
      },
    },
  },
  plugins: [],
};
