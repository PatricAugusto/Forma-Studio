'use client'

import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { sectionVariants, cardVariants } from '../work.variants'
import { PROJECTS, ILLUSTRATIONS, type Category } from '../work.data'

// ─── Props ────────────────────────────────────────────────────────────────────

interface WorkGridProps {
  activeFilter: Category
}

// ─── Styled ───────────────────────────────────────────────────────────────────

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const ProjectCard = styled(motion.article)<{ $span: 'wide' | 'narrow' }>`
  grid-column: span ${({ $span }) => ($span === 'wide' ? 7 : 5)};
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  aspect-ratio: ${({ $span }) => ($span === 'wide' ? '16/9' : '4/5')};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-column: span 1;
    aspect-ratio: 4/3;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: span 1;
    aspect-ratio: 3/2;
  }

  @media (hover: none) {
    .reveal { transform: translateY(0); }
  }

  &:hover .reveal,
  &:focus-within .reveal {
    transform: translateY(0);
  }
`

const CardReveal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    to top,
    rgba(10,10,10,0.95) 0%,
    rgba(10,10,10,0.7) 60%,
    transparent 100%
  );
  transform: translateY(30%);
  transition: transform ${({ theme }) => theme.transitions.smooth};
`

const CardCategory = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  display: block;
  margin-bottom: 0.4rem;
`

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.02em;
  line-height: 1;
`

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`

const CardYear = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.1em;
`

const CardArrow = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.accent};
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.fast};

  ${ProjectCard}:hover & {
    transform: translate(3px, -3px);
  }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function WorkGrid({ activeFilter }: WorkGridProps) {
  const filtered = PROJECTS.filter(
    p => activeFilter === 'All' || p.category === activeFilter
  )

  return (
    <Grid
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5%' }}
      data-testid="projects-grid"
    >
      <AnimatePresence mode="popLayout">
        {filtered.map(project => {
          const Illustration = ILLUSTRATIONS[project.id]

          return (
            <ProjectCard
              key={project.id}
              $span={project.span}
              variants={cardVariants}
              custom={project.index}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              data-testid={`project-card-${project.id}`}
              data-cursor="project"
              tabIndex={0}
              role="article"
              aria-label={`${project.title} — ${project.category}`}
            >
              {Illustration && <Illustration />}

              <CardReveal className="reveal">
                <CardCategory>{project.category}</CardCategory>
                <CardTitle>{project.title}</CardTitle>
                <CardMeta>
                  <CardYear>{project.year}</CardYear>
                  <CardArrow>↗</CardArrow>
                </CardMeta>
              </CardReveal>
            </ProjectCard>
          )
        })}
      </AnimatePresence>
    </Grid>
  )
}