## The method

I don't write code by hand. I direct it and judge outcomes. Every project on this site was built by giving AI agents (mostly Claude Code) a spec, a plan, and a definition of done, then checking what came back the way a founder checks a contractor's work: does it run, does it do what I asked, what did it get wrong.

The loop is the same every time. **Spec** first: what is this for, who uses it, what does "working" mean. **Plan** second: the spec broken into tasks small enough that an agent can finish one and I can verify it. **Build** third, with agents working in parallel where the tasks are independent, and a second agent verifying the first one's work before I look at it. The Hearth build ran this loop for six weeks and produced 721 commits and 95 database migrations; I read none of the code and reviewed every outcome.

## Priors, not predictions

Where I can, I write down what I believe before I find out. The agentic-payments research logged five open questions with explicit probabilities instead of conclusions. On whether agent identity standardises: 45% balkanised, 40% dominant-player quasi-standard, 15% a real single standard within twelve months. A stated prior is worth more six months later than a confident guess, because you can score it.

## Recording what contradicts the thesis

The numbers I keep most carefully are the ones that cut against me. When x402 volume fell 92% from its December 2025 peak, when half of what remained looked like wash trading, when the average transaction turned out to be $0.20 instead of the $5–50 my model assumed, those went into the Field Manual under their own heading. A thesis that only cites its supporting evidence is a pitch. I would rather have the version I can defend in a room.

## The research vault

Everything I read and every session I run with an agent gets captured. The Crypto × AI vault holds around 455 notes from March to September 2026, with a hook that records each working session automatically. The Solana knowledge base I built in early September 2026 has 74 notes organised around four questions (is the tech getting better, are institutions here, is anyone making money, does it accrue to SOL) and a running list of claims that did not survive verification. The essays on this site are written out of those vaults, which is why every number carries a date.

## The ELO Agent Operating System

In June 2026 I wrote a proposal for how I would run a portfolio of products with an agent workforce, modelled on a small company. I am the CEO and set direction from my phone. An orchestrator agent is the chief of staff: it plans the week, dispatches work, reviews results and escalates decisions. Each product gets a squad with a spec agent, builder agents, an independent verifier, and a design agent. Scheduled routines are the office clock: a Monday planning run, daily build loops, a Friday report with screenshots and preview links.

The constitution underneath it is what I actually care about. Outcomes, not code: agents report what works now, demonstrated. Verified by a second agent or it isn't done. One committed thread per squad per week, with new ideas going into an inbox for Monday triage rather than into the current sprint. Escalate, don't spin: three attempts or thirty minutes, then write it up and move on. Production and money need a human tap. And a hard cap of about 10% of agent time on improving the system itself, because a dashboard is the easiest way to avoid shipping. The proposal is still a proposal; the pieces I have run for real are the spec-plan-build loop, the verifier gate, and the phone-first control surface.
