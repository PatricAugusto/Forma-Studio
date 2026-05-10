export default function PulseHealth() {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <rect width="320" height="400" fill="#111111"/>

      {/* Frame de celular */}
      <rect x="80" y="20" width="160" height="300" rx="16" fill="#141414" stroke="#1E1E1E" strokeWidth="1.5"/>
      <rect x="86" y="26" width="148" height="288" rx="12" fill="#0d0d0d"/>

      {/* Notch */}
      <rect x="126" y="26" width="68" height="14" rx="7" fill="#141414"/>

      {/* Status bar */}
      <text x="98" y="52" fill="#555555" fontSize="7" fontFamily="monospace">09:41</text>
      <rect x="200" y="46" width="24" height="10" rx="2" stroke="#555555" strokeWidth="1" fill="none"/>
      <rect x="201" y="47" width="18" height="8" rx="1" fill="#C8FF00" opacity="0.7"/>

      {/* Cabeçalho do app */}
      <text x="98" y="78" fill="#555555" fontSize="7" fontFamily="monospace" letterSpacing="2">PULSE HEALTH</text>
      <text x="98" y="98" fill="#F0EDE8" fontSize="13" fontFamily="monospace" fontWeight="bold">Boa tarde, Ana</text>

      {/* Card de métricas principais */}
      <rect x="94" y="108" width="132" height="72" rx="8" fill="#161616" stroke="#1E1E1E" strokeWidth="1"/>
      <text x="106" y="126" fill="#555555" fontSize="6" fontFamily="monospace" letterSpacing="1">FREQ. CARDÍACA</text>
      <text x="106" y="152" fill="#C8FF00" fontSize="28" fontFamily="monospace" fontWeight="bold">72</text>
      <text x="148" y="152" fill="#555555" fontSize="9" fontFamily="monospace">bpm</text>

      {/* Mini sparkline dentro do card */}
      <path d="M 106 168 L 116 162 L 126 165 L 136 155 L 146 160 L 156 153 L 166 157 L 176 152 L 186 156 L 196 150 L 206 154 L 216 149"
        stroke="#C8FF00" strokeWidth="1" fill="none" opacity="0.6"/>

      {/* Cards menores */}
      <rect x="94"  y="190" width="62" height="56" rx="6" fill="#161616" stroke="#1E1E1E" strokeWidth="1"/>
      <text x="106" y="208" fill="#555555" fontSize="6" fontFamily="monospace">PASSOS</text>
      <text x="106" y="230" fill="#F0EDE8" fontSize="14" fontFamily="monospace" fontWeight="bold">8.2k</text>

      <rect x="164" y="190" width="62" height="56" rx="6" fill="#161616" stroke="#1E1E1E" strokeWidth="1"/>
      <text x="176" y="208" fill="#555555" fontSize="6" fontFamily="monospace">SONO</text>
      <text x="176" y="230" fill="#F0EDE8" fontSize="14" fontFamily="monospace" fontWeight="bold">7h12</text>

      {/* Barra de progresso */}
      <rect x="94" y="256" width="132" height="4" rx="2" fill="#1E1E1E"/>
      <rect x="94" y="256" width="98"  height="4" rx="2" fill="#C8FF00" opacity="0.7"/>
      <text x="94"  y="273" fill="#555555" fontSize="6" fontFamily="monospace">Meta diária</text>
      <text x="186" y="273" fill="#C8FF00" fontSize="6" fontFamily="monospace">74%</text>

      {/* Nav bar */}
      <rect x="86" y="290" width="148" height="24" rx="0" fill="#141414"/>
      {[102, 134, 166, 198, 222].map((x, i) => (
        <circle key={i} cx={x} cy="302" r={i === 2 ? 5 : 3}
          fill={i === 2 ? '#C8FF00' : '#555555'} opacity={i === 2 ? 1 : 0.5}/>
      ))}

      {/* Decoração externa */}
      <circle cx="60"  cy="200" r="30" stroke="#1E1E1E" strokeWidth="1" fill="none"/>
      <circle cx="260" cy="200" r="30" stroke="#1E1E1E" strokeWidth="1" fill="none"/>
      <text x="30" y="375" fill="#ffffff" opacity="0.02" fontSize="80"
        fontFamily="sans-serif" fontWeight="900">03</text>
    </svg>
  )
}