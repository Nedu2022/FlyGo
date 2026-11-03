"use client";

import {
  CircleUserRound,
  Heart,
  Menu,
  X,
} from "lucide-react";
import { openAssistant } from "@/components/site/ai-assistant";
import { AiMark } from "@/components/site/ai-mark";
import { SearchSummaryBar, type CompactSearchMode } from "@/components/flights/search-summary-bar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { NAV_LINKS } from "@/lib/site-data";
import { useAuth } from "@/components/auth/auth-context";

export function SiteHeader({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stayType, setStayType] = useState<"hotel" | "apartment">("hotel");
  const [jetType, setJetType] = useState<"private" | "shared">("private");
  const searchMode: CompactSearchMode | null = pathname.startsWith("/hotels")
    ? "stay"
    : pathname.startsWith("/private-jets")
      ? "jet"
      : pathname === "/" || pathname.startsWith("/flights") || pathname.startsWith("/booking")
        ? "flight"
        : null;
  const hasStickySearch = scrolled && searchMode !== null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncServiceMode = () => {
      const type = new URLSearchParams(window.location.search).get("type");
      setStayType(type === "apartments" ? "apartment" : "hotel");
      setJetType(window.location.hash === "#share" ? "shared" : "private");
    };
    syncServiceMode();
    window.addEventListener("hashchange", syncServiceMode);
    return () => window.removeEventListener("hashchange", syncServiceMode);
  }, [pathname, scrolled]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
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
      <div className="mx-auto flex h-[56px] w-full max-w-[1600px] items-center gap-2 px-3 sm:h-[76px] sm:gap-4 sm:px-6">
        <Logo imgClass="h-[30px] sm:h-[40px]" />

        <button
          type="button"
          onClick={() => openAssistant()}
          className={`ml-2 hidden h-11 items-center gap-2 rounded-full px-3 text-copy font-medium text-ink ${hasStickySearch ? "md:flex xl:hidden" : "md:flex"}`}
        >
          <AiMark size={20} />
          Ask AI
        </button>

        <nav aria-label="Main" className={`ml-6 hidden items-center gap-1 ${hasStickySearch ? "lg:flex xl:hidden" : "lg:flex"}`}>
          {NAV_LINKS.map((item) => {
            const path = item.href.split("?")[0];
            const active =
              !item.href.includes("?") &&
              (pathname.startsWith(path) || (path === "/flights" && pathname.startsWith("/booking")));
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-copy font-medium ${active ? "bg-shell text-ink" : "text-body"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {hasStickySearch ? (
          <div className="hidden min-w-0 flex-1 xl:block">
            <div className="xl:max-w-[760px]">
              <SearchSummaryBar compact mode={searchMode!} initialStayType={stayType} initialJetType={jetType} key={`${searchMode}-${stayType}-${jetType}`} />
            </div>
          </div>
        ) : null}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link href="/host" className={`hidden rounded-full px-3.5 py-2 text-copy font-medium text-ink ${hasStickySearch ? "lg:hidden" : "lg:block"}`}>
            List your place
          </Link>
          <button
            type="button"
            onClick={() => openAssistant()}
            aria-label="Ask AI"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand shadow-[0_2px_10px_-2px_rgba(16,24,40,0.18)] sm:h-12 sm:w-12 md:hidden"
          >
            <AiMark size={22} />
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="site-navigation-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_10px_-2px_rgba(16,24,40,0.18)] lg:hidden sm:h-12 sm:w-12 ${hasStickySearch ? "xl:flex" : ""}`}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                href="/account/saved"
                aria-label="Saved"
                className="hidden h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_10px_-2px_rgba(16,24,40,0.18)] sm:flex"
              >
                <Heart size={22} strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link
                href="/account"
                aria-label="Your account"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-[0_2px_10px_-2px_rgba(16,24,40,0.18)] sm:h-12 sm:w-12"
              >
                <span className="text-copy font-bold">
                  {(user?.fullName || user?.email || "U")[0].toUpperCase()}
                </span>
              </Link>
            </>
          ) : (
            <Link
              href="/signin"
              aria-label="Sign in or create an account"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_10px_-2px_rgba(16,24,40,0.18)] sm:h-12 sm:w-12"
            >
              <CircleUserRound size={24} strokeWidth={1.9} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-[100] bg-ink/35 backdrop-blur-[2px]"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            id="site-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onClick={(event) => event.stopPropagation()}
            className="absolute right-0 top-0 flex h-dvh w-[min(88vw,360px)] flex-col bg-white p-5 shadow-[-16px_0_48px_-20px_rgba(16,24,40,0.4)] sm:w-[400px] xl:w-[440px]"
          >
            <div className="flex items-center justify-between border-b border-line pb-5">
              <div>
                <Logo imgClass="h-[38px] w-auto" onClick={() => setMenuOpen(false)} />
                <p className="mt-0.5 text-small text-body">Where would you like to go?</p>
              </div>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-shell text-ink"
              >
                <X size={21} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Main menu" className="flex-1 overflow-y-auto py-5">
              <p className="px-3 pb-2 text-tiny font-bold uppercase tracking-[0.12em] text-label">Travel</p>
              <ul className="space-y-1">
                {[...NAV_LINKS, { href: "/private-jets#share", label: "Shared jets" }].map((item) => {
                  const path = item.href.split(/[?#]/)[0];
                  const active = pathname.startsWith(path) && (item.label !== "Shared jets" || pathname === "/private-jets");
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-copy font-medium transition-colors ${active ? "bg-shell text-ink" : "text-body hover:bg-shell hover:text-ink"}`}
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-label">›</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-7 px-3 pb-2 text-tiny font-bold uppercase tracking-[0.12em] text-label">Your place</p>
              <Link
                href="/host"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-brand-soft px-4 py-3.5 text-copy font-semibold text-ink transition-colors hover:bg-[#ffe9d2]"
              >
                List your place
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openAssistant();
                }}
                className="mt-2 block w-full rounded-xl px-4 py-3.5 text-left text-copy font-medium text-body transition-colors hover:bg-shell hover:text-ink"
              >
                Ask AI
              </button>
            </nav>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
