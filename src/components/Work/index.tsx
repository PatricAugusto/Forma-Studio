'use client'

import { useState } from 'react'
import styled from 'styled-components'
import WorkHeader from './sections/WorkHeader'
import WorkGrid   from './sections/WorkGrid'
import { type Category } from './work.data'

// ─── Styled ───────────────────────────────────────────────────────────────────

const WorkSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')

  return (
    <WorkSection data-testid="work-section">
      <WorkHeader
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <WorkGrid activeFilter={activeFilter} />
    </WorkSection>
  )
}