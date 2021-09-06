module.exports = {
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
          "2": "#222222",
          "3": "#333333",
          "4": "#444444",
          "5": "#555555",
        },
        cwhite: {
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
        cblue: "#967CFF",
        cgreen: "#A6FFB4"
      },
      zIndex: {
        "minus": "-1",
        "1": "1"
      },
      maxWidth: {
        "75p": "75%"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
