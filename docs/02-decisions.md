# 02 · Quyết định kiến trúc (ADR)

Mỗi ADR: bối cảnh → quyết định → hệ quả. Đổi quyết định = thêm ADR mới, ghi "thay thế ADR-xx".

---

### ADR-01 · Monorepo pnpm workspaces

- **Bối cảnh:** Mini App và Lead API cùng dùng schema lead; nhiều subagent làm song song.
- **Quyết định:** 1 repo, `pnpm` workspaces (`apps/*`, `packages/*`). Không dùng Turborepo (quy mô nhỏ, `pnpm -r` đủ).
- **Hệ quả:** 1 lệnh `pnpm check` cho toàn bộ. `@sa/shared` build bằng tsup → `dist/` (runtime) còn kiểu đọc thẳng từ `src/`.

### ADR-02 · Mini App: React + ZaUI + Vite theo template chính thức của Zalo

- **Bối cảnh:** Zalo Mini App là web app chạy trong webview Zalo, deploy bằng `zmp-cli`.
- **Quyết định:** React 18 + `zmp-ui` 1.11 + `zmp-sdk` 2.x + `zmp-vite-plugin`, cấu trúc giống template `zaui-coffee` (root `./src`, `base: ""`). Tailwind 3 (tắt preflight để không đè style ZaUI).
- **Hệ quả:** Giữ React 18 (zmp-ui chưa chính thức hỗ trợ React 19). Router dùng `ZMPRouter` + `AnimationRoutes` của ZaUI.

### ADR-03 · Lead API serverless: Hono trên Vercel Functions

- **Bối cảnh:** Cần nơi giữ secret và gọi Zalo Graph API, Google, CRM. Lưu lượng thấp–vừa, có đỉnh theo chiến dịch.
- **Quyết định:** Hono 4 (nhẹ, chuẩn Web `fetch`, chạy được Node/Edge/Bun), deploy Vercel (zero-config Hono). Local chạy bằng `@hono/node-server`.
- **Phương án loại:** Google Apps Script (khó test, chậm, giới hạn quota; khó nối CRM); NestJS (quá nặng cho 3 endpoint); Cloudflare Workers (khả thi — Hono chạy được, có thể chuyển nếu cần, chỉ thay `index.ts`).
- **Hệ quả:** Logic không phụ thuộc Vercel (`createApp(deps)` thuần) → đổi host dễ.

### ADR-04 · Fan-out đồng bộ có retry, chưa dùng hàng đợi

- **Bối cảnh:** Chưa biết CRM; Sheets API ổn định. Hàng đợi (Vercel Queues / Upstash QStash) tăng độ phức tạp.
- **Quyết định:** Trong request: gửi song song tới mọi sink, retry 3 lần (backoff 300→900 ms, timeout 8 s/lần). Trả 201 nếu ≥ 1 sink thành công. Sink lỗi → log `lead.sink_failed` kèm toàn bộ lead để replay.
- **Hệ quả:** Đơn giản, lead đến sale gần như tức thì. Rủi ro: cả 2 đích chết cùng lúc → người dùng thấy lỗi + nút gọi hotline + form được lưu nháp. **Điểm nâng cấp:** task BE-06 (hàng đợi bền + replay tự động) nếu lưu lượng/độ tin cậy CRM đòi hỏi.

### ADR-05 · Ảnh trên CDN, không đóng gói vào Mini App

- **Bối cảnh:** Kho ảnh 61 MB. Gói Mini App cần nhỏ để mở nhanh và qua kiểm duyệt.
- **Quyết định:** `scripts/optimize-assets.mjs` → WebP (41 MB → ~9 MB) vào `apps/api/public/media`, phục vụ bởi Vercel CDN cùng domain API (1 domain cần whitelist). Cache `immutable` 1 năm.
- **Hệ quả:** Đổi ảnh = deploy API (không cần duyệt lại Mini App). Đổi nội dung ảnh cùng tên → cần đổi tên file (cache immutable). Test `content.test.ts` kiểm mọi đường dẫn ảnh tồn tại trong `manifest.json`.

### ADR-06 · Xác thực SĐT bằng phoneProof (HMAC) thay vì tin client

- **Bối cảnh:** Token `getPhoneNumber` chỉ dùng 1 lần, sống 2 phút; muốn hiển thị số cho người dùng xác nhận trước khi gửi.
- **Quyết định:** `/v1/zalo/phone` đổi token → SĐT, trả kèm `phoneProof = exp.HMAC(phone.exp)` (30 phút). Lead gửi kèm proof → server đặt `phoneVerified`.
- **Hệ quả:** Không cần lưu trạng thái phía server; sale biết lead nào có SĐT thật.

### ADR-07 · Idempotency theo `submissionId` do client sinh

- **Quyết định:** Mỗi lần mở form sinh 1 UUID. Server nhớ `submissionId → leadId` 1 giờ (bộ nhớ instance); CRM nhận header `Idempotency-Key`; Sheet có cột "Submission ID" để lọc trùng.
- **Hệ quả:** Bấm gửi 2 lần / mạng chập chờn không tạo lead trùng (trong cùng instance). Chống trùng tuyệt đối cần KV (task BE-06).

### ADR-08 · Chống spam nhiều lớp, không dùng CAPTCHA

- **Quyết định:** Honeypot field + rate limit theo IP-hash (5 lead/10 phút) + giới hạn body 16 KB + validate chặt + Vercel WAF rule. Không CAPTCHA (hại chuyển đổi; môi trường Zalo đã giảm bot).
- **Hệ quả:** Rate limit trong bộ nhớ là best-effort trên serverless → WAF là lớp chính (docs/06 §6).

### ADR-09 · Biome thay ESLint + Prettier

- **Quyết định:** `@biomejs/biome` cho lint + format (1 công cụ, nhanh, ít cấu hình). Tắt lint CSS (Tailwind `@apply`), tắt `useUniqueElementIds` (id section là anchor tĩnh có chủ đích).
