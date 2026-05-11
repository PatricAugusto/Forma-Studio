'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ─── Dados ────────────────────────────────────────────────────────────────────

interface NavLink { label: string; href: string }

const NAV_LINKS: NavLink[] = [
  { label: 'Work',    href: '/work'    },
  { label: 'Studio',  href: '/studio'  },
  { label: 'Process', href: '/process' },
]

// ─── Styled Components ────────────────────────────────────────────────────────

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

const Logo = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.text};
  z-index: 210;
  position: relative;
  span { color: ${({ theme }) => theme.colors.accent}; }
`

const DesktopLinks = styled.nav`
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
    bottom: -4px; left: 0;
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

// ─── Menu Mobile Overlay ──────────────────────────────────────────────────────

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 195;
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
`

const MobileLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const MobileLinkRow = styled.div`
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:first-child { border-top: 1px solid ${({ theme }) => theme.colors.border}; }
`

const MobileLinkInner = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.sm} 0;
`

const MobileLinkAnchor = styled.a`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 14vw, 5rem);
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover { color: ${({ theme }) => theme.colors.accent}; }

  /* Número do item */
  span.num {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: ${({ theme }) => theme.colors.muted};
    align-self: flex-start;
    padding-top: 0.5rem;
  }
`

const MobileBottom = styled(motion.div)`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MobileBottomLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

const MobileBottomCTA = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ theme }) => theme.colors.accent};
  padding: 0.65rem 1.2rem;
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
  visible: { y: 0, opacity: 1 },
}

const overlayVariants: Variants = {
  hidden: {
    clipPath: 'inset(0 0 100% 0)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      when: 'afterChildren',
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
}

const linkRowVariants: Variants = {
  hidden:  { y: '110%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

const bottomVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: 0.35 },
  },
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trava scroll do body quando menu está aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.height   = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.height   = ''
    }
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
        <Logo href="/" variants={itemVariants} data-testid="navbar-logo">
          forma<span>.</span>
        </Logo>

        <DesktopLinks aria-label="Navegação principal">
          {NAV_LINKS.map(link => (
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
        </DesktopLinks>

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
          onClick={toggle}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          data-testid="hamburger-button"
        >
          <span /><span /><span />
        </HamburgerButton>
      </NavWrapper>

      {/* ── Menu Mobile ──────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <Overlay
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            data-testid="mobile-menu"
            aria-modal="true"
            role="dialog"
            aria-label="Menu de navegação"
          >
            <MobileLinksWrapper>
              {NAV_LINKS.map((link, i) => (
                <MobileLinkRow key={link.href}>
                  <MobileLinkInner variants={linkRowVariants}>
                    <MobileLinkAnchor
                      href={link.href}
                      onClick={closeMenu}
                      data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                      <span className="num">0{i + 1}</span>
                    </MobileLinkAnchor>
                  </MobileLinkInner>
                </MobileLinkRow>
              ))}
            </MobileLinksWrapper>

            <MobileBottom variants={bottomVariants}>
              <MobileBottomLabel>© 2026 Forma Studio</MobileBottomLabel>
              <MobileBottomCTA href="/contact" onClick={closeMenu}>
                Start a project
              </MobileBottomCTA>
            </MobileBottom>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  )
}