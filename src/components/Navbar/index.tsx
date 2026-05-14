'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled, { css } from 'styled-components'
import NavLogo        from './sections/NavLogo'
import NavLinks       from './sections/NavLinks'
import NavCTA         from './sections/NavCTA'
import NavHamburger   from './sections/NavHamburger'
import NavMobileMenu  from './sections/NavMobileMenu'
import { navVariants } from './navbar.variants'

// ─── Styled ───────────────────────────────────────────────────────────────────

const NavWrapper = styled(motion.header)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition:
    background   ${({ theme }) => theme.transitions.smooth},
    border-color ${({ theme }) => theme.transitions.smooth};

  ${({ $scrolled, theme }) => $scrolled && css`
    background: rgba(10,10,10,0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid ${theme.colors.border};
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    document.body.style.height   = menuOpen ? '100%'   : ''
    return () => {
      document.body.style.overflow = ''
      document.body.style.height   = ''
    }
  }, [menuOpen])

  const toggle    = () => setMenuOpen(v => !v)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <NavWrapper
        $scrolled={scrolled || menuOpen}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        role="banner"
      >
        <NavLogo />
        <NavLinks />
        <NavCTA />
        <NavHamburger open={menuOpen} onToggle={toggle} />
      </NavWrapper>

      <AnimatePresence>
        {menuOpen && (
          <NavMobileMenu onClose={closeMenu} />
        )}
      </AnimatePresence>
    </>
  )
}