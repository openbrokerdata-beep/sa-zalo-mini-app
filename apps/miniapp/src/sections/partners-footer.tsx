import { useOpenLeadSheet } from "@/components/lead-sheet";
import { MediaImage, Section, SectionHeading } from "@/components/ui";
import { partners, partnersSection, project } from "@/content/project";

/** Section 12–13 — Đối tác + CTA cuối trang + footer pháp nhân. */
export function PartnersFooterSection() {
  const openLead = useOpenLeadSheet();
  return (
    <>
      <Section id="partners">
        <SectionHeading title={partnersSection.title} description={partnersSection.description} />
        <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-3 p-0">
          {partners.map((p) => (
            <li key={p.name} className="rounded-xl bg-white p-3 text-center">
              <MediaImage src={p.logo} alt={p.name} className="mx-auto h-10 object-contain" />
              <p className="m-0 mt-2 text-[11px] uppercase tracking-wide text-ink-muted">
                {p.role}
              </p>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="cta" className="bg-forest-700 text-center text-white">
        <h2 className="m-0 font-display text-[26px]">
          Tìm hiểu ngôi nhà <em className="block text-gold">tiếp theo của bạn.</em>
        </h2>
        <button
          type="button"
          className="mt-6 rounded-full border-0 bg-gold px-6 py-3 text-sm font-semibold text-white"
          onClick={() => openLead({ entryPoint: "footer_cta" })}
        >
          Nhận thông tin dự án
        </button>
      </Section>
      <footer className="bg-forest-700 px-4 pb-32 pt-2 text-[11px] leading-relaxed text-white/60">
        <p className="m-0 font-semibold text-white/80">{project.developer.toUpperCase()}</p>
        <p className="m-0">
          MST {project.taxCode} · {project.taxCodeIssued}
        </p>
        <p className="m-0 mt-1">{project.address}</p>
        <p className="mt-3 italic">{project.disclaimer}</p>
      </footer>
    </>
  );
}
