"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type Slide = { src: string; place: string; position?: string };

const INTERVAL = 6000;

/**
 * Background photos for the hero that crossfade every few seconds, with the
 * current destination named in the corner. Only the first photo is loaded
 * eagerly; the rest load lazily, and nothing rotates for visitors who prefer
 * reduced motion.
 */
export function HeroSlides({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          quality={70}
          className={`-z-20 object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: slide.position ?? "center" }}
        />
      ))}

      {slides.length > 1 ? (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-tiny font-medium text-white backdrop-blur-md sm:right-6 sm:top-6">
          <span aria-live="polite">{slides[index].place}</span>
          <span className="flex gap-1" aria-hidden="true">
            {slides.map((slide, i) => (
              <span
                key={slide.src}
                className={`h-1.5 rounded-full bg-white transition-all duration-500 ${i === index ? "w-4" : "w-1.5 opacity-50"}`}
              />
            ))}
          </span>
        </div>
      ) : null}
    </>
  );
}
