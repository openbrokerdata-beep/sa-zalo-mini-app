import { MediaImage, Section, SectionHeading } from "@/components/ui";
import { design, legacy } from "@/content/project";

/** Section 04–05 — Gia sản độc bản + Kiến trúc duy mỹ. TODO(FE-02): hoàn thiện layout & motion. */
export function LegacyDesignSection() {
  return (
    <>
      <Section id="legacy">
        <SectionHeading title={legacy.title} italic={legacy.subtitle} />
        {legacy.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="sa-body">
            {p}
          </p>
        ))}
        <ul className="m-0 mt-6 grid list-none grid-cols-3 gap-2 p-0">
          {legacy.features.map((f) => (
            <li key={f.label}>
              <a
                href={`#${f.anchor}`}
                className="flex flex-col items-center gap-2 rounded-xl bg-white p-3 text-center text-[11px] font-semibold text-forest no-underline"
              >
                <MediaImage src={f.icon} alt="" className="h-8 w-8" />
                {f.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="design" className="bg-cream-200">
        <SectionHeading
          title={design.title}
          italic={design.subtitle}
          description={design.description}
        />
        <MediaImage
          src={design.image}
          alt={design.title}
          className="mt-6 aspect-[4/3] w-full rounded-2xl object-cover"
        />
      </Section>
    </>
  );
}
