'use client'

import { motion } from 'framer-motion'
import styled from 'styled-components'
import FormaVisual from '../illustrations/FormaVisual'
import { clipRevealVariants } from '../about.variants'

// ─── Styled ───────────────────────────────────────────────────────────────────

const VisualBlock = styled(motion.div)`
  width: 100%;
  height: 520px;
  background: ${({ theme }) => theme.colors.surface};
  position: relative;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 220px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
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

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AboutVisual() {
  return (
    <VisualBlock
      variants={clipRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      data-testid="about-visual"
    >
      <FormaVisual />

      <VisualAccent
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
      />
    </VisualBlock>
  )
}