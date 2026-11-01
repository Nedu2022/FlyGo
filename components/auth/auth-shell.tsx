import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";

type AuthShellProps = {
  /** Small block in the top corner: sign-in prompt or the "STEP 01/03" marker. */
  topRight?: ReactNode;
  /** Renders the "‹ Back" control level with the title. */
  backHref?: string;
  /** Illustration above the title on the confirmation screens. */
  icon?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  /** Pinned under the form — the padlock reassurance line. */
  seal?: ReactNode;
  /** Column width. The forms sit in a narrow measure; `wide` opens it up. */
  width?: "form" | "wide";
};

/** The photo panel beside every auth form on desktop. */
function PhotoPanel() {
  return (
    <aside className="relative hidden overflow-hidden rounded-[28px] bg-steel lg:block">
      <Image
        src="/images/photos/hero-sky.webp"
        alt=""
        fill
        priority
        sizes="45vw"
        className="object-cover object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,22,36,0)_45%,rgba(6,22,36,0.7)_100%)]"
      />
      <div className="absolute inset-x-0 bottom-0 p-10">
        <p className="max-w-[420px] text-h2 font-bold leading-tight tracking-tight text-white">
          Flights, stays and private jets, all in one place.
        </p>
        <p className="mt-3 text-copy text-white/80">Trusted by travellers across Africa and beyond.</p>
      </div>
    </aside>
  );
}

/**
 * Auth layout: a compact form column beside a photo panel on desktop, the
 * form alone on phones. Header holds the logo and an optional corner prompt.
 */
export function AuthShell({
  topRight,
  backHref,
  icon,
  title,
  subtitle,
  children,
  seal,
  width = "form",
}: AuthShellProps) {
  const wide = width === "wide";
  return (
    <div className={`grid min-h-dvh bg-white p-3 ${wide ? "" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"}`}>
      <div className="flex min-h-full flex-col px-2 sm:px-8 lg:px-12">
        <header className="flex shrink-0 items-center justify-between gap-4 pt-3">
          <Logo imgClass="h-[30px] sm:h-[36px]" />
          {topRight ? <div className="text-right">{topRight}</div> : null}
        </header>

        <main className="flex flex-1 flex-col justify-center py-10">
          <div className={`mx-auto w-full ${wide ? "max-w-[1280px]" : "max-w-[400px]"}`}>
            {backHref ? (
              <Link href={backHref} className="mb-6 inline-flex items-center gap-1.5 text-small font-medium text-body">
                <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
                Back
              </Link>
            ) : null}

            <div className={`animate-rise flex flex-col ${icon ? "items-center text-center" : ""}`}>
              {icon ? <div className="animate-badge-in mb-6">{icon}</div> : null}
              <h1 className="text-h1 font-bold tracking-tight text-ink">{title}</h1>
              {subtitle ? <p className="mt-2 text-copy leading-relaxed text-body">{subtitle}</p> : null}
            </div>

            <div className="mt-7">{children}</div>

            {seal ? (
              <p className="mt-6 flex items-center justify-center gap-2 text-small text-label">
                <Padlock />
                {seal}
              </p>
            ) : null}
          </div>
        </main>
      </div>

      {wide ? null : <PhotoPanel />}
    </div>
  );
}

/** "STEP 01/03 / Personal Info." marker for the top-right corner. */
export function StepMarker({
  step,
  total = 3,
  label,
}: {
  step: number;
  total?: number;
  label: string;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <p
      className="text-tiny leading-tight text-label"
      aria-label={`Step ${step} of ${total}: ${label}`}
    >
      STEP {pad(step)}/{pad(total)}
      <br />
      <span className="text-small font-medium text-ink">{label}</span>
    </p>
  );
}

function Padlock() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  );
}

