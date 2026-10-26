import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import * as content from "../src/content/project";

const MANIFEST = fileURLToPath(new URL("../../api/public/media/manifest.json", import.meta.url));

/** Gom mọi chuỗi trông giống MediaPath ("<group>/<file>.webp|svg") trong toàn bộ content. */
function collectMediaPaths(value: unknown, out = new Set<string>()): Set<string> {
  if (typeof value === "string") {
    if (/^[\w-]+\/[\w.@-]+\.(webp|svg|mp4)$/.test(value)) out.add(value);
  } else if (Array.isArray(value)) {
    for (const v of value) collectMediaPaths(v, out);
  } else if (value && typeof value === "object") {
    for (const v of Object.values(value)) collectMediaPaths(v, out);
  }
  return out;
}

describe("content", () => {
  it("has exactly 3 products and 12 amenities", () => {
    expect(content.products).toHaveLength(3);
    expect(content.amenities).toHaveLength(12);
  });

  it.skipIf(!existsSync(MANIFEST))("every media path exists on the CDN manifest", () => {
    const manifest = JSON.parse(readFileSync(MANIFEST, "utf8")) as Record<string, unknown>;
    const missing = [...collectMediaPaths(content)].filter((p) => !(p in manifest));
    expect(missing).toEqual([]);
  });
});
