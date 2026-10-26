# 05 — Sản phẩm

- **`id`:** `san-pham` · **class:** `.section.products`
- **Vai trò:** giới thiệu 3 dòng sản phẩm dưới dạng lưới card.

## Bố cục

- `.heading-row`: bên trái là eyebrow + H2; bên phải là mô tả ngắn.
- `.product-grid`: 3 card, mỗi card gồm:
  - Nút ảnh `.image-button` (mở dialog xem lớn) với ảnh phối cảnh + nhãn "Xem phối cảnh"
  - Eyebrow số thứ tự phân loại
  - H3 tên sản phẩm + mô tả
  - Link `.product-plan` → `#mat-bang` kèm `data-plan` để mở đúng tab mặt bằng căn.

## Nội dung (verbatim)

- **Eyebrow:** `02 / SẢN PHẨM`
- **H2:** `Không gian sống` — `mang dấu ấn riêng.` (phần sau in nghiêng)
- **Mô tả phải:** `Ba dòng sản phẩm.` / `Một phong cách sống gần gũi thiên nhiên.`

### Card 1 — Biệt thự song lập

- Eyebrow: `01 / BIỆT THỰ`
- H3: `Biệt thự song lập`
- Mô tả: `Không gian sống rộng rãi, kiến trúc mở và sân vườn trước, sau nhà.`
- Link: `Xem mặt bằng biệt thự` → `data-plan="SD1"`
- Ảnh: `san-pham_arena1.jpg` (alt "Phối cảnh biệt thự song lập")

### Card 2 — Nhà phố vườn

- Eyebrow: `02 / NHÀ PHỐ LIÊN KẾ`
- H3: `Nhà phố vườn`
- Mô tả: `Mặt tiền hướng đường nội khu, kết hợp khoảng vườn riêng trước và sau nhà.`
- Link: `Xem mặt bằng nhà phố` → `data-plan="TH1"`
- Ảnh: `san-pham_arena2.jpg` (alt "Phối cảnh nhà phố vườn")

### Card 3 — Nhà phố thương mại

- Eyebrow: `03 / NHÀ PHỐ THƯƠNG MẠI`
- H3: `Nhà phố thương mại`
- Mô tả: `Không gian kết hợp nhu cầu sinh sống và kinh doanh trong cùng một ngôi nhà.`
- Link: `Xem mặt bằng thương mại` → `data-plan="SH1"`
- Ảnh: `san-pham_arena3.jpg` (alt "Phối cảnh nhà phố thương mại")

## Ảnh

- `images/senturia-info/san-pham/san-pham_arena1.jpg`
- `images/senturia-info/san-pham/san-pham_arena2.jpg`
- `images/senturia-info/san-pham/san-pham_arena3.jpg`

## Tương tác

- Bấm ảnh → mở `#image-dialog` (xem lớn, zoom, tải ảnh).
- Bấm link "Xem mặt bằng..." → tự chuyển tab "Mặt bằng căn" và chọn đúng mã căn (`data-plan`).
