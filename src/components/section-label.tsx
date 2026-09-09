/** Numbered eyebrow with a hairline rule: "01 · Thesis ————" */
export function SectionLabel({
  n,
  children,
  as: Tag = "h2",
  className = "",
}: {
  n?: string;
  children: React.ReactNode;
  as?: "h2" | "h3" | "p" | "div";
  className?: string;
}) {
  return (
    <Tag className={`flex items-center gap-3 ${className}`.trim()}>
      <span className="eyebrow tnum text-ink-2">
        {n ? <span className="text-accent">{n}</span> : null}
        {n ? <span aria-hidden> · </span> : null}
        {children}
      </span>
      <span className="h-px flex-1 bg-rule" aria-hidden />
    </Tag>
  );
}
