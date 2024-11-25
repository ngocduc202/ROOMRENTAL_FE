/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width : {
        '1100' : '1100px'
      },
      backgroundColor :{
        primary : '#F5F5F5',
        secondary1 : '#1266dd',
        secondary2 : '#f73859',
        "overlay-30" : 'rgba(0,0,0,0.3)',
        "overlay-70" : 'rgba(0,0,0,0.7)'
      },
      maxWidth : {
        '600' : '600px' ,
        '1100' : '1100px'
      },
      minWidth : {
        '300' : '300px' ,
        '200' : '200px'
      },
      flex : {
        '2' : '2 2 0%',
        '3' : '3 3 0%',
        '4' : '4 4 0%',
        '5' : '5 5 0%',
        '6' : '6 6 0%',
        '7' : '7 7 0%',
        '8' : '8 8 0%',
        '9' : '9 9 0%',
        '10' : '10 10 0%',
        '11' : '11 11 0%',
        '12' : '12 12 0%',
      }
    },
  },
  plugins: [],
}
