/**
 * Điểm tập trung cho tracking sự kiện. Hiện chỉ log ở dev.
 * TODO(FE-07): nối Zalo Mini App analytics / GA4 Measurement Protocol qua API — docs/03-lead-pipeline.md §7.
 */
export type TrackEvent =
  | "view_section"
  | "click_cta"
  | "open_lead_form"
  | "zalo_phone_granted"
  | "zalo_phone_denied"
  | "lead_submitted"
  | "lead_failed"
  | "call_hotline"
  | "chat_oa";

export function track(
  event: TrackEvent,
  props: Record<string, string | number | boolean> = {},
): void {
  if (import.meta.env.DEV) console.info("[track]", event, props);
}
