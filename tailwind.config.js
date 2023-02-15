/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        ltr: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        ltr: 'ltr 0.75s infinite',
        rotate: 'rotate 10s infinite linear',
        fadeIn: 'fadeIn 2s linear',
      },
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
    }
  },
  plugins: [],
}
