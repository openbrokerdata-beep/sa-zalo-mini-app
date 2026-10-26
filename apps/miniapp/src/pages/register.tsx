import { Header, Page } from "zmp-ui";
import { LeadForm } from "@/components/lead-form";
import { leadForm } from "@/content/project";
import { getAttribution } from "@/lib/attribution";

/** Form full-screen — đích của deep link (QR sự kiện, tin nhắn OA, quảng cáo): zalo.me/s/<APP_ID>/register?utm_source=… */
export function RegisterPage() {
  const entry = getAttribution().entryPoint ?? "register_page";
  return (
    <Page className="bg-cream">
      <Header title={leadForm.title} />
      <div className="px-4 pb-10 pt-4">
        <p className="mb-5 mt-0 text-sm text-ink-muted">{leadForm.subtitle}</p>
        <LeadForm entryPoint={entry} />
      </div>
    </Page>
  );
}
