/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7f7',
          100: '#d9ecec',
          200: '#b3d9d9',
          300: '#8cc6c6',
          400: '#66b3b3',
          500: '#408080',
          600: '#336666',
          700: '#264d4d',
          800: '#1a3333',
          900: '#0d1a1a',
        }
      }
    },
  },
  plugins: [],
};