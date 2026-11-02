/** Initials on a soft colour that stays the same for the same name. */
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
