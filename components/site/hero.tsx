import Image from "next/image";
import type { ReactNode } from "react";
import { SearchBar } from "@/components/site/search-bar";
import { HeroSlides, type Slide } from "@/components/site/hero-slides";

/**
 * Full-bleed photo hero: the image settles from a slight zoom behind a dark
 * wash, the headline sits in white over it, and whatever `children` the page
 * passes (the search card, a help search) floats in a white card below.
 */
export function CinematicHero({
  image,
  imageAlt = "",
  imagePosition = "center",
  slides,
  title,
  subtitle,
  children,
}: {
  image?: string;
  imageAlt?: string;
  /** Rotating backgrounds; takes the place of `image`. */
  slides?: Slide[];
  /** object-position, for keeping the subject in frame on narrow screens. */
  imagePosition?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-3 sm:px-4">
      <div
        className="relative isolate mx-auto flex min-h-[340px] max-w-[1600px] flex-col justify-end overflow-hidden rounded-[24px] bg-steel sm:min-h-[440px] sm:rounded-[28px] lg:min-h-[500px]"
      >
        {slides ? (
          <HeroSlides slides={slides} />
        ) : image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="animate-settle -z-20 object-cover"
            style={{ objectPosition: imagePosition }}
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,36,0.55)_0%,rgba(6,22,36,0.1)_38%,rgba(6,22,36,0.35)_62%,rgba(6,22,36,0.82)_100%)]"
        />

        <div className="stagger px-4 pb-4 pt-16 sm:px-8 sm:pb-8 sm:pt-20 lg:px-14 lg:pb-10">
          <h1 className="max-w-[820px] text-display font-bold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.25)]">
            {title}
          </h1>
          {subtitle ? <p className="mt-2 max-w-[560px] text-copy leading-relaxed text-white/85 sm:mt-4 sm:text-lead">{subtitle}</p> : null}
          {children ? <div className="mt-5 sm:mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

const COLLAGE: [string, string][][] = [
  [
    ["/images/photos/hero-sky.webp", "70% center"],
    ["/images/photos/traveller-window.webp", "center"],
    ["/images/photos/stay-santorini.webp", "center"],
  ],
  [
    ["/images/photos/dubai.webp", "center 70%"],
    ["/images/photos/jet-hero.webp", "35% center"],
    ["/images/photos/stay-overwater.webp", "center"],
  ],
];

const STAY_COLLAGE: [string, string][][] = [
  [
    ["/images/photos/hero-pool.webp", "center"],
    ["/images/photos/stay-suite.webp", "center"],
    ["/images/photos/lisbon-tram.webp", "center"],
  ],
  [
    ["/images/photos/stay-overwater.webp", "center"],
    ["/images/photos/stay-santorini.webp", "center"],
    ["/images/photos/stay-infinity.webp", "center"],
  ],
];

/**
 * Home and Hotels hero, after Kayak: a soft grey panel with one bold line,
 * the service tiles and the search on the left, and a two-column staggered
 * photo collage bleeding off the top and bottom on the right (desktop only).
 */
export function Hero({ variant = "flight" }: { variant?: "flight" | "stay" }) {
  const flight = variant === "flight";
  const columns = flight ? COLLAGE : STAY_COLLAGE;
  return (
    <section className="px-3 sm:px-4">
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[24px] bg-shell sm:rounded-[28px]">
        <div className="relative z-10 px-3 pb-4 pt-5 sm:px-10 sm:pb-12 sm:pt-12 lg:w-[70%] lg:px-14 lg:pb-16 lg:pt-16 xl:w-[76%] 2xl:w-[72%]">
          <h1 className="hidden text-display font-bold tracking-tight text-ink sm:block">
            {flight ? "Your next trip starts here" : "Stays you\u2019ll love"}
            <span className="text-brand">.</span>
          </h1>
          <div className="sm:mt-8">
            <SearchBar defaultTab={flight ? "Flight" : "Hotel"} />
          </div>
        </div>

        <div aria-hidden="true" className="absolute inset-y-0 right-5 hidden w-[26%] gap-4 lg:flex xl:w-[20%] 2xl:w-[24%]">
          {columns.map((column, c) => (
            <div key={c} className={`flex flex-1 flex-col gap-4 ${c === 0 ? "-mt-24" : "-mt-6"}`}>
              {column.map(([src, position]) => (
                <div key={src} className="relative aspect-[4/5] shrink-0 overflow-hidden rounded-[32px] bg-steel">
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 1280px) 15vw, 220px"
                    priority={c === 0}
                    className="object-cover"
                    style={{ objectPosition: position }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
