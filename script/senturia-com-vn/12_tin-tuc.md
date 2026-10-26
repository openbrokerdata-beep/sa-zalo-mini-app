# 12 — Tin tức (2 tab)

- **`id`:** `s-news` · **`data-s`:** `tin-tuc` · **class:** `.section.section--news`
- **Vai trò:** khối tin tức gồm tab "Thị trường & Dự án" (slider thẻ tin) và tab "Tiến độ xây dựng" (gallery theo mốc thời gian).

## Bố cục

- `.news__bg`: nền chất liệu `silk.png`.
- `.news-tab-container` > `.news__header`: tiêu đề (H2) `TIN TỨC` + `.news-tabs-nav` (2 tab):
  - `THỊ TRƯỜNG & DỰ ÁN` → pane `#tab-news` (mặc định `active`)
  - `TIẾN ĐỘ XÂY DỰNG` → pane `#tab-process`
- **Tab 1 — Tin tức:** Swiper `#news-swiper` (`#news-wrapper`) hiển thị 6 thẻ `.news__card`, mỗi thẻ: ảnh + tiêu đề + mô tả + ngày + `Xem chi tiết`. Điều hướng `#news-prev` / `#news-next` + pagination.
- **Tab 2 — Tiến độ:** `.process__wrapper` gồm
  - cột trái: gallery `#process-gallery` (`#process-dots`), nút `#process-prev` / `#process-next`.
  - cột phải: dropdown chọn tháng (`#month-btn` / `#month-selected` / `#month-list`) + đoạn mô tả (`#process-desc`).

## Nội dung (verbatim)

- **Tiêu đề (H2):** `TIN TỨC`
- **Tab 1:** `THỊ TRƯỜNG & DỰ ÁN`
- **Tab 2:** `TIẾN ĐỘ XÂY DỰNG`

### Tab 1 — 6 thẻ tin tức

| # | Tiêu đề | Ngày | Ảnh |
|---|---------|------|-----|
| 1 | `ĐÂU LÀ TÂM ĐIỂM AN CƯ & ĐẦU TƯ “HOT” NHẤT TP.HCM NĂM 2026?` | 18/08/2026 | `tin-tuc_01_dau-la-tam-diem-an-cu-dau-tu.jpg` |
| 2 | `Thanh toán chỉ từ 30% sở hữu ngay nhà phố vườn trung tâm khu Đông TP.HCM` | 25/06/2026 | `tin-tuc_02_thanh-toan-chi-tu-30.jpg` |
| 3 | `SENTURIA AN PHÚ ĐÓN SÓNG METRO & CAO TỐC BẮC NAM` | 27/05/2026 | `tin-tuc_03_don-song-metro-cao-toc-bac-nam.jpg` |
| 4 | `VÌ SAO SENTURIA AN PHÚ HẤP DẪN GIỚI TINH HOA?` | 27/05/2026 | `tin-tuc_04-hap-dan-gioi-tinh-hoa.jpg` |
| 5 | `SENTURIA AN PHÚ – PHÁP LÝ CHUẨN CHỈNH HÀNG ĐẦU THỊ TRƯỜNG` | 27/05/2026 | `tin-tuc_05_phap-ly-chuan-chinh-hang-dau.jpg` |
| 6 | `HOME RESORT – NƠI THIÊN THIÊN TRỞ THÀNH MỘT PHẦN CỦA CUỘC SỐNG` | 26/05/2026 | `tin-tuc_06_home-resort-thien-nhien.jpg` |

Mô tả (trích đoạn excerpt) từng thẻ:

