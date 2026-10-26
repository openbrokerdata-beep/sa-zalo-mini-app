type Level = "info" | "warn" | "error";

/** Log JSON 1 dòng — Vercel / log drain đọc được. KHÔNG log PII, trừ event `lead.sink_failed` (để replay). */
export function log(level: Level, event: string, data: Record<string, unknown> = {}) {
  const line = JSON.stringify({ level, event, ts: new Date().toISOString(), ...data });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}
