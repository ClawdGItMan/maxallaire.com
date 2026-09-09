import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell narrow className="pt-28 sm:pt-40">
      <div data-reveal>
        <p className="eyebrow">
          <span className="text-accent">404</span> · Not found
        </p>
        <h1 className="display mt-6 text-[2.6rem] sm:text-[3.8rem]">
          Nothing on the desk <em>here.</em>
        </h1>
        <p className="lede mt-6 max-w-[44ch] text-[1.15rem] text-fg-2">The page may have moved while the site was being built.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Front page <span aria-hidden>→</span>
          </Link>
          <Link href="/work" className="btn">
            All work
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
