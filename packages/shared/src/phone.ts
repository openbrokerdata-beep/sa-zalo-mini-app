/**
 * Chuẩn hoá số điện thoại Việt Nam.
 * Chấp nhận: "0912 345 678", "+84912345678", "84912345678", "(091) 234-5678".
 * Trả về dạng nội địa "0912345678" (10–11 số) hoặc null nếu không hợp lệ.
 */
export function normalizeVnPhone(input: string): string | null {
  const digits = input.replace(/[^\d+]/g, "");
  let local: string;
  if (digits.startsWith("+84")) local = `0${digits.slice(3)}`;
  else if (digits.startsWith("84") && digits.length >= 11) local = `0${digits.slice(2)}`;
  else local = digits;
  local = local.replace(/^00/, "0");
  return /^0\d{9,10}$/.test(local) ? local : null;
}

/** "0912345678" -> "+84912345678" */
export function toE164Vn(local: string): string {
  return `+84${local.slice(1)}`;
}
