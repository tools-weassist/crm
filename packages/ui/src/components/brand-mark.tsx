import Logo from "@crm/ui/components/logo";
import { cn } from "@crm/ui/lib/utils";

type BrandMarkProps = {
	name: string;
	logoUrl?: string;
	className?: string;
};

function BrandMark({ name, logoUrl, className }: BrandMarkProps) {
	if (!logoUrl) {
		return (
			<Logo data-slot="brand-mark" role="img" aria-label={name} className={className} />
		);
	}

	return (
		<img
			data-slot="brand-mark"
			src={logoUrl}
			alt={name}
			className={cn("object-contain", className)}
		/>
	);
}

export { BrandMark, type BrandMarkProps };
