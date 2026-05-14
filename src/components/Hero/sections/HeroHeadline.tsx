'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import { containerVariants, lineVariants, fadeUpVariants } from '../hero.variants'
import { HERO_COPY } from '../hero.data'

// ─── Styled ───────────────────────────────────────────────────────────────────

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

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeroHeadlineProps {
  controls: ReturnType<typeof import('framer-motion').useAnimation>
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function HeroHeadline({ controls }: HeroHeadlineProps) {
  return (
    <>
      <TagLine
        variants={fadeUpVariants}
        initial="hidden"
        animate={controls}
        data-testid="hero-tagline"
      >
        {HERO_COPY.tagline}
      </TagLine>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        data-testid="hero-headline"
      >
        {HERO_COPY.headline.map((line, i) => (
          <HeadlineWrapper key={line}>
            <HeadlineLine
              variants={lineVariants}
              className={i === 1 ? 'accent-line' : undefined}
            >
              {line}
            </HeadlineLine>
          </HeadlineWrapper>
        ))}
      </motion.div>
    </>
  )
}