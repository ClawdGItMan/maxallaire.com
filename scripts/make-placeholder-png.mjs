// Writes a flat neutral-grey PNG with no external dependencies.
// Usage: node scripts/make-placeholder-png.mjs <out.png> [width] [height] [grey 0-255]
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [, , out, w = "1440", h = "900", g = "228"] = process.argv;
if (!out) {
  console.error("usage: make-placeholder-png.mjs <out.png> [width] [height] [grey]");
  process.exit(1);
}
const width = Number(w);
const height = Number(h);
const grey = Number(g);

const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
};

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 0; // colour type: greyscale
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

// Each scanline: filter byte 0 followed by `width` grey bytes.
const row = Buffer.alloc(width + 1, grey);
row[0] = 0;
const raw = Buffer.concat(Array.from({ length: height }, () => row));

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, png);
console.log(`wrote ${out} (${width}x${height}, grey ${grey}, ${png.length} bytes)`);
