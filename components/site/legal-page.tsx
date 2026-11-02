import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export type LegalSection = { heading: string; body: string };

/** Short, plain-language legal page: numbered sections in a narrow column. */
export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="mx-auto w-full max-w-[720px] flex-1 px-5 py-10 sm:py-16">
        <h1 className="text-h1 font-bold tracking-tight text-ink">{title}</h1>
        <p className="mt-2 text-small text-label">Last updated {updated}</p>
        <ol className="mt-8 space-y-7">
          {sections.map((s, i) => (
            <li key={s.heading}>
              <h2 className="text-h4 font-semibold text-ink">
                {i + 1}. {s.heading}
              </h2>
              <p className="mt-2 text-copy leading-relaxed text-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </main>
      <SiteFooter />
    </>
  );
}
