"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/thesis", label: "Thesis", n: "01" },
  { href: "/work", label: "Work", n: "02" },
  { href: "/how-i-work", label: "How I Work", n: "03" },
  { href: "/resume", label: "Resume", n: "04" },
] as const;

export function Nav({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <header className="relative z-10 border-b border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 pt-5 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:px-8 sm:py-5">
        <Link
          href="/"
          className="font-serif text-[1.35rem] leading-none tracking-[-0.01em] text-ink hover:text-accent-ink"
          aria-label={`${name} — home`}
        >
          {name}
          <span className="ml-1.5 inline-block h-[0.42em] w-[0.42em] translate-y-[-0.05em] rounded-full bg-accent align-baseline" aria-hidden />
        </Link>

        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 sm:gap-x-7">
            {ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "group inline-flex items-baseline gap-1.5 py-1 text-[0.9rem] tracking-[0.01em] transition-colors",
                      active ? "text-ink" : "text-ink-2 hover:text-ink",
                    ].join(" ")}
                  >
                    <span className="eyebrow tnum hidden text-[0.6rem] transition-colors group-hover:text-accent sm:inline" aria-hidden>
                      {item.n}
                    </span>
                    <span
                      className={[
                        "border-b transition-colors",
                        active ? "border-accent" : "border-transparent group-hover:border-rule-strong",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
