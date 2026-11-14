import "server-only";
import { type Brand, readBrand } from "@crm/validation/brand";
import type { BrandView } from "@/components/brand-provider";

export function getBrand(): Brand {
	return readBrand();
}

export function brandView(brand: Brand): BrandView {
	return { name: brand.name, logoUrl: brand.logoUrl, homeUrl: brand.homeUrl };
}
