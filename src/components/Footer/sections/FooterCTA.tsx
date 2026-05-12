'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styled from 'styled-components'

// ─── Styled ───────────────────────────────────────────────────────────────────

const MagneticWrapper = styled.div`
  position: relative;
  display: inline-flex;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const CTACircle = styled(motion.a)`
  width: clamp(120px, 20vw, 180px);
  height: clamp(120px, 20vw, 180px);
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;
  overflow: hidden;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    transform: scale(0);
    transition: transform ${({ theme }) => theme.transitions.smooth};
  }

  &:hover::before { transform: scale(1); }
  &:hover span    { color: ${({ theme }) => theme.colors.bg}; }
  &:hover         { border-color: ${({ theme }) => theme.colors.accent}; }
`

const CTALabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  z-index: 1;
  transition: color ${({ theme }) => theme.transitions.fast};
  line-height: 1;
`

const CTASub = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  position: relative;
  z-index: 1;
  transition: color ${({ theme }) => theme.transitions.fast};
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function FooterCTA() {
  const ref     = useRef<HTMLDivElement>(null)
  const x       = useMotionValue(0)
  const y       = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect    = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width  / 2
    const centerY = rect.top  + rect.height / 2
    x.set((e.clientX - centerX) * 0.35)
    y.set((e.clientY - centerY) * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <MagneticWrapper
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      data-testid="magnetic-cta"
    >
      <CTACircle
        href="/contact"
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.95 }}
        data-testid="cta-circle"
        aria-label="Start a project"
      >
        <CTALabel>START A</CTALabel>
        <CTALabel>PROJECT</CTALabel>
        <CTASub>{hovered ? '→ contact us' : 'get in touch'}</CTASub>
      </CTACircle>
    </MagneticWrapper>
  )
}