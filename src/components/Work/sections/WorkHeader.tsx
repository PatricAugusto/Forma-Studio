'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import { fadeUpVariants } from '../work.variants'
import { CATEGORIES, type Category } from '../work.data'

// ─── Props ────────────────────────────────────────────────────────────────────

interface WorkHeaderProps {
  activeFilter: Category
  onFilterChange: (cat: Category) => void
}

// ─── Animação ─────────────────────────────────────────────────────────────────

const scrollLoop = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`

// ─── Styled ───────────────────────────────────────────────────────────────────

const HeaderWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const SectionLabel = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: '02 — ';
    color: ${({ theme }) => theme.colors.muted};
  }
`

const SectionTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 0.9;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`

const FilterCarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 480px;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 12%,
    black 88%,
    transparent 100%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`

const FilterTrack = styled.div<{ $paused: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  width: max-content;
  animation: ${scrollLoop} 8s linear infinite;
  animation-play-state: ${({ $paused }) => ($paused ? 'paused' : 'running')};
`

const FilterButton = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.5rem 1.2rem;
  flex-shrink: 0;
  white-space: nowrap;
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.border};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.bg : theme.colors.muted};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent : 'transparent'};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    color        ${({ theme }) => theme.transitions.fast},
    background   ${({ theme }) => theme.transitions.fast},
    transform    ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.bg : theme.colors.accent};
    transform: scale(1.04);
  }

  &:active { transform: scale(0.97); }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function WorkHeader({ activeFilter, onFilterChange }: WorkHeaderProps) {
  const [paused, setPaused] = useState(false)

  return (
    <HeaderWrapper>
      {/* Título */}
      <div>
        <SectionLabel
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Selected Work
        </SectionLabel>
        <SectionTitle
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          PROJECTS
        </SectionTitle>
      </div>

      {/* Filtros em carrossel */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        data-testid="filter-row"
      >
        <FilterCarouselWrapper
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <FilterTrack $paused={paused}>
            {/* Cópia A — funcional */}
            {CATEGORIES.map(cat => (
              <FilterButton
                key={`a-${cat}`}
                $active={activeFilter === cat}
                onClick={() => onFilterChange(cat)}
                data-testid={`filter-${cat.toLowerCase()}`}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </FilterButton>
            ))}
            {/* Cópia B — visual, cria o loop */}
            {CATEGORIES.map(cat => (
              <FilterButton
                key={`b-${cat}`}
                $active={activeFilter === cat}
                onClick={() => onFilterChange(cat)}
                aria-hidden="true"
                tabIndex={-1}
              >
                {cat}
              </FilterButton>
            ))}
          </FilterTrack>
        </FilterCarouselWrapper>
      </motion.div>
    </HeaderWrapper>
  )
}