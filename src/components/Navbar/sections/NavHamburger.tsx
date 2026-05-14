'use client'

import styled from 'styled-components'

// ─── Styled ───────────────────────────────────────────────────────────────────

const HamburgerButton = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 44px;
  height: 44px;
  padding: 10px;
  z-index: 210;
  position: relative;
  background: transparent;
  border: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }

  span {
    display: block;
    height: 1px;
    background: ${({ theme }) => theme.colors.text};
    transition:
      transform ${({ theme }) => theme.transitions.smooth},
      opacity   ${({ theme }) => theme.transitions.fast},
      width     ${({ theme }) => theme.transitions.smooth};
    transform-origin: center;

    &:nth-child(1) {
      width: 24px;
      transform: ${({ $open }) =>
        $open ? 'translateY(7px) rotate(45deg)' : 'translateY(0) rotate(0)'};
    }
    &:nth-child(2) {
      width: 16px;
      opacity:   ${({ $open }) => ($open ? '0' : '1')};
      transform: ${({ $open }) =>
        $open ? 'translateX(-8px)' : 'translateX(0)'};
    }
    &:nth-child(3) {
      width: 24px;
      transform: ${({ $open }) =>
        $open ? 'translateY(-7px) rotate(-45deg)' : 'translateY(0) rotate(0)'};
    }
  }
`

// ─── Props ────────────────────────────────────────────────────────────────────

interface NavHamburgerProps {
  open: boolean
  onToggle: () => void
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function NavHamburger({ open, onToggle }: NavHamburgerProps) {
  return (
    <HamburgerButton
      $open={open}
      onClick={onToggle}
      aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={open}
      data-testid="hamburger-button"
    >
      <span /><span /><span />
    </HamburgerButton>
  )
}