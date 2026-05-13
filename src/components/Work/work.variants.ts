import type { Variants } from 'framer-motion'

export const fadeUpVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const cardVariants: Variants = {
  hidden: { y: 48, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
  exit: {
    y: -24,
    opacity: 0,
    transition: { duration: 0.3 },
  },
}