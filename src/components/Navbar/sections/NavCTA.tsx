'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import { itemVariants } from '../navbar.variants'

// ─── Styled ───────────────────────────────────────────────────────────────────

const CTAAnchor = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ theme }) => theme.colors.accent};
  padding: 0.6rem 1.4rem;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.text};
    transform: translateX(-101%);
    transition: transform ${({ theme }) => theme.transitions.smooth};
  }

  &:hover::before { transform: translateX(0); }

  span { position: relative; z-index: 1; }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function NavCTA() {
  return (
    <CTAAnchor
      href="/contact"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-testid="navbar-cta"
    >
      <span>Start a project</span>
    </CTAAnchor>
  )
}