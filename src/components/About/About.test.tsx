import { render, screen, act } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import About from './index'

// ─── Mocks ────────────────────────────────────────────────────────────────────

let mockIsInView = false

jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_: object, tag: string) => {
      const M = ({
        children, variants, initial, animate, whileInView,
        exit, layout, custom, viewport, transition, ...rest
      }: React.PropsWithChildren<Record<string, unknown>>) => {
        const Tag = tag as React.ElementType
        return <Tag {...rest}>{children}</Tag>
      }
      M.displayName = `motion.${tag}`
      return M
    },
  }),
  useInView: () => mockIsInView,
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

// ─── Testes ───────────────────────────────────────────────────────────────────

describe('About', () => {
  beforeEach(() => {
    mockIsInView = false
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renderiza a section principal', () => {
    renderWithTheme(<About />)
    expect(screen.getByTestId('about-section')).toBeInTheDocument()
  })

  it('renderiza o visual block', () => {
    renderWithTheme(<About />)
    expect(screen.getByTestId('about-visual')).toBeInTheDocument()
  })

  it('renderiza o statement principal', () => {
    renderWithTheme(<About />)
    const statement = screen.getByTestId('about-statement')
    expect(statement).toHaveTextContent('DESIGN IS')
    expect(statement).toHaveTextContent('THINKING')
    expect(statement).toHaveTextContent('MADE VISIBLE')
  })

  it('renderiza o texto do corpo', () => {
    renderWithTheme(<About />)
    expect(screen.getByTestId('about-body')).toHaveTextContent(
      'We are a small, focused studio'
    )
  })

  it('renderiza os 3 stats', () => {
    renderWithTheme(<About />)
    expect(screen.getByTestId('stat-st1')).toBeInTheDocument()
    expect(screen.getByTestId('stat-st2')).toBeInTheDocument()
    expect(screen.getByTestId('stat-st3')).toBeInTheDocument()
  })

  it('contadores iniciam em 0 quando fora do viewport', () => {
    mockIsInView = false
    renderWithTheme(<About />)
    const counters = screen.getAllByTestId('counter-value')
    counters.forEach(counter => {
      expect(counter).toHaveTextContent('0')
    })
  })

  it('contador anima até o valor final quando entra no viewport', async () => {
    mockIsInView = true
    renderWithTheme(<About />)
    await act(async () => {
      jest.runAllTimers()
    })
    const counters = screen.getAllByTestId('counter-value')
    expect(counters[0]).toHaveTextContent('48+')
    expect(counters[1]).toHaveTextContent('7')
    expect(counters[2]).toHaveTextContent('100%')
  })

  it('renderiza os 4 serviços', () => {
    renderWithTheme(<About />)
    expect(screen.getByTestId('service-s1')).toBeInTheDocument()
    expect(screen.getByTestId('service-s2')).toBeInTheDocument()
    expect(screen.getByTestId('service-s3')).toBeInTheDocument()
    expect(screen.getByTestId('service-s4')).toBeInTheDocument()
  })

  it('serviços têm títulos corretos', () => {
    renderWithTheme(<About />)
    expect(screen.getByText('Product Strategy')).toBeInTheDocument()
    expect(screen.getByText('UX & Interface Design')).toBeInTheDocument()
    expect(screen.getByText('Design Systems')).toBeInTheDocument()
    expect(screen.getByText('Motion & Interaction')).toBeInTheDocument()
  })

  it('renderiza o grid de serviços', () => {
    renderWithTheme(<About />)
    expect(screen.getByTestId('services-grid')).toBeInTheDocument()
  })
})