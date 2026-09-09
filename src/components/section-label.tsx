/** Numbered mono eyebrow with a hairline rule: "01 · Thesis ————" */
export function SectionLabel({
  n,
  children,
  as: Tag = "h2",
  className = "",
  onPaper = false,
}: {
  n?: string;
  children: React.ReactNode;
  as?: "h2" | "h3" | "p" | "div";
  className?: string;
  onPaper?: boolean;
}) {
  return (
    <Tag className={`flex items-center gap-4 ${className}`.trim()}>
      <span className={`eyebrow ${onPaper ? "text-ink-2" : "text-fg-2"}`}>
        {n ? <span className={onPaper ? "text-accent-ink" : "text-accent"}>{n}</span> : null}
        {n ? <span aria-hidden> · </span> : null}
        {children}
      </span>
      <span className={`h-px flex-1 ${onPaper ? "bg-rule" : "bg-line"}`} aria-hidden />
    </Tag>
  );
}
