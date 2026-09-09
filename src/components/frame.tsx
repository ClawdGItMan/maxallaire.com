import Image from "next/image";
import type { ResolvedImage } from "@/lib/images";

/** A phone capture is narrow (≤ 800px wide) and portrait. Long desktop page captures stay in a browser frame. */
export const isPhoneShot = (img: ResolvedImage) => img.width <= 800 && img.height > img.width * 1.2;
const isTall = isPhoneShot;

/**
 * Screenshot inside a device chrome. Landscape captures get a browser frame,
 * portrait captures get a phone frame. Tall page captures are cropped from the top.
 */
export function Frame({
  image,
  sizes,
  priority = false,
  crop = "16/10",
  className = "",
  label,
}: {
  image: ResolvedImage;
  sizes: string;
  priority?: boolean;
  /** aspect ratio used to crop a landscape shot; "auto" shows the whole image */
  crop?: "16/10" | "4/3" | "3/2" | "auto";
  className?: string;
  label?: string;
}) {
  if (isTall(image)) return <PhoneFrame image={image} sizes={sizes} priority={priority} className={className} />;
  return <BrowserFrame image={image} sizes={sizes} priority={priority} crop={crop} className={className} label={label} />;
}

export function BrowserFrame({
  image,
  sizes,
  priority = false,
  crop = "16/10",
  className = "",
  label,
}: {
  image: ResolvedImage;
  sizes: string;
  priority?: boolean;
  crop?: "16/10" | "4/3" | "3/2" | "auto";
  className?: string;
  label?: string;
}) {
  const ratio = crop === "auto" ? undefined : crop;
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line-strong bg-bg-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] ${className}`.trim()}
    >
      <div className="flex items-center gap-2 border-b border-line bg-bg-4/70 px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-fg-3/60" />
          <span className="h-2 w-2 rounded-full bg-fg-3/60" />
          <span className="h-2 w-2 rounded-full bg-fg-3/60" />
        </span>
        <span className="mono ml-2 truncate text-[0.62rem] text-fg-3" aria-hidden>
          {label ?? image.alt.slice(0, 60)}
        </span>
      </div>
      <div className="relative overflow-hidden bg-bg-2" style={ratio ? { aspectRatio: ratio } : undefined}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className={ratio ? "absolute inset-0 h-full w-full object-cover object-top" : "block h-auto w-full"}
        />
        {image.placeholder ? <span className="eyebrow absolute bottom-3 left-3 rounded bg-bg px-2 py-1">Screenshot pending</span> : null}
      </div>
    </figure>
  );
}

export function PhoneFrame({
  image,
  sizes,
  priority = false,
  className = "",
}: {
  image: ResolvedImage;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`mx-auto w-full max-w-[280px] ${className}`.trim()}>
      <div className="relative overflow-hidden rounded-[2.2rem] border border-line-strong bg-bg-3 p-2 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-bg-2" style={{ aspectRatio: "9/19.5" }}>
          <span className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-bg-3" aria-hidden />
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </figure>
  );
}
