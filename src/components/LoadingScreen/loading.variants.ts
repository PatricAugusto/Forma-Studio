import type { Variants } from 'framer-motion'

export const overlayVariants: Variants = {
  visible: {
    clipPath: 'inset(0 0 0% 0)',
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    transition: {
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      delay: 0.3,
    },
  },
}

export const counterVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25 },
  },
}

export const logoVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
}

export const letterVariants: Variants = {
  hidden:  { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export const progressVariants: Variants = {
  initial: { scaleX: 0 },
  animate: (progress: number) => ({
    scaleX: progress / 100,
    transition: { duration: 0.4, ease: 'easeOut' },
  }),
}

export const taglineVariants: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.4, ease: 'easeOut' },
  },
}