/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        ltr: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        ltr: 'ltr 0.75s infinite',
      },
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    }
  },
  plugins: [],
}
