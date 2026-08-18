"use client";

import { useState } from "react";
import { Avatar } from "@/components/dashboard/icons";
import { TESTIMONIALS } from "@/lib/site-data";

const PER_PAGE = 4;
const PAGES = Math.ceil(TESTIMONIALS.length / PER_PAGE);

export function Testimonials() {
  const [page, setPage] = useState(0);
  const shown = TESTIMONIALS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="reveal mx-auto w-full max-w-[1360px] px-5 py-16 sm:px-8">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
        Testimonials
      </p>
      <h2 className="mt-2 text-center text-[28px] font-bold text-ink sm:text-[32px]">
        What Our Users Say
      </h2>
      <p className="mx-auto mt-4 max-w-[720px] text-center text-[15px] leading-relaxed text-body">
        Real experiences from travelers and hosts who trust us to make their journeys
        unforgettable.
      </p>

      <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((person) => (
          <article
            key={person.name}
            className="animate-fade flex flex-col rounded-lg bg-sky-tint px-7 py-9 text-center transition-transform duration-300 hover:-translate-y-1"
          >
            <p className="flex-1 text-[14px] leading-relaxed text-body">
              &ldquo;{person.quote}&rdquo;
            </p>
            <Stars rating={person.rating} className="mt-6 justify-center" />
            <Avatar name={person.name} size={44} className="mx-auto mt-5" />
            <h3 className="mt-3 text-[15px] font-bold text-ink">{person.name}</h3>
            <p className="mt-1 text-[13px] text-sky">{person.role}</p>
          </article>
        ))}
      </div>

      {PAGES > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: PAGES }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonials page ${i + 1}`}
              aria-current={i === page}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === page ? "w-5 bg-brand" : "w-2 bg-line hover:bg-muted"
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

/** Five stars, filled up to `rating` and hollow beyond it. */
function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div
      className={`flex gap-1 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={i < rating ? "var(--color-star)" : "none"}
          stroke="var(--color-star)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 2 3 6.6 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.3l1.4-7L2 9.5l7-.9L12 2Z" />
        </svg>
      ))}
    </div>
  );
}
