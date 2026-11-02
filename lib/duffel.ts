/**
 * Flight offers shaped like Duffel's Offer object (fields we show, same names),
 * so `searchOffers` can be swapped for POST /air/offer_requests without
 * touching the screens. Times are local to each airport, as Duffel sends them.
 */

export type Place = { iata_code: string; city_name: string; name: string };
export type Carrier = { name: string; iata_code: string; logo_symbol_url: string };

export type Baggage = { type: "carry_on" | "checked"; quantity: number };

export type Segment = {
  id: string;
  origin: Place;
  destination: Place;
  departing_at: string;
  arriving_at: string;
  duration: string;
  marketing_carrier: Carrier;
  marketing_carrier_flight_number: string;
  aircraft: { name: string };
  passengers: { cabin_class_marketing_name: string; baggages: Baggage[] }[];
};

export type Slice = {
  id: string;
  origin: Place;
  destination: Place;
  duration: string;
  fare_brand_name: string;
  segments: Segment[];
};

type Condition = { allowed: boolean; penalty_amount: string | null; penalty_currency: string | null } | null;

/** Paid extras from `available_services` (bags; seats come from seat maps). */
export type Service = {
  id: string;
  type: "baggage";
  total_amount: string;
  total_currency: string;
  maximum_quantity: number;
  metadata: { type: "checked"; maximum_weight_kg: number };
};

export type Offer = {
  id: string;
  owner: Carrier;
  slices: Slice[];
  base_amount: string;
  tax_amount: string;
  total_amount: string;
  total_currency: string;
  expires_at: string;
  total_emissions_kg: string;
  passenger_identity_documents_required: boolean;
  conditions: { refund_before_departure: Condition; change_before_departure: Condition };
  available_services: Service[];
};

/** What the traveller searched for; echoed in the results header. */
export const SEARCH = {
  from: "Lagos",
  to: "London",
  trip: "Round-Trip",
  dates: "Tue 15 Dec – Sat 9 Jan",
  passengers: "1 adult, Economy",
};

/* --------------------------------------------------------------------------
   Sample data
   -------------------------------------------------------------------------- */

const AIRPORTS: Record<string, Place & { utc: number }> = {
  LOS: { iata_code: "LOS", city_name: "Lagos", name: "Murtala Muhammed International", utc: 1 },
  LHR: { iata_code: "LHR", city_name: "London", name: "Heathrow", utc: 0 },
  LGW: { iata_code: "LGW", city_name: "London", name: "Gatwick", utc: 0 },
  IST: { iata_code: "IST", city_name: "Istanbul", name: "Istanbul Airport", utc: 3 },
  DXB: { iata_code: "DXB", city_name: "Dubai", name: "Dubai International", utc: 4 },
  CMN: { iata_code: "CMN", city_name: "Casablanca", name: "Mohammed V", utc: 1 },
  AMS: { iata_code: "AMS", city_name: "Amsterdam", name: "Schiphol", utc: 1 },
  ADD: { iata_code: "ADD", city_name: "Addis Ababa", name: "Bole International", utc: 3 },
};

const CARRIERS: Record<string, string> = {
  BA: "British Airways",
  VS: "Virgin Atlantic",
  P4: "Air Peace",
  TK: "Turkish Airlines",
  EK: "Emirates",
  AT: "Royal Air Maroc",
  KL: "KLM",
  ET: "Ethiopian Airlines",
};

function carrier(code: string): Carrier {
  return {
    name: CARRIERS[code],
    iata_code: code,
    logo_symbol_url: `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${code}.svg`,
  };
}

function iso(totalMinutes: number) {
  return `PT${Math.floor(totalMinutes / 60)}H${totalMinutes % 60}M`;
}

/** Minutes between two local times in different time zones. */
function elapsed(dep: string, depUtc: number, arr: string, arrUtc: number) {
  return (Date.parse(`${arr}Z`) - arrUtc * 3_600_000 - (Date.parse(`${dep}Z`) - depUtc * 3_600_000)) / 60_000;
}

type Bags = { checked: number };

function seg(flight: string, from: string, to: string, dep: string, arr: string, aircraft: string, bags: Bags): Segment {
  const code = flight.slice(0, 2);
  const a = AIRPORTS[from];
  const b = AIRPORTS[to];
  return {
    id: `seg_${flight}_${dep.slice(5, 10)}`,
    origin: a,
    destination: b,
    departing_at: `${dep}:00`,
    arriving_at: `${arr}:00`,
    duration: iso(elapsed(dep, a.utc, arr, b.utc)),
    marketing_carrier: carrier(code),
    marketing_carrier_flight_number: flight.slice(2),
    aircraft: { name: aircraft },
    passengers: [
      {
        cabin_class_marketing_name: "Economy",
        baggages: [
          { type: "carry_on", quantity: 1 },
          { type: "checked", quantity: bags.checked },
        ],
      },
    ],
  };
}

