# 06 — Mặt bằng (quy hoạch)

- **`id`:** `mat-bang` · **class:** `.section.plans`
- **Vai trò:** xem mặt bằng tổng thể và mặt bằng từng loại căn (dạng tab).

## Bố cục

- `.heading-row`: eyebrow `03 / QUY HOẠCH`, H2, mô tả phải.
- Tab bar `.tabs` (`role="tablist"`): 2 tab
  - `Mặt bằng tổng thể` → panel `#master-panel`
  - `Mặt bằng căn` → panel `#unit-panel`
- **Panel tổng thể:** 1 nút ảnh lớn `.plan-image` (`mat-bang_arena.jpg`) → bấm để phóng to.
- **Panel mặt bằng căn:** 
  - `.unit-tools`: `<select id="plan-select">` chọn loại căn (theo `optgroup`) + link `Tải mặt bằng`.
  - Ảnh `#unit-image` (mặc định `mat-bang_TH1.jpg`) + nhãn "Phóng to mặt bằng".
- `.caption`: ghi chú tham khảo.

## Nội dung (verbatim)

- **Eyebrow:** `03 / QUY HOẠCH`
- **H2:** `Mặt bằng` — `dự án.` (phần sau in nghiêng)
- **Mô tả phải:** `Khám phá quy hoạch tổng thể` / `và bố trí từng loại căn.`
- **Caption:** `Mặt bằng và phối cảnh được cung cấp trên website dự án; hình ảnh chỉ mang tính chất tham khảo.`

### Danh sách mã căn (select)

| Nhóm (`optgroup`) | Mã căn |
|-------------------|--------|
| Nhà phố vườn | TH1, TH2, TH3, TH4 |
| Nhà phố thương mại | SH1, SH2, SH3 |
| Biệt thự song lập | SD1 |

## Ảnh

- `images/senturia-info/mat-bang/mat-bang_arena.jpg` (mặt bằng tổng thể)
- `images/senturia-info/mat-bang/mat-bang_TH1.jpg` … `mat-bang_TH4.jpg`
- `images/senturia-info/mat-bang/mat-bang_SH1.jpg` … `mat-bang_SH3.jpg`
- `images/senturia-info/mat-bang/mat-bang_SD1.jpg`

## Tương tác

- Đổi tab bằng ARIA (`aria-selected`, `hidden`).
- Đổi mã căn → cập nhật ảnh `#unit-image` và link tải (`assets/<mã>.jpg`).
- Bấm ảnh → mở dialog phóng to.
