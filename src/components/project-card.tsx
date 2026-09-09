import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content/schema";
import { resolveImage } from "@/lib/images";
import { StatusPill } from "@/components/status-pill";
import { nn } from "@/lib/format";

/** Image-led card for headliners and shipped products. */
export function ProjectCard({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  const img = resolveImage(project.screenshots[0]);
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
    >
      <div className="relative overflow-hidden border border-rule bg-paper-2 aspect-[16/10]">
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes={large ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.02]"
          priority={large && index === 1}
        />
        {img.placeholder ? (
          <span className="eyebrow absolute bottom-3 left-3 bg-paper px-2 py-1">Screenshot pending</span>
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow tnum">
            <span className="text-accent">{nn(index)}</span> · {project.period}
          </span>
          <StatusPill status={project.status} />
        </div>
        <h3 className={`font-serif leading-[1.1] tracking-[-0.01em] group-hover:text-accent-ink transition-colors ${large ? "text-[1.6rem] sm:text-[1.9rem]" : "text-[1.3rem] sm:text-[1.45rem]"}`}>
          {project.name}
        </h3>
        <p className="max-w-[48ch] text-[0.95rem] leading-[1.5] text-ink-2">{project.oneLiner}</p>
      </div>
    </Link>
  );
}

/** Compact one-line row for experiments. */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <li className="border-t border-rule last:border-b">
      <Link
        href={`/work/${project.slug}`}
        className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 gap-y-1 py-4 sm:grid-cols-[2.5rem_minmax(11rem,1fr)_2fr_auto_auto] sm:gap-x-6"
      >
        <span className="eyebrow tnum text-accent">{nn(index)}</span>
        <span className="font-serif text-[1.15rem] leading-tight group-hover:text-accent-ink transition-colors">{project.name}</span>
        <span className="col-start-2 text-[0.92rem] leading-[1.45] text-ink-2 sm:col-start-auto">{project.oneLiner}</span>
        <span className="col-start-2 eyebrow tnum sm:col-start-auto">{project.period}</span>
        <span className="col-start-2 sm:col-start-auto">
          <StatusPill status={project.status} />
        </span>
      </Link>
    </li>
  );
}
