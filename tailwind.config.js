/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--c-base) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        surface2: 'rgb(var(--c-surface-2) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        ink2: 'rgb(var(--c-ink-2) / <alpha-value>)',
        ink3: 'rgb(var(--c-ink-3) / <alpha-value>)',
        cyan: 'rgb(var(--c-cyan) / <alpha-value>)',
        violet: 'rgb(var(--c-violet) / <alpha-value>)',
        warn: 'rgb(var(--c-warn) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Sora', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        cjk: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      animation: {
        reveal: 'reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        drift: 'drift 24s ease-in-out infinite alternate',
        'drift-2': 'drift2 30s ease-in-out infinite alternate',
        'pulse-soft': 'pulseSoft 4.5s ease-in-out infinite',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(var(--float-offset, -14px))' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '100%': { transform: 'translate3d(6%, 4%, 0) scale(1.18)' },
        },
        drift2: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1.12)' },
          '100%': { transform: 'translate3d(-5%, -6%, 0) scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
