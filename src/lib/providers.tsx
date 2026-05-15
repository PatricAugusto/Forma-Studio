'use client'

import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { theme } from '@/styles/theme'
import { GlobalStyles } from '@/styles/GlobalStyles'
import Cursor        from '@/components/Cursor'
import LoadingScreen from '@/components/LoadingScreen'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <Cursor />

      <AnimatePresence mode="wait">
        {!loaded && (
          <LoadingScreen
            key="loading"
            onComplete={() => setLoaded(true)}
          />
        )}
      </AnimatePresence>

      {/* Conteúdo só monta após o loading completar */}
      <AnimatePresence>
        {loaded && children}
      </AnimatePresence>
    </ThemeProvider>
  )
}