export default function AurumFinance() {
  return (
    <svg viewBox="0 0 480 270" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {/* Grid de fundo */}
      <defs>
        <pattern id="grid-a" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E1E1E" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="480" height="270" fill="#111111"/>
      <rect width="480" height="270" fill="url(#grid-a)"/>

      {/* Painel do dashboard */}
      <rect x="40" y="30" width="260" height="210" rx="2" fill="#161616" stroke="#1E1E1E" strokeWidth="1"/>

      {/* Header do painel */}
      <rect x="40" y="30" width="260" height="36" rx="2" fill="#141414" stroke="#1E1E1E" strokeWidth="1"/>
      <circle cx="60" cy="48" r="5" fill="#C8FF00" opacity="0.9"/>
      <rect x="72" y="44" width="60" height="8" rx="1" fill="#2a2a2a"/>
      <rect x="245" y="42" width="40" height="12" rx="1" fill="#C8FF00" opacity="0.15"/>
      <rect x="247" y="44" width="36" height="8" rx="0" fill="#C8FF00" opacity="0.6"/>

      {/* Gráfico de área */}
      <path d="M 55 180 L 55 140 L 95 120 L 135 130 L 175 95 L 215 105 L 255 75 L 285 85 L 285 180 Z"
        fill="#C8FF00" opacity="0.08"/>
      <path d="M 55 140 L 95 120 L 135 130 L 175 95 L 215 105 L 255 75 L 285 85"
        stroke="#C8FF00" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>

      {/* Linha secundária */}
      <path d="M 55 160 L 95 155 L 135 158 L 175 145 L 215 148 L 255 138 L 285 142"
        stroke="#555555" strokeWidth="1" fill="none" strokeDasharray="4 3" strokeLinejoin="round"/>

      {/* Pontos de dados */}
      {[[95,120],[175,95],[255,75]].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="#C8FF00"/>
          <circle cx={x} cy={y} r="6" fill="#C8FF00" opacity="0.15"/>
        </g>
      ))}

      {/* Labels do eixo X */}
      {['JAN','MAR','MAI','JUL','SET'].map((m, i) => (
        <text key={i} x={55 + i * 57} y="198" fill="#555555"
          fontSize="7" fontFamily="monospace" letterSpacing="1">{m}</text>
      ))}

      {/* Cards laterais de métricas */}
      <rect x="315" y="30" width="125" height="58" rx="2" fill="#161616" stroke="#1E1E1E" strokeWidth="1"/>
      <text x="328" y="52" fill="#555555" fontSize="7" fontFamily="monospace" letterSpacing="1">PORTFOLIO</text>
      <text x="328" y="72" fill="#F0EDE8" fontSize="18" fontFamily="monospace" fontWeight="bold">$2.4M</text>

      <rect x="315" y="98" width="125" height="58" rx="2" fill="#161616" stroke="#1E1E1E" strokeWidth="1"/>
      <text x="328" y="120" fill="#555555" fontSize="7" fontFamily="monospace" letterSpacing="1">RETORNO</text>
      <text x="328" y="140" fill="#C8FF00" fontSize="18" fontFamily="monospace" fontWeight="bold">+18.4%</text>

      <rect x="315" y="166" width="125" height="58" rx="2" fill="#161616" stroke="#1E1E1E" strokeWidth="1"/>
      <text x="328" y="188" fill="#555555" fontSize="7" fontFamily="monospace" letterSpacing="1">ATIVOS</text>
      <text x="328" y="208" fill="#F0EDE8" fontSize="18" fontFamily="monospace" fontWeight="bold">847</text>

      {/* Número de fundo decorativo */}
      <text x="340" y="255" fill="#ffffff" opacity="0.02" fontSize="80"
        fontFamily="sans-serif" fontWeight="900">01</text>
    </svg>
  )
}