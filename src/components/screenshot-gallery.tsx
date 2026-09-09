import Image from "next/image";
import type { ResolvedImage } from "@/lib/images";
import { BrowserFrame, PhoneFrame, isPhoneShot } from "@/components/frame";

const tall = isPhoneShot;

/**
 * Hero shot in a browser frame (cropped to a sane height), then a grid of the rest.
 * Phone captures get a phone frame; long page captures are shown scrollable inside a fixed-height window.
 */
export function ScreenshotGallery({ images, name }: { images: ResolvedImage[]; name: string }) {
  const [first, ...rest] = images;
  if (!first) return null;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {tall(first) ? (
        <PhoneFrame image={first} sizes="280px" priority />
      ) : (
        <BrowserFrame image={first} sizes="(min-width: 1280px) 1200px, 100vw" priority crop={first.height > first.width * 0.9 ? "3/2" : "auto"} label={name} />
      )}
      <p className="mono -mt-2 text-[0.7rem] leading-relaxed text-fg-3">{first.alt}</p>

      {rest.length > 0 ? (
        <ul className={`grid gap-6 ${rest.length === 1 ? "sm:grid-cols-1" : rest.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {rest.map((img, i) => (
            <li key={`${img.src}-${i}`} className="flex flex-col gap-3" data-scroll style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              {tall(img) ? (
                <div className="flex justify-center rounded-xl border border-line bg-bg-2/60 py-8">
                  <PhoneFrame image={img} sizes="220px" className="max-w-[220px]" />
                </div>
              ) : (
                <figure className="overflow-hidden rounded-xl border border-line bg-bg-3">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                    <Image
                      src={img.src}
                      alt={img.alt || `${name} screenshot ${i + 2}`}
                      width={img.width}
                      height={img.height}
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                  </div>
                </figure>
              )}
              <span className="mono text-[0.68rem] leading-relaxed text-fg-3">{img.placeholder ? "Screenshot pending" : img.alt}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
