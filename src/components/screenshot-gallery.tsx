import Image from "next/image";
import type { ResolvedImage } from "@/lib/images";

export function ScreenshotGallery({ images, name }: { images: ResolvedImage[]; name: string }) {
  const [first, ...rest] = images;
  if (!first) return null;
  const tall = (img: ResolvedImage) => img.height > img.width;
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <figure className="border border-rule bg-paper-2">
        <Image
          src={first.src}
          alt={first.alt}
          width={first.width}
          height={first.height}
          sizes="(min-width: 1024px) 960px, 100vw"
          priority
          className={`w-full ${tall(first) ? "mx-auto max-h-[80vh] w-auto" : ""}`}
        />
        <figcaption className="flex items-baseline justify-between gap-4 border-t border-rule px-3 py-2 text-[0.75rem] text-ink-3">
          <span>{first.alt}</span>
          {first.placeholder ? <span className="eyebrow">Screenshot pending</span> : null}
        </figcaption>
      </figure>
      {rest.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {rest.map((img, i) => (
            <li key={`${img.src}-${i}`} className="flex flex-col border border-rule bg-paper-2">
              <div className={`flex items-start justify-center overflow-hidden ${tall(img) ? "aspect-[9/16]" : "aspect-[16/10]"}`}>
                <Image
                  src={img.src}
                  alt={img.alt || `${name} screenshot ${i + 2}`}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 640px) 320px, 50vw"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <span className="border-t border-rule px-2.5 py-1.5 text-[0.72rem] leading-snug text-ink-3">
                {img.placeholder ? "Screenshot pending" : img.alt}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
