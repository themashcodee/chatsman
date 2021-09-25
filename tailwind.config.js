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
          "2": "#222222",
          "3": "#333333",
          "4": "#444444",
          "5": "#555555",
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
        cblue: "#60A5FA",
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
