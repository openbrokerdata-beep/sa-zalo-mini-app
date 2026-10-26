# Senturia An Phú — Zalo Mini App thu lead

Landing page dự án **Senturia An Phú** dưới dạng **Zalo Mini App**, thu lead và đẩy sang **CRM** + **Google Sheets** qua một **Lead API** serverless.

```
Zalo Mini App (React + ZaUI)  ──HTTPS──▶  Lead API (Hono · Vercel)  ──▶  Google Sheets
         │                                     │                    └─▶  CRM
         └────────── ảnh WebP ◀── CDN /media ──┘                    └─▶  graph.zalo.me (xác thực SĐT)
```

## Bắt đầu nhanh

```bash
corepack enable                      # pnpm 9
pnpm install
pnpm --filter @sa/shared build
cp apps/api/.env.example apps/api/.env          # điền PHONE_PROOF_SECRET, IP_HASH_SALT
cp apps/miniapp/.env.example apps/miniapp/.env
pnpm assets:optimize                 # images/ (61 MB) → apps/api/public/media (~9 MB WebP)
pnpm dev                             # API :8787 + Mini App :3000
pnpm check                           # lint + typecheck + test
```

## Cấu trúc

| Thư mục | Nội dung |
|---------|----------|
| `apps/miniapp` | Zalo Mini App — React 18, zmp-ui, zmp-sdk, Tailwind, Vite |
| `apps/api` | Lead API — Hono trên Vercel; sink Google Sheets / CRM webhook |
| `packages/shared` | Schema lead (zod), kiểu API, chuẩn hoá SĐT — dùng chung |
| `scripts` | Nén ảnh → CDN, kiểm dung lượng gói |
| `docs` | Kiến trúc, quyết định, hợp đồng API, Zalo, UI, hạ tầng, bảo mật, QA, **phân công task** |
| `images`, `script`, `Senturia-An-Phu_Tai-lieu-thong-nhat.md` | Tư liệu nguồn (chỉ đọc) |

## Tài liệu

Bắt đầu từ [docs/00-overview.md](docs/00-overview.md) — mục tiêu, phạm vi, **câu hỏi mở cần khách hàng chốt** (CRM, Google Sheet, hotline, OA…).
Hướng dẫn cho agent: [CLAUDE.md](CLAUDE.md). Kế hoạch giao việc: [docs/09-task-breakdown.md](docs/09-task-breakdown.md).

## Trạng thái

- ✅ Kiến trúc, monorepo, CI, tài liệu
- ✅ Lead API: `POST /v1/leads`, `POST /v1/zalo/phone`, sink Sheets/CRM-webhook/console, retry, idempotency, rate limit, honeypot — có test
- ✅ Mini App: khung chạy được, đủ route, 13 section ở mức cơ bản, form lead end-to-end, nội dung dự án đã nhập
- ✅ Pipeline ảnh WebP + kiểm tra đường dẫn ảnh tự động
- ⏳ Hoàn thiện UI theo docs/05 (Wave 1–2)
- ⛔ Chờ khách hàng: thông tin CRM, Google Sheet, tài khoản Zalo/OA, domain
