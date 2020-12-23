module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Merriweather Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['Fruktur', 'mono'],
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
