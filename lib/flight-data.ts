/** Static search results, booking copy and filter options. Swap for the real API later. */

export const TRIP = {
  route: "New Delhi - Dubai",
  from: "New Delhi",
  to: "Dubai",
  trip: "Round-Trip",
  dates: "Tue 15 Dec - Tue 22 Dec",
  passengers: "1 adult, Economy",
};

/* --------------------------------------------------------------------------
   Results
   -------------------------------------------------------------------------- */

export type SortMode = "best" | "cheapest" | "quickest";

/** One direction of a round trip. Times are local to each airport. */
export type FlightLeg = {
  depart: string;
  arrive: string;
  /** Lands the day after it leaves. */
  nextDay?: boolean;
  from: string;
  to: string;
  duration: string;
  minutes: number;
  stops: number;
  via?: string;
};

export type FlightResult = {
  id: string;
  airline: string;
  /** IATA code, shown as the airline's badge when there is no logo file. */
  code: string;
  logo: string | null;
  /* Outbound summary, kept flat for the booking screens. */
  depart: string;
  arrive: string;
  stops: string;
  duration: string;
  route: string;
  price: string;
  amount: number;
  outbound: FlightLeg;
  inbound: FlightLeg;
  cabin: string;
  provider: string;
  bags: { cabin: boolean; checked: boolean };
  freeCancellation?: boolean;
  seatsLeft?: number;
};

type ResultInput = Omit<FlightResult, "depart" | "arrive" | "stops" | "duration" | "route" | "price">;

export function stopLabel(leg: FlightLeg) {
  return leg.stops === 0 ? "Direct" : `${leg.stops} stop${leg.stops > 1 ? "s" : ""}`;
}

/** Fills the flat outbound fields from the structured legs. */
function result(input: ResultInput): FlightResult {
  const leg = input.outbound;
  return {
    ...input,
    depart: leg.depart,
    arrive: leg.arrive,
    stops: stopLabel(leg),
    duration: leg.duration,
    route: `${leg.from}-${leg.to}`,
    price: `$${input.amount}`,
  };
}

export const FLIGHT_RESULTS: FlightResult[] = [
  result({
    id: "ek-511",
    airline: "Emirates",
    code: "EK",
    logo: "/images/airlines/emirates.svg",
    amount: 412,
    outbound: { depart: "04:15", arrive: "06:25", from: "DEL", to: "DXB", duration: "3h 40m", minutes: 220, stops: 0 },
    inbound: { depart: "22:05", arrive: "03:10", nextDay: true, from: "DXB", to: "DEL", duration: "3h 35m", minutes: 215, stops: 0 },
    cabin: "Economy",
    provider: "FLYGO",
    bags: { cabin: true, checked: true },
    freeCancellation: true,
  }),
  result({
    id: "fz-438",
    airline: "flydubai",
    code: "FZ",
    logo: null,
    amount: 286,
    outbound: { depart: "09:40", arrive: "11:55", from: "DEL", to: "DXB", duration: "3h 45m", minutes: 225, stops: 0 },
    inbound: { depart: "14:30", arrive: "19:20", from: "DXB", to: "DEL", duration: "3h 20m", minutes: 200, stops: 0 },
    cabin: "Economy",
    provider: "wego",
    bags: { cabin: true, checked: false },
    seatsLeft: 3,
  }),
  result({
    id: "ai-995",
    airline: "Air India",
    code: "AI",
    logo: null,
    amount: 318,
    outbound: { depart: "19:50", arrive: "22:10", from: "DEL", to: "DXB", duration: "3h 50m", minutes: 230, stops: 0 },
    inbound: { depart: "23:45", arrive: "04:30", nextDay: true, from: "DXB", to: "DEL", duration: "3h 15m", minutes: 195, stops: 0 },
    cabin: "Economy",
    provider: "mytrip",
    bags: { cabin: true, checked: true },
  }),
  result({
    id: "6e-25",
    airline: "IndiGo",
    code: "6E",
    logo: null,
    amount: 264,
    outbound: { depart: "02:05", arrive: "04:30", from: "DEL", to: "DXB", duration: "3h 55m", minutes: 235, stops: 0 },
    inbound: { depart: "05:35", arrive: "10:40", from: "DXB", to: "DEL", duration: "3h 35m", minutes: 215, stops: 0 },
    cabin: "Economy",
    provider: "City.Travel",
    bags: { cabin: true, checked: false },
    seatsLeft: 5,
  }),
  result({
    id: "qr-579",
    airline: "Qatar Airways",
    code: "QR",
    logo: null,
    amount: 349,
    outbound: { depart: "03:55", arrive: "09:40", from: "DEL", to: "DXB", duration: "7h 15m", minutes: 435, stops: 1, via: "DOH" },
    inbound: { depart: "16:20", arrive: "02:50", nextDay: true, from: "DXB", to: "DEL", duration: "9h 00m", minutes: 540, stops: 1, via: "DOH" },
    cabin: "Economy",
    provider: "FLYGO",
    bags: { cabin: true, checked: true },
    freeCancellation: true,
  }),
  result({
    id: "ey-211",
    airline: "Etihad",
    code: "EY",
    logo: null,
    amount: 331,
    outbound: { depart: "08:35", arrive: "14:05", from: "DEL", to: "DXB", duration: "7h 00m", minutes: 420, stops: 1, via: "AUH" },
    inbound: { depart: "10:15", arrive: "18:30", from: "DXB", to: "DEL", duration: "6h 45m", minutes: 405, stops: 1, via: "AUH" },
    cabin: "Economy",
    provider: "lucky2go",
    bags: { cabin: true, checked: true },
  }),
  result({
    id: "ek-513",
    airline: "Emirates",
    code: "EK",
    logo: "/images/airlines/emirates.svg",
    amount: 438,
    outbound: { depart: "15:05", arrive: "17:15", from: "DEL", to: "DXB", duration: "3h 40m", minutes: 220, stops: 0 },
    inbound: { depart: "09:50", arrive: "15:05", from: "DXB", to: "DEL", duration: "3h 45m", minutes: 225, stops: 0 },
    cabin: "Economy",
    provider: "FLYGO",
    bags: { cabin: true, checked: true },
    freeCancellation: true,
  }),
  result({
    id: "sg-11",
    airline: "SpiceJet",
    code: "SG",
    logo: null,
    amount: 249,
    outbound: { depart: "22:40", arrive: "01:20", nextDay: true, from: "DEL", to: "DXB", duration: "4h 10m", minutes: 250, stops: 0 },
    inbound: { depart: "02:45", arrive: "08:05", from: "DXB", to: "DEL", duration: "3h 50m", minutes: 230, stops: 0 },
    cabin: "Economy",
    provider: "wego",
    bags: { cabin: true, checked: false },
  }),
];

