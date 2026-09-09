import Link from "next/link";
import type { Timeline as TimelineData } from "@/lib/content/schema";
import { formatMonth } from "@/lib/format";

export function Timeline({ entries, projectSlugs }: { entries: TimelineData; projectSlugs: Set<string> }) {
  if (entries.length === 0) {
    return <p className="font-serif text-fg-2">Timeline coming shortly.</p>;
  }
  return (
    <ol className="relative">
      <span className="absolute left-[3px] top-2 bottom-2 w-px bg-line-strong sm:left-[8.5rem]" aria-hidden />
      {entries.map((e, i) => {
        const showMonth = i === 0 || e.month !== entries[i - 1].month;
        const linked = e.projectSlug && projectSlugs.has(e.projectSlug);
        return (
          <li
            key={`${e.month}-${i}`}
            className="relative grid gap-2 pb-10 pl-8 sm:grid-cols-[7rem_1fr] sm:gap-x-12 sm:pb-12 sm:pl-0"
            data-scroll
          >
            <span
              className={`absolute left-0 top-[0.5em] h-[7px] w-[7px] rounded-full sm:left-[calc(8.5rem-3px)] ${
                showMonth ? "bg-accent shadow-[0_0_0_4px_rgba(255,122,69,0.18)]" : "bg-fg-3"
              }`}
              aria-hidden
            />
            <span className={`mono pt-[0.3em] text-[0.72rem] uppercase tracking-[0.12em] ${showMonth ? "text-fg" : "text-transparent"}`} aria-hidden={!showMonth}>
              {formatMonth(e.month)}
            </span>
            <div className="flex flex-col gap-2 sm:pl-0">
              <h3 className="font-serif text-[1.35rem] leading-[1.15] tracking-[-0.01em] sm:text-[1.55rem]" style={{ fontVariationSettings: '"opsz" 48' }}>
                {linked ? (
                  <Link href={`/work/${e.projectSlug}`} className="link-fg">
                    {e.title}
                  </Link>
                ) : (
                  e.title
                )}
              </h3>
              <p className="max-w-[64ch] text-[0.95rem] leading-[1.6] text-fg-2 tnum">{e.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
