const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-09-09" → "9 Sep 2026"; anything unparseable is returned as-is. */
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}


export const STATUS_LABEL: Record<string, string> = {
  live: "Live",
  demo: "Demo",
  prototype: "Prototype",
  "case-study": "Case study",
  archived: "Archived",
  discontinued: "Discontinued",
};

/** Two-digit index for eyebrow labels: 1 → "01" */
export const nn = (i: number) => String(i).padStart(2, "0");
