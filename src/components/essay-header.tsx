import type { Essay } from "@/lib/content/schema";
import { formatDate, nn } from "@/lib/format";

export function EssayHeader({ essay, index }: { essay: Essay; index: number }) {
  return (
    <header className="flex flex-col gap-6" data-reveal>
      <p className="eyebrow tnum">
        <span className="text-accent">{nn(index)}</span> · Thesis · Updated {formatDate(essay.updated)}
      </p>
      <h1 className="display text-[2.2rem] sm:text-[3.1rem] lg:text-[3.6rem]">{essay.title}</h1>
      <p className="max-w-[60ch] font-serif text-[1.2rem] leading-[1.45] text-ink-2 sm:text-[1.35rem]">{essay.subtitle}</p>

      <aside className="relative mt-4 border-y border-rule-strong py-7 sm:py-9" aria-label="Thirty-second version">
        <span className="eyebrow absolute -top-2 left-0 bg-paper pr-3">The 30-second version</span>
        <p className="font-serif text-[1.25rem] leading-[1.45] tracking-[-0.005em] sm:text-[1.5rem] sm:leading-[1.4]">
          <span className="float-left mr-3 -mt-1 font-serif text-[3.4rem] leading-[0.8] text-accent sm:text-[4rem]" aria-hidden>
            “
          </span>
          {essay.thirtySecond}
        </p>
      </aside>
    </header>
  );
}
