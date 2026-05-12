import type { Variants } from 'framer-motion'

export const fadeUpVariants: Variants = {
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

export const headlineVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}