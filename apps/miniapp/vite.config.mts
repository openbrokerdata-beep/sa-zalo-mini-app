import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import zaloMiniApp from "zmp-vite-plugin";

// Cấu trúc theo template chính thức của Zalo (zaui-coffee): root = ./src, base = "" (đường dẫn tương đối).
export default defineConfig({
  root: "./src",
  base: "",
  envDir: "..",
  publicDir: "../public",
  plugins: [react(), zaloMiniApp()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    // zmp-vite-plugin mặc định outDir "www" tính từ root (= src/www), còn `zmp deploy` đọc ./www
    // tính từ thư mục chạy lệnh → đặt rõ apps/miniapp/www cho khớp.
    outDir: "../www",
    emptyOutDir: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
  },
  server: { port: 3000 },
});
