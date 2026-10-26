// Entrypoint cho Vercel (Hono zero-config): export default 1 Hono app.
import { createApp } from "./app";
import { loadEnv } from "./env";

const app = createApp({ env: loadEnv() });

export default app;
