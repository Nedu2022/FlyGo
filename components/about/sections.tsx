import Image from "next/image";
import Link from "next/link";
import { ABOUT_MISSION, ABOUT_VISION, CORE_VALUES } from "@/lib/site-data";

/**
 * About runs wider than the marketing header: the design gives its content
 * roughly 1330 of a 1400px canvas, so the columns get room to breathe.
 */
const WIDE = "mx-auto w-full max-w-[1360px] px-5 sm:px-8";

/** Blue hero card: promise on the left, a peek at the product on the right. */
export function AboutHero() {
  return (
    <section className={`${WIDE} pt-8 sm:pt-10`}>
      <div className="animate-rise overflow-hidden rounded-2xl bg-steel">
        <div className="grid items-center gap-10 px-7 py-14 sm:px-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14 lg:py-16">
          <div>
            <h1 className="max-w-[620px] text-display font-bold leading-[1.22] text-white">
              Your Ultimate Gateway to Effortless, Enjoyable, and Memorable Travel
              Experiences Across the Globe
            </h1>
            <p className="mt-5 max-w-[440px] text-copy leading-relaxed text-white/75">
              Connecting you with the best flights and stays for unforgettable journeys.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex h-[46px] items-center justify-center rounded-md bg-brand px-7 text-copy font-medium text-white shadow-[0_2px_10px_rgba(245,134,52,0.4)] transition-colors duration-200 hover:bg-brand-hover active:translate-y-px"
            >
              Learn more
            </Link>
          </div>

          <AppPreview />
        </div>
      </div>
    </section>
  );
}

/**
 * The live Flygo booking screen, captured from the running app and framed as a
 * laptop. Regenerate with:
 *   chrome --headless --window-size=1440,880 \
 *     --screenshot=public/images/about/app-preview.png http://localhost:3000/
 */
function AppPreview() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl bg-white p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] sm:p-2.5">
        <Image
          src="/images/about/app-preview.png"
          alt="The Flygo flight search running in a browser"
          width={1440}
          height={812}
          sizes="(max-width: 1024px) 92vw, 660px"
          className="h-auto w-full rounded-lg"
        />
      </div>

      {/* Portrait video card clipping the lower-left corner and hanging below,
          so it frames the screenshot instead of covering it. */}
      <div className="absolute -bottom-10 -left-6 hidden w-[96px] overflow-hidden rounded-lg bg-[linear-gradient(150deg,#5c6a7d,#2c3644)] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] lg:block">
        <div className="flex h-[128px] items-center justify-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--color-steel)" aria-hidden="true">
              <path d="M8 5v14l11-7L8 5Z" />
            </svg>
          </span>
        </div>
        <span className="block h-1 w-full bg-white/25">
          <span className="block h-full w-1/3 bg-brand" />
        </span>
      </div>
    </div>
  );
}

/** Mission and Vision share a layout; only the side the photos sit on flips. */
export function StatementBlock({
  eyebrow,
  title,
  body,
  flip = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  flip?: boolean;
}) {
  /**
   * Passport sits against the outer edge of its column; the villa hangs off
   * the inner corner and drops below, so the pair reads as one arrangement.
   */
  /**
   * Passport hugs the outer edge of its column; the villa sits against the
   * inner edge and drops below it, overlapping only the corner. The wrapper's
   * percentage padding reserves exactly the height the villa hangs by, so the
   * pair keeps its geometry at every width.
   */
  const art = (
    <div className="relative pb-[9%]">
      <Image
        src="/images/about/passport.svg"
        alt="A traveller holding a passport at the airport"
        width={555}
        height={379}
        sizes="(max-width: 1024px) 92vw, 620px"
        className={`h-auto w-[72%] rounded-2xl ${flip ? "mr-auto" : "ml-auto"}`}
      />
      <Image
        src="/images/about/villa.svg"
        alt="A poolside villa at dusk"
        width={262}
        height={261}
        sizes="(max-width: 1024px) 34vw, 250px"
        className={`absolute bottom-0 h-auto w-[33%] rounded-2xl shadow-[0_18px_44px_-18px_rgba(16,24,40,0.45)] ${
          flip ? "right-0" : "left-0"
        }`}
      />
    </div>
  );

  const copy = (
    <div className={flip ? "lg:text-right" : ""}>
      <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-h1 font-bold tracking-tight text-ink">
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
      className={`reveal ${WIDE} grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 lg:py-10`}
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
      eyebrow="Our Mission"
      title="Mission Statement"
      body={ABOUT_MISSION}
    />
  );
}

