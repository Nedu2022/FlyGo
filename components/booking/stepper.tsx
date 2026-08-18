import { BOOKING_STEPS } from "@/lib/flight-data";

/**
 * Three-step rail. The ordinal sits above the dot and the label below it, with
 * the connector running between dots. `current` is 1-indexed.
 */
export function BookingStepper({ current }: { current: number }) {
  return (
    <ol className="mx-auto flex w-full max-w-[1240px] gap-2 overflow-x-auto px-5 py-8 no-scrollbar sm:px-8">
      {BOOKING_STEPS.map((step, index) => {
        const number = index + 1;
        const done = number <= current;
        const isLast = index === BOOKING_STEPS.length - 1;

        return (
          <li key={step.ordinal} className={`min-w-[220px] ${isLast ? "flex-none" : "flex-1"}`}>
            <p className="text-copy text-ink">{step.ordinal}</p>
            <div className="flex items-center py-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-copy text-white transition-colors duration-300 ${ done ? "bg-sky" : "bg-muted" }`}
              >
                {number}
              </span>
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={`h-px flex-1 transition-colors duration-500 ${
                    number < current ? "bg-sky" : "bg-line"
                  }`}
                />
              ) : null}
            </div>
            <p className="text-copy font-medium text-ink">{step.label}</p>
          </li>
        );
      })}
    </ol>
  );
}
