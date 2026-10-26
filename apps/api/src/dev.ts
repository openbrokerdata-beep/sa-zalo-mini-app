// Chạy local: `pnpm dev:api` → http://localhost:8787
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { createApp } from "./app.js";
import { loadEnv } from "./env.js";

try {
  process.loadEnvFile(".env");
} catch {
  console.warn("Không thấy apps/api/.env — dùng biến môi trường hệ thống (xem .env.example)");
}

const port = Number(process.env.PORT ?? 8787);
const root = new Hono();
// Giả lập Vercel CDN phục vụ public/media ở local.
root.use("/media/*", serveStatic({ root: "./public" }));
root.route("/", createApp({ env: loadEnv() }));

serve({ fetch: root.fetch, port }, (info) => {
  console.info(`Lead API: http://localhost:${info.port}  (health: /health)`);
});
