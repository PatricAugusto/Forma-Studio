import type { Variants } from 'framer-motion'

export const navVariants: Variants = {
  hidden:  { y: -100, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.08,
    },
  },
}

export const containerVariants: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

export const lineVariants: Variants = {
  hidden:  { y: '110%' },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export const fadeUpVariants: Variants = {
  hidden:  { y: 24, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export const orbVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 1.2, ease: 'easeOut', delay: 0.6 },
  },
}