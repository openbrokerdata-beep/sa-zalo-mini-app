import { hmacHex, safeEqual } from "./crypto.js";

const TTL_MS = 30 * 60 * 1000;

/** Ký "phone.expiresAt" để client chứng minh SĐT đã được Zalo xác thực khi gửi lead. */
export function signPhoneProof(secret: string, phone: string, now = Date.now()): string {
  const exp = now + TTL_MS;
  return `${exp}.${hmacHex(secret, `${phone}.${exp}`)}`;
}

export function verifyPhoneProof(
  secret: string,
  phone: string,
  proof: string,
  now = Date.now(),
): boolean {
  const [expStr, sig] = proof.split(".");
  const exp = Number(expStr);
  if (!sig || !Number.isFinite(exp) || exp < now) return false;
  return safeEqual(sig, hmacHex(secret, `${phone}.${exp}`));
}
