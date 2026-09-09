export function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  if (stats.length === 0) return null;
  return (
    <ul
      className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line sm:grid-cols-3 lg:grid-cols-5"
      aria-label="By the numbers"
      data-scroll
    >
      {stats.map((s, i) => (
        <li
          key={s.label}
          className="flex flex-col gap-2 border-line px-5 py-6 last:odd:col-span-2 sm:last:odd:col-span-1 [&:nth-child(n+2)]:border-l sm:[&:nth-child(4)]:border-l-0 lg:[&:nth-child(4)]:border-l [&:nth-child(n+3)]:border-t sm:[&:nth-child(3)]:border-t-0 lg:[&:nth-child(n+3)]:border-t-0 sm:px-6 sm:py-8"
          style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
        >
          <span className="display text-[2.2rem] text-fg sm:text-[2.7rem]" style={{ fontVariationSettings: '"opsz" 72, "SOFT" 30' }}>
            {s.value}
          </span>
          <span className="text-[0.85rem] leading-[1.4] text-fg-2">{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
