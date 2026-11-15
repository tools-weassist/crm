export const INSTANCE = {
	outputDir: "instances",
	envFile: "production.env",
	checklistFile: "CHECKLIST.md",
	placeholder: "REPLACE_ME",
	secretBytes: 32,
	minimumParentLabels: 2,
	usage: [
		"Usage: bun run instance:new -- \\",
		"  --slug weassist \\",
		"  --app-url https://crm.example.com \\",
		"  --api-url https://crm-api.example.com \\",
		"  --agent-url https://crm-agent.example.com \\",
		"  --allowed-sign-in example.com \\",
		'  [--brand-name "Example CRM"] [--brand-primary-color "#1a73e8"] \\',
		"  [--brand-logo-url URL] [--brand-favicon-url URL] [--brand-home-url URL]",
	].join("\n"),
} as const;
