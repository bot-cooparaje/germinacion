module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Alegreya Sans', 'sans-serif'],
      serif: ['Alegreya', 'serif'],
      mono: ['Alegreya Sans SC', 'sans-serif'],

    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/custom-forms'),
  ],
}
