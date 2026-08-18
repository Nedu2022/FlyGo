import Image from "next/image";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SearchSummaryBar } from "@/components/flights/search-summary-bar";
import { BookingStepper } from "@/components/booking/stepper";
import { BOOKING_STEPS } from "@/lib/flight-data";

/** Header + search card + stepper + the two-column body every step shares. */
export function BookingShell({
  step,
  children,
  aside,
}: {
  step: number;
  children: ReactNode;
  aside: ReactNode;
}) {
  return (
    <>
      <SiteHeader variant="solid" />
      <SearchSummaryBar />

      <div className="bg-canvas">
        {/* The design leads with the stepper, but the page still needs a single
            top-level heading for assistive tech and document outline. */}
        <h1 className="sr-only">
          Booking — step {step} of {BOOKING_STEPS.length}:{" "}
          {BOOKING_STEPS[step - 1]?.label}
        </h1>
        <BookingStepper current={step} />

        <main className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_320px]">
          <div className="flex min-w-0 flex-col gap-6">{children}</div>
          <div className="lg:sticky lg:top-24 lg:self-start">{aside}</div>
        </main>
      </div>

      <SiteFooter />
    </>
  );
}

/** Blue icon + heading that opens each block in the flow. */
export function SectionHeading({
  icon,
  title,
  trailing,
}: {
  icon: ReactNode;
  title: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex shrink-0 items-center text-sky">{icon}</span>
      <h2 className="text-h4 font-medium text-sky">{title}</h2>
      {trailing ? <div className="ml-auto">{trailing}</div> : null}
    </div>
  );
}

/** Icon loaded from the exported asset set, tinted to the section colour. */
export function AssetIcon({
  src,
  size = 24,
  alt = "",
}: {
  src: string;
  size?: number;
  alt?: string;
}) {
  return (
    <Image src={src} alt={alt} width={size} height={size} style={{ width: size, height: "auto" }} />
  );
}
