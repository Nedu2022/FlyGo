import Link from "next/link";
import { EmptyState } from "@/components/account/account-shell";
import { TripsIllustration } from "@/components/ui/illustrations";

export default function TripsPage() {
  return (
    <section>
      <h2 className="mb-4 text-h3 font-semibold tracking-tight text-ink">Trips</h2>
      <EmptyState
        art={<TripsIllustration />}
        title="No trips yet"
        note="Flights, stays and jets you book will show up here."
        action={
          <Link href="/#search" className="mt-5 rounded-full bg-brand px-5 py-2.5 text-small font-semibold text-white">
            Start searching
          </Link>
        }
      />
    </section>
  );
}
