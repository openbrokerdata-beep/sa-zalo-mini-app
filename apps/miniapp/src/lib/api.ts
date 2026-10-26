import type {
  ApiError,
  CreateLeadResponse,
  LeadInput,
  ZaloPhoneRequest,
  ZaloPhoneResponse,
} from "@sa/shared";
import { config } from "@/config";

export class ApiRequestError extends Error {
  constructor(
    readonly status: number,
    readonly body: ApiError | null,
  ) {
    super(body?.error.message ?? `HTTP ${status}`);
  }
}

async function postJson<T>(path: string, payload: unknown, timeoutMs = 20_000): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${config.apiBaseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    throw new ApiRequestError(0, null); // mất mạng / timeout / domain chưa whitelist
  }
  const body = (await res.json().catch(() => null)) as T | ApiError | null;
  if (!res.ok) throw new ApiRequestError(res.status, body as ApiError | null);
  return body as T;
}

export const api = {
  createLead: (lead: LeadInput) => postJson<CreateLeadResponse>("/v1/leads", lead),
  exchangeZaloPhone: (req: ZaloPhoneRequest) =>
    postJson<ZaloPhoneResponse>("/v1/zalo/phone", req, 10_000),
};
