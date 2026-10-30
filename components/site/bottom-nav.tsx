"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BedDouble, CircleUserRound, Headset, House, Plane } from "lucide-react";

const ICON = { size: 24, strokeWidth: 1.8, "aria-hidden": true } as const;

const TABS = [
  { href: "/", label: "Home", icon: <House {...ICON} /> },
  { href: "/flights", label: "Flights", icon: <Plane {...ICON} />, also: "/booking" },
  { href: "/hotels", label: "Hotels", icon: <BedDouble {...ICON} /> },
  { href: "/contact", label: "Help", icon: <Headset {...ICON} /> },
  { href: "/signin", label: "Account", icon: <CircleUserRound {...ICON} /> },
];

/**
 * Phone-only tab bar: every main destination one thumb-tap away, as in a
 * native travel app. A spacer of the same height keeps page content clear.
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <div aria-hidden="true" className="h-[calc(68px+env(safe-area-inset-bottom))] lg:hidden" />
      <nav
        aria-label="Quick navigation"
        className="fixed inset-x-0 bottom-0 z-40 bg-white/95 shadow-[0_-1px_0_rgba(16,24,40,0.06),0_-8px_24px_-16px_rgba(16,24,40,0.2)] pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="grid h-[68px] grid-cols-5">
          {TABS.map((tab) => {
            const active =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href) || (tab.also ? pathname.startsWith(tab.also) : false);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-full flex-col items-center justify-center gap-1 text-micro font-semibold ${
                    active ? "text-ink" : "text-label"
                  }`}
                >
                  <span
                    className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-200 ${
                      active ? "bg-brand-soft text-brand" : ""
                    }`}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
