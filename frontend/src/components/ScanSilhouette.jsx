/**
 * Signature visual: a tailoring-sketch silhouette overlaid with a moving
 * scan line and measurement ticks, evoking both a fashion croquis and an
 * AI vision pass. Used on the hero and the analyzing screen.
 */
export default function ScanSilhouette({ active = true, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        {/* measurement ticks */}
        {[60, 140, 220, 300].map((y) => (
          <g key={y}>
            <line x1="10" y1={y} x2="26" y2={y} stroke="#C9A667" strokeOpacity="0.5" strokeWidth="1" />
            <line x1="294" y1={y} x2="310" y2={y} stroke="#C9A667" strokeOpacity="0.5" strokeWidth="1" />
          </g>
        ))}

        {/* croquis silhouette */}
        <path
          d="M160 30c14 0 24 12 24 27 0 10-4 17-10 22 20 8 34 24 38 46l10 70c2 14-8 26-22 26h-8l6 120c1 10-7 18-17 18h-42c-10 0-18-8-17-18l6-120h-8c-14 0-24-12-22-26l10-70c4-22 18-38 38-46-6-5-10-12-10-22 0-15 10-27 24-27z"
          fill="none"
          stroke="#F3EFE7"
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />

        {/* dashed construction lines */}
        <line x1="160" y1="30" x2="160" y2="380" stroke="#D998A0" strokeOpacity="0.35" strokeDasharray="4 6" strokeWidth="1" />
        <line x1="90" y1="150" x2="230" y2="150" stroke="#D998A0" strokeOpacity="0.35" strokeDasharray="4 6" strokeWidth="1" />
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute inset-x-2 top-0 h-16 bg-gradient-to-b from-gold/0 via-gold/25 to-gold/0 animate-scan"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
