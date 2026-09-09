import type { Metadata } from "next";
import Link from "next/link";
import { loadEssays } from "@/lib/content/load";
import { PageShell, PageTitle } from "@/components/page-shell";
import { formatDate, nn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Thesis",
  description: "Three essays on where crypto and AI meet, each with a 30-second version and the evidence that would prove it wrong.",
};

export default function ThesisIndex() {
  const essays = loadEssays();
  return (
    <PageShell>
      <PageTitle
        eyebrow={<><span className="text-accent">01</span> · Thesis</>}
        title="Priors, written down."
        lede="Three positions on where crypto and AI meet. Each one opens with the 30-second version and closes with what would make me wrong. Every number carries a date."
      />

      {essays.length === 0 ? (
        <p className="mt-16 font-serif text-ink-2">Essays are being edited. Check back shortly.</p>
      ) : (
        <ol className="mt-14 border-t border-rule-strong sm:mt-20" data-reveal>
          {essays.map((e, i) => (
            <li key={e.slug} className="border-b border-rule">
              <Link href={`/thesis/${e.slug}`} className="group grid gap-4 py-9 sm:grid-cols-[6rem_1fr] sm:gap-8 sm:py-12">
                <span className="eyebrow tnum pt-2">
                  <span className="text-accent">{nn(i + 1)}</span>
                  <span className="mt-2 block text-ink-3">{formatDate(e.updated)}</span>
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="font-serif text-[1.75rem] leading-[1.08] tracking-[-0.015em] transition-colors group-hover:text-accent-ink sm:text-[2.3rem]">
                    {e.title}
                  </h2>
                  <p className="max-w-[60ch] font-serif text-[1.08rem] leading-[1.45] text-ink-2 sm:text-[1.15rem]">{e.subtitle}</p>
                  <p className="mt-2 max-w-[68ch] text-[0.95rem] leading-[1.55] text-ink-2">{e.thirtySecond}</p>
                  <span className="mt-1 text-[0.9rem] text-accent-ink">Read the essay →</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </PageShell>
  );
}
