# Portfolio Sprint Implementation Plan (Wed 2026-09-09 → Fri 2026-09-11 AM)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship maxallaire.com — a portfolio site with resume, thesis essays, every project as a case study, and a "how I work with AI" story — with all supporting repos public and presentable, by Friday 2026-09-11 morning.

**Architecture:** Five parallel workstreams run as independent agents. The site is a content-driven Next.js app (no DB, no auth): projects are JSON entries, essays are Markdown, all validated by Zod at build time. Repo cleanup agents work per-repo in isolation and never touch the site. Max's control surface is Remote Control from the Claude mobile app + a phone checklist.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4, Zod, Vitest, gray-matter + react-markdown, Vercel, GitHub CLI (`gh`), Playwright (screenshots).

**Spec:** `/Users/me/Projects/portfolio-site/docs/superpowers/specs/2026-09-09-portfolio-design.md`

## Global Constraints

- GitHub account: `ClawdGItMan`. Vercel team: `maxallaire-1603s-projects` (id `team_gIK3KJpd501miqRlA5ndxW7l`). Domain: `maxallaire.com` (registered on Vercel 2026-09-09).
- Positioning copy everywhere: BD / ecosystem operator who researches, ships prototypes with AI to understand what he's selling, and updates his view from evidence. Never "software engineer."
- Hearth repo stays PRIVATE. Hearth appears only as an anonymised case study with fake data. No real family names, addresses, or staff names anywhere.
- Never commit `.env*` (except `.env.example`). Run `git ls-files | grep -i env` before any `gh repo edit --visibility public`.
- Never zip or copy project folders — push through git only.
- Package manager: pnpm for Personal OS and Hearth; npm for marathon-training-app and the new site. Never mix.
- Every project entry must have at least one screenshot in `portfolio-site/public/screenshots/<slug>/`.
- Every claim in a thesis essay carries a date or a source. No un-dated numbers.
- Commit messages: conventional commits, explain WHY.
- Agents report outcomes in plain language, not code diffs.

## Owner map

| Stream | Owner | Where |
|---|---|---|
| A. Site foundation | agent `site` | `/Users/me/Projects/portfolio-site` |
| B. Content (essays, resume, timeline) | agent `content` | `/Users/me/Projects/portfolio-site/content` |
| C. Crypto repos cleanup | agent `repos-crypto` | x402, fieldnotes, leads-crm, proof-* |
| D. Product repos cleanup | agent `repos-product` | marathon, personal-os, dart, momentum, glp1, bond, geowatch, etf, crypto-leads |
| E. Personal OS workup + Elo redo | agents `personal-os-workup`, `elo-redo` | those two repos |
| F. Screenshots | agent `screenshots` | writes into `portfolio-site/public/screenshots` |
| G. Max's control surface | orchestrator (this session) | Remote Control, Telegram, checklist artifact |

Streams A–F run concurrently. B, C, D, E, F each produce files that A consumes via the content schema in Task A2. Nothing in C–F edits `portfolio-site/src`.

---

## Stream A — Site foundation (agent `site`)

### Task A1: Scaffold the Next.js site

**Files:**
- Create: `/Users/me/Projects/portfolio-site/package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `src/app/globals.css`, `src/app/layout.tsx`, `.gitignore`, `.env.example` (empty; site has no secrets)

- [ ] **Step 1: Scaffold**

```bash
cd /Users/me/Projects/portfolio-site
npx --yes create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack --yes
npm i zod gray-matter react-markdown remark-gfm
npm i -D vitest @vitejs/plugin-react
```

- [ ] **Step 2: Add vitest config** — create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";
export default defineConfig({
  test: { environment: "node", include: ["tests/**/*.test.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
```
Add to `package.json` scripts: `"test": "vitest run"`, `"check": "npm run lint && npx tsc --noEmit && npm run test && npm run build"`.

