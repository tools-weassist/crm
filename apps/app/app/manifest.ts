import type { MetadataRoute } from "next";
import { getBrand } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
	const brand = getBrand();

	return {
		name: brand.name,
		short_name: brand.name,
		icons: brand.faviconUrl
			? [{ src: brand.faviconUrl, sizes: "any" }]
			: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
		theme_color: "#ffffff",
		background_color: "#ffffff",
		display: "standalone",
	};
}
