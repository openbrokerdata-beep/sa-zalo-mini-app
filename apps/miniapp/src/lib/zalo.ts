import {
  followOA,
  getAccessToken,
  getPhoneNumber,
  getUserID,
  openChat,
  openPhone,
} from "zmp-sdk/apis";
import { config } from "@/config";
import { api } from "./api";

/**
 * Bọc các API của zmp-sdk, có fallback khi chạy ngoài Zalo (trình duyệt lúc dev).
 * Mọi lời gọi SDK trong app đi qua file này — xem docs/04-zalo-integration.md.
 */

export async function requestZaloPhone(): Promise<{ phone: string; phoneProof: string }> {
  // Thứ tự quan trọng: token getPhoneNumber chỉ sống 2 phút & dùng 1 lần → lấy xong đổi ngay.
  const accessToken = await getAccessToken();
  const { token } = await getPhoneNumber();
  if (!token) throw new Error("Người dùng chưa cấp quyền số điện thoại");
  const res = await api.exchangeZaloPhone({ code: token, accessToken });
  return { phone: res.phone, phoneProof: res.phoneProof };
}

export async function getZaloUserId(): Promise<string | undefined> {
  try {
    return await getUserID();
  } catch {
    return undefined;
  }
}

export async function callHotline(): Promise<void> {
  try {
    await openPhone({ phoneNumber: config.hotline });
  } catch {
    window.location.href = `tel:${config.hotline}`;
  }
}

export async function chatWithOA(message?: string): Promise<void> {
  if (!config.zaloOaId) return;
  await openChat({ type: "oa", id: config.zaloOaId, message });
}

export async function followOfficialAccount(): Promise<boolean> {
  if (!config.zaloOaId) return false;
  try {
    await followOA({ id: config.zaloOaId });
    return true;
  } catch {
    return false;
  }
}
