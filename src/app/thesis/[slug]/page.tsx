import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadEssays, loadEssay } from "@/lib/content/load";
import { EssayHeader } from "@/components/essay-header";
import { Markdown } from "@/components/markdown";
import { SectionLabel } from "@/components/section-label";
import { PageShell } from "@/components/page-shell";
import { nn } from "@/lib/format";

type Params = { slug: string };

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

  return (
    <PageShell narrow>
      <EssayHeader essay={essay} index={index + 1} />

      <div className="mt-12 sm:mt-16">
        <SectionLabel as="p" className="mb-8">The 5-minute version</SectionLabel>
        <Markdown>{essay.body}</Markdown>
      </div>

      <section className="mt-16 border-t-2 border-ink pt-8 sm:mt-20" aria-labelledby="wrong">
        <h2 id="wrong" className="font-serif text-[1.6rem] leading-tight sm:text-[1.9rem]">
          What would make me wrong
        </h2>
        <ol className="mt-6 flex flex-col gap-5">
          {essay.whatWouldMakeMeWrong.map((item, i) => (
            <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-3">
              <span className="eyebrow tnum pt-[0.45em] text-accent">{nn(i + 1)}</span>
              <p className="font-serif text-[1.08rem] leading-[1.55] sm:text-[1.15rem]">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      {essays.length > 1 && next.slug !== essay.slug ? (
        <nav className="mt-16 border-t border-rule pt-6 text-[0.95rem]" aria-label="Next essay">
          <span className="eyebrow mr-3">Next</span>
          <Link href={`/thesis/${next.slug}`} className="link-ink font-serif text-[1.15rem]">
            {next.title} →
          </Link>
        </nav>
      ) : null}
    </PageShell>
  );
}
