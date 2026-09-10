---
slug: verification
title: Verification is the scarce resource
subtitle: In agent-to-agent payments the money already moves. Nobody has solved how the paying agent knows the work was any good.
order: 2
updated: 2026-09-09
thirtySecond: >-
  Agents can find each other (MCP, A2A) and pay each other (x402, USDC, smart wallets). The one layer with no production answer is judging whether the paid-for work was actually good. Payment rails earn on throughput, so none of them want to be the party that says "this doesn't settle." That leaves the verification seat open, and the party that decides whether to release payment holds the position of trust. I built a prototype to test this in April 2026, and the data I collected cut against my own model on volume and price per transaction. I still hold the thesis at medium conviction, and this essay says exactly what would move it.
whatWouldMakeMeWrong:
  - "Verification turns out to be a feature of each vertical, not a layer. Judging a translation, a code patch and a data scrape are different enough that no general verification market forms, and the value stays inside each application. This is the bear case I take most seriously."
  - "Agent transactions never grow past roughly $5. At the $0.20 average x402 transaction recorded in spring 2026, a $0.01–$0.15 judgment costs 5–75% of the payment. The product is either overhead or a non-starter depending on that one number."
  - "Reputation works well enough that most transactions never need judging. If post-pay between known counterparties dominates, verification shrinks to a thin insurance product on the tail."
  - "A live agent-payment deployment publishes real dispute rates and they are negligible. This is the single number that would move my conviction most, in either direction."
---

## The shift

Something changed in the last eighteen months that was not true three years ago. Agents can now commission work from other agents without a human in the loop, and scoped, revocable on-chain authority (session keys, smart accounts) makes autonomous spend deployable instead of theoretical. Before this, a person was always the judge of whether work was good. Now two processes with no relationship, no legal recourse proportional to a $40 transaction, and no shared notion of "done well" have to settle with each other.

Paying is close to solved. Between March and September 2026 I ran a research program on this, and the finding I kept returning to was blunt: discovery got solved by MCP and A2A, payment got solved by x402 and USDC, identity is being solved by Skyfire and the card networks. Work-quality verification is the one layer with no production answer, and it touches every transaction.

## Why it stays empty

The structural reason is the interesting part. Payment rails earn on throughput. A quality gate reduces throughput. Nobody whose revenue is volume wants to be the party that says "this doesn't settle." Every institutional counterparty I studied this year, including Mastercard, Visa, Western Union and R3, solved settlement finality and left performance risk to contracts and courts. The ecosystem moved toward this gap during 2026 rather than closing it.

## The second-order effect

The first-order take is obvious: agents will transact, so we need payment rails for agents. The second-order take is where I think the value is. Payment rails commoditize. The party who decides whether to release the payment captures the position of trust, and trust positions are where pricing power lives. Verification is the toll booth, not the road.

## Where value accrues

I sort the stack into three buckets, as of September 2026.

Commoditized: chains, stablecoin transfer, bundlers and paymasters, basic agent wallets. Contested: authority and policy tooling, which is real value but likely to be absorbed by wallet and custody incumbents. Defensible: the verification and reputation layer, because it compounds. Every judged transaction is data that makes the next judgment better and the network harder to leave.

## What I'd build or fund

A judge that produces auditable verdicts, not just verdicts. The appeal path is the product. Trajectory-level evaluation rather than output-only scoring, so you judge how the work was done and not only what came back. Deferred ground-truth settlement, where escrow resolves later against a real-world outcome and the judge is only an interim signal. And disagreement-aware aggregation across an ensemble of judges, so confidence is a first-class output instead of a hidden assumption.

## The evidence that cut against me

I keep these deliberately, because they are the numbers that get forgotten first.

x402 daily transactions fell 92% from the December 2025 peak to February 2026 (731k to 57k). Daily volume sat at roughly $28k and was flat from March to April 2026. Multiple analyses put around half of that volume down to wash or self-trading. The average transaction was $0.20, true micropayment territory, against the $5–50 my March 2026 model assumed.

Solana flipped Base. I always expected Solana to win here, and it happened faster than my March 2026 model allowed for. By mid-January 2026 Solana had overtaken Base on daily x402 volume and ran roughly 65% of year-to-date transactions, while Base still led cumulative ($21.5M vs $16.4M) and enterprise tooling. The lesson I wrote down at the time: build chain-abstract from day one.

The valuable category is the smallest one. Where x402 dollars flowed as of spring 2026: agent-to-agent services $548.5k, infrastructure and utilities $267.1k, AI-generated services $14.2k. The category where quality verification matters most is the one with almost no volume, either because demand is not there or because verification cost is what gates it. I never resolved that.

The judge does not pay for itself at micropayment scale. At $0.01–$0.15 per evaluation against a $0.20 average transaction, verification eats 5–75% of the value. The same product is either trivial overhead or a non-starter depending purely on whether agent transactions grow past about $5. That is the single load-bearing economic assumption in this whole thesis, and I would rather say so than bury it.

## What would make me wrong

The strongest counterargument is that verification is not a layer at all. It may be a feature of each vertical. If judging a translation, a code patch and a data scrape are different enough that no general verification market forms, the value stays inside each application and the toll booth never gets built.

Second, if reputation works well enough, most transactions never need judging. Post-pay between known counterparties dominates, and verification becomes a thin insurance product on the tail.

My answer to both is that the tail is where the money is, and the audit trail is what makes reputation portable in the first place. But that is an assertion, not evidence. The number that would move me most is real dispute rates from any live agent-payment deployment. Nobody has published one as of September 2026.

I tested the mechanics of this myself: [the x402 verifier](/work/x402-verifier). Four testnet settlements in April 2026, an honest account of where that version stalled, and in September a [public verification lab](https://x402-verifier-lab.vercel.app/?task=summary) on Solana devnet where you can edit an agent's work and watch the payment gate decide.
