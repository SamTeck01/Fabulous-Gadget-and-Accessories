/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
      'text-gold',
      'text-gold2',
    ],
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#f0f2f5',
        secondary: '#ff813f',
        tertiary: '#222222',
        'light-orange': '#ff813f',
        'dark-orange': '#e6733a',
        'orange-dark': '#d65a2a',
        slate: {
          10: '#f1f3f4',
        },
        ash: '#575757',
        gold: '#fdfbf4',
        gold3: '#E49900',
        gold2: '#e68a00',
        green: {
          50: '#30AF5B',
          90: '#292C27',
        },
        gray: {
          10: '#EEEEEE',
          20: '#A2A2A2',
          30: '#7B7B7B',
          50: '#585858',
          90: '#141414',
        },
        // Custom dark mode colors that match the orange theme
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          accent: '#ff813f',
          text: '#f5f5f5',
          muted: '#a0a0a0',
        }
      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
      borderRadius: {
        '5xl': '40px',
      },
    },
  },
  plugins: [],
}
