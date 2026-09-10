/** Infinite horizontal ticker of short labels. Pauses on hover; static under reduced motion. */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) return null;
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-4" aria-label={label}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" aria-hidden />
      <ul className="marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((it, i) => (
          <li key={`${it}-${i}`} className="mono flex items-center gap-10 text-[0.72rem] uppercase tracking-[0.14em] text-fg-2" aria-hidden={i >= items.length}>
            {it}
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
