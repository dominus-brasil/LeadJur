/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './LeadJur/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'law-navy': {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1929',
        },
        'law-gold': {
          50: '#fefaf0',
          100: '#fdf3d7',
          200: '#fbe8b5',
          300: '#f8d886',
          400: '#f4c455',
          500: '#d4a12a',
          600: '#b8891d',
          700: '#946f18',
          800: '#75571a',
          900: '#5e471a',
          950: '#3a280c',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'law-gradient': 'linear-gradient(135deg, #0a1929 0%, #102a43 50%, #1a3a52 100%)',
      },
      fontFamily: {
        'serif': ['Crimson Text', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['Crimson Text', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}