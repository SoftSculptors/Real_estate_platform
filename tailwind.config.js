/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        estate: {
          sand: '#FFFDF6',    // Achtergrond
          honey: '#F5C242',    // Hoofdkleur
          gold: '#E6D4A8',     // Accentkleur
          earth: '#5B3924',    // Contrastkleur
          text: '#2F2F2F',     // Tekst
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
