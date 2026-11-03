"use client";

import { useMemo, useState } from "react";
import { StayCard } from "@/components/stays/stay-card";
import { ProTip } from "@/components/site/pro-tip";
import { SavedIllustration } from "@/components/ui/illustrations";
import { Pagination, scrollToList } from "@/components/ui/pagination";
import { cheapest, refundable, total, type Hotel } from "@/lib/liteapi";

const PAGE_SIZE = 4;

type Sort = "recommended" | "price" | "rating";
const SORTS: { value: Sort; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price", label: "Lowest price" },
  { value: "rating", label: "Top rated" },
];

const recommended = (h: Hotel) => h.rating * 100 - total(cheapest(h)) / 10;

/** Sort and quick filters over a LiteAPI result list. */
export function StayResults({ stays }: { stays: Hotel[] }) {
  const [sort, setSort] = useState<Sort>("recommended");
  const [freeCancel, setFreeCancel] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [page, setPage] = useState(1);

  const shown = useMemo(() => {
    const list = stays
      .filter((h) => !freeCancel || h.roomTypes.some((rt) => refundable(rt.rates[0])))
      .filter((h) => !breakfast || h.roomTypes.some((rt) => rt.rates[0].boardType !== "RO"));
    const by: Record<Sort, (a: Hotel, b: Hotel) => number> = {
      recommended: (a, b) => recommended(b) - recommended(a),
      price: (a, b) => total(cheapest(a)) - total(cheapest(b)),
      rating: (a, b) => b.rating - a.rating,
    };
    return [...list].sort(by[sort]);
  }, [stays, sort, freeCancel, breakfast]);

  const current = Math.min(page, Math.max(1, Math.ceil(shown.length / PAGE_SIZE)));
  const pageItems = shown.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
        {SORTS.map((s) => (
          <Chip key={s.value} on={sort === s.value} onClick={() => setSort(s.value)}>
            {s.label}
          </Chip>
        ))}
        <span aria-hidden="true" className="mx-1 w-px shrink-0 bg-line" />
        <Chip on={freeCancel} onClick={() => setFreeCancel((v) => !v)}>
          Free cancellation
        </Chip>
        <Chip on={breakfast} onClick={() => setBreakfast((v) => !v)}>
          Breakfast
        </Chip>
      </div>

      <ProTip title="Check what is included before booking" art={<SavedIllustration className="h-16 w-auto" />}>
        Use the filters to find stays with free cancellation or breakfast for your dates.
      </ProTip>

      <p id="stays" className="scroll-mt-24 px-1 text-small text-label">
        {shown.length} places
      </p>

      {shown.length ? (
        <ul className="space-y-4">
          {pageItems.map((h, i) => (
            <li key={h.id}>
              <StayCard hotel={h} eager={i === 0} />
            </li>
          ))}
        </ul>
      ) : null}
      <Pagination
        page={current}
        pageSize={PAGE_SIZE}
        total={shown.length}
        onChange={(p) => {
          setPage(p);
          scrollToList("stays");
        }}
      />
      {shown.length ? null : (
        <p className="rounded-2xl bg-white p-8 text-center text-copy text-body">No places match these filters.</p>
      )}
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`h-10 shrink-0 rounded-full px-4 text-small font-medium transition-colors duration-200 ${
        on ? "bg-ink text-white" : "bg-white text-ink"
      }`}
    >
      {children}
    </button>
  );
}
