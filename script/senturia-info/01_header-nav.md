# 01 — Header & Điều hướng

- **Vị trí:** đầu trang, cố định (`.header`)
- **Vai trò:** logo thương hiệu, menu anchor điều hướng nội trang, số hotline, nút mở menu mobile.

## Cấu trúc

- Bên trái: logo `.brand` → ảnh `header-logo_dark_logo.png` (alt "Senturia An Phú", 160×70). Link về `#trang-chu`.
- Giữa: `nav#navigation` (điều hướng chính, `aria-label="Điều hướng chính"`)
- Phải: số điện thoại hotline `tel:0325898989` + nút `Menu` (mobile, `aria-controls="navigation"`).

## Nội dung (verbatim)

**Menu điều hướng:**

| Nhãn | Liên kết |
|------|----------|
| Tổng quan | `#tong-quan` |
| Sản phẩm | `#san-pham` |
| Mặt bằng | `#mat-bang` |
| Tiện ích | `#tien-ich` |
| Vị trí | `#vi-tri` |
| Pháp lý | `#phap-ly` |

**Hotline:** `0325 89 89 89` (`tel:0325898989`)

**Skip link (accessibility):** "Đến nội dung chính" → `#tong-quan`

## Ảnh

- `images/senturia-info/header-logo/header-logo_dark_logo.png`

## Tương tác

- Nút Menu đổi trạng thái `aria-expanded` mở/đóng menu trên mobile (xử lý trong `app.js`).
- Logo và các link cuộn mượt tới section tương ứng.
