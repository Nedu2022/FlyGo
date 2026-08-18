"use client";

import Link from "next/link";
import { Avatar, DashIcon } from "@/components/dashboard/icons";
import { HOST } from "@/lib/dashboard-data";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white">
      <div className="flex flex-wrap items-center gap-4 px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open navigation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line text-body transition-colors hover:border-sky hover:text-sky lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[22px] font-bold text-ink sm:text-[26px]">
            Welcome Back, {HOST.firstName}
          </h1>
          <p className="mt-0.5 truncate text-[14px] text-label">
            Here&apos;s a quick look at your upcoming trips and account details.
          </p>
        </div>

        <Link
          href="/dashboard/properties"
          className="hidden items-center gap-2 text-[15px] font-medium text-sky transition-colors duration-200 hover:text-sky-hover md:flex"
        >
          <DashIcon name="plus" size={18} strokeWidth={2.2} />
          Add new post
        </Link>

        <LanguagePicker />

        <button
          type="button"
          aria-label="Notifications, 3 unread"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-200 hover:-translate-y-0.5"
        >
          <DashIcon name="bell" size={22} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-brand-soft" />
        </button>

        <div className="flex items-center gap-3">
          <Avatar name={HOST.displayName} size={44} />
          <div className="hidden leading-tight sm:block">
            <p className="text-[15px] font-semibold text-ink">{HOST.displayName}</p>
            <p className="text-[13px] text-label">{HOST.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function LanguagePicker() {
  return (
    <label className="hidden items-center gap-2 rounded-lg px-2 py-1.5 text-[15px] text-ink transition-colors hover:bg-shell sm:flex">
      <span className="sr-only">Language</span>
      <svg width="26" height="18" viewBox="0 0 22 15" aria-hidden="true" className="rounded-[2px]">
        <rect width="22" height="15" fill="#ffffff" />
        {[0, 2, 4, 6].map((row) => (
          <rect key={row} y={row * 2.15} width="22" height="2.15" fill="#B22234" />
        ))}
        <rect width="10" height="8.6" fill="#3C3B6E" />
      </svg>
      <select
        defaultValue="en-US"
        className="cursor-pointer appearance-none bg-transparent pr-4 outline-none"
      >
        <option value="en-US">Eng (US)</option>
        <option value="en-GB">Eng (UK)</option>
        <option value="fr">Français</option>
      </select>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="-ml-4 pointer-events-none text-label"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  );
}
