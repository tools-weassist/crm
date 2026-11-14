import type * as React from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={512}
		height={512}
		viewBox="0 0 512 512"
		fill="none"
		aria-hidden="true"
		{...props}
	>
		<rect x="32" y="32" width="208" height="208" rx="48" fill="currentColor" />
		<rect
			x="272"
			y="32"
			width="208"
			height="208"
			rx="104"
			fill="currentColor"
			opacity="0.55"
		/>
		<rect
			x="32"
			y="272"
			width="208"
			height="208"
			rx="104"
			fill="currentColor"
			opacity="0.55"
		/>
		<rect x="272" y="272" width="208" height="208" rx="48" fill="currentColor" />
	</svg>
);
export default Logo;
