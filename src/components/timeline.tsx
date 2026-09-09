import Link from "next/link";
import type { Timeline as TimelineData } from "@/lib/content/schema";
import { formatMonth } from "@/lib/format";

export function Timeline({ entries, projectSlugs }: { entries: TimelineData; projectSlugs: Set<string> }) {
  if (entries.length === 0) {
    return <p className="font-serif text-ink-2">Timeline coming shortly.</p>;
  }
  return (
    <ol className="relative border-l border-rule-strong pl-6 sm:pl-0 sm:border-l-0">
      {entries.map((e, i) => {
        const showMonth = i === 0 || e.month !== entries[i - 1].month;
        const linked = e.projectSlug && projectSlugs.has(e.projectSlug);
        return (
          <li key={`${e.month}-${i}`} className="relative grid gap-1 pb-9 sm:grid-cols-[7.5rem_1fr] sm:gap-x-8 sm:pb-10">
            <span
              className="absolute -left-[1.6rem] top-[0.45em] h-2 w-2 rounded-full bg-paper ring-1 ring-rule-strong sm:hidden"
              aria-hidden
            />
            <span className={`eyebrow tnum pt-[0.35em] ${showMonth ? "text-ink" : "text-transparent"}`} aria-hidden={!showMonth}>
              {formatMonth(e.month)}
            </span>
            <div className="flex flex-col gap-2 sm:border-l sm:border-rule-strong sm:pl-8">
              <span className="absolute hidden sm:block sm:left-[7.5rem] sm:ml-8 sm:-translate-x-[calc(2rem+4.5px)] sm:top-[0.55em] h-2 w-2 rounded-full bg-paper ring-1 ring-rule-strong" aria-hidden />
              <h3 className="font-serif text-[1.25rem] leading-[1.2] sm:text-[1.35rem]">
                {linked ? (
                  <Link href={`/work/${e.projectSlug}`} className="link-ink">
                    {e.title}
                  </Link>
                ) : (
                  e.title
                )}
              </h3>
              <p className="max-w-[62ch] text-[0.95rem] leading-[1.55] text-ink-2 tnum">{e.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
