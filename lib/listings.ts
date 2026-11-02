import type { User } from "@/components/auth/auth-context";

/**
 * Places hosts list on FLYGO. Kept in the browser until the listings API
 * exists; photos are shrunk before saving so they fit in local storage.
 */
export type Listing = {
  id: string;
  owner: string;
  kind: "apartment" | "house" | "room";
  title: string;
  city: string;
  address: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  photos: string[];
  description: string;
  price: number;
  currency: "NGN" | "USD";
  createdAt: string;
};

export const KINDS = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "Whole house" },
  { value: "room", label: "Private room" },
] as const;

export const AMENITIES = [
  "Wi-Fi",
  "Air conditioning",
  "Kitchen",
  "Washing machine",
  "Free parking",
  "24/7 power",
  "Security",
  "Pool",
  "Gym",
  "Workspace",
  "TV",
  "Self check-in",
];

const KEY = "flygo:listings";

function readAll(): Listing[] {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as Listing[];
  } catch {
    return [];
  }
}

export function listingsFor(email: string) {
  return readAll().filter((l) => l.owner === email);
}

/** False when storage is full or blocked. */
export function saveListing(listing: Listing) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...readAll().filter((l) => l.id !== listing.id), listing]));
    return true;
  } catch {
    return false;
  }
}

export function removeListing(id: string) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(readAll().filter((l) => l.id !== id)));
  } catch {
    // Nothing to do: storage is unavailable.
  }
}

/** Checks a host must pass before a listing can go live. */
export function hostReady(user: User) {
  const v = user.verification;
  return Boolean(v?.phone && v.identity && v.selfie && v.address && v.payout);
}

/** Shrinks a photo to a JPEG data URL no wider than `max` pixels. */
export function shrinkPhoto(file: File, max = 960): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that photo."));
    };
    img.src = url;
  });
}
