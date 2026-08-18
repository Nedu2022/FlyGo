"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { NAV_LINKS } from "@/lib/site-data";

/**
 * "overlay" floats transparent above a hero image and turns solid on scroll.
 * "solid" is the plain white bar used on the search and booking pages.
 */
export function SiteHeader({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const pathname = usePathname();
  // The drawer is remembered against the route it was opened on, so navigating
  // closes it without an effect that would trigger a cascading render.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        variant === "solid"
          ? "sticky top-0 z-50 bg-white"
          : `absolute inset-x-0 top-0 z-50 transition-colors duration-300 ${
              scrolled
                ? "fixed bg-white/95 shadow-[0_2px_16px_rgba(30,41,59,0.06)] backdrop-blur"
                : ""
            }`
      }
    >
      <div className="mx-auto flex h-[66px] w-full max-w-[1360px] items-center justify-between gap-4 px-5 sm:h-[84px] sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((item) => {
            // "Flight" stays lit through the search and booking flow.
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href) ||
                  (item.href === "/flights" && pathname.startsWith("/booking"));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-2 text-copy font-medium transition-colors duration-200 ${ active ? "text-sky" : "text-body hover:text-sky" }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/signin"
            className="flex h-[42px] w-[104px] items-center justify-center rounded-lg border border-sky text-copy font-medium text-sky transition-all duration-200 hover:bg-sky hover:text-white active:translate-y-px"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="flex h-[42px] w-[104px] items-center justify-center rounded-lg bg-sky text-copy font-medium text-white shadow-[0_2px_8px_rgba(86,172,233,0.35)] transition-colors duration-200 hover:bg-sky-hover active:translate-y-px"
          >
            Sign up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpenAt(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors duration-200 hover:bg-shell lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 7h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`origin-center transition-transform duration-300 ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <path
              d="M4 12h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <path
              d="M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={`origin-center transition-transform duration-300 ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`absolute inset-x-0 top-full grid overflow-hidden bg-white shadow-[0_10px_24px_rgba(30,41,59,0.12)] transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-0.5 px-5 py-3 sm:px-8">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-3.5 text-copy text-ink transition-colors duration-200 hover:bg-sky-tint hover:text-sky"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 pt-4">
              <Link
                href="/signin"
                className="flex h-[44px] items-center justify-center rounded-lg border border-sky text-copy font-medium text-sky"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="flex h-[44px] items-center justify-center rounded-lg bg-sky text-copy font-medium text-white"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

