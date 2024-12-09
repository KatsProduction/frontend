/** @type {import('tailwindcss').Config} */
export default {
  plugins: [
    require('flowbite/plugin')
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    backgroundColor:theme =>({
      ...theme('colors'),
       'menus': '#4B49AC',
       "bgmenu":'#0f172a'
    }),
    fontFamily: {
      poppins: ["Poppins", 'serif'],
      noto: ["Noto Sans", 'serif'],
      work: ["Work Sans", 'serif'],
      montserrat:["Montserrat", "sans-serif"]
    },
    extend: {
      screens: {
        'sm': '340px'
      },
      colors:{
        'linkblue':'#2d579f',
        'greyish':'#666',
        'accord':'#0878be'
      }
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    }
  },
  plugins: [],
}

