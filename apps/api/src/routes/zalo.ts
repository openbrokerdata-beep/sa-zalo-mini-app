import type { ApiError, ZaloPhoneResponse } from "@sa/shared";
import { Hono } from "hono";
import { z } from "zod";
import type { ResolvedDeps } from "../create-app.js";
import { log } from "../lib/logger.js";
import { signPhoneProof } from "../lib/phone-proof.js";
import { fetchZaloPhone, ZaloApiError } from "../lib/zalo.js";

const phoneRequestSchema = z.object({
  code: z.string().min(1).max(2048),
  accessToken: z.string().min(1).max(4096),
});

export function zaloRoutes(deps: ResolvedDeps) {
  const { env, fetchImpl } = deps;
  const app = new Hono();

  /** Đổi token getPhoneNumber() → SĐT + phoneProof (để lead được đánh dấu phoneVerified). */
  app.post("/phone", async (c) => {
    if (!env.ZALO_APP_SECRET) {
      return c.json<ApiError>(
        { ok: false, error: { code: "ZALO_ERROR", message: "Chưa cấu hình ZALO_APP_SECRET" } },
        501,
      );
    }
    const parsed = phoneRequestSchema.safeParse(await c.req.json().catch(() => null));
    if (!parsed.success) {
      return c.json<ApiError>(
        { ok: false, error: { code: "VALIDATION_ERROR", message: "Thiếu token" } },
        400,
      );
    }
    try {
      const phone = await fetchZaloPhone(
        {
          accessToken: parsed.data.accessToken,
          code: parsed.data.code,
          secretKey: env.ZALO_APP_SECRET,
        },
        fetchImpl,
      );
      return c.json<ZaloPhoneResponse>({
        ok: true,
        phone,
        phoneProof: signPhoneProof(env.PHONE_PROOF_SECRET, phone),
      });
    } catch (err) {
      if (!(err instanceof ZaloApiError)) throw err;
      log("warn", "zalo.phone_failed", { error: err.message });
      return c.json<ApiError>(
        {
          ok: false,
          error: { code: "ZALO_ERROR", message: "Không lấy được số điện thoại từ Zalo" },
        },
        502,
      );
    }
  });

  return app;
}
