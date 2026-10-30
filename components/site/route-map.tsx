/**
 * Routes out of Lagos, drawn as curved arcs across a golden-hour sky. Cities
 * sit roughly where they are relative to Lagos (London and Paris north, Dubai
 * east, New York west, Johannesburg south) on a 600×380 canvas. A small plane
 * flies each arc on a loop; with reduced motion the planes rest mid-route.
 */

const ORIGIN = { x: 250, y: 250 };

const ROUTES = [
  { city: "London", code: "LHR", price: "$433", x: 205, y: 58, dur: 7 },
  { city: "Paris", code: "CDG", price: "$471", x: 300, y: 82, dur: 7.6 },
  { city: "Dubai", code: "DXB", price: "$389", x: 515, y: 148, dur: 8.2 },
  { city: "New York", code: "JFK", price: "$698", x: 52, y: 118, dur: 9 },
  { city: "Accra", code: "ACC", price: "$119", x: 160, y: 270, dur: 5 },
  { city: "Johannesburg", code: "JNB", price: "$455", x: 420, y: 350, dur: 8.6 },
];

/** A quadratic arc that bows away from the straight line, like a great circle. */
function arc(x: number, y: number) {
  const mx = (ORIGIN.x + x) / 2;
  const my = (ORIGIN.y + y) / 2;
  const dx = x - ORIGIN.x;
  const dy = y - ORIGIN.y;
  const len = Math.hypot(dx, dy);
  const bow = Math.min(90, len * 0.32);
  // Bend to the left of travel so arcs fan out instead of crossing.
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow - (y < ORIGIN.y ? bow * 0.4 : 0);
  return `M${ORIGIN.x} ${ORIGIN.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x} ${y}`;
}

const PLANE = "M8 0 2.5 1.6 1 5H-.5l.6-3.4L-3 2.5-4 4h-1l.5-4-.5-4h1l1 1.5 3.1.9L-.5-5H1l1.5 3.4L8 0Z";

export function RouteMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 380" className={className} role="img" aria-label="Flights from Lagos to London, Paris, Dubai, New York, Accra and Johannesburg">
      <defs>
        <radialGradient id="origin-glow">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Faint latitude lines, so the sky reads as a map. */}
      <g stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1" fill="none">
        {[70, 140, 210, 280, 350].map((y) => (
          <path key={y} d={`M0 ${y} Q300 ${y - 26} 600 ${y}`} />
        ))}
      </g>

      {ROUTES.map((r, i) => {
        const d = arc(r.x, r.y);
        return (
          <g key={r.code}>
            <path d={d} fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1.6" strokeDasharray="1 6" strokeLinecap="round" />
            <g className="route-plane">
              <path d={PLANE} fill="#ffffff" transform="scale(1.5)" />
              <animateMotion dur={`${r.dur}s`} begin={`${i * -1.3}s`} repeatCount="indefinite" rotate="auto" path={d} />
            </g>
            <circle cx={r.x} cy={r.y} r="4.5" fill="#ffffff" />
          </g>
        );
      })}

      <circle cx={ORIGIN.x} cy={ORIGIN.y} r="34" fill="url(#origin-glow)" />
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r="7" fill="#ffffff" />
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r="3.5" fill="var(--color-brand)" />
    </svg>
  );
}

/** City labels positioned over the map in HTML, so the text stays crisp. */
export function RouteLabels() {
  return (
    <>
      {ROUTES.map((r) => (
        <span
          key={r.code}
          className="absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-tiny font-medium text-ink shadow-[0_4px_14px_-6px_rgba(16,24,40,0.4)] backdrop-blur"
          style={{ left: `${(r.x / 600) * 100}%`, top: `${(r.y / 380) * 100}%` }}
        >
          {r.city} <span className="text-label">{r.price}</span>
        </span>
      ))}
      <span
        className="absolute -translate-x-1/2 translate-y-4 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-tiny font-semibold text-white"
        style={{ left: `${(ORIGIN.x / 600) * 100}%`, top: `${(ORIGIN.y / 380) * 100}%` }}
      >
        Lagos
      </span>
    </>
  );
}
