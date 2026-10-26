# 08 — Mặt bằng

- **`id`:** `s-arena_detail` · **`data-s`:** `mat-bang` · **`class`:** `.section.section--arena_detail`
- **Vai trò:** xem mặt bằng tổng thể và mặt bằng từng loại căn (dạng tab + bản đồ tương tác).

## Bố cục

- `.arena-detail__bg`: nền chất liệu `silk.png`.
- `.arena-detail__header`:
  - tiêu đề (H2) `MẶT BẰNG`
  - `.arena-detail-tabs-nav`: 2 tab
    - `Mặt bằng tổng thể` → pane `#tab-ad-1` (mặc định `active`)
    - `Mặt bằng căn` → pane `#tab-ad-2`
- `.arena-detail-tab-content`:
  - **Tab 1:** ảnh `arena.jpg` (`.arena-detail-img`).
  - **Tab 2:** SVG tương tác `.arena-interactive-map` (`viewBox="0 0 1920 1080"`) gồm ảnh nền `arena_detail.jpg` + các vùng tô màu theo mã căn (`.arena-map-area`, `data-name`). Kèm `.arena-mobile-buttons` (nút mã căn cho mobile, `data-name`, nền theo màu legend).
- Bấm vào vùng/… → mở popup `#arenaDetailPopup` xem mặt bằng căn + số liệu.

## Nội dung (verbatim)

- **Tiêu đề (H2):** `MẶT BẰNG`
- **Tab 1:** `Mặt bằng tổng thể`
- **Tab 2:** `Mặt bằng căn`

## Bản đồ tương tác — legend & màu

| Nhóm | Mã căn | Màu |
|------|--------|-----|
| NHÀ PHỐ LIÊN KẾ | TH1 | `#F3F2CB` |
| NHÀ PHỐ LIÊN KẾ | TH2 | `#FAF6AB` |
| NHÀ PHỐ LIÊN KẾ | TH3 | `#E9E44F` |
| NHÀ PHỐ LIÊN KẾ | TH4 | `#F5CF49` |
| NHÀ PHỐ THƯƠNG MẠI | SH1 | `#E4BCD3` |
| NHÀ PHỐ THƯƠNG MẠI | SH2 | `#D37CAC` |
| NHÀ PHỐ THƯƠNG MẠI | SH3 | `#BB6180` |
| BIỆT THỰ SONG LẬP | SD1 | `#6DBFC6` |

## Số liệu mặt bằng căn (hiển thị trong popup)

| Mã căn | Số lượng | Diện tích | Số tầng |
|--------|----------|-----------|---------|
| TH1 | 41 | 75 - 204,19 | 4 tầng (1 trệt, 2 lầu & sân thượng) |
| TH2 | 36 | 75 - 204,19 | 4 tầng (1 trệt, 2 lầu & sân thượng) |
| TH3 | 62 | 75 - 204,19 | 4 tầng (1 trệt, 2 lầu & sân thượng) |
| TH4 | 46 | 75 - 204,19 | 4 tầng (1 trệt, 2 lầu & sân thượng) |
| SH1 | 41 | 116,31 - 215,9 | 4 tầng (1 trệt, 3 lầu) |
| SH2 | 39 | 116,31 - 215,9 | 4 tầng (1 trệt, 3 lầu) |
| SH3 | 8 | 116,31 - 215,9 | 4 tầng (1 trệt, 3 lầu) |
| SD1 | 59 | 189,45 - 338,23 | 4 tầng (1 trệt, 2 lầu & sân thượng) |

- Nhãn popup: `Số lượng:` · `Diện tích:` · `Số tầng:`
- Ghi chú popup: `*Đây là diện tích tham khảo, vui lòng liên hệ hotline để biết thêm thông tin chi tiết`

## Ảnh

- `images/senturia-com-vn/mat-bang/mat-bang_arena.jpg` (mặt bằng tổng thể)
- `images/senturia-com-vn/mat-bang/mat-bang_arena_detail.jpg` (bản đồ mặt bằng căn)
- `images/senturia-com-vn/mat-bang/mat-bang_TH1.jpg` … `mat-bang_TH4.jpg`
- `images/senturia-com-vn/mat-bang/mat-bang_SH1.jpg` … `mat-bang_SH3.jpg`
- `images/senturia-com-vn/mat-bang/mat-bang_SD1.jpg`

## Tương tác

- Đổi tab mặt bằng tổng thể / mặt bằng căn.
- Hover/bấm vùng trên bản đồ SVG (`.arena-map-area[data-name]`) → mở popup chi tiết (`arenaDetailPopup`).
- Popup có nút zoom `+` / `-` (`#arenaBtnZoomIn`, `#arenaBtnZoomOut`).
