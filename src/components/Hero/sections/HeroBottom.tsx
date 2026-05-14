'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import { fadeUpVariants } from '../hero.variants'
import { STATS, HERO_COPY } from '../hero.data'

// ─── Styled ───────────────────────────────────────────────────────────────────

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

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeroBottomProps {
  controls: ReturnType<typeof import('framer-motion').useAnimation>
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function HeroBottom({ controls }: HeroBottomProps) {
  return (
    <BottomRow
      variants={fadeUpVariants}
      initial="hidden"
      animate={controls}
    >
      <Description>{HERO_COPY.description}</Description>

      <StatsRow>
        {STATS.map(stat => (
          <StatItem
            key={stat.id}
            variants={fadeUpVariants}
            data-testid={`hero-stat-${stat.label.toLowerCase()}`}
          >
            <StatNumber>{stat.value}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatsRow>
    </BottomRow>
  )
}