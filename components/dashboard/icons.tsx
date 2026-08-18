import type { ReactNode } from "react";

/**
 * Line icons for the dashboard sidebar, stat tiles and quick links. All share
 * a 24px grid and paint with `currentColor` so callers set the tone.
 */
const PATHS: Record<string, ReactNode> = {
  dashboard: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" />
      <path d="M15 3.6A9 9 0 0 1 20.4 9H15V3.6Z" />
    </>
  ),
  properties: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </>
  ),
  availability: (
    <>
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M17 6.5h4M19 4.5v4" />
    </>
  ),
  bookings: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
      <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" />
    </>
  ),
  messages: (
    <>
      <path d="M4 5.5h11a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H9l-5 3.5V5.5Z" />
      <path d="M19 9h1a2 2 0 0 1 2 2v8.5L19 17h-4" />
    </>
  ),
  earnings: (
    <>
      <ellipse cx="12" cy="6.5" rx="7" ry="3" />
      <path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
      <path d="M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
    </>
  ),
  reviews: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="m9 15 1-3.2L15.4 6.4a1.4 1.4 0 0 1 2 2L12.2 14 9 15Z" />
    </>
  ),
  insights: (
    <>
      <path d="M3.5 17 9 11l4 3.5 7.5-8" />
      <path d="M16 6.5h4.5V11" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 14H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.6V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.5 1.5l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8" />
    </>
  ),
  support: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="2.5" y="13.5" width="4" height="6" rx="2" />
      <rect x="17.5" y="13.5" width="4" height="6" rx="2" />
      <path d="M20 19.5v.5a3 3 0 0 1-3 3h-2" />
    </>
  ),
  signout: (
    <>
      <path d="M14.5 4.5H6.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8" />
      <path d="M18.5 12h-8M15.5 8.5 19 12l-3.5 3.5" />
    </>
  ),
  chart: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 16v-3M12 16v-6M16 16v-4" />
    </>
  ),
  file: (
    <>
      <path d="M6 3.5h7l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
      <path d="M13 3.5v5h5M8.5 13h7M8.5 16.5h4" />
    </>
  ),
  pencil: (
    <>
      <path d="m5 19 .8-3.6L16.3 4.9a2 2 0 0 1 2.8 2.8L8.6 18.2 5 19Z" />
      <path d="m14.5 6.7 2.8 2.8" />
    </>
  ),
  person: (
    <>
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M18 8.5v5M20.5 11h-5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 10a6 6 0 1 1 12 0c0 3.5 1 5 1.8 5.8a.7.7 0 0 1-.5 1.2H4.7a.7.7 0 0 1-.5-1.2C5 15 6 13.5 6 10Z" />
      <path d="M10 20a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  export: (
    <>
      <path d="M12 15V4M8.5 7.5 12 4l3.5 3.5" />
      <path d="M4.5 15v3.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V15" />
    </>
  ),
  bag: (
    <>
      <path d="M4.5 8h15l-1.2 11.2a2 2 0 0 1-2 1.8H7.7a2 2 0 0 1-2-1.8L4.5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5 5.5 4.5h13L20 9.5" />
      <path d="M4 9.5h16V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19V9.5Z" />
      <path d="M9.5 20.5v-5h5v5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M2.8 19.5a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16 5.7a3.2 3.2 0 0 1 0 5.9M17.5 14.4a6.2 6.2 0 0 1 3.7 5.1" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
};

export function DashIcon({
  name,
  size = 22,
  className = "",
  strokeWidth = 1.6,
}: {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name] ?? PATHS.dashboard}
    </svg>
  );
}

/** Initial-badge stand-in for a guest or teammate photo. */
export function Avatar({
  name,
  size = 40,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  // Stable hue per name, so the same person keeps the same colour.
  const hue = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `hsl(${hue} 70% 92%)`,
        color: `hsl(${hue} 55% 34%)`,
      }}
    >
      {initials}
    </span>
  );
}
