import type { EnrichedLead } from "@sa/shared";
import { JWT } from "google-auth-library";
import { type LeadSink, PermanentSinkError } from "./types";

export interface SheetsConfig {
  spreadsheetId: string;
  range: string; // vd. "Leads!A:Z"
  clientEmail: string;
  privateKey: string;
}

/**
 * Thứ tự cột trong Google Sheet. Hàng 1 của tab phải là header khớp `SHEET_HEADERS`.
 * TODO(khách hàng): xác nhận cấu trúc sheet thực tế — docs/03-lead-pipeline.md §4.
 */
export const SHEET_HEADERS = [
  "Mã lead",
  "Thời gian (ICT)",
  "Họ tên",
  "Số điện thoại",
  "SĐT xác thực Zalo",
  "Email",
  "Sản phẩm quan tâm",
  "Lời nhắn",
  "Nguồn (utm_source)",
  "Kênh (utm_medium)",
  "Chiến dịch",
  "Nội dung QC",
  "Mã giới thiệu (ref)",
  "Điểm chạm (CTA)",
  "Zalo user ID",
  "Submission ID",
  "Phiên bản điều khoản",
  "Phiên bản app",
] as const;

export function toSheetRow(lead: EnrichedLead): string[] {
  const ict = new Date(lead.receivedAt).toLocaleString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" });
  return [
    lead.leadId,
    ict,
    lead.fullName,
    lead.phone,
    lead.phoneVerified ? "Có" : "Không",
    lead.email ?? "",
    lead.productInterestLabel,
    lead.message ?? "",
    lead.attribution.source ?? "",
    lead.attribution.medium ?? "",
    lead.attribution.campaign ?? "",
    lead.attribution.content ?? "",
    lead.attribution.ref ?? "",
    lead.attribution.entryPoint ?? "",
    lead.zaloUserId ?? "",
    lead.submissionId,
    lead.consentVersion,
    lead.client.appVersion ?? "",
  ];
}

/** Append 1 hàng vào Google Sheet qua Sheets API v4 bằng Service Account. */
export class GoogleSheetsSink implements LeadSink {
  readonly name = "sheets";
  private readonly auth: JWT;

  constructor(private readonly cfg: SheetsConfig) {
    this.auth = new JWT({
      email: cfg.clientEmail,
      key: cfg.privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  async send(lead: EnrichedLead, signal: AbortSignal): Promise<void> {
    const { token } = await this.auth.getAccessToken();
    const url =
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(this.cfg.spreadsheetId)}` +
      `/values/${encodeURIComponent(this.cfg.range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
    // RAW: giữ số 0 đầu SĐT và chặn formula injection (=HYPERLINK…) từ input người dùng.
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [toSheetRow(lead)] }),
      signal,
    });
    if (!res.ok) {
      const msg = `Sheets API ${res.status}: ${(await res.text()).slice(0, 300)}`;
      if (res.status >= 400 && res.status < 500 && res.status !== 429)
        throw new PermanentSinkError(msg);
      throw new Error(msg);
    }
  }
}
