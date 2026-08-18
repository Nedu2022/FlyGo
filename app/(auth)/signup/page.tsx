import Image from "next/image";
import Link from "next/link";
import { AccountPrompt, AuthSplit } from "@/components/auth/auth-shell";

const ACCOUNT_TYPES = [
  {
    href: "/signup/details",
    title: "Individual",
    body: "Personal account to manage all you activities.",
    icon: "individual" as const,
  },
  {
    href: "/signup/details?type=business",
    title: "Business",
    body: "Own or belong to a company, this is for you.",
    icon: "business" as const,
  },
];

export const metadata = { title: "Join Flygo" };

export default function SignUpPage() {
  return (
    <AuthSplit
      topRight={
        <AccountPrompt text="Already have an account?" linkLabel="Sign In" href="/signin" />
      }
      art={
        // Feathered edges rather than a hard crop, so the photo dissolves into
        // the page the way the design does.
        <div
          className="relative aspect-[10/9] w-full"
          style={{
            maskImage:
              "radial-gradient(72% 72% at 50% 50%, #000 55%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(72% 72% at 50% 50%, #000 55%, transparent 100%)",
          }}
        >
          <Image
            src="/images/hero/hotels-villa.svg"
            alt=""
            fill
            priority
            sizes="46vw"
            className="object-cover"
          />
        </div>
      }
      title="Join Us!"
      subtitle="To begin this journey, tell us what type of account you'd be opening."
    >
      <ul className="stagger flex flex-col gap-5">
        {ACCOUNT_TYPES.map((type) => (
          <li key={type.title}>
            <Link
              href={type.href}
              className="group flex items-center gap-5 rounded-xl border border-line bg-white px-6 py-5 transition-all duration-200 hover:border-sky hover:bg-sky-tint hover:shadow-[0_10px_28px_-16px_rgba(86,172,233,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
            >
              <TypeIcon name={type.icon} />
              <span className="min-w-0 flex-1">
                <span className="block text-[19px] font-semibold text-ink">{type.title}</span>
                <span className="mt-1 block text-[15px] text-body">{type.body}</span>
              </span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-sky)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
              >
                <path d="M4 12h15M14 7l5 5-5 5" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </AuthSplit>
  );
}

/** Pentagon badge holding a person or storefront glyph. */
function TypeIcon({ name }: { name: "individual" | "business" }) {
  return (
    <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 52 52" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M23.5 2.6a5 5 0 0 1 5 0l17.4 10a5 5 0 0 1 2.5 4.4v19.9a5 5 0 0 1-2.5 4.3l-17.4 10a5 5 0 0 1-5 0l-17.4-10A5 5 0 0 1 3.6 37V17a5 5 0 0 1 2.5-4.3Z"
          fill="var(--color-sky)"
        />
      </svg>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="relative"
      >
        {name === "individual" ? (
          <>
            <circle cx="12" cy="9" r="3.2" />
            <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
          </>
        ) : (
          <>
            <path d="M4 9.5 5.5 5h13L20 9.5" />
            <path d="M4 9.5h16V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5Z" />
            <path d="M10 20v-4.5h4V20" />
          </>
        )}
      </svg>
    </span>
  );
}
