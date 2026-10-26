import {
  type ApiError,
  type CreateLeadResponse,
  type EnrichedLead,
  leadInputSchema,
  normalizeVnPhone,
  PRODUCT_INTERESTS,
  toE164Vn,
} from "@sa/shared";
import { type Context, Hono } from "hono";
import type { ResolvedDeps } from "../create-app.js";
import { newLeadId, sha256Hex } from "../lib/crypto.js";
import { dispatchLead } from "../lib/dispatch.js";
import { log } from "../lib/logger.js";
import { verifyPhoneProof } from "../lib/phone-proof.js";

export function clientIp(c: Context): string {
  return (
    c.req.header("x-real-ip") ?? c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  );
}

export function leadRoutes(deps: ResolvedDeps) {
  const { env, sinks, rateLimiter, idempotency } = deps;
  const app = new Hono();

  app.post("/", async (c) => {
    const ipHash = sha256Hex(`${env.IP_HASH_SALT}:${clientIp(c)}`).slice(0, 16);

    const json = await c.req.json().catch(() => null);
    const parsed = leadInputSchema.safeParse(json);
    if (!parsed.success) {
      const fields = Object.fromEntries(
        parsed.error.issues.map((i) => [i.path.join("."), i.message]),
      );
      // Honeypot dính → trả 201 giả để bot không dò ra luật chặn.
      if ("website" in fields) {
        log("warn", "lead.honeypot", { ipHash });
        return c.json<CreateLeadResponse>({ ok: true, leadId: "SPAM" }, 201);
      }
      return c.json<ApiError>(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Dữ liệu không hợp lệ", fields } },
        400,
      );
    }
    const input = parsed.data;

    const existing = idempotency.get(input.submissionId);
    if (existing)
      return c.json<CreateLeadResponse>({ ok: true, leadId: existing, duplicate: true }, 200);

    if (!rateLimiter.take(ipHash)) {
      log("warn", "lead.rate_limited", { ipHash });
      return c.json<ApiError>(
        {
          ok: false,
          error: { code: "RATE_LIMITED", message: "Bạn gửi quá nhanh, vui lòng thử lại sau" },
        },
        429,
      );
    }

    // Đã qua validate nên chắc chắn chuẩn hoá được.
    const phone = normalizeVnPhone(input.phone) as string;
    const lead: EnrichedLead = {
      leadId: newLeadId(env.LEAD_ID_PREFIX),
      submissionId: input.submissionId,
      receivedAt: new Date().toISOString(),
      fullName: input.fullName,
      phone,
      phoneE164: toE164Vn(phone),
      phoneVerified: input.phoneProof
        ? verifyPhoneProof(env.PHONE_PROOF_SECRET, phone, input.phoneProof)
        : false,
      email: input.email || undefined,
      productInterest: input.productInterest,
      productInterestLabel:
        PRODUCT_INTERESTS.find((p) => p.value === input.productInterest)?.label ??
        input.productInterest,
      message: input.message || undefined,
      consentVersion: input.consentVersion,
      zaloUserId: input.zaloUserId,
      attribution: input.attribution,
      client: { ...input.client, userAgent: c.req.header("user-agent")?.slice(0, 256), ipHash },
      project: env.PROJECT_SLUG,
      channel: "zalo_mini_app",
    };

    const results = await dispatchLead(sinks, lead, deps.dispatchOptions);
    const delivered = results.filter((r) => r.ok).map((r) => r.sink);
    log("info", "lead.created", {
      leadId: lead.leadId,
      delivered,
      failed: results.length - delivered.length,
    });

    if (delivered.length === 0) {
      return c.json<ApiError>(
        {
          ok: false,
          error: {
            code: "SINK_UNAVAILABLE",
            message: "Hệ thống đang bận, vui lòng thử lại hoặc gọi hotline",
          },
        },
        503,
      );
    }

    idempotency.set(input.submissionId, lead.leadId);
    return c.json<CreateLeadResponse>({ ok: true, leadId: lead.leadId }, 201);
  });

  return app;
}
