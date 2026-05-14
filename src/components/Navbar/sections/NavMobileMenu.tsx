'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import {
  overlayVariants,
  linkRowVariants,
  bottomVariants,
} from '../navbar.variants'
import { NAV_LINKS } from '../navbar.data'

// ─── Styled ───────────────────────────────────────────────────────────────────

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

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const LinkRow = styled.div`
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`

const LinkInner = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.sm} 0;
`

const LinkAnchor = styled.a`
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

  span.num {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: ${({ theme }) => theme.colors.muted};
    align-self: flex-start;
    padding-top: 0.5rem;
  }
`

const BottomBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BottomLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

const BottomCTA = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  background: ${({ theme }) => theme.colors.accent};
  padding: 0.65rem 1.2rem;
`

// ─── Props ────────────────────────────────────────────────────────────────────

interface NavMobileMenuProps {
  onClose: () => void
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function NavMobileMenu({ onClose }: NavMobileMenuProps) {
  return (
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
      <LinksWrapper>
        {NAV_LINKS.map((link, i) => (
          <LinkRow key={link.href}>
            <LinkInner variants={linkRowVariants}>
              <LinkAnchor
                href={link.href}
                onClick={onClose}
                data-testid={`mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="num">0{i + 1}</span>
              </LinkAnchor>
            </LinkInner>
          </LinkRow>
        ))}
      </LinksWrapper>

      <BottomBar variants={bottomVariants}>
        <BottomLabel>© 2026 Forma Studio</BottomLabel>
        <BottomCTA href="/contact" onClick={onClose}>
          Start a project
        </BottomCTA>
      </BottomBar>
    </Overlay>
  )
}