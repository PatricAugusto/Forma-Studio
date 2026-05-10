'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { Variants } from 'framer-motion'
import styled, { keyframes } from 'styled-components'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface SocialLink {
  id: string
  label: string
  href: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS: SocialLink[] = [
  { id: 'sl1', label: 'Instagram', href: '#' },
  { id: 'sl2', label: 'Behance',   href: '#' },
  { id: 'sl3', label: 'LinkedIn',  href: '#' },
  { id: 'sl4', label: 'Dribbble',  href: '#' },
]

const MARQUEE_TEXT = 'PRODUCT DESIGN — BRANDING — MOTION — STRATEGY — '

// ─── Animações ────────────────────────────────────────────────────────────────

const marqueeMove = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`

// ─── Styled Components ────────────────────────────────────────────────────────

const FooterWrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`

const MarqueeWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  overflow: hidden;
  white-space: nowrap;
`

const MarqueeTrack = styled.div`
  display: inline-flex;
  animation: ${marqueeMove} 18s linear infinite;
`

const MarqueeText = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.85rem;
  letter-spacing: 0.3em;
  color: ${({ theme }) => theme.colors.muted};
  padding-right: 0;

  em {
    color: ${({ theme }) => theme.colors.accent};
    font-style: normal;
  }
`

const FooterMain = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm};
  }
`

const FooterEyebrow = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &::before {
    content: '04 — ';
    color: ${({ theme }) => theme.colors.muted};
  }
`

const BigCTA = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(3.5rem, 13vw, 18rem);
  line-height: 0.85;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
  cursor: none;
  word-break: break-word;

  span.cursor-blink {
    color: ${({ theme }) => theme.colors.accent};
    animation: ${blink} 1.2s step-end infinite;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`

const MagneticWrapper = styled.div`
  position: relative;
  display: inline-flex;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const CTACircle = styled(motion.a)`
  width: clamp(120px, 20vw, 180px);
  height: clamp(120px, 20vw, 180px);
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.3rem;
  position: relative;
  overflow: hidden;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    transform: scale(0);
    transition: transform ${({ theme }) => theme.transitions.smooth};
  }

  &:hover::before { transform: scale(1); }
  &:hover span    { color: ${({ theme }) => theme.colors.bg}; }
  &:hover         { border-color: ${({ theme }) => theme.colors.accent}; }
`

const CTALabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  z-index: 1;
  transition: color ${({ theme }) => theme.transitions.fast};
  line-height: 1;
`

const CTASub = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  position: relative;
  z-index: 1;
  transition: color ${({ theme }) => theme.transitions.fast};
`

const FooterBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
  }
`

const Copyright = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
`

const SocialList = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const SocialItem = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width ${({ theme }) => theme.transitions.smooth};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover::after {
    width: 100%;
  }
`

const EmailLink = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
    transition: background ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover::after {
    background: ${({ theme }) => theme.colors.accent};
  }
`

// ─── Variantes ────────────────────────────────────────────────────────────────

const fadeUpVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

const headlineVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

// ─── Magnetic CTA ─────────────────────────────────────────────────────────────

function MagneticCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width  / 2
    const centerY = rect.top  + rect.height / 2
    x.set((e.clientX - centerX) * 0.35)
    y.set((e.clientY - centerY) * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <MagneticWrapper
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      data-testid="magnetic-cta"
    >
      <CTACircle
        href="/contact"
        style={{ x: springX, y: springY }}
        whileTap={{ scale: 0.95 }}
        data-testid="cta-circle"
        aria-label="Start a project"
      >
        <CTALabel>START A</CTALabel>
        <CTALabel>PROJECT</CTALabel>
        <CTASub>{hovered ? '→ contact us' : 'get in touch'}</CTASub>
      </CTACircle>
    </MagneticWrapper>
  )
}

// ─── Componente Principal ─────────────────────────────────────────────────────

export default function Footer() {
  return (
    <FooterWrapper data-testid="footer-wrapper">
      {/* Marquee */}
      <MarqueeWrapper aria-hidden="true" data-testid="marquee">
        <MarqueeTrack>
          {[...Array(4)].map((_, i) => (
            <MarqueeText key={i}>
              {MARQUEE_TEXT.split('—').map((part, j) => (
                <span key={j}>
                  {part.trim()}
                  {j < MARQUEE_TEXT.split('—').length - 1 && (
                    <em> — </em>
                  )}
                </span>
              ))}
            </MarqueeText>
          ))}
        </MarqueeTrack>
      </MarqueeWrapper>

      <FooterMain>
        <FooterEyebrow
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Start a conversation
        </FooterEyebrow>

        {/* Headline com overflow clip */}
        <div style={{ overflow: 'hidden' }}>
          <BigCTA
            variants={headlineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            data-testid="footer-headline"
          >
            LET&apos;S TALK<span className="cursor-blink">_</span>
          </BigCTA>
        </div>

        {/* Email */}
        <EmailLink
          href="mailto:hello@forma.studio"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          data-testid="footer-email"
        >
          hello@forma.studio
        </EmailLink>

        {/* CTA Magnético */}
        <MagneticCTA />

        {/* Rodapé inferior */}
        <FooterBottom data-testid="footer-bottom">
          <Copyright data-testid="footer-copyright">
            © {new Date().getFullYear()} Forma Studio — All rights reserved
          </Copyright>

          <SocialList aria-label="Redes sociais" data-testid="social-list">
            {SOCIAL_LINKS.map((link) => (
              <SocialItem
                key={link.id}
                href={link.href}
                whileHover={{ y: -2 }}
                data-testid={`social-${link.id}`}
                aria-label={link.label}
              >
                {link.label}
              </SocialItem>
            ))}
          </SocialList>
        </FooterBottom>
      </FooterMain>
    </FooterWrapper>
  )
}