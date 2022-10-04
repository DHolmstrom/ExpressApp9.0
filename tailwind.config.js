/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/views/**/*.{ejs,js,ts}', 'public/js/**/*.{ejs,js,ts}'],
  theme: {
    extend: {
      zIndex: {
        1: '1',
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
