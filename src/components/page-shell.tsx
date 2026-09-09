/** Consistent horizontal padding + max width. `narrow` is the prose measure. */
export function PageShell({
  children,
  narrow = false,
  className = "",
}: {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div className={`mx-auto px-5 pt-12 pb-8 sm:px-8 sm:pt-16 ${narrow ? "max-w-3xl" : "max-w-6xl"} ${className}`.trim()}>
      {children}
    </div>
  );
}

export function PageTitle({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5" data-reveal>
      <p className="eyebrow tnum">{eyebrow}</p>
      <h1 className="display text-[2.3rem] sm:text-[3.2rem] lg:text-[3.8rem]">{title}</h1>
      {lede ? <p className="max-w-[58ch] font-serif text-[1.15rem] leading-[1.5] text-ink-2 sm:text-[1.3rem]">{lede}</p> : null}
    </div>
  );
}
