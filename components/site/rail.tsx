"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Width of one rail item: most of a phone, two up on tablets, four on desktop. */
export const RAIL_ITEM =
  "w-[62%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]";

/**
 * Horizontal card rail driven by native scrolling with snap points, rather
 * than a transform whose page width has to match the card width exactly. That
 * earlier approach clipped cards mid-card whenever the two disagreed; here the
 * browser snaps to real card edges, so any responsive card count works and
 * touch/trackpad swiping comes for free.
 */
export function Rail({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    // A "page" is one viewport of the track; the last one may be partial.
    const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    setPages(total);
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <ul
        ref={track}
        onScroll={measure}
        aria-label={label}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto scroll-smooth px-5 pb-1 sm:mx-0 sm:scroll-px-0 sm:gap-4 sm:px-0"
      >
        {children}
      </ul>

      {pages > 1 ? (
        <div className="mt-5 hidden justify-end gap-2 sm:flex">
          <ArrowButton label={`Previous ${label}`} disabled={page === 0} onClick={() => goTo(page - 1)} />
          <ArrowButton
            label={`Next ${label}`}
            disabled={page >= pages - 1}
            onClick={() => goTo(page + 1)}
            next
          />
        </div>
      ) : null}
    </div>
  );
}

function ArrowButton({
  label,
  disabled,
  onClick,
  next = false,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  next?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-[0_1px_3px_rgba(16,24,40,0.18)] transition-colors duration-200 disabled:opacity-40"
    >
      {next ? <ChevronRight size={18} strokeWidth={2.4} aria-hidden="true" /> : <ChevronLeft size={18} strokeWidth={2.4} aria-hidden="true" />}
    </button>
  );
}
