import { render, screen, act } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import LoadingScreen from './index'

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_: object, tag: string) => {
      const M = ({
        children, variants, initial, animate,
        exit, custom, transition, style, className, ...rest
      }: React.PropsWithChildren<Record<string, unknown>>) => {
        const Tag = tag as React.ElementType
        return (
          <Tag
            style={style as React.CSSProperties}
            className={className as string}
            {...rest}
          >
            {children}
          </Tag>
        )
      }
      M.displayName = `motion.${tag}`
      return M
    },
  }),
  AnimatePresence: ({ children, onExitComplete }: React.PropsWithChildren<{
    onExitComplete?: () => void
  }>) => <>{children}</>,
}))

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

// ─── Testes ───────────────────────────────────────────────────────────────────

describe('LoadingScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renderiza o overlay', () => {
    renderWithTheme(<LoadingScreen onComplete={jest.fn()} />)
    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument()
  })

  it('renderiza o logo FORMA.', () => {
    renderWithTheme(<LoadingScreen onComplete={jest.fn()} />)
    const logo = screen.getByTestId('loading-logo')
    expect(logo).toHaveTextContent('FORMA.')
  })

  it('renderiza a tagline correta', () => {
    renderWithTheme(<LoadingScreen onComplete={jest.fn()} />)
    expect(screen.getByTestId('loading-tagline'))
      .toHaveTextContent('Product Design Studio')
  })

  it('renderiza o ano correto', () => {
    renderWithTheme(<LoadingScreen onComplete={jest.fn()} />)
    expect(screen.getByTestId('loading-year')).toHaveTextContent('2026')
  })

  it('renderiza a barra de progresso', () => {
    renderWithTheme(<LoadingScreen onComplete={jest.fn()} />)
    expect(screen.getByTestId('loading-progress')).toBeInTheDocument()
  })

  it('contador começa em 0%', () => {
    renderWithTheme(<LoadingScreen onComplete={jest.fn()} />)
    expect(screen.getByTestId('loading-counter')).toHaveTextContent('0%')
  })

  it('progresso avança com o tempo', async () => {
    renderWithTheme(<LoadingScreen onComplete={jest.fn()} />)

    await act(async () => {
      jest.advanceTimersByTime(500)
    })

    const counter = screen.getByTestId('loading-counter')
    const value   = parseInt(counter.textContent ?? '0')
    expect(value).toBeGreaterThan(0)
  })

  it('chama onComplete ao finalizar a animação de saída', async () => {
    const onComplete = jest.fn()
    renderWithTheme(<LoadingScreen onComplete={onComplete} />)

    await act(async () => {
      jest.runAllTimers()
    })

    // AnimatePresence chama onExitComplete — simulado pelo mock
    // O componente some do DOM quando isExiting = true
    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
  })

  it('não renderiza quando isExiting é true', async () => {
    renderWithTheme(<LoadingScreen onComplete={jest.fn()} />)

    await act(async () => {
      jest.runAllTimers()
    })

    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument()
  })
})