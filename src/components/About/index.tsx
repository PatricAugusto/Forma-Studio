'use client'

import styled from 'styled-components'
import AboutVisual    from './sections/AboutVisual'
import AboutStatement from './sections/AboutStatement'
import AboutServices  from './sections/AboutServices'

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`

export default function About() {
  return (
    <AboutSection data-testid="about-section">
      <AboutVisual />
      <AboutStatement />
      <AboutServices />
    </AboutSection>
  )
}