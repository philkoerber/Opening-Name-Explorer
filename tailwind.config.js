/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      instrument: ['Instrument Serif', "serif"],
        comfortaa: ['Comfortaa', "cursive"],
      vina: ["Vina Sans", "cursive"]
      },
      colors: {
        "dark0": "#FBE8DA",
        "dark1": "#8A897C",
        "dark2": "#BDBBB0",
        "light1": "#FBE8DA",
        "light2": "#FDF3ED",
        "accent": "#BB2511",
      }
    
    }
    
  },
  plugins: [],
}