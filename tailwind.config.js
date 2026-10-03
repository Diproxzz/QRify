/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0edff',
          200: '#c7dcfe',
          300: '#a1c2fd',
          400: '#729dfb',
          500: '#4370f7',
          600: '#2b52eb',
          700: '#213fcc',
          800: '#1e35a4',
          900: '#1e3082',
          950: '#141d50',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(67, 112, 247, 0.25)',
        'glow-md': '0 0 25px -4px rgba(67, 112, 247, 0.35)',
        'glow-lg': '0 0 40px -6px rgba(67, 112, 247, 0.45)',
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(0,0,0,0.04)',
        'premium-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255,255,255,0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.04)' },
        }
      }
    },
  },
  plugins: [],
}
