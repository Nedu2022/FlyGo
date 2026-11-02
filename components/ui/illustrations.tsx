/**
 * Flat spot illustrations in the brand palette, for empty states and the
 * host and verification screens. Decorative, so hidden from screen readers.
 */

const C = {
  brand: "#f58634",
  brandSoft: "#fff3e6",
  brandMid: "#fbc89f",
  sky: "#56ace9",
  skySoft: "#eaf5fd",
  ink: "#1e293b",
  line: "#e2e8f0",
  white: "#ffffff",
};

type Props = { className?: string };

function Frame({ className = "h-32 w-auto", children }: Props & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 150" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="100" cy="134" rx="72" ry="8" fill={C.line} opacity="0.7" />
      {children}
    </svg>
  );
}

/** A house with a key tag: listing a place. */
export function HostIllustration({ className }: Props) {
  return (
    <Frame className={className}>
      <circle cx="100" cy="70" r="58" fill={C.brandSoft} />
      <path d="M52 76 100 38l48 38v54H52V76Z" fill={C.white} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M44 80 100 34l56 46" stroke={C.brand} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="88" y="96" width="24" height="34" rx="3" fill={C.brand} />
      <circle cx="106" cy="114" r="2" fill={C.white} />
      <rect x="62" y="88" width="18" height="16" rx="2" fill={C.skySoft} stroke={C.ink} strokeWidth="2.5" />
      <rect x="120" y="88" width="18" height="16" rx="2" fill={C.skySoft} stroke={C.ink} strokeWidth="2.5" />
      <path d="M150 52c0-6 5-11 11-11s11 5 11 11-5 11-11 11" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      <circle cx="161" cy="52" r="4" fill={C.brand} />
      <path d="M161 63v26M161 76h7M161 84h5" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  );
}

/** An ID card with a check shield: verification. */
export function VerifyIllustration({ className }: Props) {
  return (
    <Frame className={className}>
      <circle cx="100" cy="70" r="58" fill={C.skySoft} />
      <rect x="38" y="42" width="104" height="70" rx="10" fill={C.white} stroke={C.ink} strokeWidth="3" />
      <rect x="38" y="42" width="104" height="16" rx="8" fill={C.sky} />
      <circle cx="64" cy="82" r="12" fill={C.brandMid} />
      <path d="M52 100c2-7 7-10 12-10s10 3 12 10" fill={C.brand} />
      <path d="M86 76h40M86 88h28M86 100h34" stroke={C.line} strokeWidth="5" strokeLinecap="round" />
      <path d="M146 70l20 8v16c0 12-9 20-20 24-11-4-20-12-20-24V78l20-8Z" fill={C.brand} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="m137 94 6 6 12-12" stroke={C.white} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

/** A suitcase under a dotted flight path: no trips yet. */
export function TripsIllustration({ className }: Props) {
  return (
    <Frame className={className}>
      <circle cx="100" cy="70" r="58" fill={C.brandSoft} />
      <path d="M30 60c30-40 110-50 140-14" stroke={C.brand} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
      <path d="m160 34 14 10-4 3-10-4-5 4 1 6-3 2-4-7-7-4 2-3 6 1 4-5-4-10 3-3 7 10Z" fill={C.ink} />
      <rect x="70" y="70" width="60" height="58" rx="9" fill={C.brand} stroke={C.ink} strokeWidth="3" />
      <path d="M88 70V60a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v10" stroke={C.ink} strokeWidth="3" />
      <path d="M86 70v58M114 70v58" stroke={C.brandSoft} strokeWidth="5" />
      <circle cx="80" cy="132" r="4" fill={C.ink} />
      <circle cx="120" cy="132" r="4" fill={C.ink} />
    </Frame>
  );
}

/** A map pin with a heart: nothing saved yet. */
export function SavedIllustration({ className }: Props) {
  return (
    <Frame className={className}>
      <circle cx="100" cy="70" r="58" fill={C.skySoft} />
      <path d="M44 104 76 92l48 14 32-12v-56l-32 12-48-14-32 12v56Z" fill={C.white} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M76 36v56M124 50v56" stroke={C.line} strokeWidth="3" />
      <path d="M100 24c-14 0-24 10-24 24 0 18 24 42 24 42s24-24 24-42c0-14-10-24-24-24Z" fill={C.brand} stroke={C.ink} strokeWidth="3" />
      <path d="M100 58s-10-6-10-12a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 6-10 12-10 12Z" fill={C.white} />
    </Frame>
  );
}

/** Three seats with one person each and a shared jet above: jet sharing. */
export function ShareIllustration({ className }: Props) {
  return (
    <Frame className={className}>
      <circle cx="100" cy="70" r="58" fill={C.brandSoft} />
      <path d="M40 58c0-6 6-10 14-10h70l14-18h8l-5 19c9 2 9 12 1 13L66 70c-14 2-26-4-26-12Z" fill={C.white} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M70 58h4M84 58h4M98 58h4" stroke={C.sky} strokeWidth="4" strokeLinecap="round" />
      {[62, 100, 138].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="96" r="9" fill={i === 1 ? C.brand : C.brandMid} />
          <path d={`M${x - 15} 128c2-12 8-18 15-18s13 6 15 18`} fill={i === 1 ? C.brand : C.brandMid} />
        </g>
      ))}
    </Frame>
  );
}
