# Senturia An Phú — Tài liệu thông tin thống nhất

> **Hợp nhất nội dung 2 website cùng nói về dự án Senturia An Phú:**
> - **Nguồn A** — https://senturia.info/ (HTML tĩnh, 1 trang)
> - **Nguồn B** — https://www.senturia.com.vn/senturia-an-phu/ (SPA Vite, **trang chính thức** của chủ đầu tư)
> - **Ngày scrape:** 12/10/2026
> - **Nguyên tắc hợp nhất:** Nguồn B (trang chính thức) là **bản chuẩn**; nguồn A bổ sung / đối chiếu. Nội dung giữ **verbatim** tiếng Việt. Phần trùng được gộp lại **một lần**, phần khác biệt được nêu rõ. Ảnh: **152 file media / 112 ảnh phân biệt** — trong đó **39 nhóm ảnh trùng giữa A và B** (byte-identical) + 1 nhóm trùng nội bộ B. Không di chuyển/xóa file ảnh, chỉ hợp nhất dữ liệu.

**TL;DR:** Hai trang mô tả **cùng một dự án** với mức độ trùng lặp rất cao (hero, thiên nhiên, sản phẩm, mặt bằng, tiện ích, vị trí, đối tác, tiến độ…). Khác biệt chính: **hotline, email, kênh social** và **màu nhận diện**; nguồn B có thêm nhiều phần (banner, quy hoạch, thiết kế, gallery sản phẩm, KV, tin tức, popup/luồng tương tác).

---

## 0. Danh tính dự án (hợp nhất)

| Trường | Giá trị thống nhất | Nguồn |
|---|---|---|
| Tên dự án | **Senturia An Phú** | A, B |
| Tên pháp lý | Khu nhà ở thấp tầng OTM4 – thuộc KDC Nguyên Phương | A |
| Chủ đầu tư | **Công ty TNHH Bất động sản Nguyên Phương** | A, B |
| Nhà phát triển | Công ty CP BĐS Tiến Phước — gần **35 năm** kinh nghiệm ngành BĐS | B |
| Mã số thuế (CĐT) | **0314377920** — cấp lần đầu 27/04/2017, Sở tài chính TP. Hồ Chí Minh | A (MST), B (MST + ngày + nơi cấp) |
| Địa chỉ dự án | Khu đô thị Nam Rạch Chiếc, đường Song Hành, Cao tốc TP. HCM – Long Thành – Dầu Giây, Phường Bình Trưng, TP. Hồ Chí Minh | A, B |
| Quy mô | **8,6 ha** · **355 sản phẩm** thấp tầng · **sở hữu lâu dài** | A, B |
| Công viên trung tâm | **1,29 ha** (lấy cảm hứng Central Park, New York) | A, B |
| Dòng sản phẩm | **3**: Biệt thự song lập · Nhà phố vườn · Nhà phố thương mại | A, B |
| Hotline | **1800 6627** (B) · **0325 89 89 89** (A) | A, B |
| Email | **marketing@tienphuoc.com** (B) · **info@openbroker.vn** (A) | A, B |
| Facebook | facebook.com/senturia.com.vn (B) · facebook.com/bietthusenturiaanphu (A) | A, B |
| YouTube | @SenturiaByTienPhuoc (B) · @SenturiaInfo (A) | A, B |
| Zalo / Tour 360 | zalo.me/621630041439256054 · tham quan dự án 360° (B) | B |
| Toạ độ Google Maps | 10.7945727, 106.7679024 | A |

### SEO & nhận diện

| Hạng mục | Nguồn A | Nguồn B |
|---|---|---|
| Title | `Senturia An Phú \| Home Resort giữa lòng khu Đông` | `Senturia An Phú \| Không Gian Sống Chuẩn Home Resort` |
| Meta description | Khám phá Senturia An Phú: khu nhà ở thấp tầng 8,6 ha, 355 sản phẩm tại Nam Rạch Chiếc, TP.HCM. Tư vấn: 0325 89 89 89. | Dự án Senturia An Phú - Tuyệt tác nhà phố, biệt thự trung tâm Nam Rạch Chiếc, TP. Thủ Đức. Không gian sống xanh đậm phong cách Home Resort thượng lưu. |
| Meta keywords | — | Senturia An Phú, nhà phố Senturia An Phú, biệt thự Senturia An Phú, dự án Senturia An Phú, bất động sản Thủ Đức, Tiến Phước |
| Open Graph image | — | `assets/thumbnail.jpg` |
| Màu nhận diện | Xanh đậm `#123f36`; nền kem/ngà | Vàng đồng `#D39538`; xanh `#0B4C3A` / `#2a4f40` |
| Font | Playfair Display + Be Vietnam Pro | Playfair Display + Inter + Roboto |

---

## 1. Đối chiếu cấu trúc 2 trang

