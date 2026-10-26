import { MediaImage, Section } from "@/components/ui";
import { nature } from "@/content/project";

/** Section 03 — Thiên nhiên trước thềm nhà. TODO(FE-02): hiệu ứng reveal khi cuộn. */
export function NatureSection() {
  return (
    <Section id="nature" className="bg-forest text-white">
      <MediaImage
        src={nature.image}
        alt={nature.title}
        className="mb-6 aspect-[4/5] w-full rounded-2xl object-cover"
      />
      <h2 className="m-0 font-display text-[26px] leading-tight text-gold">{nature.title}</h2>
      <p className="mt-1 text-sm italic text-white/80">{nature.subtitle}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-white/85">{nature.description}</p>
    </Section>
  );
}
