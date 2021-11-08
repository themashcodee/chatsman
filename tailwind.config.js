module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        cblack: {
          "1": "#111111",
          "2": "#121212",
          "3": "#212121",
          "4": "#333333",
          "5": "#444444",
        },
        cwhite: {
          "lightest": "#f5f5f5",
          "light": "#eee",
          "medium": "#cccccc",
          'darker': "#aaaaaa"
        },
        cred: {
          "light": "#FFDADA",
          "medium": "#FF928B",
          "dark": "#FF5A43"
        },
        cyellow: "#FFDB5B",
        cblue: "#3b82f6",
        cgreen: "#67FF9A"
      },
      zIndex: {
        "minus": "-1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
