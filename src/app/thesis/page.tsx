import type { Metadata } from "next";
import { loadEssays } from "@/lib/content/load";
import { PageShell, PageTitle } from "@/components/page-shell";
import { EssayCard } from "@/components/essay-card";

export const metadata: Metadata = {
  title: "Thesis",
  description: "Two essays on where crypto is headed, each with a 30-second version and the evidence that would prove it wrong.",
};


export default function ThesisIndex() {
  const essays = loadEssays();
  return (
    <PageShell>
      <PageTitle
        eyebrow={
          <>
            <span className="text-accent">01</span> · Thesis · {essays.length} essays
          </>
        }
        title={
          <>
            Priors, <em>written down.</em>
          </>
        }
        lede="Two positions on where crypto is headed, starting with the one I published in April. Each one opens with the 30-second version and closes with what would make me wrong."
      />

      {essays.length === 0 ? (
        <p className="mt-16 font-serif text-fg-2">Essays are being edited. Check back shortly.</p>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-2 sm:mt-20">
          {essays.map((e, i) => (
            <EssayCard key={e.slug} essay={e} index={i + 1} delay={i * 110} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
