import { Section, SectionHeading } from "@/components/ui";
import { overview } from "@/content/project";

/** Section 02 — Tổng quan + 4 chỉ số. */
export function OverviewSection() {
  return (
    <Section id="overview">
      <SectionHeading
        eyebrow={overview.eyebrow}
        title={overview.title}
        italic={overview.titleItalic}
        description={overview.lead}
      />
      <p className="sa-body">{overview.description}</p>
      <dl className="mt-6 grid grid-cols-2 gap-3">
        {overview.facts.map((f) => (
          <div key={f.label} className="m-0 rounded-2xl bg-white p-4">
            <dt className="text-xs uppercase tracking-wide text-ink-muted">{f.label}</dt>
            <dd className="m-0 mt-1 font-display text-3xl text-forest">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
