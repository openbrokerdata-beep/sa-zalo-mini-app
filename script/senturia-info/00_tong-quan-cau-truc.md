# 00 — Tổng quan cấu trúc trang

- **Nguồn scrape:** https://senturia.info/
- **Loại trang:** HTML tĩnh (1 trang duy nhất - one page), điều hướng bằng anchor `#id`
- **Ngôn ngữ:** Tiếng Việt (`<html lang="vi">`)
- **Ngày scrape:** 12/10/2026
- **Tiêu đề SEO:** `Senturia An Phú | Home Resort giữa lòng khu Đông`
- **Meta description:** `Khám phá Senturia An Phú: khu nhà ở thấp tầng 8,6 ha, 355 sản phẩm tại Nam Rạch Chiếc, TP.HCM. Tư vấn: 0325 89 89 89.`

## Thứ tự bố cục (layout flow)

| # | Section | `id` / class | File nội dung |
|---|---------|--------------|----------------|
| 1 | Header + điều hướng | `.header` | `01_header-nav.md` |
| 2 | Hero | `#trang-chu` | `02_hero.md` |
| 3 | Tổng quan dự án | `#tong-quan` | `03_tong-quan.md` |
| 4 | Thiên nhiên trước thềm nhà | `.nature` | `04_thien-nhien.md` |
| 5 | Sản phẩm | `#san-pham` | `05_san-pham.md` |
| 6 | Mặt bằng (tab) | `#mat-bang` | `06_mat-bang.md` |
| 7 | Tiện ích (slider 12 mục) | `#tien-ich` | `07_tien-ich.md` |
| 8 | Vị trí (sơ đồ SVG) | `#vi-tri` | `08_vi-tri.md` |
| 9 | Tiến độ & hình ảnh | `#tien-do` | `09_tien-do-hinh-anh.md` |
| 10 | Pháp lý (accordion) | `#phap-ly` | `10_phap-ly.md` |
| 11 | Đối tác | `.partners` | `11_doi-tac.md` |
| 12 | Liên hệ + form | `#lien-he` | `12_lien-he.md` |
| 13 | Footer | `footer` | `13_footer.md` |
| 14 | Floating CTA + Dialog ảnh | `.floating-contact`, `#image-dialog` | `14_floating-cta-va-dialog.md` |

## Design tokens (ghi nhận từ CSS/source)

- **Màu chủ đạo:** xanh đậm `#123f36` (`meta theme-color`)
- **Bộ màu phụ trợ:** tone "cream" (kem/ngà) cho nút và chữ trên nền tối; đen/trắng xen kẽ giữa các section.
- **Font:**
  - Tiêu đề: `Playfair Display` (serif, có italic cho phần nhấn `<em>`)
  - Nội dung: `Be Vietnam Pro` (sans-serif, weight 400/500/600/700)
- **Phong cách:** thẻ nội dung dạng "eyebrow số thứ tự" (`01 / TỔNG QUAN`) đặt trước mỗi tiêu đề; nút bo tròn/tối giản; liên kết có gạch chân (`.underlined`).

## Quy ước đặt tên

- Nội dung tách nhỏ theo **từng phần** của trang, mỗi phần 1 file `.md`, tên file có **số thứ tự + slug phần**.
- Ảnh lưu tại `images/senturia-info/<phần>/` và đặt tên dạng `<phần>_<tên-gốc>.<ext>` để biết ngay ảnh dùng cho phần nào.

## Bảng ánh xạ ảnh

| Phần | Thư mục ảnh | Ảnh |
|------|-------------|-----|
| Header / Logo | `images/senturia-info/header-logo/` | `header-logo_dark_logo.png` |
| Hero | `images/senturia-info/hero/` | `hero_architecture.jpg` |
| Thiên nhiên | `images/senturia-info/thien-nhien/` | `thien-nhien_about.jpg` |
| Sản phẩm | `images/senturia-info/san-pham/` | `san-pham_arena1.jpg`, `san-pham_arena2.jpg`, `san-pham_arena3.jpg` |
| Mặt bằng | `images/senturia-info/mat-bang/` | `mat-bang_arena.jpg`, `mat-bang_TH1..TH4.jpg`, `mat-bang_SH1..SH3.jpg`, `mat-bang_SD1.jpg` |
| Tiện ích | `images/senturia-info/tien-ich/` | `tien-ich_bf-1..bf-12`, `tien-ich_phonggym.jpg`, `tien-ich_sandanang.jpg` |
| Vị trí | `images/senturia-info/vi-tri/` | `vi-tri_map_water.svg`, `vi-tri_map_road.svg`, `vi-tri_map_text.svg`, `vi-tri_map_icons.svg` |
| Tiến độ | `images/senturia-info/tien-do/` | `tien-do_process_T6.2026_1..3.jpg` |
| Đối tác | `images/senturia-info/doi-tac/` | `doi-tac_NP.svg`, `doi-tac_TP.svg`, `doi-tac_FD.svg`, `doi-tac_OO.svg`, `doi-tac_SV.svg`, `doi-tac_pca.jpg` |
| Favicon | `images/senturia-info/favicon/` | `favicon_favicon.svg` |
