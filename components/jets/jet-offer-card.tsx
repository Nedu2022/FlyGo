"use client";

import { useState } from "react";
import { CalendarDays, Check, Clock, Minus, Plus, Users } from "lucide-react";
import { formatHours, shareOf, usd, type JetOffer, type ShareGroup } from "@/lib/jet-data";

type View = "closed" | "whole" | "share";

/**
 * One jet that can fly the route. The whole-jet price leads; "Book whole jet"
 * opens a date and time picker, "Share with others" lists the groups already
 * going there with what each person pays once you join. Payment is a demo:
 * confirming only updates this card.
 */
export function JetOfferCard({ offer, from, to }: { offer: JetOffer; from: string; to: string }) {
  const [view, setView] = useState<View>("closed");
  const { aircraft } = offer;
  const cheapestShare = shareOf(offer.total, aircraft.seats);

  return (
    <article className="rounded-3xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05),0_10px_28px_-18px_rgba(16,24,40,0.3)]">
      <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <p className="text-h3 font-semibold tracking-tight text-ink">{aircraft.size}</p>
          <p className="text-small text-body">
            {aircraft.model} · {offer.operator}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-small text-ink">
            <span className="flex items-center gap-1.5">
              <Users size={16} strokeWidth={2} aria-hidden="true" className="text-label" />
              Up to {aircraft.seats} seats
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} strokeWidth={2} aria-hidden="true" className="text-label" />
              {formatHours(offer.hours)} non-stop
            </span>
            <span className="text-body">
              {from} → {to}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="md:text-right">
            <p className="text-tiny font-medium text-label">Whole jet</p>
            <p className="text-h2 font-bold leading-tight tracking-tight text-ink">{usd(offer.total)}</p>
            <p className="text-tiny text-label">or from {usd(cheapestShare)} each when shared</p>
          </div>
          <div className="grid grid-cols-2 gap-2 md:w-[300px]">
            <button
              type="button"
              aria-expanded={view === "whole"}
              onClick={() => setView(view === "whole" ? "closed" : "whole")}
              className={`h-12 rounded-xl text-small font-semibold ${
                view === "whole" ? "bg-ink text-white" : "bg-brand text-white"
              }`}
            >
              Book whole jet
            </button>
            <button
              type="button"
              aria-expanded={view === "share"}
              onClick={() => setView(view === "share" ? "closed" : "share")}
              className={`h-12 rounded-xl text-small font-semibold ${
                view === "share" ? "bg-ink text-white" : "bg-shell text-ink"
              }`}
            >
              Share with others
            </button>
          </div>
        </div>
      </div>

      {view === "whole" ? <WholeJet offer={offer} /> : null}
      {view === "share" ? <Share offer={offer} /> : null}
    </article>
  );
}

const DATES = ["Fri 18 Dec", "Sat 19 Dec", "Sun 20 Dec", "Mon 21 Dec", "Tue 22 Dec", "Wed 23 Dec"];
const WINDOWS = ["Morning, 06:00–10:00", "Midday, 10:00–14:00", "Afternoon, 14:00–18:00", "Evening, 18:00–22:00"];

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade border-t-2 border-dashed border-line px-5 py-5 sm:px-6">{children}</div>;
}

function Done({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-brand-soft p-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white">
        <Check size={18} strokeWidth={2.6} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-copy font-medium text-ink">{title}</span>
        <span className="block text-small text-body">{body}</span>
      </span>
    </div>
  );
}

/** Book alone: pick the day and time, pay the whole price. */
function WholeJet({ offer }: { offer: JetOffer }) {
  const [date, setDate] = useState(DATES[0]);
  const [slot, setSlot] = useState(WINDOWS[0]);
  const [booked, setBooked] = useState(false);

  return (
    <Panel>
      {booked ? (
        <Done
          title="Jet booked"
          body={`${date}, ${slot.split(",")[0].toLowerCase()}. We'll send your exact departure time.`}
        />
      ) : (
        <>
          <p className="text-copy font-medium text-ink">When do you want to fly?</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Choice
              label="Date"
              icon={<CalendarDays size={18} strokeWidth={1.9} aria-hidden="true" />}
              value={date}
              options={DATES}
              onChange={setDate}
            />
            <Choice
              label="Time"
              icon={<Clock size={18} strokeWidth={1.9} aria-hidden="true" />}
              value={slot}
              options={WINDOWS}
              onChange={setSlot}
            />
          </div>
          <button
            type="button"
            onClick={() => setBooked(true)}
            className="mt-4 h-12 w-full rounded-xl bg-brand text-copy font-semibold text-white sm:w-auto sm:px-8"
          >
            Pay {usd(offer.total)} and book
          </button>
        </>
      )}
    </Panel>
  );
}

