import Link from "next/link";
import type { Site } from "@/lib/content/schema";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildStamp(): string {
  const d = new Date();
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function Footer({ site }: { site: Site }) {
  const links = [
    { href: `mailto:${site.email}`, label: "Email", value: site.email },
    { href: site.linkedin, label: "LinkedIn", value: site.linkedin.replace(/^https?:\/\/(www\.)?/, "") },
    { href: site.github, label: "GitHub", value: site.github.replace(/^https?:\/\/(www\.)?/, "") },
    ...(site.x ? [{ href: site.x, label: "X", value: site.x.replace(/^https?:\/\/(www\.)?/, "") }] : []),
  ];

  return (
    <footer className="relative z-10 mt-28 border-t border-line sm:mt-40">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24 sm:pb-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20" data-scroll>
          <div>
            <p className="eyebrow mb-6">
              <span className="text-accent">Now</span> · {buildStamp()}
            </p>
            <h2 className="display text-[2.4rem] sm:text-[3.6rem] lg:text-[4.4rem]">
              Let&rsquo;s talk about <em>what&rsquo;s next</em> on Solana.
            </h2>
            {site.now ? <p className="lede mt-6 max-w-[48ch] text-[1.1rem] text-fg-2 sm:text-[1.25rem]">{site.now}</p> : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                Email me <span aria-hidden>→</span>
              </a>
              <a href={site.resumePdf} className="btn" download>
                Resume PDF <span aria-hidden className="text-accent">↓</span>
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6 lg:pt-10">
            <ul className="flex flex-col gap-5">
              {links.map((l) => (
                <li key={l.label} className="flex flex-col gap-1.5">
                  <span className="eyebrow">{l.label}</span>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                    className="link-fg w-fit break-all text-[0.95rem]"
                  >
                    {l.value}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2 text-[0.9rem] text-fg-2">
              <li><span className="eyebrow mb-2 block">Index</span></li>
              {[
                ["/thesis", "Thesis"],
                ["/work", "Work"],
                ["/resume", "Resume"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="link-fg">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">
            {site.name} · {buildStamp()}
          </p>
          <p className="eyebrow">Directed, not hand-coded. Built with Claude Code on Next.js · Vercel.</p>
        </div>
      </div>
    </footer>
  );
}
