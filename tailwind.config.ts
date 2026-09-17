import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#18234e',
          hover: '#111a3b',
          accent: '#53688a',
          muted: '#7b8aa6',
          light: '#bdcae6',
          border: '#dce1eb',
          wash: '#f7f8fb',
          soft: '#edf0f6',
        },
        gray: {
          50: '#f7f8fb', 100: '#edf0f6', 200: '#dce1eb',
          300: '#bbc5d5', 400: '#7b8aa6', 500: '#65728a',
          600: '#4d5b73', 700: '#394760', 800: '#273553', 900: '#18234e',
        },
      },
      boxShadow: {
        card: '0 2px 8px rgb(24 35 78 / 0.035)',
        'card-hover': '0 8px 24px rgb(24 35 78 / 0.07)',
      },
    },
  },
  plugins: [],
}
export default config
