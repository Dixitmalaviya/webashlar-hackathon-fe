export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FCE883',      // Light yellow
        secondary: '#C1DFFF',    // Soft blue
        accent: '#000000',       // Black text/buttons
        background: '#FDFDFD',  
        sidebarbg: '#1f2937',
        sidebarprimary: '#374151',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
 