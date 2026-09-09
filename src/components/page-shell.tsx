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
    <div className={`mx-auto px-5 pt-12 pb-8 sm:px-8 sm:pt-20 ${narrow ? "max-w-4xl" : "max-w-7xl"} ${className}`.trim()}>
      {children}
    </div>
  );
}

export function PageTitle({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end" data-reveal>
      <div className="flex flex-col gap-6">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display text-[2.6rem] sm:text-[3.8rem] lg:text-[4.6rem]">{title}</h1>
        {lede ? <p className="lede max-w-[58ch] text-[1.15rem] text-fg-2 sm:text-[1.3rem]">{lede}</p> : null}
      </div>
      {aside ? <div className="lg:pb-2">{aside}</div> : null}
    </div>
  );
}

/** A paper sheet laid on the desk. Long-form reading goes here. */
export function Sheet({
  children,
  className = "",
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={`sheet ${padded ? "px-6 py-10 sm:px-14 sm:py-16 lg:px-20 lg:py-20" : ""} ${className}`.trim()}>{children}</div>
  );
}
