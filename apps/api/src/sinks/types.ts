import type { EnrichedLead } from "@sa/shared";

/**
 * Một nơi nhận lead (CRM, Google Sheets, …). Thêm đích mới = thêm 1 class implement interface này
 * và đăng ký trong sinks/index.ts. Sink phải idempotent theo `lead.submissionId` khi có thể.
 */
export interface LeadSink {
  readonly name: string;
  send(lead: EnrichedLead, signal: AbortSignal): Promise<void>;
}

/** Lỗi không nên retry (vd. 400/401/403 từ đích). */
export class PermanentSinkError extends Error {
  override name = "PermanentSinkError";
}
