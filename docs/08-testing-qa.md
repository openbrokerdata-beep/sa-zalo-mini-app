# 08 · Kiểm thử & QA

## 1. Tầng kiểm thử

| Tầng | Công cụ | Phạm vi | Lệnh |
|------|---------|---------|------|
| Unit — shared | Vitest | Chuẩn hoá SĐT, schema lead | `pnpm --filter @sa/shared test` |
| Unit/Integration — API | Vitest + `app.request()` của Hono, sink giả, `fetch` giả | Tạo lead, idempotency, rate limit, honeypot, fan-out/retry, Zalo phone, env | `pnpm --filter @sa/api test` |
| Content | Vitest | Số lượng SP/tiện ích; **mọi đường dẫn ảnh có trên CDN manifest** | `pnpm --filter @sa/miniapp test` |
| Tĩnh | Biome + `tsc` | Lint, format, kiểu | `pnpm lint && pnpm typecheck` |
| Dung lượng | script | Gói Mini App ≤ 3 MB | `pnpm assets:check` |
| Thủ công trên thiết bị | Zalo bản Development/Testing | Checklist §3 | — |

Hiện trạng scaffold: **29 test pass** (shared 14 · api 13 · content 2).

Lệnh tổng: `pnpm check` (lint + typecheck + test). Mọi task phải xanh lệnh này trước khi bàn giao.

## 2. Quy ước viết test

- API: tạo app bằng `createApp({ env, sinks: [MemorySink…], fetchImpl })` — không gọi mạng thật.
- Mỗi sink mới: test mapping payload + phân loại lỗi (retry vs permanent).
- Logic form phía client: tách hàm thuần khỏi hook nếu cần test (task FE-04 thêm test cho `use-lead-form`).

## 3. Checklist QA trên thiết bị thật (bản Testing)

Thiết bị tối thiểu: 1 Android tầm trung (Android 10+), 1 iPhone (iOS 15+), mạng 4G.

**Hiển thị**
- [ ] Mở app < 2 giây (4G), không trắng màn hình
- [ ] Hero vừa màn hình, không bị status bar/notch che
- [ ] Mọi ảnh hiển thị (không ảnh vỡ), không nhảy layout khi ảnh tải
- [ ] Sticky bar không che nội dung cuối trang, đúng safe-area iPhone
- [ ] Font tiếng Việt hiển thị đúng dấu
- [ ] Chế độ chữ lớn của hệ điều hành không vỡ layout

**Lead**
- [ ] Gửi lead nhập tay → trang cảm ơn có mã → hàng xuất hiện trong Sheet staging < 5 giây (+ CRM sandbox)
- [ ] "Dùng số điện thoại Zalo" → popup xin quyền → đồng ý → điền số + nhãn đã xác thực → lead có `SĐT xác thực Zalo = Có`
- [ ] Từ chối quyền SĐT → vẫn nhập tay được, không lỗi
- [ ] Bỏ trống/ sai SĐT/ chưa tích đồng ý → thông báo lỗi đúng ô
- [ ] Bấm "Gửi" 2 lần nhanh → chỉ 1 lead
- [ ] Tắt mạng rồi gửi → báo lỗi + nút gọi hotline; bật mạng mở lại form → dữ liệu còn
- [ ] Mở từ link có `utm_source`, `ref` → lead có đúng các cột nguồn/ref
- [ ] Mở từ card sản phẩm → "Sản phẩm quan tâm" điền sẵn; `Điểm chạm` = `product_<id>`

**Tương tác Zalo**
- [ ] Nút Gọi mở trình gọi đúng hotline
- [ ] Nút Chat Zalo mở đúng OA
- [ ] Trang cảm ơn: Follow OA hoạt động
- [ ] Nút back của Zalo hoạt động đúng trên mọi trang

**Kiểm duyệt**
- [ ] Trang chính sách bảo mật có nội dung chính thức
- [ ] Mục đích xin quyền SĐT được giải thích tại chỗ
- [ ] Không có nội dung placeholder/TODO hiển thị cho người dùng
