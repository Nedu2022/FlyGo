/** The last few searches on this device, for one-tap repeat from the home page. */
export type RecentSearch = { label: string; detail: string; href: string; kind: "Flight" | "Hotel" | "Apartment" | "Jet" };

const KEY = "flygo:recent-searches";
const MAX = 4;

export function readRecent(): RecentSearch[] {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as RecentSearch[];
  } catch {
    return [];
  }
}

export function saveRecent(search: RecentSearch) {
  try {
    const rest = readRecent().filter((s) => s.label !== search.label || s.kind !== search.kind);
    window.localStorage.setItem(KEY, JSON.stringify([search, ...rest].slice(0, MAX)));
  } catch {
    // Storage blocked: nothing is remembered.
  }
}

export function clearRecent() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Storage blocked.
  }
}
