"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveal. Any element with [data-scroll] starts hidden (see globals.css)
 * and gets .is-in when it enters the viewport. Watches for elements added later
 * (route changes, client-side filtering) so nothing stays hidden.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const supportsIO = "IntersectionObserver" in window;
    const io = supportsIO
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-in");
                io?.unobserve(entry.target);
              }
            }
          },
          { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
        )
      : null;

    const track = (el: HTMLElement) => {
      if (el.classList.contains("is-in")) return;
      if (!io) {
        el.classList.add("is-in");
        return;
      }
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.94) el.classList.add("is-in");
      else io.observe(el);
    };

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-scroll]").forEach(track);
      if (root instanceof HTMLElement && root.hasAttribute("data-scroll")) track(root);
    };

    scan(document);

    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) scan(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io?.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
