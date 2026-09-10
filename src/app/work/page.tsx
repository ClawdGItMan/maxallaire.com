import type { Metadata } from "next";
import { loadProjects } from "@/lib/content/load";
import { resolveImage } from "@/lib/images";
import { PageShell, PageTitle } from "@/components/page-shell";
import { WorkSections } from "@/components/work-sections";
import type { ProjectView } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Work",
  description: "Every project as a case study: headliners, shipped products, and experiments.",
};

export default function WorkIndex() {
  const all = loadProjects();
  const views: ProjectView[] = all.map((p) => ({ project: p, image: resolveImage(p.screenshots[0]) }));
  const live = all.filter((p) => p.status === "live").length;

  return (
    <PageShell>
      <PageTitle
        eyebrow={
          <>
            <span className="text-accent">02</span> · Work · {all.length} projects · {live} live
          </>
        }
        title={
          <>
            Built to <em>find out.</em>
          </>
        }
        lede="Prototypes and products from February to September 2026, each written up as what I built, what I learned, and where it cut against my own thesis. All directed, none hand-coded."
      />

      {all.length === 0 ? (
        <p className="mt-16 font-serif text-fg-2">Case studies are being written. Check back shortly.</p>
      ) : (
        <div className="mt-12 sm:mt-16">
          <WorkSections views={views} />
        </div>
      )}
    </PageShell>
  );
}