| # | Chủ đề | Nguồn A (`senturia.info`) | Nguồn B (`senturia.com.vn/senturia-an-phu`) | Quan hệ |
|---|--------|---------------------------|--------------------------------------------|---------|
| 1 | Header & điều hướng | `.header` — menu anchor nội trang | `.site-header` + overlay menu toàn màn hình | Trùng chức năng, khác danh mục |
| 2 | Banner | — | `#s-banner` — slider 5 ảnh | **Chỉ B** |
| 3 | Hero / Định vị | `#trang-chu` — ảnh tĩnh | `#s-hero` — video nền | Trùng thông điệp, khác media |
| 4 | Tổng quan | `#tong-quan` + 4 chỉ số | (gộp trong "Về chúng tôi") | **Chủ yếu A** |
| 5 | Thiên nhiên trước thềm nhà | `.nature` | `#s-about` | **Trùng nội dung** |
| 6 | Quy hoạch — Gia sản độc bản | — | `#s-legacy` | **Chỉ B** |
| 7 | Thiết kế — Kiến trúc duy mỹ | — | `#s-design` | **Chỉ B** |
| 8 | Sản phẩm | `#san-pham` — 3 card | `#s-arena` — 3 card + gallery | Trùng, B đầy đủ hơn |
| 9 | Mặt bằng | `#mat-bang` — 2 tab | `#s-arena_detail` — 2 tab + bản đồ tương tác + số liệu | Trùng, B đầy đủ hơn |
| 10 | Tiện ích (12) | `#tien-ich` — slider 12 | `#s-bfs` — slider 12 | **Trùng** (khác thứ tự/gán nhãn) |
| 11 | Hình ảnh dự án (KV) | — | `#s-kv` | **Chỉ B** |
| 12 | Vị trí kết nối | `#vi-tri` — 4 lớp SVG | `#s-location` — 4 lớp SVG + 3 mốc khoảng cách | Trùng, B thêm mốc |
| 13 | Tiến độ & hình ảnh | `#tien-do` — 1 mốc (T6.2026) | `#s-news` (tab Tiến độ) — 4 mốc | Trùng, B đầy đủ hơn |
| 14 | Pháp lý | `#phap-ly` — 7 mục accordion | `phap-ly-du-an/` (trang con, ngoài phạm vi) | **Chủ yếu A** |
| 15 | Tin tức | — | `#s-news` (tab Tin tức) — 6 bài | **Chỉ B** |
| 16 | Đối tác | `.partners` — 6 đối tác | `#s-company` — 5 logo + giới thiệu | Trùng (B thiếu PCA) |
| 17 | Về chúng tôi | — | `#s-company` (giới thiệu CĐT) | **Chỉ B** |
| 18 | Liên hệ / Form | `#lien-he` — form mailto | Footer + popup đăng ký | Khác hình thức |
| 19 | Footer | `<footer>` | `#s-footer` | Trùng chức năng |
| 20 | Popup / Floating | `.floating-contact` + dialog ảnh | popup đăng ký / gallery / mặt bằng + floating social | Khác chi tiết |

---

## 2. Nội dung hợp nhất theo chủ đề

### 2.1 Hero / Định vị thương hiệu

**Thông điệp chung (giống nhau):** Ý tưởng chủ đạo **"HOME RESORT"** — *Sống như nghỉ dưỡng mỗi ngày*.

