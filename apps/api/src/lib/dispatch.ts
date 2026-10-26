import type { EnrichedLead } from "@sa/shared";
import { type LeadSink, PermanentSinkError } from "../sinks/types.js";
import { log } from "./logger.js";

export interface DispatchOptions {
  attempts?: number;
  timeoutMs?: number;
  backoffMs?: number;
}

export interface SinkResult {
  sink: string;
  ok: boolean;
  attempts: number;
  error?: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function sendWithRetry(
  sink: LeadSink,
  lead: EnrichedLead,
  opts: Required<DispatchOptions>,
): Promise<SinkResult> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= opts.attempts; attempt++) {
    try {
      await sink.send(lead, AbortSignal.timeout(opts.timeoutMs));
      return { sink: sink.name, ok: true, attempts: attempt };
    } catch (err) {
      lastError = err;
      if (err instanceof PermanentSinkError) {
        return { sink: sink.name, ok: false, attempts: attempt, error: err.message };
      }
      if (attempt < opts.attempts) await sleep(opts.backoffMs * 3 ** (attempt - 1));
    }
  }
  return { sink: sink.name, ok: false, attempts: opts.attempts, error: String(lastError) };
}

/**
 * Đẩy lead song song tới mọi sink, retry lỗi tạm thời (backoff 300ms → 900ms).
 * Sink thất bại được log kèm TOÀN BỘ lead (event `lead.sink_failed`) để replay thủ công —
 * docs/03-lead-pipeline.md §6.
 */
export async function dispatchLead(
  sinks: LeadSink[],
  lead: EnrichedLead,
  options: DispatchOptions = {},
): Promise<SinkResult[]> {
  const opts = { attempts: 3, timeoutMs: 8000, backoffMs: 300, ...options };
  const results = await Promise.all(sinks.map((s) => sendWithRetry(s, lead, opts)));
  for (const r of results) {
    if (!r.ok)
      log("error", "lead.sink_failed", {
        sink: r.sink,
        attempts: r.attempts,
        error: r.error,
        lead,
      });
  }
  return results;
}
