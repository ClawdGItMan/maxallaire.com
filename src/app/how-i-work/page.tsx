import type { Metadata } from "next";
import { loadTimeline, loadProjects, loadMarkdown } from "@/lib/content/load";
import { Timeline } from "@/components/timeline";
import { Markdown } from "@/components/markdown";
import { SectionLabel } from "@/components/section-label";
import { PageShell, PageTitle, Sheet } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "How I Work",
  description: "February to September 2026 in order, and the method: spec, plan, build with agents, judge outcomes.",
};

const LOOP = [
  { n: "01", title: "Spec", body: "What is this for, who uses it, what does “working” mean. Written in the research vault before any code exists." },
  { n: "02", title: "Plan", body: "The spec broken into tasks small enough that one agent can finish one and I can verify the result in a browser." },
  { n: "03", title: "Build", body: "Agents work in parallel where tasks are independent. A second agent verifies the first one's work before I look." },
  { n: "04", title: "Judge", body: "Does it run, does it do what I asked, what did it get wrong. Outcomes, not code. Then the write-up." },
];

export default function HowIWorkPage() {
  const timeline = loadTimeline();
  const projects = loadProjects();
  const projectSlugs = new Set(projects.map((p) => p.slug));
  const method = loadMarkdown("how-i-work.md");
  const first = timeline[0];
  const last = timeline[timeline.length - 1];
  const span = first && last ? `${first.month.slice(0, 4)}` : "2026";

  return (
    <PageShell>
      <PageTitle
        eyebrow={
          <>
            <span className="text-accent">03</span> · How I Work · {span}
          </>
        }
        title={
          <>
            Direct the work. <em>Judge the outcome.</em>
          </>
        }
        lede="I don't write code by hand. I give AI agents a spec, a plan and a definition of done, then check what comes back the way a founder checks a contractor. Here is the year in order, and then the method."
      />

      <ol className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4" aria-label="The loop">
        {LOOP.map((s, i) => (
          <li key={s.n} className="panel relative flex flex-col gap-3 p-5 sm:p-6" data-scroll style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
            <span className="mono text-[0.72rem] text-accent">{s.n}</span>
            <h2 className="font-serif text-[1.5rem] leading-tight" style={{ fontVariationSettings: '"opsz" 48' }}>
              {s.title}
            </h2>
            <p className="text-[0.9rem] leading-[1.55] text-fg-2">{s.body}</p>
            {i < LOOP.length - 1 ? (
              <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-fg-3 lg:block" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <section className="mt-24 sm:mt-32" aria-labelledby="timeline">
        <SectionLabel n="A" className="mb-12">
          <span id="timeline">The year, in order</span>
        </SectionLabel>
        <Timeline entries={timeline} projectSlugs={projectSlugs} />
      </section>

      <section className="mx-auto mt-12 max-w-4xl sm:mt-20" aria-labelledby="method" data-scroll>
        <Sheet>
          <SectionLabel n="B" onPaper className="mb-8">
            <span id="method">The method</span>
          </SectionLabel>
          {method ? <Markdown>{method}</Markdown> : <p className="font-serif text-ink-2">The write-up is being edited. Check back shortly.</p>}
        </Sheet>
      </section>
    </PageShell>
  );
}