/** Cheapest fare for each departure day around the searched date. */
export const DATE_PRICES = [
  { day: "Fri 11 Dec", price: 298 },
  { day: "Sat 12 Dec", price: 312 },
  { day: "Sun 13 Dec", price: 276 },
  { day: "Mon 14 Dec", price: 259 },
  { day: "Tue 15 Dec", price: 249 },
  { day: "Wed 16 Dec", price: 268 },
  { day: "Thu 17 Dec", price: 301 },
  { day: "Fri 18 Dec", price: 334 },
];

/** Agencies offering the selected itinerary, shown in the compare modal. */
export const PROVIDERS = [
  { name: "Flygo Bookings", logo: "/images/logo.svg", price: "N2,800,000" },
  { name: "City.Travel", logo: "/images/providers/city-travel.svg", price: "N2,800,000" },
  { name: "lucky2go", logo: "/images/providers/lucky2go.svg", price: "N2,800,000" },
  { name: "mytrip", logo: "/images/providers/mytrip.svg", price: "N2,800,000" },
  { name: "wego", logo: "/images/providers/wego.svg", price: "N2,800,000" },
];

export const AIRLINE_FILTERS = ["Emirates", "flydubai", "Air India", "IndiGo", "Qatar Airways", "Etihad", "SpiceJet"];

export const PRICE_RANGE = { min: "$249", max: "$438" };
export const TIME_RANGE = { min: "00:00", max: "23:59" };

/* --------------------------------------------------------------------------
   Booking
   -------------------------------------------------------------------------- */

export const BOOKING_STEPS = [
  { ordinal: "Step Two", label: "Flight and traveler details" },
  { ordinal: "Step Three", label: "Seat reservation& additional service" },
  { ordinal: "Step four", label: "Payment" },
];

export const FARE_SUMMARY = {
  travellers: "$123,000",
  travellerNote: "Adult =(1)",
  protectionLabel: "Trip protection",
  protection: "$12,00",
  total: "$135,000",
};

export const TRAVELER_NOTICE =
  "Please enter the traveler's name and date of birth exactly as shown on the passport (for international flights) or valid government-issued photo ID (for domestic flights) to be used on this trip. Name changes are not permitted after booking";

export const PROTECTION_REASONS = [
  "Illness, injury, or death of you, a family member, a business partner, domestic partner or a traveling companion.",
  "Theft of passport or visas",
  "Traffic accident on the way to airport",
  "Revocation of your previously granted military leave or re-assignment due to war",
  "Airline bankruptcy",
  "Trip interruption",
];

export const ADDITIONAL_SERVICES = [
  {
    title: "Travel Assist classic",
    body: "Personal concierge desk access to know everything you need about shopping, events, dining, night life, loca travel",
  },
  {
    title: "Travel watcher",
    body: "Personal concierge desk access to know everything you need about shopping, events, dining, night life, loca travel",
  },
];

export const SMS_SERVICES = [
  {
    title: "Phone notification",
    body: "24/7, i want to know about the change in my flight schedule or cancellation of flight via my cell phone.",
  },
  {
    title: "Email notification",
    body: "24/7, i want to know about the change in my flight schedule or cancellation of flight via my cell phone",
  },
];

export const SEAT_OPTIONS = ["front Seat 234", "front Seat 235", "aisle Seat 12C", "window Seat 14A"];

export const PAYMENT_METHODS = [
  { id: "card", label: "Debit or credit card" },
  { id: "flutterwave", label: "Futterwave" },
  { id: "paystack", label: "Paystack" },
];

/** Boarding-pass summary on the confirmation screen. */
export const BOOKED_TRIP = {
  passenger: "Mr. Blake Jonathan",
  seat: "4C",
  price: "$2,399",
  legs: [
    {
      carrier: "Vistara + Emirates",
      logo: null as string | null,
      departTime: "4:50 PM",
      departCode: "DEL",
      arriveTime: "8:40 AM",
      arriveCode: "IAD",
      nextDay: true,
      duration: "25h 20m",
      stops: "2 stops",
      via: "BOM, DXB",
    },
    {
      carrier: "Emirates",
      logo: "/images/airlines/emirates.svg",
      departTime: "10:55 AM",
      departCode: "IAD",
      arriveTime: "2:45 PM",
      arriveCode: "DEL",
      nextDay: true,
      duration: "18h 20m",
      stops: "1 stop",
      via: "DXB",
    },
  ],
};

/* --------------------------------------------------------------------------
   Home page
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   AI trip planner
   -------------------------------------------------------------------------- */

