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

export const itemVariants: Variants = {
  hidden:  { y: -20, opacity: 0 },
  visible: { y: 0,   opacity: 1 },
}

export const overlayVariants: Variants = {
  hidden: {
    clipPath: 'inset(0 0 100% 0)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      when: 'afterChildren',
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
}

export const linkRowVariants: Variants = {
  hidden:  { y: '110%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export const bottomVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: 0.35 },
  },
}