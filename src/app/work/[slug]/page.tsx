import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadProjects, loadProject } from "@/lib/content/load";
import { resolveImage } from "@/lib/images";
import { Markdown } from "@/components/markdown";
import { SectionLabel } from "@/components/section-label";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { StatusPill } from "@/components/status-pill";
import { PageShell, Sheet } from "@/components/page-shell";

type Params = { slug: string };

const BAND_LABEL = { headliner: "Headliner", shipped: "Product", experiment: "Experiment" } as const;
const LINK_LABEL = { live: "Open live site", demo: "Try the demo", repo: "Source on GitHub" } as const;

export function generateStaticParams(): Params[] {
  return loadProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = loadProject(slug);
  if (!p) return {};
  const img = resolveImage(p.screenshots[0]);
  return { title: p.name, description: p.oneLiner, openGraph: { images: [{ url: img.src, alt: img.alt }] } };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const all = loadProjects();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = all[index];
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];
  const images = project.screenshots.map(resolveImage);
  const links = (["live", "demo", "repo"] as const).filter((k) => project.links[k]);

  const sections: { n: string; title: string; body?: string }[] = [
    { n: "01", title: "What I built", body: project.whatIBuilt },
    { n: "02", title: "What I learned", body: project.whatILearned },
    { n: "03", title: "Built with AI", body: project.builtWithAI },
  ];

  return (
    <PageShell>
      <header className="grid gap-10 lg:grid-cols-12 lg:gap-12" data-reveal>
        <div className="flex flex-col gap-6 lg:col-span-8">
          <p className="eyebrow flex flex-wrap items-center gap-x-2">
            <Link href="/work" className="transition-colors hover:text-accent">
              Work
            </Link>
            <span aria-hidden>/</span>
            <span>{BAND_LABEL[project.band]}</span>
            <span aria-hidden>·</span>
            <span>{project.period}</span>
          </p>
          <h1 className="display text-[2.6rem] sm:text-[3.8rem] lg:text-[4.6rem]">{project.name}</h1>
          <p className="lede max-w-[56ch] text-[1.15rem] text-fg-2 sm:text-[1.35rem]">{project.oneLiner}</p>
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {links.map((k, i) => (
                <a key={k} href={project.links[k]} target="_blank" rel="noreferrer" className={`btn ${i === 0 ? "btn-primary" : ""}`}>
                  {LINK_LABEL[k]} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="panel flex flex-col gap-6 p-6 lg:col-span-4 lg:self-start" aria-label="Project details">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow">Status</span>
            <StatusPill status={project.status} />
          </div>
          <div className="flex flex-col gap-3 border-t border-line pt-5">
            <span className="eyebrow">Stack</span>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="mono rounded-md border border-line bg-bg-2/60 px-2 py-1 text-[0.68rem] text-fg-2">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          {project.solanaRelevance ? (
            <div className="flex flex-col gap-2 border-t border-line pt-5">
              <span className="eyebrow text-accent">Why it matters for Solana</span>
              <p className="text-[0.9rem] leading-[1.6] text-fg-2 line-clamp-6">{project.solanaRelevance}</p>
              <a href="#solana" className="mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3 hover:text-fg">
                Read in full <span aria-hidden className="text-accent">↓</span>
              </a>
            </div>
          ) : null}
        </aside>
      </header>

      <div className="mt-14 sm:mt-20" data-scroll>
        <ScreenshotGallery images={images} name={project.name} />
      </div>

      <div className="mx-auto mt-16 max-w-4xl sm:mt-24" data-scroll>
        <Sheet>
          {sections
            .filter((s) => s.body)
            .map((s, i) => (
              <section key={s.n} className={i === 0 ? "" : "mt-14 sm:mt-20"} aria-labelledby={`s-${s.n}`}>
                <SectionLabel n={s.n} onPaper className="mb-6">
                  <span id={`s-${s.n}`}>{s.title}</span>
                </SectionLabel>
                <Markdown>{s.body!}</Markdown>
              </section>
            ))}

          {project.solanaRelevance ? (
            <section id="solana" className="mt-14 sm:mt-20" aria-labelledby="s-solana">
              <div className="rounded-md border-l-[3px] border-accent-ink bg-paper-2 px-6 py-6 sm:px-8 sm:py-8">
                <p className="eyebrow mb-4 text-accent-ink" id="s-solana">
                  Solana relevance
                </p>
                <Markdown>{project.solanaRelevance}</Markdown>
              </div>
            </section>
          ) : null}
        </Sheet>
      </div>

      <nav className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2" aria-label="More projects" data-scroll>
        {[
          { p: prev, label: "Previous", arrow: "←", cls: "" },
          { p: next, label: "Next", arrow: "→", cls: "sm:text-right" },
        ].map(({ p, label, arrow, cls }) => (
          <Link key={label} href={`/work/${p.slug}`} className={`panel group flex flex-col gap-2 p-5 transition-colors hover:border-line-strong ${cls}`}>
            <span className="eyebrow">
              {label === "Previous" ? <span aria-hidden className="text-accent">{arrow} </span> : null}
              {label}
              {label === "Next" ? <span aria-hidden className="text-accent"> {arrow}</span> : null}
            </span>
            <span className="font-serif text-[1.3rem] leading-tight transition-colors group-hover:text-accent-2" style={{ fontVariationSettings: '"opsz" 48' }}>
              {p.name}
            </span>
          </Link>
        ))}
      </nav>
    </PageShell>
  );
}
