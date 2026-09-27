# Decision Log

- **Created:** 2026-09-26
- **Last Updated:** 2026-09-27
- **Related:** `docs/architecture_document.md` (v1.1)

A record of decisions considered, the alternatives, and what would change them.
Conclusions only — this file is safe to keep in a public repository.

---

## Status Summary

| #  | Decision                          | Status  |
| -- | --------------------------------- | ------- |
| 1  | TypeScript 6.0.3 over 7.0.2       | Applied |
| 2  | Custom ESLint flat config over `eslint-config-next` | Applied |
| 3  | Resend over Postmark and Amazon SES | Applied |
| 4  | Configured recipients over a hardcoded list | Applied |
| 5  | `send.mythica.games` over apex sending | Deferred |
| 6  | Next.js 16.3.6 over 15.x          | Applied |
| 7  | Tailwind CSS v4 over v3            | Applied |
| 8  | pnpm workspace over per-package lockfiles | Applied |
| 9  | `src/` directory over flat app root | Applied |
| 10 | Typed TS content over Markdown/MDX | Applied |
| 11 | In-memory rate limiting over a shared store | Applied |

---

## 1. TypeScript 6.0.3, not 7.0.2

**Decision.** Pin `typescript@6.0.3`.

**Alternatives considered.** TypeScript 7.0.2 (the current release); Biome v2 as
a linter replacement; Oxlint with `oxlint-tsgolint`.

**Why the alternatives lost.**

Next.js supports TypeScript 7 — the CLI type checker is enabled by default in
16.3.6, so no configuration is required. Next.js is not the constraint.

`typescript-eslint` is. Version 8.70.1 declares
`typescript: ">=4.8.4 <6.1.0"`, and the current canary carries the same ceiling.
There is no v9 or v10. TypeScript 7 removed the JavaScript compiler API
(`lib/typescript.js`), and `typescript-eslint` reads the legacy surface at module
load time in `typescript-estree`. Forcing past the peer dependency does not
degrade linting — it crashes ESLint. The maintainers closed the support request as
blocked on an upstream API, not as their own bug.

Microsoft has stated the compiler API will ship in TypeScript 7.1. Until then,
`typescript-eslint` cannot consume TypeScript 7.

**Substitutions evaluated.**

- **Biome v2** replaces ESLint and Prettier and implements type-aware rules with
  its own inference engine, so it is immune to this problem. Rejected because its
  type semantics are approximate rather than exact, most type-aware rules are
  still in nursery, the rule surface is roughly half of `typescript-eslint`'s, and
  it replaces the formatter as well. Four compromises to avoid one crash.
- **Oxlint with `tsgolint`** is built on the official Go compiler and is
  natively a TypeScript 7 tool, with type-aware coverage of 59 of 61
  `typescript-eslint` rules. Rejected because that mode is alpha, adds a separate
  process, and does not provide a drop-in substitute for
  `@next/eslint-plugin-next`'s rules.
- **Dropping `typescript-eslint` entirely** is not possible: ESLint cannot parse
  TypeScript syntax without it.
- **Installing both via an npm alias** works but leaves two compilers installed
  and two type systems judging the same codebase.

**What would change this.** TypeScript 7.1 shipping a stable compiler API,
followed by a `typescript-eslint` release that widens its peer range. At that
point the upgrade is a single devDependency change. The site has no large
codebase, so there is no performance argument for moving sooner.

## 2. Custom ESLint config, not `eslint-config-next`

**Decision.** Hand-rolled flat config using `@next/eslint-plugin-next`,
`eslint-plugin-react-hooks`, `typescript-eslint`, and `globals` directly.

**Why.** `eslint-config-next@16.3.6` depends on `eslint-plugin-react`,
`eslint-plugin-import`, and `eslint-plugin-jsx-a11y`, none of which declare
ESLint 10 support. The four packages used directly do.

**What would change this.** Official ESLint 10 support in the three excluded
plugins, at which point `eslint-config-next` becomes viable again and the config
can be simplified.

## 3. Resend over Postmark and Amazon SES

**Decision.** Resend.

**Why.** Postmark optimises for deliverability but its free tier is 100 emails
per month, which is an integration test rather than a usable allowance. Amazon
SES is roughly an order of magnitude cheaper per send, but bounce and complaint
handling must be built and maintained, and its free tier is EC2-only for twelve
months. At community scale, cost is not the deciding factor — operational burden
is. Resend offers a permanent free tier, a typed SDK, native availability on the
Vercel Marketplace, and a single API key.

**What would change this.** Sustained volume high enough that per-message cost
dominates, or a hard requirement for longer log retention than Resend's 30 days
— in which case Postmark is the better fit. Note that every `To`/`CC`/`BCC`
recipient counts as a separate message against quota, which matters if the same
key is ever reused for a newsletter.

## 4. Configured recipients, not a hardcoded list

**Decision.** `CONTACT_TO_EMAIL` is a comma-separated environment variable.

