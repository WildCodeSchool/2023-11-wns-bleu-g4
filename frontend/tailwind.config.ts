import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/**/*.{css,js,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cactus: {
          '50': '#E1E7E1',
          '100': '#CAD6CC',
          '200': '#D0DAD4',
          '300': '#91B195',
          '400': '#4F6F52',
          '500': '#194D2E',
          '600': '#324335',
          '700': '#2C3B32',
          '800': '#2a3b2c',
          '900': '#233125',
          '950': '#0B0F0B',
        },
        dark: '#140111',
        light: '#F5EEE5',
        accent: '#E66300',
        babyGreen: '#B2E6C7',
      },
      fontFamily: {
        header: ['"Poppins"', 'sans-serif'],
        sans: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
