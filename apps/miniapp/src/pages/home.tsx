import { Page } from "zmp-ui";
import { StickyActionBar } from "@/components/sticky-action-bar";
import { AmenitiesSection } from "@/sections/amenities";
import { FloorPlansSection } from "@/sections/floor-plans";
import { HeroSection } from "@/sections/hero";
import { LegacyDesignSection } from "@/sections/legacy-design";
import { LocationSection } from "@/sections/location";
import { NatureSection } from "@/sections/nature";
import { OverviewSection } from "@/sections/overview";
import { PartnersFooterSection } from "@/sections/partners-footer";
import { ProductsSection } from "@/sections/products";
import { ProgressLegalSection } from "@/sections/progress-legal";

/** Landing 1 trang. Thứ tự section = hành trình: cảm xúc → sản phẩm → bằng chứng → CTA. */
export function HomePage() {
  return (
    <Page className="bg-cream" hideScrollbar>
      <HeroSection />
      <OverviewSection />
      <NatureSection />
      <LegacyDesignSection />
      <ProductsSection />
      <FloorPlansSection />
      <AmenitiesSection />
      <LocationSection />
      <ProgressLegalSection />
      <PartnersFooterSection />
      <StickyActionBar />
    </Page>
  );
}
