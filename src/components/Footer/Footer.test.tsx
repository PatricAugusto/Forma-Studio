import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import Footer from './index'

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_: object, tag: string) => {
      const M = ({
        children, variants, initial, animate, whileInView,
        whileHover, whileTap, exit, viewport, transition,
        style, ...rest
      }: React.PropsWithChildren<Record<string, unknown>>) => {
        const Tag = tag as React.ElementType
        return <Tag {...rest}>{children}</Tag>
      }
      M.displayName = `motion.${tag}`
      return M
    },
  }),
  useMotionValue: () => ({ set: jest.fn(), get: jest.fn(() => 0) }),
  useSpring: () => ({ set: jest.fn(), get: jest.fn(() => 0) }),
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

// ─── Testes ───────────────────────────────────────────────────────────────────

describe('Footer', () => {
  it('renderiza o footer wrapper', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByTestId('footer-wrapper')).toBeInTheDocument()
  })

  it('renderiza o marquee', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByTestId('marquee')).toBeInTheDocument()
  })

  it('renderiza o headline LET\'S TALK', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByTestId('footer-headline')).toHaveTextContent("LET'S TALK")
  })

  it('renderiza o email de contato', () => {
    renderWithTheme(<Footer />)
    const email = screen.getByTestId('footer-email')
    expect(email).toHaveTextContent('hello@forma.studio')
    expect(email).toHaveAttribute('href', 'mailto:hello@forma.studio')
  })

  it('renderiza o CTA magnético', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByTestId('magnetic-cta')).toBeInTheDocument()
  })

  it('CTA circle aponta para /contact', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByTestId('cta-circle')).toHaveAttribute('href', '/contact')
  })

  it('CTA tem aria-label acessível', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByLabelText('Start a project')).toBeInTheDocument()
  })

  it('renderiza o copyright com o ano atual', () => {
    renderWithTheme(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByTestId('footer-copyright')).toHaveTextContent(year)
  })

  it('renderiza os 4 links sociais', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByTestId('social-sl1')).toBeInTheDocument()
    expect(screen.getByTestId('social-sl2')).toBeInTheDocument()
    expect(screen.getByTestId('social-sl3')).toBeInTheDocument()
    expect(screen.getByTestId('social-sl4')).toBeInTheDocument()
  })

  it('links sociais têm aria-labels corretos', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Behance')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Dribbble')).toBeInTheDocument()
  })

  it('social list tem aria-label de navegação', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByRole('navigation', { name: 'Redes sociais' })).toBeInTheDocument()
  })

  it('CTA muda texto ao hover', () => {
    renderWithTheme(<Footer />)
    const magnetic = screen.getByTestId('magnetic-cta')

    expect(screen.getByText('get in touch')).toBeInTheDocument()
    fireEvent.mouseEnter(magnetic)
    expect(screen.getByText('→ contact us')).toBeInTheDocument()

    fireEvent.mouseLeave(magnetic)
    expect(screen.getByText('get in touch')).toBeInTheDocument()
  })

  it('renderiza o footer bottom', () => {
    renderWithTheme(<Footer />)
    expect(screen.getByTestId('footer-bottom')).toBeInTheDocument()
  })
})