"use client";

import { useMemo, useState } from "react";
import type { Band } from "@/lib/content/schema";
import { ProjectCard, ProjectFeature, ProjectRow, type ProjectView } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";

type Filter = "all" | Band;

const TABS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "headliner", label: "Headliners" },
  { key: "shipped", label: "Shipped" },
  { key: "experiment", label: "Experiments" },
];

const BAND_INTRO: Record<Band, string> = {
  headliner: "The ones that matter most for Solana: research, payments, tokenization, a live market-making bot, and the BD tool I used in the field.",
  shipped: "Products with real users or a public demo. Each one taught me something about running a build.",
  experiment: "Weekend builds and design studies. Short write-ups, honest about what they are.",
};

export function WorkFilter({ views }: { views: ProjectView[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: views.length, headliner: 0, shipped: 0, experiment: 0 };
    for (const v of views) c[v.project.band]++;
    return c;
  }, [views]);

  const show = (band: Band) => filter === "all" || filter === band;
  const headliners = views.filter((v) => v.project.band === "headliner");
  const shipped = views.filter((v) => v.project.band === "shipped");
  const experiments = views.filter((v) => v.project.band === "experiment");

  return (
    <div>
      <div className="sticky top-[60px] z-30 -mx-5 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8 sm:top-[64px]" style={{ background: "color-mix(in oklab, var(--bg) 82%, transparent)" }}>
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = filter === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setFilter(t.key)}
                className={[
                  "btn py-2 transition-colors",
                  active ? "border-fg bg-fg text-bg hover:border-fg" : "text-fg-2 hover:text-fg",
                ].join(" ")}
              >
                {t.label}
                <span className={`mono text-[0.62rem] ${active ? "text-bg/60" : "text-fg-3"}`}>{counts[t.key]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {show("headliner") && headliners.length > 0 ? (
        <section className="mt-12 sm:mt-16" aria-labelledby="headliners">
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

      {show("shipped") && shipped.length > 0 ? (
        <section className="mt-20 sm:mt-32" aria-labelledby="shipped">
          <SectionLabel n="B" className="mb-3">
            <span id="shipped">Shipped</span>
          </SectionLabel>
          <p className="mb-10 max-w-[60ch] text-[0.95rem] text-fg-2">{BAND_INTRO.shipped}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shipped.map((v, i) => (
              <ProjectCard key={v.project.slug} view={v} index={i + 1} delay={(i % 3) * 90} />
            ))}
          </div>
        </section>
      ) : null}

      {show("experiment") && experiments.length > 0 ? (
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
