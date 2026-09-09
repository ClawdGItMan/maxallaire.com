import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadProjects, loadProject } from "@/lib/content/load";
import { resolveImage } from "@/lib/images";
import { Markdown } from "@/components/markdown";
import { SectionLabel } from "@/components/section-label";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { StatusPill } from "@/components/status-pill";
import { PageShell } from "@/components/page-shell";

type Params = { slug: string };

const BAND_LABEL = { headliner: "Headliner", shipped: "Shipped", experiment: "Experiment" } as const;
const LINK_LABEL = { live: "Live site", demo: "Demo", repo: "Source" } as const;

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
  const project = loadProject(slug);
  if (!project) notFound();
  const images = project.screenshots.map(resolveImage);
  const links = (["live", "demo", "repo"] as const).filter((k) => project.links[k]);

  const sections: { n: string; title: string; body?: string }[] = [
    { n: "01", title: "What I built", body: project.whatIBuilt },
    { n: "02", title: "What I learned", body: project.whatILearned },
    { n: "03", title: "Solana relevance", body: project.solanaRelevance },
    { n: "04", title: "Built with AI", body: project.builtWithAI },
  ];

  return (
    <PageShell>
      <header className="flex flex-col gap-6" data-reveal>
        <p className="eyebrow tnum">
          <Link href="/work" className="hover:text-accent">Work</Link> · {BAND_LABEL[project.band]} · {project.period}
        </p>
        <h1 className="display text-[2.3rem] sm:text-[3.2rem] lg:text-[3.8rem]">{project.name}</h1>
        <p className="max-w-[58ch] font-serif text-[1.2rem] leading-[1.45] text-ink-2 sm:text-[1.35rem]">{project.oneLiner}</p>

        <dl className="mt-2 grid gap-x-10 gap-y-5 border-y border-rule py-5 sm:grid-cols-[auto_1fr_auto] sm:items-start">
          <div className="flex flex-col gap-2">
            <dt className="eyebrow">Status</dt>
            <dd><StatusPill status={project.status} /></dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="eyebrow">Stack</dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1.5 text-[0.85rem] text-ink-2">
              {project.stack.map((s) => (
                <span key={s} className="border-b border-rule-strong pb-px">{s}</span>
              ))}
            </dd>
          </div>
          {links.length > 0 ? (
            <div className="flex flex-col gap-2">
              <dt className="eyebrow">Links</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1.5 text-[0.9rem]">
                {links.map((k) => (
                  <a key={k} href={project.links[k]} target="_blank" rel="noreferrer" className="link-ink whitespace-nowrap">
                    {LINK_LABEL[k]} ↗
                  </a>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </header>

      <div className="mt-10 sm:mt-14">
        <ScreenshotGallery images={images} name={project.name} />
      </div>

      <div className="mx-auto mt-16 max-w-3xl sm:mt-24">
        {sections
          .filter((s) => s.body)
          .map((s) => (
            <section key={s.n} className="mb-14 sm:mb-20" aria-labelledby={`s-${s.n}`}>
              <SectionLabel n={s.n} className="mb-6">
                <span id={`s-${s.n}`}>{s.title}</span>
              </SectionLabel>
              <Markdown>{s.body!}</Markdown>
            </section>
          ))}
        <p className="border-t border-rule pt-6 text-[0.95rem]">
          <Link href="/work" className="link-ink">← All work</Link>
        </p>
      </div>
    </PageShell>
  );
}
