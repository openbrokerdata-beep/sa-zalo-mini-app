# 03 · Lead pipeline — hợp đồng API, dữ liệu, CRM & Google Sheets

Nguồn mã: `packages/shared/src/lead.ts` (schema), `apps/api/src/routes/leads.ts`, `apps/api/src/sinks/*`.

## 1. Endpoint

Base URL: `https://<api-domain>` (local `http://localhost:8787`).

| Method | Path | Mô tả |
|--------|------|-------|
| `GET` | `/health` | `{ok, version, env, sinks[]}` — dùng cho uptime check |
| `POST` | `/v1/leads` | Tạo lead |
| `POST` | `/v1/zalo/phone` | Đổi token `getPhoneNumber` → SĐT + `phoneProof` |
| `GET` | `/media/*` | Ảnh tĩnh (CDN) |

### 1.1 `POST /v1/leads`

Request (`LeadInput`):

```json
{
  "submissionId": "3b241101-e2bb-4255-8caf-4136c566a962",
  "fullName": "Nguyễn Văn A",
  "phone": "0912 345 678",
  "email": "",
  "productInterest": "garden_townhouse",
  "message": "Cần bảng giá căn góc",
  "consent": true,
  "consentVersion": "2026-10-v1",
  "phoneProof": "1760520000000.ab12…",
  "zaloUserId": "123456789",
  "attribution": { "source": "zalo_oa", "medium": "broadcast", "campaign": "mo-ban-t10", "ref": "SALE01", "entryPoint": "hero" },
  "client": { "appVersion": "0.1.0", "platform": "android" },
  "website": ""
}
```

| Trường | Bắt buộc | Quy tắc |
|--------|:-------:|---------|
| `submissionId` | ✓ | UUID — idempotency key |
| `fullName` | ✓ | 2–100 ký tự |
| `phone` | ✓ | SĐT VN; chấp nhận `0…`, `+84…`, `84…`, có khoảng trắng/dấu; chuẩn hoá về `0xxxxxxxxx` (10–11 số) |
| `email` | | rỗng hoặc email hợp lệ |
| `productInterest` | | `undecided` \| `semi_detached_villa` \| `garden_townhouse` \| `shophouse` (mặc định `undecided`) |
| `message` | | ≤ 1000 ký tự |
| `consent` | ✓ | phải là `true` |
| `consentVersion` | ✓ | `CONSENT_VERSION` hiện hành |
| `phoneProof` | | từ `/v1/zalo/phone` |
| `attribution.*` | | UTM + `ref` (mã sale/CTV) + `entryPoint` (CTA) |
| `website` | | **honeypot** — phải rỗng |

Response:

| HTTP | Body | Ý nghĩa |
|------|------|---------|
| 201 | `{ok:true, leadId}` | Đã nhận, ≥ 1 đích lưu thành công |
| 200 | `{ok:true, leadId, duplicate:true}` | `submissionId` đã xử lý trước đó |
| 400 | `{ok:false, error:{code:"VALIDATION_ERROR", fields:{phone:"…"}}}` | Lỗi từng trường (tiếng Việt, hiển thị được) |
| 413 | `VALIDATION_ERROR` | Body > 16 KB |
| 429 | `RATE_LIMITED` | Quá 5 lead/10 phút/IP |
| 503 | `SINK_UNAVAILABLE` | Mọi đích đều lỗi — client hiện nút gọi hotline, lưu nháp |

### 1.2 `POST /v1/zalo/phone`

Request `{ "code": "<token getPhoneNumber>", "accessToken": "<getAccessToken>" }` → `200 {ok, phone, phoneProof}` · `502 ZALO_ERROR` · `501` nếu chưa cấu hình `ZALO_APP_SECRET`.

## 2. Mô hình lead sau làm giàu (`EnrichedLead`)

Server bổ sung: `leadId` (`SAP-YYYYMMDD-XXXXXX`, dễ đọc qua điện thoại), `receivedAt` (ISO UTC), `phone`/`phoneE164`, `phoneVerified`, `productInterestLabel`, `client.userAgent`, `client.ipHash` (SHA-256 có salt, cắt 16 ký tự — **không lưu IP thô**), `project`, `channel = "zalo_mini_app"`.

## 3. Sink (đích lưu lead)

Bật/tắt bằng `LEAD_SINKS` (vd. `sheets,crm`). Biến bắt buộc của từng sink được kiểm khi khởi động (thiếu → API không chạy, báo rõ thiếu biến nào).

| Sink | File | Trạng thái |
|------|------|-----------|
| `console` | `sinks/console.ts` | Local/staging — in lead ra log |
| `sheets` | `sinks/sheets.ts` | **Sẵn sàng**, chờ credentials |
| `crm` | `sinks/crm-webhook.ts` | Webhook chung — **chờ khách hàng chốt CRM** |

## 4. Google Sheets

