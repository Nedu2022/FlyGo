"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/** Page numbers to show: always the ends and the current page's neighbours. */
function pages(current: number, total: number): (number | "…")[] {
  const keep = new Set([1, total, current - 1, current, current + 1]);
  const list: (number | "…")[] = [];
  for (let p = 1; p <= total; p++) {
    if (keep.has(p)) list.push(p);
    else if (list[list.length - 1] !== "…") list.push("…");
  }
  return list;
}

/** Previous / numbers / next, with "Showing 1–5 of 8" above on phones. */
export function Pagination({
  page,
  pageSize,
  total,
  onChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const count = Math.ceil(total / pageSize);
  if (count <= 1) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const arrow = "flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink disabled:opacity-35";

  return (
    <nav aria-label="Pages" className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-between">
      <p className="text-small text-label">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-1.5">
        <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)} className={arrow}>
          <ChevronLeft size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
        {pages(page, count).map((p, i) =>
          p === "…" ? (
            <span key={`gap${i}`} className="w-6 text-center text-small text-label">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={p === page ? "page" : undefined}
              onClick={() => onChange(p)}
              className={`h-10 min-w-10 rounded-full px-3 text-small font-semibold ${
                p === page ? "bg-ink text-white" : "bg-white text-ink"
              }`}
            >
              {p}
            </button>
          ),
        )}
        <button type="button" aria-label="Next page" disabled={page === count} onClick={() => onChange(page + 1)} className={arrow}>
          <ChevronRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}

/** Scrolls the list's top into view after a page change. */
export function scrollToList(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
