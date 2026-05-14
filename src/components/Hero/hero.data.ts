export interface Stat {
  id: string
  value: string
  label: string
}

export const STATS: Stat[] = [
  { id: 'hs1', value: '48+', label: 'Projects' },
  { id: 'hs2', value: '7',   label: 'Years'    },
]

export const HERO_COPY = {
  tagline:     'Product Design Studio',
  headline:    ['WE CRAFT', 'PRODUCTS', 'THAT MATTER'],
  description: 'We partner with founders and teams to design digital products with intention — from strategy to pixel-perfect execution.',
} as const