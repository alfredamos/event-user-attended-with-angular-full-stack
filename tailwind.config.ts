import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class', // Enables dark mode based on a class presence
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
