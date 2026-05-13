import type { ComponentType } from 'react'
import AurumFinance    from './illustrations/AurumFinance'
import NordeStudio     from './illustrations/NordeStudio'
import PulseHealth     from './illustrations/PulseHealth'
import OrbitMotion     from './illustrations/OrbitMotion'
import SerraCollective from './illustrations/SerraCollective'
import VelaSystems     from './illustrations/VelaSystems'

export type Category = 'All' | 'Branding' | 'Digital' | 'Motion'

export interface Project {
  id: string
  title: string
  category: Category
  year: string
  span: 'wide' | 'narrow'
  index: number
}

export const CATEGORIES: Category[] = ['All', 'Branding', 'Digital', 'Motion']

export const PROJECTS: Project[] = [
  { id: 'p1', title: 'Aurum Finance',    category: 'Digital',  year: '2024', span: 'wide',   index: 0 },
  { id: 'p2', title: 'Norde Studio',     category: 'Branding', year: '2024', span: 'narrow', index: 1 },
  { id: 'p3', title: 'Pulse Health',     category: 'Digital',  year: '2023', span: 'narrow', index: 2 },
  { id: 'p4', title: 'Orbit Motion',     category: 'Motion',   year: '2023', span: 'wide',   index: 3 },
  { id: 'p5', title: 'Serra Collective', category: 'Branding', year: '2024', span: 'narrow', index: 4 },
  { id: 'p6', title: 'Vela Systems',     category: 'Digital',  year: '2022', span: 'narrow', index: 5 },
]

export const ILLUSTRATIONS: Record<string, ComponentType> = {
  p1: AurumFinance,
  p2: NordeStudio,
  p3: PulseHealth,
  p4: OrbitMotion,
  p5: SerraCollective,
  p6: VelaSystems,
}