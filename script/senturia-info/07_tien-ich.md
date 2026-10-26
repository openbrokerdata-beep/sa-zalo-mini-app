# 07 — Tiện ích (hệ tiện ích)

- **`id`:** `tien-ich` · **class:** `.section.amenities`
- **Vai trò:** slider 12 tiện ích, mỗi slide có ảnh phối cảnh + tên.

## Bố cục

- `.heading-row`: eyebrow `04 / TIỆN ÍCH`, H2 + bộ điều khiển slider (nút prev/next, bộ đếm `01 / 12`).
- `.amenity-stage`: ảnh lớn hiện tại + nhãn `.amenity-label` (số thứ tự + tên + ghi chú) + nút xem ảnh lớn.
- `.amenity-chips` (`#amenity-chips`): dải chip bấm nhanh để chọn tiện ích.

## Nội dung (verbatim)

- **Eyebrow:** `04 / TIỆN ÍCH`
- **H2:** `Nhịp sống thư thái.` — `Trải nghiệm mỗi ngày.` (phần sau in nghiêng)
- **Ghi chú dưới nhãn:** `Hình ảnh minh họa từ website dự án.`

### Danh sách 12 tiện ích (theo thứ tự slider)

| # | Tên tiện ích | Ảnh |
|---|--------------|-----|
| 01 | Câu lạc bộ cộng đồng | `tien-ich_bf-1.jpg` |
| 02 | Công viên trung tâm | `tien-ich_bf-2.jpg` |
| 03 | Công viên nội khu | `tien-ich_bf-3.jpg` |
| 04 | Phòng gym | `tien-ich_phonggym.jpg` |
| 05 | Hồ bơi trong nhà | `tien-ich_bf-5.jpg` |
| 06 | Hồ cảnh quan | `tien-ich_bf-6.jpg` |
| 07 | Sân đa năng ngoài trời | `tien-ich_sandanang.jpg` |
| 08 | Phòng xông hơi | `tien-ich_bf-8.jpg` |
| 09 | Phòng đa năng | `tien-ich_bf-9.jpg` |
| 10 | Khu BBQ | `tien-ich_bf-10.jpg` |
| 11 | Khu tập thể dục ngoài trời | `tien-ich_bf-11.jpg` |
| 12 | Khu vui chơi trẻ em | `tien-ich_bf-12.jpg` |

> Thứ tự cập nhật từ `app.js` mảng `amenities`.

## Ảnh

- Toàn bộ 12 ảnh trong `images/senturia-info/tien-ich/`

## Tương tác

- Nút `‹` / `›` chuyển slide (vòng tròn 12 mục).
- Chip chọn trực tiếp; chip đang chọn có `aria-pressed="true"`.
- Bộ đếm cập nhật `NN / 12`; ảnh có thể mở dialog xem lớn.
