'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import styled from 'styled-components'
import HeroOrb      from './sections/HeroOrb'
import HeroHeadline from './sections/HeroHeadline'
import HeroBottom   from './sections/HeroBottom'
import HeroScroll   from './sections/HeroScroll'

// ─── Styled ───────────────────────────────────────────────────────────────────

const HeroSection = styled.section`
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  padding-top: 72px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 72px ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    min-height: 100svh;
  }
`

const DiagonalLine = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 25%;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent,
    ${({ theme }) => theme.colors.border} 20%,
    ${({ theme }) => theme.colors.border} 80%,
    transparent
  );
  transform-origin: top center;
  transform: skewX(-15deg);
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Hero() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  return (
    <HeroSection ref={ref} data-testid="hero-section">

      <DiagonalLine
        initial={{ scaleY: 0, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: {
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            },
          },
        }}
      />

      <HeroOrb      controls={controls} />
      <HeroHeadline controls={controls} />
      <HeroBottom   controls={controls} />
      <HeroScroll />

    </HeroSection>
  )
}