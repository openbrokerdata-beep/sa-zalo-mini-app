// Entrypoint cho Vercel (Hono zero-config): export default 1 Hono app.
// Lưu ý: package là ESM và Vercel không bundle → import tương đối PHẢI có đuôi ".js".
import { Hono } from "hono";
import { createApp } from "./create-app.js";
import { loadEnv } from "./env.js";

function bootstrap() {
  try {
    return createApp({ env: loadEnv() });
  } catch (err) {
    // Thiếu/sai biến môi trường: không để function crash (500 trống) mà trả lỗi đọc được.
    // Thông báo chỉ chứa TÊN biến, không chứa giá trị.
    const message = err instanceof Error ? err.message : String(err);
    console.error(JSON.stringify({ level: "error", event: "boot.config_invalid", message }));
    const fallback = new Hono();
    fallback.all("*", (c) =>
      c.json(
        {
          ok: false,
          error: { code: "INTERNAL", message: "Cấu hình API chưa hợp lệ", detail: message },
        },
        500,
      ),
    );
    return fallback;
  }
}

export default bootstrap();
