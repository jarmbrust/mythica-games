# frontend

The web applications for the gaming community Mythica (mythica.games): Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.

See the [root README](../README.md) for setup, commands, and deployment, and
[`AGENTS.md`](../AGENTS.md) for conventions and gotchas. Full design detail is in
[`docs/architecture_document.md`](../docs/architecture_document.md).

## Commands

Run from the repository root so the workspace lockfile is used:

```bash
pnpm build
pnpm typecheck
pnpm lint
pnpm format
pnpm test
pnpm dev
```

Running them from this directory works too, but install from the root.

## Layout

```
src/
├── app/          # routes, /api/contact route handler, SEO files
├── components/   # shared UI (Server Components; ContactForm is the only client one)
├── content/      # typed site copy — all placeholder, see AGENTS.md §Content
└── lib/          # Zod contact schema, Resend email helper
```
