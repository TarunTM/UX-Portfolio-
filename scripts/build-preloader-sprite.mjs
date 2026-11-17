// Builds the sword-pull preloader sprite sheet from the three character frames.
//
//   node scripts/build-preloader-sprite.mjs grab.png strain.png yank.png
//
// Input frames: 1024x1024, character on a flat green field, sword base at the
// same spot in every frame (x≈713, y≈893). The green is keyed out, the ground
// shadow is kept as translucent black, and the AI watermark in the
// bottom-right corner is removed. Output: one horizontal strip, three frames
// wide, as AVIF (primary, ~75KB) and WebP (fallback for older browsers),
// read by public/preloader/sword-intro.js.

import sharp from 'sharp';

const [, , ...args] = process.argv;
const frames = args.slice(0, 3);
const outBase = args[3] ?? 'public/preloader/sword-pull';

if (frames.length !== 3) {
  console.error('Usage: node scripts/build-preloader-sprite.mjs grab.png strain.png yank.png [out-base-path]');
  process.exit(1);
}

// The three frames were drawn at different scales: in frame 3 (yank) his
// shoes are 135px long vs 191px in frames 1-2, so it is ~0.71x. FIT scales it
// back up 1.41x around a pivot under his feet, so they stay planted where they
// are in the crouch and standing up makes him visibly taller.
const FIT = [
  { scale: 1 },
  { scale: 1 },
  { scale: 1.41, pivot: [589.5, 893] },
];
// Frame 3's own dirt marks around the old sword spot; erased because his feet
// move relative to the hole after rescaling (the field draws the hole instead).
const YANK_MARKS = { x0: 655, y0: 866, x1: 800, y1: 910, shadowRefX: 640 };

// Cell area in 1024px source space: union of all poses after FIT.
// Keep in sync with ART in public/preloader/sword-intro.js: the sword base
// (713.5, 893) sits at (713.5 - left, 893 - top) inside a cell.
const CROP = { left: -30, top: -205, width: 1140, height: 1124 };
const SCALE = 0.75;
const WATERMARK = { x0: 872, y0: 872, x1: 936, y1: 936 };
const NOISE_FLOOR = 0.14;
const cellW = Math.round(CROP.width * SCALE);
const cellH = Math.round(CROP.height * SCALE);
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

const median = (values) => Float64Array.from(values).sort()[values.length >> 1];

async function keyFrame(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  // Field colour = per-channel median of a 24px border ring.
  const ring = [[], [], []];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (x > 24 && x < W - 24 && y > 24 && y < H - 24) continue;
      const i = (y * W + x) * C;
      for (let k = 0; k < 3; k++) ring[k].push(data[i + k]);
    }
  }
  const bg = ring.map(median);
  const bgDominance = bg[1] - Math.max(bg[0], bg[2]);

  const rgba = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * C;
      const o = (y * W + x) * 4;
      const px = [data[i], data[i + 1], data[i + 2]];
      // Green dominance: field ≈ 0 alpha, outlines/skin/jacket ≈ 1, shadow in between.
      const a0 = 1 - (px[1] - Math.max(px[0], px[2])) / bgDominance;
      let a = Math.min(1, Math.max(0, (a0 - NOISE_FLOOR) / (1 - NOISE_FLOOR)));
      if (x >= WATERMARK.x0 && x <= WATERMARK.x1 && y >= WATERMARK.y0 && y <= WATERMARK.y1) a = 0;
      if (a <= 0.004) continue;
      // Unmix the field from semi-transparent edges: P = aF + (1-a)B.
      for (let k = 0; k < 3; k++) {
        rgba[o + k] = Math.max(0, Math.min(255, Math.round((px[k] - (1 - a) * bg[k]) / a)));
      }
      rgba[o + 3] = Math.round(a * 255);
    }
  }

  return { rgba, W, H };
}

function eraseYankMarks({ rgba, W }) {
  const m = YANK_MARKS;
  for (let y = m.y0; y <= m.y1; y++) {
    const ref = rgba[(y * W + m.shadowRefX) * 4 + 3]; // ground shadow on this row
    for (let x = m.x0; x <= m.x1; x++) {
      const o = (y * W + x) * 4;
      if (rgba[o + 3] > ref + 20) {
        rgba[o] = rgba[o + 1] = rgba[o + 2] = 0;
        rgba[o + 3] = ref;
      }
    }
  }
}

// Scale a keyed frame about its pivot and drop it into a CROP-sized cell.
async function toCell({ rgba, W, H }, fit) {
  let img = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });
  const S = Math.round(W * fit.scale);
  const f = S / W;
  if (S !== W) img = img.resize(S, S, { kernel: 'lanczos3' });
  const buf = await img.png().toBuffer();
  const [px, py] = fit.pivot ?? [0, 0];
  const ox = Math.round(px * (1 - f) - CROP.left);
  const oy = Math.round(py * (1 - f) - CROP.top);
  const sx = Math.max(0, -ox);
  const sy = Math.max(0, -oy);
  const w = Math.min(S - sx, CROP.width - Math.max(0, ox));
  const h = Math.min(S - sy, CROP.height - Math.max(0, oy));
  const part = await sharp(buf).extract({ left: sx, top: sy, width: w, height: h }).png().toBuffer();
  const cell = await sharp({ create: { width: CROP.width, height: CROP.height, channels: 4, background: CLEAR } })
    .composite([{ input: part, left: Math.max(0, ox), top: Math.max(0, oy) }])
    .png()
    .toBuffer();
  return sharp(cell).resize(cellW, cellH, { kernel: 'lanczos3' }).png().toBuffer();
}

const keyed = await Promise.all(frames.map(keyFrame));
eraseYankMarks(keyed[2]);
const cells = await Promise.all(keyed.map((k, i) => toCell(k, FIT[i])));

const sheet = await sharp({ create: { width: cellW * 3, height: cellH, channels: 4, background: CLEAR } })
  .composite(cells.map((input, i) => ({ input, left: i * cellW, top: 0 })))
  .png()
  .toBuffer();

await sharp(sheet).avif({ quality: 58, effort: 7 }).toFile(`${outBase}.avif`);
await sharp(sheet).webp({ quality: 76, alphaQuality: 85, effort: 6, smartSubsample: true }).toFile(`${outBase}.webp`);

console.log(`Wrote ${outBase}.avif + .webp (${cellW * 3}x${cellH}, cell ${cellW}x${cellH})`);
