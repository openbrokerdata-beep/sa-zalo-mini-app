/** Cấu hình runtime đọc từ biến môi trường Vite (apps/miniapp/.env*). */
export const config = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, ""),
  assetBaseUrl: (import.meta.env.VITE_ASSET_BASE_URL ?? "").replace(/\/$/, ""),
  zaloOaId: import.meta.env.VITE_ZALO_OA_ID ?? "",
  hotline: import.meta.env.VITE_HOTLINE ?? "18006627",
  appVersion: import.meta.env.VITE_APP_VERSION ?? "0.0.0",
} as const;

/** URL ảnh trên CDN — `media("san-pham/arena1.webp")`. Xem docs/06-infra-deployment.md §Assets. */
export function media(path: string): string {
  return `${config.assetBaseUrl}/media/${path}`;
}

/** "18006627" -> "1800 6627", "0325898989" -> "0325 89 89 89" */
export function formatHotline(n: string): string {
  if (n.startsWith("1800") || n.startsWith("1900")) return `${n.slice(0, 4)} ${n.slice(4)}`;
  return n.replace(/^(\d{4})(\d{2})(\d{2})(\d{2,3})$/, "$1 $2 $3 $4");
}
