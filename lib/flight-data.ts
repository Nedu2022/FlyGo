/** Static search results, booking copy and filter options. Swap for the real API later. */

export const TRIP = {
  route: "New Delhi - Dubai",
  from: "New Delhi",
  to: "Dubai",
  trip: "Round-Trip",
  dates: "12 Sept 23 - 18 Sept 23",
  passengers: "1 Passenger, Business",
};

/* --------------------------------------------------------------------------
   Results
   -------------------------------------------------------------------------- */

export const SORT_TABS = [
  { label: "Cheapest", price: "$99", duration: "2h 18m" },
  { label: "Best", price: "$99", duration: "2h 18m" },
  { label: "Quickest", price: "$99", duration: "2h 18m" },
];

export const RESULT_COUNT = { showing: 4, total: "257 places" };

export const SORT_MODES = ["Recommended", "Price: low to high", "Duration", "Departure time"];

export type FlightResult = {
  id: string;
  airline: string;
  logo: string;
  depart: string;
  arrive: string;
  stops: string;
  duration: string;
  route: string;
  price: string;
};

export const FLIGHT_RESULTS: FlightResult[] = [
  {
    id: "em-1",
    airline: "Emirates",
    logo: "/images/airlines/emirates.svg",
    depart: "12:00 pm",
    arrive: "06:00 pm",
    stops: "non stop",
    duration: "6h 0m",
    route: "DEL-DXB",
    price: "$310",
  },
  {
    id: "em-2",
    airline: "Emirates",
    logo: "/images/airlines/emirates.svg",
    depart: "12:00 pm",
    arrive: "06:00 pm",
    stops: "non stop",
    duration: "6h 0m",
    route: "DEL-DXB",
    price: "$310",
  },
  {
    id: "em-3",
    airline: "Emirates",
    logo: "/images/airlines/emirates.svg",
    depart: "12:00 pm",
    arrive: "06:00 pm",
    stops: "non stop",
    duration: "6h 0m",
    route: "DEL-DXB",
    price: "$310",
  },
  {
    id: "em-4",
    airline: "Emirates",
    logo: "/images/airlines/emirates.svg",
    depart: "12:00 pm",
    arrive: "06:00 pm",
    stops: "non stop",
    duration: "6h 0m",
    route: "DEL-DXB",
    price: "$310",
  },
];

/** Agencies offering the selected itinerary, shown in the compare modal. */
export const PROVIDERS = [
  { name: "Flygo Bookings", logo: "/images/logo.svg", price: "N2,800,000" },
  { name: "City.Travel", logo: "/images/providers/city-travel.svg", price: "N2,800,000" },
  { name: "lucky2go", logo: "/images/providers/lucky2go.svg", price: "N2,800,000" },
  { name: "mytrip", logo: "/images/providers/mytrip.svg", price: "N2,800,000" },
  { name: "wego", logo: "/images/providers/wego.svg", price: "N2,800,000" },
];

export const RATING_FILTERS = ["0+", "1+", "2+", "3+", "4+"];

export const AIRLINE_FILTERS = ["Emirated", "Fly Dubai", "Qatar", "Etihad"];

export const PRICE_RANGE = { min: "$50", max: "$1200" };
export const TIME_RANGE = { min: "12:00Am", max: "12:00Pm" };

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

export type Destination = {
  name: string;
  country: string;
  rating: string;
  reviews: string;
  price: string;
  image: string;
};

export const TRENDING: Destination[] = [
  { name: "Bali", country: "Indonesia", rating: "4.5/5", reviews: "2.312 Reviews", price: "$150", image: "/images/cards/carousel.svg" },
  { name: "Paris", country: "France", rating: "4.9/5", reviews: "5.431 Reviews", price: "$125", image: "/images/cards/conservatory.svg" },
  { name: "Italy", country: "Rome", rating: "4.6/5", reviews: "3.910 Reviews", price: "$45", image: "/images/cards/lion.svg" },
  { name: "Barcelona", country: "Spain", rating: "4.9/5", reviews: "10.322 Reviews", price: "$200", image: "/images/cards/london.svg" },
  { name: "Cancun", country: "Mexico", rating: "4.9/5", reviews: "8.114 Reviews", price: "$180", image: "/images/cards/vancouver.svg" },
  { name: "Berlin", country: "Germany", rating: "4.4/5", reviews: "1.902 Reviews", price: "$95", image: "/images/cards/berlin.svg" },
  { name: "Porto", country: "Portugal", rating: "4.7/5", reviews: "2.884 Reviews", price: "$110", image: "/images/cards/porto-tram.svg" },
  { name: "Toronto", country: "Canada", rating: "4.5/5", reviews: "4.230 Reviews", price: "$260", image: "/images/cards/toronto.svg" },
];

export const ADVENTURE_CATEGORIES = [
  "Trending",
  "5-Star",
  "Asian",
  "Europe",
  "Middle-East",
  "Budget-Friendly",
  "Adventure",
  "Safari",
];

export const STORIES = Array.from({ length: 6 }, (_, i) => ({
  id: `story-${i + 1}`,
  title: "How to Plan a Dream Vacation Without Breaking the Bank",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
}));

/* --------------------------------------------------------------------------
   AI trip planner
   -------------------------------------------------------------------------- */

export const PLANNER_BUDGETS = ["$100 - $500", "$500 - $1,500", "$1,500 - $5,000", "$5,000+"];
export const PLANNER_TRIP_TYPES = [
  "Family Vacation",
  "Solo Adventure",
  "Romantic Getaway",
  "Business Trip",
];
export const PLANNER_WHEN = ["$100 - $500", "Next month", "In 3 months", "Flexible"];
export const PLANNER_INTERESTS = [
  "Beaches",
  "Mountains",
  "City Life",
  "Adventure Sports",
  "Cultural Experiences",
  "Wellness & Relaxation",
];
export const PLANNER_PARTY = ["2-5", "1", "6-10", "10+"];
export const PLANNER_STAY = ["Apartments", "Hotels", "Resorts", "Villas"];
