/** Static copy for the marketing pages. Swap for real API data later. */

/** Everything FLYGO offers, in the header on desktop. About and Contact live in the footer. */
export const NAV_LINKS = [
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/hotels/search?type=apartments", label: "Apartments" },
  { href: "/private-jets", label: "Private jets" },
] as const;

export type Faq = {
  question: string;
  /** Leads with the direct answer, then the detail. */
  answer: string;
};

export const FAQS: Faq[] = [
  { question: "Are there booking fees?", answer: "No. The price you see includes taxes and fees." },
  {
    question: "Can I cancel?",
    answer: "It depends on the fare or room. Free cancellation is labelled before you pay.",
  },
  { question: "How long do refunds take?", answer: "Usually 5 to 10 working days after the airline or hotel approves it." },
  { question: "How do I pay?", answer: "By debit or credit card. You're only charged once your booking is confirmed." },
  { question: "How does jet sharing work?", answer: "Join a group flying your route and split the cost by seat." },
  {
    question: "Can I list my apartment?",
    answer: "Yes, with the same account. Add your place, verify your identity, and get paid to your bank.",
  },
  {
    question: "Why verify my identity?",
    answer: "It keeps hosts and travellers safe. It's needed for private jets, jet sharing and hosting.",
  },
];

export const FOOTER_LINKS = [
  {
    heading: "Links",
    links: [
      { label: "Flights", href: "/flights" },
      { label: "Hotels", href: "/hotels" },
      { label: "Apartments", href: "/hotels/search?type=apartments" },
      { label: "Private jets", href: "/private-jets" },
      { label: "Share a jet", href: "/private-jets#share" },
      { label: "List your place", href: "/host" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Help Centre", href: "/contact#faq" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
]

export const FOOTER_BLURB = "Flights, hotels, apartments and private jets, booked in minutes.";

export const FOOTER_CONTACT = {
  email: "advhghj@gmail.com",
  phone: "+00000000000",
  address: "Lagos, Nigeria",
};

/** Socials in the dark footer. Each key maps to an icon in <SocialIcon />. */
export const FOOTER_SOCIALS = [
  // Add each profile URL to show its icon; empty ones are hidden.
  { name: "facebook", label: "Facebook", href: "" },
  { name: "instagram", label: "Instagram", href: "" },
  { name: "tiktok", label: "TikTok", href: "" },
  { name: "x", label: "X", href: "" },
] as const;

/* --------------------------------------------------------------------------
   About page
   -------------------------------------------------------------------------- */

export const ABOUT_MISSION =
  "Flights, stays and private jets in one place, with the full price up front and real people to help.";

export const ABOUT_VISION =
  "The first place travellers in Africa turn to when they plan a trip.";

export type CoreValue = {
  title: string;
  body: string;
  /** Matches an icon in <ValueIcon />. */
  icon: "customer" | "innovation" | "transparency" | "safety";
};

export const CORE_VALUES: CoreValue[] = [
  {
    icon: "customer",
    title: "Travellers first",
    body: "Every choice starts with what makes your trip easier.",
  },
  {
    icon: "innovation",
    title: "Built to be fast",
    body: "Search and book in minutes.",
  },
  {
    icon: "transparency",
    title: "Honest pricing",
    body: "The price you see is the price you pay. No surprises.",
  },
  {
    icon: "safety",
    title: "Verified people",
    body: "Hosts and travellers confirm who they are.",
  },
];

/* --------------------------------------------------------------------------
   Contact page
   -------------------------------------------------------------------------- */

