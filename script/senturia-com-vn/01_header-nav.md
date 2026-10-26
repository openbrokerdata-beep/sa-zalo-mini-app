# 01 — Header & điều hướng

- **Phần tử:** `header.site-header#siteHeader` + `div.overlay-menu#overlayMenu`
- **Vai trò:** thanh điều hướng cố định trên cùng + menu overlay toàn màn hình (mở bằng nút hamburger).

## Header

- `.header__left`: nút menu hamburger
  - `button#menuToggle` (`aria-label="Menu"`) — gồm icon `.hamburger` và chữ `Menu`.
- `.header__center`: logo liên kết về `./`
  - `picture`: mobile dùng `assets/logo_mb.svg`, desktop dùng `assets/logo.svg` (ảnh `alt="Senturia An Phú"`).
- `.header__right`: 2 hành động
  - `a.header__register.js-btn-register` → mở popup đăng ký · nhãn `Đăng ký nhận tin` (icon máy bay vàng `#D39538`).
  - `a.header__call` `href="tel:18006627"` · nhãn `1800 6627` (icon điện thoại vàng).

## Overlay menu (`.overlay-menu#overlayMenu`)

- Nền: ảnh `overlay_menu.jpg` (`.overlay-menu__bg-img`).
- Góc trên:
  - `button#overlayClose` — icon dấu X + chữ `Đóng`.
  - `.overlay-menu__actions`: lặp lại 2 hành động `Đăng ký nhận tin` + hotline `1800 6627` (màu trắng).
- Nav `.overlay-menu__nav` (theo thứ tự):

| Nhãn | `href` | Ghi chú |
|------|--------|---------|
| `TRANG CHỦ` | `./` | link đang active |
| `THÔNG TIN DỰ ÁN` | `thong-tin-du-an/` | có class `js-open-flipbook`, `data-title="E-Brochure Senturia An Phú"` (mở flipbook DearFlip) |
| `MẶT BẰNG TỔNG THỂ` | `mat-bang-tong-the/` | |
| `THAM QUAN DỰ ÁN` | `tham-quan-du-an/` | |
| `TIN TỨC` | `tin-tuc/` | |
| `PHÁP LÝ DỰ ÁN` | `phap-ly-du-an/` | |

- `.overlay-menu__logo`: ảnh `logo_text.svg` (`alt="Senturia An Phú"`).

## Ảnh

- `images/senturia-com-vn/header-logo/header-logo_logo.svg`
- `images/senturia-com-vn/header-logo/header-logo_logo_mb.svg`
- `images/senturia-com-vn/header-logo/header-logo_logo_text.svg`
- `images/senturia-com-vn/popup/popup_overlay_menu.jpg`

## Ghi chú

- Header đổi màu chữ theo nền section (class `--light` / `--dark`); có hiệu ứng ẩn/hiện khi cuộn (GSAP).
- Nút `Đăng ký nhận tin` và hotline cũng là 2 CTA nổi bật, tái sử dụng ở overlay menu và popup.
