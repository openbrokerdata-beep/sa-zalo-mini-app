import { config, formatHotline } from "@/config";
import { track } from "@/lib/track";
import { callHotline, chatWithOA } from "@/lib/zalo";
import { useOpenLeadSheet } from "./lead-sheet";

/** Thanh CTA cố định đáy màn hình: Gọi · Chat Zalo · Đăng ký. TODO(FE-05): icon + animation. */
export function StickyActionBar() {
  const openLead = useOpenLeadSheet();
  return (
    <nav
      aria-label="Liên hệ nhanh"
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-0 border-t border-solid border-cream-200 bg-white/95 px-3 pt-2 backdrop-blur"
      style={{ paddingBottom: "calc(8px + env(safe-area-inset-bottom))" }}
    >
      <button
        type="button"
        className="flex-1 rounded-full border border-solid border-forest bg-white py-3 text-sm font-semibold text-forest"
        onClick={() => {
          track("call_hotline", { from: "sticky_bar" });
          void callHotline();
        }}
      >
        Gọi {formatHotline(config.hotline)}
      </button>
      {config.zaloOaId && (
        <button
          type="button"
          className="flex-1 rounded-full border border-solid border-forest bg-white py-3 text-sm font-semibold text-forest"
          onClick={() => {
            track("chat_oa", { from: "sticky_bar" });
            void chatWithOA();
          }}
        >
          Chat Zalo
        </button>
      )}
      <button
        type="button"
        className="flex-[1.3] rounded-full border-0 bg-gold py-3 text-sm font-semibold text-white"
        onClick={() => openLead({ entryPoint: "sticky_bar" })}
      >
        Đăng ký tư vấn
      </button>
    </nav>
  );
}
