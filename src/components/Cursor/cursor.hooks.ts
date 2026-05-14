import { useEffect, useState, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export type CursorVariant = 'default' | 'hover' | 'project' | 'text' | 'hidden'

interface UseCursorReturn {
  x:       ReturnType<typeof useMotionValue<number>>
  y:       ReturnType<typeof useMotionValue<number>>
  springX: ReturnType<typeof useSpring>
  springY: ReturnType<typeof useSpring>
  variant: CursorVariant
  isTouch: boolean
}

// Função pura fora do componente — roda no cliente, segura para SSR
function detectTouch(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches
}

export function useCursor(): UseCursorReturn {
  const [variant, setVariant] = useState<CursorVariant>('default')

  // Inicialização lazy — a função só roda uma vez, fora do ciclo de render
  const [isTouch] = useState<boolean>(detectTouch)

  const x       = useMotionValue(-100)
  const y       = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.5 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }, [x, y])

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const el     = target.closest(
      'a, button, [data-cursor], [data-testid*="project-card"]'
    )

    if (!el) {
      setVariant('default')
      return
    }

    const cursorAttr = el.getAttribute('data-cursor')

    if (
      cursorAttr === 'project' ||
      el.getAttribute('data-testid')?.includes('project-card')
    ) {
      setVariant('project')
    } else if (cursorAttr === 'text') {
      setVariant('text')
    } else {
      setVariant('hover')
    }
  }, [])

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const related = e.relatedTarget as HTMLElement | null
    if (!related) setVariant('default')
  }, [])

  const handleMouseLeave = useCallback(() => setVariant('hidden'),  [])
  const handleMouseEnter = useCallback(() => setVariant('default'), [])

  useEffect(() => {
    if (isTouch) return

    window.addEventListener('mousemove',    handleMouseMove,  { passive: true })
    window.addEventListener('mouseover',    handleMouseOver,  { passive: true })
    window.addEventListener('mouseout',     handleMouseOut,   { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove',    handleMouseMove)
      window.removeEventListener('mouseover',    handleMouseOver)
      window.removeEventListener('mouseout',     handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isTouch, handleMouseMove, handleMouseOver, handleMouseOut,
      handleMouseLeave, handleMouseEnter])

  return { x, y, springX, springY, variant, isTouch }
}