function slice(brand: string, segments: Segment[]): Slice {
  const first = segments[0];
  const last = segments[segments.length - 1];
  const a = AIRPORTS[first.origin.iata_code];
  const b = AIRPORTS[last.destination.iata_code];
  return {
    id: `sli_${first.id}`,
    origin: first.origin,
    destination: last.destination,
    duration: iso(elapsed(first.departing_at.slice(0, 16), a.utc, last.arriving_at.slice(0, 16), b.utc)),
    fare_brand_name: brand,
    segments,
  };
}

const allowed = (penalty: number | null): Condition =>
  penalty === null ? { allowed: false, penalty_amount: null, penalty_currency: null } : { allowed: true, penalty_amount: String(penalty), penalty_currency: "USD" };

function offer(input: {
  id: string;
  owner: string;
  total: number;
  out: (bags: Bags) => Segment[];
  back: (bags: Bags) => Segment[];
  brand: string;
  checked: number;
  refund: number | null;
  change: number | null;
  co2: number;
}): Offer {
  const bags = { checked: input.checked };
  const tax = Math.round(input.total * 0.38);
  return {
    id: input.id,
    owner: carrier(input.owner),
    slices: [slice(input.brand, input.out(bags)), slice(input.brand, input.back(bags))],
    base_amount: String(input.total - tax),
    tax_amount: String(tax),
    total_amount: String(input.total),
    total_currency: "USD",
    expires_at: "2026-12-01T12:30:00Z",
    total_emissions_kg: String(input.co2),
    passenger_identity_documents_required: true,
    conditions: { refund_before_departure: allowed(input.refund), change_before_departure: allowed(input.change) },
    available_services: [
      {
        id: `ase_${input.id}_bag`,
        type: "baggage",
        total_amount: input.checked ? "75" : "60",
        total_currency: "USD",
        maximum_quantity: 2,
        metadata: { type: "checked", maximum_weight_kg: 23 },
      },
    ],
  };
}

