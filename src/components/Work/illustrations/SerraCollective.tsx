export default function SerraCollective() {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <rect width="320" height="400" fill="#111111"/>

      {/* Grid de identidade — 3x4 */}
      {[0,1,2].map(col =>
        [0,1,2,3].map(row => {
          const x = 40  + col * 85
          const y = 30  + row * 90
          const filled = (col + row) % 3 === 0
          const accent  = col === 1 && row === 1
          return (
            <g key={`${col}-${row}`}>
              <rect x={x} y={y} width="70" height="70" rx="2"
                fill={accent ? '#C8FF00' : filled ? '#161616' : '#0d0d0d'}
                stroke={accent ? '#C8FF00' : '#1E1E1E'} strokeWidth="1"/>
              {accent && (
                <text x={x+12} y={y+44} fill="#0A0A0A" fontSize="28"
                  fontFamily="monospace" fontWeight="900">S</text>
              )}
              {filled && !accent && (
                <rect x={x+20} y={y+20} width="30" height="30" rx="15"
                  fill="none" stroke="#555555" strokeWidth="1"/>
              )}
              {!filled && !accent && (
                <>
                  <line x1={x+15} y1={y+35} x2={x+55} y2={y+35}
                    stroke="#1E1E1E" strokeWidth="1"/>
                  <line x1={x+35} y1={y+15} x2={x+35} y2={y+55}
                    stroke="#1E1E1E" strokeWidth="1"/>
                </>
              )}
            </g>
          )
        })
      )}

      {/* Rodapé de identidade */}
      <rect x="40" y="390" width="240" height="1" fill="#1E1E1E"/>
      <text x="40" y="385" fill="#555555" fontSize="7" fontFamily="monospace"
        letterSpacing="3">SERRA COLLECTIVE — BRAND SYSTEM</text>

      <text x="180" y="390" fill="#ffffff" opacity="0.02" fontSize="80"
        fontFamily="sans-serif" fontWeight="900">05</text>
    </svg>
  )
}