### 4.1 Thiết lập (khi khách hàng cung cấp)

1. Google Cloud Console → tạo project → bật **Google Sheets API**.
2. Tạo **Service Account** → tạo key JSON.
3. Mở Google Sheet → **Share** cho email service account với quyền **Editor**.
4. Tạo tab `Leads`, hàng 1 dán header (đúng thứ tự `SHEET_HEADERS`):

   `Mã lead | Thời gian (ICT) | Họ tên | Số điện thoại | SĐT xác thực Zalo | Email | Sản phẩm quan tâm | Lời nhắn | Nguồn (utm_source) | Kênh (utm_medium) | Chiến dịch | Nội dung QC | Mã giới thiệu (ref) | Điểm chạm (CTA) | Zalo user ID | Submission ID | Phiên bản điều khoản | Phiên bản app`

5. Đặt biến môi trường: `GOOGLE_SHEETS_SPREADSHEET_ID` (chuỗi giữa `/d/` và `/edit` trong URL), `GOOGLE_SHEETS_RANGE=Leads!A:Z`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (giữ nguyên `\n`). Thêm `sheets` vào `LEAD_SINKS`.

### 4.2 Lưu ý kỹ thuật
- Ghi bằng `valueInputOption=RAW`: giữ số 0 đầu SĐT, **chặn formula injection** (`=HYPERLINK(...)` từ người dùng không chạy).
- Thời gian ghi theo giờ VN (`Asia/Ho_Chi_Minh`), định dạng `YYYY-MM-DD HH:mm:ss`.
- Quota Sheets API: 300 request/phút/project — dư cho lưu lượng lead. Nếu chạy chiến dịch rất lớn → BE-06 (hàng đợi).
- Muốn đổi cột: sửa `SHEET_HEADERS` + `toSheetRow` **cùng lúc** (test kiểm 18 cột).

## 5. CRM — checklist tích hợp (khi có thông tin)

Cần khách hàng cung cấp:

- [ ] Tên hệ thống CRM + phiên bản/gói
- [ ] Tài liệu API tạo lead/contact (endpoint, method), môi trường sandbox
- [ ] Cách xác thực (API key / OAuth2 client credentials / webhook secret)
- [ ] Mapping trường: họ tên, SĐT, email, nguồn, chiến dịch, sản phẩm quan tâm, ghi chú, người phụ trách (owner/sale), pipeline/stage
- [ ] Quy tắc chống trùng của CRM (theo SĐT?) và mã lỗi khi trùng
- [ ] Rate limit của CRM
- [ ] Có cần phân lead tự động cho sale theo `ref` không

Triển khai:
- CRM có webhook nhận JSON → chỉ cần sửa `toCrmPayload()` trong `crm-webhook.ts`.
- CRM có API riêng (OAuth, endpoint đặc thù) → tạo `sinks/<ten-crm>.ts` implement `LeadSink`, đăng ký trong `sinks/index.ts` + `SINK_NAMES`.
- Quy ước lỗi: 4xx (trừ 409/429) → `PermanentSinkError` (không retry); 5xx/429/timeout → retry; 409 trùng → coi là thành công.
- Viết test với `fetch` giả (xem `apps/api/test/app.test.ts`).

## 6. Xử lý lỗi & replay

| Tình huống | Hành vi |
|-----------|---------|
| 1 sink lỗi tạm thời | Retry tối đa 3 lần. Vẫn lỗi → log `level:error, event:lead.sink_failed` kèm **toàn bộ lead** |
| 1 sink lỗi, sink khác OK | Trả 201 cho người dùng; vận hành replay sink lỗi từ log |
| Tất cả sink lỗi | 503 → client hiện lỗi + nút gọi hotline, lưu nháp form trong `localStorage` |
| Lỗi validate | 400 + `fields` → hiển thị dưới từng ô |

**Replay thủ công:** Vercel → Logs → lọc `lead.sink_failed` → lấy JSON `lead` → gửi lại (script replay: task BE-06). Thiết lập cảnh báo khi xuất hiện event này (docs/06 §7).

## 7. Tracking & attribution

- Link mở Mini App có thể mang tham số: `https://zalo.me/s/<APP_ID>/?utm_source=zalo_oa&utm_campaign=mo-ban&ref=SALE01`
- `captureAttribution()` đọc khi khởi động → `sessionStorage` → gắn vào mọi lead trong phiên.
- `entryPoint` = CTA người dùng bấm (`hero`, `sticky_bar`, `product_<id>`, `floorplan_<CODE>`, `footer_cta`, `register_page`, hoặc tham số `entry`).
- Sự kiện hành vi (`lib/track.ts`): `view_section`, `click_cta`, `open_lead_form`, `zalo_phone_granted/denied`, `lead_submitted/failed`, `call_hotline`, `chat_oa` — hiện chỉ log dev; task FE-07 nối analytics.
