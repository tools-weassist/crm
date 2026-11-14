import { z } from "zod";

export const BRAND_ENV = {
	name: "BRAND_NAME",
	logoUrl: "BRAND_LOGO_URL",
	faviconUrl: "BRAND_FAVICON_URL",
	primaryColor: "BRAND_PRIMARY_COLOR",
	homeUrl: "BRAND_HOME_URL",
} as const;

export const BRAND_DEFAULTS = {
	name: "CRM",
	darkRingMix: 60,
	foregroundLuminanceThreshold: 0.4,
	lightForeground: "#ffffff",
	darkForeground: "#171717",
} as const;

const blank = z
	.string()
	.optional()
	.transform((value) => value?.trim() || undefined);

const brandUrl = blank.pipe(
	z
		.string()
		.refine(
			(value) => value.startsWith("/") || URL.canParse(value),
			"must be an absolute URL or a path that starts with /",
		)
		.optional(),
);

export const brand = z.object({
	name: blank.pipe(z.string().max(60).default(BRAND_DEFAULTS.name)),
	logoUrl: brandUrl,
	faviconUrl: brandUrl,
	primaryColor: blank.pipe(
		z
			.string()
			.regex(/^#[0-9a-fA-F]{6}$/, "must be a six-digit hex colour like #1a73e8")
			.transform((value) => value.toLowerCase())
			.optional(),
	),
	homeUrl: brandUrl,
});

export type Brand = z.infer<typeof brand>;

export class InvalidBrand extends Error {
	override name = "InvalidBrand";
}

export function readBrand(
	env: Record<string, string | undefined> = process.env,
): Brand {
	const result = brand.safeParse({
		name: env[BRAND_ENV.name],
		logoUrl: env[BRAND_ENV.logoUrl],
		faviconUrl: env[BRAND_ENV.faviconUrl],
		primaryColor: env[BRAND_ENV.primaryColor],
		homeUrl: env[BRAND_ENV.homeUrl],
	});

	if (!result.success) {
		const fields = Object.keys(BRAND_ENV) as (keyof typeof BRAND_ENV)[];
		throw new InvalidBrand(
			result.error.issues
				.map((issue) => {
					const field = fields.find((key) => key === issue.path[0]);
					return `${field ? BRAND_ENV[field] : "brand"} ${issue.message}`;
				})
				.join("; "),
		);
	}

	return result.data;
}

export function brandForeground(hex: string): string {
	const channels = [1, 3, 5].map((start) => {
		const value = Number.parseInt(hex.slice(start, start + 2), 16) / 255;
		return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
	});
	const [red = 0, green = 0, blue = 0] = channels;
	const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

	return luminance > BRAND_DEFAULTS.foregroundLuminanceThreshold
		? BRAND_DEFAULTS.darkForeground
		: BRAND_DEFAULTS.lightForeground;
}

export function brandStylesheet(value: Brand): string | null {
	if (!value.primaryColor) return null;

	const primary = value.primaryColor;
	const foreground = brandForeground(primary);
	const darkRing = `color-mix(in oklab, ${primary} ${BRAND_DEFAULTS.darkRingMix}%, white)`;

	const fill = [
		`--primary: ${primary};`,
		`--primary-foreground: ${foreground};`,
		`--sidebar-primary: ${primary};`,
		`--sidebar-primary-foreground: ${foreground};`,
	].join(" ");

	return [
		`:root:root { ${fill} --ring: ${primary}; --sidebar-ring: ${primary}; --code-string: ${primary}; }`,
		`:root:root.dark, :root:root .dark { ${fill} --ring: ${darkRing}; --sidebar-ring: ${darkRing}; --code-string: ${darkRing}; }`,
	].join("\n");
}
