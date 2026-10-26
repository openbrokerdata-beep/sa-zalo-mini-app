import type { ProductInterest } from "@sa/shared";

/** Đường dẫn tương đối trong CDN media, vd. "san-pham/arena1.webp" — dùng với media(). */
export type MediaPath = string;

export interface Fact {
  value: string;
  label: string;
}

export interface Product {
  id: "biet-thu-song-lap" | "nha-pho-vuon" | "nha-pho-thuong-mai";
  interest: ProductInterest;
  name: string;
  summary: string;
  description: string;
  cover: MediaPath;
  gallery: { src: MediaPath; caption: string }[];
}

export interface UnitType {
  code: string;
  group: string;
  count: number;
  area: string;
  floors: string;
  color: string;
  plan: MediaPath;
}

export interface Amenity {
  order: number;
  name: string;
  image: MediaPath;
}

export interface ProgressMilestone {
  label: string;
  description: string;
  images: MediaPath[];
}

export interface LegalItem {
  title: string;
  content: string;
}

export interface Partner {
  role: string;
  name: string;
  logo: MediaPath;
}