/** Share: groups going to the same place, priced by how many are in them. */
function Share({ offer }: { offer: JetOffer }) {
  const [joined, setJoined] = useState<string | null>(null);

  return (
    <Panel>
      <p className="text-copy font-medium text-ink">People going to the same place</p>
      <p className="text-small text-body">
        The price is split by everyone in the group. The more people join, the less each pays.
      </p>

      <ul className="mt-4 space-y-3">
        {offer.groups.map((group) => (
          <li key={group.id}>
            <GroupRow
              offer={offer}
              group={group}
              joined={joined === group.id}
              disabled={joined !== null && joined !== group.id}
              onJoin={() => setJoined(group.id)}
            />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function GroupRow({
  offer,
  group,
  joined,
  disabled,
  onJoin,
}: {
  offer: JetOffer;
  group: ShareGroup;
  joined: boolean;
  disabled: boolean;
  onJoin: () => void;
}) {
  const seats = offer.aircraft.seats;
  const room = seats - group.people;
  const [mine, setMine] = useState(1);

  const withYou = group.people + mine;
  const each = shareOf(offer.total, withYou);
  const full = shareOf(offer.total, seats);

  if (joined) {
    return (
      <Done
        title={`You're in · ${usd(each * mine)} paid for ${mine === 1 ? "your seat" : `${mine} seats`}`}
        body={`${group.date}, ${group.window.split(",")[0].toLowerCase()}. We'll confirm the exact time with the group. If more people join, everyone's share goes down.`}
      />
    );
  }

  return (
    <div className={`rounded-2xl bg-shell p-4 ${disabled ? "opacity-50" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-copy font-medium text-ink">
            {group.people} {group.people === 1 ? "person" : "people"} going · {group.date}
          </p>
          <p className="text-small text-body">{group.window}</p>
        </div>
        <div className="text-right">
          <p className="text-tiny text-label">With you, each pays</p>
          <p className="text-h3 font-semibold leading-tight tracking-tight text-ink">{usd(each)}</p>
          <p className="text-tiny text-label">
            {withYou} people · drops to {usd(full)} if all {seats} seats fill
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1" role="img" aria-label={`${group.people} of ${seats} seats taken`}>
        {Array.from({ length: seats }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-full ${
              i < group.people ? "bg-ink" : i < withYou ? "bg-brand" : "bg-white ring-1 ring-inset ring-line"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex h-12 items-center gap-1 rounded-xl bg-white px-1.5">
          <button
            type="button"
            aria-label="Fewer seats"
            disabled={disabled || mine <= 1}
            onClick={() => setMine((n) => n - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink disabled:opacity-35"
          >
            <Minus size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <span className="w-16 text-center text-small font-medium text-ink" aria-live="polite">
            {mine} {mine === 1 ? "seat" : "seats"}
          </span>
          <button
            type="button"
            aria-label="More seats"
            disabled={disabled || mine >= room}
            onClick={() => setMine((n) => n + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-ink disabled:opacity-35"
          >
            <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={onJoin}
          className="h-12 flex-1 rounded-xl bg-brand px-4 text-small font-semibold text-white disabled:cursor-not-allowed"
        >
          Join and pay {usd(each * mine)}
        </button>
      </div>
    </div>
  );
}

function Choice({
  label,
  icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex h-14 items-center gap-3 rounded-xl bg-shell px-4">
      <span className="shrink-0 text-label">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-tiny font-medium text-label">{label}</span>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-copy font-medium text-ink outline-none"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </span>
    </label>
  );
}