export function AboutVision() {
  return (
    <StatementBlock eyebrow="Our Vision" title="Vision Statement" body={ABOUT_VISION} flip />
  );
}

/** Full-bleed offers banner with the photo bleeding off the right edge. */
export function OffersBanner() {
  return (
    <section className="reveal relative isolate overflow-hidden bg-steel">
      <Image
        src="/images/banners/travellers.svg"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="-z-10 object-cover object-[70%_center]"
      />
      {/* Steel wash holds the headline, then clears so the photo reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--color-steel)_0%,var(--color-steel)_38%,rgba(47,109,148,0.55)_58%,transparent_80%)]"
      />
      <div className={`${WIDE} py-20`}>
        <h2 className="max-w-[520px] text-display font-bold leading-[1.22] text-white">
          Limited-Time Offers for Your Next Adventure
        </h2>
        <p className="mt-4 max-w-[420px] text-copy leading-relaxed text-white/80">
          Don&apos;t miss out on these incredible travel deals—book today and start
          planning your next journey.
        </p>
        <Link
          href="/flights"
          className="mt-7 inline-flex h-[46px] items-center justify-center rounded-md bg-brand px-7 text-copy font-medium text-white shadow-[0_2px_10px_rgba(245,134,52,0.4)] transition-colors duration-200 hover:bg-brand-hover active:translate-y-px"
        >
          Find Deals
        </Link>
      </div>
    </section>
  );
}

export function CoreValues() {
  return (
    <section
      className={`reveal ${WIDE} grid gap-12 py-16 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16 lg:py-20`}
    >
      <div>
        <p className="text-small font-semibold uppercase tracking-[0.18em] text-brand">
          Our Values
        </p>
        <h2 className="mt-2 text-h1 font-bold leading-[1.25] tracking-tight text-ink">
          Our Core Values:
          <br />
          The Pillars of Our Journey
        </h2>
        <p className="mt-5 max-w-[420px] text-copy leading-relaxed text-body">
          Guided by principles that inspire trust, innovation, and a commitment to
          creating exceptional travel experiences.
        </p>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        {CORE_VALUES.map((value) => (
          <article
            key={value.title}
            className="rounded-lg bg-sky-tint p-7"
          >
            <span className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-sky text-white">
              <ValueIcon name={value.icon} size={24} />
            </span>
            <h3 className="text-copy font-bold text-ink">{value.title}</h3>
            <p className="mt-3 text-small leading-relaxed text-body">{value.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ValueIcon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    customer: (
      <>
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
        <rect x="2.5" y="13" width="4" height="6" rx="2" />
        <rect x="17.5" y="13" width="4" height="6" rx="2" />
      </>
    ),
    innovation: (
      <>
        <rect x="4" y="3.5" width="16" height="14" rx="2" />
        <path d="M8 21h8M12 17.5V21" />
        <path d="m9.5 11 2 2 3.5-4" />
      </>
    ),
    transparency: <path d="M13 2 4.5 13.5H11L10 22l9-11.5h-6.5L13 2Z" />,
    sustainability: (
      <>
        <path d="M4.5 12a7.5 7.5 0 0 1 7.5-7.5h7.5V12a7.5 7.5 0 0 1-15 0Z" />
        <path d="M8 19c1.5-5 4.5-8 8-9.5" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.customer}
    </svg>
  );
}
