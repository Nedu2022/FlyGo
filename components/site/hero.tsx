import Image from "next/image";
import Link from "next/link";
import { SearchCard } from "@/components/site/search-card";
import { PAGE } from "@/components/site/container";

/**
 * Card silhouette taken from the Figma export (BG.svg): rounded corners plus the
 * speech-bubble notch bitten out of the bottom-left. It is inlined and
 * stretched with `preserveAspectRatio="none"` so it fills the container exactly.
 * The path is inlined below, so no file is fetched at runtime. It is
 * at any width, and the card holds the artwork's own 1437:639 ratio. That makes
 * the notch land on exact fractions, which the strip below reuses:
 *
 *   band   (639 - 559.672) / 639 -> bottom 12.4% of the height
 *   width  696.91 / 1437         -> 48.5% flat, diagonal completing by 57.9%
 *
 * The white strip is the page showing through the notch. Below `lg` the notch
 * would crowd the stacked layout, so there the card is a plain rounded
 * rectangle, height is free, and the strip sits underneath it.
 */
const CARD_PATH =
  "M0 72C0 38.0589 0 21.0883 10.5442 10.5442C21.0883 0 38.0589 0 72 0H1365C1398.94 0 1415.91 0 1426.46 10.5442C1437 21.0883 1437 38.0589 1437 72V567C1437 600.941 1437 617.912 1426.46 628.456C1415.91 639 1398.94 639 1365 639H831.967C816.002 639 808.019 639 800.968 635.824C793.917 632.648 788.627 626.67 778.047 614.714L750.83 583.958C740.25 572.002 734.96 566.024 727.909 562.848C720.858 559.672 712.875 559.672 696.91 559.672H72C38.0589 559.672 21.0883 559.672 10.5442 549.128C0 538.584 0 521.613 0 487.672V72Z";

const BAND = "12.4%";

export function Hero() {
  return (
    <section className={PAGE}>
      <div
        className="relative lg:aspect-[1437/639]"
        style={{ ["--band" as string]: BAND }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-steel lg:hidden" />
        <svg
          aria-hidden="true"
          viewBox="0 0 1437 639"
          preserveAspectRatio="none"
          className="absolute inset-0 hidden h-full w-full lg:block"
        >
          <path d={CARD_PATH} fill="var(--color-steel)" />
        </svg>

        {/* Fills the card above the notch band. */}
        <div
          className="relative grid gap-8 px-3 pb-24 pt-7 sm:px-10 sm:pb-28 sm:pt-9 lg:absolute lg:inset-x-0 lg:top-0 lg:bottom-[var(--band)] lg:grid-cols-[minmax(0,1.18fr)_minmax(0,1fr)] lg:gap-12 lg:px-14 lg:pb-0 lg:pt-11"
        >
          <div className="flex min-w-0 flex-col lg:min-h-0">
            <Image
              src="/images/brand-mark.svg"
              alt=""
              width={69}
              height={69}
              className="hidden h-[42px] w-auto self-start lg:block"
            />

            <h1 className="mt-7 text-display font-bold leading-[1.28] tracking-tight text-white">
              Explore the World with Ease.{" "}
              {/* Two fixed lines from sm up; below that it wraps naturally,
                  otherwise the unbreakable line widens the whole card. */}
              <br className="hidden sm:inline" />
              Book Flights &amp; Hotels in Minutes.
            </h1>
            <p className="mt-4 text-copy leading-relaxed text-white/65">
              Discover hidden gems, iconic cities, and breathtaking views—your journey
              begins now.
            </p>

            <Link
              href="/flights"
              className="mt-6 inline-flex h-[46px] w-fit items-center justify-center rounded-md bg-brand px-9 text-copy text-white shadow-[0_2px_10px_rgba(245,134,52,0.4)] transition-colors duration-200 hover:bg-brand-hover active:translate-y-px"
            >
              Explore
            </Link>

            {/* Mobile: in flow under the button. */}
            <div className="relative mt-4 h-[190px] w-full sm:h-[230px] lg:hidden">
              <Image
                src="/images/hero/airplane.svg"
                alt=""
                fill
                priority
                sizes="80vw"
                className="animate-float object-contain object-left-bottom"
              />
            </div>
          </div>

          <div className="min-w-0 lg:pt-1">
            <SearchCard />
          </div>
        </div>

        {/* Desktop: measured off the card, not the text column, so it keeps the
            design's scale and can reach past the column into the middle. */}
        <Image
          src="/images/hero/airplane.svg"
          alt=""
          width={687}
          height={452}
          priority
          sizes="46vw"
          className="animate-float pointer-events-none absolute bottom-[15%] left-[3%] hidden h-auto w-[46%] lg:block"
        />

        {/* Strip: under the card on mobile, inside the notch on desktop. */}
        <div className="relative -mt-20 flex w-full items-center justify-between gap-4 bg-white px-4 py-4 sm:-mt-[72px] sm:gap-7 sm:px-6 sm:pr-14 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:h-[var(--band)] lg:w-[48%] lg:justify-start lg:rounded-none lg:bg-transparent lg:p-0 lg:pl-14">
          <h2 className="max-w-[410px] text-h2 font-bold leading-[1.12] tracking-tight text-ink">
            Let Us Plan Your Perfect Getaway.
          </h2>
          <Image
            src="/images/logo.svg"
            alt="FLYGO Bookings"
            width={126}
            height={56}
            className="hidden h-[28px] w-auto shrink-0 sm:h-[40px] lg:block"
          />
        </div>
      </div>
    </section>
  );
}
