'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import styled from 'styled-components'

// ─── Styled ───────────────────────────────────────────────────────────────────

const StatValue = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.8rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`

// ─── Props ────────────────────────────────────────────────────────────────────

interface AnimatedCounterProps {
  value: number
  suffix: string
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AnimatedCounter({ value, suffix }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration  = 1500
    const steps     = 40
    const increment = value / steps
    let current     = 0

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