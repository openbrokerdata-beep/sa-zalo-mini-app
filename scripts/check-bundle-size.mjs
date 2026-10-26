#!/usr/bin/env node
/**
 * Kiểm tra dung lượng gói Mini App sau build (apps/miniapp/www).
 * Ngân sách nội bộ mặc định 3 MB (BUNDLE_BUDGET_KB) — thấp hơn nhiều so với giới hạn của Zalo
 * để Mini App mở nhanh trên 4G. Ảnh/video phải nằm trên CDN, không nằm trong gói.
 */
import { readdir, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const WWW = join(ROOT, "apps", "miniapp", "www");
const BUDGET_KB = Number(process.env.BUNDLE_BUDGET_KB ?? 3072);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let total = 0;
const files = [];
try {
  for await (const f of walk(WWW)) {
    const size = (await stat(f)).size;
    total += size;
    files.push([relative(WWW, f), size]);
  }
} catch {
  console.error(
    `Không thấy ${relative(ROOT, WWW)} — chạy "pnpm --filter @sa/miniapp build" trước.`,
  );
  process.exit(1);
}

files.sort((a, b) => b[1] - a[1]);
for (const [f, s] of files.slice(0, 10))
  console.info(`${(s / 1024).toFixed(1).padStart(9)} KB  ${f}`);
const totalKb = total / 1024;
console.info(`Tổng: ${totalKb.toFixed(1)} KB / ngân sách ${BUDGET_KB} KB`);
if (totalKb > BUDGET_KB) {
  console.error("✗ Vượt ngân sách dung lượng gói Mini App");
  process.exit(1);
}
