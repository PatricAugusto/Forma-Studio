'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import { itemVariants } from '../navbar.variants'

// ─── Styled ───────────────────────────────────────────────────────────────────

const LogoAnchor = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.text};
  z-index: 210;
  position: relative;

  span { color: ${({ theme }) => theme.colors.accent}; }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function NavLogo() {
  return (
    <LogoAnchor
      href="/"
      variants={itemVariants}
      data-testid="navbar-logo"
    >
      forma<span>.</span>
    </LogoAnchor>
  )
}