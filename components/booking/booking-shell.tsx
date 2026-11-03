import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { BookingStepper, STEPS } from "@/components/booking/stepper";

/** Header, stepper and the two-column body every booking step shares. */
export function BookingShell({
  step,
  steps = STEPS,
  children,
  aside,
}: {
  step: number;
  steps?: readonly string[];
  children: ReactNode;
  aside: ReactNode;
}) {
  return (
    <>
      <SiteHeader variant="solid" />

      <div className="bg-canvas">
        <h1 className="sr-only">
          Booking: step {step} of {steps.length}, {steps[step - 1]}
        </h1>
        {steps.length > 1 ? <BookingStepper current={step} steps={steps} /> : <div className="h-6" />}

        <main className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex min-w-0 flex-col gap-6">{children}</div>
          <div className="lg:sticky lg:top-24 lg:self-start">{aside}</div>
        </main>
      </div>

      <SiteFooter flush />
    </>
  );
}

/** White panel that holds each block of a step. */
export function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-5 sm:p-6">
      {title ? <h2 className="mb-5 text-h4 font-semibold text-ink">{title}</h2> : null}
      {children}
    </section>
  );
}
