export default function NordeStudio() {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <rect width="320" height="400" fill="#111111"/>

      {/* Linhas de construção tipográfica */}
      <line x1="0" y1="80"  x2="320" y2="80"  stroke="#1E1E1E" strokeWidth="0.5"/>
      <line x1="0" y1="200" x2="320" y2="200" stroke="#1E1E1E" strokeWidth="0.5"/>
      <line x1="0" y1="320" x2="320" y2="320" stroke="#1E1E1E" strokeWidth="0.5"/>
      <line x1="40"  y1="0" x2="40"  y2="400" stroke="#1E1E1E" strokeWidth="0.5"/>
      <line x1="280" y1="0" x2="280" y2="400" stroke="#1E1E1E" strokeWidth="0.5"/>

      {/* Letra N grande — estrutura */}
      <path d="M 50 100 L 50 300 L 80 300 L 80 160 L 200 300 L 230 300 L 230 100 L 200 100 L 200 240 L 80 100 Z"
        fill="#F0EDE8" opacity="0.06"/>
      <path d="M 50 100 L 50 300 L 80 300 L 80 160 L 200 300 L 230 300 L 230 100 L 200 100 L 200 240 L 80 100 Z"
        stroke="#F0EDE8" strokeWidth="1" fill="none" opacity="0.3"/>

      {/* Acento em destaque */}
      <rect x="50" y="100" width="30" height="4" fill="#C8FF00"/>
      <rect x="200" y="296" width="30" height="4" fill="#C8FF00"/>

      {/* Pontos de ancoragem tipográficos */}
      <circle cx="50"  cy="100" r="4" fill="#C8FF00" opacity="0.8"/>
      <circle cx="50"  cy="300" r="4" fill="#C8FF00" opacity="0.8"/>
      <circle cx="230" cy="100" r="4" fill="#C8FF00" opacity="0.8"/>
      <circle cx="230" cy="300" r="4" fill="#C8FF00" opacity="0.8"/>

      {/* Labels de medição */}
      <text x="10" y="104" fill="#555555" fontSize="6" fontFamily="monospace">100</text>
      <text x="10" y="204" fill="#555555" fontSize="6" fontFamily="monospace">200</text>
      <text x="10" y="304" fill="#555555" fontSize="6" fontFamily="monospace">300</text>

      {/* Tag de fonte */}
      <rect x="50" y="344" width="150" height="22" rx="1" fill="#1E1E1E"/>
      <text x="60" y="359" fill="#C8FF00" fontSize="7" fontFamily="monospace" letterSpacing="2">NORDE SANS — 900</text>

      {/* Número de fundo */}
      <text x="200" y="390" fill="#ffffff" opacity="0.02" fontSize="80"
        fontFamily="sans-serif" fontWeight="900">02</text>
    </svg>
  )
}