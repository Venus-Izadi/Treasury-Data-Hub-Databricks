export function DatabankLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        className="w-[52px] h-[56px]"
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="shieldClip">
            <path d="M50 5 L90 20 L90 50 C90 75 70 90 50 95 C30 90 10 75 10 50 L10 20 Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#shieldClip)">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <line x1="-10" y1="30" x2="30" y2="-10" stroke="#c41e3a" strokeWidth="14" />
          <line x1="10" y1="50" x2="50" y2="10" stroke="#c41e3a" strokeWidth="14" />
          <line x1="30" y1="70" x2="70" y2="30" stroke="#c41e3a" strokeWidth="14" />
          <line x1="50" y1="90" x2="90" y2="50" stroke="#c41e3a" strokeWidth="14" />
          <line x1="70" y1="110" x2="110" y2="70" stroke="#c41e3a" strokeWidth="14" />
        </g>
        <path
          d="M50 5 L90 20 L90 50 C90 75 70 90 50 95 C30 90 10 75 10 50 L10 20 Z"
          fill="none"
          stroke="#c41e3a"
          strokeWidth="2"
        />
        <path d="M35 65 L65 35" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M50 32 L68 32 L68 50"
          stroke="#1a1a1a"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <text x="38" y="68" fontFamily="Arial Black, Arial" fontSize="28" fontWeight="bold" fill="#c41e3a">
          $
        </text>
      </svg>
      <div className="flex flex-col">
        <span className="text-[22px] font-black text-[#c41e3a] tracking-wider uppercase">Databank</span>
        <div className="h-0.5 bg-gradient-to-r from-[#c41e3a] to-[#1a1a1a] mt-0.5" />
      </div>
    </div>
  )
}
