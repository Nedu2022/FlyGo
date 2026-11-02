/**
 * Stays shaped like LiteAPI responses (GET /data/hotel and POST /hotels/rates),
 * keeping their field names so the sample data can be swapped for the API.
 */

export type Rate = {
  rateId: string;
  name: string;
  maxOccupancy: number;
  boardType: "RO" | "BB" | "HB";
  boardName: string;
  retailRate: {
    total: { amount: number; currency: string }[];
    taxesAndFees: { included: boolean; description: string; amount: number; currency: string }[];
  };
  cancellationPolicies: {
    refundableTag: "RFN" | "NRFN";
    cancelPolicyInfos: { cancelTime: string; amount: number; currency: string }[];
  };
};

export type RoomType = { offerId: string; rates: Rate[] };

export type Hotel = {
  id: string;
  name: string;
  /** "hotel" or "apartment"; LiteAPI filters on hotelTypeIds. */
  type: "hotel" | "apartment";
  hotelDescription: string;
  main_photo: string;
  hotelImages: { url: string }[];
  starRating: number;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  country: string;
  hotelFacilities: string[];
  checkinCheckoutTimes: { checkin: string; checkout: string };
  roomTypes: RoomType[];
};

export const STAY_SEARCH = { city: "London", checkin: "2026-12-15", checkout: "2026-12-18", adults: 2 };

/* --------------------------------------------------------------------------
   Sample data
   -------------------------------------------------------------------------- */

const P = (name: string) => `/images/photos/${name}.webp`;

function rate(
  hotel: string,
  room: string,
  total: number,
  opts: { board?: Rate["boardType"]; refundable?: boolean; sleeps?: number } = {},
): RoomType {
  const board = opts.board ?? "RO";
  const refundable = opts.refundable ?? false;
  const id = `${hotel}_${room.toLowerCase().replace(/\W+/g, "-")}_${board}_${refundable ? "rfn" : "nrfn"}`;
  return {
    offerId: `ofr_${id}`,
    rates: [
      {
        rateId: `rt_${id}`,
        name: room,
        maxOccupancy: opts.sleeps ?? 2,
        boardType: board,
        boardName: { RO: "Room only", BB: "Breakfast included", HB: "Breakfast and dinner" }[board],
        retailRate: {
          total: [{ amount: total, currency: "USD" }],
          taxesAndFees: [{ included: true, description: "VAT", amount: Math.round(total * 0.2), currency: "USD" }],
        },
        cancellationPolicies: {
          refundableTag: refundable ? "RFN" : "NRFN",
          cancelPolicyInfos: refundable ? [{ cancelTime: "2026-12-13 23:59:00", amount: 0, currency: "USD" }] : [],
        },
      },
    ],
  };
}

