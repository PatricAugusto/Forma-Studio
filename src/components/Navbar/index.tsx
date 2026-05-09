'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ─── Tipos ───────────────────────────────────────────────────────────────────

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
  transition: background ${({ theme }) => theme.transitions.smooth},
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
  
  span {
    color: ${({ theme }) => theme.colors.accent};
  }
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

    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  /* Underline animado */
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

  &:hover::after {
    width: 100%;
  }
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

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.text};
    transform: translateX(-101%);
    transition: transform ${({ theme }) => theme.transitions.smooth};
  }

  &:hover::before {
    transform: translateX(0);
  }

  span {
    position: relative;
    z-index: 1;
  }
`

// ─── Variantes de animação ────────────────────────────────────────────────────

const navVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <NavWrapper
      $scrolled={scrolled}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      role="banner"
    >
      <Logo
        href="/"
        variants={itemVariants}
        data-testid="navbar-logo"
      >
        forma<span>.</span>
      </Logo>

      <NavLinks aria-label="Navegação principal">
        {NAV_LINKS.map((link) => (
          <NavItem
            key={link.href}
            $active={pathname === link.href}
            variants={itemVariants}
          >
            <Link href={link.href} data-testid={`nav-link-${link.label.toLowerCase()}`}>
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
    </NavWrapper>
  )
}