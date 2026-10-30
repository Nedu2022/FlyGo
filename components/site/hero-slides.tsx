"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type Slide = { src: string; position?: string };

const INTERVAL = 6000;

/**
 * Background photos for the hero that crossfade every few seconds. Only the
 * first photo is loaded eagerly; the rest load lazily, and nothing rotates for
 * visitors who prefer reduced motion.
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
    </>
  );
}
