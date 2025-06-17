/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        shine: {
          shine: {
            '0%, 100%': { backgroundColor: '#A9A9A9' },
    '50%': { backgroundColor: '#C0C0C0' },
          },
        },
      },
      animation: {
        shine: 'shine 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
