/** Static host-dashboard data. Swap for real API data later. */

export type NavItem = {
  href: string;
  label: string;
  /** Matches a key in <DashIcon />. */
  icon: string;
};

export const DASH_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/properties", label: "My Properties", icon: "properties" },
  { href: "/dashboard/availability", label: "Availability", icon: "availability" },
  { href: "/dashboard/bookings", label: "Bookings", icon: "bookings" },
  { href: "/dashboard/messages", label: "Messages", icon: "messages" },
  { href: "/dashboard/earnings", label: "Earnings", icon: "earnings" },
  { href: "/dashboard/reviews", label: "Reviews and feedback", icon: "reviews" },
  { href: "/dashboard/insights", label: "Insights", icon: "insights" },
  { href: "/dashboard/settings", label: "Profile and Settings", icon: "settings" },
  { href: "/dashboard/support", label: "Help and support", icon: "support" },
];

export type StatTile = {
  value: string;
  label: string;
  action: string;
  href: string;
  /** Tile background and icon colour pairing. */
  tone: "rose" | "amber" | "mint" | "lilac";
  icon: string;
};

export const STAT_TILES: StatTile[] = [
  {
    value: "$1k",
    label: "Total Earnings",
    action: "View Earnings",
    href: "/dashboard/earnings",
    tone: "rose",
    icon: "chart",
  },
  {
    value: "5",
    label: "Upcoming Bookings",
    action: "Manage Bookings",
    href: "/dashboard/bookings",
    tone: "amber",
    icon: "file",
  },
  {
    value: "1,200",
    label: "Total Property Views",
    action: "View Analytics",
    href: "/dashboard/insights",
    tone: "mint",
    icon: "pencil",
  },
  {
    value: "4.8/5",
    label: "Guest Reviews",
    action: "Read Reviews",
    href: "/dashboard/reviews",
    tone: "lilac",
    icon: "person",
  },
];

export type RevenueMonth = { month: string; online: number; offline: number };

/** Revenue in dollars; the chart scales itself to AXIS_MAX. */
export const REVENUE: RevenueMonth[] = [
  { month: "January", online: 14000, offline: 12800 },
  { month: "February", online: 17000, offline: 12200 },
  { month: "March", online: 5800, offline: 22500 },
  { month: "April", online: 15500, offline: 6200 },
  { month: "May", online: 12200, offline: 12000 },
  { month: "June", online: 16200, offline: 13500 },
  { month: "July", online: 21000, offline: 11000 },
];

export const REVENUE_AXIS_MAX = 25000;

export type Notification = {
  name: string;
  message: string;
  time: string;
};

export const NOTIFICATIONS: Notification[] = [
  { name: "Isabella Becker", message: "Sales dashboard have been created", time: "9:30 am" },
  { name: "Adam Warren", message: "You have done a great job #TW111", time: "10:30 am" },
  { name: "Leonard Thornton", message: "Sales dashboard have been created", time: "11:30 am" },
];

export type Property = {
  rank: string;
  name: string;
  /** Share of the popularity rail, 0–100. */
  popularity: number;
  sales: string;
  tone: "blue" | "green" | "purple" | "orange";
};

export const TOP_PROPERTIES: Property[] = [
  { rank: "01", name: "Home  Range", popularity: 80, sales: "45%", tone: "blue" },
  { rank: "02", name: "Princess Court", popularity: 62, sales: "29%", tone: "green" },
  { rank: "03", name: "Beach house", popularity: 55, sales: "18%", tone: "purple" },
  { rank: "04", name: "Rivadale", popularity: 36, sales: "25%", tone: "orange" },
];

export type Todo = { id: string; label: string; done: boolean };

export const TODOS: Todo[] = [
  { id: "calendar", label: "Update your calender", done: false },
  { id: "verify-id", label: "verify your id", done: true },
  { id: "listing", label: "Add new lisiting", done: false },
  { id: "videos", label: "upload  videos to your properties", done: true },
  { id: "pro", label: "Go pro", done: false },
];

export type Booking = {
  guest: string;
  property: string;
  bill: string;
  checkIn: string;
  duration: string;
  status: "Completed" | "Pending" | "Cancelled";
  action: "Approved" | "Review" | "Declined";
};

