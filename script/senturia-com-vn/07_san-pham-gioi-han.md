# 07 — Sản phẩm giới hạn

- **`id`:** `s-arena` · **`data-s`:** `san-pham` · **class:** `.section.section--arena`
- **Vai trò:** giới thiệu 3 dòng sản phẩm; mỗi thẻ có mô tả (hover) + nút mở gallery ảnh.

## Bố cục

- `.arena__header`: tiêu đề (H2) + phụ đề (H3) + 1 đoạn mô tả chung.
- `.arena__grid#arena-grid`: 3 thẻ `.arena__card` (`data-id`), mỗi thẻ:
  - `h4.subtitle` tên sản phẩm
  - ảnh cover + `.arena__card-hover` chứa mô tả + `button.arena__btn-view-gallery` (`Xem hình ảnh sản phẩm`)

## Nội dung (verbatim)

- **Tiêu đề (H2):** `SẢN PHẨM GIỚI HẠN`
- **Phụ đề (H3):** `Giá trị vượt thời gian`
- **Đoạn mô tả chung:**
  > Ba dòng sản phẩm ở Senturia An Phú được kiến tạo theo nhu cầu sở hữu & phong cách sống khác nhau, nhưng cùng hội tụ trong một hệ giá trị chung: Gia sản truyền đời & không ngừng gia tăng giá trị theo thời gian.

### Danh sách 3 thẻ sản phẩm

**1. Biệt thự song lập** — `data-id="BIỆT THỰ SONG LẬP"` — cover `arena1.jpg`
> Senturia An Phú dành những vị trí đẹp nhất để phát triển giới hạn 62 căn biệt thự song lập với diện tích lớn, không gian sống rộng rãi và sang trọng như biệt thự nghỉ dưỡng. Mỗi căn biệt thự đều sở hữu hai khu vườn trước và sau nhà, gia chủ hoàn toàn tự do sáng tạo và bài trí sắp đặt tiểu cảnh theo sở thích.

**2. Nhà phố vườn** — `data-id="NHÀ PHỐ VƯỜN"` — cover `arena2.jpg`
> Thừa hưởng tinh hoa của thiết kế “vườn trong nhà phố” đang trở thành xu hướng tất yếu của đô thị hiện đại. Mỗi căn đều sở hữu mặt tiền đường nội khu và khoảng sân vườn trước & sau nhà, cận kề các tiện ích. Đặc biệt, các căn nhà không đối lưng nhau, mà được ngăn cách bằng lối đi chung rợp bóng cỏ cây xanh mát.

**3. Nhà phố thương mại** — `data-id="NHÀ PHỐ THƯƠNG MẠI"` — cover `arena3.jpg`
> Nhà phố thương mại sở hữu vị trí mặt tiền chiến lược ngay trung tâm An Phú, kết nối trực tiếp với trục đường Song Hành cao tốc và các tuyến giao thông huyết mạch khu Đông, giúp tiếp cận cư dân và lưu lượng khách hàng lớn trong khu vực, hứa hẹn là điểm đến của các thương hiệu lớn, F&B, ngân hàng, showroom...

## Gallery ảnh từng sản phẩm (mở qua popup `#popuparena`)

### Biệt thự song lập

| Ảnh | Tiêu đề |
|-----|---------|
| `arena1-1.jpg` | Biệt thự song lập |
| `arena1-2.png` | SÂN VƯỜN TRƯỚC & SAU NHÀ |
| `arena1-3.png` | TIỀN SẢNH |
| `arena1-3.jpg` | PHÒNG KHÁCH SANG TRỌNG & PHÓNG KHOÁNG |
| `arena1-4.png` | Phòng ăn & bếp ấm cúng |
| `arena1-5.jpg` | Phòng LÀM VIỆC THƯ THÁI |
| `arena1-6.jpg` | PHÒNG NGỦ HIỆN ĐẠI & TIỆN NGHI |
| `arena1-7.jpg` | PHÒNG HỌC / ĐỌC SÁCH YÊN TĨNH & THOÁNG ĐẠT |

### Nhà phố vườn

| Ảnh | Tiêu đề |
|-----|---------|
| `arena2-0.jpg` | Nhà phố vườn |
| `arena2-1.jpg` | PHÒNG KHÁCH TRẺ TRUNG & NHẸ NHÀNG |
| `arena2-2.jpg` | PHÒNG NGỦ ẤM ÁP & TỐI GIẢN |
| `arena2-3.png` | Sảnh ĐÓN |

### Nhà phố thương mại

| Ảnh | Tiêu đề |
|-----|---------|
| `arena3-0.jpg` | Nhà phố thương mại |
| `arena3-1.jpg` | Phòng khách 1 |
| `arena3-2.jpg` | Phòng khách 2 |
| `arena3-3.jpg` | Phòng khách 3 |
| `arena3-4.jpg` | Phòng khách 4 |

## Ảnh

- Cover: `images/senturia-com-vn/san-pham/san-pham_arena1.jpg`, `san-pham_arena2.jpg`, `san-pham_arena3.jpg`
- Gallery: `images/senturia-com-vn/san-pham/san-pham_arena1-1..7`, `san-pham_arena2-0..3`, `san-pham_arena3-0..4`

## Ghi chú

- Toàn bộ dữ liệu 3 sản phẩm + gallery nằm trong bundle JS (`m0` array), popup `#popuparena` được JS inject ảnh theo từng sản phẩm.
