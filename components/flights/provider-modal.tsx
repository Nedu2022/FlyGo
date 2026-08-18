"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PROVIDERS, TRIP } from "@/lib/flight-data";

/**
 * Compares the agencies selling the chosen itinerary. Rendered as a native
 * <dialog> so focus trapping and Esc-to-close come for free.
 */
export function ProviderModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        // Clicks land on the dialog itself only when they hit the backdrop.
        if (event.target === ref.current) onClose();
      }}
      aria-labelledby="provider-modal-title"
      className="m-auto max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-[760px] overflow-hidden rounded-xl p-0 shadow-[0_30px_80px_-20px_rgba(16,24,40,0.5)] backdrop:bg-ink/45 backdrop:backdrop-blur-[2px] open:animate-rise sm:w-[92vw] sm:rounded-2xl"
    >
      <div className="relative grid max-h-[calc(100dvh-1rem)] gap-0 sm:grid-cols-[minmax(240px,0.85fr)_minmax(0,1.15fr)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-shell"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="p-5 sm:p-8">
          <h2 id="provider-modal-title" className="text-h3 font-bold text-ink">
            {TRIP.route}
          </h2>

          <h3 className="mt-7 text-lead font-semibold text-ink">Itinerary</h3>
          <p className="mt-4 text-copy text-body">
            {TRIP.dates} &nbsp;•&nbsp; Business
          </p>
          <p className="mt-3 text-copy text-body">12pm-6pm</p>

          <button
            type="button"
            className="group mt-5 flex items-center gap-2 text-copy text-brand transition-colors duration-200 hover:text-brand-hover"
          >
            View details
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h15M14 7l5 5-5 5" />
            </svg>
          </button>

          <h3 className="mt-8 text-h4 font-bold text-ink">Total</h3>
          <p className="mt-2 text-h3 font-semibold text-sky">{PROVIDERS[0].price}</p>
          <p className="mt-1 text-copy text-body">per person</p>
        </div>

        <ul className="min-h-0 overflow-y-auto border-t border-line sm:max-h-none sm:border-l sm:border-t-0 sm:pt-10">
          {PROVIDERS.map((provider) => (
            <li
              key={provider.name}
              className="flex items-center gap-2 border-b border-line px-4 py-3 last:border-b-0 sm:gap-4 sm:px-5 sm:py-4"
            >
              <span className="flex w-[92px] shrink-0 items-center sm:w-[120px]">
                <Image
                  src={provider.logo}
                  alt={provider.name}
                  width={138}
                  height={66}
                  className="h-[26px] w-auto object-contain sm:h-[30px]"
                />
              </span>
              <span className="min-w-0 flex-1 text-copy text-sky">{provider.price}</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push("/booking/details");
                }}
                className="h-[32px] shrink-0 rounded-md bg-brand px-4 text-small text-white transition-colors duration-200 hover:bg-brand-hover"
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
