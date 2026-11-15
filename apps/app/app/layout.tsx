import "@crm/ui/globals.css";
import { Toaster } from "@crm/ui/components/sonner";
import { TooltipProvider } from "@crm/ui/components/tooltip";
import { cn } from "@crm/ui/lib/utils";
import { brandStylesheet } from "@crm/validation/brand";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { BrandProvider } from "@/components/brand-provider";
import { LocalDateTimeHydrator } from "@/components/local-date-time";
import { ThemeProvider } from "@/components/theme-provider";
import { brandView, getBrand } from "@/lib/brand";
import { TRPCReactProvider } from "@/lib/trpc/client";

const fontSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const fontMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export function generateMetadata(): Metadata {
	const brand = getBrand();
	const icon = brand.faviconUrl;

	return {
		title: {
			default: brand.name,
			template: `%s · ${brand.name}`,
		},
		description: `Customer Relationship Management for ${brand.name}`,
		icons: icon
			? { icon, apple: icon }
			: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const brand = getBrand();
	const brandCss = brandStylesheet(brand);

	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(fontSans.variable, fontMono.variable, "h-full antialiased")}
		>
			<head>{brandCss ? <style>{brandCss}</style> : null}</head>
			<body className="flex min-h-full flex-col font-sans">
				<BrandProvider brand={brandView(brand)}>
					<NuqsAdapter>
						<TRPCReactProvider>
							<ThemeProvider>
								<TooltipProvider>{children}</TooltipProvider>
								<Toaster richColors />
							</ThemeProvider>
						</TRPCReactProvider>
					</NuqsAdapter>
				</BrandProvider>
				<LocalDateTimeHydrator />
			</body>
		</html>
	);
}
