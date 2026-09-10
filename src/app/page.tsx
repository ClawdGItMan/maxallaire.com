import Link from "next/link";
import { loadSite, loadProjects, loadEssays } from "@/lib/content/load";
import { resolveImage } from "@/lib/images";
import { ProjectFeature, type ProjectView } from "@/components/project-card";
import { EssayCard } from "@/components/essay-card";
import { SectionLabel } from "@/components/section-label";
import { StatStrip } from "@/components/stat-strip";
import { HeroStack } from "@/components/hero-stack";
import { Marquee } from "@/components/marquee";

const WORDS = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

export default function HomePage() {
  const site = loadSite();
  const projects = loadProjects();
  const essays = loadEssays();
  const headliners: ProjectView[] = projects
    .filter((p) => p.band === "headliner")
    .map((p) => ({ project: p, image: resolveImage(p.screenshots[0]) }));
  const liveCount = projects.filter((p) => p.status === "live").length;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pt-10 pb-16 sm:px-8 sm:pt-16 sm:pb-24 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-8 lg:col-span-7" data-reveal>
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-2.5 py-1.5 text-fg-2">
                <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-mint" aria-hidden />
                Open to ecosystem &amp; BD roles
              </span>
              <span>Sep 2026 · {projects.length} projects · {liveCount} live</span>
            </p>
            <h1 className="display text-[2.7rem] sm:text-[4rem] lg:text-[4.9rem] xl:text-[5.4rem]">
              Curious by nature, builder by habit. I chase new ideas and turn them into things that <em>move technology forward.</em>
            </h1>
            <p className="lede max-w-[52ch] text-[1.15rem] text-fg-2 sm:text-[1.35rem]">{site.sub}</p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/work" className="btn btn-primary">
                See the work <span aria-hidden>→</span>
              </Link>
              <Link href="/thesis" className="btn">
                Read the thesis
              </Link>
              <a href={`mailto:${site.email}`} className="link-fg ml-1 text-[0.9rem] text-fg-2">
                {site.email}
              </a>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <HeroStack views={headliners} />
          </div>
        </div>
      </section>

      <Marquee items={site.tools ?? []} label="Apps, APIs and skills used across the projects" />

      {/* Numbers */}
      <section className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 sm:pt-20" aria-labelledby="numbers">
        <SectionLabel n="00" className="mb-8">
          <span id="numbers">By the numbers</span>
        </SectionLabel>
        <StatStrip stats={site.stats ?? []} />
      </section>

      {/* Headliners */}
      {headliners.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-36" aria-labelledby="headliners">
          <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end sm:mb-20" data-scroll>
            <div>
              <SectionLabel n="02" className="mb-6">
                <span id="headliners">Headliners</span>
              </SectionLabel>
              <h2 className="display text-[2.3rem] sm:text-[3.4rem]">
                {WORDS[headliners.length] ?? headliners.length} builds that <em>test the thesis.</em>
              </h2>
            </div>
            <p className="max-w-[40ch] text-[0.95rem] leading-[1.6] text-fg-2">
              Each one written up as what I built, what I learned, and where it cut against my own view. All directed, none hand-coded.
            </p>
          </div>
          <div className="flex flex-col gap-24 sm:gap-32">
            {headliners.map((v, i) => (
              <ProjectFeature key={v.project.slug} view={v} index={i + 1} flip={i % 2 === 1} />
            ))}
          </div>
          <p className="mt-16 flex flex-wrap items-center gap-4" data-scroll>
            <Link href="/work" className="btn">
              All {projects.length} projects <span aria-hidden className="text-accent">→</span>
            </Link>
            <span className="text-[0.9rem] text-fg-3">Products, experiments, and the ones that stalled.</span>
          </p>
        </section>
      ) : null}

      {/* Thesis */}
      {essays.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-40" aria-labelledby="thesis">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end sm:mb-16" data-scroll>
            <div>
              <SectionLabel n="01" className="mb-6">
                <span id="thesis">Thesis</span>
              </SectionLabel>
              <h2 className="display text-[2.3rem] sm:text-[3.4rem]">
                Priors, <em>written down.</em>
              </h2>
            </div>
            <p className="max-w-[40ch] text-[0.95rem] leading-[1.6] text-fg-2">
              Two positions on where crypto is headed, starting with the essay I published in April. Each opens with the 30-second version and closes with what would make me wrong.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {essays.map((e, i) => (
              <EssayCard key={e.slug} essay={e} index={i + 1} delay={i * 110} />
            ))}
          </div>
        </section>
      ) : null}

    </>
  );
}
