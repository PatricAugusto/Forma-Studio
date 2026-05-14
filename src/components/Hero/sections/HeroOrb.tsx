'use client'

import { motion } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import { orbVariants } from '../hero.variants'

// ─── Animações ────────────────────────────────────────────────────────────────

const rotateSlowly = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const floatY = keyframes`
  0%, 100% { transform: translateY(0px);   }
  50%       { transform: translateY(-18px); }
`

// ─── Styled ───────────────────────────────────────────────────────────────────

const OrbContainer = styled.div`
  position: absolute;
  top: 12%;
  right: 8%;
  width: 380px;
  height: 380px;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 160px;
    height: 160px;
    top: 80px;
    right: -20px;
    opacity: 0.25;
  }
`

const OrbRing = styled.div<{ $size: number; $duration: number; $reverse?: boolean }>`
  position: absolute;
  inset: ${({ $size }) => `${(100 - $size) / 2}%`};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  animation: ${rotateSlowly} ${({ $duration }) => $duration}s linear infinite
    ${({ $reverse }) => ($reverse ? 'reverse' : 'normal')};

  &::after {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
  }
`

const OrbCore = styled.div`
  position: absolute;
  inset: 35%;
  border-radius: 50%;
  background: radial-gradient(
    circle at 40% 40%,
    ${({ theme }) => theme.colors.border},
    transparent 70%
  );
  animation: ${floatY} 6s ease-in-out infinite;
`

// ─── Componente ───────────────────────────────────────────────────────────────

interface HeroOrbProps {
  controls: ReturnType<typeof import('framer-motion').useAnimation>
}

export default function HeroOrb({ controls }: HeroOrbProps) {
  return (
    <OrbContainer>
      <motion.div
        style={{ width: '100%', height: '100%', position: 'relative' }}
        variants={orbVariants}
        initial="hidden"
        animate={controls}
        data-testid="hero-orb"
      >
        <OrbRing $size={100} $duration={20} />
        <OrbRing $size={72}  $duration={14} $reverse />
        <OrbRing $size={44}  $duration={9}  />
        <OrbCore />
      </motion.div>
    </OrbContainer>
  )
}