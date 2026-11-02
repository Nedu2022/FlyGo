"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { getOffer, type Offer } from "@/lib/duffel";

/** Duffel's passenger fields for creating an order. */
export type Passenger = {
  title: "mr" | "ms" | "mrs" | "miss" | "dr";
  given_name: string;
  family_name: string;
  gender: "m" | "f";
  born_on: string;
  email: string;
  phone_number: string;
  passport?: { unique_identifier: string; issuing_country_code: string; expires_on: string };
};

type BookingState = {
  offer: Offer;
  passenger: Passenger | null;
  setPassenger: (p: Passenger) => void;
  /** Extra checked bags bought on top of the fare. */
  bags: number;
  setBags: (n: number) => void;
  seat: { designator: string; amount: number } | null;
  setSeat: (seat: BookingState["seat"]) => void;
  extrasTotal: number;
  total: number;
};

const BookingContext = createContext<BookingState | null>(null);

/** Holds the flight booking across the steps (lives in app/booking/layout). */
export function BookingProvider({ children }: { children: ReactNode }) {
  // The results page links here with ?offer=…; later steps keep the stored id.
  const param = useSearchParams().get("offer");
  const [stored, setStored] = useState("");
  const offerId = param ?? stored;
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [bags, setBags] = useState(0);
  const [seat, setSeat] = useState<BookingState["seat"]>(null);

  useEffect(() => {
    if (!param || param === stored) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- a new flight resets the extras
    setStored(param);
    setBags(0);
    setSeat(null);
  }, [param, stored]);

  const value = useMemo<BookingState>(() => {
    const offer = getOffer(offerId);
    const bagPrice = Number(offer.available_services[0]?.total_amount ?? 0);
    const extrasTotal = bags * bagPrice + (seat?.amount ?? 0);
    return {
      offer,
      passenger,
      setPassenger,
      bags,
      setBags,
      seat,
      setSeat,
      extrasTotal,
      total: Number(offer.total_amount) + extrasTotal,
    };
  }, [offerId, passenger, bags, seat]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside BookingProvider");
  return context;
}
