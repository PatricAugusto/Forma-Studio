'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styled, { keyframes } from 'styled-components'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Service {
  id: string
  number: string
  title: string
  description: string
}

interface Stat {
  id: string
  value: number
  suffix: string
  label: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    id: 's1',
    number: '01',
    title: 'Product Strategy',
    description: 'Research, positioning, and roadmap definition.',
  },
  {
    id: 's2',
    number: '02',
    title: 'UX & Interface Design',
    description: 'From wireframes to pixel-perfect interfaces.',
  },
  {
    id: 's3',
    number: '03',
    title: 'Design Systems',
    description: 'Scalable systems built for teams that ship.',
  },
  {
    id: 's4',
    number: '04',
    title: 'Motion & Interaction',
    description: 'Animations that communicate and delight.',
  },
]

const STATS: Stat[] = [
  { id: 'st1', value: 48,  suffix: '+', label: 'Projects delivered' },
  { id: 'st2', value: 7,   suffix: '',  label: 'Years of practice'  },
  { id: 'st3', value: 100, suffix: '%', label: 'Remote-first'       },
]

// ─── Animações ────────────────────────────────────────────────────────────────

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`

// ─── Styled Components ────────────────────────────────────────────────────────

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`

const TopRow = styled.div`
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
`

const StatsRow = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const StatBlock = styled.div``

const StatValue = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.8rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`

const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

const VisualBlock = styled(motion.div)`
  width: 100%;
  height: 480px;
  background: ${({ theme }) => theme.colors.surface};
  position: relative;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 280px;
  }
`

const VisualInner = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.surface} 0%,
    #1a1a1a 50%,
    ${({ theme }) => theme.colors.surface} 100%
  );

  &::before {
    content: 'FORMA';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(6rem, 18vw, 16rem);
    color: rgba(255,255,255,0.03);
    white-space: nowrap;
    letter-spacing: 0.1em;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.012) 2px,
      rgba(255,255,255,0.012) 4px
    );
  }
`

const VisualAccent = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  height: 2px;
  background: ${({ theme }) => theme.colors.accent};
  transform-origin: left;
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const ServiceItem = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;

  &:nth-child(odd) {
    padding-right: ${({ theme }) => theme.spacing.lg};
    border-right: 1px solid ${({ theme }) => theme.colors.border};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      border-right: none;
      padding-right: 0;
    }
  }

  &:nth-child(even) {
    padding-left: ${({ theme }) => theme.spacing.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding-left: 0;
    }
  }

  /* Linha animada no hover */
  &::before {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 1px;
    width: 0;
    background: ${({ theme }) => theme.colors.accent};
    transition: width ${({ theme }) => theme.transitions.smooth};
  }

  &:hover::before {
    width: 100%;
  }
`

const ServiceNumber = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.accent};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const ServiceTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1;
`

const ServiceDescription = styled.p`
  font-size: 0.85rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`

// ─── Contador Animado ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const steps = 40
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <StatValue ref={ref} data-testid="counter-value">
      {count}{suffix}
    </StatValue>
  )
}

// ─── Variantes ────────────────────────────────────────────────────────────────

const fadeUpVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

const clipRevealVariants: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

const serviceVariants: Variants = {
  hidden: { x: -24, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function About() {
  return (
    <AboutSection data-testid="about-section">
      {/* Bloco visual com clip-path reveal */}
      <VisualBlock
        variants={clipRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        data-testid="about-visual"
      >
        <VisualInner />
        <VisualAccent
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        />
      </VisualBlock>

      {/* Texto editorial */}
      <TopRow>
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
            {STATS.map((stat) => (
              <StatBlock key={stat.id} data-testid={`stat-${stat.id}`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <StatLabel>{stat.label}</StatLabel>
              </StatBlock>
            ))}
          </StatsRow>
        </RightColumn>
      </TopRow>

      {/* Serviços */}
      <ServicesGrid data-testid="services-grid">
        {SERVICES.map((service, i) => (
          <ServiceItem
            key={service.id}
            custom={i}
            variants={serviceVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            data-testid={`service-${service.id}`}
          >
            <ServiceNumber>{service.number}</ServiceNumber>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
          </ServiceItem>
        ))}
      </ServicesGrid>
    </AboutSection>
  )
}