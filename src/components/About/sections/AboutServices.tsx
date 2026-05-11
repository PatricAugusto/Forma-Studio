'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import { serviceVariants } from '../about.variants'
import { SERVICES } from '../about.data'

// ─── Styled ───────────────────────────────────────────────────────────────────

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

  &:hover::before { width: 100%; }
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

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AboutServices() {
  return (
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
  )
}