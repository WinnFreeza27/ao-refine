/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    
    extend: {
      fontFamily: {
        'poppins' : ["Poppins", "sans-serif"]
      },
      colors: {
        "blue-primary" : "#535C91",
        "blue-dark" : "#070F2B",
        "bg-purple" : "#4A2657",
        "bg-purple-dark" : "#0E0B2E",
        "bg-transparent" : "#0A0A0A",
        "bd-grey" : "#252525",
        "cyanide" : "#2FFFB4"
      },
    },
  },
  plugins: [],
}