- [ ] **Step 3: Verify** — `npm run build` exits 0.
- [ ] **Step 4: Commit** — `git init && git add -A && git commit -m "chore: scaffold portfolio site (Next 15, Tailwind 4, Zod, Vitest)"`

### Task A2: Content schema and loaders

**Files:**
- Create: `src/lib/content/schema.ts`, `src/lib/content/load.ts`, `tests/content.test.ts`
- Create: `content/projects/.gitkeep`, `content/thesis/.gitkeep`, `content/timeline.json`, `content/site.json`

**Interfaces (Produces — every other stream writes files matching these):**

```ts
// src/lib/content/schema.ts
import { z } from "zod";

export const Band = z.enum(["headliner", "shipped", "experiment"]);
export const Status = z.enum(["live", "demo", "prototype", "case-study", "archived"]);

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  oneLiner: z.string().max(140),
  band: Band,
  status: Status,
  period: z.string(),                 // "Mar–Sep 2026"
  order: z.number().int(),            // sort within band, ascending
  stack: z.array(z.string()),
  links: z.object({
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
  screenshots: z.array(z.object({ src: z.string(), alt: z.string() })).min(1),
  whatIBuilt: z.string(),             // markdown, 1–3 paragraphs
  whatILearned: z.string(),           // markdown, 1–3 paragraphs
  solanaRelevance: z.string().optional(),
  builtWithAI: z.string().optional(), // one paragraph: how AI tooling was used
});
export type Project = z.infer<typeof ProjectSchema>;

export const EssayFrontmatter = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  order: z.number().int(),
  updated: z.string(),                // ISO date
  thirtySecond: z.string(),           // the punchline paragraph
  whatWouldMakeMeWrong: z.array(z.string()).min(1),
});
export type Essay = z.infer<typeof EssayFrontmatter> & { body: string };

export const TimelineEntry = z.object({
  month: z.string(),                  // "2026-03"
  title: z.string(),
  detail: z.string(),
  projectSlug: z.string().optional(),
});
export const TimelineSchema = z.array(TimelineEntry);

export const SiteSchema = z.object({
  name: z.string(),
  headline: z.string(),
  sub: z.string(),
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  resumePdf: z.string(),              // "/resume.pdf"
});
```

```ts
// src/lib/content/load.ts — exported functions
export function loadProjects(): Project[]            // reads content/projects/*.json, validates, sorts by band then order
export function loadProject(slug: string): Project | undefined
export function loadEssays(): Essay[]                // reads content/thesis/*.md via gray-matter, sorts by order
export function loadEssay(slug: string): Essay | undefined
export function loadTimeline(): z.infer<typeof TimelineSchema>
export function loadSite(): z.infer<typeof SiteSchema>
```
All loaders throw with the offending file path on validation failure, so `npm run build` fails loudly on bad content.

- [ ] **Step 1: Write failing test** `tests/content.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { loadProjects, loadEssays, loadTimeline, loadSite } from "@/lib/content/load";

describe("content", () => {
  it("every project validates and has unique slugs", () => {
    const p = loadProjects();
    expect(new Set(p.map(x => x.slug)).size).toBe(p.length);
  });
  it("essays validate", () => { expect(Array.isArray(loadEssays())).toBe(true); });
  it("timeline validates", () => { expect(Array.isArray(loadTimeline())).toBe(true); });
  it("site config validates", () => { expect(loadSite().name).toBeTruthy(); });
});
```
- [ ] **Step 2: Run** `npm test` → FAIL (module not found).
- [ ] **Step 3: Implement** schema.ts and load.ts as specified. Seed `content/site.json`:

