/** Static copy for the marketing pages. Swap for real API data later. */

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const RESORT_COUNTRIES = [
  { region: "Caribbean", name: "Jamaica", budget: "$2099", love: "5k people love this", image: "/images/photos/hero-pool.webp" },
  { region: "Europe", name: "Greece", budget: "$1799", love: "1.5k people love this", image: "/images/photos/stay-santorini.webp" },
  { region: "South Asia", name: "Maldives", budget: "$3599", love: "3.5k people love this", image: "/images/photos/stay-overwater.webp" },
];

export type Hotel = {
  name: string;
  stars: number;
  address: string;
  score: string;
  reviews: string;
  price: string;
  image: string;
};

export const HOTELS: Hotel[] = [
  {
    name: "Leonardo London Heathrow Airport",
    stars: 5,
    address: "Bath Rd, Sipson, West Drayton UB7 0DP, UK",
    score: "9.6",
    reviews: "10125 reviews",
    price: "$799",
    image: "/images/photos/stay-suite.webp",
  },
  {
    name: "Sonder Kensington Gardens",
    stars: 5,
    address: "15 Prince of Wales Terrace, London W8 5PQ, UK",
    score: "9.4",
    reviews: "8420 reviews",
    price: "$650",
    image: "/images/photos/stay-infinity.webp",
  },
  {
    name: "Aviator Hotel Hampshire",
    stars: 4,
    address: "55 Farnborough Rd, Farnborough GU14 6EL, United Kingdom",
    score: "9.1",
    reviews: "6310 reviews",
    price: "$540",
    image: "/images/photos/stay-room.webp",
  },
  {
    name: "Crowne Plaza Gerrards Cross",
    stars: 5,
    address: "Oxford Rd, Beaconsfield HP9 2XE, United Kingdom",
    score: "9.5",
    reviews: "7788 reviews",
    price: "$720",
    image: "/images/photos/stay-twin.webp",
  },
  {
    name: "Vancouver Harbour Suites",
    stars: 5,
    address: "1128 W Hastings St, Vancouver, BC, Canada",
    score: "9.3",
    reviews: "5240 reviews",
    price: "$610",
    image: "/images/photos/stay-overwater.webp",
  },
  {
    name: "Berlin Mitte Grand",
    stars: 4,
    address: "Friedrichstrasse 96, 10117 Berlin, Germany",
    score: "9.0",
    reviews: "4180 reviews",
    price: "$430",
    image: "/images/photos/stay-santorini.webp",
  },
  {
    name: "Toronto Lakeside Residences",
    stars: 5,
    address: "10 Yonge St, Toronto, ON, Canada",
    score: "9.2",
    reviews: "6902 reviews",
    price: "$580",
    image: "/images/photos/stay-cliff.webp",
  },
  {
    name: "Porto Ribeira Boutique",
    stars: 4,
    address: "Cais da Ribeira 12, 4050-509 Porto, Portugal",
    score: "9.4",
    reviews: "3990 reviews",
    price: "$395",
    image: "/images/photos/lisbon-tram.webp",
  },
];

export type Faq = {
  question: string;
  /** Leads with the direct answer, then the detail. */
  answer: string;
};

export const FAQS: Faq[] = [
  {
    question: "Are there any booking fees?",
    answer:
      "No. The price you see includes taxes and fees where the provider shares them, and we never add a charge of our own at checkout.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "It depends on the fare or room you choose. Free-cancellation options are labelled clearly, and most stays can be cancelled up to 48 hours before check-in.",
  },
  {
    question: "How long does a refund take?",
    answer:
      "Usually 5 to 10 working days after the airline or hotel approves it. We email you at each step, and you can track it in your account.",
  },
  {
    question: "How does FLYGO find such low prices?",
    answer:
      "We search hundreds of airlines, hotels and travel sites at once. You see every price side by side, so you can pick the best deal without opening twenty tabs.",
  },
  {
    question: "Which payment methods can I use?",
    answer:
      "Debit and credit cards, Paystack and Flutterwave. Every payment is encrypted, and you're only charged once your booking is confirmed.",
  },
  {
    question: "Can I change the name or dates on my booking?",
    answer:
      "Dates can often be changed for a fare difference. Name changes depend on the airline, so contact us with your booking reference and we'll check for you.",
  },
  {
    question: "Can I book flights and hotels together?",
    answer:
      "Yes. Search a flight, then add a stay from the same trip page. Everything lands in one itinerary in your account.",
  },
  {
    question: "How do price alerts work?",
    answer:
      "Save a route or a hotel and we watch it for you. When the price drops, we email you so you can book at the right moment.",
  },
  {
    question: "Which currency will I be charged in?",
    answer:
      "The currency shown at checkout. You can switch currency before you pay, and the total is locked in once you confirm.",
  },
  {
    question: "How do I contact support about a booking?",
    answer:
      "By chat, phone or email, 24/7. Have your booking reference ready and we'll sort it quickly.",
  },
];

