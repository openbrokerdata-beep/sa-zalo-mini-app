# 05 · Đặc tả UI & nội dung

## 1. Nguyên tắc trải nghiệm

- **Mobile-first, một tay**: CTA chính luôn trong tầm ngón cái (sticky bar đáy màn hình, tôn trọng `safe-area-inset-bottom`).
- **Hành trình**: Cảm xúc (hero, thiên nhiên) → Giá trị (gia sản, kiến trúc) → Sản phẩm (3 dòng, mặt bằng) → Bằng chứng (tiện ích, vị trí, tiến độ, pháp lý, đối tác) → Hành động (CTA cuối).
- **Mỗi section có ít nhất 1 lối vào form** (trực tiếp hoặc qua sticky bar), `entryPoint` khác nhau để đo.
- **Sang trọng, tiết chế**: nhiều khoảng trắng, chữ serif cho tiêu đề, ảnh lớn, chuyển động nhẹ (fade/slide ≤ 300 ms), tôn trọng `prefers-reduced-motion`.
- **Nội dung lấy từ `content/project.ts`** — giữ nguyên văn tiếng Việt từ tài liệu thống nhất.

## 2. Design tokens

Định nghĩa ở `apps/miniapp/tailwind.config.js` (+ biến CSS trong `styles/index.css`).

| Token | Giá trị | Dùng cho |
|-------|---------|---------|
| `forest` | `#0B4C3A` | Màu chủ đạo, tiêu đề, nền section tối |
| `forest-700` | `#123F36` | Nền hero/footer |
| `forest-600` | `#2A4F40` | Biến thể |
| `gold` | `#D39538` | CTA chính, điểm nhấn, chữ nghiêng tiêu đề |
| `gold-600` | `#B57A26` | Chữ vàng trên nền sáng (đủ tương phản) |
| `cream` | `#F7F3EA` | Nền trang |
| `ink` / `ink-muted` | `#1F2A26` / `#5B6661` | Chữ thân / chữ phụ |
| `font-display` | Playfair Display | Tiêu đề |
| `font-sans` | Be Vietnam Pro | Thân bài (hỗ trợ tiếng Việt tốt) |

Kiểu chữ: H1 40px/1.1 · H2 26–28px · thân 15px/1.6 · chú thích 11–13px. Bo góc thẻ `rounded-2xl`, nút `rounded-full`.

> Font: **tự host** woff2 (subset `vietnamese` + `latin`) trong gói — không gọi Google Fonts (cần whitelist, chậm). Task UI-01.

## 3. Danh sách section (trang `/`)

| # | id | File | Nội dung (`content/project.ts`) | Trạng thái scaffold | Việc còn lại (task) |
|---|----|------|-------------------------------|--------------------|--------------------|
| 1 | `hero` | `sections/hero.tsx` | `hero`, `banners` | Ảnh tĩnh + 2 CTA | Slider banner hoặc video nền (poster ảnh), animation vào (FE-02) |
| 2 | `overview` | `sections/overview.tsx` | `overview` | Xong cơ bản | Đếm số chạy khi vào khung nhìn (FE-02) |
| 3 | `nature` | `sections/nature.tsx` | `nature` | Xong cơ bản | Reveal khi cuộn (FE-02) |
| 4–5 | `legacy`, `design` | `sections/legacy-design.tsx` | `legacy`, `design` | Xong cơ bản | Layout tinh chỉnh (FE-02) |
| 6 | `products` | `sections/products.tsx` | `products`, `productsSection` | 3 card → `/product/:id` | Card carousel/tab, hiệu ứng (FE-02) |
| 7 | `floorplans` | `sections/floor-plans.tsx` | `floorPlan` | Bảng mã căn | Tab Tổng thể/Căn, ảnh mặt bằng zoom (`ImageViewer`), chạm mã căn → form `floorplan_<CODE>` (FE-03) |
| 8 | `amenities` | `sections/amenities.tsx` | `amenities` | Cuộn ngang | Indicator, polish (FE-03) |
| 9 | `location` | `sections/location.tsx` | `location` | 3 mốc | Bản đồ 4 lớp SVG chồng nhau, nút Google Maps (FE-03) |
| 10–11 | `progress`, `legal` | `sections/progress-legal.tsx` | `progress`, `legal` | Mốc mới nhất + danh sách | Tab 4 mốc + ảnh, accordion pháp lý (FE-03) |
| 12–13 | `partners`, `cta`, footer | `sections/partners-footer.tsx` | `partners`, `project` | Xong cơ bản | Logo cân chỉnh, link chính sách (FE-02) |

Sticky bar (`components/sticky-action-bar.tsx`): `Gọi <hotline>` · `Chat Zalo` (ẩn nếu chưa có OA) · **`Đăng ký tư vấn`** (vàng). Task FE-05: icon, ẩn khi cuộn ở hero, haptic.

## 4. Form lead (`components/lead-form.tsx` + `hooks/use-lead-form.ts`)

| Ô | Kiểu | Bắt buộc | Ghi chú UX |
|---|------|:-------:|-----------|
| Họ và tên | text | ✓ | |
| Số điện thoại | tel | ✓ | Nút phụ "Dùng số điện thoại Zalo" → điền sẵn + nhãn "Đã xác thực qua Zalo"; sửa tay → mất nhãn |
| Email | email | | |
| Sản phẩm quan tâm | select | | Điền sẵn khi mở từ trang sản phẩm |
| Lời nhắn | textarea | | |
| Đồng ý điều khoản | checkbox | ✓ | Link "Chính sách bảo mật" → `/privacy` (không toggle checkbox) |
| `website` | ẩn | | Honeypot |

Trạng thái: lỗi từng ô (thông điệp tiếng Việt từ schema) · nút loading/khoá khi gửi · lỗi tổng + nút gọi hotline · thành công → `/success` (hiện mã đăng ký, gợi ý follow OA). Lỗi mạng → lưu nháp, mở lại form tự điền.

Hai nơi hiển thị: **LeadSheet** (bottom sheet, mọi CTA trong landing) và **`/register`** (deep link).

## 5. Trang khác

| Route | File | Ghi chú |
|-------|------|---------|
| `/product/:id` | `pages/product.tsx` | Cover + mô tả + gallery + CTA "Nhận báo giá <dòng SP>" (điền sẵn sản phẩm). Task FE-03: `ImageViewer` |
| `/register` | `pages/register.tsx` | Form full-screen |
| `/success` | `pages/success.tsx` | Cảm ơn + follow OA |
| `/privacy` | `pages/privacy.tsx` | **Nội dung tạm** — chờ pháp chế (LG-01) |

## 6. Hiệu năng & a11y

- Ảnh: `MediaImage` lazy mặc định; hero `eager`. Luôn đặt `aspect-[…]` để tránh nhảy layout.
- Không thêm thư viện UI/animation nặng; ưu tiên CSS + ZaUI. Nếu cần carousel: `swiper` (đã dùng trong template Zalo) — import module tối thiểu.
- Ngân sách: JS gzip ≤ 250 KB, gói ≤ 3 MB (`pnpm assets:check`).
- a11y: `alt` mọi ảnh nội dung (ảnh trang trí `alt=""`), nút là `<button type="button">`, tương phản chữ ≥ 4.5:1 (dùng `gold-600` cho chữ vàng trên nền sáng), vùng chạm ≥ 44px.
