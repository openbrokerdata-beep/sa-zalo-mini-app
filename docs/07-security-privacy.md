# 07 · Bảo mật & dữ liệu cá nhân

## 1. Mô hình đe doạ & biện pháp

| Rủi ro | Biện pháp | Ở đâu |
|--------|-----------|-------|
| Lộ bí mật (Zalo secret, Google key, CRM key) | Chỉ ở biến môi trường Vercel; Mini App không chứa bí mật; `.env` bị gitignore | `apps/api/src/env.ts`, `.gitignore` |
| Spam/bot gửi lead | Honeypot (trả 201 giả), rate limit IP-hash, Vercel WAF, giới hạn body 16 KB | `routes/leads.ts`, `app.ts`, docs/06 §6 |
| Lead trùng | `submissionId` idempotency, `Idempotency-Key` cho CRM | ADR-07 |
| Giả mạo SĐT đã xác thực | `phoneProof` HMAC-SHA256 có hạn 30 phút, so sánh constant-time | `lib/phone-proof.ts` |
| Formula injection vào Google Sheet | `valueInputOption=RAW` | `sinks/sheets.ts` |
| XSS | React escape mặc định; không dùng `dangerouslySetInnerHTML` cho dữ liệu người dùng | Quy ước code |
| Gọi API từ origin lạ | CORS whitelist; bảo mật thật dựa vào rate limit + validate (CORS không chặn được bot) | `app.ts` |
| Header bảo mật | `secureHeaders()` của Hono | `app.ts` |
| Rò rỉ PII qua log | Log chỉ chứa `leadId`, `ipHash`; **ngoại lệ** `lead.sink_failed` chứa lead để replay → giới hạn quyền xem log, thời gian lưu log ngắn | `lib/logger.ts` |

## 2. Dữ liệu cá nhân (Việt Nam)

Khung pháp lý: **Luật Bảo vệ dữ liệu cá nhân 2025** (hiệu lực 01/01/2026) và **Nghị định 13/2023/NĐ-CP**. Pháp chế của khách hàng chịu trách nhiệm nội dung cuối cùng (task LG-01). Yêu cầu kỹ thuật đã thiết kế sẵn:

- **Đồng ý rõ ràng, chủ động**: checkbox không tích sẵn; không gửi được nếu chưa đồng ý (validate cả client & server).
- **Lưu bằng chứng đồng ý**: mỗi lead có `consentVersion` + thời điểm `receivedAt`. Đổi nội dung chính sách → tăng `CONSENT_VERSION` (`packages/shared/src/lead.ts`).
- **Thông báo mục đích** tại trang `/privacy` (mở được ngay từ form) và tại chỗ xin quyền SĐT Zalo.
- **Tối thiểu hoá**: chỉ thu các trường cần cho tư vấn; IP không lưu thô (chỉ hash có salt).
- **Quyền chủ thể dữ liệu** (xem/sửa/xoá/rút đồng ý): quy trình thủ công qua hotline/email → sale xoá ở CRM + Sheet. Ghi nhận trong chính sách.
- **Phân quyền truy cập**: Sheet chỉ chia sẻ cho người cần; service account chỉ có quyền trên đúng file đó.
- **Lưu trữ**: đề xuất thời hạn giữ lead (vd. 24 tháng) — khách hàng chốt.

## 3. Checklist bảo mật trước khi phát hành

- [ ] Mọi secret production khác staging; `PHONE_PROOF_SECRET` ≥ 32 byte ngẫu nhiên
- [ ] `CORS_ORIGINS` production chỉ chứa origin Zalo thực tế
- [ ] WAF rule bật
- [ ] Sheet production chỉ chia sẻ cho danh sách đã duyệt
- [ ] Trang `/privacy` có nội dung chính thức, `CONSENT_VERSION` đã cập nhật
- [ ] Không có `console.log` dữ liệu người dùng ở client (`pnpm lint` cảnh báo `noConsole`)
- [ ] Đã chạy `/security-review` trên nhánh phát hành
