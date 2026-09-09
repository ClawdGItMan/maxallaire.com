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
  ];

  return (
    <footer className="relative z-10 mt-24 border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <ul className="grid gap-4 sm:grid-cols-3 sm:gap-8">
            {links.map((l) => (
              <li key={l.label} className="flex flex-col gap-1.5">
                <span className="eyebrow">{l.label}</span>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  className="link-ink w-fit break-all text-[0.95rem]"
                >
                  {l.value}
                </a>
              </li>
            ))}
          </ul>
          <p className="eyebrow tnum sm:text-right">
            {site.name} · {buildStamp()}
          </p>
        </div>
      </div>
    </footer>
  );
}
