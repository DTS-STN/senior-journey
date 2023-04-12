module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lato', 'sans-serif'],
        body: ['"Noto sans"', 'sans-serif'],
        extra: ['Patua One', 'cursive'],
      },
      borderWidth: {
        6: '6px',
      },
      colors: {
        basic: {
          gray: '#333',
          white: '#fff',
          darkgray: '#444',
        },
        accent: {
          main: '#26374A',
          error: '#d3080c',
          warning: '#ee7100',
          info: '#269abc',
          selected: '#333',
        },
        red: {
          light: '#f3e9e8',
          dark: '#d3080c',
        },
        link: {
          default: '#2b4380',
          selected: '#0535d2',
          visited: '#7834bc',
        },
        blue: {
          light: '#335075',
          normal: '#1c578a',
          default: '#091c2d',
          dark: '#26374a',
          deep: '#2e5274',
          active: '#16446c',
          link: '#284162',
          hover: '#0535D2',
        },
        gray: {
          light: '#e1e4e7',
          lighter: '#f8f8f8',
          normal: '#eaebed',
          default: '#dcdee1',
          dark: '#cfd1d5',
          deep: '#bbbfc5',
          modal: '#999999',
        },
        orange: {
          dark: '#e59700',
        },
        aqua: {
          default: '#274448',
        },
        primary: {
          50: '#cdf9ff',
          100: '#8ff2ff',
          200: '#4ed8e8',
          300: '#20bccc',
          400: '#00a0ae',
          500: '#008490',
          600: '#006972',
          700: '#004f56',
          800: '#00363c',
          900: '#001f23',
        },
        secondary: {
          50: '#e9f1ff',
          100: '#d0e4ff',
          200: '#9dcaff',
          300: '#6cb0f6',
          400: '#4f95d9',
          500: '#2f7bbd',
          600: '#0062a1',
          700: '#00497b',
          800: '#003257',
          900: '#001d35',
        },
      },
      backgroundImage: () => ({
        'footer-parliament-image': 'url(../../public/assets/landscape.png)',
        'splash-page': 'url(../../public/assets/sp-bg-1.jpg)',
      }),
      boxShadow: {
        card: '0px 2px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-elevation'),
  ],
}
