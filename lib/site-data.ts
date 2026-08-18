/** Static copy for the marketing pages. Swap for real API data later. */

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type FlightDeal = {
  from: string;
  to: string;
  price: string;
  trip: string;
  image: string;
};

export const FLIGHT_DEALS: FlightDeal[] = [
  { from: "NewYork", to: "Portugal", price: "$799", trip: "Round trip", image: "/images/cards/porto-tram.svg" },
  { from: "Lagos", to: "Miami", price: "$859", trip: "Round trip", image: "/images/cards/toronto.svg" },
  { from: "London", to: "Paris", price: "$1199", trip: "Round trip", image: "/images/cards/paris.svg" },
  { from: "London", to: "Paris", price: "$1199", trip: "Round trip", image: "/images/cards/porto-tram.svg" },
];

export type PopularDestination = {
  region: string;
  name: string;
  price: string;
  trip: string;
  image: string;
};

export const POPULAR_DESTINATIONS: PopularDestination[] = [
  { region: "United Kingdom", name: "London", price: "$799", trip: "One way", image: "/images/cards/london.svg" },
  { region: "Ottawa", name: "Canada", price: "$799", trip: "Round trip", image: "/images/cards/vancouver.svg" },
  { region: "Berlin", name: "Germany", price: "$799", trip: "Round trip", image: "/images/cards/berlin.svg" },
];

export const RESORT_COUNTRIES = [
  { region: "Caribbean", name: "Jamaica", budget: "$2099", love: "5k people love this", image: "/images/cards/london.svg" },
  { region: "Europe", name: "Spain", budget: "$1799", love: "1.5k people love this", image: "/images/cards/vancouver.svg" },
  { region: "South Asia", name: "Maldives", budget: "$3599", love: "3.5k people love this", image: "/images/cards/berlin.svg" },
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
    image: "Hotel entrance",
  },
  {
    name: "Sonder Kensington Gardens",
    stars: 5,
    address: "15 Prince of Wales Terrace, London W8 5PQ, UK",
    score: "9.6",
    reviews: "10125 reviews",
    price: "$799",
    image: "Hotel suite",
  },
  {
    name: "Aviator Hotel Hampshire",
    stars: 5,
    address: "55 Farnborough Rd, Farnborough GU14 6EL, United Kingdom",
    score: "9.6",
    reviews: "10125 reviews",
    price: "$799",
    image: "Hotel lounge",
  },
  {
    name: "Crowne Plaza Gerrards Cross",
    stars: 5,
    address: "Oxford Rd, Beaconsfield HP9 2XE, United Kingdom",
    score: "9.6",
    reviews: "10125 reviews",
    price: "$799",
    image: "Hotel exterior",
  },
];

export const LOVED_DESTINATIONS = [
  {
    heading: "Family resorts",
    items: ["Jean-Michel Cousteau Resort", "Hotel Del Coronado", "Aulani in Hawaii"],
  },
  {
    heading: "Luxury Retreats",
    items: ["Soneva Fushi", "Olympic Lagoon Resorts, Ayia Napa", "Delphin Imperial Hotel"],
  },
  {
    heading: "Eco-Friendly Escapes",
    items: [
      "Four Seasons Resort Seychelles",
      "Ayana Resort Bali",
      "he Westin Dragonara Resort, Malta.",
    ],
  },
  {
    heading: "Romantic Hideaways",
    items: ["Giraffe Manor", "Capella Ubud, Bali, Indonesia.", "Recanto Alvorada Eco Resort"],
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Seamless Booking:",
    body: "Effortlessly find and book the perfect flights and hotels with just a few clicks.",
  },
  {
    title: "Unrivaled Selection:",
    body: "Explore a vast range of destinations and accommodations to suit every budget and preference.",
  },
  {
    title: "Unforgettable Experiences:",
    body: "Unlock unique travel experiences and create lasting memories at top-rated hotels and resorts.",
  },
  {
    title: "Peace of Mind:",
    body: "Rest easy with secure payment options and expert customer support at your service.",
  },
  {
    title: "Journey with Confidence:",
    body: "Our commitment to safety ensures your travel plans are in reliable hands.",
  },
];

