# 00 · Tổng quan dự án

> Zalo Mini App **Senturia An Phú** — "landing page bên trong Zalo" để giới thiệu dự án và **thu lead**, đẩy lead sang **CRM** và **Google Sheets**.

## 1. Mục tiêu

| # | Mục tiêu | Thước đo (KPI) |
|---|----------|----------------|
| G1 | Thu lead chất lượng từ hệ sinh thái Zalo (OA, QR, quảng cáo Zalo Ads, chia sẻ) | Số lead/ngày, tỉ lệ chuyển đổi xem → đăng ký |
| G2 | Lead tới tay sale **tức thì** và **không mất lead** | 100% lead có trong ít nhất 1 đích; độ trễ < 5 giây |
| G3 | Tăng chất lượng SĐT bằng xác thực Zalo (`getPhoneNumber`) | % lead `phoneVerified = true` |
| G4 | Đo được nguồn lead (UTM, mã sale `ref`, điểm chạm CTA) | 100% lead có `attribution` khi mở từ link có tham số |
| G5 | Trải nghiệm nhanh, đẹp, đúng nhận diện | Mở app < 2 giây trên 4G; gói < 3 MB |

## 2. Phạm vi

**Trong phạm vi (MVP):**
- Landing 1 trang gồm các section: Hero, Tổng quan, Thiên nhiên, Gia sản/Kiến trúc, Sản phẩm (3 dòng), Mặt bằng, Tiện ích (12), Vị trí, Tiến độ, Pháp lý, Đối tác, CTA, Footer.
- Trang chi tiết sản phẩm (gallery), trang đăng ký full-screen (deep link), trang cảm ơn, trang chính sách bảo mật.
- Form lead: họ tên, SĐT (nhập tay **hoặc** lấy từ Zalo), email, sản phẩm quan tâm, lời nhắn, đồng ý điều khoản.
- Thanh CTA cố định: Gọi hotline · Chat Zalo OA · Đăng ký.
- Lead API: validate, chống spam, chống trùng, đẩy song song tới CRM + Google Sheets, retry.
- Pipeline ảnh: nén WebP, phục vụ qua CDN.

**Ngoài phạm vi (giai đoạn sau):** tin tức (6 bài), tour 360°, bản đồ mặt bằng tương tác SVG, đặt lịch tham quan có chọn giờ, ZNS (tin nhắn xác nhận), dashboard báo cáo, đa dự án.

## 3. Nguồn dữ liệu

| Loại | Vị trí | Ghi chú |
|------|--------|---------|
| Nội dung chuẩn | `Senturia-An-Phu_Tai-lieu-thong-nhat.md` | Single source of truth — nguồn B (chính thức) ưu tiên |
| Nội dung chi tiết theo section | `script/senturia-com-vn/*`, `script/senturia-info/*` | Tra cứu khi cần nguyên văn |
| Ảnh gốc | `images/` (61 MB, 152 file) | Không sửa/xoá. Pipeline sinh bản WebP ra `apps/api/public/media/` |
| Nội dung dùng trong app | `apps/miniapp/src/content/project.ts` | Đã nhập từ tài liệu thống nhất |

## 4. Câu hỏi mở — CẦN KHÁCH HÀNG CHỐT

| ID | Câu hỏi | Ảnh hưởng | Mặc định tạm thời |
|----|---------|-----------|-------------------|
| Q1 | **CRM** là hệ thống nào? (HubSpot / Salesforce / Bitrix24 / Getfly / CRM nội bộ…) — tài liệu API, auth, mapping trường | Task BE-03 | Sink webhook chung `CrmWebhookSink` (POST JSON + HMAC) |
| Q2 | **Google Sheet**: ID file, tên tab, cấu trúc cột mong muốn; ai được chia sẻ | Task BE-02 | 18 cột theo `SHEET_HEADERS` (docs/03 §4) |
| Q3 | **Hotline** chính thức: `1800 6627` (CĐT) hay `0325 89 89 89` (đại lý) hay số khác? | Sticky bar, footer | `1800 6627` qua `VITE_HOTLINE` |
| Q4 | **Zalo OA ID** để chat/follow | Nút Chat Zalo, trang cảm ơn | Ẩn nút nếu trống |
| Q5 | Pháp nhân đứng tên Mini App (CĐT hay đại lý)? Ai là "bên kiểm soát dữ liệu" trong chính sách bảo mật? | Đăng ký Zalo app, trang `/privacy` | Nội dung tạm |
| Q6 | Màu nhận diện chốt: xanh `#0B4C3A` + vàng đồng `#D39538` (nguồn B)? | Design tokens | Theo nguồn B |
| Q7 | Hiển thị đối tác "PCA By Open Broker" (chỉ có ở nguồn A)? | Section đối tác | Đang hiển thị — cần xác nhận |
| Q8 | Domain cho Lead API/CDN (vd. `api.senturia-xxx.vn`) hay dùng `*.vercel.app`? | Whitelist domain Zalo | `*.vercel.app` cho staging |
| Q9 | Có cần thông báo lead mới tức thời (Zalo OA/Telegram/Email cho sale) không? | Thêm sink | Chưa làm |

## 5. Bản đồ tài liệu

| File | Nội dung |
|------|----------|
| [01-architecture.md](01-architecture.md) | Kiến trúc tổng thể, luồng dữ liệu, cấu trúc repo |
| [02-decisions.md](02-decisions.md) | Các quyết định kiến trúc (ADR) và lý do |
| [03-lead-pipeline.md](03-lead-pipeline.md) | Hợp đồng API, mô hình dữ liệu lead, sink CRM/Sheets, xử lý lỗi |
| [04-zalo-integration.md](04-zalo-integration.md) | Đăng ký app Zalo, quyền, lấy SĐT, whitelist, deploy & kiểm duyệt |
| [05-ui-content-spec.md](05-ui-content-spec.md) | Đặc tả UI từng section, design tokens, form, hiệu năng |
| [06-infra-deployment.md](06-infra-deployment.md) | Môi trường, Vercel, biến môi trường, CI/CD, assets, giám sát |
| [07-security-privacy.md](07-security-privacy.md) | Bảo mật, chống spam, dữ liệu cá nhân |
| [08-testing-qa.md](08-testing-qa.md) | Chiến lược test, checklist QA trên thiết bị thật |
| [09-task-breakdown.md](09-task-breakdown.md) | **Phân công task cho subagents** — waves, phụ thuộc, DoD |
| [10-run-on-zalo.md](10-run-on-zalo.md) | **Hướng dẫn từng bước chạy Mini App lên Zalo** (giai đoạn 1, chưa đẩy lead) |
