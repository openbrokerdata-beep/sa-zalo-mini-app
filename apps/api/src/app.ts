import type { ApiError } from "@sa/shared";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import type { Env } from "./env";
import { MemoryIdempotencyStore } from "./lib/idempotency";
import { log } from "./lib/logger";
import { MemoryRateLimiter } from "./lib/rate-limit";
import type { FetchLike } from "./lib/zalo";
import { leadRoutes } from "./routes/leads";
import { zaloRoutes } from "./routes/zalo";
import { createSinks, type LeadSink } from "./sinks";

export interface AppDeps {
  env: Env;
  sinks?: LeadSink[];
  rateLimiter?: MemoryRateLimiter;
  idempotency?: MemoryIdempotencyStore;
  fetchImpl?: FetchLike;
  dispatchOptions?: { attempts?: number; timeoutMs?: number; backoffMs?: number };
}

export type ResolvedDeps = Required<Omit<AppDeps, "dispatchOptions">> &
  Pick<AppDeps, "dispatchOptions">;

export const API_VERSION = "0.1.0";

export function createApp(deps: AppDeps) {
  const resolved: ResolvedDeps = {
    sinks: createSinks(deps.env),
    rateLimiter: new MemoryRateLimiter(
      deps.env.RATE_LIMIT_MAX,
      deps.env.RATE_LIMIT_WINDOW_SEC * 1000,
    ),
    idempotency: new MemoryIdempotencyStore(),
    fetchImpl: fetch,
    ...deps,
  };
  const { env } = resolved;

  const app = new Hono();

  app.use("*", secureHeaders());
  app.use(
    "/v1/*",
    cors({
      origin: (origin) => (env.CORS_ORIGINS.includes(origin) ? origin : null),
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type"],
      maxAge: 86400,
    }),
  );
  app.use(
    "/v1/*",
    bodyLimit({
      maxSize: 16 * 1024,
      onError: (c) =>
        c.json<ApiError>(
          { ok: false, error: { code: "VALIDATION_ERROR", message: "Payload quá lớn" } },
          413,
        ),
    }),
  );

  app.get("/health", (c) =>
    c.json({
      ok: true,
      version: API_VERSION,
      env: env.APP_ENV,
      sinks: resolved.sinks.map((s) => s.name),
    }),
  );

  app.route("/v1/leads", leadRoutes(resolved));
  app.route("/v1/zalo", zaloRoutes(resolved));

  app.notFound((c) =>
    c.json<ApiError>({ ok: false, error: { code: "NOT_FOUND", message: "Not found" } }, 404),
  );
  app.onError((err, c) => {
    log("error", "http.unhandled", { path: c.req.path, error: String(err) });
    return c.json<ApiError>(
      { ok: false, error: { code: "INTERNAL", message: "Lỗi hệ thống" } },
      500,
    );
  });

  return app;
}
