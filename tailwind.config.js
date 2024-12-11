/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-gray-100',
    'bg-green-100',
    'bg-gray-200',
    'bg-red-100',
    'bg-purple-200',
    'bg-yellow-100',
    'bg-blue-100',
  ],
}

