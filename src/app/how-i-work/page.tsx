import type { Metadata } from "next";
import { loadTimeline, loadProjects, loadMarkdown } from "@/lib/content/load";
import { Timeline } from "@/components/timeline";
import { Markdown } from "@/components/markdown";
import { SectionLabel } from "@/components/section-label";
import { PageShell, PageTitle } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "How I Work",
  description: "March to September 2026 in order, and the method: spec, plan, build with agents, judge outcomes.",
};

export default function HowIWorkPage() {
  const timeline = loadTimeline();
  const projectSlugs = new Set(loadProjects().map((p) => p.slug));
  const method = loadMarkdown("how-i-work.md");

  return (
    <PageShell>
      <PageTitle
        eyebrow={<><span className="text-accent">03</span> · How I Work</>}
        title="Direct the work. Judge the outcome."
        lede="I don't write code by hand. I give AI agents a spec, a plan and a definition of done, then check what comes back the way a founder checks a contractor. Here is six months of that, in order, and then the method."
      />

      <section className="mt-16 sm:mt-24" aria-labelledby="timeline">
        <SectionLabel n="A" className="mb-10">
          <span id="timeline">March → September 2026</span>
        </SectionLabel>
        <Timeline entries={timeline} projectSlugs={projectSlugs} />
      </section>

      <section className="mx-auto mt-12 max-w-3xl sm:mt-20" aria-labelledby="method">
        <SectionLabel n="B" className="mb-8">
          <span id="method">The method</span>
        </SectionLabel>
        {method ? <Markdown>{method}</Markdown> : <p className="font-serif text-ink-2">The write-up is being edited. Check back shortly.</p>}
      </section>
    </PageShell>
  );
}
