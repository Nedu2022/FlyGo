"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const primaryBase =
  "relative flex h-[56px] w-full items-center justify-center rounded-[10px] bg-sky text-[17px] font-medium text-white shadow-[0_2px_10px_rgba(86,172,233,0.35)] transition-all duration-200 hover:bg-sky-hover hover:shadow-[0_8px_22px_rgba(86,172,233,0.42)] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky disabled:cursor-not-allowed disabled:opacity-70";

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

export function GoogleButton({ label = "Register with Google" }: { label?: string }) {
  return (
    <button
      type="button"
      className="group flex h-[60px] w-full items-center justify-center gap-4 rounded-[10px] border border-line bg-white text-[17px] font-semibold text-ink shadow-[0_2px_10px_rgba(16,24,40,0.08)] transition-all duration-200 hover:border-muted hover:shadow-[0_6px_18px_rgba(16,24,40,0.1)] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
    >
      <GoogleMark />
      {label}
    </button>
  );
}

function GoogleMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:scale-110"
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

export function OrDivider() {
  return (
    <div className="flex items-center gap-5" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <span className="text-[15px] text-muted">Or</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
