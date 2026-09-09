import Link from "next/link";
import type { Project } from "@/lib/content/schema";
import type { ResolvedImage } from "@/lib/images";
import { Frame } from "@/components/frame";
import { StatusPill } from "@/components/status-pill";
import { nn } from "@/lib/format";

/** A project plus its resolved first screenshot: serialisable, so client components can take it. */
export type ProjectView = { project: Project; image: ResolvedImage };

/** Full-width alternating feature row for headliners. */
export function ProjectFeature({ view, index, flip = false }: { view: ProjectView; index: number; flip?: boolean }) {
  const { project, image } = view;
  return (
    <article
      className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      data-scroll
    >
      <Link
        href={`/work/${project.slug}`}
        className={`relative block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        aria-label={`${project.name} — case study`}
        tabIndex={-1}
      >
        <span
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(255,122,69,0.22), transparent 70%)" }}
          aria-hidden
        />
        <div className="transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-1.5">
          <Frame image={image} sizes="(min-width: 1024px) 720px, 100vw" priority={index === 1} crop="16/10" label={project.name} />
        </div>
      </Link>

      <div className={`flex flex-col gap-5 lg:col-span-5 ${flip ? "lg:order-1 lg:pr-4" : "lg:pl-4"}`}>
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">
            <span className="text-accent">{nn(index)}</span> · {project.period}
          </span>
          <StatusPill status={project.status} />
        </div>
        <h3 className="display text-[2rem] sm:text-[2.6rem]" style={{ fontVariationSettings: '"opsz" 72, "SOFT" 30' }}>
          <Link href={`/work/${project.slug}`} className="transition-colors group-hover:text-accent-2">
            {project.name}
          </Link>
        </h3>
        <p className="lede max-w-[46ch] text-[1.05rem] text-fg-2 sm:text-[1.15rem]">{project.oneLiner}</p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1" aria-label="Stack">
          {project.stack.slice(0, 4).map((s) => (
            <li key={s} className="mono text-[0.68rem] text-fg-3">
              {s}
            </li>
          ))}
          {project.stack.length > 4 ? <li className="mono text-[0.68rem] text-fg-3">+{project.stack.length - 4}</li> : null}
        </ul>
        <Link href={`/work/${project.slug}`} className="btn mt-2 w-fit">
          Read the case study
          <span aria-hidden className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

/** Grid card for shipped products. */
export function ProjectCard({ view, index, delay = 0 }: { view: ProjectView; index: number; delay?: number }) {
  const { project, image } = view;
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group panel flex h-full flex-col gap-5 p-4 transition-[border-color,transform] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:border-line-strong sm:p-5"
      data-scroll
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <Frame image={image} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" crop="16/10" label={project.name} />
      <div className="flex flex-1 flex-col gap-2.5 px-1 pb-1">
        <div className="flex items-center justify-between gap-4">
          <span className="eyebrow">
            <span className="text-accent">{nn(index)}</span> · {project.period}
          </span>
          <StatusPill status={project.status} />
        </div>
        <h3 className="font-serif text-[1.5rem] leading-[1.08] tracking-[-0.015em] transition-colors group-hover:text-accent-2" style={{ fontVariationSettings: '"opsz" 48' }}>
          {project.name}
        </h3>
        <p className="text-[0.95rem] leading-[1.55] text-fg-2">{project.oneLiner}</p>
        <span className="mono mt-auto pt-3 text-[0.68rem] uppercase tracking-[0.12em] text-fg-3 transition-colors group-hover:text-fg">
          Case study <span aria-hidden className="text-accent">→</span>
        </span>
      </div>
    </Link>
  );
}

/** Compact row for experiments. */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li className="border-t border-line last:border-b" data-scroll>
      <Link
        href={`/work/${project.slug}`}
        className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 gap-y-1 py-5 sm:grid-cols-[2.5rem_minmax(11rem,1fr)_2fr_auto_auto] sm:gap-x-6"
      >
        <span className="mono text-[0.7rem] text-accent">{nn(index)}</span>
        <span className="font-serif text-[1.25rem] leading-tight transition-colors group-hover:text-accent-2" style={{ fontVariationSettings: '"opsz" 48' }}>
          {project.name}
        </span>
        <span className="col-start-2 text-[0.92rem] leading-[1.45] text-fg-2 sm:col-start-auto">{project.oneLiner}</span>
        <span className="col-start-2 eyebrow sm:col-start-auto">{project.period}</span>
        <span className="col-start-2 sm:col-start-auto">
          <StatusPill status={project.status} />
        </span>
      </Link>
    </li>
  );
}