**Why.** The requirement is that no single person becomes a bottleneck. Keeping
the roster in configuration rather than code means the form has exactly one
sender-facing address and the roster is owned elsewhere.

**The preferred end state** is a single alias — for example
`hello@mythica.games`, fanned out through Cloudflare Email Routing or a Workspace
group — so that adding or removing a team member is an email-provider change
rather than a redeploy. The code is identical either way, which is why this was
deferred rather than skipped.

**What would change this.** Nothing technical. The trigger is the roster
stabilising.

## 5. `send.mythica.games`, not the apex domain

**Decision, deferred.** Verify a subdomain for Resend sending; keep the apex free
for the alias.

**Why.** MX records determine inbound delivery and a domain can have only one
authoritative set. Cloudflare Email Routing needs MX records on the apex for the
alias; Resend's domain setup also wants MX records for the sending domain.
Applying both to `mythica.games` means whichever lands last wins, which presents
as "transactional mail started bouncing after I turned on forwarding."

A subdomain has independent delegation, so the two record sets cannot collide. It
also keeps transactional sending reputation isolated from anything else sent from
the root domain.

**Not yet applicable.** The alias does not exist, so the apex is currently
uncontested and Resend could use `mythica.games` directly. If a sending subdomain
is added later, this entry applies.

## 6. Next.js 16.3.6

**Decision.** Current release line.

**Why.** `next@16.3.6` ships the default-on TypeScript CLI checker, faster builds
via artifact caching, and lower development memory use.

**Watch item.** `experimental.useTypeScriptCli` is documented as experimental.
The diagnostics it produces come from `tsc` directly, without Next.js code-frame
rewriting. This is currently the default path, not an opt-in.

## 7. Tailwind CSS v4

**Decision.** v4 via `@tailwindcss/postcss`, configured CSS-first.

**Why.** v4 removes the JavaScript config file; customisation lives in `@theme`
as CSS custom properties. `tailwind.config.js` is not used and should not be
added.

## 8. pnpm workspace

**Decision.** A single lockfile at the repository root.

**Why.** Two packages are anticipated, and a shared lockfile means dependency
versions cannot drift between them. This differs from `recipe-app`, which has
per-package lockfiles.

## 9. `src/` directory

**Decision.** Application code under `frontend/src/`, with the `@/*` alias
pointing at `./src/*`.

**Why.** `create-next-app@16.3.6` defaults to this layout. Chosen over a flat
`app/` root for consistency with the current Next.js convention, accepting that it
differs from `recipe-app`.

## 10. Typed TypeScript content over Markdown or MDX

**Decision.** Site copy as typed modules under `src/content/`.

**Why.** No dependency, full type safety, and a clean seam: pages import from
`content/`, so replacing a static module with a database read is confined to that
module. Markdown would add a content pipeline before there is content to manage.

**What would change this.** A need for non-technical editors to change copy, which
would favour Markdown or a CMS.

## 11. In-memory rate limiting over a shared store

**Decision.** A fixed-window rate limiter keyed by client IP, living in module
scope (`lib/rate-limit.ts`): 5 POSTs per 10 minutes per IP, enforced before the
request body is parsed.

**Alternatives considered.** Upstash Ratelimit backed by Redis; Vercel WAF or
Firewall custom rules; Cloudflare Turnstile; no rate limiting at all.

**Why the alternatives lost.** A shared store adds a new paid or self-managed
service to a site that sends a handful of messages per month, and Vercel's
WAF/Firewall custom rules are not available on the Hobby tier. Turnstile is
interactive and would be the next escalation if needed. No rate limiting was
rejected: the endpoint is a free amplifier for both Resend quota exhaustion and
inbox flooding of the team roster.

**Known limitation.** The map is in-process memory, so on Vercel each
serverless instance keeps its own buckets and cold starts reset them. This
bounds bursts from a single source against a warm instance — which is the
realistic abuse shape at this scale — but is not a guarantee against a
distributed or sustained attack. Memory is bounded by pruning expired buckets
and evicting the oldest entry past a cap.

**What would change this.** Real production abuse, or a requirement for
accurate cross-instance quotas. The upgrade path is a shared store (Upstash
Ratelimit), Vercel Firewall rules if the plan tier allows it, and Turnstile for
interactive challenge — see the Deferred table.

---

## Deferred

| Item                                | Trigger                                                        |
| ----------------------------------- | -------------------------------------------------------------- |
| Migrate `CONTACT_TO_EMAIL` to a real alias | The recipient roster stabilises                            |
| Verify `send.mythica.games` in Resend | The alias is created and the MX conflict becomes live         |
| Add Cloudflare Turnstile            | Honeypot or in-memory rate limiting proves insufficient in production |
| Move rate limiting to a shared store | Sustained or distributed abuse, or cross-instance quotas needed |
| Scope the `backend/` service        | Blog posts or forum requirements are defined                    |
| Upgrade to TypeScript 7             | TypeScript 7.1 API ships and `typescript-eslint` widens its peer range |
| Add a test framework                | Logic accumulates beyond the contact schema                    |
