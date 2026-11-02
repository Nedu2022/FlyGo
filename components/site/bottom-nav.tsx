"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BedDouble, CircleUserRound, House, Plane } from "lucide-react";
import { PrivateJet } from "@/components/site/search-bar";
import { useAuth } from "@/components/auth/auth-context";

const ICON = { size: 22, strokeWidth: 1.8, "aria-hidden": true } as const;

const TABS = [
  { href: "/", label: "Home", icon: <House {...ICON} /> },
  { href: "/flights", label: "Flights", icon: <Plane {...ICON} />, also: "/booking" },
  { href: "/hotels", label: "Stays", icon: <BedDouble {...ICON} /> },
  { href: "/private-jets", label: "Jets", icon: <PrivateJet size={22} strokeWidth={1.8} aria-hidden="true" /> },
];

export function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const accountTab = {
    href: isAuthenticated ? "/dashboard" : "/signin",
    label: isAuthenticated ? "Account" : "Sign in",
    icon: <CircleUserRound {...ICON} />,
  };

  const tabs = [...TABS, accountTab];

  return (
    <>
      <div aria-hidden="true" className="h-[calc(60px+env(safe-area-inset-bottom))] lg:hidden" />
      <nav
        aria-label="Quick navigation"
        className="fixed inset-x-0 bottom-0 z-40 bg-white/95 shadow-[0_-1px_0_rgba(16,24,40,0.06),0_-8px_24px_-16px_rgba(16,24,40,0.2)] pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="grid h-[60px] grid-cols-5">
          {tabs.map((tab) => {
            const active =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href) || ("also" in tab && tab.also ? pathname.startsWith(tab.also as string) : false);
            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-full flex-col items-center justify-center gap-0.5 text-micro font-semibold ${
                    active ? "text-ink" : "text-label"
                  }`}
                >
                  <span
                    className={`flex h-7 w-12 items-center justify-center rounded-full transition-colors duration-200 ${
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
