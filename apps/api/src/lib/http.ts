/**
 * Kiểu HTTP tối thiểu dùng trong API + helper bọc `fetch` toàn cục.
 *
 * Lý do tồn tại: khi Vercel build, bước type-check suy ra kiểu `Response` toàn cục khác máy local
 * (thiếu `ok`/`status`/`json` → TS2339). Mọi chỗ gọi HTTP đi qua `httpFetch` để chỉ phụ thuộc vào
 * kiểu khai báo ở đây, không phụ thuộc lib DOM / @types/node của môi trường build.
 */
export interface HttpResponseLike {
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
  text(): Promise<string>;
}

export interface HttpRequestInit {
  method: string;
  headers: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

export type FetchLike = (url: string, init: HttpRequestInit) => Promise<HttpResponseLike>;

export const httpFetch: FetchLike = (url, init) =>
  fetch(url, init) as unknown as Promise<HttpResponseLike>;
