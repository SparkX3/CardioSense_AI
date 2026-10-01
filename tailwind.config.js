/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        stone: {
          50: '#FAF8F5',
          100: '#F4F1EA',
          200: '#ECE8E1',
          300: '#DDD7CC',
          400: '#C5BDAF',
          500: '#9F9788',
          600: '#7B7466',
          700: '#5A544A',
          800: '#3D3830',
          900: '#23201A',
        },
        forest: {
          50: '#F0F5F2',
          100: '#DEEBE2',
          200: '#BDD7C6',
          300: '#94BEA3',
          400: '#649E79',
          500: '#3D7C55',
          600: '#2D6142',
          700: '#244D34',
          800: '#1C3326', // Atria signature deep green
          900: '#15241B',
          950: '#0E1712',
        },
        terracotta: {
          500: '#B84A39',
          600: '#9E3B30',
        },
        ochre: {
          500: '#C29B38',
          600: '#A6822B',
        }
      },
    },
  },
  plugins: [],
}
