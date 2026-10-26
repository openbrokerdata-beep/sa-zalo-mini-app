import { normalizeVnPhone } from "@sa/shared";

export class ZaloApiError extends Error {
  override name = "ZaloApiError";
}

export type FetchLike = typeof fetch;

/**
 * Đổi token của `getPhoneNumber()` lấy số điện thoại.
 * Token chỉ dùng được 1 lần và hết hạn sau 2 phút — client phải gọi ngay sau khi người dùng đồng ý.
 * Docs: https://docs.zaloplatforms.com/docs/MA/api/user/user-information/getPhoneNumber
 */
export async function fetchZaloPhone(
  params: { accessToken: string; code: string; secretKey: string },
  fetchImpl: FetchLike = fetch,
): Promise<string> {
  const res = await fetchImpl("https://graph.zalo.me/v2.0/me/info", {
    method: "GET",
    headers: {
      access_token: params.accessToken,
      code: params.code,
      secret_key: params.secretKey,
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new ZaloApiError(`graph.zalo.me HTTP ${res.status}`);
  const body = (await res.json()) as {
    error?: number;
    message?: string;
    data?: { number?: string };
  };
  if (body.error !== 0 || !body.data?.number) {
    throw new ZaloApiError(`graph.zalo.me error ${body.error}: ${body.message ?? "unknown"}`);
  }
  const phone = normalizeVnPhone(body.data.number);
  if (!phone) throw new ZaloApiError("Zalo trả về số điện thoại không hợp lệ");
  return phone;
}
