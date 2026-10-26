import type { ProductInterest } from "@sa/shared";
import { createContext, type ReactNode, useCallback, useContext, useState } from "react";
import { Sheet } from "zmp-ui";
import { leadForm } from "@/content/project";
import { track } from "@/lib/track";
import { LeadForm } from "./lead-form";

interface OpenOptions {
  entryPoint: string;
  defaultInterest?: ProductInterest;
}

const LeadSheetContext = createContext<(opts: OpenOptions) => void>(() => {});

/** Mọi CTA "Đăng ký" trong app gọi `useOpenLeadSheet()({ entryPoint: "..." })`. */
export const useOpenLeadSheet = () => useContext(LeadSheetContext);

export function LeadSheetProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<OpenOptions | null>(null);

  const open = useCallback((o: OpenOptions) => {
    track("open_lead_form", { entryPoint: o.entryPoint });
    setOpts(o);
  }, []);

  return (
    <LeadSheetContext.Provider value={open}>
      {children}
      <Sheet
        visible={opts !== null}
        onClose={() => setOpts(null)}
        autoHeight
        mask
        handler
        swipeToClose
      >
        <div className="max-h-[85vh] overflow-y-auto px-4 pb-8 pt-2">
          <h3 className="m-0 font-display text-2xl text-forest">{leadForm.title}</h3>
          <p className="mb-4 mt-1 text-sm text-ink-muted">{leadForm.subtitle}</p>
          {opts && (
            // key: mỗi lần mở là 1 form mới (submissionId mới)
            <LeadForm
              key={opts.entryPoint}
              entryPoint={opts.entryPoint}
              defaultInterest={opts.defaultInterest}
            />
          )}
        </div>
      </Sheet>
    </LeadSheetContext.Provider>
  );
}
