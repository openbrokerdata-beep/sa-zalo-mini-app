import { z } from "zod";
import { normalizeVnPhone } from "./phone.js";

/** Dòng sản phẩm quan tâm — khớp 3 dòng SP của dự án + "chưa xác định". */
export const PRODUCT_INTERESTS = [
  { value: "undecided", label: "Chưa xác định" },
  { value: "semi_detached_villa", label: "Biệt thự song lập" },
  { value: "garden_townhouse", label: "Nhà phố vườn" },
  { value: "shophouse", label: "Nhà phố thương mại" },
] as const;

export type ProductInterest = (typeof PRODUCT_INTERESTS)[number]["value"];
const productInterestValues = PRODUCT_INTERESTS.map((p) => p.value) as [
  ProductInterest,
  ...ProductInterest[],
];

/** Phiên bản điều khoản đồng ý xử lý dữ liệu cá nhân. Tăng khi đổi nội dung điều khoản. */
export const CONSENT_VERSION = "2026-10-v1";

export const attributionSchema = z.object({
  /** utm_source hoặc nguồn chiến dịch (QR, OA, ads…) */
  source: z.string().max(100).optional(),
  medium: z.string().max(100).optional(),
  campaign: z.string().max(150).optional(),
  content: z.string().max(150).optional(),
  term: z.string().max(150).optional(),
  /** Mã sale / CTV giới thiệu (ref) */
  ref: z.string().max(64).optional(),
  /** Section/nút CTA dẫn tới form, vd. "hero", "sticky_bar", "floorplan_SD1" */
  entryPoint: z.string().max(64).optional(),
});
export type Attribution = z.infer<typeof attributionSchema>;

/**
 * Payload Mini App gửi lên `POST /v1/leads`.
 * Đây là HỢP ĐỒNG dữ liệu giữa client và server — thay đổi phải cập nhật docs/03-lead-pipeline.md.
 */
export const leadInputSchema = z.object({
  /** UUID v4 do client sinh, dùng làm idempotency key (bấm gửi 2 lần không tạo 2 lead). */
  submissionId: z.uuid(),
  fullName: z.string().trim().min(2, "Vui lòng nhập họ tên").max(100),
  phone: z
    .string()
    .trim()
    .refine((v) => normalizeVnPhone(v) !== null, "Số điện thoại không hợp lệ"),
  email: z.union([z.literal(""), z.email("Email không hợp lệ")]).optional(),
  productInterest: z.enum(productInterestValues).default("undecided"),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal(true, { error: "Vui lòng đồng ý điều khoản để tiếp tục" }),
  consentVersion: z.string().max(32),
  /** Token chứng minh SĐT lấy từ Zalo (do server cấp ở /v1/zalo/phone). */
  phoneProof: z.string().max(512).optional(),
  zaloUserId: z.string().max(64).optional(),
  attribution: attributionSchema.default({}),
  client: z
    .object({
      appVersion: z.string().max(32).optional(),
      platform: z.string().max(32).optional(),
    })
    .default({}),
  /** Honeypot — người dùng thật không bao giờ điền. */
  website: z.string().max(0).optional(),
});
export type LeadInput = z.input<typeof leadInputSchema>;
export type LeadInputParsed = z.output<typeof leadInputSchema>;

/** Lead sau khi server làm giàu dữ liệu — đây là thứ được đẩy tới các sink (CRM, Sheets…). */
export interface EnrichedLead {
  leadId: string;
  submissionId: string;
  receivedAt: string; // ISO 8601
  fullName: string;
  phone: string; // nội địa "0xxxxxxxxx"
  phoneE164: string; // "+84xxxxxxxxx"
  phoneVerified: boolean; // true nếu SĐT lấy qua Zalo getPhoneNumber
  email?: string;
  productInterest: ProductInterest;
  productInterestLabel: string;
  message?: string;
  consentVersion: string;
  zaloUserId?: string;
  attribution: Attribution;
  client: { appVersion?: string; platform?: string; userAgent?: string; ipHash?: string };
  project: string; // "senturia-an-phu"
  channel: "zalo_mini_app";
}
