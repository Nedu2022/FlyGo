"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Avatar, DashIcon } from "@/components/dashboard/icons";
import { HOST } from "@/lib/dashboard-data";

const NavContext = createContext<{ openNav: () => void }>({ openNav: () => {} });

/** Sidebar + the content column every dashboard page sits in. */
export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <NavContext.Provider value={{ openNav: () => setOpen(true) }}>
      <div className="min-h-dvh bg-canvas">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div className="lg:pl-[276px]">{children}</div>
      </div>
    </NavContext.Provider>
  );
}

/**
 * One dashboard screen: its own title, subtitle and action links in the bar,
 * then the page body. Every screen in the design follows this frame.
 */
export function DashPage({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { openNav } = useContext(NavContext);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={openNav}
            aria-label="Open navigation"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line text-body transition-colors hover:border-sky hover:text-sky lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className="min-w-0">
            <h1 className="text-h3 font-bold text-ink">{title}</h1>
            {subtitle ? (
              <p className="mt-0.5 max-w-[560px] text-small text-label">{subtitle}</p>
            ) : null}
          </div>

          {actions ? (
            <div className="flex flex-wrap items-center gap-5">{actions}</div>
          ) : null}

          <div className="ml-auto flex items-center gap-4">
            <LanguagePicker />
            <button
              type="button"
              aria-label="Notifications, 3 unread"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-200"
            >
              <DashIcon name="bell" size={22} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-brand-soft" />
            </button>
            <div className="flex items-center gap-3">
              <Avatar name={HOST.displayName} size={44} />
              <div className="hidden leading-tight sm:block">
                <p className="text-copy font-semibold text-ink">{HOST.displayName}</p>
                <p className="text-small text-label">{HOST.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6 sm:px-8">{children}</main>
    </>
  );
}

/** Blue "+ Label" action used across the dashboard bars. */
export function BarAction({
  label,
  onClick,
  tone = "sky",
  icon = true,
}: {
  label: string;
  onClick?: () => void;
  tone?: "sky" | "brand";
  icon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 text-copy font-medium transition-colors duration-200 ${ tone === "sky" ? "text-sky hover:text-sky-hover" : "text-brand hover:text-brand-hover" }`}
    >
      {icon ? <DashIcon name="plus" size={18} strokeWidth={2.2} /> : null}
      {label}
    </button>
  );
}

/** Outlined "Filter" control that sits at the top-right of a panel. */
export function FilterButton() {
  return (
    <button
      type="button"
      className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-line bg-white px-4 text-small text-body transition-colors duration-200 hover:border-sky hover:text-sky"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M3 7h13M18 7h3M3 17h3M8 17h13" />
        <circle cx="17" cy="7" r="1.8" />
        <circle cx="7" cy="17" r="1.8" />
      </svg>
      Filter
    </button>
  );
}

function LanguagePicker() {
  return (
    <label className="hidden items-center gap-2 rounded-lg px-2 py-1.5 text-copy text-ink transition-colors hover:bg-shell sm:flex">
      <span className="sr-only">Language</span>
      <svg width="26" height="18" viewBox="0 0 22 15" aria-hidden="true" className="rounded-[2px]">
        <rect width="22" height="15" fill="#ffffff" />
        {[0, 2, 4, 6].map((row) => (
          <rect key={row} y={row * 2.15} width="22" height="2.15" fill="#B22234" />
        ))}
        <rect width="10" height="8.6" fill="#3C3B6E" />
      </svg>
      <select defaultValue="en-US" className="cursor-pointer appearance-none bg-transparent pr-4 outline-none">
        <option value="en-US">Eng (US)</option>
        <option value="en-GB">Eng (UK)</option>
        <option value="fr">Français</option>
      </select>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="-ml-4 pointer-events-none text-label">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
