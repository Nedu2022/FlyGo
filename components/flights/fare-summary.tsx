import Link from "next/link";
import { FARE_SUMMARY } from "@/lib/flight-data";

type FareSummaryProps = {
  secondaryLabel?: string;
  action?: { label: string; href: string };
  /** Small orange link under the button. */
  secondaryAction?: { label: string; href: string };
};

/** Borderless fare panel that rides alongside every booking step. */
export function FareSummary({
  secondaryLabel = FARE_SUMMARY.protectionLabel,
  action = { label: "Sign in for fast booking", href: "/signin" },
  secondaryAction = { label: "Pay with debit card", href: "/booking/payment" },
}: FareSummaryProps) {
  return (
    <div>
      <h2 className="border-b border-line pb-4 text-[20px] font-semibold text-ink">
        Fare summary
      </h2>

      <Row label="Traveler(s)" note={FARE_SUMMARY.travellerNote} value={FARE_SUMMARY.travellers} />
      <Row label={secondaryLabel} value={FARE_SUMMARY.protection} />
      <Row label="Total:" value={FARE_SUMMARY.total} />

      <div className="pt-4">
        <p className="text-[14px] font-semibold text-ink">Refundable</p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-body">
          Total fare displayed above has been rounded off and may thus show a slight
          difference.
        </p>

        <Link
          href={action.href}
          className="mt-5 flex h-[48px] w-full items-center justify-center rounded-lg bg-sky text-[16px] font-medium text-white transition-all duration-200 hover:bg-sky-hover active:translate-y-px"
        >
          {action.label}
        </Link>

        {secondaryAction ? (
          <Link
            href={secondaryAction.href}
            className="mt-3 block text-center text-[14px] text-brand transition-colors duration-200 hover:text-brand-hover"
          >
            {secondaryAction.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, note, value }: { label: string; note?: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-4">
      <div>
        <p className="text-[16px] font-medium text-ink">{label}</p>
        {note ? <p className="mt-0.5 text-[13px] text-body">{note}</p> : null}
      </div>
      <p className="text-[17px] text-sky">{value}</p>
    </div>
  );
}
