import type { Metadata } from 'next'
import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { theme } from '@/styles/theme'

export const metadata: Metadata = {
  title: 'forma. — product design studio',
  description: 'We design products that matter.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles theme={theme} />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}