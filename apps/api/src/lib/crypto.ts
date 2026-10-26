import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export function sha256Hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function hmacHex(secret: string, input: string): string {
  return createHmac("sha256", secret).update(input).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // bỏ 0/O/1/I cho dễ đọc qua điện thoại

/** Mã lead dễ đọc cho sale: SAP-20261015-7KQ2XM */
export function newLeadId(prefix: string, now = new Date()): string {
  const ymd = now.toISOString().slice(0, 10).replaceAll("-", "");
  const rand = Array.from(randomBytes(6), (b) => ALPHABET[b % ALPHABET.length]).join("");
  return `${prefix}-${ymd}-${rand}`;
}
