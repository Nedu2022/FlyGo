"use client";

import { useEffect, useRef } from "react";

/**
 * Vanta's three.js dot field behind the home hero. Loads after paint, skips
 * itself for reduced motion, and leaves a still dot pattern underneath so
 * the hero never looks empty while WebGL starts (or if it can't).
 */
export function VantaDots({ className = "" }: { className?: string }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let effect: { destroy: () => void } | undefined;
    let cancelled = false;

    (async () => {
      // three r134 ships CommonJS, so the namespace arrives under `default`.
      const three = await import("three");
      const THREE = three.default ?? three;
      // The effect reads window.THREE when its module loads, so set it first.
      (window as unknown as { THREE: unknown }).THREE = THREE;
      const { default: DOTS } = await import("vanta/dist/vanta.dots.min");
      if (cancelled || !el.current) return;
      try {
        effect = DOTS({
          el: el.current,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          scale: 1,
          scaleMobile: 1,
          color: 0xf58634,
          color2: 0xf58634,
          backgroundColor: 0xffffff,
          size: 2.6,
          spacing: 26,
          showLines: false,
        });
      } catch {
        // No WebGL: the still pattern stays.
      }
    })();

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return (
    <div
      ref={el}
      aria-hidden="true"
      className={`bg-white bg-[radial-gradient(color-mix(in_srgb,var(--color-brand)_40%,transparent)_1.2px,transparent_1.6px)] bg-size-[26px_26px] ${className}`}
    />
  );
}
