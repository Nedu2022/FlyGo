/** Formatting shared by the flight (Duffel) and stay (LiteAPI) screens. */

export function money(amount: number | string, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

/** "PT7H15M" (ISO 8601, as Duffel sends it) → "7h 15m". */
export function duration(iso: string) {
  const match = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(iso);
  const h = Number(match?.[1] ?? 0);
  const m = Number(match?.[2] ?? 0);
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

export function minutes(iso: string) {
  const match = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(iso);
  return Number(match?.[1] ?? 0) * 60 + Number(match?.[2] ?? 0);
}

/** Local airport time from "2026-12-15T23:15:00" → "23:15". */
export function clock(local: string) {
  return local.slice(11, 16);
}

/** Days between two local dates, for the "+1" on overnight arrivals. */
export function dayShift(from: string, to: string) {
  return Math.round((Date.parse(to.slice(0, 10)) - Date.parse(from.slice(0, 10))) / 86_400_000);
}

const DAY = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

/** "2026-12-15" → "Tue 15 Dec". */
export function day(date: string) {
  return DAY.format(new Date(`${date.slice(0, 10)}T00:00:00Z`));
}

export function nights(checkin: string, checkout: string) {
  return Math.max(1, dayShift(checkin, checkout));
}