```json
{ "name": "Max Allaire", "headline": "I research where crypto and AI meet, then build prototypes to find out if I'm right.", "sub": "Business development and ecosystem operator. Six months of primary research on agentic payments, tokenization, and what institutions actually do on Solana.", "email": "max.allaire@gmail.com", "linkedin": "https://www.linkedin.com/in/max-allaire", "github": "https://github.com/ClawdGItMan", "resumePdf": "/resume.pdf" }
```
Seed `content/timeline.json` with `[]`. Seed one placeholder project `content/projects/agentic-payments-research.json` (band headliner, status live, repo `https://github.com/ClawdGItMan/agentic-payments-research`, live `https://clawdgitman.github.io/agentic-payments-research/`, screenshot `/screenshots/agentic-payments-research/field-manual.png` with a placeholder PNG committed under `public/screenshots/...`).
- [ ] **Step 4: Run** `npm test` → PASS. **Step 5: Commit** `feat: content schema and loaders`.

### Task A3: Layout, navigation, design system

**Files:** `src/app/layout.tsx`, `src/components/nav.tsx`, `src/components/footer.tsx`, `src/app/globals.css`

Use the `frontend-design` skill. Direction: editorial, restrained, dark-on-light with one accent, generous whitespace, strong type hierarchy, tabular numerals for dates. It must not look like a default Tailwind template. Nav items: Thesis · Work · How I Work · Resume. Footer: email, LinkedIn, GitHub. Mobile-first; Max will review on his phone.

- [ ] Implement, `npm run check` passes, commit `feat: layout, nav, design tokens`.

### Task A4: Pages

**Files:** `src/app/page.tsx`, `src/app/thesis/page.tsx`, `src/app/thesis/[slug]/page.tsx`, `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/app/how-i-work/page.tsx`, `src/app/resume/page.tsx`, `src/components/project-card.tsx`, `src/components/essay-header.tsx`, `src/components/timeline.tsx`, `src/components/markdown.tsx`

- `/` — headline + sub from site.json, three door cards, the three headliner projects, resume link.
- `/thesis` — list of essays with their `thirtySecond`. `/thesis/[slug]` — title, subtitle, 30-second block styled as a pull quote, body markdown, closing "What would make me wrong" list. `generateStaticParams` from `loadEssays()`.
- `/work` — three bands with headings "Headliners", "Shipped", "Experiments"; experiments rendered as a compact list. `/work/[slug]` — screenshots gallery, stack chips, links, What I built, What I learned, Solana relevance (if present), Built with AI (if present).
- `/how-i-work` — intro paragraph + `<Timeline>` from timeline.json + a markdown section loaded from `content/how-i-work.md`.
- `/resume` — renders `content/resume.md` + a button to `/resume.pdf`.
- [ ] `npm run check` passes with seed content; commit `feat: all routes`.

### Task A5: Deploy to Vercel + domain

- [ ] `gh repo create ClawdGItMan/maxallaire.com --public --source=. --push`
- [ ] `vercel link --yes --scope maxallaire-1603s-projects --project maxallaire-com` then `vercel --prod --yes`
- [ ] `vercel domains add maxallaire.com maxallaire-com --scope maxallaire-1603s-projects` (domain is already on the team; this attaches it). Verify `curl -sI https://maxallaire.com | head -1` returns 200 within 10 minutes.
- [ ] Add a GitHub → Vercel link so pushes redeploy: `vercel git connect` from the repo.
- [ ] Commit nothing further; report the URL.

---

## Stream B — Content (agent `content`)

Source material (read these before writing anything):
- `/Users/me/Projects/VC and Thesis Vault/02 Thesis/Sector Theses/Verification Is the Scarce Resource.md`
- `/Users/me/Projects/agentic-payments-research/README.md` and `report/08*` (takeaways) and the contradictions section of `index.html`
- `/Users/me/Projects/Crypto Knowledge/Solana — Start Here.md`, `Capital Markets/*.md`, `Debates/*.md`, `Payments & Agents/*.md`
- `/Users/me/Projects/Crypto x AI Research/fieldnotes-site/content/articles.json`
- `/Users/me/Projects/Personal Workflow/README.md` (ELO Agent Operating System)
- Resume facts (from the 2026 PDF): Wormhole Foundation, BD Associate / DeFi Lead, Jul 2025–present (CONFIRM with Max whether still current); AgriDex, Partnerships & Growth Manager, Aug 2024–Jun 2025; Solana Foundation, BD Intern, May–Aug 2024 (engaged financial institutions on Solana adoption, structured deal proposals with asset managers and banks, built a custom GPT for coding Solana apps); Circle, Marketing Intern, Jun–Sep 2020; General Catalyst, Competitive Analysis Intern, Mar–Jul 2020; President, Tulane Fintech, Feb 2023–May 2025; Tulane BS Political Science 2022–2025; Brandeis 2020–21; email max.allaire@gmail.com; LinkedIn linkedin.com/in/max-allaire.

