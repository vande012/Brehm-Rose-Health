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
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    colors: {
      'light': '#D8E5E4',
      'white': '#FFFFFF',
      'blue': '#004FAA',
      'teal': '#1AACAC',
      'green': '#80ED99',
      'mint': '#C7F9CC',
    },
  },
  
  plugins: [require('@tailwindcss/typography')],
}
