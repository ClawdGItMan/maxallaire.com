import Link from "next/link";
import Image from "next/image";
import type { ProjectView } from "@/components/project-card";

/**
 * Three headliner screenshots fanned on the desk. Purely decorative on small
 * screens (hidden), a visual index of the work on large ones.
 */
export function HeroStack({ views }: { views: ProjectView[] }) {
  const three = views.slice(0, 3);
  if (three.length === 0) return null;
  const poses = [
    "left-0 top-14 rotate-[-6deg] z-10 w-[62%]",
    "right-0 top-0 rotate-[4deg] z-20 w-[66%]",
    "left-[18%] bottom-0 rotate-[-1.5deg] z-30 w-[64%]",
  ];
  return (
    <div className="relative aspect-[5/4] w-full" aria-label="Selected work" data-reveal>
      <span
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(255,122,69,0.18), transparent 70%)" }}
        aria-hidden
      />
      {three.map((v, i) => (
        <Link
          key={v.project.slug}
          href={`/work/${v.project.slug}`}
          className={`group absolute block overflow-hidden rounded-lg border border-line-strong bg-bg-3 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] hover:z-40 hover:rotate-0 hover:scale-[1.04] ${poses[i]}`}
          aria-label={v.project.name}
        >
          <div className="flex items-center gap-1.5 border-b border-line bg-bg-4/70 px-2.5 py-1.5" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-fg-3/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-fg-3/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-fg-3/60" />
            <span className="mono ml-2 truncate text-[0.55rem] text-fg-3">{v.project.name}</span>
          </div>
          <div className="relative" style={{ aspectRatio: "16/10" }}>
            <Image
              src={v.image.src}
              alt={v.image.alt}
              width={v.image.width}
              height={v.image.height}
              sizes="(min-width: 1024px) 420px, 0px"
              priority={i === 2}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
