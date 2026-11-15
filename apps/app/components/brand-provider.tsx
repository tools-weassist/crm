"use client";

import { BrandMark } from "@crm/ui/components/brand-mark";
import { createContext, type ReactNode, useContext } from "react";

export type BrandView = {
	name: string;
	logoUrl?: string;
	homeUrl?: string;
};

const BrandContext = createContext<BrandView>({ name: "CRM" });

export function BrandProvider({
	brand,
	children,
}: {
	brand: BrandView;
	children: ReactNode;
}) {
	return <BrandContext value={brand}>{children}</BrandContext>;
}

export function useBrand(): BrandView {
	return useContext(BrandContext);
}

export function AppBrandMark({ className }: { className?: string }) {
	const brand = useBrand();
	return (
		<BrandMark
			name={brand.name}
			logoUrl={brand.logoUrl}
			className={className}
		/>
	);
}
