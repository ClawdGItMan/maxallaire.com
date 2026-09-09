import type { Metadata } from "next";
import { loadSite, loadMarkdown } from "@/lib/content/load";
import { publicFileExists } from "@/lib/images";
import { Markdown } from "@/components/markdown";
import { PageShell, Sheet } from "@/components/page-shell";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "Resume",
  description: "Max Allaire — business development and ecosystem operator, crypto × AI.",
};

export default function ResumePage() {
  const site = loadSite();
  const resume = loadMarkdown("resume.md");
  const hasPdf = publicFileExists(site.resumePdf);

  return (
    <PageShell narrow>
      <div className="no-print flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-reveal>
        <div className="flex flex-col gap-5">
          <p className="eyebrow">
            <span className="text-accent">04</span> · Resume
          </p>
          <h1 className="display text-[2.4rem] sm:text-[3.4rem]">
            One page, <em>kept current.</em>
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          {hasPdf ? (
            <a href={site.resumePdf} className="btn btn-primary" download>
              Download PDF <span aria-hidden>↓</span>
            </a>
          ) : (
            <span className="eyebrow">PDF coming shortly</span>
          )}
          <PrintButton />
        </div>
      </div>

      <div className="mt-12 sm:mt-16" data-scroll>
        <Sheet>
          {resume ? (
            <Markdown className="resume">{resume}</Markdown>
          ) : (
            <p className="font-serif text-ink-2">The resume is being edited. Email {site.email} for a copy.</p>
          )}
        </Sheet>
      </div>
    </PageShell>
  );
}
