# Decisions log — portfolio-site (agent `site`)

Choices made without asking, in the order they came up. Plain language.

## Task A1 — scaffold

- **Next.js 16.3.4 instead of 15.** `create-next-app@latest` now produces Next 16 with React 19.2. The plan named Next 15, but pinning an older major just to match a doc would leave the site behind on day one. Nothing in the plan depends on a 15-only behaviour.
- **Scaffolded in a scratch directory, then copied in.** `create-next-app` refuses a non-empty target and `docs/` already existed. Copied everything except the generator's `.git`, `AGENTS.md`, `CLAUDE.md`, `README.md` and the stock SVG logos, so `docs/`, `content/`, `public/screenshots/` are never overwritten.
- **`@types/node` bumped from ^20 to ^22.** Vitest 5 requires Node 22 type definitions, and we run Node 22, so the scaffold's `^20` pin was simply stale.
- **`.env.example` is whitelisted in `.gitignore`.** The scaffold ignores `.env*`; the plan wants an (empty) `.env.example` committed to document that the site has no secrets.
- **Package name is `maxallaire-com`** to match the Vercel project name.
- **`npm test` passes with zero test files** (`--passWithNoTests`). The A1 commit happens before any tests exist, and the rule is "run `npm run check` before every commit", so the check must be runnable at every stage. Real tests arrive in A2.
