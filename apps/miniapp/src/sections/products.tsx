import { useNavigate } from "zmp-ui";
import { MediaImage, Section, SectionHeading } from "@/components/ui";
import { products, productsSection } from "@/content/project";

/** Section 06 — 3 dòng sản phẩm; chạm card → /product/:id (gallery + CTA). */
export function ProductsSection() {
  const navigate = useNavigate();
  return (
    <Section id="products">
      <SectionHeading
        title={productsSection.title}
        italic={productsSection.subtitle}
        description={productsSection.description}
      />
      <div className="mt-6 flex flex-col gap-4">
        {products.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => navigate(`/product/${p.id}`)}
            className="overflow-hidden rounded-2xl border-0 bg-white p-0 text-left shadow-sm"
          >
            <MediaImage src={p.cover} alt={p.name} className="aspect-[16/10] w-full object-cover" />
            <div className="p-4">
              <h3 className="m-0 font-display text-xl text-forest">{p.name}</h3>
              <p className="m-0 mt-1 text-sm text-gold-600">{p.summary}</p>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}
