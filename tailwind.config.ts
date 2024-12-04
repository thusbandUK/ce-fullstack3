import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',      
      'md': '1rem',
      'lg': '1.5rem',
      'full': '9999px',
      'large': '12px',
    },    
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'elephant-red': '#f28972',
        'elephant-orange': '#F2C48D',
        'elephant-pink': '#D98FBF',
        'elephant-violet': '#8268A6',
        'elephant-bright-orange': '#F2B441',
      },
      height: {
        '25-vh': '25vh',
        '68-vh': '68vh',
        '17-vh': '17vh',
        '84-vh': '84vh',
        '50-vh': '50vh',
        '56-vh': '56vh',
        '28-vh': '28vh',
        '16-vh': '16vh',
        '14-vh': '14vh',
        '26-vh': '26vh',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;