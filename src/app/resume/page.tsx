import type { Metadata } from "next";
import { loadSite, loadMarkdown } from "@/lib/content/load";
import { publicFileExists } from "@/lib/images";
import { Markdown } from "@/components/markdown";
import { PageShell } from "@/components/page-shell";

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
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-reveal>
        <p className="eyebrow tnum">
          <span className="text-accent">04</span> · Resume
        </p>
        {hasPdf ? (
          <a
            href={site.resumePdf}
            className="inline-flex w-fit items-center gap-2 border border-ink px-4 py-2.5 text-[0.85rem] uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper"
            download
          >
            Download PDF
            <span aria-hidden>↓</span>
          </a>
        ) : (
          <span className="eyebrow">PDF coming shortly</span>
        )}
      </div>

      <div className="mt-10 border-t-2 border-ink pt-10 sm:mt-12">
        {resume ? (
          <Markdown className="resume">{resume}</Markdown>
        ) : (
          <p className="font-serif text-ink-2">The resume is being edited. Email {site.email} for a copy.</p>
        )}
      </div>
    </PageShell>
  );
}
