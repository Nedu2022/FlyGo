import Link from "next/link";
import { BadgeCheck, Camera, Wallet } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PAGE } from "@/components/site/container";
import { HostIllustration } from "@/components/ui/illustrations";

export const metadata = {
  title: "List your place — FLYGO Bookings",
  description: "Earn from your apartment, house or spare room with FLYGO.",
};

const ICON = { size: 22, strokeWidth: 1.9, "aria-hidden": true } as const;

const STEPS = [
  { title: "Add your place", body: "Photos, rooms and your nightly price.", icon: <Camera {...ICON} /> },
  { title: "Get verified", body: "ID, address and payout account, once.", icon: <BadgeCheck {...ICON} /> },
  { title: "Get paid", body: "Payouts to your bank after each check-in.", icon: <Wallet {...ICON} /> },
];

export default function HostPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className={PAGE}>
        <section className="grid items-center gap-8 py-10 sm:py-16 lg:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full bg-sky-soft px-3 py-1 text-tiny font-semibold text-blue">For hosts</p>
            <h1 className="mt-4 text-display font-bold leading-[1.05] tracking-tight text-ink">Earn from your place.</h1>
            <p className="mt-4 max-w-[440px] text-lead text-body">
              List an apartment, house or spare room. Travellers book and pay on FLYGO.
            </p>
            <Link
              href="/host/new"
              className="mt-7 inline-flex h-12 items-center rounded-full bg-brand px-7 text-copy font-semibold text-white shadow-[0_10px_22px_-10px_rgba(224,117,42,0.8)]"
            >
              Start listing
            </Link>
            <p className="mt-3 text-small text-label">Same FLYGO account. No separate sign-up.</p>
          </div>
          <div className="flex justify-center rounded-[32px] bg-brand-soft py-8">
            <HostIllustration className="h-56 w-auto sm:h-72" />
          </div>
        </section>

        <ol className="grid gap-3 pb-16 sm:grid-cols-3 sm:gap-4 lg:pb-24">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-3xl bg-shell p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand">{step.icon}</span>
                <span className="text-h2 font-bold text-line">{i + 1}</span>
              </div>
              <p className="mt-4 text-h4 font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-small text-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </>
  );
}
