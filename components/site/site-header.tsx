"use client";

import {
  CircleUserRound,
  Heart,
} from "lucide-react";
import { openAssistant } from "@/components/site/ai-assistant";
import { AiMark } from "@/components/site/ai-mark";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          className="ml-2 hidden h-11 items-center gap-2 rounded-full px-3 text-copy font-medium text-ink md:flex"
        >
          <AiMark size={20} />
          Ask AI
        </button>

        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
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

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => openAssistant()}
            aria-label="Ask AI"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand shadow-[0_2px_10px_-2px_rgba(16,24,40,0.18)] sm:h-12 sm:w-12 md:hidden"
          >
            <AiMark size={22} />
          </button>

          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                aria-label="Saved trips"
                className="hidden h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_10px_-2px_rgba(16,24,40,0.18)] sm:flex"
              >
                <Heart size={22} strokeWidth={2} aria-hidden="true" />
              </Link>
              <Link
                href="/dashboard"
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
    </header>
  );
}
