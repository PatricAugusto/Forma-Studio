export default function FormaVisual() {
  return (
    <svg
      viewBox="0 0 1200 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      {/* ── Fundo ─────────────────────────────────────────────────── */}
      <rect width="1200" height="480" fill="#111111"/>

      {/* ── Textura scanlines ──────────────────────────────────────── */}
      <defs>
        <pattern id="scanlines" width="1" height="4" patternUnits="userSpaceOnUse">
          <rect width="1" height="1" y="0" fill="rgba(255,255,255,0.012)"/>
        </pattern>

        <pattern id="grid-bg" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1a1a" strokeWidth="0.5"/>
        </pattern>

        {/* Máscara de fade nas bordas */}
        <linearGradient id="fade-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#111111" stopOpacity="1"/>
          <stop offset="12%"  stopColor="#111111" stopOpacity="0"/>
          <stop offset="88%"  stopColor="#111111" stopOpacity="0"/>
          <stop offset="100%" stopColor="#111111" stopOpacity="1"/>
        </linearGradient>
      </defs>

      {/* Grid de fundo */}
      <rect width="1200" height="480" fill="url(#grid-bg)"/>
      {/* Scanlines sobre tudo */}
      <rect width="1200" height="480" fill="url(#scanlines)"/>

      {/* ── Linhas de construção tipográfica ──────────────────────── */}
      {/* Linha de base */}
      <line x1="60" y1="340" x2="1140" y2="340" stroke="#C8FF00" strokeWidth="0.75" opacity="0.4"/>
      {/* Cap height */}
      <line x1="60" y1="120" x2="1140" y2="120" stroke="#1E1E1E" strokeWidth="0.75"/>
      {/* Mean line */}
      <line x1="60" y1="230" x2="1140" y2="230" stroke="#1E1E1E" strokeWidth="0.5" strokeDasharray="6 4"/>
      {/* Descender */}
      <line x1="60" y1="380" x2="1140" y2="380" stroke="#1E1E1E" strokeWidth="0.5" strokeDasharray="3 6"/>

      {/* Labels das linhas tipográficas */}
      <text x="68" y="116"  fill="#555555" fontSize="9" fontFamily="monospace" letterSpacing="1">CAP HEIGHT — 340px</text>
      <text x="68" y="226"  fill="#555555" fontSize="9" fontFamily="monospace" letterSpacing="1">MEAN LINE</text>
      <text x="68" y="336"  fill="#C8FF00" fontSize="9" fontFamily="monospace" letterSpacing="1" opacity="0.7">BASELINE</text>
      <text x="68" y="376"  fill="#333333" fontSize="9" fontFamily="monospace" letterSpacing="1">DESCENDER</text>

      {/* ── FORMA — texto principal ────────────────────────────────── */}
      <text
        x="600"
        y="338"
        fill="none"
        stroke="#F0EDE8"
        strokeWidth="0.8"
        opacity="0.12"
        fontSize="320"
        fontFamily="Arial Black, sans-serif"
        fontWeight="900"
        letterSpacing="-8"
        textAnchor="middle"
        dominantBaseline="auto"
      >
        FORMA
      </text>

      {/* Versão sólida levemente visível */}
      <text
        x="600"
        y="338"
        fill="#F0EDE8"
        opacity="0.04"
        fontSize="320"
        fontFamily="Arial Black, sans-serif"
        fontWeight="900"
        letterSpacing="-8"
        textAnchor="middle"
        dominantBaseline="auto"
      >
        FORMA
      </text>

      {/* ── Ponto final — acento da marca ─────────────────────────── */}
      {/* Círculo de construção do ponto */}
      <circle cx="1020" cy="338" r="32" fill="none" stroke="#C8FF00" strokeWidth="1" opacity="0.3"/>
      <circle cx="1020" cy="338" r="22" fill="none" stroke="#C8FF00" strokeWidth="0.5" opacity="0.2"/>
      <circle cx="1020" cy="338" r="14" fill="#C8FF00" opacity="0.9"/>
      <circle cx="1020" cy="338" r="5"  fill="#0A0A0A"/>

      {/* Crosshair no ponto */}
      <line x1="1020" y1="296" x2="1020" y2="316" stroke="#C8FF00" strokeWidth="0.75" opacity="0.5"/>
      <line x1="1020" y1="360" x2="1020" y2="380" stroke="#C8FF00" strokeWidth="0.75" opacity="0.5"/>
      <line x1="978"  y1="338" x2="998"  y2="338" stroke="#C8FF00" strokeWidth="0.75" opacity="0.5"/>
      <line x1="1042" y1="338" x2="1062" y2="338" stroke="#C8FF00" strokeWidth="0.75" opacity="0.5"/>

      {/* ── Régua lateral esquerda ─────────────────────────────────── */}
      <line x1="52" y1="100" x2="52" y2="400" stroke="#1E1E1E" strokeWidth="1"/>
      {[100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400].map((y, i) => (
        <g key={i}>
          <line
            x1={i % 4 === 0 ? 40 : i % 2 === 0 ? 44 : 46}
            y1={y} x2="52" y2={y}
            stroke="#333333" strokeWidth="0.75"
          />
          {i % 4 === 0 && (
            <text x="28" y={y + 4} fill="#333333" fontSize="8"
              fontFamily="monospace" textAnchor="end">{y}</text>
          )}
        </g>
      ))}

      {/* ── Régua superior ────────────────────────────────────────── */}
      <line x1="60" y1="52" x2="1140" y2="52" stroke="#1E1E1E" strokeWidth="1"/>
      {Array.from({ length: 19 }, (_, i) => i).map(i => {
        const x = 60 + i * 60
        return (
          <g key={i}>
            <line x1={x} y1="52" x2={x} y2={i % 2 === 0 ? 64 : 58} stroke="#333333" strokeWidth="0.75"/>
            {i % 2 === 0 && (
              <text x={x} y="46" fill="#333333" fontSize="8"
                fontFamily="monospace" textAnchor="middle">{i * 60}</text>
            )}
          </g>
        )
      })}

      {/* ── Anotações técnicas ─────────────────────────────────────── */}
      {/* Cota da altura */}
      <line x1="1100" y1="120" x2="1100" y2="340" stroke="#555555" strokeWidth="0.75" strokeDasharray="3 3"/>
      <line x1="1094" y1="120" x2="1106" y2="120" stroke="#555555" strokeWidth="0.75"/>
      <line x1="1094" y1="340" x2="1106" y2="340" stroke="#555555" strokeWidth="0.75"/>
      <text x="1112" y="236" fill="#555555" fontSize="8" fontFamily="monospace"
        transform="rotate(90 1112 236)">220px</text>

      {/* Cota da largura — letra F */}
      <line x1="180" y1="400" x2="360" y2="400" stroke="#555555" strokeWidth="0.75" strokeDasharray="3 3"/>
      <line x1="180" y1="394" x2="180" y2="406" stroke="#555555" strokeWidth="0.75"/>
      <line x1="360" y1="394" x2="360" y2="406" stroke="#555555" strokeWidth="0.75"/>
      <text x="270" y="418" fill="#555555" fontSize="8" fontFamily="monospace" textAnchor="middle">180px</text>

      {/* ── Pontos de ancoragem nos cantos das letras ──────────────── */}
      {[
        [150, 120], [150, 340], [555, 120], [555, 340],
        [625, 120], [625, 340], [1005, 120],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x-4} y={y-4} width="8" height="8" fill="none"
            stroke="#C8FF00" strokeWidth="0.75" opacity="0.4"
            transform={`rotate(45 ${x} ${y})`}/>
          <circle cx={x} cy={y} r="1.5" fill="#C8FF00" opacity="0.6"/>
        </g>
      ))}

      {/* ── Coordenadas técnicas cantos ────────────────────────────── */}
      <text x="68"  y="468" fill="#333333" fontSize="8" fontFamily="monospace">x:0 y:0</text>
      <text x="540" y="468" fill="#555555" fontSize="8" fontFamily="monospace" textAnchor="middle">
        FORMA STUDIO — LOGOTYPE CONSTRUCTION — v3.2
      </text>
      <text x="1132" y="468" fill="#333333" fontSize="8" fontFamily="monospace" textAnchor="end">x:1200 y:480</text>

      {/* ── Ângulo de peso — detalhe refinado ─────────────────────── */}
      <path d="M 1060 400 L 1100 400 L 1100 360" fill="none" stroke="#1E1E1E" strokeWidth="0.75"/>
      <text x="1062" y="418" fill="#333333" fontSize="7" fontFamily="monospace">90°</text>

      {/* ── Fade horizontal nas bordas ─────────────────────────────── */}
      <rect width="1200" height="480" fill="url(#fade-h)"/>

      {/* Fade no topo e base */}
      <defs>
        <linearGradient id="fade-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#111111" stopOpacity="1"/>
          <stop offset="20%" stopColor="#111111" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="fade-bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="80%" stopColor="#111111" stopOpacity="0"/>
          <stop offset="100%" stopColor="#111111" stopOpacity="1"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="480" fill="url(#fade-top)"/>
      <rect width="1200" height="480" fill="url(#fade-bot)"/>
    </svg>
  )
}