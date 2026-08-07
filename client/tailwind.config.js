/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Semantic tokens — resolved from CSS variables in index.css.
           These flip automatically between light (beige) and dark (charcoal). */
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elevated: 'rgb(var(--surface-2) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--fg-muted) / <alpha-value>)',
        subtle: 'rgb(var(--fg-subtle) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-fg': 'rgb(var(--accent-fg) / <alpha-value>)',
        /* Inverted pair — near-black on light, cream on dark. Primary CTAs. */
        invert: 'rgb(var(--invert) / <alpha-value>)',
        'invert-fg': 'rgb(var(--invert-fg) / <alpha-value>)',

        /* Raw scales, for cases that need a fixed value in both themes. */
        ink: {
          50: '#f6f6f5',
          100: '#e7e7e5',
          200: '#d1d0cd',
          300: '#b0aeaa',
          400: '#8a8782',
          500: '#6d6a65',
          600: '#5d5a55',
          700: '#4f4c48',
          800: '#454340',
          850: '#383838',
          900: '#2a2a2a',
          950: '#1a1a1a',
          975: '#111111',
        },
        sand: {
          50: '#fdfcfa',
          100: '#faf7f2',
          200: '#f4efe6',
          300: '#ebe3d5',
          400: '#ddd1bd',
          500: '#c9b99e',
          600: '#b09b7c',
          700: '#8f7c60',
          800: '#6f6049',
          900: '#4d4232',
        },
        clay: {
          50: '#fbf6f1',
          100: '#f5e9dd',
          200: '#e9d0b8',
          300: '#dab392',
          400: '#c8926b',
          500: '#b87a52',
          600: '#a56544',
          700: '#89503a',
          800: '#6f4232',
          900: '#5b382c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.12)',
        lift: '0 2px 4px rgb(0 0 0 / 0.04), 0 18px 40px -16px rgb(0 0 0 / 0.22)',
        float: '0 8px 12px -6px rgb(0 0 0 / 0.06), 0 32px 64px -24px rgb(0 0 0 / 0.28)',
        inset: 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite',
        'fade-in': 'fade-in 0.4s ease-out both',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
