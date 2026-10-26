import type { EnrichedLead } from "@sa/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { loadEnv } from "../src/env.js";
import { signPhoneProof, verifyPhoneProof } from "../src/lib/phone-proof.js";
import type { FetchLike } from "../src/lib/zalo.js";
import { toSheetRow } from "../src/sinks/sheets.js";
import { type LeadSink, PermanentSinkError } from "../src/sinks/types.js";

const env = loadEnv({
  APP_ENV: "local",
  CORS_ORIGINS: "http://localhost:3000",
  LEAD_SINKS: "console",
  PHONE_PROOF_SECRET: "test-secret-0123456789",
  IP_HASH_SALT: "salt",
  RATE_LIMIT_MAX: "3",
  ZALO_APP_SECRET: "zalo-secret",
});

class MemorySink implements LeadSink {
  leads: EnrichedLead[] = [];
  constructor(
    readonly name: string,
    private behavior: "ok" | "fail" | "permanent" = "ok",
  ) {}
  async send(lead: EnrichedLead) {
    if (this.behavior === "fail") throw new Error("temporary");
    if (this.behavior === "permanent") throw new PermanentSinkError("bad request");
    this.leads.push(lead);
  }
}

const validLead = (over: Record<string, unknown> = {}) => ({
  submissionId: crypto.randomUUID(),
  fullName: "Nguyễn Văn A",
  phone: "+84 912 345 678",
  email: "",
  productInterest: "garden_townhouse",
  consent: true,
  consentVersion: "2026-10-v1",
  attribution: { source: "zalo_oa", entryPoint: "hero" },
  ...over,
});

const post = (app: ReturnType<typeof createApp>, path: string, body: unknown, ip = "1.2.3.4") =>
  app.request(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": ip,
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify(body),
  });

describe("POST /v1/leads", () => {
  let sheets: MemorySink;
  let crm: MemorySink;
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    sheets = new MemorySink("sheets");
    crm = new MemorySink("crm");
    app = createApp({ env, sinks: [sheets, crm], dispatchOptions: { backoffMs: 1 } });
  });

  it("creates a lead, normalizes phone and fans out to every sink", async () => {
    const res = await post(app, "/v1/leads", validLead());
    expect(res.status).toBe(201);
    const body = (await res.json()) as { ok: boolean; leadId: string };
    expect(body.leadId).toMatch(/^SAP-\d{8}-[A-Z2-9]{6}$/);
    expect(sheets.leads).toHaveLength(1);
    expect(crm.leads).toHaveLength(1);
    const lead = sheets.leads[0] as EnrichedLead;
    expect(lead.phone).toBe("0912345678");
    expect(lead.phoneE164).toBe("+84912345678");
    expect(lead.phoneVerified).toBe(false);
    expect(lead.productInterestLabel).toBe("Nhà phố vườn");
    expect(lead.email).toBeUndefined();
    expect(res.headers.get("access-control-allow-origin")).toBe("http://localhost:3000");
  });

  it("is idempotent on submissionId", async () => {
    const payload = validLead();
    await post(app, "/v1/leads", payload);
    const res = await post(app, "/v1/leads", payload);
    expect(res.status).toBe(200);
    expect(((await res.json()) as { duplicate: boolean }).duplicate).toBe(true);
    expect(sheets.leads).toHaveLength(1);
  });

  it("returns field errors on invalid input", async () => {
    const res = await post(app, "/v1/leads", validLead({ phone: "123", consent: false }));
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: { fields: Record<string, string> } };
    expect(Object.keys(body.error.fields)).toEqual(expect.arrayContaining(["phone", "consent"]));
  });

  it("silently drops honeypot submissions", async () => {
    const res = await post(app, "/v1/leads", validLead({ website: "http://spam" }));
    expect(res.status).toBe(201);
    expect(sheets.leads).toHaveLength(0);
  });

  it("rate limits per IP", async () => {
    for (let i = 0; i < 3; i++)
      expect((await post(app, "/v1/leads", validLead())).status).toBe(201);
    expect((await post(app, "/v1/leads", validLead())).status).toBe(429);
    expect((await post(app, "/v1/leads", validLead(), "5.6.7.8")).status).toBe(201);
  });

  it("succeeds when at least one sink delivers", async () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    app = createApp({
      env,
      sinks: [sheets, new MemorySink("crm", "fail")],
      dispatchOptions: { backoffMs: 1 },
    });
    const res = await post(app, "/v1/leads", validLead());
    expect(res.status).toBe(201);
    expect(errSpy).toHaveBeenCalledWith(expect.stringContaining("lead.sink_failed"));
    errSpy.mockRestore();
  });

  it("returns 503 when every sink fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    app = createApp({
      env,
      sinks: [new MemorySink("sheets", "permanent"), new MemorySink("crm", "fail")],
      dispatchOptions: { backoffMs: 1 },
    });
    const res = await post(app, "/v1/leads", validLead());
    expect(res.status).toBe(503);
    vi.restoreAllMocks();
  });

  it("marks phoneVerified when a valid phoneProof is supplied", async () => {
    const proof = signPhoneProof(env.PHONE_PROOF_SECRET, "0912345678");
    await post(app, "/v1/leads", validLead({ phoneProof: proof }));
    expect(sheets.leads[0]?.phoneVerified).toBe(true);
  });
});

