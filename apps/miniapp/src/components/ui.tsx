import type { ReactNode } from "react";
import { media } from "@/config";

/** Ảnh từ CDN, lazy-load mặc định. `src` là MediaPath (vd. "san-pham/arena1.webp"). */
export function MediaImage({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={media(src)}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

/** Tiêu đề section chuẩn: eyebrow + title (+ phần in nghiêng) + mô tả. */
export function SectionHeading({
  eyebrow,
  title,
  italic,
  description,
}: {
  eyebrow?: string;
  title: string;
  italic?: string;
  description?: ReactNode;
}) {
  return (
    <header>
      {eyebrow && <p className="sa-eyebrow m-0">{eyebrow}</p>}
      <h2 className="sa-title mb-0">
        {title}
        {italic && <em className="block font-normal italic text-gold">{italic}</em>}
      </h2>
      {description && <p className="sa-body mb-0">{description}</p>}
    </header>
  );
}

export function Section({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`sa-section ${className}`}>
      {children}
    </section>
  );
}
