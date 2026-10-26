import { describe, expect, it } from "vitest";
import { leadInputSchema, normalizeVnPhone } from "../src";

describe("normalizeVnPhone", () => {
  it.each([
    ["0912 345 678", "0912345678"],
    ["+84912345678", "0912345678"],
    ["84912345678", "0912345678"],
    ["(091) 234-5678", "0912345678"],
    ["02839123456", "02839123456"],
  ])("%s -> %s", (input, expected) => {
    expect(normalizeVnPhone(input)).toBe(expected);
  });

  it.each(["", "12345", "091234567", "abc", "+1 415 555 0100"])("rejects %s", (input) => {
    expect(normalizeVnPhone(input)).toBeNull();
  });
});

describe("leadInputSchema", () => {
  const base = {
    submissionId: "3b241101-e2bb-4255-8caf-4136c566a962",
    fullName: "Nguyễn Văn A",
    phone: "0912345678",
    consent: true,
    consentVersion: "2026-10-v1",
  };

  it("accepts a minimal valid lead and applies defaults", () => {
    const parsed = leadInputSchema.parse(base);
    expect(parsed.productInterest).toBe("undecided");
    expect(parsed.attribution).toEqual({});
  });

  it("rejects missing consent", () => {
    expect(leadInputSchema.safeParse({ ...base, consent: false }).success).toBe(false);
  });

  it("rejects filled honeypot", () => {
    expect(leadInputSchema.safeParse({ ...base, website: "spam" }).success).toBe(false);
  });

  it("allows empty email string", () => {
    expect(leadInputSchema.safeParse({ ...base, email: "" }).success).toBe(true);
  });
});
