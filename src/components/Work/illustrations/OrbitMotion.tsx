export default function OrbitMotion() {
  return (
    <svg viewBox="0 0 480 270" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <rect width="480" height="270" fill="#111111"/>

      {/* Órbitas elípticas */}
      <ellipse cx="240" cy="135" rx="200" ry="80" stroke="#1E1E1E" strokeWidth="1" fill="none"/>
      <ellipse cx="240" cy="135" rx="140" ry="55" stroke="#1E1E1E" strokeWidth="1" fill="none"
        transform="rotate(30 240 135)"/>
      <ellipse cx="240" cy="135" rx="100" ry="40" stroke="#1E1E1E" strokeWidth="1" fill="none"
        transform="rotate(-20 240 135)"/>

      {/* Núcleo central */}
      <circle cx="240" cy="135" r="20" fill="#161616" stroke="#C8FF00" strokeWidth="1.5"/>
      <circle cx="240" cy="135" r="8"  fill="#C8FF00" opacity="0.9"/>
      <circle cx="240" cy="135" r="35" stroke="#C8FF00" strokeWidth="0.5" fill="none" opacity="0.2"/>

      {/* Planetas/partículas nas órbitas */}
      <circle cx="440" cy="135" r="8" fill="#F0EDE8" opacity="0.8"/>
      <circle cx="440" cy="135" r="14" stroke="#F0EDE8" strokeWidth="0.5" fill="none" opacity="0.2"/>

      <circle cx="172" cy="82"  r="6" fill="#C8FF00" opacity="0.7"/>
      <circle cx="172" cy="82"  r="11" stroke="#C8FF00" strokeWidth="0.5" fill="none" opacity="0.2"/>

      <circle cx="310" cy="168" r="5" fill="#555555"/>
      <circle cx="310" cy="168" r="9" stroke="#555555" strokeWidth="0.5" fill="none" opacity="0.3"/>

      <circle cx="138" cy="152" r="4" fill="#F0EDE8" opacity="0.4"/>
      <circle cx="340" cy="100" r="3" fill="#C8FF00" opacity="0.5"/>

      {/* Trilha de movimento em arco */}
      <path d="M 240 55 A 80 80 0 0 1 320 135"
        stroke="#C8FF00" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="4 4"/>

      {/* Linhas de velocidade */}
      <line x1="420" y1="128" x2="448" y2="125" stroke="#F0EDE8" strokeWidth="1" opacity="0.3"/>
      <line x1="418" y1="135" x2="450" y2="135" stroke="#F0EDE8" strokeWidth="0.5" opacity="0.2"/>
      <line x1="420" y1="142" x2="446" y2="145" stroke="#F0EDE8" strokeWidth="1" opacity="0.3"/>

      {/* Labels técnicos */}
      <text x="20"  y="20"  fill="#555555" fontSize="7" fontFamily="monospace" letterSpacing="1">ORBIT / 001</text>
      <text x="20"  y="258" fill="#555555" fontSize="7" fontFamily="monospace">v = 2πr/T</text>
      <text x="380" y="258" fill="#C8FF00" fontSize="7" fontFamily="monospace">T = 3.6s</text>

      <text x="300" y="265" fill="#ffffff" opacity="0.02" fontSize="80"
        fontFamily="sans-serif" fontWeight="900">04</text>
    </svg>
  )
}