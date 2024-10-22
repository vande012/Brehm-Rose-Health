const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    extend: {
      colors: {
        custom: {
          'custom-blue': '#1E3A8A',
          'custom-teal': '#2DD4BF',
          'custom-orange': '#F97316',
          'custom-light': '#F3F4F6',
          'custom-dark': '#1F2937',
          light: '#E5E4E2', // Light gray for background
          dark: '#1F2937', // Deep slate gray for dark elements
          white: '#FFFFFF', // Pure white
          blue: '#015d9d', // Deep blue from the logo
          teal: '#14B8A6', // Balanced teal for accents
          green: '#01b26c', // Vibrant green from the logo
          mint: '#D1FAE5', // Soft mint for light backgrounds
        },
      },
    },
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
      robo: 'var(--font-roboto)',
      news: 'var(--font-newsreader)',
    },
  },

  plugins: [require('@tailwindcss/typography')],
}
