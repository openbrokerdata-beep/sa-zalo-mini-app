import { Section, SectionHeading } from "@/components/ui";
import { floorPlan } from "@/content/project";

/**
 * Section 07 — Mặt bằng. TODO(FE-03): tab "Tổng thể / Căn", ảnh zoom được (ImageViewer của zmp-ui),
 * chạm 1 mã căn → mở LeadSheet với entryPoint "floorplan_<CODE>".
 */
export function FloorPlansSection() {
  return (
    <Section id="floorplans" className="bg-white">
      <SectionHeading title={floorPlan.title} description={floorPlan.note} />
      <ul className="m-0 mt-4 list-none p-0 text-sm">
        {floorPlan.units.map((u) => (
          <li
            key={u.code}
            className="flex items-center gap-3 border-0 border-b border-solid border-cream-200 py-2"
          >
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: u.color }} />
            <strong className="w-10 text-forest">{u.code}</strong>
            <span className="flex-1 text-ink-muted">
              {u.group} · {u.count} căn
            </span>
            <span className="text-ink">{u.area} m²</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