export const JOURNALS = [
  {
    title: "Travelling Solo, a beginners guide",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Sed cras pharetra dictumst sed ultrices a. Quam purus tortor nibh viverra sed mattis mi elit sit.",
    author: "Joshua Moris",
    date: "15 June 2023.",
  },
  {
    title: "Travelling Solo, a beginners guide",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Sed cras pharetra dictumst sed ultrices a. Quam purus tortor nibh viverra sed mattis mi elit sit.",
    author: "Joshua Moris",
    date: "15 June 2023.",
  },
  {
    title: "Travelling Solo, a beginners guide",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur. Sed cras pharetra dictumst sed ultrices a. Quam purus tortor nibh viverra sed mattis mi elit sit.",
    author: "Joshua Moris",
    date: "15 June 2023.",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  /** Whole stars out of five. Mixed scores keep the wall of praise believable. */
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jane Smith",
    role: "Freelance Designer",
    rating: 5,
    quote:
      "I've been using this web hosting service for over a year and I'm really impressed with the uptime and support. The website has never gone down and the customer service is always quick to help with any issues I have. Highly recommend!",
  },
  {
    name: "Tom Williams",
    role: "Software Developer",
    rating: 3,
    quote:
      "I've been using this web hosting service for a few months now and overall it's been fine. The uptime has been good and I haven't had any major issues. The pricing is also reasonable. Nothing particularly stands out as exceptional, but it gets the job done.",
  },
  {
    name: "Michael Brown",
    role: "Online Entrepreneur",
    rating: 1,
    quote:
      "I've been using this web hosting service for a few months and it's been nothing but problems. My website has gone down multiple times and the customer service has been unresponsive. I would not recommend this company.",
  },
  {
    name: "Sarah Johnson",
    role: "Blogger",
    rating: 5,
    quote:
      "I was a little hesitant to switch to a new web hosting company, but I'm glad I took the plunge. The control panel is user-friendly and I love the one-click installation for popular apps. Everything has been smooth sailing since I made the switch.",
  },
  {
    name: "Favour Dennis",
    role: "UI/UX Designer",
    rating: 5,
    quote:
      "Customer testimonials are more effective than paid marketing copy as they take the spotlight away from the seller to shine it on the customers.",
  },
  {
    name: "Daniel Ibe",
    role: "Photographer",
    rating: 4,
    quote:
      "Booking took under two minutes and the trip ran exactly as planned. I have used Flygo for every trip since.",
  },
];

export const FAQS = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Of course. You can upgrade, downgrade or cancel your plan at any time from your account settings, and changes take effect on your next billing cycle.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancel any time. Bookings cancelled at least 48 hours before departure are refunded in full; later cancellations follow the operator's own policy.",
  },
  {
    question: "Can other info be added to an invoice?",
    answer:
      "Yes. Add a company name, VAT number, purchase order reference or any custom note to an invoice before it is issued.",
  },
  {
    question: "How does billing work?",
    answer:
      "You are charged once per booking, and subscriptions bill monthly on the date you signed up. Every charge appears in your billing history.",
  },
  {
    question: "How do I change my account email?",
    answer:
      "Open your profile settings, enter the new address and confirm it with the six-digit code we send there.",
  },
];