1. > Bạn có biết, hơn 70% vốn đầu tư công của toàn TP.HCM đang tập trung ở một “tọa độ vàng”.
2. > Thanh toán chỉ từ 30% sở hữu ngay nhà phố vườn trung tâm khu Đông TP.HCM Tháng 6/2026, Senturia An Phú giới thiệu 10 căn nhà phố vườn giới hạn nằm tại vị trí đẹp nhất dự án - nơi mỗi ngôi nhà đều sở hữu 2 khoảng sân vườn riêng và cận kề công viên trung tâm 1,29ha cùng loạt tiện ích nội khu đẳng cấp. Đặc biệt, Chủ đầu tư còn áp dụng loạt chính sách hỗ trợ vô...
3. > TP.HCM đang đẩy nhanh tiến độ phát triển mạng lưới đường sắt đô thị, trong đó đáng chú ý là hai tuyến metro xuyên tâm kết nối Bến Thành – Thủ Thiêm – Sân bay Long Thành. Tuyến metro Bến Thành – Thủ Thiêm đã khởi công ngày 29/04/2026 vừa qua. Theo thiết kế, tuyến metro ...
4. > Theo nghiên cứu của CBRE và Knight Frank năm 2025, 73% giới tinh hoa Việt Nam ưu tiên lựa chọn nhà ở thấp tầng. Và con số này vẫn đang tiếp tục tăng. Phân tích về xu hướng này, chuyên gia CBRE Việt Nam cho rằng nhà ở thấp tầng là phân khúc hiếm hoi có khả ...
5. > Trong bối cảnh thị trường ngày càng đề cao yếu tố pháp lý minh bạch, tiến độ thật và sản phẩm thật, Senturia An Phú khẳng định vị thế là một trong những dự án thấp tầng hiếm hoi tại trung tâm thành phố sở hữu pháp lý chuẩn chỉnh hàng đầu thị trường. Dự án ...
6. > Tọa lạc tại tâm điểm của những giao lộ chuyển động không ngừng, Senturia An Phú mở ra một miền xanh dịu dàng, nơi thiên nhiên, kiến trúc và nhịp sống thường nhật cùng giao hòa, cất lên những âm điệu du dương của bình yên và thư thái. Nơi mỗi ngày đều trở thành ...

### Tab 2 — Tiến độ xây dựng (theo mốc tháng)

**Tháng 12 - 2024**
> Khởi công đào móng và ép cọc toàn bộ khu vực dự án. Hệ tầng kỹ thuật bắt đầu được triển khai đồng bộ với hệ thống cấp thoát nước và điện ngầm.
- Ảnh: `tien-do_process1.jpg`, `tien-do_process2.jpg`, `tien-do_process3.jpg`

**Tháng 6 - 2025**
> Hoàn thành phần thô tầng trệt và tầng lửng cho các block đầu tiên. Hệ thống kết cấu thép và bê-tông cốt thép đạt tiến độ 60%.
- Ảnh: `tien-do_process4.jpg`, `tien-do_process5.jpg`, `tien-do_process6.jpg`

**Tháng 12 - 2025**
> Senturia An Phú đã hoàn thành lễ cất nóc vào ngày 29/12/2025, đánh dấu cột mốc quan trọng trong quá trình thi công dự án. Các hạng mục tiếp tục được triển khai đồng bộ.
- Ảnh: `tien-do_process6.jpg`, `tien-do_process7.jpg`, `tien-do_process8.jpg`

**Tháng 6 - 2026** (mốc đang chọn mặc định)
> Tính đến cuối tháng 6/2026, dự án đã hoàn thành hơn 90% khối lượng xây thô. Các dãy nhà phố vườn, nhà phố thương mại và biệt thự song lập đang được đẩy nhanh xây tô hoàn thiện mặt ngoài, lắp đặt hệ cửa kính và từng bước hoàn chỉnh diện mạo kiến trúc. Trong Quý 3/2026, các tuyến đường nội khu sẽ được trải nhựa và bó vỉa hè, đồng thời triển khai đồng bộ các tiện ích cảnh quan trước khi chính thức bàn giao nhà từ Quý 4/2026.
- Ảnh: `tien-do_process_T6.2026_1.jpg` … `tien-do_process_T6.2026_4.jpg`

- Danh sách dropdown tháng: `Tháng 12 - 2024`, `Tháng 6 - 2025`, `Tháng 12 - 2025`, `Tháng 6 - 2026`.

## Ảnh

- Tin tức: `images/senturia-com-vn/tin-tuc/tin-tuc_01..06_*.jpg`
- Tiến độ: `images/senturia-com-vn/tien-do/tien-do_process1..8.jpg`, `tien-do_process_T6.2026_1..4.jpg`
- Icon thẻ tin: `images/senturia-com-vn/ui/ui_calendar.svg`, `ui_arrow_right_alt_green_link.svg`
- Nút: `images/senturia-com-vn/ui/ui_arrow_left.svg`, `ui_arrow_right.svg`

## Ghi chú

- Ảnh tin tức tải từ `https://www.senturia.com.vn/senturia-an-phu/lifestyle/blog-images/<date>-<id>.jpg`.
- Link mỗi thẻ tin trỏ ra trang con `./tin-tuc/<slug>/` (ngoài phạm vi scrape).
- Dữ liệu tin + tiến độ nằm trong bundle JS (fetch API `/api/articles`, fallback dữ liệu tĩnh).
