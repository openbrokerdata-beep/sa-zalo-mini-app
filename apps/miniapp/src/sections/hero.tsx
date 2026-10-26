import { useOpenLeadSheet } from "@/components/lead-sheet";
import { MediaImage } from "@/components/ui";
import { hero } from "@/content/project";

/** Section 01 — Hero. TODO(FE-02): banner slider (content.banners) / video nền + animation. */
export function HeroSection() {
  const openLead = useOpenLeadSheet();
  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden bg-forest-700 text-white"
    >
      <MediaImage
        src={hero.image}
        alt="Senturia An Phú"
        eager
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-700 via-forest-700/40 to-transparent" />
      <div className="relative px-4 pb-28" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <p className="sa-eyebrow m-0 text-gold-100">{hero.eyebrow}</p>
        <h1 className="m-0 mt-3 font-display text-[40px] leading-[1.1]">
          {hero.title}
          <em className="block font-normal italic text-gold">{hero.titleItalic}</em>
        </h1>
        <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-white/85">
          {hero.description}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="rounded-full border-0 bg-gold px-5 py-3 text-sm font-semibold text-white"
            onClick={() => openLead({ entryPoint: "hero" })}
          >
            {hero.ctaPrimary}
          </button>
          <a
            href="#overview"
            className="rounded-full border border-solid border-white/60 px-5 py-3 text-sm font-semibold text-white no-underline"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
