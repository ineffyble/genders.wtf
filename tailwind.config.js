module.exports = {
  purge: [
    './_site/**/*.html',
    './_includes/*.njk'
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'gender': ['XBAND-Rough']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
