import sharp from 'sharp';
import { readdir, rename, unlink } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public');

const files = await readdir(publicDir);
const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

const configs = [
  { match: /^hero\.jpg$/i,       width: 1400, quality: 82 },
  { match: /^courts-hero\./i,    width: 1400, quality: 82 },
  { match: /^programs-/i,        width: 800,  quality: 78 },
  { match: /^story-/i,           width: 650,  quality: 75 },
  { match: /^(avatar|coach)-/i,  width: 200,  quality: 80 },
];

for (const file of imageFiles) {
  const cfg = configs.find(c => c.match.test(file)) ?? { width: 800, quality: 78 };
  const inputPath = join(publicDir, file);
  const stem = basename(file, extname(file));
  const outputPath = join(publicDir, stem + '.jpg');
  const tmpPath = outputPath + '.tmp';

  process.stdout.write(`Compressing ${file}...`);
  try {
    const info = await sharp(inputPath)
      .resize(cfg.width, null, { withoutEnlargement: true })
      .jpeg({ quality: cfg.quality, progressive: true, mozjpeg: true })
      .toFile(tmpPath);

    await rename(tmpPath, outputPath);

    // Delete original PNG if we converted it
    if (extname(file).toLowerCase() !== '.jpg' && inputPath !== outputPath) {
      await unlink(inputPath);
    }

    console.log(` ✓ ${Math.round(info.size / 1024)}KB`);
  } catch (err) {
    console.error(` ✗ ${err.message}`);
  }
}
