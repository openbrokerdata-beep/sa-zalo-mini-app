# 10 · Chạy Mini App lên Zalo (giai đoạn 1 — chưa đẩy lead đi đâu)

Mục tiêu giai đoạn này: **mở được Mini App trên điện thoại bằng Zalo**, xem đủ giao diện + ảnh, bấm thử form.
Lead gửi lên chỉ được **ghi vào log** (sink `console`) — CRM/Google Sheets làm sau.

```
Điện thoại (Zalo) ──▶ Mini App (Zalo host, bản Development)
                         │  ảnh + gửi form
                         ▼
                  Lead API trên Vercel (HTTPS)  ──▶ log (console)
```

> Vì sao cần Vercel ngay từ bây giờ? Trên điện thoại, Mini App **không gọi được `localhost`** của máy bạn, và ảnh (9 MB) được phục vụ từ `/media` của Lead API. Cần một địa chỉ HTTPS công khai → deploy Lead API lên Vercel (gói miễn phí đủ dùng).

---

## Bước 0 — Chuẩn bị (1 lần)

| Cần | Ghi chú |
|-----|---------|
| Điện thoại có Zalo, đăng nhập tài khoản sẽ quản trị Mini App | Tài khoản này là "chủ" Mini App |
| Máy tính đã chạy được dự án (`pnpm install`, `pnpm check` xanh) | Xem README |
| Tài khoản Vercel (đăng nhập bằng GitHub/Email) | https://vercel.com/signup |

## Bước 1 — Tạo Mini App trên Zalo, lấy `APP_ID`

