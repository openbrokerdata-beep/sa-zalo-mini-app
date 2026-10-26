# 00 — Tổng quan cấu trúc trang

- **Nguồn scrape:** https://www.senturia.com.vn/senturia-an-phu/
- **Loại trang:** SPA (build Vite) — nội dung được JS inject vào DOM, các section gắn `data-s` + `id`; điều hướng nội bộ bằng anchor `#s-...`
- **Ngôn ngữ:** Tiếng Việt (`<html lang="vi">`)
- **Ngày scrape:** 12/10/2026
- **Tiêu đề SEO:** `Senturia An Phú | Không Gian Sống Chuẩn Home Resort`
- **Meta description:** `Dự án Senturia An Phú - Tuyệt tác nhà phố, biệt thự trung tâm Nam Rạch Chiếc, TP. Thủ Đức. Không gian sống xanh đậm phong cách Home Resort thượng lưu.`
- **Meta keywords:** `Senturia An Phú, nhà phố Senturia An Phú, biệt thự Senturia An Phú, dự án Senturia An Phú, bất động sản Thủ Đức, Tiến Phước`
- **Canonical:** `https://www.senturia.com.vn/senturia-an-phu/`
- **Open Graph:**
  - `og:title`: `Senturia An Phú | Không Gian Sống Chuẩn Home Resort`
  - `og:description`: `Mỗi ngôi nhà ở Senturia An Phú được kiến tạo như một tác phẩm phiên bản giới hạn, mang đến trải nghiệm sống cân bằng thân - tâm - trí.`
  - `og:image`: `https://www.senturia.com.vn/senturia-an-phu/assets/thumbnail.jpg`

## Thứ tự bố cục (layout flow)

| # | Section | `id` / `data-s` | File nội dung |
|---|---------|-----------------|----------------|
| 1 | Header + điều hướng | `.site-header#siteHeader` | `01_header-nav.md` |
| 2 | Banner (slider 5 ảnh) | `#s-banner` · `data-s="banner"` | `02_banner.md` |
| 3 | Câu chuyện thương hiệu (Hero) | `#s-hero` · `data-s="cau-chuyen-thuong-hieu"` | `03_hero-cau-chuyen-thuong-hieu.md` |
| 4 | Thiên nhiên trước thềm nhà | `#s-about` · `data-s="thien-nhien"` | `04_thien-nhien.md` |
| 5 | Quy hoạch — Gia sản độc bản | `#s-legacy` · `data-s="quy-hoach"` | `05_quy-hoach-gia-san-doc-ban.md` |
| 6 | Thiết kế — Kiến trúc duy mỹ | `#s-design` · `data-s="thiet-ke"` | `06_thiet-ke-kien-truc-du-my.md` |
| 7 | Sản phẩm giới hạn | `#s-arena` · `data-s="san-pham"` | `07_san-pham-gioi-han.md` |
| 8 | Mặt bằng (tab) | `#s-arena_detail` · `data-s="mat-bang"` | `08_mat-bang.md` |
| 9 | Hệ tiện ích (slider 12 mục) | `#s-bfs` · `data-s="tien-ich"` | `09_tien-ich.md` |
| 10 | Hình ảnh dự án (KV) | `#s-kv` · `data-s="hinh-anh-du-an"` | `10_hinh-anh-du-an-kv.md` |
| 11 | Vị trí — Sôi động kết nối | `#s-location` · `data-s="vi-tri"` | `11_vi-tri.md` |
| 12 | Tin tức (2 tab) | `#s-news` · `data-s="tin-tuc"` | `12_tin-tuc.md` |
| 13 | Về chúng tôi / Đối tác | `#s-company` · `data-s="ve-chung-toi"` | `13_ve-chung-toi-doi-tac.md` |
| 14 | Footer + liên hệ | `#s-footer` · `data-s="lien-he"` | `14_footer-lien-he.md` |
| 15 | Popup, overlay menu, floating social | `#popupRegister`, `#popuparena`, `#arenaDetailPopup`, `.floating-social` | `15_popup-va-floating-social.md` |

## Design tokens (ghi nhận từ CSS/source)

- **Màu nhấn (accent):** vàng đồng `#D39538` (icon header, ripple bản đồ, viền nhấn).
- **Xanh thương hiệu (nút/form):** thẫm `#0B4C3A` / `#2a4f40`.
- **Font:**
  - Tiêu đề: `Playfair Display` (serif, có italic 400)
  - Nội dung: `Inter` (300/400/500/600/700)
  - `Roboto` được nạp kèm (dùng cho một số thành phần phụ)
- **Phong cách:** nền tối/sang (ảnh phối cảnh full-bleed) xen kẽ nền sáng; tiêu đề chữ in hoa cách chữ (letter-spacing), hiệu ứng `split-text` (tách từng ký tự) + `fade-up`/`clip-reveal` khi cuộn; slider dùng Swiper.

## Quy ước đặt tên

