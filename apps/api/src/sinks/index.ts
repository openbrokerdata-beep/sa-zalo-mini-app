import type { Env, SinkName } from "../env";
import { ConsoleSink } from "./console";
import { CrmWebhookSink } from "./crm-webhook";
import { GoogleSheetsSink } from "./sheets";
import type { LeadSink } from "./types";

export type { LeadSink } from "./types";

/** Đăng ký sink: thêm đích mới = thêm 1 dòng ở đây + tên trong SINK_NAMES (env.ts). */
const factories: Record<SinkName, (env: Env) => LeadSink> = {
  console: () => new ConsoleSink(),
  // Biến bắt buộc của từng sink đã được kiểm ở env.ts (superRefine).
  sheets: (env) =>
    new GoogleSheetsSink({
      spreadsheetId: env.GOOGLE_SHEETS_SPREADSHEET_ID ?? "",
      range: env.GOOGLE_SHEETS_RANGE,
      clientEmail: env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
      privateKey: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "",
    }),
  crm: (env) =>
    new CrmWebhookSink({
      url: env.CRM_WEBHOOK_URL ?? "",
      secret: env.CRM_WEBHOOK_SECRET,
      apiKey: env.CRM_API_KEY,
    }),
};

export function createSinks(env: Env): LeadSink[] {
  return env.LEAD_SINKS.map((name) => factories[name](env));
}
