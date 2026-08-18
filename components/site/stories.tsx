"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { STORIES } from "@/lib/flight-data";
import { PAGE } from "@/components/site/container";

const PER_PAGE = 2;
const PAGES = Math.ceil(STORIES.length / PER_PAGE);

/** "Seasonal Travel Guides" rail — two wide posts per page. */
export function Stories() {
  const [page, setPage] = useState(0);

  return (
    <section className={`reveal ${PAGE} py-16`}>
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
        Stories
      </p>
      <h2 className="mt-2 text-center text-[28px] font-bold tracking-tight text-ink sm:text-[34px]">
        Seasonal Travel Guides
      </h2>
      <p className="mx-auto mt-4 max-w-[900px] text-center text-[15px] leading-relaxed text-body">
        Travel is better when shared. Join our community by engaging with this post—your
        insights could make someone&apos;s next trip extraordinary!
      </p>

      <div className="mt-10 overflow-hidden">
        <ul
          className="flex gap-8 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {STORIES.map((story) => (
            <li key={story.id} className="w-full shrink-0 lg:w-[calc(50%-1rem)]">
              <article className="group">
                <div className="relative h-[230px] w-full overflow-hidden rounded-t-xl bg-[#bcd3dd] sm:h-[300px]">
                  <Image
                    src="/images/cards/story.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 94vw, 560px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <button
                    type="button"
                    aria-label="Save this guide"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/35 text-white backdrop-blur transition-colors duration-200 hover:bg-white hover:text-brand"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M12 20s-7-4.5-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5c0 5-7 9.5-7 9.5Z" />
                    </svg>
                  </button>
                </div>

                <div className="rounded-b-xl px-1 pt-6">
                  <h3 className="text-[21px] font-bold leading-snug text-ink">{story.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">{story.excerpt}</p>
                  <Link
                    href="/about"
                    className="mt-5 inline-flex items-center gap-2 text-[15px] text-sky transition-colors duration-200 hover:text-sky-hover"
                  >
                    View post
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                      <path d="M4 12h15M14 7l5 5-5 5" />
                    </svg>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: PAGES }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show guides page ${i + 1}`}
            aria-current={i === page}
            onClick={() => setPage(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === page ? "w-5 bg-brand" : "w-2 bg-line hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
