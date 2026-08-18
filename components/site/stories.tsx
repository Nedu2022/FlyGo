"use client";

import Image from "next/image";
import Link from "next/link";
import { STORIES } from "@/lib/flight-data";
import { PAGE } from "@/components/site/container";
import { Rail } from "@/components/site/rail";

/** "Seasonal Travel Guides" rail — two wide posts per page. */
export function Stories() {
  return (
    <section className={`reveal ${PAGE} py-16`}>
      <p className="text-center text-small font-semibold uppercase tracking-[0.18em] text-brand">
        Stories
      </p>
      <h2 className="mt-2 text-center text-h1 font-bold tracking-tight text-ink">
        Seasonal Travel Guides
      </h2>
      <p className="mx-auto mt-4 max-w-[900px] text-center text-copy leading-relaxed text-body">
        Travel is better when shared. Join our community by engaging with this post—your
        insights could make someone&apos;s next trip extraordinary!
      </p>

      <Rail label="travel guides" className="mt-10">
        {STORIES.map((story) => (
          <li
            key={story.id}
            className="w-[88%] shrink-0 snap-start sm:w-full lg:w-[calc((100%-1.5rem)/2)]"
          >
              <article className="group">
                <div className="relative h-[230px] w-full overflow-hidden rounded-t-xl bg-[#bcd3dd] sm:h-[300px]">
                  <Image
                    src="/images/cards/story.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 94vw, 560px"
                    className="object-cover"
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
                  <h3 className="text-h4 font-bold leading-snug text-ink">{story.title}</h3>
                  <p className="mt-3 text-copy leading-relaxed text-body">{story.excerpt}</p>
                  <Link
                    href="/about"
                    className="mt-5 inline-flex items-center gap-2 text-copy text-sky transition-colors duration-200 hover:text-sky-hover"
                  >
                    View post
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12h15M14 7l5 5-5 5" />
                    </svg>
                  </Link>
                </div>
            </article>
          </li>
        ))}
      </Rail>

    </section>
  );
}
