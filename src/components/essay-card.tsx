import Link from "next/link";
import type { Essay } from "@/lib/content/schema";
import { formatDate, nn } from "@/lib/format";

/** A small paper card for an essay: the 30-second version on a sheet. */
export function EssayCard({ essay, index, delay = 0 }: { essay: Essay; index: number; delay?: number }) {
  return (
    <Link
      href={`/thesis/${essay.slug}`}
      className="sheet group flex h-full flex-col gap-5 p-6 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:rotate-[-0.3deg] sm:p-8"
      data-scroll
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <div className="flex items-baseline justify-between">
        <span className="eyebrow">
          <span className="text-accent-ink">{nn(index)}</span> · Thesis
        </span>
        <span className="eyebrow">{formatDate(essay.updated)}</span>
      </div>
      <h3 className="font-serif text-[1.65rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[1.9rem]" style={{ fontVariationSettings: '"opsz" 72, "SOFT" 30' }}>
        {essay.title}
      </h3>
      <p className="font-serif text-[1.02rem] leading-[1.5] text-ink-2" style={{ fontVariationSettings: '"opsz" 14' }}>
        {essay.subtitle}
      </p>
      <p className="mt-auto border-t border-rule pt-4 text-[0.9rem] leading-[1.55] text-ink-2 line-clamp-4">{essay.thirtySecond}</p>
      <span className="mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-2 transition-colors group-hover:text-accent-ink">
        Read the essay <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
