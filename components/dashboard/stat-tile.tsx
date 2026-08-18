import { DashIcon } from "@/components/dashboard/icons";

const TONES = {
  rose: "bg-tile-rose text-[#e0518a]",
  amber: "bg-tile-amber text-[#e0812a]",
  mint: "bg-tile-mint text-[#10a06b]",
  lilac: "bg-tile-lilac text-[#7c4dff]",
} as const;

/** Outlined card with a tinted glyph — the header stats on Earnings/Insights. */
export function StatTile({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: string;
  tone: keyof typeof TONES;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${TONES[tone]}`}>
        <DashIcon name={icon} size={24} strokeWidth={1.7} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] text-label">{label}</span>
        <span className="mt-0.5 block truncate text-[20px] font-bold text-ink">{value}</span>
      </span>
    </div>
  );
}