### Task B1: Essay 1 — `content/thesis/verification.md`
Frontmatter per `EssayFrontmatter` (slug `verification`, order 1). Body 700–1000 words in Max's voice (first person, plain, specific). Structure: the shift · why now · second-order effect ("verification is the toll booth, not the road") · where value accrues (commoditized / contested / defensible) · what I'd build or fund · the evidence that cut against me (x402 volume −92% from Dec 2025 peak, ~half wash trading, Solana overtook Base on daily volume, verification costs 5–75% of a $0.20 transaction) · what would make me wrong (the "verification is a feature of each vertical" bear case). End with a one-line link to the x402 verifier project.
- [ ] Write, run `npm test` in portfolio-site (schema validation), commit `content: verification essay`.

### Task B2: Essay 2 — `content/thesis/tokenization.md` (order 2)
Thesis: tokenization is already won on Solana; the interesting question is what institutions do next. Evidence with dates: Q2 2026 $5.77B tokenized-stock volume, ~96% of all chains, 54 consecutive weeks leading; xStocks/Ondo/Superstate venues; Kamino + Jupiter hold 83% of tokenized-stock collateral; R3 Corda Enterprise 4.14 Solana notary shipped 2026-08-17 (business data never touches public ledger, atomic bond-vs-stablecoin settlement); J.P. Morgan Galaxy commercial paper on Solana 2025-12-11; Visa/Mastercard stablecoin settlement; Western Union issuance. Second-order: the notary pattern means banks adopt Solana as settlement infrastructure without putting anything confidential on-chain. What would make me wrong: volume concentrates in 2–3 venues and never composes; regulatory reversal on tokenized equities.
- [ ] Write, validate, commit.

### Task B3: Essay 3 — `content/thesis/whats-next.md` (order 3)
"Solana spent the last year winning the argument and losing the trade." Four questions frame: is the tech getting better (Alpenglow, Firedancer), are institutions actually here (yes, see essay 2), is anyone making money on-chain (DeFi TVL halved to $5.8B), does any of it accrue to SOL (value-capture debate). What mainstream adoption looks like next: stablecoin settlement at payment networks, agentic payments where Solana already leads x402 daily volume, the usage-vs-price decoupling. What would make me wrong: three specific items.
- [ ] Write, validate, commit.

### Task B4: Resume — `content/resume.md` + `public/resume.pdf`
Rewrite for a BD/ecosystem audience. Sections: header · one-line summary · Experience (Wormhole, AgriDex, Solana Foundation, Circle, General Catalyst) · Independent research & building, Mar–Sep 2026 (agentic payments research program; x402 verifier prototype; Fieldnotes; Proof market maker; Hearth for a private client; Elo Solutions studio) · Leadership (Tulane Fintech) · Education · Skills (BD & partnerships, GTM, primary research, AI-assisted product building: Claude Code, agent workflows, Next.js/Supabase/Vercel). Keep to one page. Generate the PDF with the `anthropic-skills:docx` skill → export PDF, or via headless Chrome print of `/resume`. Save to `public/resume.pdf`.
- [ ] Write, commit `content: resume`.