1. Mở https://mini.zalo.me → **Đăng nhập** (quét QR bằng Zalo trên điện thoại).
2. Vào trang nhà phát triển (https://mini.zalo.me/developers) → **Tạo Mini App**.
3. Điền: tên **Senturia An Phú**, mô tả ngắn, danh mục (Bất động sản), icon tạm (có thể dùng logo trong `images/senturia-com-vn/header-logo/`).
   Zalo có thể yêu cầu liên kết/tạo **Ứng dụng** trên https://developers.zalo.me — làm theo hướng dẫn trên màn hình.
4. Sau khi tạo xong, copy **Mini App ID** (dãy số dài).
5. Dán vào `apps/miniapp/.env`:
   ```env
   APP_ID=<mini-app-id-cua-ban>
   ```
   (`zmp-cli` đọc biến này. Không có tiền tố `VITE_` nên không bị nhúng vào app.)

## Bước 2 — Deploy Lead API + ảnh lên Vercel (Cách A: Vercel CLI qua npx)

Chạy ở **thư mục gốc repo** (`D:\WORK\SA_ZALO-MINI-APP`):

```bash
npx vercel@latest login            # đăng nhập Vercel (mở trình duyệt)
npx vercel@latest link             # tạo project mới
```

Khi `link` hỏi:
- *Set up and deploy?* → **Y**
- *Which scope?* → tài khoản của bạn
- *Link to existing project?* → **N** · tên project: `sa-lead-api`
- *In which directory is your code located?* → **`./apps/api`**  ← quan trọng
- Các câu hỏi build settings → để mặc định (đã cấu hình trong `apps/api/vercel.json`)

Khai báo biến môi trường cho bản **Production** của Vercel (mỗi lệnh sẽ hỏi giá trị):

```bash
npx vercel@latest env add APP_ENV production              # nhập: staging
npx vercel@latest env add LEAD_SINKS production           # nhập: console
npx vercel@latest env add CORS_ORIGINS production         # nhập: https://h5.zdn.vn,https://h5.zadn.vn
npx vercel@latest env add PHONE_PROOF_SECRET production   # nhập chuỗi ngẫu nhiên (lệnh bên dưới)
npx vercel@latest env add IP_HASH_SALT production         # nhập chuỗi ngẫu nhiên khác
```

Sinh chuỗi ngẫu nhiên: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

> `APP_ENV=staging` là cố ý: code chặn `production` nếu chỉ có sink `console` (để không quên nối Sheets/CRM khi chạy thật).

Deploy:

```bash
npx vercel@latest deploy --prod
```

Ghi lại URL in ra, ví dụ `https://sa-lead-api.vercel.app`. Kiểm tra:

```bash
curl https://sa-lead-api.vercel.app/health
# → {"ok":true,...,"sinks":["console"]}
curl -I https://sa-lead-api.vercel.app/media/san-pham/arena1.webp
# → HTTP 200, content-type: image/webp
```

> Nếu bước build trên Vercel báo lỗi (lần đầu deploy monorepo), copy log lỗi gửi lại — thường là cài đặt *Root Directory* hoặc *Include files outside root directory* (phải **bật**) trong Project Settings → General.

### Bước 2 — Cách B: không dùng Vercel CLI (GitHub + giao diện web Vercel)

1. Tạo repo **Private** trống trên https://github.com/new (vd. `sa-zalo-mini-app`, không tick README/.gitignore).
2. Đẩy code lên (ở thư mục gốc repo):
   ```bash
   git add .
   git commit -m "Khởi tạo Senturia An Phú Zalo Mini App"
   git remote add origin https://github.com/<tai-khoan>/sa-zalo-mini-app.git
   git push -u origin main
   ```
   `.env` và `node_modules` đã được `.gitignore` loại trừ. Thư mục `images/` (61 MB) **phải** được đẩy lên vì Vercel sinh ảnh WebP từ đó lúc build.
3. Mở https://vercel.com/new → **Continue with GitHub** → cấp quyền cho repo → **Import**.
4. Màn hình cấu hình:
   - **Project Name:** `sa-lead-api`
   - **Root Directory:** bấm *Edit* → chọn **`apps/api`**
   - **Framework Preset:** Hono (thường tự nhận; nếu không thì chọn Hono)
   - **Build/Install Command:** để nguyên — lấy từ `apps/api/vercel.json`
   - **Environment Variables:** thêm 5 biến `APP_ENV=staging`, `LEAD_SINKS=console`, `CORS_ORIGINS=https://h5.zdn.vn,https://h5.zadn.vn`, `PHONE_PROOF_SECRET=<ngẫu nhiên>`, `IP_HASH_SALT=<ngẫu nhiên>`
5. Bấm **Deploy** → chờ xong → copy domain dạng `https://sa-lead-api.vercel.app` ở trang project.
6. Kiểm tra như cuối Cách A. Từ nay mỗi lần `git push` lên `main`, Vercel tự deploy lại.

Nếu build lỗi: Project → **Settings → General** → mục Root Directory, đảm bảo **Include files outside the root directory in the Build Step** đang **bật**, rồi *Redeploy*.

## Bước 3 — Khai báo domain API trong Mini App (whitelist)

Trong trang quản trị Mini App (mini.zalo.me → chọn app → **Cài đặt / Cấu hình**) tìm mục **Whitelist domain** (domain được phép gọi API) → thêm:

```
https://sa-lead-api.vercel.app
```

Không làm bước này → ảnh/form sẽ lỗi khi chạy trong Zalo dù trên máy tính chạy được. **[VERIFY]** tên mục chính xác trên giao diện hiện tại.

## Bước 4 — Trỏ Mini App tới API vừa deploy

Sửa `apps/miniapp/.env`:

```env
VITE_API_BASE_URL=https://sa-lead-api.vercel.app
VITE_ASSET_BASE_URL=https://sa-lead-api.vercel.app
```

Kiểm tra nhanh trên máy tính: `pnpm dev:miniapp` → mở http://localhost:3000 → ảnh phải tải từ domain Vercel.

## Bước 5 — Đăng nhập zmp-cli (1 lần / máy)

```bash
pnpm --filter @sa/miniapp zmp:login
```

Chọn đăng nhập bằng **QR Code** → quét bằng Zalo trên điện thoại → bấm **Xác nhận**.

## Bước 6 — Deploy bản Development và mở trên điện thoại

```bash
pnpm --filter @sa/miniapp deploy:dev
```

Lệnh này build (`apps/miniapp/www`) rồi tải lên Zalo. Khi hỏi mô tả phiên bản, nhập ví dụ `v0.1.0 - ban dung thu`. Kết thúc sẽ in **QR code + link**.

**Mở app:** dùng Zalo trên điện thoại quét QR đó (chỉ tài khoản quản trị/thành viên được thêm mới mở được bản Development).

Muốn người khác (đồng nghiệp, khách hàng) xem: mini.zalo.me → app → **Quản lý thành viên / Người dùng thử** → thêm số Zalo của họ, rồi gửi QR.

### (Tuỳ chọn) Xem thay đổi tức thì trên điện thoại

```bash
pnpm --filter @sa/miniapp zmp:device     # zmp start -D → in QR, quét bằng Zalo
```

Sửa code → app trên điện thoại tự cập nhật. Chế độ này phụ thuộc tunnel của Zalo và README của zmp-cli ghi hỗ trợ Vite 2.x — dự án dùng Vite 5 nên **có thể không chạy**; khi đó dùng lại Bước 6 cho mỗi lần cập nhật.

## Bước 7 — Kiểm tra trên điện thoại

- [ ] App mở được, hero có ảnh, cuộn hết trang không vỡ
- [ ] Ảnh sản phẩm, tiện ích, đối tác hiển thị
- [ ] Bấm **Đăng ký tư vấn** → form mở → điền → **Gửi** → trang **Cảm ơn** có mã `SAP-…`
- [ ] Trên Vercel → project → **Logs**: thấy `lead.console_sink` với đúng dữ liệu vừa gửi
- [ ] Nút **Gọi** mở trình gọi điện
- [ ] Nút back của Zalo hoạt động

Nếu gửi form báo lỗi: xem Vercel Logs có request đến không.
- **Không có request** → chưa whitelist domain (Bước 3) hoặc sai `VITE_API_BASE_URL` (Bước 4; nhớ deploy lại Bước 6).
- **Có request nhưng lỗi CORS** → xem header `origin` trong log, thêm đúng origin đó vào `CORS_ORIGINS` trên Vercel rồi `vercel deploy --prod` lại. Ghi kết quả vào docs/04 (bỏ nhãn **[VERIFY]**).

## Chưa làm ở giai đoạn này (cố ý)

| Hạng mục | Khi nào |
|----------|--------|
| Nút "Dùng số điện thoại Zalo" | Cần xin quyền SĐT + `ZALO_APP_SECRET` trên Vercel — hiện bấm sẽ báo không lấy được số, vẫn nhập tay bình thường |
| Nút Chat Zalo / Follow OA | Ẩn cho tới khi có `VITE_ZALO_OA_ID` |
| Google Sheets, CRM | Giai đoạn 2 — docs/03 §4–5 |
| Gửi kiểm duyệt, bản Production | Sau khi UI hoàn thiện (docs/09 Wave 4) |
