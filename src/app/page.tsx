import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Work from '@/components/Work'
import About from '@/components/About'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Work />
      <About />
    </main>
  )
}