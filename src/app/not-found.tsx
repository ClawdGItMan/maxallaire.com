import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell narrow className="pt-24 sm:pt-32">
      <p className="eyebrow tnum">404</p>
      <h1 className="display mt-5 text-[2.3rem] sm:text-[3.2rem]">Nothing here.</h1>
      <p className="mt-6 font-serif text-[1.15rem] text-ink-2">
        The page may have moved while the site was being built.{" "}
        <Link href="/" className="link-ink">Back to the front page</Link>.
      </p>
    </PageShell>
  );
}
