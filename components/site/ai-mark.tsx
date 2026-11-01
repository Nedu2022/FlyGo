import { useId } from "react";

/**
 * FLYGO's AI mark: a solid four-point star in the brand sunset gradient
 * (orange to sky blue) with a small companion star. Replaces the generic
 * outline sparkle so "Ask AI" reads as part of the brand.
 */
export function AiMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f58634" />
          <stop offset="0.6" stopColor="#ef6a7a" />
          <stop offset="1" stopColor="#56ace9" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.5c.7 5 3.4 7.8 8.5 8.5-5.1.7-7.8 3.5-8.5 8.5-.7-5-3.4-7.8-8.5-8.5 5.1-.7 7.8-3.5 8.5-8.5Z"
        fill={`url(#${id})`}
      />
      <path
        d="M19 14.5c.3 2.2 1.5 3.4 3.5 3.7-2 .3-3.2 1.5-3.5 3.8-.3-2.3-1.5-3.5-3.5-3.8 2-.3 3.2-1.5 3.5-3.7Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}
