/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '0px',
      'sm': '390px',
      'md': '768px',
      'lg': '1440px', 
    },
    extend: {
      animation: {
          'wiggle': 'wiggle 1s ease-in-out 6',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        brandblue: {
          50: "#e7f5ff",
          100: "#cfebff",
          200: "#9ed6ff",
          300: "#6ec2ff",
          400: "#3dadff",
          500: "#0d99ff",
          600: "#0a7acc",
          700: "#085c99",
          800: "#053d66",
          900: "#031f33"
        },
        brandblack: {
          50: "#e8e8e9",
          100: "#d2d2d2",
          200: "#a4a4a5",
          300: "#777778",
          400: "#49494b",
          500: "#1c1c1e",
          600: "#161618",
          700: "#111112",
          800: "#0b0b0c",
          900: "#060606"
        },
      }
    },
  },
  plugins: [],
}

