# 15 — Popup, overlay menu & floating social

File này gom các thành phần "nổi" (overlay/popup/floating) không thuộc luồng bố cục chính.

## 1. Popup đăng ký tư vấn — `#popupRegister`

- **Class:** `.popup-register`
- Nền: `pop-up.jpg` (mobile: `pop_up_mb.jpg`).
- Nút đóng: `#popupRegisterClose`; bấm nền `.popup-register__overlay#popupRegisterCloseOverlay` để đóng.
- `.popup-register__form-wrapper`:
  - Tiêu đề (H3): `Đăng Ký Tư Vấn`
  - Form `.popup-register__form` (gửi vào iframe ẩn `hidden_iframe`):
    - `input[name="fullname"]` — placeholder `Họ tên`
    - `input[name="phone"]` — placeholder `Số điện thoại (10-11 số)` (chỉ nhập số, `maxlength="11"`)
    - `input[name="email"]` — placeholder `Email`
    - `textarea[name="note"]` — placeholder `Lời nhắn`
    - `button[type="submit"]` — `GỬI THÔNG TIN`
  - `.popup-register__disclaimer`: `*Bằng cách nhấn "Gửi thông tin", bạn đồng ý với Điều khoản và Điều kiện của chúng tôi.`
  - `.popup-register__hotline`: `Hotline: 1800 6627`
- Có khối tiêu đề trái `Gia Sản Độc Bản / Giá Trị Vượt Thời Gian` (đã bị comment trong source).

**Ảnh:** `images/senturia-com-vn/popup/popup_pop-up.jpg`, `popup_pop_up_mb.jpg`

## 2. Overlay menu — `#overlayMenu`

Xem chi tiết tại `01_header-nav.md`. Nền: `overlay_menu.jpg`.

**Ảnh:** `images/senturia-com-vn/popup/popup_overlay_menu.jpg`

## 3. Popup gallery sản phẩm — `#popuparena`

- **Class:** `.popuparena`
- Nút đóng: `#closeBtnPopup`.
- Tiêu đề (H3) `#popuparenaTitle` (mặc định: `BIỆT THỰ SONG LẬP`, đổi theo sản phẩm được chọn).
- Slider: Swiper `#arena-swiper` (`#arena-swiper-wrapper`) — ảnh inject bằng JS theo gallery của sản phẩm; điều hướng `#arena-prev` / `#arena-next` + pagination.

## 4. Popup mặt bằng căn — `#arenaDetailPopup`

- **Class:** `.arena-detail-popup`
- Nút đóng: `#arenaDetailPopupClose` (`×`).
- Ảnh: `#arenaDetailPopupImg` + zoom `#arenaBtnZoomIn` (`+`) / `#arenaBtnZoomOut` (`-`).
- Thông số:
  - `Số lượng:` → `#arenaDetailPopupNumber`
  - `Diện tích:` → `#arenaDetailPopupArea`
  - `Số tầng:` → `#arenaDetailPopupFloors`
- Ghi chú: `*Đây là diện tích tham khảo, vui lòng liên hệ hotline để biết thêm thông tin chi tiết`

> (Cặp label "Diện tích đất: Rộng [a x b]m (*)" và tiêu đề popup bị comment, không hiển thị.)

## 5. Floating social — `.floating-social`

Cố định bên phải màn hình, 4 nút liên kết (mở tab mới):

| # | `href` | Icon |
|---|--------|------|
| 1 | `tham-quan-du-an/` | icon 360°/tour |
| 2 | `https://www.facebook.com/senturia.com.vn` | Facebook |
| 3 | `https://zalo.me/621630041439256054` | Zalo |
| 4 | `https://www.youtube.com/@SenturiaByTienPhuoc` | YouTube |

## Ghi chú

- Các popup đều đóng được bằng nút X và (với popup đăng ký) bằng overlay.
- Popup đăng ký tự mở theo logic JS (ví dụ sau một số hành vi cuộn/CTA); nút `Đăng ký nhận tin` (header + overlay menu) kích hoạt popup này.
