export default function VelaSystems() {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <rect width="320" height="400" fill="#111111"/>

      {/* Nós do sistema — diagrama de arquitetura */}
      {/* Nó central */}
      <rect x="120" y="175" width="80" height="50" rx="4"
        fill="#161616" stroke="#C8FF00" strokeWidth="1.5"/>
      <text x="135" y="197" fill="#C8FF00" fontSize="6" fontFamily="monospace" letterSpacing="1">CORE</text>
      <text x="130" y="213" fill="#F0EDE8" fontSize="8" fontFamily="monospace">API v2.4</text>

      {/* Nós satélites */}
      {[
        { x: 30,  y: 60,  label: 'AUTH',   sub: 'OAuth2'  },
        { x: 210, y: 60,  label: 'CDN',    sub: 'Edge'    },
        { x: 30,  y: 290, label: 'DB',     sub: 'Postgres'},
        { x: 210, y: 290, label: 'QUEUE',  sub: 'Redis'   },
        { x: 120, y: 30,  label: 'CLIENT', sub: 'React'   },
        { x: 120, y: 320, label: 'STORE',  sub: 'S3'      },
      ].map(({ x, y, label, sub }, i) => (
        <g key={i}>
          <rect x={x} y={y} width="80" height="44" rx="3"
            fill="#141414" stroke="#1E1E1E" strokeWidth="1"/>
          <text x={x+10} y={y+18} fill="#555555" fontSize="6"
            fontFamily="monospace" letterSpacing="1">{label}</text>
          <text x={x+10} y={y+33} fill="#F0EDE8" fontSize="8"
            fontFamily="monospace">{sub}</text>
          {/* Dot de status */}
          <circle cx={x+68} cy={y+10} r="4" fill="#C8FF00" opacity="0.8"/>
        </g>
      ))}

      {/* Linhas de conexão */}
      {[
        [70,104, 140,175], [250,104, 180,175],
        [70,290, 140,225], [250,290, 180,225],
        [160,74, 160,175], [160,320, 160,225],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#1E1E1E" strokeWidth="1" strokeDasharray="4 3"/>
      ))}

      {/* Pontos de conexão */}
      {[
        [140,175],[180,175],[140,225],[180,225],[160,175],[160,225]
      ].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#555555"/>
      ))}

      {/* Label de versão */}
      <text x="40" y="382" fill="#555555" fontSize="7"
        fontFamily="monospace" letterSpacing="1">VELA SYSTEMS — ARCH v2.4.1</text>

      <text x="180" y="395" fill="#ffffff" opacity="0.02" fontSize="80"
        fontFamily="sans-serif" fontWeight="900">06</text>
    </svg>
  )
}