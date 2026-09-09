import type { Status } from "@/lib/content/schema";
import { STATUS_LABEL } from "@/lib/format";

export function StatusPill({ status }: { status: Status }) {
  const live = status === "live";
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-sans text-[0.7rem] uppercase tracking-[0.12em] text-ink-2">
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${live ? "bg-accent" : "border border-ink-3"}`}
        aria-hidden
      />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
