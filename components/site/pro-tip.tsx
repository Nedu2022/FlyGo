import type { ReactNode } from "react";

/** A small illustrated hint tied to the task the traveller is doing. */
export function ProTip({ title, children, art }: { title: string; children: ReactNode; art: ReactNode }) {
  return (
    <aside className="grid grid-cols-[minmax(0,1fr)_80px] items-center gap-3 rounded-2xl bg-sky-tint px-4 py-3 sm:grid-cols-[minmax(0,1fr)_100px] sm:gap-5 sm:px-5 sm:py-4">
      <div className="min-w-0">
        <p className="text-tiny font-bold uppercase tracking-wide text-blue">Pro tip</p>
        <h3 className="mt-0.5 text-small font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-tiny leading-relaxed text-body sm:text-small">{children}</p>
      </div>
      <div className="flex h-[72px] items-center justify-center overflow-hidden rounded-xl bg-white/70 sm:h-[84px]">
        {art}
      </div>
    </aside>
  );
}
