import Image from "next/image";
import type { ReactNode } from "react";
import { SearchBar, type SearchTab } from "@/components/site/search-bar";
import { HeroSlides, type Slide } from "@/components/site/hero-slides";

const FLIGHT_SLIDES: Slide[] = [
  { src: "/images/photos/hero-sky.webp", place: "Above the clouds", position: "70% center" },
  { src: "/images/photos/stay-santorini.webp", place: "Santorini, Greece" },
  { src: "/images/photos/dubai-night.webp", place: "Dubai, UAE" },
  { src: "/images/photos/new-york-wide.webp", place: "New York, USA" },
];

const STAY_SLIDES: Slide[] = [
  { src: "/images/photos/hero-pool.webp", place: "Maldives" },
  { src: "/images/photos/stay-overwater.webp", place: "Overwater villa" },
  { src: "/images/photos/stay-infinity.webp", place: "Infinity pool" },
];

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
    <section className="px-2 sm:px-4">
      <div
        className={`relative isolate mx-auto flex max-w-[1600px] flex-col justify-end overflow-hidden rounded-[28px] bg-steel ${
          "min-h-[440px] lg:min-h-[500px]"
        }`}
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
            quality={70}
            className="animate-settle -z-20 object-cover"
            style={{ objectPosition: imagePosition }}
          />
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,22,36,0.55)_0%,rgba(6,22,36,0.1)_38%,rgba(6,22,36,0.35)_62%,rgba(6,22,36,0.82)_100%)]"
        />

        <div className="stagger px-4 pb-4 pt-20 sm:px-8 sm:pb-8 lg:px-14 lg:pb-10">
          <h1 className="max-w-[820px] text-[clamp(2rem,1.2rem+3vw,3.75rem)] font-bold leading-[1.04] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.25)]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-[560px] text-lead leading-relaxed text-white/85">{subtitle}</p>
          ) : null}
          {children ? <div className="mt-6 sm:mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

/** The white search card that sits in the search pages' heroes. */
export function SearchHeroCard({ tab }: { tab: SearchTab }) {
  return (
    <div className="rounded-2xl bg-white p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-5">
      <SearchBar defaultTab={tab} />
    </div>
  );
}

export function Hero({ variant = "flight" }: { variant?: "flight" | "stay" }) {
  const flight = variant === "flight";
  return (
    <CinematicHero
      slides={flight ? FLIGHT_SLIDES : STAY_SLIDES}
      title={
        flight ? (
          <>
            Fly anywhere for less<span className="text-brand">.</span>
          </>
        ) : (
          <>
            Stays you&apos;ll love<span className="text-brand">.</span>
          </>
        )
      }
    >
      <SearchHeroCard tab={flight ? "Flight" : "Hotel"} />
    </CinematicHero>
  );
}
