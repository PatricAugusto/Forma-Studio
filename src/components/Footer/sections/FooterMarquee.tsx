'use client'

import styled, { keyframes } from 'styled-components'
import { MARQUEE_TEXT } from '../footer.data'

// ─── Animação ─────────────────────────────────────────────────────────────────

const marqueeMove = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`

// ─── Styled ───────────────────────────────────────────────────────────────────

const MarqueeWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  overflow: hidden;
  white-space: nowrap;
`

const MarqueeTrack = styled.div`
  display: inline-flex;
  animation: ${marqueeMove} 18s linear infinite;
`

const MarqueeText = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: ${({ theme }) => theme.colors.muted};

  em {
    color: ${({ theme }) => theme.colors.accent};
    font-style: normal;
  }
`

// ─── Componente ───────────────────────────────────────────────────────────────

export default function FooterMarquee() {
  return (
    <MarqueeWrapper aria-hidden="true" data-testid="marquee">
      <MarqueeTrack>
        {[...Array(4)].map((_, i) => (
          <MarqueeText key={i}>
            {MARQUEE_TEXT.split('—').map((part, j, arr) => (
              <span key={j}>
                {part.trim()}
                {j < arr.length - 1 && <em> — </em>}
              </span>
            ))}
          </MarqueeText>
        ))}
      </MarqueeTrack>
    </MarqueeWrapper>
  )
}