'use client'

import { motion } from 'framer-motion'
import styled, { keyframes } from 'styled-components'

// ─── Animação ─────────────────────────────────────────────────────────────────

const scanline = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%);  }
`

// ─── Styled ───────────────────────────────────────────────────────────────────

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }

  span {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
  }
`

const ScrollLine = styled.div`
  width: 1px;
  height: 48px;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.accent},
    transparent
  );
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.bg};
    animation: ${scanline} 1.5s ease-in-out infinite;
  }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function HeroScroll() {
  return (
    <ScrollIndicator
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span>scroll</span>
      <ScrollLine />
    </ScrollIndicator>
  )
}