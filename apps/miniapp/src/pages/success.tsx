import { useLocation } from "react-router-dom";
import { Button, Page, useNavigate } from "zmp-ui";
import { config } from "@/config";
import { leadForm } from "@/content/project";
import { followOfficialAccount } from "@/lib/zalo";

/** Trang cảm ơn. TODO(FE-04): gợi ý quan tâm OA (followOA) để nhận bảng giá qua tin nhắn. */
export function SuccessPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { leadId?: string } };
  return (
    <Page className="flex flex-col items-center justify-center bg-cream px-6 text-center">
      <h1 className="m-0 font-display text-3xl text-forest">{leadForm.successTitle}</h1>
      <p className="mt-3 text-[15px] text-ink-muted">{leadForm.successMessage}</p>
      {state?.leadId && <p className="text-xs text-ink-muted">Mã đăng ký: {state.leadId}</p>}
      <div className="mt-6 flex w-full flex-col gap-3">
        {config.zaloOaId && (
          <Button fullWidth onClick={() => void followOfficialAccount()}>
            Quan tâm Zalo OA để nhận bảng giá
          </Button>
        )}
        <Button fullWidth variant="secondary" onClick={() => navigate("/", { replace: true })}>
          Về trang chủ
        </Button>
      </div>
    </Page>
  );
}
