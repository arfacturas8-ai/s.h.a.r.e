import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, inviting palette inspired by poetry and storytelling
        cream: {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#FAF4EA',
          300: '#F5EBD9',
          400: '#EDE0C8',
          500: '#E3D2B2',
        },
        charcoal: {
          50: '#F7F7F6',
          100: '#E3E3E1',
          200: '#C8C7C4',
          300: '#A6A5A1',
          400: '#85847F',
          500: '#6A6964',
          600: '#545350',
          700: '#3D3D3B',
          800: '#2A2A28',
          900: '#1A1A19',
          950: '#0D0D0C',
        },
        terracotta: {
          50: '#FEF6F3',
          100: '#FCE9E1',
          200: '#F9D4C6',
          300: '#F4B49E',
          400: '#EC8B6B',
          500: '#E06D47',
          600: '#CC4F2D',
          700: '#AB3E24',
          800: '#8C3522',
          900: '#742F21',
          950: '#3F150D',
        },
        sage: {
          50: '#F6F7F5',
          100: '#E3E7DF',
          200: '#C7D0C0',
          300: '#A4B198',
          400: '#828F74',
          500: '#657259',
          600: '#4F5A46',
          700: '#3F4739',
          800: '#343A30',
          900: '#2C3128',
          950: '#161914',
        },
        gold: {
          50: '#FDFBF3',
          100: '#FAF4DB',
          200: '#F4E7B3',
          300: '#ECD582',
          400: '#E2BE51',
          500: '#D5A632',
          600: '#BC8425',
          700: '#9C6421',
          800: '#814F22',
          900: '#6C421F',
          950: '#3E220E',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
