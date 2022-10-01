/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/views/**/*.{ejs,js,ts}'],
  theme: {
    extend: {
      zIndex: {
        1: '1',
        '-1': '-1',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
