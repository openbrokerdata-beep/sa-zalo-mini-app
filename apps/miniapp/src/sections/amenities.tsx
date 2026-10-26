import { MediaImage, Section, SectionHeading } from "@/components/ui";
import { amenities, amenitiesSection } from "@/content/project";

/** Section 08 — 12 tiện ích, vuốt ngang. TODO(FE-03): polish carousel + chỉ báo vị trí. */
export function AmenitiesSection() {
  return (
    <Section id="amenities">
      <SectionHeading
        title={amenitiesSection.title}
        italic={amenitiesSection.subtitle}
        description={amenitiesSection.description}
      />
      <div className="-mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
        {amenities.map((a) => (
          <figure key={a.order} className="m-0 w-[70%] shrink-0 snap-start">
            <MediaImage
              src={a.image}
              alt={a.name}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-2 text-sm font-medium text-forest">
              {String(a.order).padStart(2, "0")} · {a.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
