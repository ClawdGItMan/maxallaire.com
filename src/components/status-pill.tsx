import type { Status } from "@/lib/content/schema";
import { STATUS_LABEL } from "@/lib/format";

const DOT: Record<Status, string> = {
  live: "bg-mint live-dot",
  demo: "bg-accent",
  prototype: "border border-fg-3",
  "case-study": "bg-fg-2",
  archived: "border border-fg-3 opacity-60",
};

/** `onPaper` flips the colours for use inside a .sheet */
export function StatusPill({ status, onPaper = false }: { status: Status; onPaper?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-2.5 py-1 mono text-[0.62rem] uppercase tracking-[0.12em] ${
        onPaper ? "border-rule-strong text-ink-2" : "border-line-strong text-fg-2"
      }`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${DOT[status]}`} aria-hidden />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
