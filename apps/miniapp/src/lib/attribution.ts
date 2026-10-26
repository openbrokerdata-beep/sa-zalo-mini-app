import type { Attribution } from "@sa/shared";
import { getRouteParams } from "zmp-sdk/apis";

const KEY = "sa_attribution";

const PARAM_MAP: Record<string, keyof Attribution> = {
  utm_source: "source",
  utm_medium: "medium",
  utm_campaign: "campaign",
  utm_content: "content",
  utm_term: "term",
  ref: "ref",
  entry: "entryPoint",
};

/**
 * Đọc UTM/ref từ link mở Mini App (vd. https://zalo.me/s/<APP_ID>/?utm_source=oa&ref=SALE01)
 * — chạy 1 lần lúc khởi động, lưu sessionStorage để gắn vào lead.
 */
export function captureAttribution(): void {
  const params: Record<string, string> = {};
  try {
    new URLSearchParams(window.location.search).forEach((v, k) => {
      params[k] = v;
    });
  } catch {}
  try {
    Object.assign(params, getRouteParams() as Record<string, string>);
  } catch {}

  const attribution: Attribution = {};
  for (const [param, field] of Object.entries(PARAM_MAP)) {
    const value = params[param];
    if (value) attribution[field] = value.slice(0, 100);
  }
  if (Object.keys(attribution).length === 0) return; // giữ attribution cũ nếu lần mở này không có
  try {
    sessionStorage.setItem(KEY, JSON.stringify(attribution));
  } catch {}
}

export function getAttribution(entryPoint?: string): Attribution {
  let stored: Attribution = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Attribution;
  } catch {}
  return entryPoint ? { ...stored, entryPoint } : stored;
}
