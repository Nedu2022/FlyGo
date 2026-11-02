import { AirlineMark } from "@/components/flights/flight-result-card";
import type { Offer, Slice } from "@/lib/duffel";
import { clock, day, duration } from "@/lib/format";

/** The chosen flight, segment by segment, with layovers between. */
export function FlightInfoCard({ offer }: { offer: Offer }) {
  return (
    <section className="rounded-2xl bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <AirlineMark carrier={offer.owner} size={40} />
        <div>
          <p className="text-copy font-semibold text-ink">
            {offer.slices[0].origin.city_name} – {offer.slices[0].destination.city_name}
          </p>
          <p className="text-tiny text-label">
            {offer.owner.name} · {offer.slices[0].fare_brand_name}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {offer.slices.map((slice, i) => (
          <SliceDetail key={slice.id} slice={slice} label={i === 0 ? "Depart" : "Return"} />
        ))}
      </div>
    </section>
  );
}

function SliceDetail({ slice, label }: { slice: Slice; label: string }) {
  return (
    <div>
      <p className="text-small font-semibold text-ink">
        {label} · {day(slice.segments[0].departing_at)}
        <span className="font-normal text-label"> · {duration(slice.duration)}</span>
      </p>

      <ol className="mt-3 space-y-3 border-l-2 border-line pl-4">
        {slice.segments.map((segment, i) => {
          const next = slice.segments[i + 1];
          const wait = next
            ? Math.round((Date.parse(next.departing_at) - Date.parse(segment.arriving_at)) / 60_000)
            : 0;
          return (
            <li key={segment.id}>
              <p className="text-small text-ink">
                <span className="font-semibold">{clock(segment.departing_at)}</span> {segment.origin.iata_code}
                <span className="text-label"> → </span>
                <span className="font-semibold">{clock(segment.arriving_at)}</span> {segment.destination.iata_code}
              </p>
              <p className="text-tiny text-label">
                {segment.marketing_carrier.iata_code}
                {segment.marketing_carrier_flight_number} · {segment.aircraft.name} · {duration(segment.duration)}
              </p>
              {next ? (
                <p className="mt-2 inline-block rounded-full bg-brand-soft px-2.5 py-0.5 text-tiny font-medium text-brand-hover">
                  {Math.floor(wait / 60)}h {String(wait % 60).padStart(2, "0")}m layover in {segment.destination.city_name}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
