import type { Metadata } from "next";
import { loadProjects } from "@/lib/content/load";
import { ProjectCard, ProjectRow } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";
import { PageShell, PageTitle } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Work",
  description: "Every project as a case study: headliners, shipped products, and experiments.",
};

export default function WorkIndex() {
  const all = loadProjects();
  const headliners = all.filter((p) => p.band === "headliner");
  const shipped = all.filter((p) => p.band === "shipped");
  const experiments = all.filter((p) => p.band === "experiment");

  return (
    <PageShell>
      <PageTitle
        eyebrow={<><span className="text-accent">02</span> · Work · {all.length} projects</>}
        title="Built to find out."
        lede="Prototypes and products from March to September 2026, each written up as what I built, what I learned, and where it cut against my own thesis. All directed, none hand-coded."
      />

      {all.length === 0 ? <p className="mt-16 font-serif text-ink-2">Case studies are being written. Check back shortly.</p> : null}

      {headliners.length > 0 ? (
        <section className="mt-16 sm:mt-24">
          <SectionLabel n="A">Headliners</SectionLabel>
          <div className="mt-8 grid gap-10 sm:mt-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
            {headliners.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i + 1} large />
            ))}
          </div>
        </section>
      ) : null}

      {shipped.length > 0 ? (
        <section className="mt-20 sm:mt-28">
          <SectionLabel n="B">Shipped</SectionLabel>
          <div className="mt-8 grid gap-10 sm:mt-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
            {shipped.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i + 1} />
            ))}
          </div>
        </section>
      ) : null}

      {experiments.length > 0 ? (
        <section className="mt-20 sm:mt-28">
          <SectionLabel n="C">Experiments</SectionLabel>
          <ul className="mt-8">
            {experiments.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i + 1} />
            ))}
          </ul>
        </section>
      ) : null}
    </PageShell>
  );
}
