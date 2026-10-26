# 14 — Floating CTA + Dialog xem ảnh

- **Thành phần:** `.floating-contact` + `<dialog id="image-dialog">`
- **Vai trò:** nút liên hệ nổi (luôn hiển thị) và hộp thoại xem/tải ảnh lớn.

## 1. Floating contact (`.floating-contact`)

Thanh CTA cố định, 2 nút:

| Nút | `href` | Ghi chú |
|-----|--------|---------|
| `Gọi tư vấn` | `tel:0325898989` | `aria-label="Gọi 0325 89 89 89"` |
| `Đăng ký` | `#lien-he` | cuộn tới khối liên hệ |

## 2. Dialog xem ảnh (`#image-dialog`)

Hộp thoại `<dialog>` native dùng chung cho mọi ảnh có `data-image` (sản phẩm, mặt bằng, tiện ích, tiến độ).

### Cấu trúc

- `.dialog-head`: tiêu đề `#dialog-title` (mặc định `Hình ảnh dự án`) + nút đóng `#dialog-close` (`×`).
- `.dialog-image-wrap`: ảnh `#dialog-image` (`alt` cập nhật theo ảnh).
- `.dialog-bottom`:
  - `#zoom-out` (`−`, `aria-label="Thu nhỏ ảnh"`)
  - `#zoom-label` (mặc định `100%`)
  - `#zoom-in` (`+`, `aria-label="Phóng to ảnh"`)
  - `#dialog-download` (`Tải ảnh`, mặc định `assets/arena.jpg`)

### Hành vi (từ `app.js`)

- Bấm phần tử `[data-image]` → đặt tiêu đề, ảnh, link tải; reset zoom về 100%; mở dialog; khoá scroll body.
- Zoom: mỗi lần `±25%`, giới hạn **100%–300%**; hiển thị trên `#zoom-label`.
- Đóng: nút `×`, phím `Esc` (hành vi mặc định của `<dialog>`), hoặc bấm ra ngoài vùng dialog.
- Tên file tải về: `Senturia-An-Phu-<tên-file-gốc>`.

## Ảnh

- Dialog không có ảnh riêng; hiển thị lại ảnh từ các section (sản phẩm / mặt bằng / tiện ích / tiến độ).