export const STAYS: Hotel[] = [
  {
    id: "lp1a2b3",
    name: "The Strand Palace",
    type: "hotel",
    hotelDescription:
      "Steps from Covent Garden and the West End theatres, with a 24-hour bar, a gym and soundproofed rooms.",
    main_photo: P("stay-room"),
    hotelImages: [{ url: P("stay-room") }, { url: P("stay-twin") }, { url: P("london") }],
    starRating: 4,
    rating: 8.6,
    reviewCount: 4210,
    address: "372 Strand, London WC2R 0JJ",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "24-hour front desk", "Fitness centre", "Bar", "Air conditioning", "Non-smoking rooms"],
    checkinCheckoutTimes: { checkin: "15:00", checkout: "11:00" },
    roomTypes: [
      rate("lp1a2b3", "Standard Double Room", 486),
      rate("lp1a2b3", "Standard Double Room", 552, { board: "BB", refundable: true }),
      rate("lp1a2b3", "Superior Twin Room", 618, { board: "BB", refundable: true }),
    ],
  },
  {
    id: "lp4c5d6",
    name: "Park Plaza Westminster Bridge",
    type: "hotel",
    hotelDescription: "On the South Bank opposite Big Ben, with an indoor pool, spa and four restaurants.",
    main_photo: P("stay-suite"),
    hotelImages: [{ url: P("stay-suite") }, { url: P("stay-infinity") }, { url: P("stay-room") }],
    starRating: 4,
    rating: 8.9,
    reviewCount: 11873,
    address: "200 Westminster Bridge Rd, London SE1 7UT",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "Indoor pool", "Spa", "Restaurant", "Fitness centre", "Room service", "Parking"],
    checkinCheckoutTimes: { checkin: "15:00", checkout: "12:00" },
    roomTypes: [
      rate("lp4c5d6", "Superior King Room", 642, { refundable: true }),
      rate("lp4c5d6", "Superior King Room", 714, { board: "BB", refundable: true }),
      rate("lp4c5d6", "Studio Suite", 896, { board: "BB", refundable: true, sleeps: 3 }),
    ],
  },
  {
    id: "lp7e8f9",
    name: "The Hoxton, Holborn",
    type: "hotel",
    hotelDescription: "A relaxed hotel in Holborn with a lobby café, all-day restaurant and free breakfast bag.",
    main_photo: P("stay-twin"),
    hotelImages: [{ url: P("stay-twin") }, { url: P("stay-room") }],
    starRating: 4,
    rating: 9.1,
    reviewCount: 3302,
    address: "199-206 High Holborn, London WC1V 7BD",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "Restaurant", "Bar", "24-hour front desk", "Non-smoking rooms"],
    checkinCheckoutTimes: { checkin: "15:00", checkout: "12:00" },
    roomTypes: [rate("lp7e8f9", "Cosy Room", 534, { board: "BB" }), rate("lp7e8f9", "Roomy Room", 612, { board: "BB", refundable: true })],
  },
  {
    id: "lpa1b2c",
    name: "Hub by Premier Inn, Westminster",
    type: "hotel",
    hotelDescription: "Compact, smart rooms with app-controlled lighting, a short walk from St James's Park.",
    main_photo: P("stay-room"),
    hotelImages: [{ url: P("stay-room") }],
    starRating: 3,
    rating: 8.4,
    reviewCount: 6120,
    address: "23-25 Tothill St, London SW1H 9LL",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "24-hour front desk", "Air conditioning", "Non-smoking rooms"],
    checkinCheckoutTimes: { checkin: "14:00", checkout: "12:00" },
    roomTypes: [rate("lpa1b2c", "Standard Double Room", 318), rate("lpa1b2c", "Standard Double Room", 366, { refundable: true })],
  },
  {
    id: "lpd3e4f",
    name: "The Savoy",
    type: "hotel",
    hotelDescription: "A landmark on the Thames since 1889, with river-view suites, a spa and the American Bar.",
    main_photo: P("stay-infinity"),
    hotelImages: [{ url: P("stay-infinity") }, { url: P("stay-suite") }, { url: P("london") }],
    starRating: 5,
    rating: 9.4,
    reviewCount: 2188,
    address: "Strand, London WC2R 0EZ",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "Indoor pool", "Spa", "Restaurant", "Bar", "Room service", "Concierge", "Airport shuttle"],
    checkinCheckoutTimes: { checkin: "15:00", checkout: "12:00" },
    roomTypes: [
      rate("lpd3e4f", "Deluxe King Room", 2460, { board: "BB", refundable: true }),
      rate("lpd3e4f", "River View Suite", 4380, { board: "BB", refundable: true, sleeps: 3 }),
    ],
  },
  {
    id: "ap5g6h7",
    name: "Kensington Two-Bedroom Apartment",
    type: "apartment",
    hotelDescription: "A two-bedroom flat with a full kitchen and washing machine, five minutes from Earl's Court station.",
    main_photo: P("stay-cliff"),
    hotelImages: [{ url: P("stay-cliff") }, { url: P("stay-twin") }],
    starRating: 0,
    rating: 8.8,
    reviewCount: 412,
    address: "Earls Court Rd, London SW5 9AA",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "Kitchen", "Washing machine", "Self check-in", "Non-smoking rooms"],
    checkinCheckoutTimes: { checkin: "16:00", checkout: "10:00" },
    roomTypes: [rate("ap5g6h7", "Two-Bedroom Apartment", 780, { sleeps: 4 }), rate("ap5g6h7", "Two-Bedroom Apartment", 864, { refundable: true, sleeps: 4 })],
  },
  {
    id: "lpk1l2m",
    name: "citizenM London Bankside",
    type: "hotel",
    hotelDescription: "Smart rooms with XL beds and mood lighting, a short walk from Tate Modern.",
    main_photo: P("stay-twin"),
    hotelImages: [{ url: P("stay-twin") }, { url: P("london") }],
    starRating: 4,
    rating: 8.9,
    reviewCount: 7340,
    address: "20 Lavington St, London SE1 0NZ",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "24-hour front desk", "Bar", "Air conditioning", "Self check-in"],
    checkinCheckoutTimes: { checkin: "14:00", checkout: "11:00" },
    roomTypes: [rate("lpk1l2m", "citizenM Room", 498), rate("lpk1l2m", "citizenM Room", 576, { board: "BB", refundable: true })],
  },
  {
    id: "lpn3o4p",
    name: "Novotel London Paddington",
    type: "hotel",
    hotelDescription: "Next to Paddington station and the Heathrow Express, with a pool and family rooms.",
    main_photo: P("stay-room"),
    hotelImages: [{ url: P("stay-room") }, { url: P("hero-pool") }],
    starRating: 4,
    rating: 8.1,
    reviewCount: 5012,
    address: "3 Kingdom St, London W2 6BD",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "Indoor pool", "Fitness centre", "Restaurant", "Family rooms"],
    checkinCheckoutTimes: { checkin: "15:00", checkout: "12:00" },
    roomTypes: [rate("lpn3o4p", "Standard Room", 456, { refundable: true }), rate("lpn3o4p", "Family Room", 588, { board: "BB", refundable: true, sleeps: 4 })],
  },
  {
    id: "lpq5r6s",
    name: "The Resident Victoria",
    type: "hotel",
    hotelDescription: "Rooms with a kitchenette, five minutes from Victoria station and Buckingham Palace.",
    main_photo: P("stay-suite"),
    hotelImages: [{ url: P("stay-suite") }],
    starRating: 4,
    rating: 9.0,
    reviewCount: 2876,
    address: "8 Wilton Rd, London SW1V 1LL",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "Kitchenette", "24-hour front desk", "Air conditioning"],
    checkinCheckoutTimes: { checkin: "15:00", checkout: "11:00" },
    roomTypes: [rate("lpq5r6s", "Cosy Double", 528), rate("lpq5r6s", "Cosy Double", 594, { refundable: true })],
  },
  {
    id: "ap8i9j0",
    name: "Canary Wharf Riverside Studio",
    type: "apartment",
    hotelDescription: "A serviced studio with a kitchenette and river views, next to the Elizabeth line.",
    main_photo: P("stay-santorini"),
    hotelImages: [{ url: P("stay-santorini") }, { url: P("stay-room") }],
    starRating: 0,
    rating: 8.2,
    reviewCount: 236,
    address: "Westferry Rd, London E14 8JH",
    city: "London",
    country: "GB",
    hotelFacilities: ["Free WiFi", "Kitchen", "Fitness centre", "Self check-in", "Parking"],
    checkinCheckoutTimes: { checkin: "15:00", checkout: "11:00" },
    roomTypes: [rate("ap8i9j0", "Studio Apartment", 402), rate("ap8i9j0", "Studio Apartment", 456, { refundable: true })],
  },
];

