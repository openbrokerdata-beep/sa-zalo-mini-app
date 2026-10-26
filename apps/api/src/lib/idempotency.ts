/**
 * Ghi nhớ submissionId -> leadId để bấm "Gửi" 2 lần không tạo 2 lead.
 * Phạm vi 1 instance; các sink cũng phải chống trùng theo submissionId (docs/03-lead-pipeline.md).
 */
export class MemoryIdempotencyStore {
  private map = new Map<string, { leadId: string; exp: number }>();

  constructor(private readonly ttlMs = 60 * 60 * 1000) {}

  get(key: string, now = Date.now()): string | undefined {
    const hit = this.map.get(key);
    if (!hit) return undefined;
    if (hit.exp < now) {
      this.map.delete(key);
      return undefined;
    }
    return hit.leadId;
  }

  set(key: string, leadId: string, now = Date.now()) {
    if (this.map.size > 10_000) this.map.clear();
    this.map.set(key, { leadId, exp: now + this.ttlMs });
  }
}
