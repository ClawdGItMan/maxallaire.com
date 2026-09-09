import Link from "next/link";
import { loadSite, loadProjects, loadEssays, loadTimeline } from "@/lib/content/load";
import { resolveImage } from "@/lib/images";
import { ProjectFeature, type ProjectView } from "@/components/project-card";
import { EssayCard } from "@/components/essay-card";
import { SectionLabel } from "@/components/section-label";
import { StatStrip } from "@/components/stat-strip";
import { Marquee } from "@/components/marquee";
import { HeroStack } from "@/components/hero-stack";
import { formatMonth } from "@/lib/format";

const METHOD = [
  { n: "01", title: "Spec", body: "What is this for, who uses it, and what does “working” mean. Written before any code." },
  { n: "02", title: "Plan", body: "The spec broken into tasks small enough that an agent finishes one and I can verify it." },
  { n: "03", title: "Build & judge", body: "Agents build in parallel; a second agent verifies; I judge outcomes the way a founder checks a contractor." },
];

/** Most-used stack items across every project, for the ticker. */
function topStack(projects: { stack: string[] }[], n: number): string[] {
  const freq = new Map<string, number>();
  for (const p of projects)
    for (const raw of p.stack) {
      const s = raw.replace(/\s*\(.*\)\s*/g, "").replace(/\s+\d+(\.\d+)*$/, "").trim(); // "Next.js 16", "Supabase (Postgres, RLS)" → "Next.js", "Supabase"
      if (s) freq.set(s, (freq.get(s) ?? 0) + 1);
    }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n)
    .map(([s]) => s);
}

export default function HomePage() {
  const site = loadSite();
  const projects = loadProjects();
  const essays = loadEssays();
  const timeline = loadTimeline();
  const headliners: ProjectView[] = projects
    .filter((p) => p.band === "headliner")
    .map((p) => ({ project: p, image: resolveImage(p.screenshots[0]) }));
  const liveCount = projects.filter((p) => p.status === "live").length;
  const ticker = topStack(projects, 18);
  const recent = timeline.slice(-3).reverse();
  const slugs = new Set(projects.map((p) => p.slug));

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
              I research where crypto and AI meet, then build prototypes to find out <em>if I&rsquo;m right.</em>
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

      <Marquee items={ticker} label="Tools and stacks used across the projects" />

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
                Four builds that <em>test the thesis.</em>
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
            <span className="text-[0.9rem] text-fg-3">Shipped products, experiments, and the ones that stalled.</span>
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
              Four positions on where crypto and AI meet, starting with the essay I published in April. Each opens with the 30-second version and closes with what would make me wrong.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {essays.map((e, i) => (
              <EssayCard key={e.slug} essay={e} index={i + 1} delay={i * 110} />
            ))}
          </div>
        </section>
      ) : null}

      {/* How I work */}
      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-8 sm:pt-40" aria-labelledby="method">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-scroll>
            <SectionLabel n="03" className="mb-6">
              <span id="method">How I work</span>
            </SectionLabel>
            <h2 className="display text-[2.3rem] sm:text-[3.2rem]">
              Direct the work. <em>Judge the outcome.</em>
            </h2>
            <p className="lede mt-6 max-w-[44ch] text-[1.1rem] text-fg-2">
              I don&rsquo;t write code by hand. I give AI agents a spec, a plan and a definition of done, then check what comes back.
            </p>
            <ol className="mt-10 flex flex-col divide-y divide-line border-y border-line">
              {METHOD.map((m) => (
                <li key={m.n} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="mono pt-1 text-[0.72rem] text-accent">{m.n}</span>
                  <div>
                    <h3 className="font-serif text-[1.35rem] leading-tight" style={{ fontVariationSettings: '"opsz" 48' }}>
                      {m.title}
                    </h3>
                    <p className="mt-1.5 text-[0.92rem] leading-[1.55] text-fg-2">{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7" data-scroll style={{ "--d": "120ms" } as React.CSSProperties}>
            <div className="panel p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow">Recent months</span>
                <Link href="/how-i-work" className="mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-2 hover:text-fg">
                  Full timeline <span aria-hidden className="text-accent">→</span>
                </Link>
              </div>
              <ol className="mt-6 flex flex-col divide-y divide-line">
                {recent.map((e) => {
                  const linked = e.projectSlug && slugs.has(e.projectSlug);
                  return (
                    <li key={`${e.month}-${e.title}`} className="grid gap-2 py-5 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
                      <span className="mono text-[0.72rem] uppercase tracking-[0.12em] text-accent">{formatMonth(e.month)}</span>
                      <div>
                        <h3 className="font-serif text-[1.2rem] leading-tight" style={{ fontVariationSettings: '"opsz" 48' }}>
                          {linked ? (
                            <Link href={`/work/${e.projectSlug}`} className="link-fg">
                              {e.title}
                            </Link>
                          ) : (
                            e.title
                          )}
                        </h3>
                        <p className="mt-1.5 text-[0.9rem] leading-[1.55] text-fg-2 tnum line-clamp-3">{e.detail}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
