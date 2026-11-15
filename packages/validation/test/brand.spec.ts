import { describe, expect, it } from "bun:test";
import {
	brandForeground,
	brandStylesheet,
	InvalidBrand,
	readBrand,
} from "../src/brand";

describe("readBrand", () => {
	it("falls back to the neutral default with nothing set", () => {
		expect(readBrand({})).toEqual({ name: "CRM" });
	});

	it("treats blank values as unset", () => {
		expect(
			readBrand({
				BRAND_NAME: "  ",
				BRAND_LOGO_URL: "",
				BRAND_PRIMARY_COLOR: "",
			}),
		).toEqual({ name: "CRM" });
	});

	it("reads every field", () => {
		expect(
			readBrand({
				BRAND_NAME: "WeAssist",
				BRAND_LOGO_URL: "https://cdn.example.com/logo.svg",
				BRAND_FAVICON_URL: "/brand/favicon.png",
				BRAND_PRIMARY_COLOR: "#1A73E8",
				BRAND_HOME_URL: "https://example.com",
			}),
		).toEqual({
			name: "WeAssist",
			logoUrl: "https://cdn.example.com/logo.svg",
			faviconUrl: "/brand/favicon.png",
			primaryColor: "#1a73e8",
			homeUrl: "https://example.com",
		});
	});

	it("names the variable that is malformed", () => {
		expect(() => readBrand({ BRAND_PRIMARY_COLOR: "blue" })).toThrow(
			InvalidBrand,
		);
		expect(() => readBrand({ BRAND_PRIMARY_COLOR: "blue" })).toThrow(
			/BRAND_PRIMARY_COLOR/,
		);
		expect(() => readBrand({ BRAND_LOGO_URL: "logo.png" })).toThrow(
			/BRAND_LOGO_URL/,
		);
	});
});

describe("brandForeground", () => {
	it("puts white on a dark brand colour", () => {
		expect(brandForeground("#006b4f")).toBe("#ffffff");
	});

	it("puts ink on a light brand colour", () => {
		expect(brandForeground("#ffd400")).toBe("#171717");
	});
});

describe("brandStylesheet", () => {
	it("emits nothing without a brand colour", () => {
		expect(brandStylesheet({ name: "CRM" })).toBeNull();
	});

	it("repoints the primary tokens in both themes", () => {
		const css = brandStylesheet({ name: "CRM", primaryColor: "#1a73e8" });
		expect(css).toContain("--primary: #1a73e8;");
		expect(css).toContain("--primary-foreground: #ffffff;");
		expect(css).toContain(".dark");
	});
});
