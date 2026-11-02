"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth, type User } from "@/components/auth/auth-context";

const NAV = [
  { href: "/account", label: "Trips" },
  { href: "/account/saved", label: "Saved" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/verification", label: "Verification" },
  { href: "/account/hosting", label: "Hosting" },
];

/** Identity checks a traveller needs to count as verified. */
export function isVerified(user: User) {
  const v = user.verification;
  return Boolean(v?.phone && v.identity && v.selfie);
}

/**
 * Clean, professional Kayak-style account shell:
 * - Crisp title & user identifier up top
 * - Minimalist, elegant horizontal tab bar with active underline
 * - Generous spacing and zero visual clutter
 */
export function AccountShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
  }, [isLoading, user, router, pathname]);

  if (!user) return <div className="min-h-[60vh]" />;

  return (
    <div className="py-8 sm:py-12">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pb-6">
        <div>
          <h1 className="text-h1 sm:text-display font-bold tracking-tight text-ink">
            {user.fullName || "Account"}
          </h1>
          <p className="mt-1 text-copy text-body">{user.email}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="inline-flex items-center gap-2 self-start sm:self-auto text-small font-semibold text-red-600 transition-colors hover:text-red-700 active:translate-y-px"
        >
          <LogOut size={16} strokeWidth={2.2} className="text-red-600" />
          Sign out
        </button>
      </div>

      {/* Modern Underline Tab Bar (Kayak / Stripe Standard) */}
      <nav aria-label="Account navigation" className="border-b border-line">
        <ul className="-mb-px flex gap-8 overflow-x-auto no-scrollbar">
          {NAV.map((item) => {
            const on = pathname === item.href;
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={on ? "page" : undefined}
                  className={`inline-flex items-center py-3.5 text-copy font-medium transition-colors border-b-2 ${
                    on
                      ? "border-ink text-ink font-semibold"
                      : "border-transparent text-body hover:text-ink hover:border-line"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Tab Content */}
      <div className="pt-8 sm:pt-10">{children}</div>
    </div>
  );
}

/** Empty state with illustration and clean action. */
export function EmptyState({
  art,
  title,
  note,
  action,
}: {
  art: ReactNode;
  title: string;
  note: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl bg-shell/60 px-6 py-14 text-center">
      {art}
      <p className="mt-5 text-h3 font-semibold text-ink">{title}</p>
      <p className="mt-1.5 max-w-[360px] text-copy text-body">{note}</p>
      {action}
    </div>
  );
}
