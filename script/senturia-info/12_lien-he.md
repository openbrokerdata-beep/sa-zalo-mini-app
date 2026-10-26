# 12 — Liên hệ + Form đăng ký tư vấn

- **`id`:** `lien-he` · **class:** `.contact.section`
- **Vai trò:** khối liên hệ (hotline, email) + form đăng ký tư vấn (gửi qua `mailto:`).

## Bố cục

- Chia 2 cột: **cột thông tin liên hệ** (chữ) và **form** `#consultation-form`.
- Nền tối, chữ sáng.

## Nội dung (verbatim)

### Cột thông tin liên hệ

- **Eyebrow:** `KẾT NỐI VỚI CHÚNG TÔI`
- **H2:** `Tìm hiểu ngôi nhà` — `tiếp theo của bạn.` (phần sau in nghiêng)
- **Mô tả:** `Liên hệ để tìm hiểu sản phẩm, mặt bằng` / `và sắp xếp lịch tham quan dự án.`
- **Hotline:** `0325 89 89 89` → `tel:0325898989`
- **Email:** `info@openbroker.vn` → `mailto:info@openbroker.vn`

### Form đăng ký tư vấn (`#consultation-form`)

- **Tiêu đề:** `Đăng ký tư vấn`

| Trường | `name`/`id` | Kiểu | Bắt buộc | Ghi chú |
|--------|-------------|------|:--------:|---------|
| Họ và tên | `name` | text | ✔ | `maxlength=100`, `autocomplete=name`, placeholder `Tên của bạn` |
| Số điện thoại | `phone` | tel | ✔ | `maxlength=20`, pattern `[+0-9 ()\-]{9,20}`, placeholder `Số điện thoại liên hệ` |
| Email | `email` | email | ✖ | nhãn `Email (không bắt buộc)`, `maxlength=150` |
| Sản phẩm quan tâm | `interest` | select | — | 4 lựa chọn (xem dưới) |
| Đồng ý cung cấp thông tin | checkbox | checkbox | ✔ | kèm link `Chính sách bảo mật` |

**Lựa chọn "Sản phẩm quan tâm" (`#interest`):**
- `Chưa xác định — cần tư vấn` (mặc định)
- `Biệt thự song lập`
- `Nhà phố vườn`
- `Nhà phố thương mại`

- **Nhãn checkbox:** `Tôi đồng ý cung cấp thông tin để nhận tư vấn về Senturia An Phú. Chính sách bảo mật`
- **Nút gửi:** `Soạn email đăng ký tư vấn`
- **Ghi chú form:** `Nút này mở ứng dụng email của bạn. Vui lòng bấm gửi trong ứng dụng email để hoàn tất.`
- **Trạng thái:** `#form-status` (`role="status"`, rỗng mặc định)

**Nội dung email sinh ra (từ `app.js`):**
```
Đăng ký tư vấn Senturia An Phú

Họ tên: <name>
Điện thoại: <phone>
Email: <email hoặc "Không cung cấp">
Sản phẩm quan tâm: <interest>

Tôi đồng ý cung cấp thông tin để được tư vấn về Senturia An Phú.
Nguồn: senturia.info
```
Gửi tới `info@openbroker.vn`, tiêu đề `Đăng ký tư vấn Senturia An Phú`.

## Ảnh

- Không có ảnh riêng.
