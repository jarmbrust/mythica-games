# Mythica Games — Architecture Document

- **Version:** 1.2 (MVP)
- **Created:** 2026-09-26
- **Last Updated:** 2026-09-27
- **Status:** Active

## Revision History

| Version | Date | Notes |
| ------- | ---- | ----- |
| 1.2 | 2026-09-27 | Navigation restructured: Games route replaced by Branches; Rules relabelled Code of Conduct; home page reworked around the guild description. Added `content/home.ts` and `content/branches.ts`; removed `content/games.ts`. Cinzel display font for headings; fixed background image layer. |
| 1.1 | 2026-09-27 | Contact form: per-IP rate limiting; subject restricted to a single line; validation responses never name the honeypot field. Footer year is client-rendered so it tracks the visitor's local date. |
| 1.0 | 2026-09-26 | Initial MVP architecture document. |

---

## 1. Technology Stack

| Component             | Technology                                        | Hosting                    |
| --------------------- | ------------------------------------------------- | -------------------------- |
| Frontend              | Next.js 16.3.6 (App Router) + React 19.3.0         | Vercel (Hobby tier)        |
| Language              | TypeScript 6.0.3                                   | —                          |
| Runtime               | Node.js 24.21.0 (Active LTS)                       | Vercel                     |
| Package manager       | pnpm 12.6.0 (workspace)                            | —                          |
| Styling               | Tailwind CSS 4.3.3 (PostCSS plugin, CSS-first)     | —                          |
| Linting               | ESLint 10.11.0 (custom flat config)                 | —                          |
| Formatting            | Prettier 3.9.9                                     | —                          |
| Email delivery        | Resend 6.30.0                                      | Resend (Free tier, 3k/mo)  |
| Form validation       | Zod 4.6.5                                          | —                          |
| Icons                 | Heroicons 2.2.0                                    | —                          |
| Custom domain         | `mythica.games`                                     | Registered              |
| Version control       | Git                                                | GitHub                     |

### Version constraints

Two version choices are load-bearing and should not be changed casually:

- **TypeScript is pinned below 7.0.** `typescript-eslint@8.70.1` declares
  `typescript: ">=4.8.4 <6.1.0"`. TypeScript 7 removed the JavaScript compiler
  API, so `typescript-eslint` crashes inside `@typescript-eslint/typescript-estree`
  rather than degrading. See `docs/decision-log.md` for the full analysis and the
  upgrade trigger.
- **`@types/node` is pinned to `^24`, not `latest`.** The `latest` tag tracks
  Node 26, which would describe APIs absent from the Node 24 runtime.

## 2. Repository Layout

pnpm workspace with one lockfile at the root.

```
mythica-games/
├── AGENTS.md
├── README.md
├── package.json
├── pnpm-workspace.yaml       # packages: [frontend, backend]
├── pnpm-lock.yaml
├── docs/
│   ├── architecture_document.md
│   └── decision-log.md
└── frontend/                 # the only package today
    └── src/
        ├── app/              # routes, route handlers, SEO files
        ├── components/       # shared UI
        ├── content/          # typed site copy (see §5)
        └── lib/              # schema, email
```

`backend/` is listed in `pnpm-workspace.yaml` but does not exist yet. It is
reserved for a future Node service (see §8). A missing directory matches no glob
and is not an error.

### Root-level configuration

pnpm 12 reads only auth and registry settings from `.npmrc`; all other settings
live in `pnpm-workspace.yaml`. There is no `.npmrc` in this project.

## 3. Routes

| Route              | Rendering | Purpose                            |
| ------------------ | --------- | --------------------------------- |
| `/`                | Static    | Home: landing page and guild description |
| `/branches`        | Static    | Guild branches (Retail, Wow4ever; former: Classic, SoD) |
| `/rules`           | Static    | Code of Conduct                   |
| `/contact`         | Static    | Contact details and form           |
| `/api/contact`     | Dynamic   | Contact form submission (POST)    |
| `/sitemap.xml`     | Static    | Generated from `content/site.ts`   |
| `/robots.txt`      | Static    | Generated                          |
| `/opengraph-image` | Static    | Generated via `next/og`            |
| `/icon`            | Static    | Generated favicon                  |

Every page except the contact form is a Server Component. Only two
`'use client'` components exist: `ContactForm`, because form submission needs
state and event handlers, and `CopyrightYear`, because the footer year must
reflect the visitor's local date rather than the build date.

Navigation is driven by `nav` in `content/site.ts`, which is also what generates
the sitemap — adding a route means adding one entry.

## 4. Contact Flow

```
Browser ──POST /api/contact──> Route Handler
                                    │
                                    ├─ rate limit (per-IP)  (429 if exceeded)
                                    ├─ zod validation      (400 on failure)
                                    ├─ honeypot check      (silent 200 if filled)
                                    ├─ Resend send         (502 on delivery failure)
                                    └─ missing config      (503 in prod, warn in dev)
                                          │
                                          ▼
                              CONTACT_TO_EMAIL recipients
```

**Recipients are configured, not hardcoded.** `CONTACT_TO_EMAIL` is a
comma-separated list, split at request time and passed to Resend's `to` array.
The intended end state is a single alias (e.g. `hello@mythica.games`) that fans
out to the current team, so that changing who receives mail never requires a code
change or redeploy. See `docs/decision-log.md`.

