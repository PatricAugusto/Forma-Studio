"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import styled from "styled-components";

import AurumFinance from "./illustrations/AurumFinance";
import NordeStudio from "./illustrations/NordeStudio";
import PulseHealth from "./illustrations/PulseHealth";
import OrbitMotion from "./illustrations/OrbitMotion";
import SerraCollective from "./illustrations/SerraCollective";
import VelaSystems from "./illustrations/VelaSystems";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Category = "All" | "Branding" | "Digital" | "Motion";

interface Project {
  id: string;
  title: string;
  category: Category;
  year: string;
  span: "wide" | "narrow";
  index: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Aurum Finance",
    category: "Digital",
    year: "2024",
    span: "wide",
    index: 0,
  },
  {
    id: "p2",
    title: "Norde Studio",
    category: "Branding",
    year: "2024",
    span: "narrow",
    index: 1,
  },
  {
    id: "p3",
    title: "Pulse Health",
    category: "Digital",
    year: "2023",
    span: "narrow",
    index: 2,
  },
  {
    id: "p4",
    title: "Orbit Motion",
    category: "Motion",
    year: "2023",
    span: "wide",
    index: 3,
  },
  {
    id: "p5",
    title: "Serra Collective",
    category: "Branding",
    year: "2024",
    span: "narrow",
    index: 4,
  },
  {
    id: "p6",
    title: "Vela Systems",
    category: "Digital",
    year: "2022",
    span: "narrow",
    index: 5,
  },
];

const CATEGORIES: Category[] = ["All", "Branding", "Digital", "Motion"];

const ILLUSTRATIONS: Record<string, React.ComponentType> = {
  p1: AurumFinance,
  p2: NordeStudio,
  p3: PulseHealth,
  p4: OrbitMotion,
  p5: SerraCollective,
  p6: VelaSystems,
};

// ─── Styled Components ────────────────────────────────────────────────────────

const WorkSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg}
      ${({ theme }) => theme.spacing.sm};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SectionLabel = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: "02 — ";
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 0.9;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`;

const FilterRow = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.5rem 1.2rem;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.border};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.bg : theme.colors.muted};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accent : "transparent"};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.bg : theme.colors.accent};
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.article)<{ $span: "wide" | "narrow" }>`
  grid-column: span ${({ $span }) => ($span === "wide" ? 7 : 5)};
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  aspect-ratio: ${({ $span }) => ($span === "wide" ? "16/9" : "4/5")};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: span 1;
    aspect-ratio: 4/3;
  }

  &:hover img,
  &:focus-within img {
    transform: scale(1.06);
  }

  &:hover .reveal,
  &:focus-within .reveal {
    transform: translateY(0);
  }
`;

const CardReveal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(
    to top,
    rgba(10, 10, 10, 0.95) 0%,
    rgba(10, 10, 10, 0.7) 60%,
    transparent 100%
  );
  transform: translateY(30%);
  transition: transform ${({ theme }) => theme.transitions.smooth};
`;

const CardCategory = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  display: block;
  margin-bottom: 0.4rem;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.02em;
  line-height: 1;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const CardYear = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.1em;
`;

const CardArrow = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.accent};
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.fast};

  ${ProjectCard}:hover & {
    transform: translate(3px, -3px);
  }
`;

// ─── Variantes ────────────────────────────────────────────────────────────────

const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUpVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 48, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
  exit: {
    y: -24,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered = PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter,
  );

  return (
    <WorkSection data-testid="work-section">
      <SectionHeader>
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

        <FilterRow
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-testid="filter-row"
        >
          {CATEGORIES.map((cat) => (
            <FilterButton
              key={cat}
              $active={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              data-testid={`filter-${cat.toLowerCase()}`}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </FilterButton>
          ))}
        </FilterRow>
      </SectionHeader>

      <Grid
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-5%" }}
        data-testid="projects-grid"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
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
              tabIndex={0}
              role="article"
              aria-label={`${project.title} — ${project.category}`}
            >
              {(() => {
                const Illustration = ILLUSTRATIONS[project.id];
                return Illustration ? <Illustration /> : null;
              })()}

              <CardReveal className="reveal">
                <CardCategory>{project.category}</CardCategory>
                <CardTitle>{project.title}</CardTitle>
                <CardMeta>
                  <CardYear>{project.year}</CardYear>
                  <CardArrow>↗</CardArrow>
                </CardMeta>
              </CardReveal>
            </ProjectCard>
          ))}
        </AnimatePresence>
      </Grid>
    </WorkSection>
  );
}