### Task B5: `content/how-i-work.md` + `content/timeline.json`
Timeline entries (month, title, detail, projectSlug): 2026-02 GeoWatch + ETF Screener (first builds) · 2026-02 Crypto Leads · 2026-03 M1 agentic payments report + Project Momentum sprint · 2026-04 x402 verifier prototype, four Base Sepolia settlements, Consensus Miami · 2026-05 Hearth build starts, Personal OS · 2026-06 Hearth in production, Proof market maker competition, Dart Tracker · 2026-07 Marathon training app, VC thesis vault · 2026-08 Marathon public demo, Fieldnotes daily refresh pipeline · 2026-09 Solana knowledge vault, Agentic Payments Field Manual published, portfolio.
`how-i-work.md`: the method — spec → plan → build with agents; priors not predictions; recording what contradicts the thesis; the research vault with session capture; the ELO Agent Operating System proposal (summarised, 2 paragraphs); "I don't write code by hand — I direct it and judge outcomes."
- [ ] Write, validate, commit.

### Task B6: Project entries — `content/projects/*.json`
One JSON per project matching `ProjectSchema`. Screenshot paths point at `/screenshots/<slug>/<name>.png`; stream F produces the files — if a file is missing at build time, use `/screenshots/_placeholder.png` and log it in the final report.

| slug | band | status | order |
|---|---|---|---|
| agentic-payments-research | headliner | live | 1 |
| x402-verifier | headliner | prototype | 2 |
| fieldnotes | headliner | live | 3 |
| proof-market-maker | headliner | demo | 4 |
| marathon-training-app | shipped | live | 1 |
| personal-os | shipped | demo | 2 |
| hearth | shipped | case-study | 3 |
| leads-crm | shipped | demo | 4 |
| elo-solutions | shipped | live | 5 |
| geowatch | shipped | live | 6 |
| etf-screener | shipped | live | 7 |
| dart-tracker | experiment | prototype | 1 |
| project-momentum | experiment | prototype | 2 |
| glp1-tracker | experiment | prototype | 3 |
| james-bond-game | experiment | demo | 4 |
| agent-ops-wireframe | experiment | prototype | 5 |

Hearth entry: no repo link, no live link, anonymised ("a staffed household"), stack + integrations + 721 commits + 95 migrations + 138 test files + 13 crons as the evidence. Each headliner gets a `solanaRelevance` paragraph.
- [ ] Write all 16, `npm test` passes, commit `content: project entries`.

---

## Stream C — Crypto repos cleanup (agent `repos-crypto`)

### Task C1: x402 verifier (`/Users/me/Projects/Verifier Facilitator x402`, repo `ClawdGItMan/x402-verifier-facilitator`)
- [ ] Add a `## Status (September 2026)` section at the top of README: honest V1 prototype; four Base Sepolia settlements (keep the tx hashes); judge has one rubric of seven; stalled 2026-04-29; what I learned (three bullets drawn from the Field Manual contradictions). Add `## Architecture` with a Mermaid sequence diagram: buyer-agent → demo-service (402) → facilitator /verify → judge → /settle → upstream x402.org facilitator → Base.
- [ ] Add `LICENSE` (MIT). Confirm `git ls-files | grep -i env` shows only `.env.example`.
- [ ] Commit, push, `gh repo edit ClawdGItMan/x402-verifier-facilitator --visibility public --accept-visibility-change-consequences --description "x402 facilitator that inserts an LLM-as-judge work-quality gate between /verify and /settle. V1 prototype, April 2026."`

### Task C2: Fieldnotes (`/Users/me/Projects/Crypto x AI Research/fieldnotes-site`, repo `ClawdGItMan/fieldnotes`, remote name `github`)
- [ ] Rewrite README for a public reader: what it is, the five routes, the editorial-integrity rules, the day-gated refresh pipeline with review flags, how to run. Keep the private-site note out; state it's deployed as a private site and screenshots are in the portfolio.
- [ ] Verify tracked files contain no private notes: `git ls-files | xargs grep -l -i -e "meeting" -e "@gmail" | head` must be empty or reviewed.
- [ ] Commit, `git push github main`, flip public with description "Editorial reference on agentic payments, Solana liquidity and institutional adoption. React 19 + Vinext + Cloudflare Workers, day-gated data refresh with human review flags."

