"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUp, BedDouble, Plane, Sparkles, X } from "lucide-react";

/**
 * "Ask AI": a travel planner that reads a plain-English request and replies
 * with the matching search. It runs entirely in the browser on simple rules
 * (destination, dates, trip type, budget); swap `answer` for a call to a
 * language model API when one is set up.
 */

const OPEN_EVENT = "flygo:ask-ai";

/** Opens the assistant from anywhere, optionally with a question to ask. */
export function openAssistant(prompt?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { prompt } }));
}

export const SUGGESTIONS = [
  "Flights to London next weekend",
  "Nonstop flights to Dubai",
  "Hotels in Lisbon under $200",
  "Share a private jet to Accra",
];

type Reply = {
  text: string;
  action?: { label: string; href: string; kind: "flight" | "stay" | "jet" };
};

type Message = { from: "you" | "ai"; text: string; action?: Reply["action"] };

const CITIES: { name: string; code: string; airport: string }[] = [
  { name: "London", code: "LHR", airport: "London Heathrow" },
  { name: "Dubai", code: "DXB", airport: "Dubai International" },
  { name: "Accra", code: "ACC", airport: "Accra Kotoka" },
  { name: "Abuja", code: "ABV", airport: "Abuja" },
  { name: "Lagos", code: "LOS", airport: "Lagos" },
  { name: "Paris", code: "CDG", airport: "Paris Charles de Gaulle" },
  { name: "New York", code: "JFK", airport: "New York JFK" },
  { name: "Johannesburg", code: "JNB", airport: "Johannesburg" },
  { name: "Cape Town", code: "CPT", airport: "Cape Town" },
  { name: "Nairobi", code: "NBO", airport: "Nairobi" },
  { name: "Lisbon", code: "LIS", airport: "Lisbon" },
  { name: "Santorini", code: "JTR", airport: "Santorini" },
  { name: "Toronto", code: "YYZ", airport: "Toronto Pearson" },
  { name: "Istanbul", code: "IST", airport: "Istanbul" },
];

const DAY = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });

/** "next weekend" → Fri–Sun of the coming week, "this weekend" → the next Fri–Sun. */
function whenFrom(text: string) {
  const today = new Date();
  const friday = (weeksAhead: number) => {
    const d = new Date(today);
    const toFri = (5 - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + toFri + weeksAhead * 7);
    return d;
  };
  const range = (start: Date, days: number) => {
    const end = new Date(start);
    end.setDate(end.getDate() + days);
    return `${DAY.format(start)} – ${DAY.format(end)}`;
  };
  if (/next weekend/.test(text)) return range(friday(1), 2);
  if (/this weekend|weekend/.test(text)) return range(friday(0), 2);
  if (/tomorrow/.test(text)) {
    const d = new Date(today);
    d.setDate(d.getDate() + 1);
    return DAY.format(d);
  }
  if (/next week/.test(text)) return range(friday(0), 7);
  if (/christmas/.test(text)) return "around 25 Dec";
  return null;
}

function answer(question: string): Reply {
  const text = question.toLowerCase();
  const city = CITIES.find((c) => text.includes(c.name.toLowerCase()) || text.includes(` ${c.code.toLowerCase()}`));
  const when = whenFrom(text);
  const budget = text.match(/(?:under|below|less than|max)\s*\$?\s?(\d[\d,]*)/)?.[1];
  const direct = /non-?stop|direct/.test(text);

  if (/jet|private|charter/.test(text)) {
    const to = city && city.code !== "LOS" ? city : CITIES[1];
    return {
      text: `Here are private jets from Lagos to ${to.name}. Book the whole jet, or share one with people already going and split the cost.`,
      action: { label: `Private jets to ${to.name}`, href: `/private-jets?from=LOS&to=${to.code}`, kind: "jet" },
    };
  }

  if (/hotel|stay|room|apartment|resort|villa|airbnb|sleep/.test(text)) {
    const where = city?.name ?? "your destination";
    const parts = [`Top-rated stays in ${where}`];
    if (when) parts.push(`for ${when}`);
    if (budget) parts.push(`under $${budget} a night`);
    return {
      text: `${parts.join(" ")}. Free cancellation is shown on every stay that has it.`,
      action: { label: `See stays${city ? ` in ${city.name}` : ""}`, href: "/hotels", kind: "stay" },
    };
  }

  if (city || /flight|fly|ticket|trip|travel/.test(text)) {
    if (!city) {
      return {
        text: "Where would you like to go? Try a city, like “Flights to Dubai next weekend”.",
      };
    }
    const parts = [`Cheapest flights from Lagos to ${city.airport}`];
    if (when) parts.push(when);
    if (direct) parts.push("nonstop only");
    if (budget) parts.push(`under $${budget}`);
    return {
      text: `${parts.join(", ")}. I've sorted them by best value.`,
      action: { label: `Flights to ${city.name}`, href: "/flights", kind: "flight" },
    };
  }

  return {
    text: "I can find flights, hotels, apartments and private jets. Tell me where and when, like “Hotels in Lisbon this weekend”.",
  };
}

