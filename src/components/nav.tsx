"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS = [
  { href: "/thesis", label: "Thesis", n: "01" },
  { href: "/work", label: "Work", n: "02" },
  { href: "/how-i-work", label: "How I Work", n: "03" },
  { href: "/resume", label: "Resume", n: "04" },
] as const;

export function Nav({ name, resumePdf }: { name: string; resumePdf: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // close the mobile menu whenever the route changes (state adjusted during render, per React docs)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-serif text-[1.2rem] leading-none tracking-[-0.01em] text-fg"
          aria-label={`${name} — home`}
          style={{ fontVariationSettings: '"opsz" 48' }}
        >
          <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" aria-hidden />
          {name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "group relative inline-flex items-baseline gap-2 rounded-full px-3.5 py-2 text-[0.9rem] transition-colors",
                      active ? "text-fg" : "text-fg-2 hover:text-fg",
                    ].join(" ")}
                  >
                    <span className={`mono text-[0.62rem] ${active ? "text-accent" : "text-fg-3 group-hover:text-accent"} transition-colors`} aria-hidden>
                      {item.n}
                    </span>
                    {item.label}
                    <span
                      className={[
                        "absolute inset-x-3.5 -bottom-px h-px transition-all duration-300",
                        active ? "bg-accent opacity-100" : "bg-fg-3 opacity-0 group-hover:opacity-60",
                      ].join(" ")}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={resumePdf} className="btn hidden md:inline-flex py-2.5" download>
            Resume
            <span aria-hidden className="text-accent">↓</span>
          </a>
          <button
            type="button"
            className="btn md:hidden py-2.5"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="md:hidden border-t border-line bg-bg/95 backdrop-blur-xl"
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4" data-reveal>
          {ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <li key={item.href} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="flex items-baseline gap-4 py-4 font-serif text-[1.7rem] text-fg"
                  style={{ fontVariationSettings: '"opsz" 72' }}
                >
                  <span className={`mono text-[0.7rem] ${active ? "text-accent" : "text-fg-3"}`}>{item.n}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-5">
            <a href={resumePdf} className="btn btn-primary" download>
              Download resume <span aria-hidden>↓</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
