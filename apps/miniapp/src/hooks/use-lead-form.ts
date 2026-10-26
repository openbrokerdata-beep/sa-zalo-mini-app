import { CONSENT_VERSION, type LeadInput, leadInputSchema, type ProductInterest } from "@sa/shared";
import { useCallback, useMemo, useState } from "react";
import { config } from "@/config";
import { leadForm } from "@/content/project";
import { ApiRequestError, api } from "@/lib/api";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/track";
import { getZaloUserId, requestZaloPhone } from "@/lib/zalo";

export interface LeadFormValues {
  fullName: string;
  phone: string;
  email: string;
  productInterest: ProductInterest;
  message: string;
  consent: boolean;
  website: string; // honeypot
}

type Errors = Partial<Record<keyof LeadFormValues | "form", string>>;

const DRAFT_KEY = "sa_lead_draft";

function uuid(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = ((b[6] ?? 0) & 0x0f) | 0x40;
  b[8] = ((b[8] ?? 0) & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function loadDraft(): Partial<LeadFormValues> {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "{}") as Partial<LeadFormValues>;
  } catch {
    return {};
  }
}

/**
 * Toàn bộ logic form lead: state, validate (cùng schema với server), lấy SĐT Zalo, gửi, lưu nháp khi lỗi.
 * UI (components/lead-form.tsx) chỉ render — không chứa logic nghiệp vụ.
 */
export function useLeadForm(opts: { entryPoint?: string; defaultInterest?: ProductInterest } = {}) {
  const [values, setValues] = useState<LeadFormValues>(() => ({
    fullName: "",
    phone: "",
    email: "",
    productInterest: opts.defaultInterest ?? "undecided",
    message: "",
    consent: false,
    website: "",
    ...loadDraft(),
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [phoneProof, setPhoneProof] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [fetchingPhone, setFetchingPhone] = useState(false);
  // 1 submissionId cho mỗi lần mở form → retry không tạo lead trùng.
  const submissionId = useMemo(uuid, []);

  const setField = useCallback(
    <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) => {
      setValues((v) => ({ ...v, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined, form: undefined }));
      if (key === "phone") setPhoneProof(undefined); // sửa tay → không còn là số đã xác thực
    },
    [],
  );

  const fillPhoneFromZalo = useCallback(async () => {
    setFetchingPhone(true);
    try {
      const { phone, phoneProof: proof } = await requestZaloPhone();
      setValues((v) => ({ ...v, phone }));
      setErrors((e) => ({ ...e, phone: undefined }));
      setPhoneProof(proof);
      track("zalo_phone_granted");
    } catch {
      track("zalo_phone_denied");
    } finally {
      setFetchingPhone(false);
    }
  }, []);

  const submit = useCallback(async (): Promise<string | null> => {
    const payload: LeadInput = {
      submissionId,
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      productInterest: values.productInterest,
      message: values.message || undefined,
      consent: values.consent as true,
      consentVersion: CONSENT_VERSION,
      phoneProof,
      zaloUserId: await getZaloUserId(),
      attribution: getAttribution(opts.entryPoint),
      client: {
        appVersion: config.appVersion,
        platform: navigator.userAgent.includes("iPhone") ? "ios" : "android",
      },
      website: values.website || undefined,
    };

    const parsed = leadInputSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return null;
    }

    setSubmitting(true);
    try {
      const res = await api.createLead(payload);
      localStorage.removeItem(DRAFT_KEY);
      track("lead_submitted", {
        entryPoint: opts.entryPoint ?? "",
        interest: values.productInterest,
      });
      return res.leadId;
    } catch (err) {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...values, consent: false, website: "" }));
      } catch {}
      const status = err instanceof ApiRequestError ? err.status : -1;
      track("lead_failed", { status });
      if (err instanceof ApiRequestError && err.body?.error.fields) {
        setErrors(err.body.error.fields as Errors);
      } else {
        const apiMessage = err instanceof ApiRequestError ? err.body?.error.message : undefined;
        setErrors({ form: apiMessage ?? leadForm.errorFallback });
      }
      return null;
    } finally {
      setSubmitting(false);
    }
  }, [submissionId, values, phoneProof, opts.entryPoint]);

  return {
    values,
    errors,
    setField,
    submit,
    submitting,
    fetchingPhone,
    fillPhoneFromZalo,
    phoneVerified: Boolean(phoneProof),
  };
}
