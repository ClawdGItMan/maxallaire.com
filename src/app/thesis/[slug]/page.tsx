import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadEssays, loadEssay } from "@/lib/content/load";
import { Markdown } from "@/components/markdown";
import { SectionLabel } from "@/components/section-label";
import { PageShell, Sheet } from "@/components/page-shell";
import { ReadingProgress } from "@/components/reading-progress";
import { formatDate, nn } from "@/lib/format";

type Params = { slug: string };

const WRONG_HEADING = /\n##\s+What would make me wrong\s*\n/i;

/** Split the essay body into the main argument and the closing "what would make me wrong" prose, if present. */
function splitBody(body: string): { main: string; closing?: string } {
  const m = WRONG_HEADING.exec(body);
  if (!m) return { main: body };
  return { main: body.slice(0, m.index).trim(), closing: body.slice(m.index + m[0].length).trim() };
}

function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export function generateStaticParams(): Params[] {
  return loadEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const essay = loadEssay(slug);
  if (!essay) return {};
  return { title: essay.title, description: essay.subtitle };
}

export default async function EssayPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const essays = loadEssays();
  const index = essays.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();
  const essay = essays[index];
  const next = essays[(index + 1) % essays.length];
  const { main, closing } = splitBody(essay.body);
  const minutes = readingMinutes(essay.body);

  return (
    <>
      <ReadingProgress />
      <PageShell>
        <header className="grid gap-10 lg:grid-cols-12 lg:gap-12" data-reveal>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p className="eyebrow flex flex-wrap items-center gap-x-2">
              <Link href="/thesis" className="transition-colors hover:text-accent">
                Thesis
              </Link>
              <span aria-hidden>/</span>
              <span className="text-accent">{nn(index + 1)}</span>
              <span aria-hidden>·</span>
              <span>Updated {formatDate(essay.updated)}</span>
              <span aria-hidden>·</span>
              <span>{minutes} min read</span>
            </p>
            <h1 className="display text-[2.5rem] sm:text-[3.6rem] lg:text-[4.2rem]">{essay.title}</h1>
            <p className="lede max-w-[56ch] text-[1.15rem] text-fg-2 sm:text-[1.3rem]">{essay.subtitle}</p>
          </div>

          <aside className="panel relative flex flex-col gap-4 p-6 sm:p-8 lg:col-span-5 lg:self-end" aria-label="Thirty-second version">
            <span className="eyebrow">
              <span className="text-accent">▶</span> The 30-second version
            </span>
            <p className="font-serif text-[1.08rem] leading-[1.5] text-fg sm:text-[1.15rem]" style={{ fontVariationSettings: '"opsz" 18' }}>
              {essay.thirtySecond}
            </p>
          </aside>
        </header>

        <div className="mx-auto mt-14 max-w-4xl sm:mt-20" data-scroll>
          <Sheet>
            <SectionLabel as="p" onPaper className="mb-8">
              The 5-minute version
            </SectionLabel>
            <Markdown>{main}</Markdown>

            <section className="mt-16 border-t-2 border-ink pt-8 sm:mt-20" aria-labelledby="wrong">
              <h2 id="wrong" className="font-serif text-[1.8rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[2.2rem]" style={{ fontVariationSettings: '"opsz" 72, "SOFT" 30' }}>
                What would make me wrong
              </h2>
              <ol className="mt-8 grid gap-4">
                {essay.whatWouldMakeMeWrong.map((item, i) => (
                  <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-md border border-rule bg-paper-2/70 px-5 py-4">
                    <span className="mono pt-[0.4em] text-[0.72rem] text-accent-ink">{nn(i + 1)}</span>
                    <p className="font-serif text-[1.05rem] leading-[1.55] text-ink" style={{ fontVariationSettings: '"opsz" 14' }}>
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
              {closing ? (
                <div className="mt-10">
                  <Markdown>{closing}</Markdown>
                </div>
              ) : null}
            </section>
          </Sheet>
        </div>

        {essays.length > 1 && next.slug !== essay.slug ? (
          <nav className="mx-auto mt-12 max-w-4xl" aria-label="Next essay" data-scroll>
            <Link href={`/thesis/${next.slug}`} className="panel group flex flex-col gap-3 p-6 transition-colors hover:border-line-strong sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex flex-col gap-2">
                <span className="eyebrow">
                  Next essay · <span className="text-accent">{nn(((index + 1) % essays.length) + 1)}</span>
                </span>
                <span className="font-serif text-[1.5rem] leading-tight transition-colors group-hover:text-accent-2 sm:text-[1.8rem]" style={{ fontVariationSettings: '"opsz" 48' }}>
                  {next.title}
                </span>
              </div>
              <span className="btn w-fit">
                Read <span aria-hidden className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </nav>
        ) : null}
      </PageShell>
    </>
  );
}
