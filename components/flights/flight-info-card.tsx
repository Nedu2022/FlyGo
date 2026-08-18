import Image from "next/image";
import { FLIGHT_RESULTS, type FlightResult } from "@/lib/flight-data";

/** Read-only summary of the chosen flight, shown at the top of the booking. */
export function FlightInfoCard({
  result = FLIGHT_RESULTS[0],
}: {
  result?: FlightResult;
}) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.08),0_10px_28px_-18px_rgba(16,24,40,0.25)] sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <Image
          src={result.logo}
          alt={result.airline}
          width={100}
          height={70}
          className="h-[54px] w-auto shrink-0 object-contain"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <div>
              <p className="text-lead text-ink">
                {result.depart} <span className="px-1 text-label">-</span> {result.arrive}
              </p>
              <p className="mt-1 text-copy text-label">{result.airline}</p>
            </div>

            <p className="text-copy text-body">{result.stops}</p>

            <div>
              <p className="text-lead text-ink">{result.duration}</p>
              <p className="mt-1 text-copy text-label">{result.route}</p>
            </div>

            <div className="text-right">
              <p className="text-small text-label">starting from</p>
              <p className="mt-0.5 text-h3 font-bold text-brand">{result.price}</p>
            </div>
          </div>

          <hr className="mt-4 border-line" />
        </div>
      </div>
    </article>
  );
}