const ICONS = { flight: Plane, stay: BedDouble, jet: Plane } as const;

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q) return;
    const reply = answer(q);
    setMessages((m) => [...m, { from: "you", text: q }, { from: "ai", text: reply.text, action: reply.action }]);
    setDraft("");
  };

  useEffect(() => {
    const onOpen = (event: Event) => {
      const prompt = (event as CustomEvent<{ prompt?: string }>).detail?.prompt;
      setOpen(true);
      if (prompt) ask(prompt);
      setTimeout(() => input.current?.focus(), 50);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(draft);
  };

  return (
    <div className={`fixed inset-0 z-[80] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      <button
        type="button"
        aria-label="Close assistant"
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Ask FLYGO AI"
        className={`absolute inset-x-0 bottom-0 flex h-[85dvh] flex-col rounded-t-3xl bg-white shadow-[0_-20px_50px_-20px_rgba(16,24,40,0.4)] transition-transform duration-300 ease-out sm:inset-x-auto sm:bottom-4 sm:right-4 sm:top-4 sm:h-auto sm:w-[420px] sm:rounded-3xl ${
          open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-x-[110%] sm:translate-y-0"
        }`}
      >
        <header className="flex items-center justify-between px-5 py-4">
          <p className="flex items-center gap-2 text-h4 font-bold text-ink">
            <Sparkles size={20} strokeWidth={2} aria-hidden="true" className="text-brand" />
            Ask FLYGO AI
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-shell text-ink"
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </header>

        <div ref={list} className="flex-1 space-y-3 overflow-y-auto px-5 pb-4">
          {messages.length === 0 ? (
            <div className="pt-2">
              <p className="text-h3 font-bold tracking-tight text-ink">Where to next?</p>
              <p className="mt-1 text-copy text-body">Ask in your own words. I&apos;ll find the right flights, stays or jets.</p>
              <ul className="mt-5 space-y-2">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => ask(s)}
                      className="flex w-full items-center gap-3 rounded-2xl bg-shell px-4 py-3.5 text-left text-copy font-medium text-ink"
                    >
                      <Sparkles size={16} strokeWidth={2} aria-hidden="true" className="shrink-0 text-brand" />
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={m.from === "you" ? "flex justify-end" : ""}>
                {m.from === "you" ? (
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-copy text-white">{m.text}</p>
                ) : (
                  <div className="max-w-[92%]">
                    <p className="rounded-2xl rounded-bl-md bg-shell px-4 py-3 text-copy text-ink">{m.text}</p>
                    {m.action ? (
                      <Link
                        href={m.action.href}
                        onClick={() => setOpen(false)}
                        className="mt-2 flex items-center gap-3 rounded-2xl bg-brand-soft px-4 py-3 text-copy font-semibold text-ink"
                      >
                        {(() => {
                          const Icon = ICONS[m.action.kind];
                          return <Icon size={20} strokeWidth={1.9} aria-hidden="true" className="shrink-0 text-brand" />;
                        })()}
                        <span className="flex-1">{m.action.label}</span>
                        <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <form onSubmit={submit} className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
          <div className="flex items-center gap-2 rounded-full bg-shell p-1.5 pl-5 ring-1 ring-line focus-within:ring-2 focus-within:ring-brand">
            <input
              ref={input}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="e.g. Flights to London next weekend"
              aria-label="Ask a travel question"
              className="h-10 min-w-0 flex-1 bg-transparent text-copy text-ink outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!draft.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white disabled:opacity-40"
            >
              <ArrowUp size={20} strokeWidth={2.4} aria-hidden="true" />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

/** Kayak-style floating prompt on the home page; cycles through example questions. */
export function AskAiPill() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setI((n) => (n + 1) % SUGGESTIONS.length), 3500);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <button
      type="button"
      onClick={() => openAssistant()}
      className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] left-4 right-4 z-30 rounded-full bg-[linear-gradient(90deg,#f58634,#f472b6,#56ace9)] p-[1.5px] shadow-[0_14px_34px_-14px_rgba(16,24,40,0.45)] sm:right-auto sm:w-[400px] lg:bottom-6 lg:left-6"
    >
      <span className="flex h-14 items-center gap-3 rounded-full bg-white px-5 text-left">
        <Sparkles size={22} strokeWidth={2} aria-hidden="true" className="shrink-0 text-ink" />
        <span key={i} className="animate-fade truncate text-copy font-medium text-body">
          {SUGGESTIONS[i]}
        </span>
      </span>
    </button>
  );
}
