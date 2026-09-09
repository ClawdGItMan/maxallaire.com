import { loadSite } from "@/lib/content/load";

export default function HomePage() {
  const site = loadSite();
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-24 sm:px-8 sm:pt-24" data-reveal>
      <p className="eyebrow tnum mb-6">Max Allaire · 2026</p>
      <h1 className="display max-w-[16ch] text-[2.35rem] sm:text-[3.4rem] lg:text-[4.1rem]">{site.headline}</h1>
      <p className="mt-8 max-w-[52ch] font-serif text-[1.15rem] leading-[1.5] text-ink-2 sm:text-[1.3rem]">{site.sub}</p>
    </section>
  );
}
