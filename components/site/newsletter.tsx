"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Stand-in for the real subscribe endpoint.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setDone(true);
    setEmail("");
  }

  return (
    <section className="bg-sky text-white">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="text-h2 font-bold">
            Subcribe to our Newsletter
          </h2>
          <p className="mt-3 max-w-[520px] text-small leading-relaxed text-white/85">
            Subscribe for Updates: Stay informed about the latest investor updates,
            financial results, and announcements by subscribing to our newsletter.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex overflow-hidden rounded-lg bg-white/25">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="h-[62px] min-w-0 flex-1 bg-transparent px-5 text-copy text-white outline-none placeholder:text-white/80"
          />
          <button
            type="submit"
            className="h-[62px] shrink-0 bg-white px-7 text-copy font-medium text-sky transition-colors duration-200 hover:bg-white/90"
          >
            {done ? "Subscribed" : "Subscribe"}
          </button>
        </form>

        {done ? (
          <p role="status" className="animate-fade text-small text-white/90 lg:col-start-2">
            Thanks — look out for our next dispatch.
          </p>
        ) : null}
      </div>
    </section>
  );
}
