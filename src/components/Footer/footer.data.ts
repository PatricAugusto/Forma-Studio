export interface SocialLink {
  id: string
  label: string
  href: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'sl1', label: 'Instagram', href: '#' },
  { id: 'sl2', label: 'Behance',   href: '#' },
  { id: 'sl3', label: 'LinkedIn',  href: '#' },
  { id: 'sl4', label: 'Dribbble',  href: '#' },
]

export const MARQUEE_TEXT = 'PRODUCT DESIGN — BRANDING — MOTION — STRATEGY — '