- Nội dung tách nhỏ theo **từng phần**, mỗi phần 1 file `.md`, tên file có **số thứ tự + slug phần**.
- Ảnh lưu tại `images/senturia-com-vn/<phần>/` và đặt tên dạng `<phần>_<tên-gốc>.<ext>`.

## Bảng ánh xạ ảnh

| Phần | Thư mục ảnh | Ảnh |
|------|-------------|-----|
| Header / Logo | `images/senturia-com-vn/header-logo/` | `header-logo_logo.svg`, `header-logo_logo_mb.svg`, `header-logo_logo_text.svg`, `header-logo_dark_logo.png` |
| Banner | `images/senturia-com-vn/banner/` | `banner_banner1..5.jpg`, `banner_banner1..5-mb.jpg` |
| Hero (video) | `images/senturia-com-vn/hero/` | `hero_kety.mp4`, `hero_hero-ldp-mb.jpg` |
| Thiên nhiên | `images/senturia-com-vn/thien-nhien/` | `thien-nhien_about.jpg`, `thien-nhien_about-ldp-mb.jpg` |
| Quy hoạch | `images/senturia-com-vn/quy-hoach/` | `quy-hoach_legacy_1..3.svg`, `quy-hoach_silk.png` |
| Thiết kế | `images/senturia-com-vn/thiet-ke/` | `thiet-ke_architecture.jpg`, `thiet-ke_design-ldp-mb.jpg` |
| Sản phẩm | `images/senturia-com-vn/san-pham/` | `san-pham_arena1.jpg`, `san-pham_arena1-1..7.(jpg/png)`, `san-pham_arena2.jpg`, `san-pham_arena2-0..3.(jpg/png)`, `san-pham_arena3.jpg`, `san-pham_arena3-0..4.jpg` |
| Mặt bằng | `images/senturia-com-vn/mat-bang/` | `mat-bang_arena.jpg`, `mat-bang_arena_detail.jpg`, `mat-bang_TH1..TH4.jpg`, `mat-bang_SH1..SH3.jpg`, `mat-bang_SD1.jpg` |
| Tiện ích | `images/senturia-com-vn/tien-ich/` | `tien-ich_bf-1..3,5,6,8..12.jpg`, `tien-ich_phonggym.jpg`, `tien-ich_sandanang.jpg` |
| Hình ảnh dự án | `images/senturia-com-vn/hinh-anh-du-an/` | `hinh-anh-du-an_kv.jpg`, `hinh-anh-du-an_kv-mb.jpg` |
| Vị trí | `images/senturia-com-vn/vi-tri/` | `vi-tri_map_water.svg`, `vi-tri_map_road.svg`, `vi-tri_map_text.svg`, `vi-tri_map_icons.svg`, `vi-tri_market.svg`, `vi-tri_plane_o.svg`, `vi-tri_beach.svg` |
| Tiến độ | `images/senturia-com-vn/tien-do/` | `tien-do_process1..8.jpg`, `tien-do_process_T6.2026_1..4.jpg` |
| Tin tức | `images/senturia-com-vn/tin-tuc/` | `tin-tuc_01..06_*.jpg` |
| Về chúng tôi | `images/senturia-com-vn/ve-chung-toi/` | `ve-chung-toi_NP.svg`, `ve-chung-toi_TP.svg`, `ve-chung-toi_FD.svg`, `ve-chung-toi_OO.svg`, `ve-chung-toi_SV.svg` |
| Footer | `images/senturia-com-vn/footer/` | `footer_logo_footer.svg`, `footer_silk.png` |
| Popup / Overlay | `images/senturia-com-vn/popup/` | `popup_pop-up.jpg`, `popup_pop_up_mb.jpg`, `popup_overlay_menu.jpg` |
| UI chung | `images/senturia-com-vn/ui/` | `ui_arrow_left.svg`, `ui_arrow_right.svg`, `ui_arrow_left_alt_green.svg`, `ui_arrow_right_alt_green.svg`, `ui_calendar.svg`, `ui_arrow_right_alt_green_link.svg`, `ui_lua.mp4`, `ui_thumbnail.jpg` |

## Ghi chú

- Nền dùng chung `silk.png` (chất liệu lụa) cho nhiều section: `#s-legacy`, `#s-arena_detail`, `#s-news`, `#s-footer`.
- Một số ảnh trùng tên với site A (`senturia.info`) nhưng host khác: `dark_logo.png`, `architecture.jpg`, `about.jpg`, `arena1/2/3.jpg`, `arena.jpg`, `TH1-4.jpg`, `SH1-3.jpg`, `SD1.jpg`, `bf-*`, `phonggym.jpg`, `sandanang.jpg`, `NP/TP/FD/OO/SV.svg`, `map_*.svg`.
- Trang dùng các thư viện: GSAP + ScrollTrigger, SplitType, Swiper 11, DearFlip (flipbook cho E-Brochure), jQuery.
- Hotline xuyên suốt: `1800 6627` · Email: `marketing@tienphuoc.com`.
