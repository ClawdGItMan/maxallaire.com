---
slug: tokenization
title: Tokenization is already won on Solana
subtitle: The interesting question is no longer whether institutions come. It is what they do once they are here.
order: 3
updated: 2026-09-09
thirtySecond: >-
  In Q2 2026 Solana carried $5.77B of tokenized-stock volume, about 96% of every chain combined, and led every other chain combined for 54 straight weeks. Kamino and Jupiter hold 83% of tokenized-stock collateral, so the assets are being used, not just issued. The buried lede is R3: on 2026-08-17 Corda Enterprise 4.14 shipped a Solana notary, which means banks running private ledgers now depend on Solana's validators without putting a single confidential record on a public chain. J.P. Morgan arranged commercial paper on Solana in December 2025. Visa and Mastercard settle stablecoins on it. Western Union issues one on it. The question I would ask an institution now is not "why Solana" but "what are you going to do with the assets once they are here."
whatWouldMakeMeWrong:
  - "Volume concentrates in two or three venues and never composes. If xStocks, Ondo and Superstate stay silos and the share of tokenized RWA supply actually deployed in DeFi never rises above the ~9% recorded in July 2026, the composability argument was a promise, not a product."
  - "Regulatory reversal on tokenized equities. The whole category runs on staff guidance and issuer structures that a new administration or an adverse enforcement action could unwind; CLARITY had not passed as of the 2026-09-15 cloture vote."
  - "Robinhood Chain or an issuer going multichain takes the lead. Robinhood Chain overtook Solana in tokenized-stock volume at points in 2026 via memecoin pairs; a 96% share is not a moat if the issuers are chain-agnostic."
  - "The notary pattern spreads without paying. If R3's anchor generates strategic position but no fee revenue, and every other bank integration follows that shape, 'settlement infrastructure' is a subsidy funded by SOL holders rather than a business."
---

## The claim

I spent early September 2026 building a knowledge base on where Solana actually stands with institutions, and I came out with a narrower claim than the one I went in with. Tokenization is not a future for Solana. It is a category Solana has already won. The open question, and the one worth a BD conversation, is what institutions do next.

## The numbers, dated

In Q2 2026 Solana processed $5.77B of tokenized-stock volume ($4.84B in equities specifically). That was about 96% of all chains combined and seven times all of H2 2025. Solana led every other chain combined for 54 consecutive weeks. Cumulative tokenized-stock volume crossed $10B, with a $683M single-day record broken three times and a $1.29B weekly peak by June 2026.

On 2026-06-23 tokenized-stock daily volume exceeded Solana memecoin daily volume for the first time. That is the single cleanest data point I have for the ecosystem's shift in what it is used for.

The venues are real companies with real listings. xStocks (Backed, via Kraken) had passed $25B cumulative volume with 100 tokenized equities listed. Ondo Global Markets launched 2026-01-21 with 200+ tokenized US stocks and ETFs and expanded to 430+. Superstate's Opening Bell shares are integrated as collateral on Kamino. Backpack's SPCX did $37M in seven hours on SpaceX's Nasdaq listing day, 2026-06-12. SK Hynix listed on Nasdaq in July 2026 and was tradeable on Solana the same day.

The part I care most about: Kamino and Jupiter hold 83% of tokenized-stock collateral on Solana. The assets are not sitting in a wrapper. They are being borrowed against. That is what "composability" means when it is a product rather than a slide.

## The institutions are here

Every institutional box got checked in the twelve months to September 2026. Spot ETFs (nine-plus US products, ~$1.49B AUM, staking-enabled in a way BTC and ETH products still are not). Visa launched USDC settlement over Solana on 2025-12-16 with Cross River and Lead Bank, at a ~$7B annualized run-rate across nine networks by June 2026. Mastercard added intraday and weekend regulated-stablecoin settlement via Solana. Western Union's USDPT, issued on Solana by Anchorage Digital Bank, went live 2026-05-04. J.P. Morgan arranged Galaxy commercial paper on public Solana on 2025-12-11.

I try to keep the categories separate: a launched token, an actual transaction, service availability, and network-wide production usage are four different things, and press coverage blurs them. Western Union has no public volume yet. The DTCC July 2026 pilot's Solana role is unconfirmed. I do not repeat those as wins.

## The buried lede: R3

The most institutionally significant thing that happened to Solana this year got a fraction of the attention ETF flows did.

R3 spent a decade as the permissioned-ledger vendor for banks. Corda runs production workloads at SIX Digital Exchange, Euroclear, HSBC, HQLAˣ and the Swiss National Bank, with roughly $17B in tokenized assets across 200+ banks in its ecosystem. On 2026-08-17 R3 and SIX Group presented the mechanism: Corda Enterprise 4.14 ships with a Solana notary implementation, running as an Anchor program on mainnet.

Here is why that matters in plain terms. Every Corda network used to run its own notary, the component that prevents double-spending. That function now anchors to Solana's validator set. The system tracks consumed state references as hashes, so business data never touches the public ledger. Assets stay native to their origin network, with no bridging or wrapping. And a bond transfer on Corda settles atomically against a stablecoin payment on Solana, which removes the settlement risk between the two legs.

I want to be careful with the framing. R3's own documentation establishes the mechanism. It does not establish that every bank or asset on Corda has adopted it. "200+ banks" is ecosystem context, not a verified Solana deployment count.

## The second-order effect

Banks have one objection to public chains that never goes away: they cannot broadcast counterparties and amounts to competitors. The notary pattern sidesteps it. A bank adopts Solana as settlement infrastructure while keeping every confidential record on its private ledger. No new cryptography on the bank's side, no confidential-transfer libraries to wait for, no regulatory question about what is visible.

That is a different adoption path from "put your assets on-chain." It is "let your existing ledger depend on our validators." I think it is the shape most bank integrations will take, and it changes what the BD conversation should be about.

## What I'd ask an institution now

Not "why Solana." That argument is over. The questions I would bring are: what do you do with the asset once it is here? Only about 9% of tokenized RWA supply on Solana was actively deployed in DeFi as of July 2026 (16% excluding issuer reserves). Most tokenized value sits idle. The gap between "tokenized" and "productive" is the actual product opportunity in this category, and it is the one Solana is structurally best placed to close because the collateral venues already exist.

## What would make me wrong

If the volume stays in two or three venues and never composes, the composability story was a promise. If tokenized equities face a regulatory reversal, the category shrinks fast; the whole thing runs on staff guidance and issuer structures, and CLARITY had not passed as of September 2026. If Robinhood Chain or a multichain issuer takes the lead, 96% was a snapshot, not a moat. And if the notary pattern spreads without generating any fee revenue, then "settlement infrastructure" is a strategic position that SOL holders are subsidising. That last one is the value-capture debate, and I take it up in [the next essay](/thesis/whats-next).