**Reply routing.** `replyTo` is set to the submitter's address, so replying to a
notification reaches the person who wrote in rather than looping through the
team. The recipient list is never exposed in the HTML body.

**Sending domain.** `CONTACT_FROM_EMAIL` must be on a domain verified in Resend.
The plan is to verify `send.mythica.games` rather than the apex, because the
alias's inbound MX records and Resend's outbound MX records cannot coexist on
one domain (see §6).

**Abort protection.** A hidden `company` field acts as a honeypot. It is
validated as an ordinary optional field and checked separately in the handler, so
a bot receives an ordinary `200` with no signal that the trap exists. Validation
error responses only ever name the four visible fields, so the trap is never
identified in a `400` either. Adding Cloudflare Turnstile is the intended
upgrade if spam becomes a problem.

**Rate limiting.** Each IP is limited to 5 submissions per 10 minutes before
the body is even parsed, returning `429` when exceeded. The limiter is an
in-memory fixed window in `lib/rate-limit.ts` — zero dependencies, but on
Vercel it is per-serverless-instance and resets on cold starts, so it is
best-effort burst protection rather than a hard guarantee. See
`docs/decision-log.md` §11.

**Graceful degradation.** With no `RESEND_API_KEY` set, development requests log
a warning and return `200`, so the form is testable without credentials. In
production the same condition returns `503` rather than silently discarding a
message.

## 5. Content Layer

All site copy lives in typed modules under `frontend/src/content/`:

| Module           | Contents                                       |
| ---------------- | ---------------------------------------------- |
| `site.ts`        | Name, tagline, description, `siteUrl`, nav list, legal note, background image |
| `home.ts`        | Home page hero CTAs, about copy, closing CTA    |
| `socials.ts`     | Social links and the Discord invite     |
| `branches.ts`    | Active and former guild branches               |
| `rules.ts`       | Code of Conduct sections and last-updated date |

**All values are currently placeholders.** Contact details use
`example.com`-style addresses and `TODO:`-prefixed copy so that nothing
plausible-but-wrong can reach production. See `AGENTS.md` §Content.

This layer is the seam for a future database. Pages import from `content/`, so
replacing a static module with a database read is a change confined to that
module rather than to every page that renders it.

## 6. Hosting and DNS

Deployed to Vercel. The apex domain is canonical; `www` should redirect to it.
Set both domains in Vercel and mark the apex as primary.

`NEXT_PUBLIC_SITE_URL` drives `metadataBase`, which is what makes canonical
URLs, Open Graph image URLs, the sitemap, and `robots.txt` absolute. It must be
set as a build-time environment variable on Vercel.

### DNS records

Two zones, deliberately separated, because MX records for inbound alias
delivery and for transactional sending cannot share a domain:

| Zone                    | Purpose                          | Record types      |
| ----------------------- | -------------------------------- | ----------------- |
| `mythica.games`         | Website, and the team alias      | A/CNAME, MX       |
| `send.mythica.games`    | Resend transactional sending     | DKIM CNAME, SPF   |

MX and TXT records are never proxied. If a record appears greyed-out as
"Proxied" in Cloudflare, switch it to DNS-only or domain verification will hang.

## 7. Styling and SEO

**Theming.** A fixed dark palette defined as custom properties in
`app/globals.css` via Tailwind v4's CSS-first `@theme`. There is no theme toggle
and no `prefers-color-scheme` branch, so there is no hydration risk and no
flash of the wrong theme. Adding a light theme later means promoting these values
to switchable custom properties.

**Display font.** Headings use Cinzel (Google Fonts via `next/font/google`),
wired as `--font-display` in `@theme`, with a fallback stack of `ui-serif`,
Georgia. Body copy stays Inter.

**Background.** A fixed full-viewport image layer
(`components/BackgroundImage.tsx`) sits behind the scrolling content, dimmed by
a surface-coloured overlay for legibility. The image lives in
`frontend/public/backgrounds/` and the active path is `site.backgroundImage` in
`content/site.ts`.

**Metadata.** `metadata` is exported from the root layout with a
`title.template` of `%s | Mythica Games`; each sub-route exports its own title,
description, and `alternates.canonical`.

**Generated images.** `opengraph-image.tsx` and `icon.tsx` use `ImageResponse`
from `next/og`, which is bundled with Next.js — no extra dependency. Neither
fetches a font, so image generation has no build-time network dependency. The
site body fonts do use `next/font/google`, which does fetch at build time.

## 8. Future Backend

Not built. The `backend/` workspace slot is reserved for a Node service, and
PostgreSQL is expected to store blog posts and possibly forum content. Nothing in
the current codebase depends on that service, and no placeholder package exists —
an empty stub would only create something to delete.

The contact form's route handler is **not** a backend. It is one stateless
function in the same Next.js application with no database and nothing to operate.

## 9. Environment Variables

| Variable                | Scope   | Required | Purpose                                    |
| ----------------------- | ------- | -------- | ------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`  | Public  | Yes      | Canonical base URL for metadata and sitemaps |
| `RESEND_API_KEY`        | Private | Yes      | Resend API key                             |
| `CONTACT_FROM_EMAIL`    | Private | Yes      | Verified sending address                   |
| `CONTACT_TO_EMAIL`      | Private | Yes      | Comma-separated recipient list             |

Copy `frontend/.env.example` to `frontend/.env.local` for local development. The
contact form degrades gracefully when the private variables are unset, so the
rest of the site is usable without them.
