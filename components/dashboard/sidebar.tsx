"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { DashIcon } from "@/components/dashboard/icons";
import { DASH_NAV } from "@/lib/dashboard-data";

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Scrim only exists while the drawer is open on small screens. */}
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[276px] flex-col bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="px-8 pb-6 pt-7">
          <Logo href="/dashboard" imgClass="h-[46px]" />
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-6">
          <ul className="flex flex-col gap-1.5">
            {DASH_NAV.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-copy transition-all duration-200 ${ active ? "bg-sky font-semibold text-white shadow-[0_6px_18px_rgba(86,172,233,0.4)]" : "text-label hover:bg-sky-tint hover:text-sky" }`}
                  >
                    <DashIcon name={item.icon} size={22} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-line px-4 py-4">
          <Link
            href="/signin"
            className="flex items-center gap-4 rounded-xl px-4 py-3.5 text-copy text-label transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
          >
            <DashIcon name="signout" size={22} />
            Sign out
          </Link>
        </div>
      </aside>
    </>
  );
}
