'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { itemVariants } from '../navbar.variants'
import { NAV_LINKS } from '../navbar.data'

// ─── Styled ───────────────────────────────────────────────────────────────────

const LinksWrapper = styled.nav`
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

// ─── Componente ───────────────────────────────────────────────────────────────

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <LinksWrapper aria-label="Navegação principal">
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
    </LinksWrapper>
  )
}