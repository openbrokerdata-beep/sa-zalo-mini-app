# 03 — Hero: Câu chuyện thương hiệu

- **`id`:** `s-hero` · **`data-s`:** `cau-chuyen-thuong-hieu` · **class:** `.section.section--hero`
- **Vai trò:** khối giới thiệu cảm hứng sống "Home Resort" — nền video toàn màn hình + tiêu đề lớn + 2 đoạn mô tả.

## Bố cục

- `.new-hero-split` > `.hero-bottom`: nền chuyển động
  - mobile: ảnh `hero-ldp-mb.jpg` (`.hero-bg-mobile`)
  - desktop: `<video id="hero-video" autoplay loop muted playsinline>` nguồn `kety.mp4` (`.hero-bg-desktop`)
- `.new-hero-top`:
  - `.new-hero-left`: tiêu đề + phụ đề (hiệu ứng tách ký tự `split-text`).
  - `.new-hero-right.content`: 2 đoạn văn bản (`clip-reveal`).
- `.hero__scroll-indicator`: chữ `CUỘN XUỐNG` + đường gạch động.

## Nội dung (verbatim)

- **Tiêu đề (H2):** `HOME RESORT`
- **Phụ đề:** `Sống như nghỉ dưỡng mỗi ngày`
- **Đoạn 1:**
  > Giữa phố thị, bạn tìm thấy một miền xanh để hít thở, một mái ấm để trở về, một chốn an yên để sống trọn từng khoảnh khắc cùng người thân.
- **Đoạn 2:**
  > Với mật độ xây dựng lý tưởng và những mảng xanh rộng mở, mỗi ngôi nhà ở Senturia An Phú được kiến tạo như một tác phẩm phiên bản giới hạn, mang đến trải nghiệm sống cân bằng thân - tâm - trí để mỗi ngày trôi qua đều là một kỳ nghỉ đầy thư thái.
- **Chỉ dẫn cuộn:** `CUỘN XUỐNG`

## Media

- `images/senturia-com-vn/hero/hero_kety.mp4` (video nền)
- `images/senturia-com-vn/hero/hero_hero-ldp-mb.jpg` (ảnh nền mobile)

## Ghi chú

- Tiêu đề/phụ đề dùng SplitType + GSAP; nội dung bên phải hiện dần bằng `clip-reveal`.
