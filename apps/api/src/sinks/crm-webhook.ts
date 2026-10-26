import type { EnrichedLead } from "@sa/shared";
import { hmacHex } from "../lib/crypto";
import { type LeadSink, PermanentSinkError } from "./types";

export interface CrmWebhookConfig {
  url: string;
  secret?: string;
  apiKey?: string;
}

/**
 * Ánh xạ lead -> payload của CRM.
 * TODO(khách hàng): thay bằng mapping thật khi có tài liệu API CRM — docs/03-lead-pipeline.md §5.
 * Nếu CRM có API riêng (HubSpot, Salesforce, Bitrix24, Getfly, …) → tạo sink riêng, giữ file này làm mẫu.
 */
export function toCrmPayload(lead: EnrichedLead): Record<string, unknown> {
  return {
    external_id: lead.leadId,
    idempotency_key: lead.submissionId,
    full_name: lead.fullName,
    phone: lead.phone,
    phone_verified: lead.phoneVerified,
    email: lead.email ?? null,
    interest: lead.productInterest,
    note: lead.message ?? null,
    source: "zalo_mini_app",
    project: lead.project,
    utm: lead.attribution,
    zalo_user_id: lead.zaloUserId ?? null,
    created_at: lead.receivedAt,
  };
}

/** Sink chung: POST JSON tới webhook CRM, ký HMAC-SHA256 ở header X-Signature. */
export class CrmWebhookSink implements LeadSink {
  readonly name = "crm";

  constructor(private readonly cfg: CrmWebhookConfig) {}

  async send(lead: EnrichedLead, signal: AbortSignal): Promise<void> {
    const body = JSON.stringify(toCrmPayload(lead));
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Idempotency-Key": lead.submissionId,
    };
    if (this.cfg.secret) headers["X-Signature"] = `sha256=${hmacHex(this.cfg.secret, body)}`;
    if (this.cfg.apiKey) headers.Authorization = `Bearer ${this.cfg.apiKey}`;

    const res = await fetch(this.cfg.url, { method: "POST", headers, body, signal });
    if (res.ok || res.status === 409) return; // 409 = đã tồn tại theo idempotency key → coi như thành công
    const msg = `CRM ${res.status}: ${(await res.text()).slice(0, 300)}`;
    if (res.status >= 400 && res.status < 500 && res.status !== 429)
      throw new PermanentSinkError(msg);
    throw new Error(msg);
  }
}
