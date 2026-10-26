/**
 * Rate limit cửa sổ trượt, lưu trong bộ nhớ instance.
 * Best-effort trên serverless (mỗi instance 1 bộ đếm) — lớp chặn chính là Vercel WAF rule
 * (docs/06-infra-deployment.md). Thay bằng Redis/KV nếu cần chính xác tuyệt đối.
 */
export class MemoryRateLimiter {
  private hits = new Map<string, number[]>();

  constructor(
    private readonly max: number,
    private readonly windowMs: number,
  ) {}

  /** Trả về true nếu request được phép. */
  take(key: string, now = Date.now()): boolean {
    const since = now - this.windowMs;
    const recent = (this.hits.get(key) ?? []).filter((t) => t > since);
    if (recent.length >= this.max) {
      this.hits.set(key, recent);
      return false;
    }
    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > 10_000) this.hits.clear(); // chống phình bộ nhớ
    return true;
  }
}