export const BOOKINGS: Booking[] = [
  { guest: "Blake", property: "Austin home", bill: "$500", checkIn: "21 Sep 2018", duration: "3 nights", status: "Completed", action: "Approved" },
  { guest: "Amara", property: "Beach house", bill: "$720", checkIn: "24 Sep 2018", duration: "4 nights", status: "Pending", action: "Review" },
  { guest: "Blake", property: "Austin home", bill: "$500", checkIn: "21 Sep 2018", duration: "3 nights", status: "Completed", action: "Approved" },
  { guest: "Nadia", property: "Princess Court", bill: "$1,150", checkIn: "28 Sep 2018", duration: "6 nights", status: "Completed", action: "Approved" },
  { guest: "Blake", property: "Austin home", bill: "$500", checkIn: "21 Sep 2018", duration: "3 nights", status: "Cancelled", action: "Declined" },
  { guest: "Tomas", property: "Rivadale", bill: "$430", checkIn: "02 Oct 2018", duration: "2 nights", status: "Completed", action: "Approved" },
  { guest: "Blake", property: "Austin home", bill: "$500", checkIn: "21 Sep 2018", duration: "3 nights", status: "Pending", action: "Review" },
  { guest: "Ife", property: "Home  Range", bill: "$860", checkIn: "06 Oct 2018", duration: "5 nights", status: "Completed", action: "Approved" },
];

export const QUICK_LINKS = [
  { label: "Add a new listing", href: "/dashboard/properties", icon: "properties" },
  { label: "Block out dates", href: "/dashboard/availability", icon: "availability" },
  { label: "Message a guest", href: "/dashboard/messages", icon: "messages" },
  { label: "Request a payout", href: "/dashboard/earnings", icon: "earnings" },
];

export const HOST = {
  firstName: "Alex",
  displayName: "Musfiq",
  role: "Admin",
};

/* --------------------------------------------------------------------------
   My Properties
   -------------------------------------------------------------------------- */

export type Listing = {
  id: string;
  name: string;
  views: string;
  upcoming: string;
  image: string;
  live: boolean;
  guests: string[];
};

const GUESTS = ["Ada Obi", "Sam Reid", "Lena Fox"];

export const LISTINGS: Listing[] = Array.from({ length: 9 }, (_, i) => ({
  id: `listing-${i + 1}`,
  name: "Savana Lakeside home",
  views: "500 views this week",
  upcoming: "3 upcoming stays",
  image: "/images/cards/london.svg",
  live: true,
  guests: GUESTS,
}));

/* --------------------------------------------------------------------------
   Availability
   -------------------------------------------------------------------------- */

/** Day-of-month -> booking count and its tone on the availability calendar. */
export const AVAILABILITY: Record<number, { count: number; tone: "open" | "busy" | "blocked" }> = {
  1: { count: 2, tone: "busy" },
  4: { count: 0, tone: "blocked" },
  9: { count: 1, tone: "busy" },
  12: { count: 0, tone: "blocked" },
  15: { count: 0, tone: "open" },
  16: { count: 0, tone: "open" },
  20: { count: 3, tone: "busy" },
  21: { count: 0, tone: "open" },
  28: { count: 4, tone: "busy" },
};

export const PROPERTY_NAMES = [
  "Susanna Lakeside Home",
  "Savana Lakeside home",
  "Austin home",
  "Beach house",
];

/* --------------------------------------------------------------------------
   Bookings
   -------------------------------------------------------------------------- */

export const BOOKING_CATEGORIES = [
  "Upcoming Bookings",
  "Past Bookings",
  "Cancelled Bookings",
];

export type ManagedBooking = {
  guest: string;
  property: string;
  amount: string;
  dates: string;
  duration: string;
  status: "Confirmed" | "Pending" | "Cancelled";
};

export const MANAGED_BOOKINGS: ManagedBooking[] = Array.from({ length: 9 }, () => ({
  guest: "Blake",
  property: "Austin home",
  amount: "$500",
  dates: "Jan 15, 2025 - Jan 20, 2025",
  duration: "5 nights",
  status: "Confirmed" as const,
}));

/* --------------------------------------------------------------------------
   Messages
   -------------------------------------------------------------------------- */

