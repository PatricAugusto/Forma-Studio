export interface Service {
  id: string
  number: string
  title: string
  description: string
}

export interface Stat {
  id: string
  value: number
  suffix: string
  label: string
}

export const SERVICES: Service[] = [
  {
    id: 's1',
    number: '01',
    title: 'Product Strategy',
    description: 'Research, positioning, and roadmap definition.',
  },
  {
    id: 's2',
    number: '02',
    title: 'UX & Interface Design',
    description: 'From wireframes to pixel-perfect interfaces.',
  },
  {
    id: 's3',
    number: '03',
    title: 'Design Systems',
    description: 'Scalable systems built for teams that ship.',
  },
  {
    id: 's4',
    number: '04',
    title: 'Motion & Interaction',
    description: 'Animations that communicate and delight.',
  },
]

export const STATS: Stat[] = [
  { id: 'st1', value: 48,  suffix: '+', label: 'Projects delivered' },
  { id: 'st2', value: 7,   suffix: '',  label: 'Years of practice'  },
  { id: 'st3', value: 100, suffix: '%', label: 'Remote-first'       },
]