export const OFFERS: Offer[] = [
  offer({
    id: "off_ba75",
    owner: "BA",
    total: 1184,
    brand: "Economy Standard",
    checked: 1,
    refund: null,
    change: 150,
    co2: 1210,
    out: (b) => [seg("BA75", "LOS", "LHR", "2026-12-15T23:15", "2026-12-16T05:20", "Boeing 787-9", b)],
    back: (b) => [seg("BA75", "LHR", "LOS", "2027-01-09T10:40", "2027-01-09T17:55", "Boeing 787-9", b)],
  }),
  offer({
    id: "off_vs412",
    owner: "VS",
    total: 1096,
    brand: "Economy Classic",
    checked: 1,
    refund: 250,
    change: 0,
    co2: 1180,
    out: (b) => [seg("VS412", "LOS", "LHR", "2026-12-15T22:50", "2026-12-16T05:05", "Airbus A330-900", b)],
    back: (b) => [seg("VS411", "LHR", "LOS", "2027-01-09T11:15", "2027-01-09T18:40", "Airbus A330-900", b)],
  }),
  offer({
    id: "off_p4",
    owner: "P4",
    total: 742,
    brand: "Economy",
    checked: 2,
    refund: null,
    change: 100,
    co2: 1240,
    out: (b) => [seg("P47100", "LOS", "LGW", "2026-12-15T09:30", "2026-12-15T14:55", "Boeing 777-300", b)],
    back: (b) => [seg("P47101", "LGW", "LOS", "2027-01-09T18:00", "2027-01-10T01:05", "Boeing 777-300", b)],
  }),
  offer({
    id: "off_tk",
    owner: "TK",
    total: 689,
    brand: "EcoFly",
    checked: 1,
    refund: null,
    change: null,
    co2: 1520,
    out: (b) => [
      seg("TK626", "LOS", "IST", "2026-12-15T15:05", "2026-12-16T00:30", "Airbus A330-300", b),
      seg("TK1971", "IST", "LHR", "2026-12-16T07:45", "2026-12-16T09:55", "Boeing 777-300ER", b),
    ],
    back: (b) => [
      seg("TK1980", "LHR", "IST", "2027-01-09T12:15", "2027-01-09T18:20", "Boeing 777-300ER", b),
      seg("TK627", "IST", "LOS", "2027-01-10T01:50", "2027-01-10T06:15", "Airbus A330-300", b),
    ],
  }),
  offer({
    id: "off_at",
    owner: "AT",
    total: 612,
    brand: "Economy Saver",
    checked: 0,
    refund: null,
    change: null,
    co2: 1460,
    out: (b) => [
      seg("AT554", "LOS", "CMN", "2026-12-15T03:10", "2026-12-15T08:45", "Boeing 787-8", b),
      seg("AT800", "CMN", "LHR", "2026-12-15T11:20", "2026-12-15T14:45", "Boeing 737-800", b),
    ],
    back: (b) => [
      seg("AT801", "LHR", "CMN", "2027-01-09T16:10", "2027-01-09T19:30", "Boeing 737-800", b),
      seg("AT555", "CMN", "LOS", "2027-01-09T23:25", "2027-01-10T04:55", "Boeing 787-8", b),
    ],
  }),
  offer({
    id: "off_kl",
    owner: "KL",
    total: 958,
    brand: "Economy Standard",
    checked: 1,
    refund: 200,
    change: 75,
    co2: 1390,
    out: (b) => [
      seg("KL588", "LOS", "AMS", "2026-12-15T23:00", "2026-12-16T06:15", "Airbus A330-300", b),
      seg("KL1007", "AMS", "LHR", "2026-12-16T07:40", "2026-12-16T08:05", "Embraer 190", b),
    ],
    back: (b) => [
      seg("KL1000", "LHR", "AMS", "2027-01-09T06:40", "2027-01-09T09:00", "Embraer 190", b),
      seg("KL587", "AMS", "LOS", "2027-01-09T10:25", "2027-01-09T16:50", "Airbus A330-300", b),
    ],
  }),
  offer({
    id: "off_ek",
    owner: "EK",
    total: 1012,
    brand: "Economy Flex",
    checked: 1,
    refund: 150,
    change: 0,
    co2: 2380,
    out: (b) => [
      seg("EK784", "LOS", "DXB", "2026-12-15T16:40", "2026-12-16T02:50", "Boeing 777-300ER", b),
      seg("EK1", "DXB", "LHR", "2026-12-16T07:45", "2026-12-16T11:35", "Airbus A380-800", b),
    ],
    back: (b) => [
      seg("EK2", "LHR", "DXB", "2027-01-09T14:40", "2027-01-10T00:40", "Airbus A380-800", b),
      seg("EK783", "DXB", "LOS", "2027-01-10T09:50", "2027-01-10T14:20", "Boeing 777-300ER", b),
    ],
  }),
  offer({
    id: "off_et",
    owner: "ET",
    total: 655,
    brand: "Economy Saver",
    checked: 2,
    refund: null,
    change: 120,
    co2: 1980,
    out: (b) => [
      seg("ET900", "LOS", "ADD", "2026-12-15T13:45", "2026-12-15T21:10", "Boeing 787-8", b),
      seg("ET700", "ADD", "LHR", "2026-12-15T23:30", "2026-12-16T05:50", "Airbus A350-900", b),
    ],
    back: (b) => [
      seg("ET701", "LHR", "ADD", "2027-01-09T09:10", "2027-01-09T19:55", "Airbus A350-900", b),
      seg("ET901", "ADD", "LOS", "2027-01-09T22:30", "2027-01-10T02:15", "Boeing 787-8", b),
    ],
  }),
];

export function getOffer(id: string | null | undefined) {
  return OFFERS.find((o) => o.id === id) ?? OFFERS[0];
}

/* --------------------------------------------------------------------------
   Helpers the screens share
   -------------------------------------------------------------------------- */

export function stops(slice: Slice) {
  const n = slice.segments.length - 1;
  return n === 0 ? "Direct" : `${n} stop${n > 1 ? "s" : ""}`;
}

export function layovers(slice: Slice) {
  return slice.segments.slice(0, -1).map((s) => s.destination.iata_code);
}

/** Bags included per passenger, read from the first segment. */
export function includedBags(offer: Offer) {
  const bags = offer.slices[0].segments[0].passengers[0].baggages;
  return {
    carryOn: bags.find((b) => b.type === "carry_on")?.quantity ?? 0,
    checked: bags.find((b) => b.type === "checked")?.quantity ?? 0,
  };
}

/** Short refund / change summary from the offer's conditions. */
export function rules(offer: Offer) {
  const { refund_before_departure: refund, change_before_departure: change } = offer.conditions;
  return {
    refundable: Boolean(refund?.allowed),
    changeable: Boolean(change?.allowed),
    freeChange: change?.allowed && Number(change.penalty_amount) === 0,
  };
}