export type Deal = {
  city: string;
  country: string;
  duration: string;
  out: string;
  back: string;
  price: string;
  image: string;
};

/** Cheapest return fares from Lagos this week, for the deals rail. */
export const DEALS: Deal[] = [
  { city: "London", country: "United Kingdom", duration: "6h 25m, direct", out: "Tue 17/11", back: "Sun 22/11", price: "$433", image: "/images/photos/london.webp" },
  { city: "Dubai", country: "United Arab Emirates", duration: "7h 05m, direct", out: "Thu 19/11", back: "Mon 23/11", price: "$389", image: "/images/photos/dubai.webp" },
  { city: "Paris", country: "France", duration: "6h 40m, direct", out: "Wed 25/11", back: "Sun 29/11", price: "$471", image: "/images/photos/paris.webp" },
  { city: "Santorini", country: "Greece", duration: "9h 50m, 1 stop", out: "Fri 20/11", back: "Fri 27/11", price: "$612", image: "/images/photos/santorini.webp" },
  { city: "New York", country: "United States", duration: "11h 30m, direct", out: "Sat 21/11", back: "Sun 29/11", price: "$698", image: "/images/photos/new-york.webp" },
  { city: "Cape Town", country: "South Africa", duration: "6h 15m, direct", out: "Mon 23/11", back: "Mon 30/11", price: "$455", image: "/images/photos/cape-town.webp" },
  { city: "Lisbon", country: "Portugal", duration: "8h 10m, 1 stop", out: "Tue 24/11", back: "Sun 29/11", price: "$498", image: "/images/photos/lisbon.webp" },
];

export const FOOTER_LINKS = [
  {
    heading: "Links",
    links: [
      { label: "Flights", href: "/flights" },
      { label: "Hotels", href: "/hotels" },
      { label: "Apartments", href: "/hotels" },
      { label: "Private jets", href: "/contact?topic=private-jet" },
      { label: "Travel deals", href: "/flights" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Help Centre", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/about" },
      { label: "Privacy Policy", href: "/about" },
    ],
  },
]

export const FOOTER_BLURB = "Compare flights and stays from hundreds of sites. Book in minutes.";

export const FOOTER_CONTACT = {
  email: "advhghj@gmail.com",
  phone: "+00000000000",
  address: "Lagos, Nigeria",
};

/** Socials in the dark footer. Each key maps to an icon in <SocialIcon />. */
export const FOOTER_SOCIALS = [
  { name: "facebook", label: "Facebook", href: "#" },
  { name: "instagram", label: "Instagram", href: "#" },
  { name: "tiktok", label: "TikTok", href: "#" },
  { name: "x", label: "X", href: "#" },
] as const;

/* --------------------------------------------------------------------------
   About page
   -------------------------------------------------------------------------- */

export const ABOUT_MISSION =
  "One search for flights and stays, clear prices, and help from real people when plans change. We want booking a trip to take minutes, not evenings.";

export const ABOUT_VISION =
  "To be the first place travellers in Africa and beyond turn to when they plan a trip, because we are fast, honest about price and there when it matters.";

export type CoreValue = {
  title: string;
  body: string;
  /** Matches an icon in <ValueIcon />. */
  icon: "customer" | "innovation" | "transparency" | "sustainability";
};

export const CORE_VALUES: CoreValue[] = [
  {
    icon: "customer",
    title: "Travellers first",
    body: "Every decision starts with what makes the trip easier for you.",
  },
  {
    icon: "innovation",
    title: "Built to be fast",
    body: "Fast search, smart alerts and tools that save you time.",
  },
  {
    icon: "transparency",
    title: "Honest pricing",
    body: "The price you see is the price you pay. No surprises.",
  },
  {
    icon: "sustainability",
    title: "Travel responsibly",
    body: "We highlight greener options and travel more responsibly.",
  },
];

/* --------------------------------------------------------------------------
   Contact page
   -------------------------------------------------------------------------- */

