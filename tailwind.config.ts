import type { Config } from 'tailwindcss'

// const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      width: {
        'plate': '28rem',
        'plate-small': '22rem',
      },
      maxWidth: {
        'plate': '28rem',
        'plate-small': '22rem',
      },
      colors: {
        'blue-light': '#1D3BBC',
        'blue-dark': '#000D43',
        'blue-medium': '#182458',
        'green-light': '#00CF15',
        'blue-light-extra': '#ECF4FF',
        'austrian-red': '#D80027',
        'austrian-red-border': '#ffffff40',
        'wp-control-panel': '#1d2327'
      },
      fontFamily: {
        // montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        // 'pt-sans-narrow': ['"PT Sans Narrow"', ...defaultTheme.fontFamily.sans],
        // 'road-numbers': ["RoadNumbers", ...defaultTheme.fontFamily.sans],
        // 'road-numbers-2': ["RoadNumbers2", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
export default config
