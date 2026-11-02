import { STAYS, STAY_SEARCH, cheapest, total } from "@/lib/liteapi";
import { nights } from "@/lib/format";

/**
 * Discounted offers for the home page, one list per service. Flight and jet
 * deals are sample fares until Duffel and Jettly feeds are wired; stay deals
 * come from the LiteAPI sample data with its cheapest rate.
 */
export type OfferKind = "flights" | "hotels" | "apartments" | "jets" | "shared";

export type HomeOffer = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  /** Small line under the title: dates, airline, aircraft… */
  meta: string;
  price: number;
  was: number;
  unit: string;
  href: string;
  /** Overrides the "-N%" badge, e.g. "Empty leg". */
  tag?: string;
  /** Airline logo for flight deals. */
  logo?: string;
};

const P = (name: string) => `/images/photos/${name}.webp`;
const logo = (code: string) => `https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${code}.svg`;

const FLIGHTS: HomeOffer[] = [
  { id: "yyz-dxb", title: "Toronto → Dubai", subtitle: "Emirates · direct", meta: "Jan 12 – Jan 26 · return", image: P("dubai"), price: 899, was: 1290, unit: "return", href: "/flights", logo: logo("EK") },
  { id: "los-lhr", title: "Lagos → London", subtitle: "Virgin Atlantic · direct", meta: "Dec 15 – Jan 9 · return", image: P("london"), price: 742, was: 1096, unit: "return", href: "/flights", logo: logo("VS") },
  { id: "acc-jfk", title: "Accra → New York", subtitle: "Delta · direct", meta: "Feb 3 – Feb 17 · return", image: P("new-york"), price: 980, was: 1340, unit: "return", href: "/flights", logo: logo("DL") },
  { id: "abv-cdg", title: "Abuja → Paris", subtitle: "Air France · direct", meta: "Mar 6 – Mar 14 · return", image: P("paris"), price: 655, was: 910, unit: "return", href: "/flights", logo: logo("AF") },
  { id: "lhr-cpt", title: "London → Cape Town", subtitle: "British Airways · direct", meta: "Jan 20 – Feb 2 · return", image: P("cape-town"), price: 712, was: 980, unit: "return", href: "/flights", logo: logo("BA") },
  { id: "los-lis", title: "Lagos → Lisbon", subtitle: "TAP Air Portugal · 1 stop", meta: "Apr 2 – Apr 11 · return", image: P("lisbon"), price: 598, was: 760, unit: "return", href: "/flights", logo: logo("TP") },
];

const NIGHTS = nights(STAY_SEARCH.checkin, STAY_SEARCH.checkout);

/** Stays with a member discount on their cheapest nightly rate. */
function stayOffers(type: "hotel" | "apartment"): HomeOffer[] {
  return STAYS.filter((h) => h.type === type)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)
    .map((h, i) => {
      const nightly = Math.round(total(cheapest(h)) / NIGHTS);
      const off = [0.25, 0.2, 0.3, 0.15, 0.22, 0.18][i];
      return {
        id: h.id,
        title: h.name,
        subtitle: h.city,
        meta: `${h.rating.toFixed(1)} · ${h.reviewCount.toLocaleString("en-US")} reviews`,
        image: h.main_photo,
        price: nightly,
        was: Math.round(nightly / (1 - off)),
        unit: "night",
        href: `/hotels/${h.id}`,
      };
    });
}

const JETS: HomeOffer[] = [
  { id: "los-abv", title: "Lagos → Abuja", subtitle: "Light jet · 6 seats", meta: "Fri, Dec 4 · 1h 05m", image: P("jet-hero"), price: 6800, was: 14200, unit: "whole jet", href: "/private-jets?from=LOS&to=ABV", tag: "Empty leg" },
  { id: "dxb-los", title: "Dubai → Lagos", subtitle: "Heavy jet · 14 seats", meta: "Tue, Dec 8 · 7h 10m", image: P("dubai-night"), price: 48500, was: 96000, unit: "whole jet", href: "/private-jets?from=DXB&to=LOS", tag: "Empty leg" },
  { id: "acc-los", title: "Accra → Lagos", subtitle: "Light jet · 6 seats", meta: "Sat, Dec 12 · 1h 10m", image: P("jet-hero"), price: 5900, was: 12800, unit: "whole jet", href: "/private-jets?from=ACC&to=LOS", tag: "Empty leg" },
  { id: "lhr-abv", title: "London → Abuja", subtitle: "Midsize jet · 8 seats", meta: "Mon, Dec 14 · 6h 15m", image: P("london"), price: 39800, was: 71000, unit: "whole jet", href: "/private-jets?from=LHR&to=ABV", tag: "Empty leg" },
];

const SHARED: HomeOffer[] = [
  { id: "s-los-dxb", title: "Lagos → Dubai", subtitle: "Heavy jet · 3 of 14 seats left", meta: "Thu, Dec 17 · 7h 10m", image: P("dubai"), price: 4200, was: 6900, unit: "seat", href: "/private-jets?from=LOS&to=DXB#share" },
  { id: "s-abv-lhr", title: "Abuja → London", subtitle: "Midsize jet · 2 of 8 seats left", meta: "Sat, Dec 19 · 6h 15m", image: P("london"), price: 5600, was: 8900, unit: "seat", href: "/private-jets?from=ABV&to=LHR#share" },
  { id: "s-los-acc", title: "Lagos → Accra", subtitle: "Light jet · 4 of 6 seats left", meta: "Fri, Dec 11 · 1h 10m", image: P("jet-hero"), price: 1150, was: 2100, unit: "seat", href: "/private-jets?from=LOS&to=ACC#share" },
  { id: "s-los-jnb", title: "Lagos → Johannesburg", subtitle: "Heavy jet · 5 of 14 seats left", meta: "Wed, Dec 23 · 5h 55m", image: P("cape-town"), price: 3900, was: 6200, unit: "seat", href: "/private-jets?from=LOS&to=JNB#share" },
];

export const OFFER_TABS: { kind: OfferKind; label: string; note: string; href: string }[] = [
  { kind: "flights", label: "Flights", note: "Fares cut on popular routes", href: "/flights" },
  { kind: "hotels", label: "Hotels", note: "Member prices on top-rated hotels", href: "/hotels/search" },
  { kind: "apartments", label: "Apartments", note: "Whole places, discounted", href: "/hotels/search?type=apartments" },
  { kind: "jets", label: "Private jets", note: "Empty legs at up to 55% off", href: "/private-jets" },
  { kind: "shared", label: "Shared jets", note: "Seats left on upcoming jets", href: "/private-jets#share" },
];

export const OFFERS_BY_KIND: Record<OfferKind, HomeOffer[]> = {
  flights: FLIGHTS,
  hotels: stayOffers("hotel"),
  apartments: stayOffers("apartment"),
  jets: JETS,
  shared: SHARED,
};

export const discount = (o: HomeOffer) => Math.round((1 - o.price / o.was) * 100);
