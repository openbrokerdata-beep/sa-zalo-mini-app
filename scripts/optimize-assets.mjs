#!/usr/bin/env node
/**
 * Chuẩn hoá kho ảnh gốc (images/) → apps/api/public/media (deploy lên CDN cùng Lead API).
 *
 *   images/<site>/<group>/<group>_<name>.<ext>  →  apps/api/public/media/<group>/<name>.webp
 *
 * - jpg/png → webp (rộng tối đa 1080px; mặt bằng 2000px để zoom). svg → copy nguyên.
 * - Ưu tiên nguồn B (senturia-com-vn, trang chính thức), nguồn A chỉ bổ sung file B không có.
 * - Trùng tên khác đuôi (arena1-3.jpg + arena1-3.png) → bản thứ hai thành "<name>-<ext>.webp".
 * - mp4 chỉ copy khi có cờ --with-video (mỗi file ~6MB).
 * - Chạy tăng dần: bỏ qua file đích mới hơn file nguồn. --force để làm lại toàn bộ.
 * - Sinh manifest.json: { "<group>/<file>": { width, height, bytes } } — test content dùng để kiểm tra link ảnh.
 *
 * Dùng: pnpm assets:optimize [--force] [--with-video]
 */
import { copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "images");
const OUT = join(ROOT, "apps", "api", "public", "media");
const SITES = ["senturia-com-vn", "senturia-info"]; // thứ tự ưu tiên
const FORCE = process.argv.includes("--force");
const WITH_VIDEO = process.argv.includes("--with-video");
const MAX_WIDTH = { default: 1080, "mat-bang": 2000 };

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function isFresh(src, dest) {
  if (FORCE) return false;
  try {
    return (await stat(dest)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
}

const manifest = {};
const claimed = new Map(); // "<group>/<name>" -> ext gốc đã chiếm
let converted = 0;
let skipped = 0;
let inBytes = 0;
let outBytes = 0;

for (const site of SITES) {
  for await (const file of walk(join(SRC, site))) {
    const group = basename(dirname(file));
    const ext = extname(file).toLowerCase();
    let name = basename(file, extname(file));
    if (name.startsWith(`${group}_`)) name = name.slice(group.length + 1);

    const key = `${group}/${name}`;
    const prev = claimed.get(key);
    if (prev && prev.site !== site) continue; // nguồn B đã có → bỏ bản nguồn A
    if (prev && prev.ext !== ext) name = `${name}-${ext.slice(1)}`;
    else if (!prev) claimed.set(key, { site, ext });

    let outName;
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") outName = `${name}.webp`;
    else if (ext === ".svg") outName = `${name}.svg`;
    else if (ext === ".mp4" && WITH_VIDEO) outName = `${name}.mp4`;
    else continue;

    const rel = `${group}/${outName}`;
    const dest = join(OUT, group, outName);
    await mkdir(dirname(dest), { recursive: true });
    inBytes += (await stat(file)).size;

    if (await isFresh(file, dest)) {
      skipped++;
    } else if (outName.endsWith(".webp")) {
      await sharp(file)
        .rotate()
        .resize({ width: MAX_WIDTH[group] ?? MAX_WIDTH.default, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(dest);
      converted++;
    } else {
      await copyFile(file, dest);
      converted++;
    }

    const size = (await stat(dest)).size;
    outBytes += size;
    const meta = outName.endsWith(".webp") ? await sharp(dest).metadata() : {};
    manifest[rel] = { width: meta.width ?? null, height: meta.height ?? null, bytes: size };
  }
}

await writeFile(join(OUT, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
const mb = (b) => `${(b / 1024 / 1024).toFixed(1)} MB`;
console.info(
  `media: ${Object.keys(manifest).length} file (${converted} xử lý, ${skipped} giữ nguyên) · ` +
    `${mb(inBytes)} → ${mb(outBytes)} · ${relative(ROOT, OUT)}`,
);
