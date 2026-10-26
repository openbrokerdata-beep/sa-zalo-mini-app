# 11 — Vị trí: Sôi động kết nối

- **`id`:** `s-location` · **`data-s`:** `vi-tri` · **class:** `.section.section--location.location` · `data-header-theme="dark"`
- **Vai trò:** sơ đồ kết nối vùng (bản đồ SVG nhiều lớp) + 3 mốc khoảng cách.

## Bố cục

- `.map-container`:
  - `.location__content` > `.location__frame`: tiêu đề (H2) + phụ đề + danh sách `.location__list` (3 mốc).
  - `.map-wrapper`: bản đồ xếp lớp:
    - `.map-zoom-controls`: `#btnZoomIn` (`+`) / `#btnZoomOut` (`-`).
    - `.map-img#mapImg`: các lớp ảnh `map_water.svg` (nước), `map_road.svg` (đường), `map_text.svg` (chữ), `map_icons.svg` (icon) + 2 SVG overlay (`map-svg-lines` cho tuyến metro/đường; `map-svg-logo` cho hiệu ứng ripple logo dự án `#D39538`).

## Nội dung (verbatim)

- **Tiêu đề (H2):** `SÔI ĐỘNG`
- **Phụ đề:** `KẾT NỐI`

### Danh sách mốc kết nối

| Thời gian | Địa điểm | Icon |
|-----------|----------|------|
| `15 Phút` | Chợ Bến Thành | `market.svg` |
| `30 Phút` | Sân bay Long Thành & Đồng Nai | `plane_o.svg` |
| `60 Phút` | Vũng Tàu | `beach.svg` |

## Ảnh

- `images/senturia-com-vn/vi-tri/vi-tri_map_water.svg`
- `images/senturia-com-vn/vi-tri/vi-tri_map_road.svg`
- `images/senturia-com-vn/vi-tri/vi-tri_map_text.svg`
- `images/senturia-com-vn/vi-tri/vi-tri_map_icons.svg`
- `images/senturia-com-vn/vi-tri/vi-tri_market.svg`
- `images/senturia-com-vn/vi-tri/vi-tri_plane_o.svg`
- `images/senturia-com-vn/vi-tri/vi-tri_beach.svg`

## Ghi chú

- Các lớp `map_text.svg` và `map_icons.svg` ban đầu được scale `1.3` rồi thu về `1` khi cuộn (hiệu ứng GSAP).
- Nút zoom điều khiển transform của `#mapImg`.
