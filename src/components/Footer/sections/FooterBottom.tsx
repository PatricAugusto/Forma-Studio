'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import { SOCIAL_LINKS } from '../footer.data'

// ─── Styled ───────────────────────────────────────────────────────────────────

const BottomWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
  }
`

const Copyright = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
`

const SocialList = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const SocialItem = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width ${({ theme }) => theme.transitions.smooth};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    &::after { width: 100%; }
  }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function FooterBottom() {
  return (
    <BottomWrapper data-testid="footer-bottom">
      <Copyright data-testid="footer-copyright">
        © {new Date().getFullYear()} Forma Studio — All rights reserved
      </Copyright>

      <SocialList aria-label="Redes sociais" data-testid="social-list">
        {SOCIAL_LINKS.map(link => (
          <SocialItem
            key={link.id}
            href={link.href}
            whileHover={{ y: -2 }}
            data-testid={`social-${link.id}`}
            aria-label={link.label}
          >
            {link.label}
          </SocialItem>
        ))}
      </SocialList>
    </BottomWrapper>
  )
}