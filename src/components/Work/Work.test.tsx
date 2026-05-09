import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import Work from './index'

jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_: object, tag: string) => {
      const M = ({
        children, variants, initial, animate, whileInView,
        exit, layout, custom, viewport, ...rest
      }: React.PropsWithChildren<Record<string, unknown>>) => {
        const Tag = tag as React.ElementType
        return <Tag {...rest}>{children}</Tag>
      }
      M.displayName = `motion.${tag}`
      return M
    },
  }),
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}))

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('Work', () => {
  it('renderiza a section principal', () => {
    renderWithTheme(<Work />)
    expect(screen.getByTestId('work-section')).toBeInTheDocument()
  })

  it('renderiza o título PROJECTS', () => {
    renderWithTheme(<Work />)
    expect(screen.getByText('PROJECTS')).toBeInTheDocument()
  })

  it('renderiza todos os filtros', () => {
    renderWithTheme(<Work />)
    expect(screen.getByTestId('filter-all')).toBeInTheDocument()
    expect(screen.getByTestId('filter-branding')).toBeInTheDocument()
    expect(screen.getByTestId('filter-digital')).toBeInTheDocument()
    expect(screen.getByTestId('filter-motion')).toBeInTheDocument()
  })

  it('filtro All está ativo por padrão', () => {
    renderWithTheme(<Work />)
    expect(screen.getByTestId('filter-all')).toHaveAttribute('aria-pressed', 'true')
  })

  it('renderiza todos os 6 projetos com filtro All', () => {
    renderWithTheme(<Work />)
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })

  it('filtra projetos por Branding ao clicar', () => {
    renderWithTheme(<Work />)
    fireEvent.click(screen.getByTestId('filter-branding'))
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(2)
    cards.forEach(card => {
      expect(card).toHaveAttribute('aria-label', expect.stringContaining('Branding'))
    })
  })

  it('filtra projetos por Digital ao clicar', () => {
    renderWithTheme(<Work />)
    fireEvent.click(screen.getByTestId('filter-digital'))
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('filtra projetos por Motion ao clicar', () => {
    renderWithTheme(<Work />)
    fireEvent.click(screen.getByTestId('filter-motion'))
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })

  it('volta a mostrar todos ao clicar em All', () => {
    renderWithTheme(<Work />)
    fireEvent.click(screen.getByTestId('filter-branding'))
    fireEvent.click(screen.getByTestId('filter-all'))
    expect(screen.getAllByRole('article')).toHaveLength(6)
  })

  it('cards têm aria-label acessível', () => {
    renderWithTheme(<Work />)
    expect(screen.getByLabelText('Aurum Finance — Digital')).toBeInTheDocument()
    expect(screen.getByLabelText('Norde Studio — Branding')).toBeInTheDocument()
  })
})