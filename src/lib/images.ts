import fs from "node:fs";
import path from "node:path";
import { resolveScreenshot } from "@/lib/content/load";

export type ResolvedImage = { src: string; alt: string; width: number; height: number; placeholder: boolean };

/** Read width/height from a PNG's IHDR chunk (first 24 bytes). Falls back to 1440x900. */
function pngSize(file: string): { width: number; height: number } {
  try {
    const fd = fs.openSync(file, "r");
    const buf = Buffer.alloc(24);
    fs.readSync(fd, buf, 0, 24, 0);
    fs.closeSync(fd);
    const isPng = buf.readUInt32BE(0) === 0x89504e47 && buf.toString("ascii", 12, 16) === "IHDR";
    if (isPng) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    /* fall through */
  }
  return { width: 1440, height: 900 };
}

/** Resolve a screenshot reference to a file that exists, with intrinsic size for layout stability. */
export function resolveImage(shot: { src: string; alt: string }): ResolvedImage {
  const src = resolveScreenshot(shot.src);
  const { width, height } = pngSize(path.join(process.cwd(), "public", src));
  return { src, alt: shot.alt, width, height, placeholder: src !== shot.src };
}

export function publicFileExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
