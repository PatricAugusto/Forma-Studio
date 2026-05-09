import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import Hero from './index'

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_: object, tag: string) => {
      const MockMotion = ({
        children,
        variants,
        initial,
        animate,
        whileHover,
        whileTap,
        transition,
        style,
        className,
        ...rest
      }: React.PropsWithChildren<Record<string, unknown>>) => {
        const Tag = tag as React.ElementType
        return <Tag style={style as React.CSSProperties} className={className as string} {...rest}>{children}</Tag>
      }
      MockMotion.displayName = `motion.${tag}`
      return MockMotion
    },
  }),
  useInView: () => true,
  useAnimation: () => ({ start: jest.fn() }),
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

// ─── Helper ───────────────────────────────────────────────────────────────────

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

// ─── Testes ───────────────────────────────────────────────────────────────────

describe('Hero', () => {
  it('renderiza a section principal', () => {
    renderWithTheme(<Hero />)
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
  })

  it('renderiza a tagline correta', () => {
    renderWithTheme(<Hero />)
    expect(screen.getByTestId('hero-tagline')).toHaveTextContent('Product Design Studio')
  })

  it('renderiza as três linhas do headline', () => {
    renderWithTheme(<Hero />)
    const headline = screen.getByTestId('hero-headline')
    expect(headline).toHaveTextContent('WE CRAFT')
    expect(headline).toHaveTextContent('PRODUCTS')
    expect(headline).toHaveTextContent('THAT MATTER')
  })

  it('renderiza o orb decorativo', () => {
    renderWithTheme(<Hero />)
    expect(screen.getByTestId('hero-orb')).toBeInTheDocument()
  })

  it('renderiza a stat de projetos', () => {
    renderWithTheme(<Hero />)
    expect(screen.getByTestId('hero-stat-projects')).toHaveTextContent('48+')
    expect(screen.getByTestId('hero-stat-projects')).toHaveTextContent('Projects')
  })

  it('renderiza a stat de anos', () => {
    renderWithTheme(<Hero />)
    expect(screen.getByTestId('hero-stat-years')).toHaveTextContent('7')
    expect(screen.getByTestId('hero-stat-years')).toHaveTextContent('Years')
  })

  it('tem role de region acessível', () => {
    renderWithTheme(<Hero />)
    expect(screen.getByTestId('hero-section').tagName).toBe('SECTION')
  })

  it('renderiza a descrição do estúdio', () => {
    renderWithTheme(<Hero />)
    expect(screen.getByText(/We partner with founders/i)).toBeInTheDocument()
  })
})