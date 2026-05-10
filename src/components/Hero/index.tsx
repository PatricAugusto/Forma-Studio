'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styled, { keyframes } from 'styled-components'

// ─── Animações CSS ────────────────────────────────────────────────────────────

const rotateSlowly = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const floatY = keyframes`
  0%, 100% { transform: translateY(0px);   }
  50%       { transform: translateY(-18px); }
`

const scanline = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%);  }
`

// ─── Styled Components ────────────────────────────────────────────────────────

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

const TagLine = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '';
    display: inline-block;
    width: 2rem;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
  }
`

const HeadlineWrapper = styled.div`
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const HeadlineLine = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3.2rem, 11vw, 13rem);
  line-height: 0.88;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;

  &.accent-line {
    color: transparent;
    -webkit-text-stroke: 1px ${({ theme }) => theme.colors.border};
    padding-left: clamp(1.5rem, 6vw, 10rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    white-space: normal;
    word-break: break-word;
    font-size: clamp(3rem, 15vw, 4.5rem);

    &.accent-line {
      padding-left: clamp(1rem, 4vw, 2rem);
    }
  }
`

const BottomRow = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`

const Description = styled(motion.p)`
  font-size: 0.9rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 320px;
  line-height: 1.7;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.85rem;
    max-width: 100%;
  }
`

const StatsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const StatItem = styled(motion.div)`
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    text-align: left;
  }
`

const StatNumber = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 3rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`

const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

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

// ─── Variantes Framer Motion ──────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const lineVariants: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

const orbVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: 'easeOut', delay: 0.6 },
  },
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  return (
    <HeroSection ref={ref} data-testid="hero-section">
      {/* Linha diagonal decorativa */}
      <DiagonalLine
        initial={{ scaleY: 0, opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            scaleY: 1,
            opacity: 1,
            transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
          },
        }}
      />

      {/* Orb geométrico */}
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

      {/* Tagline */}
      <TagLine
        variants={fadeUpVariants}
        initial="hidden"
        animate={controls}
        data-testid="hero-tagline"
      >
        Product Design Studio
      </TagLine>

      {/* Headline em cascata */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        data-testid="hero-headline"
      >
        <HeadlineWrapper>
          <HeadlineLine variants={lineVariants}>
            WE CRAFT
          </HeadlineLine>
        </HeadlineWrapper>

        <HeadlineWrapper>
          <HeadlineLine variants={lineVariants} className="accent-line">
            PRODUCTS
          </HeadlineLine>
        </HeadlineWrapper>

        <HeadlineWrapper>
          <HeadlineLine variants={lineVariants}>
            THAT MATTER
          </HeadlineLine>
        </HeadlineWrapper>
      </motion.div>

      {/* Linha inferior */}
      <BottomRow
        variants={fadeUpVariants}
        initial="hidden"
        animate={controls}
      >
        <Description>
          We partner with founders and teams to design digital products
          with intention — from strategy to pixel-perfect execution.
        </Description>

        <StatsRow>
          <StatItem variants={fadeUpVariants} data-testid="hero-stat-projects">
            <StatNumber>48+</StatNumber>
            <StatLabel>Projects</StatLabel>
          </StatItem>
          <StatItem variants={fadeUpVariants} data-testid="hero-stat-years">
            <StatNumber>7</StatNumber>
            <StatLabel>Years</StatLabel>
          </StatItem>
        </StatsRow>
      </BottomRow>

      {/* Scroll indicator */}
      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span>scroll</span>
        <ScrollLine />
      </ScrollIndicator>
    </HeroSection>
  )
}