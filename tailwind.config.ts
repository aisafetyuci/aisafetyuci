import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

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
      // Blog article text (`prose prose-brand`), recolored to the brand palette.
      typography: {
        brand: {
          css: {
            '--tw-prose-body': '#4d5b73',
            '--tw-prose-headings': '#18234e',
            '--tw-prose-lead': '#4d5b73',
            '--tw-prose-links': '#18234e',
            '--tw-prose-bold': '#18234e',
            '--tw-prose-counters': '#65728a',
            '--tw-prose-bullets': '#7b8aa6',
            '--tw-prose-hr': '#dce1eb',
            '--tw-prose-quotes': '#273553',
            '--tw-prose-quote-borders': '#bdcae6',
            '--tw-prose-captions': '#65728a',
            '--tw-prose-kbd': '#18234e',
            '--tw-prose-code': '#18234e',
            '--tw-prose-pre-code': '#edf0f6',
            '--tw-prose-pre-bg': '#18234e',
            '--tw-prose-th-borders': '#bbc5d5',
            '--tw-prose-td-borders': '#dce1eb',
            // Posts write their own quotation marks and backticks; don't add more.
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            ':not(pre) > code': { backgroundColor: '#edf0f6', borderRadius: '0.375rem', padding: '0.125rem 0.375rem', fontWeight: '500' },
            // Honor Markdown table column alignment (| ---: |).
            'th[align="right"], td[align="right"]': { textAlign: 'right' },
            'th[align="center"], td[align="center"]': { textAlign: 'center' },
          },
        },
      },
    },
  },
  plugins: [typography],
}
export default config
