'use client'

import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { useCursor, type CursorVariant } from './cursor.hooks'

// ─── Styled ───────────────────────────────────────────────────────────────────

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  will-change: transform;
`

const CursorRing = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const ViewLabel = styled(motion.span)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.bg};
  white-space: nowrap;
  position: absolute;
`

// ─── Variantes por estado ─────────────────────────────────────────────────────

import type { TargetAndTransition } from 'framer-motion'

// ─── Variantes por estado ─────────────────────────────────────────────────────

const ringVariants: Record<CursorVariant, TargetAndTransition> = {
  default: {
    width:        36,
    height:       36,
    borderRadius: '50%',
    border:       '1px solid rgba(200, 255, 0, 0.4)',
    background:   'rgba(200, 255, 0, 0)',
    opacity:      1,
  } satisfies TargetAndTransition,
  hover: {
    width:        56,
    height:       56,
    borderRadius: '50%',
    border:       '1px solid rgba(200, 255, 0, 0.8)',
    background:   'rgba(200, 255, 0, 0.08)',
    opacity:      1,
  } satisfies TargetAndTransition,
  project: {
    width:        96,
    height:       96,
    borderRadius: '50%',
    border:       '1px solid rgba(200, 255, 0, 0)',
    background:   'rgba(200, 255, 0, 1)',
    opacity:      1,
  } satisfies TargetAndTransition,
  text: {
    width:        4,
    height:       28,
    borderRadius: '2px',
    border:       '1px solid rgba(200, 255, 0, 0.8)',
    background:   'rgba(200, 255, 0, 0)',
    opacity:      1,
  } satisfies TargetAndTransition,
  hidden: {
    width:        36,
    height:       36,
    borderRadius: '50%',
    border:       '1px solid rgba(200, 255, 0, 0)',
    background:   'rgba(200, 255, 0, 0)',
    opacity:      0,
  } satisfies TargetAndTransition,
}

const dotVariants: Record<CursorVariant, TargetAndTransition> = {
  default: { scale: 1,   opacity: 1 } satisfies TargetAndTransition,
  hover:   { scale: 1.5, opacity: 1 } satisfies TargetAndTransition,
  project: { scale: 0,   opacity: 0 } satisfies TargetAndTransition,
  text:    { scale: 0,   opacity: 0 } satisfies TargetAndTransition,
  hidden:  { scale: 0,   opacity: 0 } satisfies TargetAndTransition,
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Cursor() {
  const { x, y, springX, springY, variant, isTouch } = useCursor()

  if (isTouch) return null

  return (
    <>
      {/* Ponto — segue o mouse com precisão */}
      <CursorDot
        style={{ x, y }}
        animate={dotVariants[variant]}
        transition={{ duration: 0.15 }}
        data-testid="cursor-dot"
        aria-hidden="true"
      />

      {/* Anel — segue com spring lag */}
      <CursorRing
        style={{ x: springX, y: springY }}
        animate={ringVariants[variant]}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        data-testid="cursor-ring"
        aria-hidden="true"
      >
        {/* Label "VIEW" aparece no hover de projeto */}
        <AnimatePresence>
          {variant === 'project' && (
            <ViewLabel
              key="view-label"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{    opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              data-testid="cursor-view-label"
            >
              VIEW
            </ViewLabel>
          )}
        </AnimatePresence>
      </CursorRing>
    </>
  )
}