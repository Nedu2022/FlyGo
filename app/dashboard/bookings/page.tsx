"use client";

import { useState } from "react";
import { BarAction, DashPage, FilterButton } from "@/components/dashboard/shell";
import { BOOKING_CATEGORIES, MANAGED_BOOKINGS } from "@/lib/dashboard-data";

const STATUS_TONES = {
  Confirmed: "border-[#4ade80] text-[#16a34a]",
  Pending: "border-[#fbbf24] text-[#d97706]",
  Cancelled: "border-[#f87171] text-[#dc2626]",
} as const;

export default function BookingsPage() {
  const [category, setCategory] = useState(BOOKING_CATEGORIES[0]);
  const [selected, setSelected] = useState<number[]>([]);
  const [menu, setMenu] = useState<number | null>(null);

  const allSelected = selected.length === MANAGED_BOOKINGS.length;

  return (
    <DashPage
      title="Manage Your Bookings"
      subtitle="Keep track of upcoming, past, and canceled reservations all in one place."
      actions={
        <>
          <BarAction label="Add New Booking" />
          <BarAction label="Export" tone="brand" icon={false} />
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-copy text-ink">
          Category:
          <span className="relative inline-flex items-center gap-1.5 font-medium text-sky">
            {category}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="m6 9 6 7 6-7Z" />
            </svg>
            <select
              aria-label="Booking category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              {BOOKING_CATEGORIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </span>
        </label>
        <FilterButton />
      </div>

      <section className="mt-5 min-w-0 rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] sm:p-6">
        {selected.length > 0 ? (
          <p className="mb-4 text-small text-sky">{selected.length} selected</p>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-brand text-white">
                <th scope="col" className="rounded-l-lg py-4 pl-5 pr-3 text-small font-medium">
                  <span className="flex items-center gap-4">
                    <Tick
                      checked={allSelected}
                      onChange={() =>
                        setSelected(allSelected ? [] : MANAGED_BOOKINGS.map((_, i) => i))
                      }
                      label="Select all bookings"
                      tone="header"
                    />
                    Guest Name
                  </span>
                </th>
                {["Property Name", "Booking Amount", "Booking Dates", "Duration", "Status"].map((head) => (
                  <th key={head} scope="col" className="px-3 py-4 text-small font-medium">
                    {head}
                  </th>
                ))}
                <th scope="col" className="rounded-r-lg px-3 py-4 text-small font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {MANAGED_BOOKINGS.map((booking, index) => (
                <tr
                  key={index}
                  className="border-b border-line transition-colors duration-200 hover:bg-sky-tint"
                >
                  <td className="py-4 pl-5 pr-3 text-small text-ink">
                    <span className="flex items-center gap-4">
                      <Tick
                        checked={selected.includes(index)}
                        onChange={() =>
                          setSelected((rows) =>
                            rows.includes(index)
                              ? rows.filter((row) => row !== index)
                              : [...rows, index],
                          )
                        }
                        label={`Select ${booking.guest}'s booking`}
                      />
                      {booking.guest}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-small text-body">{booking.property}</td>
                  <td className="px-3 py-4 text-small text-body">{booking.amount}</td>
                  <td className="px-3 py-4 text-small text-body">{booking.dates}</td>
                  <td className="px-3 py-4 text-small text-body">{booking.duration}</td>
                  <td className="px-3 py-4">
                    <span
                      className={`inline-block rounded-full border px-3 py-1 text-small ${STATUS_TONES[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="relative px-3 py-4">
                    <button
                      type="button"
                      aria-label={`Actions for ${booking.guest}`}
                      aria-expanded={menu === index}
                      onClick={() => setMenu(menu === index ? null : index)}
                      className="rounded p-1.5 text-ink transition-colors duration-200 hover:bg-shell"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <circle cx="5" cy="12" r="1.8" />
                        <circle cx="12" cy="12" r="1.8" />
                        <circle cx="19" cy="12" r="1.8" />
                      </svg>
                    </button>

                    {menu === index ? (
                      <ul className="animate-rise absolute right-3 top-12 z-20 w-[168px] overflow-hidden rounded-lg border border-line bg-white py-1 shadow-[0_12px_30px_-12px_rgba(16,24,40,0.35)]">
                        {["View details", "Message guest", "Cancel booking"].map((item) => (
                          <li key={item}>
                            <button
                              type="button"
                              onClick={() => setMenu(null)}
                              className={`w-full px-4 py-2.5 text-left text-small transition-colors hover:bg-shell ${ item === "Cancel booking" ? "text-red-500" : "text-ink" }`}
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DashPage>
  );
}

function Tick({
  checked,
  onChange,
  label,
  tone = "row",
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  tone?: "row" | "header";
}) {
  return (
    <span className="relative inline-flex h-[19px] w-[19px] shrink-0 items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className={`peer h-[19px] w-[19px] cursor-pointer appearance-none rounded-[4px] border-2 transition-colors duration-200 ${
          tone === "header" ? "border-white checked:bg-white" : "border-ink checked:border-sky checked:bg-sky"
        }`}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={tone === "header" ? "var(--color-brand)" : "white"}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute h-3 w-3 scale-50 opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}
