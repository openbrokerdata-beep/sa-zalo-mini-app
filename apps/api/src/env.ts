import { z } from "zod";

const csv = z
  .string()
  .default("")
  .transform((s) =>
    s
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
  );

export const SINK_NAMES = ["console", "sheets", "crm"] as const;
export type SinkName = (typeof SINK_NAMES)[number];

const envSchema = z
  .object({
    APP_ENV: z.enum(["local", "staging", "production"]).default("local"),
    PROJECT_SLUG: z.string().default("senturia-an-phu"),
    LEAD_ID_PREFIX: z.string().default("SAP"),
    CORS_ORIGINS: csv,
    LEAD_SINKS: csv.pipe(z.array(z.enum(SINK_NAMES)).min(1, "LEAD_SINKS cần ít nhất 1 sink")),
    PHONE_PROOF_SECRET: z.string().min(16),
    IP_HASH_SALT: z.string().min(1),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
    RATE_LIMIT_WINDOW_SEC: z.coerce.number().int().positive().default(600),
    ZALO_APP_ID: z.string().optional(),
    ZALO_APP_SECRET: z.string().optional(),
    GOOGLE_SHEETS_SPREADSHEET_ID: z.string().optional(),
    GOOGLE_SHEETS_RANGE: z.string().default("Leads!A:Z"),
    GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().optional(),
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string().optional(),
    CRM_WEBHOOK_URL: z.url().optional().or(z.literal("")),
    CRM_WEBHOOK_SECRET: z.string().optional(),
    CRM_API_KEY: z.string().optional(),
  })
  .superRefine((env, ctx) => {
    const need = (sink: SinkName, keys: (keyof typeof env)[]) => {
      if (!env.LEAD_SINKS.includes(sink)) return;
      for (const key of keys) {
        if (!env[key])
          ctx.addIssue({ code: "custom", path: [key], message: `bắt buộc khi bật sink "${sink}"` });
      }
    };
    need("sheets", [
      "GOOGLE_SHEETS_SPREADSHEET_ID",
      "GOOGLE_SERVICE_ACCOUNT_EMAIL",
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
    ]);
    need("crm", ["CRM_WEBHOOK_URL"]);
    if (
      env.APP_ENV === "production" &&
      env.LEAD_SINKS.includes("console") &&
      env.LEAD_SINKS.length === 1
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["LEAD_SINKS"],
        message: "production không được chỉ dùng sink console",
      });
    }
  });

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: Record<string, string | undefined> = process.env): Env {
  const parsed = envSchema.safeParse(source);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Cấu hình môi trường không hợp lệ:\n${issues}`);
  }
  return parsed.data;
}
