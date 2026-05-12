'use client'

import { motion } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import { fadeUpVariants, headlineVariants } from '../footer.variants'

// ─── Animação ─────────────────────────────────────────────────────────────────

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`

// ─── Styled ───────────────────────────────────────────────────────────────────

const FooterEyebrow = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::before {
    content: '04 — ';
    color: ${({ theme }) => theme.colors.muted};
  }
`

const BigCTA = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3.5rem, 13vw, 18rem);
  line-height: 0.85;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  word-break: break-word;

  span.cursor-blink {
    color: ${({ theme }) => theme.colors.accent};
    animation: ${blink} 1.2s step-end infinite;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`

const EmailLink = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
    transition: background ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    &::after { background: ${({ theme }) => theme.colors.accent}; }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function FooterHero() {
  return (
    <>
      <FooterEyebrow
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Start a conversation
      </FooterEyebrow>

      <div style={{ overflow: 'hidden' }}>
        <BigCTA
          variants={headlineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-testid="footer-headline"
        >
          LET&apos;S TALK<span className="cursor-blink">_</span>
        </BigCTA>
      </div>

      <EmailLink
        href="mailto:hello@forma.studio"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        data-testid="footer-email"
      >
        hello@forma.studio
      </EmailLink>
    </>
  )
}