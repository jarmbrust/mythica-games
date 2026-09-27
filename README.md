# Mythica Games

Website for the Mythica Games online gaming community — general information,
games and projects, community rules, and contact.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.
Deployed to Vercel at [mythica.games](https://mythica.games).

> **Status: pre-launch.** All site copy is placeholder. Contact addresses use
> `example.com` and prose is marked `TODO:`. See [Content](#content) below.

## Requirements

- Node.js 24.21.0 or newer (`.nvmrc` is provided; `nvm use` reads it)
- pnpm 12.6.0 — the version is pinned via the `packageManager` field, so
  `corepack enable` will select it automatically

## Getting started

```bash
pnpm install
pnpm dev
```

The site is then available on [http://localhost:3000](http://localhost:3000).

To enable the contact form locally, copy the example environment file and fill it
in:

```bash
cp frontend/.env.example frontend/.env.local
```

The form degrades gracefully without these values — in development it logs a
warning and succeeds, so the rest of the site is fully usable.

## Commands

Run from the repository root.

| Command          | Description                       |
| ---------------- | --------------------------------- |
| `pnpm dev`       | Start the development server      |
| `pnpm build`     | Production build                  |
| `pnpm start`     | Serve the production build        |
| `pnpm typecheck` | `tsc --noEmit`                    |
| `pnpm lint`      | ESLint                            |
| `pnpm format`    | Prettier, write mode              |

## Content

All site copy lives in typed modules under `frontend/src/content/`:

| Module       | Holds                                              |
| ------------ | -------------------------------------------------- |
| `site.ts`    | Name, tagline, description, site URL, navigation   |
| `socials.ts` | Social links, contact email, Discord invite        |
| `games.ts`   | Games with status badges and links                 |
| `rules.ts`   | Code of Conduct sections                           |

**Every value is a placeholder.** Replace them before launch:

- `site.ts` — tagline, SEO description
- `socials.ts` — the real contact email, Discord invite, and social URLs
- `games.ts` — real game titles, summaries, and links
- `rules.ts` — the actual Code of Conduct

Pages and the generated sitemap both read from `content/site.ts`, so adding a
route means adding one entry to the `nav` array.

## Contact form

Submissions are validated with Zod and delivered through Resend.

| Variable             | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL for metadata and sitemaps   |
| `RESEND_API_KEY`     | Resend API key                                   |
| `CONTACT_FROM_EMAIL` | Verified sending address on your Resend domain   |
| `CONTACT_TO_EMAIL`   | Comma-separated recipient list                   |

`CONTACT_FROM_EMAIL` must be on a domain verified in Resend — sending from a
personal mailbox will fail SPF/DKIM and land in spam.

Recipients are configured rather than hardcoded so that the team roster can
change without a code change. The intended end state is a single alias such as
`hello@mythica.games` that fans out to whoever currently handles mail, which
means adding a teammate becomes an email-provider change instead of a redeploy.
Note that if you later add Cloudflare Email Routing for that alias, Resend must
move to a sending subdomain (`send.mythica.games`) because the two cannot share MX
records on one domain.

Spam protection is currently a honeypot field. If that proves insufficient in
production, Cloudflare Turnstile is the intended upgrade.

## Deployment

Vercel, with the repository root as the project root.

- Framework preset: Next.js
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: `frontend/.next`
- Set `NEXT_PUBLIC_SITE_URL=https://mythica.games` as an environment variable.
  It is inlined at build time, so changing it requires a redeploy.

Add both `mythica.games` and `www.mythica.games` as domains and set the apex as
primary, so `www` redirects to it.

## Repository layout

```
mythica-games/
├── AGENTS.md                    # conventions and gotchas for contributors
├── docs/
│   ├── architecture_document.md # stack, routes, contact flow, DNS
│   └── decision-log.md          # decisions, alternatives, upgrade triggers
└── frontend/                    # the only package today
    └── src/
        ├── app/                 # routes, route handler, SEO files
        ├── components/
        ├── content/
        └── lib/
```

`backend/` is reserved in `pnpm-workspace.yaml` for a future Node service and
PostgreSQL database, intended for blog posts and possibly a forum. It does not
exist yet and nothing depends on it.

## Documentation

- [`docs/architecture_document.md`](docs/architecture_document.md) — what the
  system is and how it is wired
- [`docs/decision-log.md`](docs/decision-log.md) — why each choice was made, and
  what would change it
- [`AGENTS.md`](AGENTS.md) — commands, conventions, and the gotchas most likely
  to cause damage