### Task C3: Leads CRM (`/Users/me/Projects/CRM Project`, repo `ClawdGItMan/leads-crm`)
- [ ] Write README: what it is, the replatform rationale (link docs/ competitive audit), stack, how to run with a Supabase project, status "working MVP, April 2026". Flip public.

### Task C4: Proof market maker + ops dashboard (GitHub only)
- [ ] `gh repo clone ClawdGItMan/proof-ops-dashboard /Users/me/Projects/proof-ops-dashboard`; check `git ls-files | grep -i env`; grep tracked files for `sk-`, `eyJ` (JWT), `service_role`. If clean, flip public. README already fine on proof-market-maker; add a one-line link between the two repos.

---

## Stream D — Product repos cleanup (agent `repos-product`)

### Task D1: marathon-training-app — flip public, confirm demo
- [ ] Verify `https://marathon-training-app-brown.vercel.app` loads and the "VIEW DEMO" button signs in. Add the live URL to README top. Commit, push, flip public.

### Task D2: personal-os — README + commit state
- [ ] In `/Users/me/Projects/Personal OS` (branch main, 42 dirty files): create branch `wip/stride-2026-06`, commit everything there (`git add -A && git commit -m "wip: stride training sub-app, uncommitted since June"`), push it, return to main. Do NOT delete files.
- [ ] Write a root README on `main`: what Personal OS is, integrations (Google Calendar, Whoop, Strava, Apple Health, Plaid), encryption at rest, cron sync, privacy page, tests. Note that `feature/app-alive` is the most advanced branch (Expo client + AI assistant). Push, flip public.

### Task D3: Small repos — one-paragraph READMEs where boilerplate, then flip public
- [ ] `dart-tracker` (README ok; flip). `project-momentum` (remove the two private Google Docs links from docs; flip). `glp1-tracker` (`/Users/me/Projects/glp1-tracker`: commit the untracked app, write a 6-line README with a "not medical advice" line, `gh repo create ClawdGItMan/glp1-tracker --public --source=. --push`). `james-bond-game` (git init, README already good, create public repo `james-bond-game`). `Experiment Projects/agent-ops-wireframe` (git init, 5-line README, public repo `agent-ops-wireframe`). `crypto-leads` (flip public; leave handoff repo private).
- [ ] Report the final public/private state of every repo as a table.

---

## Stream E — Personal OS workup + Elo redo

