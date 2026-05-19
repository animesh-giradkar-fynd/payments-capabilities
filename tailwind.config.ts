import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fynd: {
          primary: '#3535F3',
          primaryHover: '#2E31BE',
          primarySoft: '#E8E8FC',
          text: '#141414',
          mako: '#41434C',
          subdued: '#5C5C5C',
          muted: '#757575',
          border: '#E0E0E0',
          iron: '#E4E5E6',
          surface: {
            0: '#FFFFFF',
            10: '#FAFAFA',
            20: '#F5F5F5',
            30: '#F0F0F0',
          },
          success: {
            20: '#E9F7E9',
            50: '#25AB21',
            80: '#135610',
          },
          warning: {
            20: '#FEF0E7',
            50: '#F06D0F',
            80: '#7D2F08',
          },
          error: {
            20: '#FEE6EA',
            50: '#F50031',
            80: '#660014',
          },
        },
      },
      boxShadow: {
        fynd: '0 1px 2px rgba(20, 20, 20, 0.06)',
        'fynd-hover': '0 6px 16px rgba(20, 20, 20, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
