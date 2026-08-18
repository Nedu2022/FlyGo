import Image from "next/image";
import Link from "next/link";
import { PlaceholderImage } from "@/components/ui/placeholder-image";
import { JOURNALS, LOVED_DESTINATIONS, WHY_CHOOSE_US } from "@/lib/site-data";

export function SectionHeading({
  children,
  glyph,
}: {
  children: string;
  /** Small grey aircraft-and-globe mark that sits beside some headings. */
  glyph?: "globe-plane" | "globe-planes";
}) {
  return (
    <h2 className="flex items-center gap-3 text-[20px] font-semibold text-ink sm:text-[22px]">
      {children}
      {glyph ? (
        <Image
          src={`/images/deco/${glyph}.svg`}
          alt=""
          width={40}
          height={40}
          className="animate-float h-9 w-auto"
        />
      ) : null}
    </h2>
  );
}

export function WhyChooseUs() {
  return (
    <section className="reveal mx-auto grid w-full max-w-[1200px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex justify-center">
        <Image
          src="/images/why-choose-us.svg"
          alt="Porto riverside, with photos of other destinations"
          width={451}
          height={639}
          sizes="(max-width: 1024px) 80vw, 420px"
          className="h-auto w-full max-w-[420px]"
        />
      </div>

      <div>
        <h2 className="text-[32px] font-bold text-ink sm:text-[36px]">Why Choose Us:</h2>
        <ul className="mt-6 space-y-4">
          {WHY_CHOOSE_US.map((item) => (
            <li key={item.title} className="flex gap-3 text-[15px] leading-relaxed text-body">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
              <span>
                <strong className="font-semibold text-ink">{item.title}</strong> {item.body}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href="/signup"
          className="mt-7 inline-flex h-[38px] items-center justify-center rounded-md bg-brand px-6 text-[14px] font-semibold text-white shadow-[0_2px_8px_rgba(233,136,58,0.3)] transition-all duration-200 hover:bg-brand-hover hover:shadow-[0_6px_16px_rgba(233,136,58,0.38)] active:translate-y-px"
        >
          Sign up
        </Link>
      </div>
    </section>
  );
}

export function Journals() {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8">
      <h2 className="flex items-center justify-center gap-3 text-center text-[26px] font-bold text-ink sm:text-[30px]">
        Adventurer&apos;s Chronicles: Our Travelers&apos; Journals
        <Image
          src="/images/deco/globe-planes.svg"
          alt=""
          width={40}
          height={40}
          className="animate-float h-9 w-auto"
        />
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {JOURNALS.map((post, index) => (
          <article
            key={index}
            className="group overflow-hidden rounded-xl bg-white p-3 shadow-[0_2px_14px_rgba(16,24,40,0.09)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(16,24,40,0.14)]"
          >
            <div className="relative h-[145px] w-full overflow-hidden rounded-lg">
              <Image
                src="/images/cards/porto-church.svg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-ink">{post.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-body">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-3">
              <PlaceholderImage label="" className="h-8 w-8 shrink-0 rounded-full" />
              <div>
                <p className="text-[13px] font-semibold text-ink">{post.author}</p>
                <p className="text-[12px] text-muted">{post.date}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LovedDestinations() {
  return (
    <section className="reveal mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8">
      <SectionHeading>Destinations we love</SectionHeading>
      <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {LOVED_DESTINATIONS.map((group, index) => (
          <div key={group.heading}>
            <h3
              className={`text-[14px] font-semibold ${
                index === 0 ? "text-brand" : "text-brand/60"
              }`}
            >
              {group.heading}
            </h3>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item}>
                  <Link
                    href="/hotels"
                    className="text-[13px] text-body transition-colors hover:text-brand"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StoreBadge({ store }: { store: "apple" | "google" }) {
  return (
    <a
      href="#"
      className="flex h-[42px] items-center gap-2 rounded-md bg-night px-3.5 text-white transition-transform duration-200 hover:-translate-y-0.5"
    >
      {store === "apple" ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.5-1-2.5-3.6ZM14.2 5.4c.6-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.8-1.5Z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.6 2.3 14 12 3.6 21.7A1.7 1.7 0 0 1 3 20.4V3.6c0-.5.2-1 .6-1.3Z" fill="#34A853" />
          <path d="m16.4 9.4 2.9 1.7c1 .5 1 1.3 0 1.8l-2.9 1.7L13.3 12l3.1-2.6Z" fill="#FBBC05" />
          <path d="M3.6 2.3 16.4 9.4 13.3 12 3.6 2.3Z" fill="#EA4335" />
          <path d="M3.6 21.7 13.3 12l3.1 2.6-12.8 7.1Z" fill="#4285F4" />
        </svg>
      )}
      <span className="leading-none">
        <span className="block text-[8px] uppercase tracking-wide text-white/75">
          {store === "apple" ? "Download on the" : "Get it on"}
        </span>
        <span className="block text-[13px] font-semibold">
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </span>
    </a>
  );
}

export function StillHaveQuestions() {
  return (
    <section className="reveal mx-auto w-full max-w-[700px] px-5 pb-20 pt-6 text-center sm:px-8">
      <div className="flex justify-center -space-x-3">
        {[0, 1, 2].map((i) => (
          <PlaceholderImage
            key={i}
            label=""
            className="h-11 w-11 rounded-full ring-2 ring-white"
          />
        ))}
      </div>
      <h2 className="mt-5 text-[17px] font-semibold text-ink">Still have questions?</h2>
      <p className="mt-2 text-[15px] text-body">
        Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-flex h-[40px] items-center justify-center rounded-md bg-brand px-5 text-[14px] font-semibold text-white shadow-[0_2px_8px_rgba(233,136,58,0.3)] transition-all duration-200 hover:bg-brand-hover hover:shadow-[0_6px_16px_rgba(233,136,58,0.38)] active:translate-y-px"
      >
        Get in touch
      </Link>
    </section>
  );
}
