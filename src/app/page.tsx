import Link from "next/link";
import { loadSite, loadProjects, loadEssays } from "@/lib/content/load";
import { ProjectCard } from "@/components/project-card";
import { SectionLabel } from "@/components/section-label";
import { publicFileExists } from "@/lib/images";

const DOORS = [
  { n: "01", href: "/thesis", title: "Thesis", blurb: "Three essays on where crypto and AI meet, each with the evidence that cuts against it." },
  { n: "02", href: "/work", title: "Work", blurb: "Every project as a case study: what I built, what I learned, what it means for Solana." },
  { n: "03", href: "/how-i-work", title: "How I Work", blurb: "Six months in order, and the method: spec, plan, build with agents, judge outcomes." },
];

export default function HomePage() {
  const site = loadSite();
  const headliners = loadProjects().filter((p) => p.band === "headliner");
  const essayCount = loadEssays().length;
  const hasPdf = publicFileExists(site.resumePdf);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24 sm:pb-24" data-reveal>
        <p className="eyebrow tnum mb-6">{site.name} · Sep 2026</p>
        <h1 className="display max-w-[16ch] text-[2.35rem] sm:text-[3.4rem] lg:text-[4.1rem]">{site.headline}</h1>
        <p className="mt-8 max-w-[52ch] font-serif text-[1.15rem] leading-[1.5] text-ink-2 sm:text-[1.3rem]">{site.sub}</p>
        <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-3 text-[0.95rem]">
          <Link href={hasPdf ? site.resumePdf : "/resume"} className="link-ink">
            {hasPdf ? "Resume (PDF)" : "Resume"}
          </Link>
          <a href={`mailto:${site.email}`} className="link-ink">
            {site.email}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8" aria-label="Sections">
        <ul className="grid border-t border-rule-strong sm:grid-cols-3">
          {DOORS.map((d) => (
            <li key={d.href} className="border-b border-rule sm:border-b-0 sm:border-r sm:last:border-r-0">
              <Link href={d.href} className="group flex h-full flex-col gap-3 py-7 sm:pr-8 sm:py-9">
                <span className="eyebrow tnum">
                  <span className="text-accent">{d.n}</span>
                  {d.href === "/thesis" && essayCount ? ` · ${essayCount} essays` : ""}
                </span>
                <span className="font-serif text-[1.7rem] leading-none tracking-[-0.01em] transition-colors group-hover:text-accent-ink sm:text-[2rem]">
                  {d.title}
                  <span className="ml-2 inline-block translate-x-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </span>
                <span className="max-w-[36ch] text-[0.95rem] leading-[1.5] text-ink-2">{d.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {headliners.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
          <SectionLabel n="02">Headliners</SectionLabel>
          <div className="mt-8 grid gap-10 sm:mt-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
            {headliners.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i + 1} large />
            ))}
          </div>
          <p className="mt-10 text-[0.95rem]">
            <Link href="/work" className="link-ink">
              All work, including shipped products and experiments →
            </Link>
          </p>
        </section>
      ) : null}
    </>
  );
}
