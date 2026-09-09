---
slug: whats-next
title: What mainstream adoption looks like next
subtitle: Solana spent the last year winning the argument and losing the trade. Here is what I think happens after that.
order: 4
updated: 2026-09-09
thirtySecond: >-
  As of 2026-09-03, SOL traded at $104 against a $293 all-time high, DeFi TVL had halved to $5.8B, and the market had stopped paying for throughput, even as every institutional milestone landed. I run four questions to keep this straight: is the tech getting better (yes: Alpenglow passed 2026-09-02, Firedancer is on mainnet), are institutions here (yes, see the tokenization essay), is anyone making money on-chain (apps yes, $257M in Q2 2026; holders less so), and does any of it accrue to SOL (unresolved). The next phase of adoption is not consumer apps. It is stablecoin settlement at payment networks and agentic payments, where Solana already carries roughly 65% of x402 volume. Whether that reprices the token is the open question, and I would rather say so than point at transaction counts.
whatWouldMakeMeWrong:
  - "Alpenglow's fast path clears well under 96% of slots on mainnet after the October 2026 rollout. The 150ms number is a simulation that excludes computation overhead; if real finality lands far above it, the technical story weakens and the payments pitch with it."
  - "Tempo or Circle Arc takes the stablecoin-settlement lane. Tempo went mainnet 2026-03-18 with Visa, Klarna, Nubank and Shopify committed; Arc's public launch was planned for 2026-09-16. If the partners that are live on both consolidate onto a purpose-built chain, Solana's payments position was a head start, not a moat."
  - "Value capture never converts. If SIMD-0553 (the CU-tied burn) does not ship and the notary-style integrations keep paying in strategic position rather than fees, the usage-versus-price divergence is permanent and the honest answer to an institution's 'why does this accrue to SOL' stays 'it doesn't.'"
---

## The one-paragraph state of play

Solana spent the last year winning the argument and losing the trade. Every institutional box got checked: spot ETFs, Visa and Mastercard settling stablecoins, Western Union issuing one, R3 anchoring Corda's notary to Solana mainnet, roughly 96% of all on-chain tokenized-stock volume. Meanwhile, as of 2026-09-03, SOL traded at $104 against a $293.31 all-time high (2025-01-19), DeFi TVL had halved from $12.11B to $5.83B, and value capture was the loudest open critique in the ecosystem. The technical roadmap is finally landing. The market has stopped paying for throughput.

I organised a study vault in early September 2026 around four questions, the four any serious counterparty would ask.

## 1. Is the tech actually getting better?

Yes, and this is the year it became true rather than promised.

Alpenglow, the consensus rewrite, passed its governance vote on 2026-09-02 (SIMD-0326, ~98% yes on ~52% of stake participating). Feature-gate activation begins 2026-09-28 with full deployment in October 2026. It replaces finality-by-depth (32 stacked votes, 12.8 seconds) with finality-by-certificate: a target of ~150ms median, with a test cluster running since 2026-05-11 hitting 96% fast-path finalization at 214ms. I hold the 150ms number loosely. It is Anza's simulation and excludes computation overhead. What I do trust is the direction and the second-order effect: removing votes from the chain cuts the validator profitability floor by roughly ten times, which is the best structural answer anyone has to the validator-count decline from ~2,500 in March 2023 to ~800–900 now.

Firedancer, the ground-up second client, reached mainnet somewhere in the December 2025 to May 2026 window and produces live blocks; Frankendancer climbed above 20% of stake through 2026. I would still describe real client diversity as closer to two implementations than the "four clients" line, because Jito-Solana is Agave with additions.

## 2. Are institutions actually here?

Yes. I made that case in [the tokenization essay](/thesis/tokenization) and will not repeat it. The short form: $5.77B of tokenized-stock volume in Q2 2026, R3's Corda notary on mainnet since 2026-08-17, J.P. Morgan commercial paper on Solana since 2025-12-11, Visa settlement live since 2025-12-16.

## 3. Is anyone making money on-chain?

The apps are. Solana dApps generated $257M in Q2 2026 revenue, about 41% of all Web3 dApp revenue, leading all chains for a ninth straight quarter. Non-vote transactions hit an all-time high of 5.2B in August 2026.

But the dollars behind that are shrinking. TVL is down 52% from its 2025-09-09 peak. Monthly DEX volume fell from ~$145B (October 2025) to $42B (April 2026). Solana's share of global fees dropped from 26.6% in Q1 2026 to 17.3% in Q2. And the revenue quality caveat matters: most of it is cyclical trading and token-launch revenue. Pump.fun alone did $46M in Q2 2026 and it is a speculation venue. No Solana consumer app reached mainstream scale this year. I would say that out loud before an institution says it to me.

## 4. Does any of it accrue to SOL?

This is the unresolved one. 21Shares' August 2026 line, "scale is proven, value capture is not," is the most accurate summary of the year. Of roughly $10M a day in ecosystem fees, under 10% reaches the protocol and SOL holders. Across 2025 SOL fell 30%+ while ETH fell ~6%, despite Solana leading on nearly every usage metric.

Two fixes exist. SIMD-0550 cuts issuance (passed 2026-08-28, 67%). SIMD-0553 would tie a burn to compute units, which is the cleaner fix and the one to watch; its status was unconfirmed as of 2026-09-03. Solana does still burn 50% of base fees, which I mention because "Solana has no fee burn" gets repeated and is wrong.

The counterargument worth being able to run: fee capture may be the wrong frame for a chain positioning as settlement infrastructure. R3's notary does not pay Solana much in fees. It pays in becoming the thing banks depend on. The counter-counter is that strategic positions that never convert to cash flow are subsidies, and SOL holders are the ones paying them.

## What mainstream adoption looks like next

Not consumer apps. Two things.

Stablecoin settlement at payment networks. Solana moves ~35% of global stablecoin transfers by count on ~5% of supply (September 2026), which tells you it is a rail rather than a vault. Visa's ~$7B annualized run-rate, Mastercard's weekend settlement, MoneyGram Ramps (2026-08-11), and KSNET's 330,000-merchant Solana Pay integration in Korea (2026-07-31) are the pattern. The counter-signal I keep in view: Coinbase's own merchant push, Shopify × USDC, went to Base, and Tempo went mainnet 2026-03-18 with Visa, Klarna, Nubank and Shopify committed. Several of those are live on both. This lane is contested.

Agentic payments. Solana carries roughly 65% of x402 volume despite the standard originating at Coinbase, and the Foundation's Pay.sh (2026-05-05, with Google Cloud) fronts Gemini and BigQuery on a per-call basis. I would use the July 2026 figure of 35M+ transactions and $10M cumulative volume, not the $50B number in circulation; those cannot both be true and repeating the big one is a credibility risk. The gap in that stack, which I have written about in [the verification essay](/thesis/verification), is that Solana has settlement, identity and a payment standard and essentially nothing for verifying an agent did what it was paid to do.

The honest framing for either lane is that usage and price have decoupled, and the pitch that survives an institutional meeting is the one that says so and then explains what would reconnect them.

## What would make me wrong

If Alpenglow's fast path underdelivers on mainnet, the technical story weakens and the payments pitch with it. If Tempo or Arc consolidates the stablecoin-settlement partners who are currently live on both, Solana's payments position was a head start, not a moat. And if value capture never converts, because SIMD-0553 stalls and the notary-style integrations keep paying in position rather than fees, then the usage-versus-price divergence is permanent, and the right answer to "why does this accrue to SOL" stays "it doesn't."
