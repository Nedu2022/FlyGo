"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

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
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-1"
      >
        {children}
      </ul>

      {pages > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to ${label} page ${i + 1}`}
              aria-current={i === page}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                i === page ? "w-5 bg-brand" : "w-2 bg-line hover:bg-muted"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
