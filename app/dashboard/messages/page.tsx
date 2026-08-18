"use client";

import { useState, type FormEvent } from "react";
import { BarAction, DashPage } from "@/components/dashboard/shell";
import { Avatar } from "@/components/dashboard/icons";
import { CONVERSATION, THREADS, type ChatMessage } from "@/lib/dashboard-data";

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(THREADS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(CONVERSATION);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  const active = THREADS.find((t) => t.id === activeId) ?? THREADS[0];
  const visible = THREADS.filter((t) =>
    t.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((list) => [
      ...list,
      { id: `${Date.now()}`, from: "me", text, time: "Just now" },
    ]);
    setDraft("");
  }

  return (
    <DashPage
      title="Your Conversations"
      subtitle="Stay connected with your guests and respond to inquiries in real-time."
      actions={
        <>
          <BarAction label="New message" />
          <BarAction label="Export" tone="brand" icon={false} />
        </>
      }
    >
      <div className="grid gap-6 overflow-hidden rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] lg:grid-cols-[330px_1fr] lg:gap-0 lg:p-0">
        {/* Thread list */}
        <div className="flex min-h-0 flex-col lg:border-r lg:border-line lg:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-[20px] font-bold text-ink">
              Chat
              <span className="rounded bg-red-500 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                137
              </span>
            </h2>
            <button
              type="button"
              className="flex items-center gap-2 text-[14px] text-body transition-colors hover:text-sky"
            >
              Agents
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M6 12h12M9 17h6" />
              </svg>
            </button>
          </div>

          <label className="mt-4 flex h-11 items-center gap-2 rounded-lg bg-shell px-3">
            <span className="sr-only">Search conversations</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m16.5 16.5 4 4" />
            </svg>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search in dashboard..."
              className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
            />
          </label>

          <ul className="mt-3 flex max-h-[520px] flex-col overflow-y-auto">
            {visible.map((thread) => {
              const on = thread.id === activeId;
              return (
                <li key={thread.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(thread.id)}
                    aria-current={on}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-200 ${
                      on ? "bg-sky-tint" : "hover:bg-shell"
                    }`}
                  >
                    <Avatar name={thread.name} size={40} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-[14px] font-semibold text-ink">
                          {thread.name}
                        </span>
                        <span className="shrink-0 text-[12px] text-muted">
                          {thread.role || thread.time}
                        </span>
                      </span>
                      <span className="mt-0.5 flex items-center gap-2">
                        <span className="min-w-0 flex-1 truncate text-[13px] text-label">
                          {thread.preview}
                        </span>
                        {thread.unread ? (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                        ) : thread.read ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-sky)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                            <path d="m2 13 4 4 8-9M12 17l1 1 8-9" />
                          </svg>
                        ) : null}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Conversation */}
        <div className="flex min-h-0 flex-col lg:p-5">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <Avatar name={active.name} size={44} />
            <div>
              <p className="text-[16px] font-semibold text-ink">{active.name}</p>
              <p className="flex items-center gap-1.5 text-[13px] text-label">
                <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
                Online
              </p>
            </div>
          </div>

          <ul className="flex max-h-[430px] flex-1 flex-col gap-4 overflow-y-auto py-5 pb-8">
            {messages.map((message) => (
              <li
                key={message.id}
                className={`flex flex-col gap-1.5 ${
                  message.from === "me" ? "items-end" : "items-start"
                }`}
              >
                {message.images ? (
                  <span className="flex gap-2">
                    {Array.from({ length: message.images }, (_, i) => (
                      <span
                        key={i}
                        aria-hidden="true"
                        className={`h-[86px] w-[86px] rounded-lg ${
                          i === 0
                            ? "bg-[linear-gradient(140deg,#60a5fa,#2563eb)]"
                            : "bg-[linear-gradient(140deg,#fb923c,#ea580c)]"
                        }`}
                      />
                    ))}
                  </span>
                ) : null}

                <span className="max-w-[80%] rounded-xl bg-[#0f1c33] px-4 py-3 text-[14px] leading-relaxed text-white">
                  {message.text}
                </span>
                <span className="text-[12px] text-muted">{message.time}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={send} className="flex items-center gap-3 border-t border-line pt-4">
            <button
              type="button"
              aria-label="Add attachment"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-label transition-colors hover:bg-shell hover:text-sky"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </button>

            <label className="flex h-12 flex-1 items-center gap-3 rounded-lg bg-shell px-4">
              <span className="sr-only">Message</span>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type your message"
                className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
              />
              <button type="button" aria-label="Add emoji" className="shrink-0 text-muted transition-colors hover:text-sky">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01" strokeLinecap="round" />
                </svg>
              </button>
            </label>

            <button
              type="submit"
              aria-label="Send message"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0f1c33] text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12 2-12 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </DashPage>
  );
}
