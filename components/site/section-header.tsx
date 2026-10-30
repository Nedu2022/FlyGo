import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Section title with an optional "see all" link on the same row (so it never
 * drops onto a line of its own on phones) and a one-line intro beneath.
 */
export function SectionHeader({
  title,
  intro,
  href,
  linkLabel = "See all",
}: {
  title: string;
  intro?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h2 className="min-w-0 text-h2 font-bold tracking-tight text-ink">{title}</h2>
        {href ? (
          <Link
            href={href}
            className="mb-0.5 inline-flex sm:mb-1.5 shrink-0 items-center gap-1 text-small font-medium text-ink underline decoration-line underline-offset-[6px]"
          >
            <span className="hidden sm:inline">{linkLabel}</span>
            <span className="sm:hidden">See all</span>
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        ) : null}
      </div>
      {intro ? <p className="mt-2 max-w-[640px] text-copy leading-relaxed text-body">{intro}</p> : null}
    </div>
  );
}
