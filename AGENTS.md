# AGENTS.md — Mythica Games

## Project State

Read `docs/architecture_document.md` before changing anything structural. It records the stack, the routes, the contact flow, and the two version constraints that are easy to break.

For why each choice was made, and what would change it, see `docs/decision-log.md`.

Local working state may be ahead of the documents. If they disagree with the code, the code is correct and the document needs updating — bump the architecture document version and add a revision-history row when the contact contract or the `backend/` scope changes.

## Stack

| Layer      | Tech |
| ---------- | ---- |
| Frontend   | Next.js 16.3.6 (App Router) + React 19.3.0 + Tailwind CSS 4.3.3 (PostCSS, CSS-first `@theme`) + Zod 4.6.5 |
| Email      | Resend 6.30.0 |
| Runtime    | Node.js 24.21.0 (Active LTS) |
| Linting    | ESLint 10.11.0 (custom flat config) + Prettier 3.9.9 |
| Deploy     | Vercel Hobby, `mythica.games` |
| Packages   | pnpm 12.6.0 workspace |

## Commands

Run from the repository root. The frontend is the only package today; the
workspace also reserves a `backend/` slot that does not exist yet.

```bash
pnpm install
pnpm dev                                          # dev server
pnpm build                                        # production build
pnpm typecheck                                    # tsc --noEmit
pnpm lint                                         # eslint
pnpm test                                         # vitest run
pnpm format                                       # prettier --write
```

## Content

**All site copy in `frontend/src/content/` is placeholder.** Contact addresses use
`example.com`, links use `your-invite-here` / `your-handle-here` placeholders,
and prose is prefixed with `TODO:`. Nothing there is real — do not treat any value
as authoritative, and do not deploy without replacing it.

| Module           | Holds                                     |
| ---------------- | ----------------------------------------- |
| `site.ts`        | Name, tagline, description, `siteUrl`, nav, legal note, background image |
| `home.ts`        | Home page hero CTAs, about copy, closing CTA |
| `socials.ts`     | Social links and Discord invite |
| `branches.ts`    | Active and former guild branches          |
| `rules.ts`       | Code of Conduct sections                  |

Pages import from `content/` and never from raw strings, so copy changes are
confined to these modules. This is also the seam for a future database.

## Conventions

- Order of operations: **typecheck → lint → build**
- Components are Server Components unless marked `'use client'`. `ContactForm`
  and `CopyrightYear` are the only client components — keep it that way unless
  there is a concrete reason. (`ContactForm` needs form state; `CopyrightYear`
  renders the visitor's current year, which the static server render cannot
  know.)
- String quoting follows the Airbnb convention via `.prettierrc`: single quotes
  in JS/TS string literals, double quotes in JSX attribute values
  (`singleQuote: true`, `jsxSingleQuote: false`). JSON is always double-quoted
  by spec and is not affected by either setting.
- Commit `pnpm-lock.yaml`.
- Pages and the sitemap both derive from `nav` in `content/site.ts`. Adding a
  route means adding one entry there.
- Documentation is written as conclusions, not transcripts, and must be safe to
  keep in a public repository.

## Key Gotchas

- **TypeScript is pinned to `6.x` deliberately.** `typescript-eslint@8.70.1`
  declares `typescript: ">=4.8.4 <6.1.0"`, and TypeScript 7 removed the
  JavaScript compiler API. Installing TypeScript 7 crashes ESLint inside
  `@typescript-eslint/typescript-estree` rather than degrading. Next.js 16.3.6
  itself supports TypeScript 7 and is *not* the constraint. The upgrade trigger is
  TypeScript 7.1 shipping a stable API. See `docs/decision-log.md` §1.

- **Do not use `eslint-config-next`.** It depends on `eslint-plugin-react`,
  `eslint-plugin-import`, and `eslint-plugin-jsx-a11y`, none of which support
  ESLint 10. `eslint.config.mjs` composes the four compatible plugins directly.

- **`@types/node` is pinned to `^24`, not `latest`.** The `latest` tag tracks
  Node 26 and would describe APIs absent from the Node 24 runtime.

- **Tailwind CSS v4 is CSS-first.** Customisation lives in `@theme` inside
  `globals.css`. There is no `tailwind.config.js` and adding one will not work.

- **pnpm 12 reads `.npmrc` for auth and registry settings only.** Every other
  setting belongs in `pnpm-workspace.yaml`. Do not add an `.npmrc` expecting it to
  configure anything else.

- **The contact honeypot must not fail validation.** The hidden `company` field is
  an ordinary optional field in the schema and is checked separately in the route
  handler. If it is given a `z.string().max(0)` constraint, the validation error
  names the trap, which tells bot authors exactly how the form is protected.
  Defense in depth: the route handler filters validation responses to the four
  visible fields, so the trap name never appears in any response body. The
  honeypot path itself must return a plain `200`.

- **`replyTo` on contact emails must stay set to the submitter.** Without it,
  replies loop through the team instead of reaching the sender.

- **All user-supplied values are HTML-escaped in `lib/email.ts`.** The contact
  form interpolates name, email, subject, and message into an HTML email. Do not
  add a field to that template without escaping it.

- **A missing `RESEND_API_KEY` returns `503` in production and `200` in
  development.** That asymmetry is intentional: development should be testable
  without credentials, but a production message must never be silently
  discarded.

- **`NEXT_PUBLIC_SITE_URL` is a build-time variable.** It is inlined during the
  build, so changing it in Vercel requires a redeploy, not just a restart. It
  drives `metadataBase`, canonical URLs, the sitemap, and `robots.txt`.

- **The OG image deliberately fetches no font.** `opengraph-image.tsx` uses
  `ImageResponse` with no custom fonts so image generation has no build-time
  network dependency. The site body fonts do use `next/font/google`, which does
  fetch at build time — that is a known trade-off, not an oversight.

- **MX records cannot be shared.** If the team alias is ever created on
  `mythica.games` (for example via Cloudflare Email Routing), Resend must move to
  `send.mythica.games`. Applying both sets of MX records to the apex means one
  silently breaks. See `docs/decision-log.md` §5.
