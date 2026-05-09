export const theme = {
  colors: {
    bg: '#0A0A0A',
    surface: '#111111',
    border: '#1E1E1E',
    text: '#F0EDE8',
    muted: '#555555',
    accent: '#C8FF00',
    accentDark: '#9CBD00',
  },
  fonts: {
    display: '"Bebas Neue", sans-serif',
    body: '"DM Sans", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '4rem',
    xl: '8rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  },
  transitions: {
    fast: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    spring: '0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const

export type Theme = typeof theme