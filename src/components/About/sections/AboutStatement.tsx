'use client'

import { motion } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import AnimatedCounter from './AnimatedCounter'
import { fadeUpVariants } from '../about.variants'
import { STATS } from '../about.data'

// ─── Animações ────────────────────────────────────────────────────────────────

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`

// ─── Styled ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const SectionLabel = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: '03 — ';
    color: ${({ theme }) => theme.colors.muted};
  }
`

const BigStatement = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.8rem, 5vw, 5.5rem);
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
`

const AccentWord = styled.span`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.text},
    ${({ theme }) => theme.colors.accent}
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`

const BodyText = styled(motion.p)`
  font-size: 0.95rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.8;
  max-width: 400px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`

const StatsRow = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const StatBlock = styled.div``

const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AboutStatement() {
  return (
    <Wrapper>
      {/* Coluna esquerda — headline */}
      <div>
        <SectionLabel
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          About the Studio
        </SectionLabel>

        <BigStatement
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-testid="about-statement"
        >
          DESIGN IS <br />
          <AccentWord>THINKING</AccentWord>
          <br /> MADE VISIBLE
        </BigStatement>
      </div>

      {/* Coluna direita — texto + stats */}
      <RightColumn>
        <BodyText
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-testid="about-body"
        >
          We are a small, focused studio that believes great design
          emerges from deep understanding — of people, systems, and the
          details that make products feel inevitable.
        </BodyText>

        <StatsRow
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-testid="about-stats"
        >
          {STATS.map(stat => (
            <StatBlock key={stat.id} data-testid={`stat-${stat.id}`}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <StatLabel>{stat.label}</StatLabel>
            </StatBlock>
          ))}
        </StatsRow>
      </RightColumn>
    </Wrapper>
  )
}