describe("POST /v1/zalo/phone", () => {
  it("exchanges the Zalo token for a phone number and a proof", async () => {
    const fetchImpl = vi.fn(async () =>
      Response.json({ error: 0, message: "Success", data: { number: "849123456789" } }),
    );
    const app = createApp({ env, sinks: [], fetchImpl: fetchImpl as unknown as FetchLike });
    const res = await post(app, "/v1/zalo/phone", { code: "tok", accessToken: "at" });
    expect(res.status).toBe(200);
    const body = (await res.json()) as { phone: string; phoneProof: string };
    expect(body.phone).toBe("09123456789");
    expect(verifyPhoneProof(env.PHONE_PROOF_SECRET, body.phone, body.phoneProof)).toBe(true);
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(init.headers).toMatchObject({
      access_token: "at",
      code: "tok",
      secret_key: "zalo-secret",
    });
  });

  it("maps Zalo errors to 502", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchImpl = async () => Response.json({ error: -201, message: "invalid code" });
    const app = createApp({ env, sinks: [], fetchImpl: fetchImpl as unknown as FetchLike });
    expect((await post(app, "/v1/zalo/phone", { code: "x", accessToken: "y" })).status).toBe(502);
  });
});

describe("phone proof", () => {
  it("rejects tampered or expired proofs", () => {
    const proof = signPhoneProof("s3cret-0123456789", "0912345678", 1_000);
    expect(verifyPhoneProof("s3cret-0123456789", "0912345678", proof, 2_000)).toBe(true);
    expect(verifyPhoneProof("s3cret-0123456789", "0999999999", proof, 2_000)).toBe(false);
    expect(verifyPhoneProof("s3cret-0123456789", "0912345678", proof, 1_000 + 31 * 60_000)).toBe(
      false,
    );
  });
});

describe("env", () => {
  it("requires sheet credentials when the sheets sink is enabled", () => {
    expect(() =>
      loadEnv({ LEAD_SINKS: "sheets", PHONE_PROOF_SECRET: "x".repeat(16), IP_HASH_SALT: "s" }),
    ).toThrow(/GOOGLE_SHEETS_SPREADSHEET_ID/);
  });
});

describe("toSheetRow", () => {
  it("keeps column order aligned with headers", () => {
    const row = toSheetRow({
      leadId: "SAP-20261015-ABCDEF",
      submissionId: "s",
      receivedAt: "2026-10-15T03:00:00.000Z",
      fullName: "A",
      phone: "0912345678",
      phoneE164: "+84912345678",
      phoneVerified: true,
      productInterest: "shophouse",
      productInterestLabel: "Nhà phố thương mại",
      consentVersion: "v1",
      attribution: {},
      client: {},
      project: "p",
      channel: "zalo_mini_app",
    });
    expect(row).toHaveLength(18);
    expect(row[1]).toBe("2026-10-15 10:00:00");
    expect(row[3]).toBe("0912345678");
    expect(row[4]).toBe("Có");
  });
});
