"use client";

import {
  BedDouble,
  ChevronRight,
  CircleUserRound,
  Headset,
  House,
  Info,
  Mail,
  Menu,
  Plane,
  Sparkles,
  X,
} from "lucide-react";
import { openAssistant } from "@/components/site/ai-assistant";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { FOOTER_CONTACT, NAV_LINKS } from "@/lib/site-data";

const MENU_ICONS: Record<string, typeof House> = {
  "/": House,
  "/flights": Plane,
  "/hotels": BedDouble,
  "/private-jets": Plane,
  "/about": Info,
  "/contact": Mail,
};

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
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenAt(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

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
          ? `sticky top-0 z-50 bg-white transition-shadow duration-300 ${
              scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""
            }`
          : `absolute inset-x-0 top-0 z-50 transition-colors duration-300 ${
              scrolled
                ? "fixed bg-white shadow-[0_2px_16px_rgba(30,41,59,0.06)]"
                : ""
            }`
      }
    >
      {/* Logo left, pages in the middle, Ask AI and account on the right. */}
      <div className="mx-auto flex h-[64px] w-full max-w-[1600px] items-center gap-3 px-4 sm:h-[76px] sm:px-8">
        <Logo imgClass="h-[34px] sm:h-[40px]" />

        <nav aria-label="Main" className="mx-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href) || (item.href === "/flights" && pathname.startsWith("/booking"));
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3.5 py-2 text-copy ${active ? "font-medium text-ink" : "text-body"}`}
              >
                {item.label}
                {active ? (
                  <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-0.5 h-[3px] rounded-full bg-brand" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={() => openAssistant()}
            className="rounded-full bg-[linear-gradient(90deg,#f58634,#f9c49a,#56ace9)] p-[1.5px]"
          >
            <span className="flex h-10 items-center gap-2 rounded-full bg-white px-3 text-small font-medium text-ink sm:px-4">
              <Sparkles size={18} strokeWidth={2} aria-hidden="true" className="text-brand" />
              Ask AI
            </span>
          </button>
          <Link
            href="/signin"
            aria-label="Sign in or create an account"
            className="hidden h-10 items-center gap-2 rounded-full bg-ink px-4 text-small font-medium text-white sm:flex"
          >
            <CircleUserRound size={18} strokeWidth={2} aria-hidden="true" />
            Sign in
          </Link>
          <button
            type="button"
            onClick={() => setOpenAt(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-1 flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          >
            <Menu size={24} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Menu: a panel sliding in from the right over a dimmed page, below lg. */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setOpenAt(null)}
          className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 right-0 flex w-[86%] max-w-[380px] flex-col bg-white shadow-[-24px_0_48px_-24px_rgba(16,24,40,0.35)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-[66px] items-center justify-between px-5">
            <Logo imgClass="h-[34px]" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpenAt(null)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-shell text-ink"
            >
              <X size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 pt-2">
            <ul className="space-y-1">
              {NAV_LINKS.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const Icon = MENU_ICONS[item.href] ?? House;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-4 rounded-2xl px-3 py-3.5 text-lead font-semibold ${
                        active ? "bg-brand-soft text-ink" : "text-ink"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          active ? "bg-brand text-white" : "bg-shell text-ink"
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight size={18} strokeWidth={2} aria-hidden="true" className="text-muted" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <a href={`tel:${FOOTER_CONTACT.phone}`} className="mt-6 flex items-center gap-3 rounded-2xl bg-shell px-4 py-4">
              <Headset size={24} strokeWidth={1.9} aria-hidden="true" className="shrink-0 text-brand" />
              <span>
                <span className="block text-small font-medium text-ink">Need help? We&apos;re here 24/7</span>
                <span className="block text-small text-body">{FOOTER_CONTACT.phone}</span>
              </span>
            </a>
          </nav>

          <div className="grid grid-cols-2 gap-3 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Link href="/signin" className="flex h-12 items-center justify-center rounded-xl bg-shell text-copy font-medium text-ink">
              Sign in
            </Link>
            <Link href="/signup" className="flex h-12 items-center justify-center rounded-xl bg-sky text-copy font-semibold text-white">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