export const FOOTER_LINKS = [
  {
    heading: "Quick Links",
    links: [
      { label: "Flights", href: "/" },
      { label: "Hotels", href: "/hotels" },
      { label: "About us", href: "/about" },
      { label: "Blog", href: "/about" },
      { label: "Cotact us", href: "/contact" },
    ],
  },
  {
    heading: "Customer Support",
    links: [
      { label: "FAQ", href: "/about" },
      { label: "Help Center", href: "/contact" },
      { label: "Terms & Conditions", href: "/about" },
      { label: "Privacy Policy", href: "/about" },
      { label: "Refund Policy", href: "/about" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms and Condition", href: "/about" },
      { label: "Privacy Policy", href: "/about" },
      { label: "Cookies Policy", href: "/about" },
      { label: "Developers", href: "/about" },
    ],
  },
];

export const FOOTER_BLURB =
  "Travel is not just about where you go, but the memories you make and the experiences that shape you. Let us help you make the most of every journey.";

export const FOOTER_CONTACT = {
  email: "advhghj@gmail.com",
  phone: "+00000000000",
  address: "Lagos, Nigeria",
};

/** Socials in the dark footer. Each key maps to an icon in <SocialIcon />. */
export const FOOTER_SOCIALS = [
  { name: "facebook", label: "Facebook", href: "#" },
  { name: "twitter", label: "Twitter", href: "#" },
  { name: "linkedin", label: "LinkedIn", href: "#" },
  { name: "youtube", label: "YouTube", href: "#" },
  { name: "instagram", label: "Instagram", href: "#" },
  { name: "tiktok", label: "TikTok", href: "#" },
] as const;

/* --------------------------------------------------------------------------
   About page
   -------------------------------------------------------------------------- */

export const ABOUT_MISSION =
  "Our mission is to transform the way you travel by providing a comprehensive, user-friendly platform that seamlessly connects you to the best flight options and ideal accommodations. We strive to eliminate the stress of trip planning, ensuring a smooth, secure, and enjoyable booking experience that caters to your unique travel needs\u2014whether for business, leisure, or adventure.";

export const ABOUT_VISION =
  "Our vision is to become the world's most trusted and innovative travel companion, redefining how people explore the globe. We aspire to make travel more accessible, enjoyable, and personalized by leveraging cutting-edge technology and a customer-first approach. Our goal is to empower travelers with seamless experiences\u2014from booking flights to finding perfect accommodations\u2014while fostering a global community united by adventure, connection, and unforgettable memories.";

export type CoreValue = {
  title: string;
  body: string;
  /** Matches an icon in <ValueIcon />. */
  icon: "customer" | "innovation" | "transparency" | "sustainability";
};

export const CORE_VALUES: CoreValue[] = [
  {
    icon: "customer",
    title: "Customer-Centric",
    body: "Our customers are at the heart of everything we do. We are dedicated to providing personalized experiences, seamless support, and services that prioritize your comfort and convenience throughout your journey.",
  },
  {
    icon: "innovation",
    title: "Innovation",
    body: "We embrace the power of technology to transform travel experiences. From AI-powered recommendations to intuitive booking flows, we are constantly improving to make your trips smarter, faster, and more enjoyable.",
  },
  {
    icon: "transparency",
    title: "Transparency",
    body: "We believe trust is built through honesty and clarity. That's why we ensure upfront pricing, reliable services, and clear policies, empowering you to make informed travel decisions with confidence.",
  },
  {
    icon: "sustainability",
    title: "Sustainability",
    body: "We care about our planet and promote responsible travel practices. From eco-friendly stays to reducing our carbon footprint, we are committed to making travel better for you and for future generations.",
  },
];

/* --------------------------------------------------------------------------
   Contact page
   -------------------------------------------------------------------------- */

export const CONTACT_INFO = [
  {
    heading: "Customer Support:",
    lines: [
      "Phone:\n+123-456-7890",
      "Email: support@yourwebsite.com",
      "Live Chat: Available 24/7",
    ],
  },
  {
    heading: "Business Inquiries:",
    lines: [
      "Email:\npartnerships@yourwebsite.com",
      "Assistance hours:\nMonday - Friday 6 am to 8 pm EST",
    ],
  },
];

export const CONTACT_SOCIAL_LINKS = ["Instagram", "Twitter", "Facebook", "LinkedIn"];
