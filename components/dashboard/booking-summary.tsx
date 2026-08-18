"use client";

import { useState } from "react";
import Link from "next/link";
import { Panel } from "@/components/dashboard/panels";
import { BOOKINGS, type Booking } from "@/lib/dashboard-data";

const STATUS_TONES: Record<Booking["status"], string> = {
  Completed: "border-[#4ade80] text-[#16a34a]",
  Pending: "border-[#fbbf24] text-[#d97706]",
  Cancelled: "border-[#f87171] text-[#dc2626]",
};

const ACTION_TONES: Record<Booking["action"], string> = {
  Approved: "text-body",
  Review: "text-brand",
  Declined: "text-red-500",
};

export function BookingSummary() {
  const [selected, setSelected] = useState<number[]>([]);
  const allSelected = selected.length === BOOKINGS.length;

  function toggle(index: number) {
    setSelected((rows) =>
      rows.includes(index) ? rows.filter((row) => row !== index) : [...rows, index],
    );
  }

  return (
    <Panel>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[18px] font-bold text-ink sm:text-[20px]">
          Booking Summary
          {selected.length > 0 ? (
            <span className="ml-3 align-middle text-[13px] font-medium text-sky">
              {selected.length} selected
            </span>
          ) : null}
        </h2>
        <Link
          href="/dashboard/bookings"
          className="text-[14px] font-medium text-brand transition-colors duration-200 hover:text-brand-hover"
        >
          View Full Bookings
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="bg-brand text-white">
              <th scope="col" className="rounded-l-lg py-4 pl-5 pr-3 text-[14px] font-semibold">
                <span className="flex items-center gap-4">
                  <Tick
                    checked={allSelected}
                    onChange={() =>
                      setSelected(allSelected ? [] : BOOKINGS.map((_, i) => i))
                    }
                    label="Select all bookings"
                    tone="header"
                  />
                  Guest Name
                </span>
              </th>
              {["Property", "Bill", "Check-In Date", "Duration", "Status"].map((head) => (
                <th key={head} scope="col" className="px-3 py-4 text-[14px] font-semibold">
                  {head}
                </th>
              ))}
              <th scope="col" className="rounded-r-lg px-3 py-4 text-[14px] font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((booking, index) => (
              <tr
                key={`${booking.guest}-${index}`}
                className="border-b border-line transition-colors duration-200 hover:bg-sky-tint"
              >
                <td className="py-4 pl-5 pr-3 text-[14px] text-ink">
                  <span className="flex items-center gap-4">
                    <Tick
                      checked={selected.includes(index)}
                      onChange={() => toggle(index)}
                      label={`Select ${booking.guest}'s booking`}
                    />
                    {booking.guest}
                  </span>
                </td>
                <td className="px-3 py-4 text-[14px] text-body">{booking.property}</td>
                <td className="px-3 py-4 text-[14px] text-body">{booking.bill}</td>
                <td className="px-3 py-4 text-[14px] text-body">{booking.checkIn}</td>
                <td className="px-3 py-4 text-[14px] text-body">{booking.duration}</td>
                <td className="px-3 py-4">
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-[13px] font-medium ${STATUS_TONES[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className={`px-3 py-4 text-[14px] ${ACTION_TONES[booking.action]}`}>
                  {booking.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
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
          tone === "header"
            ? "border-white checked:bg-white"
            : "border-ink checked:border-sky checked:bg-sky"
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
