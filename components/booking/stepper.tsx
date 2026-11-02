export const STEPS = ["Passenger", "Extras", "Payment"] as const;

/** Numbered steps joined by a line; `current` is 1-indexed. */
export function BookingStepper({ current, steps = STEPS }: { current: number; steps?: readonly string[] }) {
  return (
    <ol className="mx-auto flex w-full max-w-[1120px] items-center gap-3 px-5 py-6 sm:px-8 sm:py-8">
      {steps.map((label, index) => {
        const number = index + 1;
        const done = number <= current;
        return (
          <li key={label} className={`flex items-center gap-3 ${index < steps.length - 1 ? "flex-1" : ""}`}>
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-small font-semibold ${
                done ? "bg-brand text-white" : "bg-white text-label"
              }`}
              aria-current={number === current ? "step" : undefined}
            >
              {number}
            </span>
            <span className={`text-small ${number === current ? "font-semibold text-ink" : "text-label"} ${number === current ? "" : "hidden sm:inline"}`}>
              {label}
            </span>
            {index < steps.length - 1 ? (
              <span aria-hidden="true" className={`h-px flex-1 ${number < current ? "bg-brand" : "bg-line"}`} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
