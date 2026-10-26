import { PRODUCT_INTERESTS, type ProductInterest } from "@sa/shared";
import type React from "react";
import { Button, Checkbox, Input, Select, useNavigate } from "zmp-ui";
import { config, formatHotline } from "@/config";
import { leadForm } from "@/content/project";
import { useLeadForm } from "@/hooks/use-lead-form";
import { callHotline } from "@/lib/zalo";

const { Option } = Select;

interface Props {
  /** Nút/section mở form — ghi vào attribution.entryPoint */
  entryPoint?: string;
  defaultInterest?: ProductInterest;
  onSubmitted?: (leadId: string) => void;
}

/**
 * Form đăng ký tư vấn — dùng chung cho bottom sheet (LeadSheet) và trang /register.
 * TODO(FE-04): hoàn thiện UI theo docs/05-ui-content-spec.md §4 (trạng thái loading, lỗi, a11y).
 */
export function LeadForm({ entryPoint, defaultInterest, onSubmitted }: Props) {
  const navigate = useNavigate();
  const f = useLeadForm({ entryPoint, defaultInterest });

  const onSubmit = async () => {
    const leadId = await f.submit();
    if (!leadId) return;
    if (onSubmitted) onSubmitted(leadId);
    else navigate("/success", { state: { leadId } });
  };

  return (
    <form
      className="flex flex-col gap-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        void onSubmit();
      }}
    >
      <Input
        label="Họ và tên *"
        placeholder="Nguyễn Văn A"
        value={f.values.fullName}
        onChange={(e) => f.setField("fullName", e.target.value)}
        status={f.errors.fullName ? "error" : undefined}
        errorText={f.errors.fullName}
        maxLength={100}
      />

      <div>
        <Input
          label="Số điện thoại *"
          placeholder="09xx xxx xxx"
          type="text"
          inputMode="tel"
          value={f.values.phone}
          onChange={(e) => f.setField("phone", e.target.value)}
          status={f.errors.phone ? "error" : f.phoneVerified ? "success" : undefined}
          errorText={f.errors.phone}
          helperText={f.phoneVerified ? "Đã xác thực qua Zalo" : undefined}
          maxLength={15}
        />
        {!f.phoneVerified && (
          <button
            type="button"
            className="mt-2 border-0 bg-transparent p-0 text-sm font-medium text-forest underline"
            onClick={() => void f.fillPhoneFromZalo()}
            disabled={f.fetchingPhone}
          >
            {f.fetchingPhone ? "Đang lấy số…" : leadForm.zaloPhoneButton}
          </button>
        )}
      </div>

      <Input
        label="Email"
        placeholder="email@example.com"
        type="text"
        inputMode="email"
        value={f.values.email}
        onChange={(e) => f.setField("email", e.target.value)}
        status={f.errors.email ? "error" : undefined}
        errorText={f.errors.email}
      />

      <Select
        label="Sản phẩm quan tâm"
        value={f.values.productInterest}
        onChange={(v) => f.setField("productInterest", v as ProductInterest)}
        closeOnSelect
      >
        {PRODUCT_INTERESTS.map((p) => (
          <Option key={p.value} value={p.value} title={p.label} />
        ))}
      </Select>

      <Input.TextArea
        label="Lời nhắn"
        placeholder="Quý khách cần tư vấn thêm điều gì?"
        value={f.values.message}
        onChange={(e) => f.setField("message", e.target.value)}
        maxLength={1000}
      />

      {/* Honeypot: ẩn với người dùng, bot hay tự điền */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        value={f.values.website}
        onChange={(e) => f.setField("website", e.target.value)}
      />

      <div>
        <Checkbox
          value="consent"
          checked={f.values.consent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            f.setField("consent", e.target.checked)
          }
        >
          <span className="text-[13px] leading-snug text-ink-muted">
            {leadForm.consentText}{" "}
            <button
              type="button"
              className="border-0 bg-transparent p-0 text-[13px] text-forest underline"
              onClick={(e) => {
                e.preventDefault(); // không toggle checkbox khi bấm link
                navigate("/privacy");
              }}
            >
              {leadForm.consentLink}
            </button>
          </span>
        </Checkbox>
        {f.errors.consent && <p className="mt-1 text-xs text-red-600">{f.errors.consent}</p>}
      </div>

      {f.errors.form && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {f.errors.form}{" "}
          <button
            type="button"
            className="border-0 bg-transparent p-0 font-semibold underline"
            onClick={() => void callHotline()}
          >
            Gọi {formatHotline(config.hotline)}
          </button>
        </p>
      )}

      <Button htmlType="submit" fullWidth loading={f.submitting} disabled={f.submitting}>
        {leadForm.submit}
      </Button>
    </form>
  );
}
