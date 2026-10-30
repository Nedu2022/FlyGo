import Image from "next/image";
import type { ReactNode } from "react";
import { SearchBar } from "@/components/site/search-bar";
import { HeroSlides, type Slide } from "@/components/site/hero-slides";
import { RouteLabels, RouteMap } from "@/components/site/route-map";

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
        className={`relative isolate mx-auto flex max-w-[1600px] flex-col justify-end overflow-hidden rounded-[28px] bg-steel ${"min-h-[440px] lg:min-h-[500px]"}`}
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
          className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,rgba(245,134,52,0.72)_0%,rgba(249,196,154,0.25)_45%,rgba(86,172,233,0.55)_100%),linear-gradient(180deg,rgba(6,22,36,0)_40%,rgba(6,22,36,0.55)_100%)]"
        />

        <div className="stagger px-4 pb-4 pt-20 sm:px-8 sm:pb-8 lg:px-14 lg:pb-10">
          <h1 className="max-w-[820px] text-display font-bold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.25)]">
            {title}
          </h1>
          {subtitle ? <p className="mt-4 max-w-[560px] text-lead leading-relaxed text-white/85">{subtitle}</p> : null}
          {children ? <div className="mt-6 sm:mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

/**
 * FLYGO's golden-hour hero: a sunset sky with the headline, routes flying
 * out of Lagos on desktop, and the search card resting on the horizon.
 * Hotels uses the same sky with its own line and no map.
 */
export function Hero({ variant = "flight" }: { variant?: "flight" | "stay" }) {
  const flight = variant === "flight";
  return (
    <section className="px-0 sm:px-4">
      <div className="sky-golden relative mx-auto max-w-[1600px] overflow-hidden sm:rounded-[32px]">
        <div className="relative grid gap-6 px-4 pb-6 pt-8 sm:px-10 sm:pb-10 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-4 lg:px-14 lg:pt-16">
          <div>
            <p className="text-tiny font-medium text-white/85 sm:text-small">
              {flight ? "Flights · Hotels · Apartments · Private jets" : "Hotels · Apartments · Resorts"}
            </p>
            <h1 className="mt-3 text-[clamp(1.875rem,1.35rem+2.6vw,3.75rem)] font-bold leading-[1] tracking-tight text-white">
              {flight ? (
                <>
                  The world,
                  <br />
                  <span className="font-serif text-[1.12em] font-normal italic">from Lagos.</span>
                </>
              ) : (
                <>
                  Stay somewhere
                  <br />
                  <span className="font-serif text-[1.12em] font-normal italic">golden.</span>
                </>
              )}
            </h1>
            <p className="mt-3 max-w-[420px] text-copy text-white/90 sm:text-lead">
              {flight
                ? "Every airline, every stay and private jets, compared in one search."
                : "Handpicked hotels and apartments with free cancellation on most rooms."}
            </p>
          </div>

          {flight ? (
            <div className="relative hidden lg:block">
              <RouteMap className="h-auto w-full" />
              <RouteLabels />
            </div>
          ) : null}
        </div>

        <div className="relative px-2 pb-2 sm:px-6 sm:pb-6 lg:px-10 lg:pb-10">
          <div className="rounded-[28px] bg-shell p-3 shadow-[0_30px_70px_-30px_rgba(16,24,40,0.55)] sm:p-5">
            <SearchBar defaultTab={flight ? "Flight" : "Hotel"} />
          </div>
        </div>
      </div>
    </section>
  );
}
