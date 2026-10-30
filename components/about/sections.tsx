import Image from "next/image";
import { BadgeCheck, HeartHandshake, Leaf, Zap } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ABOUT_MISSION, ABOUT_VISION, CORE_VALUES } from "@/lib/site-data";
import { PAGE } from "@/components/site/container";
import { CinematicHero } from "@/components/site/hero";

/** About shares the site's page column so every section lines up with the header. */
const WIDE = PAGE;

/** Cinematic hero: a traveller on the move, the promise in white over it. */
export function AboutHero() {
  return (
    <CinematicHero
      image="/images/photos/hero-traveller.webp"
      imagePosition="center 40%"
      title={
        <>
          Travel made simple<span className="text-brand">.</span>
        </>
      }
      subtitle="Flights and stays, compared in one search."
    >
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-copy font-semibold text-white transition-colors duration-200 active:translate-y-px"
        >
          Start exploring
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-lg bg-white/15 px-6 text-copy font-medium text-white ring-1 ring-white/40 backdrop-blur transition-colors duration-200"
        >
          Talk to us
        </Link>
      </div>
    </CinematicHero>
  );
}

/** Mission and Vision share a layout; only the side the artwork sits on flips. */
export function StatementBlock({
  title,
  body,
  art,
  flip = false,
}: {
  title: string;
  body: string;
  art: ReactNode;
  flip?: boolean;
}) {
  const copy = (
    <div className={flip ? "lg:text-right" : ""}>
      <h2 className="text-h1 font-bold tracking-tight text-ink">
        {title}
      </h2>
      {/* Measure is capped so the paragraph stays readable at full width. */}
      <p
        className={`mt-6 max-w-[620px] text-copy leading-[1.75] text-body ${ flip ? "lg:ml-auto" : "" }`}
      >
        {body}
      </p>
    </div>
  );

  return (
    <section
      className={`reveal ${WIDE} grid items-center gap-8 pt-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:pt-24`}
    >
      {flip ? (
        <>
          <div className="order-2 lg:order-1">{art}</div>
          <div className="order-1 lg:order-2">{copy}</div>
        </>
      ) : (
        <>
          {copy}
          {art}
        </>
      )}
    </section>
  );
}

export function AboutMission() {
  return (
    <StatementBlock
      title="Our mission"
      body={ABOUT_MISSION}
      art={
        <div className="rounded-[28px] bg-sky-tint p-8 sm:p-12">
          <Image
            src="/images/illustrations/travellers.svg"
            alt="Two travellers with a map and a suitcase"
            width={923}
            height={659}
            className="mx-auto h-auto w-full max-w-[440px]"
          />
        </div>
      }
    />
  );
}

export function AboutVision() {
  return (
    <StatementBlock
      title="Where we’re going"
      body={ABOUT_VISION}
      flip
      art={
        /* The portrait photo leads; the stay overlaps its lower corner. */
        <div className="relative pb-[12%]">
          <div className="relative ml-auto aspect-[4/5] w-[70%] overflow-hidden rounded-[28px]">
            <Image
              src="/images/photos/traveller-window.webp"
              alt="A traveller with luggage watching planes at the airport"
              fill
              sizes="(max-width: 1024px) 64vw, 420px"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 aspect-[4/3] w-[48%] overflow-hidden rounded-[24px] ring-8 ring-white shadow-[0_24px_48px_-20px_rgba(16,24,40,0.5)]">
            <Image
              src="/images/photos/stay-overwater.webp"
              alt="An overwater villa with a lit pool at dusk"
              fill
              sizes="(max-width: 1024px) 44vw, 300px"
              className="object-cover"
            />
          </div>
        </div>
      }
    />
  );
}

export function CoreValues() {
  return (
    <section
      className={`reveal ${WIDE} grid gap-8 pt-16 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-16 lg:pt-24`}
    >
      <div>
        <h2 className="text-h1 font-bold tracking-tight text-ink">What we stand for</h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {CORE_VALUES.map((value) => (
          <article
            key={value.title}
            className="rounded-3xl bg-shell p-6 sm:p-7"
          >
            <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink">
              <ValueIcon name={value.icon} size={24} />
            </span>
            <h3 className="text-lead font-semibold text-ink">{value.title}</h3>
            <p className="mt-3 text-small leading-relaxed text-body">{value.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const VALUE_ICONS = {
  customer: HeartHandshake,
  innovation: Zap,
  transparency: BadgeCheck,
  sustainability: Leaf,
};

function ValueIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = VALUE_ICONS[name as keyof typeof VALUE_ICONS] ?? HeartHandshake;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}