**Nguồn A** (`.hero #trang-chu`):
- Eyebrow: `SENTURIA AN PHÚ · HOME RESORT`
- H1: `Sống như nghỉ dưỡng` — *`mỗi ngày.`* (phần sau in nghiêng)
- Mô tả: `Không gian sống xanh, kiến trúc đương đại và những khu vườn riêng giữa lòng khu Đông.`
- CTA: `Khám phá dự án` (#tong-quan) · `Đăng ký tư vấn` (#lien-he)
- Hero foot: `NAM RẠCH CHIẾC · TP. HỒ CHÍ MINH` · `01 / HOME RESORT`

**Nguồn B** (`#s-hero` — video nền `kety.mp4`):
- H2: `HOME RESORT` · Phụ đề: `Sống như nghỉ dưỡng mỗi ngày`
- Đoạn 1: *Giữa phố thị, bạn tìm thấy một miền xanh để hít thở, một mái ấm để trở về, một chốn an yên để sống trọn từng khoảnh khắc cùng người thân.*
- Đoạn 2: *Với mật độ xây dựng lý tưởng và những mảng xanh rộng mở, mỗi ngôi nhà ở Senturia An Phú được kiến tạo như một tác phẩm phiên bản giới hạn, mang đến trải nghiệm sống cân bằng thân - tâm - trí để mỗi ngày trôi qua đều là một kỳ nghỉ đầy thư thái.*
- Chỉ dẫn cuộn: `CUỘN XUỐNG`

### 2.2 Tổng quan dự án

**Nguồn A** (`#tong-quan` — phần này chỉ có ở A):
- Eyebrow: `01 / TỔNG QUAN`
- H2: `Một miền xanh.` — *`Một chốn trở về.`*
- Lead: `Senturia An Phú là khu nhà ở thấp tầng tại khu đô thị Nam Rạch Chiếc, phường Bình Trưng, TP. Hồ Chí Minh.`
- Mô tả: `Dự án có quy mô 8,6 ha với 355 sản phẩm sở hữu lâu dài theo công bố của chủ đầu tư: nhà phố liên kế, nhà phố thương mại và biệt thự song lập. Thiết kế kết hợp kiến trúc đương đại, sân vườn trước và sau nhà, cùng cảnh quan cây xanh và mặt nước.`

**4 chỉ số (facts):**

| Số | Nhãn |
|----|------|
| 8,6 ha | Quy mô dự án |
| 355 | Sản phẩm thấp tầng |
| 1,29 ha | Công viên trung tâm |
| 3 | Dòng sản phẩm |

### 2.3 Thiên nhiên trước thềm nhà

**Trùng nội dung ở cả A (`.nature`) và B (`#s-about`):**
- H2: `THIÊN NHIÊN TRƯỚC THỀM NHÀ`
- Phụ đề: `Riêng tư trọn vẹn – An nhiên tròn đầy` (A viết dạng câu: `Riêng tư trọn vẹn.` — *`An nhiên tròn đầy.`*)
- **A — mô tả ngắn:** `Công viên trung tâm 1,29 ha lấy cảm hứng từ Central Park, New York. Những lối dạo, mảng xanh và hồ cảnh quan kết nối không gian chung với các khu vườn riêng.`
- **B — mô tả dài (đầy đủ hơn):** *Phần lớn quy hoạch toàn dự án được dành cho cây xanh, mặt nước và cảnh quan, kiến tạo nên một không gian sống mang đậm chất nghỉ dưỡng như resort ngay giữa lòng đô thị: Công viên trung tâm rộng đến 1,29ha lấy cảm hứng từ Central Park (New York), hai khu vườn trước & sau nhà luôn tươi mát quanh năm, hương hoa cỏ cây chạy dọc theo lối đi chung… mở ra những khoảng xanh vô cùng khoáng đạt và riêng tư.*
- Ảnh chung: `about.jpg` (mobile B: `about-ldp-mb.jpg`).

### 2.4 Quy hoạch — Gia sản độc bản *(chỉ có ở B, `#s-legacy`)*

- H2: `GIA SẢN ĐỘC BẢN` · H3: `Giữa giao lộ thịnh vượng`
- Đoạn 1: *Giá trị của một bất động sản được quyết định bởi hai yếu tố không thể nhân bản: Vị trí và sự khan hiếm.*
- Đoạn 2: *Senturia An Phú tọa lạc tại tâm điểm khu Đông TP.HCM - nơi các công trình hạ tầng trọng điểm và dòng chảy kinh tế cùng hội tụ, định hình một lõi trung tâm mới. Trong bối cảnh quỹ đất thấp tầng ngày càng thu hẹp, một dự án vừa sở hữu vị trí chiến lược, vừa giữ được mật độ xây dựng thấp và không gian sống riêng tư trở thành một tài sản phiên bản hữu hạn.*
- 3 feature liên kết: `KIẾN TRÚC ĐƯƠNG ĐẠI` (→ #s-design) · `SẢN PHẨM GIỚI HẠN` (→ #s-arena) · `TIỆN ÍCH XỨNG TẦM` (→ #s-bfs)

### 2.5 Thiết kế — Kiến trúc duy mỹ *(chỉ có ở B, `#s-design`)*

- H2: `KIẾN TRÚC DUY MỸ` · H3: `Nâng tầm dấu ấn cá nhân`
- Mô tả: *Vượt ra khỏi những khuôn mẫu quen thuộc, Senturia An Phú lựa chọn ngôn ngữ kiến trúc đương đại đề cao sự kết nối với thiên nhiên, đặc biệt là 2 khu vườn trước & sau nhà xanh mát hiếm có giữa trung tâm thành phố. Mỗi tầng của ngôi nhà như những khối hình học vuông vức được sắp đặt đầy tính sáng tạo, kết hợp cùng hệ kính lớn, mở rộng tầm nhìn và đưa ánh sáng tự nhiên vào ngôi nhà.*
- Ảnh: `architecture.jpg` — **trùng với ảnh hero của nguồn A**.

### 2.6 Sản phẩm (3 dòng)

**Tiêu đề/khung (A):** Eyebrow `02 / SẢN PHẨM` · H2 `Không gian sống` — *`mang dấu ấn riêng.`* · Mô tả phải: `Ba dòng sản phẩm. Một phong cách sống gần gũi thiên nhiên.`

**Tiêu đề/khung (B):** H2 `SẢN PHẨM GIỚI HẠN` · H3 `Giá trị vượt thời gian` · Mô tả: *Ba dòng sản phẩm ở Senturia An Phú được kiến tạo theo nhu cầu sở hữu & phong cách sống khác nhau, nhưng cùng hội tụ trong một hệ giá trị chung: Gia sản truyền đời & không ngừng gia tăng giá trị theo thời gian.*

**3 dòng sản phẩm (hợp nhất):**

| # | Dòng sản phẩm | Mô tả (B – đầy đủ) | Ảnh cover |
|---|---------------|--------------------|-----------|
| 1 | **Biệt thự song lập** (A: `01 / BIỆT THỰ`) | Senturia An Phú dành những vị trí đẹp nhất để phát triển giới hạn **62 căn** biệt thự song lập với diện tích lớn, không gian sống rộng rãi và sang trọng như biệt thự nghỉ dưỡng. Mỗi căn biệt thự đều sở hữu hai khu vườn trước và sau nhà, gia chủ hoàn toàn tự do sáng tạo và bài trí sắp đặt tiểu cảnh theo sở thích. | `arena1.jpg` |
| 2 | **Nhà phố vườn** (A: `02 / NHÀ PHỐ LIÊN KẾ`) | Thừa hưởng tinh hoa của thiết kế “vườn trong nhà phố” đang trở thành xu hướng tất yếu của đô thị hiện đại. Mỗi căn đều sở hữu mặt tiền đường nội khu và khoảng sân vườn trước & sau nhà, cận kề các tiện ích. Đặc biệt, các căn nhà không đối lưng nhau, mà được ngăn cách bằng lối đi chung rợp bóng cỏ cây xanh mát. | `arena2.jpg` |
| 3 | **Nhà phố thương mại** (A: `03 / NHÀ PHỐ THƯƠNG MẠI`) | Nhà phố thương mại sở hữu vị trí mặt tiền chiến lược ngay trung tâm An Phú, kết nối trực tiếp với trục đường Song Hành cao tốc và các tuyến giao thông huyết mạch khu Đông, giúp tiếp cận cư dân và lưu lượng khách hàng lớn trong khu vực, hứa hẹn là điểm đến của các thương hiệu lớn, F&B, ngân hàng, showroom... | `arena3.jpg` |

> Nguồn A có mô tả ngắn hơn cho từng dòng (không kèm số căn). Nguồn B bổ sung **số lượng căn** (biệt thự 62 căn) và **gallery nội thất** cho từng dòng.

**Gallery ảnh từng sản phẩm (chỉ có ở B, mở qua popup):**

- **Biệt thự song lập:** `arena1-1.jpg` (Biệt thự song lập) · `arena1-2.png` (SÂN VƯỜN TRƯỚC & SAU NHÀ) · `arena1-3.png` (TIỀN SẢNH) · `arena1-3.jpg` (PHÒNG KHÁCH SANG TRỌNG & PHÓNG KHOÁNG) · `arena1-4.png` (Phòng ăn & bếp ấm cúng) · `arena1-5.jpg` (Phòng LÀM VIỆC THƯ THÁI) · `arena1-6.jpg` (PHÒNG NGỦ HIỆN ĐẠI & TIỆN NGHI) · `arena1-7.jpg` (PHÒNG HỌC / ĐỌC SÁCH YÊN TĨNH & THOÁNG ĐẠT)
- **Nhà phố vườn:** `arena2-0.jpg` (Nhà phố vườn) · `arena2-1.jpg` (PHÒNG KHÁCH TRẺ TRUNG & NHẸ NHÀNG) · `arena2-2.jpg` (PHÒNG NGỦ ẤM ÁP & TỐI GIẢN) · `arena2-3.png` (Sảnh ĐÓN)
- **Nhà phố thương mại:** `arena3-0.jpg` (Nhà phố thương mại) · `arena3-1.jpg` … `arena3-4.jpg` (Phòng khách 1–4)

### 2.7 Mặt bằng

**Cấu trúc chung (A `#mat-bang` · B `#s-arena_detail`):** 2 tab — `Mặt bằng tổng thể` / `Mặt bằng căn`.
- Ảnh mặt bằng tổng thể: `arena.jpg` (dùng chung A–B).
- B thêm bản đồ tương tác SVG (`arena_detail.jpg` + vùng tô màu theo mã căn) — chỉ có ở B.

**Số liệu mặt bằng căn (chỉ có ở B, hiển thị trong popup):**

| Mã căn | Nhóm | Số lượng | Diện tích (m²) | Số tầng |
|--------|------|---------:|----------------|---------|
| TH1 | Nhà phố liên kế | 41 | 75 – 204,19 | 4 tầng (1 trệt, 2 lầu & sân thượng) |
| TH2 | Nhà phố liên kế | 36 | 75 – 204,19 | 4 tầng (1 trệt, 2 lầu & sân thượng) |
| TH3 | Nhà phố liên kế | 62 | 75 – 204,19 | 4 tầng (1 trệt, 2 lầu & sân thượng) |
| TH4 | Nhà phố liên kế | 46 | 75 – 204,19 | 4 tầng (1 trệt, 2 lầu & sân thượng) |
| SH1 | Nhà phố thương mại | 41 | 116,31 – 215,9 | 4 tầng (1 trệt, 3 lầu) |
| SH2 | Nhà phố thương mại | 39 | 116,31 – 215,9 | 4 tầng (1 trệt, 3 lầu) |
| SH3 | Nhà phố thương mại | 8 | 116,31 – 215,9 | 4 tầng (1 trệt, 3 lầu) |
| SD1 | Biệt thự song lập | 59 | 189,45 – 338,23 | 4 tầng (1 trệt, 2 lầu & sân thượng) |

- Ghi chú popup (B): *Đây là diện tích tham khảo, vui lòng liên hệ hotline để biết thêm thông tin chi tiết.*
- Caption (A): `Mặt bằng và phối cảnh được cung cấp trên website dự án; hình ảnh chỉ mang tính chất tham khảo.`

**Màu legend bản đồ (B):** TH1 `#F3F2CB` · TH2 `#FAF6AB` · TH3 `#E9E44F` · TH4 `#F5CF49` · SH1 `#E4BCD3` · SH2 `#D37CAC` · SH3 `#BB6180` · SD1 `#6DBFC6`.

### 2.8 Hệ tiện ích (12 tiện ích)

**Khung tiêu đề:** A — Eyebrow `04 / TIỆN ÍCH`, H2 `Nhịp sống thư thái.` — *`Trải nghiệm mỗi ngày.`* · B — H2 `HỆ TIỆN ÍCH XỨNG TẦM`, H3 `An nhiên tận hưởng`, mô tả: *Hơn 1,29 ha diện tích được dành trọn cho cảnh quan, mảng xanh, mặt nước và hệ tiện ích đẳng cấp - nơi từng khoảnh khắc trôi qua đều được bao bọc bởi sự an yên, thư thái và cảm giác tận hưởng trọn vẹn từng nhịp sống.*

**12 tiện ích (giống nhau về tên, khác thứ tự giữa 2 nguồn):**

| Tên tiện ích | Thứ tự ở A | Thứ tự ở B | Ảnh |
|--------------|:----------:|:----------:|-----|
| Công viên trung tâm | 02 | **01** | `bf-1.jpg` |
| Câu lạc bộ cộng đồng | 01 | **02** | `bf-2.jpg` |
| Công viên nội khu | 03 | 03 | `bf-3.jpg` |
| Sân đa năng ngoài trời | 07 | **04** | `sandanang.jpg` |
| Hồ bơi trong nhà | 05 | 05 | `bf-5.jpg` |
| Hồ cảnh quan | 06 | 06 | `bf-6.jpg` |
| Phòng gym | 04 | **07** | `phonggym.jpg` |
| Phòng xông hơi | 08 | 08 | `bf-8.jpg` |
| Phòng đa năng | 09 | 09 | `bf-9.jpg` |
| Khu BBQ | 10 | 10 | `bf-10.jpg` |
| Khu tập thể dục ngoài trời | 11 | 11 | `bf-11.jpg` |
| Khu vui chơi trẻ em | 12 | 12 | `bf-12.jpg` |

> ⚠️ **Khác biệt:** cùng bộ ảnh `bf-*` (giống hệt byte A–B) nhưng A và B **gán nhãn khác nhau** cho `bf-1`/`bf-2` (công viên trung tâm ↔ câu lạc bộ cộng đồng) và đảo vị trí "Phòng gym" ↔ "Sân đa năng ngoài trời". Cần thống nhất lại thứ tự/gán nhãn khi dùng.

### 2.9 Hình ảnh dự án (Key Visual) *(chỉ có ở B, `#s-kv`)*

- H2: `SẢN PHẨM GIỚI HẠN` · H3: `Giá trị vượt thời gian` — **tái sử dụng đúng tiêu đề/phụ đề của phần Sản phẩm**.
- Ảnh: `kv.jpg` (mobile `kv-mb.jpg`).

### 2.10 Vị trí — Kết nối khu vực

**Tiêu đề:** A — Eyebrow `05 / VỊ TRÍ`, H2 `Kết nối phố thị.` — *`Trở về bình yên.`* · B — H2 `SÔI ĐỘNG`, phụ đề `KẾT NỐI`.

- Mô tả (A): `Khu đô thị Nam Rạch Chiếc, đường Song Hành, cao tốc TP. HCM – Long Thành – Dầu Giây, phường Bình Trưng, TP. Hồ Chí Minh.`
- Sơ đồ 4 lớp SVG (dùng chung A–B): `map_water.svg` → `map_road.svg` → `map_text.svg` → `map_icons.svg`.
- Nút (A): `Mở Google Maps` → toạ độ `10.7945727, 106.7679024`. Caption: *Sơ đồ vị trí mang tính minh họa. Khoảng cách và thời gian di chuyển phụ thuộc lộ trình, giao thông thực tế.*
- **3 mốc khoảng cách (chỉ có ở B):**

| Thời gian | Địa điểm | Icon |
|-----------|----------|------|
| `15 Phút` | Chợ Bến Thành | `market.svg` |
| `30 Phút` | Sân bay Long Thành & Đồng Nai | `plane_o.svg` |
| `60 Phút` | Vũng Tàu | `beach.svg` |

### 2.11 Tiến độ xây dựng

**A (`#tien-do`)** chỉ hiển thị **1 mốc mới nhất** — nhãn `THÁNG 06.2026` — 3 ảnh: `process_T6.2026_1..3.jpg`. Caption: *Bộ ảnh tháng 6/2026 từ trang nguồn, không đại diện cho tiến độ tại thời điểm hiện tại.*

**B (tab "Tiến độ xây dựng")** hiển thị **4 mốc:**

| Mốc | Mô tả | Ảnh |
|-----|-------|-----|
| **Tháng 12 - 2024** | Khởi công đào móng và ép cọc toàn bộ khu vực dự án. Hệ tầng kỹ thuật bắt đầu được triển khai đồng bộ với hệ thống cấp thoát nước và điện ngầm. | `process1.jpg`, `process2.jpg`, `process3.jpg` |
| **Tháng 6 - 2025** | Hoàn thành phần thô tầng trệt và tầng lửng cho các block đầu tiên. Hệ thống kết cấu thép và bê-tông cốt thép đạt tiến độ 60%. | `process4.jpg`, `process5.jpg`, `process6.jpg` |
| **Tháng 12 - 2025** | Senturia An Phú đã hoàn thành lễ cất nóc vào ngày 29/12/2025, đánh dấu cột mốc quan trọng trong quá trình thi công dự án. Các hạng mục tiếp tục được triển khai đồng bộ. | `process6.jpg`, `process7.jpg`, `process8.jpg` |
| **Tháng 6 - 2026** *(mốc mặc định)* | Tính đến cuối tháng 6/2026, dự án đã hoàn thành hơn 90% khối lượng xây thô. Các dãy nhà phố vườn, nhà phố thương mại và biệt thự song lập đang được đẩy nhanh xây tô hoàn thiện mặt ngoài, lắp đặt hệ cửa kính và từng bước hoàn chỉnh diện mạo kiến trúc. Trong Quý 3/2026, các tuyến đường nội khu sẽ được trải nhựa và bó vỉa hè, đồng thời triển khai đồng bộ các tiện ích cảnh quan trước khi chính thức bàn giao nhà từ Quý 4/2026. | `process_T6.2026_1..4.jpg` (4 ảnh) |

> Ghi chú: mốc T6.2026 ở A có **3 ảnh**, ở B có **4 ảnh** (`process_T6.2026_4.jpg` chỉ có ở B). Kênh theo dõi (A): Facebook `bietthusenturiaanphu`, YouTube `@SenturiaInfo`.

### 2.12 Tin tức *(chỉ có ở B, `#s-news` tab "Thị trường & Dự án")*

| # | Tiêu đề | Ngày | Ảnh |
|---|---------|------|-----|
| 1 | ĐÂU LÀ TÂM ĐIỂM AN CƯ & ĐẦU TƯ "HOT" NHẤT TP.HCM NĂM 2026? | 18/08/2026 | `tin-tuc_01_dau-la-tam-diem-an-cu-dau-tu.jpg` |
| 2 | Thanh toán chỉ từ 30% sở hữu ngay nhà phố vườn trung tâm khu Đông TP.HCM | 25/06/2026 | `tin-tuc_02_thanh-toan-chi-tu-30.jpg` |
| 3 | SENTURIA AN PHÚ ĐÓN SÓNG METRO & CAO TỐC BẮC NAM | 27/05/2026 | `tin-tuc_03_don-song-metro-cao-toc-bac-nam.jpg` |
| 4 | VÌ SAO SENTURIA AN PHÚ HẤP DẪN GIỚI TINH HOA? | 27/05/2026 | `tin-tuc_04-hap-dan-gioi-tinh-hoa.jpg` |
| 5 | SENTURIA AN PHÚ – PHÁP LÝ CHUẨN CHỈNH HÀNG ĐẦU THỊ TRƯỜNG | 27/05/2026 | `tin-tuc_05_phap-ly-chuan-chinh-hang-dau.jpg` |
| 6 | HOME RESORT – NƠI THIÊN NHIÊN TRỞ THÀNH MỘT PHẦN CỦA CUỘC SỐNG | 26/05/2026 | `tin-tuc_06_home-resort-thien-nhien.jpg` |

> Link mỗi thẻ trỏ ra trang con `./tin-tuc/<slug>/` (ngoài phạm vi scrape).

### 2.13 Pháp lý *(đầy đủ ở A, `#phap-ly`)*

- H2: `Thông tin để` — *`bạn tìm hiểu rõ hơn.`* · Eyebrow: `07 / PHÁP LÝ`
- Tên pháp lý: `Khu nhà ở thấp tầng OTM4 – thuộc KDC Nguyên Phương.`
- Link: `Xem công bố tại website chủ đầu tư` → https://senturia.com.vn/senturia-an-phu/phap-ly-du-an/

| # | Mục | Nội dung |
|---|-----|----------|
| 1 | Chấp thuận chủ trương đầu tư | Quyết định số 7348/QĐ-UBND, ngày 27/05/2025. |
| 2 | Giao đất và quy hoạch chi tiết 1/500 | Giao đất: 5452/QĐ-UBND, ngày 13/10/2017. Quy hoạch chi tiết 1/500: 895/QĐ-UBND, ngày 17/04/2018. |
| 3 | Thẩm định thiết kế và báo cáo khả thi | Thiết kế cơ sở hạ tầng kỹ thuật: 324/HĐXD-QLDA, ngày 15/06/2018. Thiết kế cơ sở dự án: 487/HĐXD-QLDA, ngày 28/08/2018. Thẩm định báo cáo nghiên cứu khả thi điều chỉnh: 16157/SXD-QL-XDCT, ngày 17/11/2025. |
| 4 | Giấy phép xây dựng | Số 05/GPXD, ngày 08/08/2025. |
| 5 | Nghiệm thu giai đoạn xây dựng | Biên bản số SAP.502_HDC_HTKT GĐ1_RI 001, ngày 06/11/2025. |
| 6 | Thông báo đủ điều kiện mua bán | Số 13775/SXD-PTĐT, ngày 23/04/2026. |
| 7 | Bảo lãnh và thông tin bảo đảm | Cam kết cấp bảo lãnh của OCB số 1519/2025/TB-OCB, ngày 06/11/2025. Trang nguồn công bố quyền tài sản phát sinh từ dự án đang được bảo đảm tại OCB; ngân hàng đồng ý giải chấp từng sản phẩm khi ký hợp đồng mua bán. |

### 2.14 Đối tác & Về chúng tôi

**A (`.partners`)** — Eyebrow `ĐỒNG HÀNH KIẾN TẠO`, H2 `Những đối tác` — *`của dự án.`* · 6 ô:
**B (`#s-company`)** — H2 `ĐỒNG HÀNH KIẾN TẠO` · giới thiệu CĐT:
- *Senturia An Phú được phát triển bởi Công ty BĐS Nguyên Phương - thành viên Công ty CP BĐS Tiến Phước với gần 35 năm kinh nghiệm trong ngành bất động sản.*
- *Dự án quy hoạch bài bản trên quy mô 8,6 ha, gồm 355 sản phẩm sở hữu lâu dài (nhà phố liên kế, nhà phố thương mại và biệt thự song lập). Không chỉ là tâm huyết của chủ đầu tư, Senturia An Phú còn đồng hành với những đối tác quốc tế uy tín để cùng kiến tạo nên những giá trị vượt thời gian.*

| # | Vai trò | Tên hiển thị | Logo |
|---|---------|--------------|------|
| 1 | Chủ đầu tư | Nguyên Phương | `NP.svg` |
| 2 | Nhà phát triển | Tiến Phước | `TP.svg` |
| 3 | Thiết kế kiến trúc | FDAT | `FD.svg` |
| 4 | Thiết kế cảnh quan | ONG & ONG | `OO.svg` |
| 5 | Quản lý vận hành | Savills | `SV.svg` |
| 6 | Đơn vị phân phối chính thức *(chỉ có ở A)* | PCA By Open Broker | `pca.jpg` |

### 2.15 Liên hệ, Form & Footer

**A (`#lien-he`)** — Eyebrow `KẾT NỐI VỚI CHÚNG TÔI`, H2 `Tìm hiểu ngôi nhà` — *`tiếp theo của bạn.`*
- Hotline `0325 89 89 89` · Email `info@openbroker.vn`
- Form `#consultation-form` (gửi qua `mailto:`): Họ và tên (bắt buộc) · Số điện thoại (bắt buộc) · Email (không bắt buộc) · Sản phẩm quan tâm (Chưa xác định / Biệt thự song lập / Nhà phố vườn / Nhà phố thương mại) · Đồng ý cung cấp thông tin (bắt buộc, kèm `Chính sách bảo mật`). Nút `Soạn email đăng ký tư vấn`.
- Footer A: logo `dark_logo.png`; `Liên hệ tư vấn` (hotline, email, socials); `Thông tin chủ đầu tư`: Công ty TNHH Bất động sản Nguyên Phương, MST 0314377920; link `Chính sách bảo mật`.

**B (`#s-footer`)** — 3 cột:
- **Thông tin pháp nhân:** CÔNG TY TNHH BẤT ĐỘNG SẢN NGUYÊN PHƯƠNG · MST **0314377920** · Ngày cấp lần đầu **27/04/2017** · Nơi cấp **Sở tài chính thành phố Hồ Chí Minh**.
- **Thông tin dự án:** Senturia An Phú · Khu đô thị Nam Rạch Chiếc, đường Song Hành, Cao tốc TP. HCM - Long Thành - Dầu Giây, Phường Bình Trưng, TP. HCM · Email **marketing@tienphuoc.com** · Hotline **1800 6627**.
- **Chính sách & Điều khoản:** `Chính sách bảo mật` · `Điều khoản sử dụng` · `Pháp lý dự án`.
- **Disclaimer:** *Chúng tôi đã nỗ lực & cam kết để hoàn thiện tài liệu này. Tuy nhiên, tài liệu và hình ảnh chỉ mang tính chất tham khảo. Thông tin chính thức sẽ căn cứ trên văn bản giao dịch trong tương lai.*

### 2.16 Popup, dialog & liên hệ nổi

| Thành phần | Nguồn A | Nguồn B |
|---|---|---|
| Floating CTA | `Gọi tư vấn` (tel) · `Đăng ký` (#lien-he) | Floating social dọc phải: Tour 360° · Facebook · **Zalo** · YouTube |
| Dialog xem ảnh | `#image-dialog` (zoom 100–300%, tải ảnh `Senturia-An-Phu-<file>`) | Popup gallery sản phẩm `#popuparena` + popup mặt bằng căn `#arenaDetailPopup` (zoom `+`/`-`) |
| Popup đăng ký | Form mailto (`#lien-he`) | `#popupRegister` — form `Họ tên / Số điện thoại (10-11 số) / Email / Lời nhắn` → `GỬI THÔNG TIN`; disclaimer điều khoản; `Hotline: 1800 6627` |
| Overlay menu | Menu mobile đơn giản | Overlay toàn màn hình (nền ảnh `overlay_menu.jpg`) gồm: TRANG CHỦ · THÔNG TIN DỰ ÁN (E-Brochure) · MẶT BẰNG TỔNG THỂ · THAM QUAN DỰ ÁN · TIN TỨC · PHÁP LÝ DỰ ÁN |

---

## 3. Khác biệt chính giữa 2 nguồn (cần chốt khi dùng)

| Hạng mục | Nguồn A | Nguồn B (chuẩn) | Hướng xử lý đề xuất |
|----------|---------|-----------------|---------------------|
| Hotline | 0325 89 89 89 | 1800 6627 | Dùng B (số tổng đài chính thức), ghi chú số A |
| Email | info@openbroker.vn | marketing@tienphuoc.com | Dùng B |
| Social | FB `bietthusenturiaanphu`, YT `@SenturiaInfo` | FB `senturia.com.vn`, Zalo, YT `@SenturiaByTienPhuoc` | Dùng B, ghi chú kênh A |
| Tiện ích | Thứ tự & gán nhãn khác (xem 2.8) | Thứ tự & gán nhãn khác | Thống nhất theo B, đối chiếu ảnh thực tế |
| Hero | Ảnh tĩnh `architecture.jpg` | Video `kety.mp4` | Dùng B (video), fallback ảnh A |
| Tiến độ | 1 mốc (T6.2026, 3 ảnh) | 4 mốc (T6.2026 có 4 ảnh) | Dùng B (đầy đủ) |
| Sản phẩm | 3 card (mô tả ngắn) | 3 card + gallery nội thất + số căn | Dùng B |
| Mặt bằng | 2 tab | 2 tab + bản đồ tương tác + số liệu căn | Dùng B |
| Pháp lý | 7 mục công bố đầy đủ | chỉ có trang con | Dùng A |
| Đối tác | 6 (gồm PCA) | 5 logo | Hợp nhất: 5 đối tác + PCA (phân phối) |
| Màu nhận diện | `#123f36` | `#D39538` (accent) | Chốt theo bộ nhận diện chính thức |
| Font | Playfair + Be Vietnam Pro | Playfair + Inter (+Roboto) | — |

---

## 4. Mặt bằng — dữ liệu hợp nhất

Đã trình bày tại **mục 2.7**. Tóm tắt: **8 mã căn** (TH1–TH4, SH1–SH3, SD1), diện tích `75 – 338,23 m²`, kết cấu `4 tầng` (nhà phố liên kế & biệt thự: 1 trệt, 2 lầu & sân thượng; nhà phố thương mại: 1 trệt, 3 lầu).

> Lưu ý số liệu: cộng 8 mã căn = **332 căn** (41+36+62+46+41+39+8+59), trong khi tổng dự án công bố là **355 sản phẩm** — phần chênh lệch có thể do các mã/loại sản phẩm khác chưa nêu trong bảng mặt bằng. Cần đối chiếu khi dùng chính thức.

---

## 5. Kho ảnh hợp nhất (đã chắt lọc trùng)

**Tổng quan:** 152 file media · **112 ảnh phân biệt** · **39 nhóm ảnh trùng A–B** (byte-identical) · **1 nhóm trùng nội bộ B** (`silk.png`) · 2 ảnh riêng của A · 70 ảnh riêng của B.

### 5.1 Ảnh dùng chung giữa A và B (trùng hoàn toàn — nên chỉ giữ 1 bản khi tái sử dụng)

| Nội dung | Đường dẫn A | Đường dẫn B |
|----------|-------------|-------------|
| Logo tối | `images/senturia-info/header-logo/header-logo_dark_logo.png` | `images/senturia-com-vn/header-logo/header-logo_dark_logo.png` |
| Phối cảnh kiến trúc *(A dùng làm hero)* | `images/senturia-info/hero/hero_architecture.jpg` | `images/senturia-com-vn/thiet-ke/thiet-ke_architecture.jpg` |
| Thiên nhiên / about | `images/senturia-info/thien-nhien/thien-nhien_about.jpg` | `images/senturia-com-vn/thien-nhien/thien-nhien_about.jpg` |
| Cover Biệt thự song lập | `images/senturia-info/san-pham/san-pham_arena1.jpg` | `images/senturia-com-vn/san-pham/san-pham_arena1.jpg` |
| Cover Nhà phố vườn | `images/senturia-info/san-pham/san-pham_arena2.jpg` | `images/senturia-com-vn/san-pham/san-pham_arena2.jpg` |
| Cover Nhà phố thương mại | `images/senturia-info/san-pham/san-pham_arena3.jpg` | `images/senturia-com-vn/san-pham/san-pham_arena3.jpg` |
| Mặt bằng tổng thể | `images/senturia-info/mat-bang/mat-bang_arena.jpg` | `images/senturia-com-vn/mat-bang/mat-bang_arena.jpg` |
| Mặt bằng TH1–TH4 | `images/senturia-info/mat-bang/mat-bang_TH1..4.jpg` | `images/senturia-com-vn/mat-bang/mat-bang_TH1..4.jpg` |
| Mặt bằng SH1–SH3 | `images/senturia-info/mat-bang/mat-bang_SH1..3.jpg` | `images/senturia-com-vn/mat-bang/mat-bang_SH1..3.jpg` |
| Mặt bằng SD1 | `images/senturia-info/mat-bang/mat-bang_SD1.jpg` | `images/senturia-com-vn/mat-bang/mat-bang_SD1.jpg` |
| Tiện ích `bf-1,2,3,5,6,8,9,10,11,12` + `phonggym` + `sandanang` | `images/senturia-info/tien-ich/…` | `images/senturia-com-vn/tien-ich/…` |
| Sơ đồ vị trí `map_water/road/text/icons.svg` | `images/senturia-info/vi-tri/…` | `images/senturia-com-vn/vi-tri/…` |
| Tiến độ T6.2026 (1–3) | `images/senturia-info/tien-do/tien-do_process_T6.2026_1..3.jpg` | `images/senturia-com-vn/tien-do/tien-do_process_T6.2026_1..3.jpg` |
| Logo đối tác `NP/TP/FD/OO/SV.svg` | `images/senturia-info/doi-tac/…` | `images/senturia-com-vn/ve-chung-toi/…` |
| *(nội bộ B)* chất liệu lụa `silk.png` | — | `images/senturia-com-vn/quy-hoach/quy-hoach_silk.png` = `images/senturia-com-vn/footer/footer_silk.png` |

### 5.2 Ảnh riêng của nguồn A (2)

- `images/senturia-info/doi-tac/doi-tac_pca.jpg` (logo PCA By Open Broker)
- `images/senturia-info/favicon/favicon_favicon.svg`

### 5.3 Ảnh riêng của nguồn B (70)

- **Banner (10):** `banner/banner_banner1..5.jpg`, `banner_banner1..5-mb.jpg`
- **Hero/video (2):** `hero/hero_kety.mp4`, `hero_hero-ldp-mb.jpg`
- **Header-logo (3):** `header-logo_logo.svg`, `header-logo_logo_mb.svg`, `header-logo_logo_text.svg`
- **Thiên nhiên (1):** `thien-nhien_about-ldp-mb.jpg` · **Thiết kế (1):** `thiet-ke_design-ldp-mb.jpg`
- **Quy hoạch (3):** `quy-hoach_legacy_1..3.svg`
- **Sản phẩm – gallery (17):** `san-pham_arena1-1..7` (gồm `arena1-3.jpg` & `arena1-3.png`), `san-pham_arena2-0..3`, `san-pham_arena3-0..4`
- **Mặt bằng (1):** `mat-bang_arena_detail.jpg`
- **Hình ảnh dự án (2):** `hinh-anh-du-an_kv.jpg`, `hinh-anh-du-an_kv-mb.jpg`
- **Vị trí (3):** `vi-tri_market.svg`, `vi-tri_plane_o.svg`, `vi-tri_beach.svg`
- **Tiến độ (9):** `tien-do_process1..8.jpg`, `tien-do_process_T6.2026_4.jpg`
- **Tin tức (6):** `tin-tuc/tin-tuc_01..06_*.jpg`
- **Popup (3):** `popup_pop-up.jpg`, `popup_pop_up_mb.jpg`, `popup_overlay_menu.jpg`
- **Footer (1):** `footer_logo_footer.svg`
- **UI (8):** `ui_arrow_left.svg`, `ui_arrow_right.svg`, `ui_arrow_left_alt_green.svg`, `ui_arrow_right_alt_green.svg`, `ui_arrow_right_alt_green_link.svg`, `ui_calendar.svg`, `ui_lua.mp4`, `ui_thumbnail.jpg`

> Danh sách kiểm chứng bằng hash: `images/_duplicates.txt` (40 nhóm trùng) và `images/_dedup-index.txt` (ảnh riêng/chung).

---

## 6. Phụ lục — ánh xạ file nội dung gốc

| File hợp nhất (mục) | Nguồn A (`script/senturia-info/`) | Nguồn B (`script/senturia-com-vn/`) |
|---------------------|-----------------------------------|--------------------------------------|
| 2.1 Hero | `02_hero.md` | `02_banner.md`, `03_hero-cau-chuyen-thuong-hieu.md` |
| 2.2 Tổng quan | `03_tong-quan.md` | `13_ve-chung-toi-doi-tac.md` |
| 2.3 Thiên nhiên | `04_thien-nhien.md` | `04_thien-nhien.md` |
| 2.4 Quy hoạch | — | `05_quy-hoach-gia-san-doc-ban.md` |
| 2.5 Thiết kế | — | `06_thiet-ke-kien-truc-du-my.md` |
| 2.6 Sản phẩm | `05_san-pham.md` | `07_san-pham-gioi-han.md` |
| 2.7 Mặt bằng | `06_mat-bang.md` | `08_mat-bang.md` |
| 2.8 Tiện ích | `07_tien-ich.md` | `09_tien-ich.md` |
| 2.9 KV | — | `10_hinh-anh-du-an-kv.md` |
| 2.10 Vị trí | `08_vi-tri.md` | `11_vi-tri.md` |
| 2.11 Tiến độ | `09_tien-do-hinh-anh.md` | `12_tin-tuc.md` (tab tiến độ) |
| 2.12 Tin tức | — | `12_tin-tuc.md` (tab tin) |
| 2.13 Pháp lý | `10_phap-ly.md` | (trang con) |
| 2.14 Đối tác / Về chúng tôi | `11_doi-tac.md` | `13_ve-chung-toi-doi-tac.md` |
| 2.15 Liên hệ / Footer | `12_lien-he.md`, `13_footer.md` | `14_footer-lien-he.md` |
| 2.16 Popup / Floating | `14_floating-cta-va-dialog.md`, `01_header-nav.md` | `15_popup-va-floating-social.md`, `01_header-nav.md` |

---

*Tài liệu này là bản hợp nhất duy nhất (single source of truth) cho nội dung 2 trang. Chi tiết từng phần vẫn tra cứu được ở 31 file gốc trong `script/senturia-info/` và `script/senturia-com-vn/`; kho ảnh ở `images/`.*
