# 02 — Banner (slider ảnh)

- **`id`:** `s-banner` · **`data-s`:** `banner` · **class:** `.section.section--banner`
- **Vai trò:** dải ảnh phối cảnh toàn màn hình, tự động chuyển (slideshow) — tạo ấn tượng đầu tiên trước phần câu chuyện thương hiệu.

## Bố cục

- `.banner__slider-wrap` → Swiper `#banner-swiper` (`banner__swiper`, hiệu ứng **fade**).
- 5 slide, mỗi slide là một ảnh nền `.banner__bg` (`.banner__bg-img`, `object-position` top/bottom tùy ảnh) + bản mobile riêng (`<source media="(max-width: 768px)">`).
- Nút điều hướng: `#banner-prev` / `#banner-next` (`arrow_left.svg` / `arrow_right.svg`).

## Nội dung

- Không có chữ (textless) — thuần hình ảnh chuyển cảnh.

## Thứ tự slide (theo DOM lúc render)

| Slide | Ảnh desktop | Ảnh mobile | `object-position` |
|-------|-------------|------------|-------------------|
| 1 | `banner3.jpg` | `banner3-mb.jpg` | bottom |
| 2 | `banner4.jpg` | `banner4-mb.jpg` | bottom |
| 3 | `banner5.jpg` | `banner5-mb.jpg` | bottom |
| 4 | `banner1.jpg` | `banner1-mb.jpg` | top |
| 5 | `banner2.jpg` | `banner2-mb.jpg` | top |

> Thứ tự DOM là kết quả của cơ chế loop của Swiper; bộ ảnh gốc là `banner1` → `banner5`.

## Ảnh

- `images/senturia-com-vn/banner/banner_banner1.jpg` … `banner_banner5.jpg`
- `images/senturia-com-vn/banner/banner_banner1-mb.jpg` … `banner_banner5-mb.jpg`
- Nút: `images/senturia-com-vn/ui/ui_arrow_left.svg`, `ui_arrow_right.svg`

## Tương tác

- Tự động chạy + chuyển bằng mũi tên trái/phải; hiệu ứng fade `800ms`.
