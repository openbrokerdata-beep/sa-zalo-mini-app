export interface ApiError {
  ok: false;
  error: {
    code:
      | "VALIDATION_ERROR"
      | "RATE_LIMITED"
      | "SINK_UNAVAILABLE"
      | "ZALO_ERROR"
      | "UNAUTHORIZED"
      | "NOT_FOUND"
      | "INTERNAL";
    message: string;
    fields?: Record<string, string>;
  };
}

export interface CreateLeadResponse {
  ok: true;
  leadId: string;
  duplicate?: boolean;
}

export interface ZaloPhoneRequest {
  /** token trả về từ getPhoneNumber() — dùng 1 lần, hết hạn sau 2 phút */
  code: string;
  /** user access token từ getAccessToken() */
  accessToken: string;
}

export interface ZaloPhoneResponse {
  ok: true;
  phone: string;
  /** chữ ký HMAC, gửi kèm lead để server đánh dấu phoneVerified */
  phoneProof: string;
}
