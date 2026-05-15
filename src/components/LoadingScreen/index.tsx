'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import {
  overlayVariants,
  counterVariants,
  logoVariants,
  letterVariants,
  progressVariants,
  taglineVariants,
} from './loading.variants'

// ─── Constantes ───────────────────────────────────────────────────────────────

const LOGO_LETTERS  = ['F', 'O', 'R', 'M', 'A']
const TOTAL_STEPS   = 12
const STEP_INTERVAL = 120 // ms por step

// ─── Animações CSS ────────────────────────────────────────────────────────────

const scanline = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%);  }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`

// ─── Styled ───────────────────────────────────────────────────────────────────

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9990;
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.border} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.border} 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
  pointer-events: none;
`

const ScanLine = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(200, 255, 0, 0.03),
      transparent
    );
    animation: ${scanline} 3s ease-in-out infinite;
  }
`

const CenterContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const LogoWrapper = styled(motion.div)`
  display: flex;
  align-items: baseline;
  gap: 0;
`

const LogoLetterWrapper = styled.div`
  overflow: hidden;
`

const LogoLetter = styled(motion.span)`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(5rem, 15vw, 10rem);
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
`

const LogoDot = styled(motion.span)`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(5rem, 15vw, 10rem);
  line-height: 1;
  color: ${({ theme }) => theme.colors.accent};
  animation: ${blink} 1s step-end infinite;
`

const Tagline = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

// ─── Barra de progresso ───────────────────────────────────────────────────────

const ProgressWrapper = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.sm};
    right: ${({ theme }) => theme.spacing.sm};
  }
`

const ProgressTrack = styled.div`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
  position: relative;
`

const ProgressBar = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.accent};
  transform-origin: left;
`

const CounterWrapper = styled.div`
  position: relative;
  width: 3.5rem;
  text-align: right;
  overflow: hidden;
  height: 1.2rem;
`

const CounterNumber = styled(motion.span)`
  position: absolute;
  right: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
`

const CornerLabel = styled.p`
  position: absolute;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};

  &.top-left  { top: ${({ theme }) => theme.spacing.md}; left:  ${({ theme }) => theme.spacing.lg}; }
  &.top-right { top: ${({ theme }) => theme.spacing.md}; right: ${({ theme }) => theme.spacing.lg}; }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    &.top-left  { left:  ${({ theme }) => theme.spacing.sm}; }
    &.top-right { right: ${({ theme }) => theme.spacing.sm}; }
  }
`

// ─── Props ────────────────────────────────────────────────────────────────────

interface LoadingScreenProps {
  onComplete: () => void
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress,  setProgress]  = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  // Gera os valores de progresso não-lineares para parecer orgânico
  const getNextProgress = useCallback((current: number): number => {
    const remaining = 100 - current
    const step      = Math.max(
      2,
      Math.floor(remaining * (0.2 + Math.random() * 0.25))
    )
    return Math.min(100, current + step)
  }, [])

  useEffect(() => {
    if (isExiting) return

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = getNextProgress(prev)
        if (next >= 100) {
          clearInterval(timer)
          // Pequeno delay antes de iniciar saída — deixa o 100% visível
          setTimeout(() => setIsExiting(true), 400)
          return 100
        }
        return next
      })
    }, STEP_INTERVAL)

    return () => clearInterval(timer)
  }, [isExiting, getNextProgress])

  return (
    <AnimatePresence onExitComplete={onComplete} mode="wait">
      {!isExiting && (
        <Overlay
          key="loading"
          variants={overlayVariants}
          initial="visible"
          exit="exit"
          data-testid="loading-overlay"
        >
          {/* Texturas de fundo */}
          <GridPattern />
          <ScanLine />

          {/* Labels de canto */}
          <CornerLabel className="top-left">
            forma.studio
          </CornerLabel>
          <CornerLabel className="top-right" data-testid="loading-year">
            © 2026
          </CornerLabel>

          {/* Conteúdo central */}
          <CenterContent>
            {/* Logo em cascata */}
            <LogoWrapper
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              data-testid="loading-logo"
            >
              {LOGO_LETTERS.map(letter => (
                <LogoLetterWrapper key={letter}>
                  <LogoLetter variants={letterVariants}>
                    {letter}
                  </LogoLetter>
                </LogoLetterWrapper>
              ))}
              <LogoLetterWrapper>
                <LogoDot variants={letterVariants}>.</LogoDot>
              </LogoLetterWrapper>
            </LogoWrapper>

            {/* Tagline */}
            <Tagline
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
              data-testid="loading-tagline"
            >
              Product Design Studio
            </Tagline>
          </CenterContent>

          {/* Barra de progresso */}
          <ProgressWrapper data-testid="loading-progress">
            <ProgressTrack>
              <ProgressBar
                variants={progressVariants}
                initial="initial"
                animate="animate"
                custom={progress}
              />
            </ProgressTrack>

            <CounterWrapper>
              <AnimatePresence mode="popLayout">
                <CounterNumber
                  key={progress}
                  variants={counterVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  data-testid="loading-counter"
                >
                  {progress}%
                </CounterNumber>
              </AnimatePresence>
            </CounterWrapper>
          </ProgressWrapper>
        </Overlay>
      )}
    </AnimatePresence>
  )
}