"use client";

import Link from "next/link";
import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

const primaryBase =
  "relative flex h-12 w-full items-center justify-center rounded-xl bg-brand text-copy font-semibold text-white transition-colors duration-200 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pending?: boolean;
  children: ReactNode;
};

export function PrimaryButton({
  pending = false,
  children,
  className = "",
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <button {...props} disabled={disabled || pending} className={`${primaryBase} ${className}`}>
      <span
        className={`transition-opacity duration-200 ${pending ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </span>
      {pending ? (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      ) : null}
    </button>
  );
}

/** Same shape as PrimaryButton, for screens whose action is just navigation. */
export function PrimaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${primaryBase} ${className}`}>
      {children}
    </Link>
  );
}

export function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-white"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Loading"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const socialBase =
  "flex h-12 w-full items-center justify-center gap-3 rounded-xl text-copy font-medium active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/**
 * "Continue with Apple" and "Continue with Google", Apple first in black as
 * Apple's guidelines ask. The OAuth flows aren't wired yet, so tapping one
 * shows a short notice instead of failing silently.
 */
export function SocialButtons({ verb = "Continue" }: { verb?: "Continue" | "Sign up" }) {
  const [note, setNote] = useState("");
  const start = (provider: string) => setNote(`${provider} sign-in is coming soon. Use your email for now.`);
  return (
    <div className="flex flex-col gap-2.5">
      <button type="button" onClick={() => start("Apple")} className={`${socialBase} bg-black text-white`}>
        <AppleMark />
        {verb} with Apple
      </button>
      <button
        type="button"
        onClick={() => start("Google")}
        className={`${socialBase} border border-line bg-white text-ink`}
      >
        <GoogleMark />
        {verb} with Google
      </button>
      {note ? (
        <p role="status" className="animate-fade text-center text-small text-body">
          {note}
        </p>
      ) : null}
    </div>
  );
}

function AppleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.5-1-2.5-3.6ZM14.2 5.4c.6-.8 1.1-1.9 1-3-1 0-2.1.6-2.8 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.8-1.5Z" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="transition-colors duration-300"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.7l7.8 6.1C12.3 14 17.6 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.15-3.2-.44-4.7H24v9.1h12.7c-.55 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.4Z"
      />
      <path fill="#FBBC05" d="M10.4 28.4a14.6 14.6 0 0 1 0-8.6l-7.8-6.1a24 24 0 0 0 0 20.8l7.8-6.1Z" />
      <path
        fill="#34A853"
        d="M24 47.5c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6.4 0-11.7-4.5-13.6-10.3l-7.8 6.1C6.5 42.1 14.6 47.5 24 47.5Z"
      />
    </svg>
  );
}

export function OrDivider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <span className="text-small text-label">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
