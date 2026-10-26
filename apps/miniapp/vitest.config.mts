import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Tách khỏi vite.config.mts (root = ./src) để vitest tìm được thư mục test/.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["test/**/*.test.{ts,tsx}"],
    environment: "node",
  },
});
