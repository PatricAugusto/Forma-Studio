'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Work',    href: '/work'    },
  { label: 'Studio',  href: '/studio'  },
  { label: 'Process', href: '/process' },
]

// ─── Styled Components ────────────────────────────────────────────────────────

const NavWrapper = styled(motion.header)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition:
    background ${({ theme }) => theme.transitions.smooth},
    border-color ${({ theme }) => theme.transitions.smooth};

  ${({ $scrolled, theme }) => $scrolled && css`
    background: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid ${theme.colors.border};
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`

const Logo = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.text};
  z-index: 110;
  position: relative;

  span { color: ${({ theme }) => theme.colors.accent}; }
`

const NavLinks = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

const NavItem = styled(motion.div)<{ $active: boolean }>`
  position: relative;

  a {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${({ $active, theme }) =>
      $active ? theme.colors.text : theme.colors.muted};
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover { color: ${({ theme }) => theme.colors.text}; }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    width: ${({ $active }) => ($active ? '100%' : '0')};
    transition: width ${({ theme }) => theme.transitions.smooth};
  }

  &:hover::after { width: 100%; }
`

const CTAButton = styled(motion.a)`
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

// ─── Hamburguer ───────────────────────────────────────────────────────────────

const HamburgerButton = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  z-index: 110;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }

  span {
    display: block;
    width: 24px;
    height: 1px;
    background: ${({ theme }) => theme.colors.text};
    transition: transform ${({ theme }) => theme.transitions.smooth},
                opacity   ${({ theme }) => theme.transitions.fast},
                width     ${({ theme }) => theme.transitions.smooth};
    transform-origin: center;

    &:nth-child(1) {
      transform: ${({ $open }) =>
        $open ? 'translateY(6px) rotate(45deg)' : 'none'};
    }
    &:nth-child(2) {
      opacity: ${({ $open }) => ($open ? 0 : 1)};
      width:   ${({ $open }) => ($open ? '0' : '24px')};
    }
    &:nth-child(3) {
      transform: ${({ $open }) =>
        $open ? 'translateY(-6px) rotate(-45deg)' : 'none'};
    }
  }
`

// ─── Menu Mobile ──────────────────────────────────────────────────────────────

const MobileMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.bg};
  z-index: 105;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

const MobileNavItem = styled(motion.div)`
  overflow: hidden;
`

const MobileNavLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.8rem, 12vw, 4.5rem);
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.text};
  display: block;
  line-height: 1;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`

const MobileMenuFooter = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.md};
`

const MobileMenuCTA = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ theme }) => theme.colors.accent};
  padding: 0.75rem 1.5rem;
`

const MobileMenuLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

// ─── Variantes ────────────────────────────────────────────────────────────────

const navVariants: Variants = {
  hidden:  { y: -100, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden:  { y: -20, opacity: 0 },
  visible: { y: 0,   opacity: 1 },
}

const menuVariants: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0, y: -20,
    transition: { duration: 0.3 },
  },
}

const mobileItemVariants: Variants = {
  hidden:  { y: '110%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trava o scroll quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <NavWrapper
        $scrolled={scrolled}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        role="banner"
      >
        <Logo href="/" variants={itemVariants} data-testid="navbar-logo">
          forma<span>.</span>
        </Logo>

        <NavLinks aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              $active={pathname === link.href}
              variants={itemVariants}
            >
              <Link
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            </NavItem>
          ))}
        </NavLinks>

        <CTAButton
          href="/contact"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-testid="navbar-cta"
        >
          <span>Start a project</span>
        </CTAButton>

        <HamburgerButton
          $open={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          data-testid="hamburger-button"
        >
          <span /><span /><span />
        </HamburgerButton>
      </NavWrapper>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-testid="mobile-menu"
            aria-label="Menu de navegação"
          >
            {NAV_LINKS.map((link) => (
              <MobileNavItem key={link.href} variants={{ hidden: { overflow: 'hidden' }, visible: { overflow: 'hidden' } }}>
                <MobileNavItem variants={mobileItemVariants}>
                  <MobileNavLink
                    href={link.href}
                    onClick={closeMenu}
                    data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </MobileNavLink>
                </MobileNavItem>
              </MobileNavItem>
            ))}

            <MobileMenuFooter variants={mobileItemVariants}>
              <MobileMenuLabel>© 2026 Forma Studio</MobileMenuLabel>
              <MobileMenuCTA href="/contact" onClick={closeMenu}>
                Start a project
              </MobileMenuCTA>
            </MobileMenuFooter>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  )
}