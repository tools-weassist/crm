# White-label instances

Each client runs its own copy of the CRM: one Postgres database and three Vercel
projects (app, API, agent) on the client's own domains. Data never mixes between
clients, and every instance takes upstream updates from `release`.

## Branding

Five `BRAND_*` variables rebrand an instance: name, logo, favicon, primary colour
and home link. `.env.example` describes each one, and `docs/environment.md` says
how the code reads them.

## Creating an instance

```sh
bun run instance:new -- \
  --slug acme \
  --app-url https://crm.acme.com \
  --api-url https://crm-api.acme.com \
  --agent-url https://crm-agent.acme.com \
  --allowed-sign-in acme.com \
  --brand-name "Acme CRM" \
  --brand-primary-color "#1a73e8"
```

The script writes two files to `instances/<slug>/`. Git ignores that folder.

- `production.env` holds every variable the instance needs, with fresh secrets.
  `DATABASE_URL` and the Google client pair read `REPLACE_ME` until you fill them in.
  Telemetry is off.
- `CHECKLIST.md` lists the manual steps: the database, the Google OAuth client with
  this instance's exact redirect URI, the three Vercel projects, and the first sign-in.

The script refuses to overwrite an existing `production.env`, because that file holds
the instance's secrets. `--force` replaces it. Replacing `BETTER_AUTH_SECRET` signs
everybody out, and replacing `MCP_ENCRYPTION_KEY` or `CHAT_EVENT_ENCRYPTION_KEY` makes
stored data unreadable.

Keep `production.env` in a password manager after you import it into Vercel. It is
the only copy of the encryption keys.
