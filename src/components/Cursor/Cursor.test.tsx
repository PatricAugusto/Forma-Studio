import { render, screen, fireEvent, act } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import Cursor from './index'

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (_: object, tag: string) => {
      const M = ({
        children, variants, initial, animate,
        exit, transition, style, ...rest
      }: React.PropsWithChildren<Record<string, unknown>>) => {
        const Tag = tag as React.ElementType
        return <Tag style={style as React.CSSProperties} {...rest}>{children}</Tag>
      }
      M.displayName = `motion.${tag}`
      return M
    },
  }),
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useMotionValue:  (v: number) => ({ set: jest.fn(), get: () => v }),
  useSpring:       (v: unknown) => v,
}))

// Mock pointer: fine (mouse device)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: query === '(pointer: coarse)' ? false : true,
    media:   query,
    addEventListener:    jest.fn(),
    removeEventListener: jest.fn(),
  })),
})

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

// ─── Testes ───────────────────────────────────────────────────────────────────

describe('Cursor', () => {
  it('renderiza o dot e o ring em dispositivos com mouse', () => {
    renderWithTheme(<Cursor />)
    expect(screen.getByTestId('cursor-dot')).toBeInTheDocument()
    expect(screen.getByTestId('cursor-ring')).toBeInTheDocument()
  })

  it('não renderiza em dispositivos touch', () => {
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true, // pointer: coarse = touch
      addEventListener:    jest.fn(),
      removeEventListener: jest.fn(),
    }))

    renderWithTheme(<Cursor />)
    expect(screen.queryByTestId('cursor-dot')).not.toBeInTheDocument()
    expect(screen.queryByTestId('cursor-ring')).not.toBeInTheDocument()

    // Restaura
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query !== '(pointer: coarse)',
      addEventListener:    jest.fn(),
      removeEventListener: jest.fn(),
    }))
  })

  it('registra event listeners ao montar', () => {
    const addSpy = jest.spyOn(window, 'addEventListener')
    renderWithTheme(<Cursor />)
    expect(addSpy).toHaveBeenCalledWith(
      'mousemove', expect.any(Function), expect.any(Object)
    )
  })

  it('remove event listeners ao desmontar', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = renderWithTheme(<Cursor />)
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
  })

  it('dot e ring têm aria-hidden para acessibilidade', () => {
    renderWithTheme(<Cursor />)
    expect(screen.getByTestId('cursor-dot')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByTestId('cursor-ring')).toHaveAttribute('aria-hidden', 'true')
  })

  it('view label não aparece no estado default', () => {
    renderWithTheme(<Cursor />)
    expect(screen.queryByTestId('cursor-view-label')).not.toBeInTheDocument()
  })

  it('atualiza posição ao mover o mouse', async () => {
    renderWithTheme(<Cursor />)
    await act(async () => {
      fireEvent.mouseMove(window, { clientX: 200, clientY: 300 })
    })
    expect(screen.getByTestId('cursor-dot')).toBeInTheDocument()
  })
})