import { useParams } from "react-router-dom";
import { Header, Page } from "zmp-ui";
import { useOpenLeadSheet } from "@/components/lead-sheet";
import { MediaImage } from "@/components/ui";
import { products } from "@/content/project";

/** Chi tiết 1 dòng sản phẩm: mô tả + gallery + CTA. TODO(FE-03): ImageViewer phóng to ảnh. */
export function ProductPage() {
  const { id } = useParams();
  const openLead = useOpenLeadSheet();
  const product = products.find((p) => p.id === id);
  if (!product) return <Page className="p-6">Không tìm thấy sản phẩm.</Page>;

  return (
    <Page className="bg-cream">
      <Header title={product.name} />
      <MediaImage
        src={product.cover}
        alt={product.name}
        eager
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="px-4 pb-32 pt-5">
        <p className="m-0 text-sm text-gold-600">{product.summary}</p>
        <p className="sa-body">{product.description}</p>
        <div className="mt-6 flex flex-col gap-4">
          {product.gallery.map((g) => (
            <figure key={g.src} className="m-0">
              <MediaImage src={g.src} alt={g.caption} className="w-full rounded-2xl" />
              <figcaption className="mt-2 text-xs uppercase tracking-wide text-ink-muted">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div
        className="fixed inset-x-0 bottom-0 bg-white/95 px-4 pt-2"
        style={{ paddingBottom: "calc(8px + env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          className="w-full rounded-full border-0 bg-gold py-3 text-sm font-semibold text-white"
          onClick={() =>
            openLead({ entryPoint: `product_${product.id}`, defaultInterest: product.interest })
          }
        >
          Nhận báo giá {product.name}
        </button>
      </div>
    </Page>
  );
}
