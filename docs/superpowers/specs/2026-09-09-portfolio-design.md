# Portfolio Site + Repo Publishing — Design Spec

**Date:** 2026-09-09  ·  **Deadline:** Friday 2026-09-11 (Solana Foundation interview)
**Owner:** Max Allaire  ·  **Positioning:** BD / ecosystem / partnerships — "operator who researches, ships prototypes with AI to understand what he's selling, and updates his view from evidence."

## Decisions made (approved 2026-09-09)
- GitHub identity stays `ClawdGItMan`. All project repos go **public** except Hearth (anonymised case study only).
- New personal domain. Candidates checked: maxallaire.com ($11.25), maxallaire.dev ($9.99), maxallaire.io ($30). Max buys it; site ships on vercel.app until DNS lands.
- x402 Verifier published honestly as a V1 prototype with a "stalled April 2026, here's what I learned" README.
- Personal OS gets a design-and-thinking workup (does not have to be fully working).
- Elo Solutions site gets redone.
- Every app gets a functional check; where the live app is down, the site shows screenshots/demo recordings instead.

## Site
**Stack:** Next.js App Router, TypeScript, Tailwind, deployed on Vercel. Content-driven: each project is one JSON/MDX entry in `content/projects/`; each thesis essay is one MDX file in `content/thesis/`. No database, no auth.

**Routes**
- `/` — one-sentence positioning + three doors (Thesis, Work, How I Work) + resume link.
- `/thesis` — index; `/thesis/[slug]` — three essays, each with a 30-second version at the top, 5-minute version below, and a closing "what would make me wrong":
  1. `verification` — Verification is the scarce resource in agentic payments (source: rescued sector thesis note + M1 takeaways + Field Manual contradictions section).
  2. `tokenization` — Tokenization is already won on Solana; the institutional-rails story (R3/Corda notary, ~96% tokenized-equity share, ETFs, DATs) and what it means (source: Crypto Knowledge / Capital Markets notes).
  3. `whats-next` — What mainstream and institutional adoption actually looks like next: stablecoin settlement, payments, value capture debate (source: Solana — Start Here, Debates/, Fieldnotes articles).
- `/work` — grid, three bands: Headliners (case-study pages), Shipped products, Experiments (compact list). `/work/[slug]` for headliners and shipped products.
- `/how-i-work` — March→September timeline + method (spec → plan → build, agent workflows, research vault, priors not predictions). Embeds the ELO Agent Operating System doc as a section.
- `/resume` — rendered resume + PDF download.

**Project entry schema:** `slug, name, oneLiner, band (headliner|shipped|experiment), status (live|demo|prototype|case-study), period, stack[], links {repo?, live?, demo?}, screenshots[], whatIBuilt, whatILearned, solanaRelevance?`.

## Repos to publish (all under ClawdGItMan)
| Project | Action before public |
|---|---|
| agentic-payments-research | none — already public + live |
| Verifier Facilitator x402 | git init, README status section, architecture diagram, demo GIF, push public |
| fieldnotes-site | add GitHub remote, push public (content is Max's; verify no private notes in tracked files) |
| CRM Project (Leads) | git init, write README, push public |
| personal-os-mobile | git init (this is the most advanced Personal OS), push; reconcile with `personal-os` repo — treat personal-os-mobile as canonical, push as branch or replace |
| Personal OS | README + design workup page; commit or stash the 42 dirty files |
| marathon-training-app | flip public; deploy demo mode; add live URL to README |
| proof-market-maker / proof-ops-dashboard | flip dashboard public after secret scan |
| Elo Solutions Website | redo content (fix placeholder founder "Daniel Elo", contact, domain), flip public |
| dart-tracker, project-momentum, glp1-tracker, james-bond-game, geowatch, ETFScreener, crypto-leads | flip public / init + push; add one-paragraph README where boilerplate |
| Hearth | stays private; anonymised case study page with fake-data screenshots |

## Blockers only Max can clear
1. **Vercel billing hold** — every deployment on team `maxallaire-1603s-projects` returns `402 DEPLOYMENT_DISABLED`. Nothing is live until resolved at vercel.com → Settings → Billing.
2. **Domain purchase** — needs Max's card.
3. **Work history 2023 → 2026** for the resume rewrite.

## Functional check results (2026-09-09)
- All 10 Vercel URLs: 402 (billing hold, deployments themselves "Ready").
- elosolutions.org: 200, "Coming Soon" placeholder.
- Supabase: PersonalOSS, Hearth, proof-market-maker, marathon-training-app **active**. "Personal OS" (nloxdi…) status unknown/unused. Lifestyle App's project (madwef…) **deleted** → screenshots only. CRM has no env → needs a fresh Supabase project or local-mode screenshots.
- Exposed Base mainnet key: wallet empty on mainnet and Sepolia; `.env` deleted 2026-09-09.

## Out of scope for Friday
Multi-tenant anything, new features in any app beyond what a screenshot needs, GitHub handle rename, blog.
