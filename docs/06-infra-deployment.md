# 06 · Hạ tầng, môi trường & triển khai

## 1. Môi trường

| Môi trường | Mini App (Zalo) | Lead API (Vercel) | Sink | Ai dùng |
|-----------|-----------------|-------------------|------|---------|
| `local` | `pnpm dev:miniapp` (trình duyệt :3000) | `pnpm dev:api` (:8787) | `console` | Dev |
| `staging` | Bản **Development/Testing** (`zmp deploy`) | Vercel **Preview** | `console` + Sheet thử nghiệm (+ CRM sandbox) | Dev, QA, khách hàng nghiệm thu |
| `production` | Bản **Production** (sau kiểm duyệt) | Vercel **Production** | `sheets,crm` | Người dùng thật |

> Không bao giờ để bản Testing ghi vào Sheet/CRM production. Production bị chặn chỉ dùng `console` (kiểm ở `env.ts`).

## 2. Yêu cầu máy dev

- Node ≥ 20.11 (`.nvmrc`), pnpm 9 (`corepack enable`), Git.
- Tài khoản Zalo được thêm làm thành viên Mini App (để mở bản Development).
- `pnpm install` → `pnpm --filter @sa/shared build` → `cp apps/api/.env.example apps/api/.env` → `cp apps/miniapp/.env.example apps/miniapp/.env` → `pnpm assets:optimize` → `pnpm dev`.

## 3. Biến môi trường

### Lead API (`apps/api`)

| Biến | Bắt buộc | Mô tả |
|------|:-------:|------|
| `APP_ENV` | ✓ | `local` \| `staging` \| `production` |
| `PROJECT_SLUG`, `LEAD_ID_PREFIX` | | Mặc định `senturia-an-phu`, `SAP` |
| `CORS_ORIGINS` | ✓ | Origin Mini App (phân tách dấu phẩy) |
| `LEAD_SINKS` | ✓ | `console`, `sheets`, `crm` |
| `PHONE_PROOF_SECRET` | ✓ | ≥ 16 ký tự, ngẫu nhiên, **khác nhau mỗi môi trường** |
| `IP_HASH_SALT` | ✓ | Ngẫu nhiên |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_SEC` | | 5 / 600 |
| `ZALO_APP_ID`, `ZALO_APP_SECRET` | ✓ (để lấy SĐT) | Zalo for Developers |
| `GOOGLE_SHEETS_*`, `GOOGLE_SERVICE_ACCOUNT_*` | khi bật `sheets` | docs/03 §4 |
| `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET`, `CRM_API_KEY` | khi bật `crm` | docs/03 §5 |

### Mini App (`apps/miniapp`, nhúng lúc build — **không chứa bí mật**)

| Biến | Mô tả |
|------|------|
| `VITE_API_BASE_URL` | URL Lead API của môi trường tương ứng |
| `VITE_ASSET_BASE_URL` | URL CDN ảnh (thường = API) |
| `VITE_ZALO_OA_ID` | OA ID |
| `VITE_HOTLINE` | Số hotline (chỉ chữ số) |
| `VITE_APP_VERSION` | Trùng `package.json` |

Build theo môi trường: tạo `apps/miniapp/.env.staging`, `.env.production` rồi `vite build --mode staging|production` (task INF-02 thêm script).

## 4. Vercel (Lead API + CDN)

Thiết lập 1 lần (task INF-01):
1. Tạo project Vercel từ repo, **Root Directory = `apps/api`**, Framework = Hono (tự nhận), Node 22.
2. `apps/api/vercel.json` đã cấu hình: cài đặt từ gốc monorepo, build `@sa/shared` + `pnpm assets:optimize` (sinh `public/media` từ `images/`), header cache `immutable` cho `/media/*`.
3. Khai báo biến môi trường cho **Preview** và **Production** riêng (`vercel env add …`).
4. Gắn domain riêng (Q8) → thêm domain vào **whitelist Mini App** + `VITE_API_BASE_URL`.
5. **[VERIFY] lần deploy đầu:** `GET /health` trả `ok`; `GET /media/san-pham/arena1.webp` trả 200 + `cache-control: immutable`; `POST /v1/leads` từ bản Testing của Mini App thành công.

```bash
cd apps/api
vercel link            # chọn project
vercel deploy          # preview
vercel deploy --prod   # production
```

## 5. Assets (ảnh)

- Nguồn: `images/` (không sửa). Lệnh `pnpm assets:optimize` → `apps/api/public/media/<group>/<name>.webp|svg` + `manifest.json`.
- `apps/api/public/media` **được commit vào git** (Vercel không chạy bước sinh ảnh khi build). Đổi/thêm ảnh → chạy `pnpm assets:optimize` rồi commit thư mục này.
- Thêm ảnh mới: đặt vào `images/<site>/<group>/<group>_<name>.<ext>` → chạy lệnh → tham chiếu `"<group>/<name>.webp"` trong `content/project.ts` → `pnpm test` (test kiểm đường dẫn tồn tại).
- Đổi nội dung ảnh: **đổi tên file** (cache immutable 1 năm).
- Video (`hero_kety.mp4`, 6 MB): chỉ xuất khi `--with-video`; nếu dùng cho hero cần nén lại (≤ 1,5 MB, 720p, H.264) — task AS-01.

## 6. Bảo vệ API ở tầng hạ tầng

Vercel Firewall (task INF-03):
- Rule rate limit: `POST /v1/leads` — 10 request/phút/IP → 429.
- Rule rate limit: `POST /v1/zalo/phone` — 20 request/phút/IP.
- Bật Bot Protection mức cơ bản; theo dõi trước khi bật chế độ chặn.

## 7. Giám sát & vận hành

| Cái gì | Cách | Ngưỡng cảnh báo |
|--------|------|-----------------|
| Sink lỗi | Lọc log `event:"lead.sink_failed"` (Vercel Logs / log drain) | ≥ 1 lần → báo ngay (Slack/Email/Zalo) |
| API sống | Uptime check `GET /health` mỗi 5 phút | 2 lần lỗi liên tiếp |
| Lỗi 5xx | Vercel Observability | > 1% trong 15 phút |
| Lead/ngày | Đếm `event:"lead.created"` hoặc số hàng Sheet | Giảm đột ngột > 50% so với 7 ngày |

Runbook replay lead: docs/03 §6.

## 8. CI/CD

- `.github/workflows/ci.yml` (push `main` + PR): install → build shared → **lint** → **typecheck** → assets → **test** → build Mini App → **kiểm dung lượng gói**.
- Vercel tự deploy Preview cho mỗi PR, Production khi merge `main` (bật Git integration).
- Mini App: deploy thủ công bằng `zmp deploy` (cần đăng nhập Zalo bằng QR) — chưa tự động hoá được trong CI.

## 9. Sao lưu

- Google Sheet: bật lịch sử phiên bản (mặc định); định kỳ export CSV hàng tuần (OPS).
- Lead là dữ liệu cá nhân → hạn chế người có quyền xem Sheet; xem docs/07.
