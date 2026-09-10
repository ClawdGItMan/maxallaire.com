import type { Band } from "@/lib/content/schema";
import { ProjectCard, ProjectFeature, ProjectRow, type ProjectView } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";

const BAND_INTRO: Record<Band, string> = {
  headliner: "The ones that matter most for Solana: research, payments, tokenization, a live market-making bot, and the BD tool I used in the field.",
  shipped: "Products beyond the crypto work, each with real users or a public demo. Every one taught me something about running a build.",
  experiment: "Weekend builds and design studies. Short write-ups, honest about what they are.",
};

/** Every project, grouped by band, with no filter controls. */
export function WorkSections({ views }: { views: ProjectView[] }) {
  const headliners = views.filter((v) => v.project.band === "headliner");
  const shipped = views.filter((v) => v.project.band === "shipped");
  const experiments = views.filter((v) => v.project.band === "experiment");

  return (
    <div>
      {headliners.length > 0 ? (
        <section aria-labelledby="headliners">
          <SectionLabel n="A" className="mb-3">
            <span id="headliners">Headliners</span>
          </SectionLabel>
          <p className="mb-10 max-w-[60ch] text-[0.95rem] text-fg-2 sm:mb-14">{BAND_INTRO.headliner}</p>
          <div className="flex flex-col gap-20 sm:gap-28">
            {headliners.map((v, i) => (
              <ProjectFeature key={v.project.slug} view={v} index={i + 1} flip={i % 2 === 1} />
            ))}
          </div>
        </section>
      ) : null}

      {shipped.length > 0 ? (
        <section className="mt-20 sm:mt-32" aria-labelledby="shipped">
          <SectionLabel n="B" className="mb-3">
            <span id="shipped">Products</span>
          </SectionLabel>
          <p className="mb-10 max-w-[60ch] text-[0.95rem] text-fg-2">{BAND_INTRO.shipped}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shipped.map((v, i) => (
              <ProjectCard key={v.project.slug} view={v} index={i + 1} delay={(i % 3) * 90} />
            ))}
          </div>
        </section>
      ) : null}

      {experiments.length > 0 ? (
        <section className="mt-20 sm:mt-32" aria-labelledby="experiments">
          <SectionLabel n="C" className="mb-3">
            <span id="experiments">Experiments</span>
          </SectionLabel>
          <p className="mb-8 max-w-[60ch] text-[0.95rem] text-fg-2">{BAND_INTRO.experiment}</p>
          <ul>
            {experiments.map((v, i) => (
              <ProjectRow key={v.project.slug} project={v.project} index={i + 1} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
