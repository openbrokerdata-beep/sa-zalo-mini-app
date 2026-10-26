import { MediaImage, Section } from "@/components/ui";
import { location } from "@/content/project";

/** Section 09 — Vị trí. TODO(FE-03): xếp lớp 4 SVG bản đồ + nút mở Google Maps (openWebview). */
export function LocationSection() {
  return (
    <Section id="location" className="bg-forest text-white">
      <h2 className="m-0 font-display text-[28px] text-gold">
        {location.title} <em className="font-normal">{location.subtitle}</em>
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-white/85">{location.description}</p>
      <ul className="m-0 mt-6 grid list-none grid-cols-3 gap-2 p-0">
        {location.milestones.map((m) => (
          <li key={m.place} className="rounded-xl bg-white/10 p-3 text-center">
            <MediaImage src={m.icon} alt="" className="mx-auto h-7 w-7" />
            <p className="m-0 mt-2 font-display text-lg text-gold">{m.time}</p>
            <p className="m-0 text-[11px] text-white/80">{m.place}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] italic text-white/60">{location.caption}</p>
    </Section>
  );
}
