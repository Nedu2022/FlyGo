/**
 * Private jet demo data. Search a route, see the jets that can fly it with
 * their whole-jet price, then either book the jet alone or share it: join a
 * group already going there and split the price by the number of people.
 * Swap for the live API later.
 */

export type JetSize = "Light jet" | "Midsize jet" | "Heavy jet";

export type Aircraft = {
  size: JetSize;
  model: string;
  seats: number;
  /** Longest leg it can fly without stopping. */
  maxHours: number;
  /** Charter cost per flight hour. */
  hourly: number;
};

export const AIRCRAFT: Aircraft[] = [
  { size: "Light jet", model: "Phenom 300", seats: 7, maxHours: 3.5, hourly: 5200 },
  { size: "Midsize jet", model: "Citation XLS+", seats: 9, maxHours: 5.5, hourly: 7400 },
  { size: "Heavy jet", model: "Gulfstream G550", seats: 16, maxHours: 12, hourly: 12800 },
];

export type City = { code: string; city: string };

export const JET_CITIES: City[] = [
  { code: "LOS", city: "Lagos" },
  { code: "ABV", city: "Abuja" },
  { code: "ACC", city: "Accra" },
  { code: "DXB", city: "Dubai" },
  { code: "LHR", city: "London" },
  { code: "JNB", city: "Johannesburg" },
  { code: "NBO", city: "Nairobi" },
  { code: "CDG", city: "Paris" },
  { code: "JFK", city: "New York" },
];

/** Flight hours between cities, one direction; looked up either way round. */
const HOURS: Record<string, number> = {
  "LOS-ABV": 1.1,
  "LOS-ACC": 1.2,
  "ABV-ACC": 1.9,
  "LOS-DXB": 7.2,
  "ABV-DXB": 6.4,
  "LOS-LHR": 6.4,
  "ABV-LHR": 6.2,
  "LOS-JNB": 5.9,
  "LOS-NBO": 5.4,
  "LOS-CDG": 6.1,
  "LOS-JFK": 10.8,
  "ACC-LHR": 6.5,
  "ACC-DXB": 7.8,
};

export function findCity(value: string): City | undefined {
  const q = value.toLowerCase();
  return JET_CITIES.find((c) => q.includes(c.code.toLowerCase()) || q.includes(c.city.toLowerCase()));
}

export function routeHours(from: string, to: string) {
  return HOURS[`${from}-${to}`] ?? HOURS[`${to}-${from}`] ?? 4;
}

export const formatHours = (h: number) => `${Math.floor(h)}h ${String(Math.round((h % 1) * 60)).padStart(2, "0")}m`;

/** A group already heading to the destination on a given day. */
export type ShareGroup = {
  id: string;
  date: string;
  window: string;
  /** People already in the group. */
  people: number;
};

export type JetOffer = {
  id: string;
  aircraft: Aircraft;
  operator: string;
  hours: number;
  /** Price to book the whole jet alone. */
  total: number;
  groups: ShareGroup[];
};

const OPERATORS = ["SkyLux Charters", "Westbridge Aviation", "Equator Jets"];
const DATES = ["Fri 18 Dec", "Sun 20 Dec", "Tue 22 Dec", "Wed 23 Dec", "Sat 26 Dec", "Mon 28 Dec"];
const WINDOWS = ["Morning, 06:00–10:00", "Midday, 10:00–14:00", "Afternoon, 14:00–18:00", "Evening, 18:00–22:00"];

/** Small stable hash so each route always shows the same demo groups. */
function seed(text: string) {
  let h = 7;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return h;
}

/** Every jet that can fly the route non-stop, cheapest first. */
export function jetOffers(from: string, to: string): JetOffer[] {
  const hours = routeHours(from, to);
  return AIRCRAFT.filter((a) => a.maxHours >= hours).map((aircraft, i) => {
    const s = seed(`${from}${to}${aircraft.size}`);
    const total = Math.round((aircraft.hourly * hours * 1.15) / 100) * 100;
    const groups: ShareGroup[] = [0, 1].map((g) => ({
      id: `${aircraft.size}-${g}`,
      date: DATES[(s + g * 2) % DATES.length],
      window: WINDOWS[(s + g) % WINDOWS.length],
      // Leave room for at least one more person.
      people: 1 + ((s + g * 3) % (aircraft.seats - 1)),
    }));
    return { id: `${from}-${to}-${i}`, aircraft, operator: OPERATORS[s % OPERATORS.length], hours, total, groups };
  });
}

/** What each person pays when `people` share the jet. */
export const shareOf = (total: number, people: number) => Math.ceil(total / people);

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
