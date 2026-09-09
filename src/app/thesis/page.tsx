import type { Metadata } from "next";
import { loadEssays } from "@/lib/content/load";
import { PageShell, PageTitle } from "@/components/page-shell";
import { EssayCard } from "@/components/essay-card";

export const metadata: Metadata = {
  title: "Thesis",
  description: "Three essays on where crypto and AI meet, each with a 30-second version and the evidence that would prove it wrong.",
};

const PRINCIPLES = [
  { n: "01", title: "Every number carries a date", body: "Volumes, shares and prices move. A figure without a date is a vibe, so each one here says when it was true." },
  { n: "02", title: "The counter-evidence gets its own heading", body: "A thesis that only cites its supporting evidence is a pitch. I record what cut against me next to what supported me." },
  { n: "03", title: "State what would move me", body: "Each essay closes with the specific observations that would change my mind, so the position can be scored later." },
];

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
        lede="Three positions on where crypto and AI meet. Each one opens with the 30-second version and closes with what would make me wrong."
      />

      {essays.length === 0 ? (
        <p className="mt-16 font-serif text-fg-2">Essays are being edited. Check back shortly.</p>
      ) : (
        <div className="mt-14 grid gap-6 md:grid-cols-3 sm:mt-20">
          {essays.map((e, i) => (
            <EssayCard key={e.slug} essay={e} index={i + 1} delay={i * 110} />
          ))}
        </div>
      )}

      <section className="mt-24 sm:mt-32" aria-labelledby="rules">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-scroll>
            <p className="eyebrow mb-5" id="rules">
              <span className="text-accent">Rules</span> · for every essay
            </p>
            <h2 className="display text-[2rem] sm:text-[2.6rem]">
              How I keep myself <em>honest.</em>
            </h2>
          </div>
          <ol className="grid gap-4 lg:col-span-8 sm:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <li key={p.n} className="panel flex flex-col gap-3 p-5" data-scroll style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                <span className="mono text-[0.72rem] text-accent">{p.n}</span>
                <h3 className="font-serif text-[1.2rem] leading-tight" style={{ fontVariationSettings: '"opsz" 48' }}>
                  {p.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.55] text-fg-2">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
