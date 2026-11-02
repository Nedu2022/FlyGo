"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BadgeCheck, CalendarCheck, Heart, House, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useAuth, type User } from "@/components/auth/auth-context";
import { Avatar } from "@/components/ui/avatar";

const ICON = { size: 18, strokeWidth: 1.9, "aria-hidden": true } as const;

const NAV = [
  { href: "/account", label: "Trips", icon: <CalendarCheck {...ICON} /> },
  { href: "/account/saved", label: "Saved", icon: <Heart {...ICON} /> },
  { href: "/account/profile", label: "Profile", icon: <UserRound {...ICON} /> },
  { href: "/account/verification", label: "Verification", icon: <ShieldCheck {...ICON} /> },
  { href: "/account/hosting", label: "Hosting", icon: <House {...ICON} /> },
];

/** Identity checks a traveller needs to count as verified. */
export function isVerified(user: User) {
  const v = user.verification;
  return Boolean(v?.phone && v.identity && v.selfie);
}

/** Signed-in area: who you are on top, sections beside (desktop) or above (phone). */
export function AccountShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
  }, [isLoading, user, router, pathname]);

  // On phones the tabs scroll sideways; bring the current one into view.
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('nav[aria-label="Account"]');
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (nav && active) nav.scrollLeft = active.offsetLeft - nav.clientWidth / 2 + active.clientWidth / 2;
  }, [pathname, user]);

  if (!user) return <div className="min-h-[60vh]" />;
  const verified = isVerified(user);

  return (
    <div className="py-6 sm:py-10">
      <div className="flex items-center gap-4">
        <Avatar name={user.fullName || user.email} size={56} />
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-h2 font-bold tracking-tight text-ink">
            <span className="truncate">{user.fullName}</span>
            {verified ? <BadgeCheck size={22} strokeWidth={2} aria-label="Verified" className="shrink-0 text-sky" /> : null}
          </h1>
          <p className="truncate text-small text-body">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Account" className="-mx-5 overflow-x-auto px-5 no-scrollbar lg:mx-0 lg:px-0">
          <ul className="flex gap-2 lg:flex-col lg:gap-1">
            {NAV.map((item) => {
              const on = pathname === item.href;
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    aria-current={on ? "page" : undefined}
                    className={`flex h-10 items-center gap-2.5 rounded-full px-4 text-small font-medium lg:h-11 lg:rounded-xl ${
                      on ? "bg-ink text-white" : "bg-shell text-ink lg:bg-transparent"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                    {item.href === "/account/verification" && !verified ? (
                      <span className="h-2 w-2 rounded-full bg-brand" aria-label="Not finished" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
            <li className="shrink-0 lg:mt-4">
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="flex h-10 items-center gap-2.5 rounded-full px-4 text-small font-medium text-red-600 lg:h-11"
              >
                <LogOut {...ICON} />
                Sign out
              </button>
            </li>
          </ul>
        </nav>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}

/** Empty list with an illustration and an optional next step. */
export function EmptyState({ art, title, note, action }: { art: ReactNode; title: string; note: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-shell px-6 py-10 text-center">
      {art}
      <p className="mt-4 text-h4 font-semibold text-ink">{title}</p>
      <p className="mt-1 max-w-[320px] text-small text-body">{note}</p>
      {action}
    </div>
  );
}
