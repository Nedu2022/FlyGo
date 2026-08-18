import type { ReactNode } from "react";
import Link from "next/link";
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

/**
 * Single-column auth page. The body is a centred flex column rather than a
 * top-padded block, so short screens sit on the optical centre and long ones
 * grow downward without the page scrolling at common laptop heights.
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
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <header className="flex shrink-0 items-start justify-between gap-4 px-5 pt-6 sm:px-10 lg:px-14">
        <Logo height={50} />
        {topRight ? <div className="pt-1 text-right">{topRight}</div> : null}
      </header>

      <main className="relative flex flex-1 flex-col justify-center px-5 py-6 sm:px-10 lg:px-14">
        {backHref ? (
          <Link
            href={backHref}
            className="group absolute left-5 top-0 inline-flex items-center gap-2 text-[16px] text-body transition-colors duration-200 hover:text-sky sm:left-10 lg:left-14"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-x-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </Link>
        ) : null}

        <div
          className={`mx-auto w-full ${width === "wide" ? "max-w-[1280px]" : "max-w-[620px]"}`}
        >
          <div className="animate-rise flex flex-col items-center text-center">
            {icon ? <div className="animate-badge-in mb-6">{icon}</div> : null}
            <h1 className="text-[27px] font-bold tracking-tight text-ink sm:text-[33px]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-3 max-w-[500px] text-[16px] leading-relaxed text-label sm:text-[18px]">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="mt-8">{children}</div>

          {seal ? (
            <p className="mt-7 flex items-center justify-center gap-2 text-[14px] text-muted">
              <Padlock />
              {seal}
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}

/** Two-up variant: artwork on the left, content on the right. */
export function AuthSplit({
  topRight,
  art,
  title,
  subtitle,
  children,
}: {
  topRight?: ReactNode;
  art: ReactNode;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <header className="flex shrink-0 items-start justify-between gap-4 px-5 pt-6 sm:px-10 lg:px-14">
        <Logo height={50} />
        {topRight ? <div className="pt-1 text-right">{topRight}</div> : null}
      </header>

      <main className="mx-auto flex w-full max-w-[1500px] flex-1 items-center gap-10 px-5 py-8 sm:px-10 lg:gap-16 lg:px-14">
        <div className="hidden flex-1 lg:block">{art}</div>

        <div className="mx-auto w-full max-w-[620px] lg:mx-0 lg:flex-1">
          <h1 className="animate-rise text-[30px] font-bold tracking-tight text-ink sm:text-[36px]">
            {title}
          </h1>
          {subtitle ? (
            <p className="animate-rise mt-4 max-w-[520px] text-[17px] leading-relaxed text-label">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-9">{children}</div>
        </div>
      </main>
    </div>
  );
}

/** "Already have an account? Sign In" — one line in the new signup flow. */
export function AccountPrompt({
  text,
  linkLabel,
  href,
}: {
  text: string;
  linkLabel: string;
  href: string;
}) {
  return (
    <p className="text-[16px] leading-tight text-label sm:text-[18px]">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-sky transition-colors duration-200 hover:text-sky-hover"
      >
        {linkLabel}
      </Link>
    </p>
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
      className="text-[14px] leading-tight text-muted"
      aria-label={`Step ${step} of ${total}: ${label}`}
    >
      STEP {pad(step)}/{pad(total)}
      <br />
      <span className="text-[16px] text-sky">{label}</span>
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

/** Kept for the standalone password screens that still show a bare padlock. */
export function SecuritySeal() {
  return (
    <span className="text-muted">
      <Padlock />
    </span>
  );
}
