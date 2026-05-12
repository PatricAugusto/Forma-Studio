'use client'

import styled from 'styled-components'
import FooterMarquee from './sections/FooterMarquee'
import FooterHero    from './sections/FooterHero'
import FooterCTA     from './sections/FooterCTA'
import FooterBottom  from './sections/FooterBottom'

// ─── Styled ───────────────────────────────────────────────────────────────────

const FooterWrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`

const FooterMain = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <FooterWrapper data-testid="footer-wrapper">
      <FooterMarquee />

      <FooterMain>
        <FooterHero />
        <FooterCTA />
        <FooterBottom />
      </FooterMain>
    </FooterWrapper>
  )
}