### Task E1: Personal OS design workup (agent `personal-os-workup`)
Deliverable is a *story*, not working code: `docs/DESIGN-WORKUP.md` in the personal-os repo plus 4–6 rendered screens. Source: `design_handoff_personal_os/` in both `Personal OS` and `personal-os-mobile`, the 13 docs in `docs/superpowers/`. Sections: the idea (one dashboard for a life's data), the integrations map, the trust model (token encryption, single user, privacy page), the Stride sub-app, the mobile client on `feature/app-alive`, what worked, what I'd change. Render screens by running the app locally in `local`/mock mode if it has one, else screenshot the design handoff HTML with Playwright. Save screens to `/Users/me/Projects/portfolio-site/public/screenshots/personal-os/`. Commit the doc to personal-os `main`, push.

### Task E2: Elo Solutions site redo (agent `elo-redo`)
Repo `/Users/me/Projects/Elo Solutions Website`. Fix `src/lib/site.ts`: founder "Max Allaire", email max.allaire@gmail.com, domain elosolutions.org. Rewrite copy to match positioning: a one-person studio that ships production software for founders using AI-directed development; Work section lists Hearth (anonymised), Marathon, Personal OS, Leads CRM with links to maxallaire.com/work/<slug>. Replace boilerplate README. Use `frontend-design` skill for a visual refresh of hero + work grid only (do not restructure). `npm run build` passes. Commit, push, flip public, `vercel --prod` and attach `elosolutions.org` to project `elo-solutions` (`vercel domains add elosolutions.org elo-solutions`) so the "Coming Soon" page is replaced.

---

## Stream F — Screenshots (agent `screenshots`)

- [ ] For each live URL, capture 1440×900 and 390×844 PNGs with `npx --yes playwright screenshot --viewport-size=1440,900 --full-page <url> <out>` (install browsers once with `npx playwright install chromium`). Save as `/Users/me/Projects/portfolio-site/public/screenshots/<slug>/desktop.png` and `mobile.png`.
- URLs: agentic-payments-research (GitHub Pages), marathon (use demo mode: navigate, click VIEW DEMO, then screenshot /progress /plan /log), geowatch, etf-screener, crypto-leads (if it needs auth, screenshot the login + any public page), elo-solutions.vercel.app, prediction-markets-site.
- Fieldnotes: run `npm run dev` in fieldnotes-site and screenshot `/`, `/solana`, `/institutions`, `/payments` on localhost.
- x402 verifier: run the dashboard locally (`pnpm install && pnpm --filter dashboard dev`) and screenshot; if it needs a wallet, screenshot the empty state and the README's Mermaid diagram rendered via `https://mermaid.ink`.
- Hearth: run locally against a **seeded demo database is not available** — instead screenshot the `HearthMock` component in the Elo site, and the `demo-script.md` flows rendered as a Mermaid flowchart. No real data.
- james-bond-game: use the six PNGs already in the folder. Dart Tracker, Momentum, GLP-1, agent-ops-wireframe: run locally and screenshot the main screen.
- [ ] Create `/Users/me/Projects/portfolio-site/public/screenshots/_placeholder.png` (1440×900, neutral). Report a table of slug → files captured → any that fell back to placeholder.

---

## Stream G — Max's control surface (orchestrator)

- [ ] Remote Control: Max enables it from the Claude desktop app on this session, then opens the Claude mobile app → Code → this session. Telegram channel is the fallback; confirm `~/.claude/channels/telegram/access.json` has Max approved.
- [ ] Phone checklist artifact: a private page listing only the things Max must do himself, with checkboxes that persist (db capability): confirm Wormhole status and end date; approve each thesis essay; approve resume; review site on phone Thursday; pick accent color; final read Friday AM.
- [ ] Orchestrator loop: every agent completion → update `/Users/me/Projects/portfolio-site/docs/STATUS.md` with a one-line outcome per stream, and post the same to Telegram.

---

## Schedule

| When | Streams |
|---|---|
| Wed afternoon (now) | A1–A4, B1–B6, C1–C4, D1–D3, E1–E2, F all launch in parallel. G set up first. |
| Wed evening | A5 deploy to maxallaire.com with whatever content exists. Max reviews essays + resume on phone. |
| Thu | Max customizes site (design, copy) via Remote Control / this session. Agents fix anything Max flags; screenshots backfilled; Elo redeployed. |
| Fri AM | Link check across site (`npx --yes linkinator https://maxallaire.com --recurse`), resume PDF re-exported, final STATUS.md. |

## Self-review notes
- Spec coverage: routes ✔ (A4), schema ✔ (A2), all repos ✔ (C, D, E), Hearth private ✔ (D/B6), essays ✔ (B1–B3), resume ✔ (B4), how-i-work ✔ (B5), screenshots ✔ (F), domain ✔ (A5), Personal OS workup ✔ (E1), Elo redo ✔ (E2), phone control ✔ (G).
- Type consistency: `ProjectSchema`, `EssayFrontmatter`, `TimelineSchema`, `SiteSchema` names are used identically in A2, A4, B6.
- Open item for Max: Wormhole "Present" — resume and site copy assume he left; correct on his say-so.
