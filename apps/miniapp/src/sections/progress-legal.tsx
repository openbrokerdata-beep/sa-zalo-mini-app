import { Section, SectionHeading } from "@/components/ui";
import { legal, progress } from "@/content/project";

/** Section 10–11 — Tiến độ + Pháp lý. TODO(FE-03): tab mốc tiến độ kèm ảnh, accordion pháp lý. */
export function ProgressLegalSection() {
  const latest = progress[0];
  return (
    <>
      <Section id="progress">
        <SectionHeading
          eyebrow="TIẾN ĐỘ XÂY DỰNG"
          title={latest?.label ?? ""}
          description={latest?.description}
        />
      </Section>
      <Section id="legal" className="bg-white">
        <SectionHeading eyebrow="PHÁP LÝ" title="Thông tin để" italic="bạn tìm hiểu rõ hơn." />
        <ol className="m-0 mt-4 p-0 pl-5 text-sm">
          {legal.map((l) => (
            <li key={l.title} className="mb-3">
              <strong className="text-forest">{l.title}</strong>
              <p className="m-0 mt-1 text-ink-muted">{l.content}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
