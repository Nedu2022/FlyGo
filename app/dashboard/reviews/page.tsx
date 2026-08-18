"use client";

import { useState } from "react";
import { BarAction, DashPage } from "@/components/dashboard/shell";
import { Avatar } from "@/components/dashboard/icons";
import { GUEST_REVIEWS } from "@/lib/dashboard-data";

export default function ReviewsPage() {
  const [resolved, setResolved] = useState<string[]>([]);

  return (
    <DashPage
      title="Your Earnings at a Glance"
      subtitle="Update your preferences, change your password, or manage your notifications."
      actions={
        <>
          <BarAction label="Request Payout" />
          <BarAction label="Export Report" tone="brand" icon={false} />
        </>
      }
    >
      <section className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:p-6">
        <h2 className="text-[19px] font-semibold text-ink">Guests Reviews</h2>

        <ul className="mt-5 flex max-h-[640px] flex-col gap-4 overflow-y-auto pr-1">
          {GUEST_REVIEWS.map((review) => {
            const done = resolved.includes(review.id);
            return (
              <li
                key={review.id}
                className={`rounded-xl border px-5 py-4 transition-colors duration-200 ${
                  done ? "border-[#4ade80] bg-[#f2fdf6]" : "border-line bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar name={review.name} size={34} />
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{review.name}</p>
                    <Stars rating={review.rating} />
                  </div>
                </div>

                <p className="mt-3 text-[14px] leading-relaxed text-body">{review.body}</p>
                <p className="mt-1 text-[14px] text-body">Stayed Date: {review.stayed}</p>

                <div className="mt-4 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    className="h-[38px] rounded-md border border-line px-5 text-[14px] text-body transition-colors duration-200 hover:border-sky hover:text-sky"
                  >
                    Reply
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setResolved((list) =>
                        done ? list.filter((id) => id !== review.id) : [...list, review.id],
                      )
                    }
                    aria-pressed={done}
                    className={`h-[38px] rounded-md border px-5 text-[14px] transition-colors duration-200 ${
                      done
                        ? "border-[#4ade80] bg-[#4ade80] text-white"
                        : "border-line text-body hover:border-sky hover:text-sky"
                    }`}
                  >
                    {done ? "Resolved" : "Mark as Resolved"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </DashPage>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="mt-0.5 flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rating ? "var(--color-brand)" : "none"}
          stroke="var(--color-brand)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 2 3 6.6 7 .9-5.2 4.8 1.4 7L12 17.8 5.8 21.3l1.4-7L2 9.5l7-.9L12 2Z" />
        </svg>
      ))}
    </span>
  );
}