export function getStay(id: string) {
  return STAYS.find((h) => h.id === id);
}

/* --------------------------------------------------------------------------
   Helpers the screens share
   -------------------------------------------------------------------------- */

export const total = (r: Rate) => r.retailRate.total[0].amount;
export const currency = (r: Rate) => r.retailRate.total[0].currency;

export function cheapest(hotel: Hotel) {
  return hotel.roomTypes.map((rt) => rt.rates[0]).sort((a, b) => total(a) - total(b))[0];
}

export function findRate(hotel: Hotel, offerId: string | null | undefined) {
  return (hotel.roomTypes.find((rt) => rt.offerId === offerId) ?? hotel.roomTypes[0]).rates[0];
}

export const refundable = (r: Rate) => r.cancellationPolicies.refundableTag === "RFN";

/** "Free cancellation until 13 Dec" from the first cancel policy. */
export function cancelBy(r: Rate) {
  const info = r.cancellationPolicies.cancelPolicyInfos[0];
  if (!refundable(r) || !info) return null;
  return new Date(`${info.cancelTime.replace(" ", "T")}Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

/** 9.1 → "Exceptional", the way review scores are worded on travel sites. */
export function ratingWord(score: number) {
  if (score >= 9) return "Exceptional";
  if (score >= 8.5) return "Excellent";
  if (score >= 8) return "Very good";
  if (score >= 7) return "Good";
  return "Review score";
}
