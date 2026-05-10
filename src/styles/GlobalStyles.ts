import { createGlobalStyle } from 'styled-components'
import type { Theme } from './theme'

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --bg:       ${({ theme }) => theme.colors.bg};
    --surface:  ${({ theme }) => theme.colors.surface};
    --border:   ${({ theme }) => theme.colors.border};
    --text:     ${({ theme }) => theme.colors.text};
    --muted:    ${({ theme }) => theme.colors.muted};
    --accent:   ${({ theme }) => theme.colors.accent};
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 300;
    line-height: 1.6;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    font-family: inherit;
  }

  /* Remove tap highlight no mobile */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.bg};
  }

   /* Melhora scroll em iOS */
  html, body {
    -webkit-overflow-scrolling: touch;
  }
`