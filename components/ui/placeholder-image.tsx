/**
 * Dormant image slot. Swap each of these for a real <Image /> once the assets
 * land — the `label` is only there to say what belongs in the space.
 */
export function PlaceholderImage({
  label,
  className = "",
  tone = "light",
}: {
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const surface =
    tone === "dark"
      ? "bg-[linear-gradient(135deg,#2f4a63,#1e3242)] text-white/70"
      : "bg-[linear-gradient(135deg,#e8edf4,#d3dce8)] text-label";

  return (
    <div
      role="img"
      aria-label={`${label} (placeholder)`}
      className={`relative isolate flex select-none items-center justify-center overflow-hidden ${surface} ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.8s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />
      <span className="relative flex flex-col items-center gap-2 px-4 text-center">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="opacity-70"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="m21 16-5-5L5 20" />
        </svg>
        <span className="text-[12px] font-medium uppercase tracking-wide opacity-70">
          {label}
        </span>
      </span>
    </div>
  );
}