export type Thread = {
  id: string;
  name: string;
  role: string;
  preview: string;
  time: string;
  unread?: boolean;
  read?: boolean;
};

export const THREADS: Thread[] = [
  { id: "t1", name: "Eten Hunt", role: "Agents", preview: "Thank you very much. I'm glad ...", time: "" },
  { id: "t2", name: "Jakob Saris", role: "Property manager", preview: "You : Sure! let me tell you about w...", time: "", read: true },
  { id: "t3", name: "Jeremy Zucker", role: "", preview: "You : Sure! let me teach you about ...", time: "4 m Ago", read: true },
  { id: "t4", name: "Nadia Lauren", role: "", preview: "Is there anything I can help? Just ...", time: "5 m Ago", unread: true },
  { id: "t5", name: "Jeremy Zucker", role: "", preview: "You : Sure! let me teach you about ...", time: "4 m Ago", read: true },
  { id: "t6", name: "Jeremy Zucker", role: "", preview: "You : Sure! let me teach you about ...", time: "4 m Ago", read: true },
  { id: "t7", name: "Jeremy Zucker", role: "", preview: "You : Sure! let me teach you about ...", time: "4 m Ago", read: true },
  { id: "t8", name: "Jakob Saris", role: "Property manager", preview: "You : Sure! let me tell you about w...", time: "", read: true },
];

export type ChatMessage = {
  id: string;
  from: "them" | "me";
  text: string;
  time: string;
  images?: number;
};

export const CONVERSATION: ChatMessage[] = [
  { id: "m1", from: "me", text: "Morning Eten Hunt, I have a question about my job!", time: "Today 11:52" },
  { id: "m2", from: "them", text: "Yes of course, Are there problems with your job?", time: "Today 11:53" },
  { id: "m3", from: "me", text: "What are the points that are important to get the perfect result of my assignment?", time: "Today 11:54" },
  { id: "m4", from: "them", text: "Good question. How about just discussing it?", time: "Today 11:55", images: 2 },
  { id: "m5", from: "me", text: "Of course. Thank you so much for taking your time.", time: "Today 11:56" },
];

/* --------------------------------------------------------------------------
   Earnings / Insights
   -------------------------------------------------------------------------- */

export const EARNINGS_TILES = [
  { label: "Total Earnings", value: "$2,456", icon: "bag", tone: "rose" as const },
  { label: "Pending Payouts", value: "$3,326", icon: "store", tone: "lilac" as const },
  { label: "Last Payout Date", value: "January 10, 2025", icon: "people", tone: "mint" as const },
];

export const INSIGHT_TILES = [
  { label: "Total Views this Month", value: "1,235 views", icon: "bag", tone: "rose" as const },
  { label: "Total Bookings", value: "57 bookings", icon: "store", tone: "lilac" as const },
  { label: "Earnings This Month", value: "$450,000", icon: "people", tone: "mint" as const },
  { label: "Average Occupancy Rate", value: "76%", icon: "people", tone: "amber" as const },
];

export type BookingPoint = { month: string; bookings: number; views: number };

export const BOOKINGS_OVER_TIME: BookingPoint[] = [
  { month: "January", bookings: 62, views: 40 },
  { month: "February", bookings: 78, views: 55 },
  { month: "March", bookings: 70, views: 48 },
  { month: "April", bookings: 96, views: 62 },
  { month: "May", bookings: 104, views: 70 },
  { month: "June", bookings: 150, views: 96 },
  { month: "July", bookings: 172, views: 118 },
];

export const OCCUPANCY = { occupied: 75, vacant: 25 };

/* --------------------------------------------------------------------------
   Reviews
   -------------------------------------------------------------------------- */

export type GuestReview = {
  id: string;
  name: string;
  rating: number;
  body: string;
  stayed: string;
};

export const GUEST_REVIEWS: GuestReview[] = Array.from({ length: 6 }, (_, i) => ({
  id: `review-${i + 1}`,
  name: "Blake Jnr.",
  rating: 5,
  body: "The apartment was neat and cozy. Loved the location and hospitality! The apartment was neat and cozy. Loved the location and hospitality! The apartment was neat and cozy.",
  stayed: "April 12, 2025.",
}));
