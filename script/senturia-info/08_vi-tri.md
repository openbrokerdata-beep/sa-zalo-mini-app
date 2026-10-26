# 08 — Vị trí (kết nối khu vực)

- **`id`:** `vi-tri` · **class:** `.location.section`
- **Vai trò:** giới thiệu vị trí dự án + sơ đồ kết nối khu vực (ghép từ 4 lớp SVG) + nút mở Google Maps.

## Bố cục

- Chia 2 cột:
  - **`.location-copy`** (cột chữ): eyebrow, H2, mô tả, nút `Mở Google Maps`, caption.
  - **`.map`** (cột sơ đồ, `aria-label="Sơ đồ kết nối khu vực Senturia An Phú"`): 4 lớp ảnh SVG xếp chồng.
- Nền section tối, chữ sáng (eyebrow/`light`).

## Nội dung (verbatim)

- **Eyebrow:** `05 / VỊ TRÍ`
- **H2:** `Kết nối phố thị.` — `Trở về bình yên.` (phần sau in nghiêng)
- **Mô tả:** `Khu đô thị Nam Rạch Chiếc, đường Song Hành, cao tốc TP. HCM – Long Thành – Dầu Giây, phường Bình Trưng, TP. Hồ Chí Minh.`
- **Nút:** `Mở Google Maps` → link Google Maps (mở tab mới, `rel="noopener"`)
  - Toạ độ: `10.7945727, 106.7679024`
- **Caption:** `Sơ đồ vị trí mang tính minh họa. Khoảng cách và thời gian di chuyển phụ thuộc lộ trình, giao thông thực tế.`

## Sơ đồ (4 lớp SVG xếp chồng)

| Thứ tự | Ảnh | `alt` |
|--------|-----|-------|
| 1 (dưới) | `vi-tri_map_water.svg` | `Nền sơ đồ vị trí` |
| 2 | `vi-tri_map_road.svg` | *(trang trí, alt rỗng)* |
| 3 | `vi-tri_map_text.svg` | `Tên đường và các khu vực kết nối` |
| 4 (trên) | `vi-tri_map_icons.svg` | `Các điểm kết nối trong khu vực` |

## Ảnh

- `images/senturia-info/vi-tri/vi-tri_map_water.svg`
- `images/senturia-info/vi-tri/vi-tri_map_road.svg`
- `images/senturia-info/vi-tri/vi-tri_map_text.svg`
- `images/senturia-info/vi-tri/vi-tri_map_icons.svg`

> 4 lớp SVG là cùng một bộ ảnh dùng chung với site B (`senturia.com.vn`).
