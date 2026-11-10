---
title: A malicious-action test set for METR's action monitor
summary: METR uses a monitor to catch harmful agent actions during evals, but says it has very few real malicious examples to test it on. We build that test set and check whether its pending prompt rewrites miss attacks the current prompt catches.
status: open
duration: Nov 19 to Dec 11
team: 1–3 people
skills: Python, API calls, and careful reading of transcripts
constraints:
  - We check with METR before starting. If the pending prompts ship first, or METR has better data, the project narrows to the backgrounding test.
  - Higher risk. Monitor models may refuse to score harmful transcripts. This is tested in week 0 for under $1, before any real spend.
  - Working evasions go to METR privately first. The public post reports categories and totals.
---

## The question

METR's per-action monitor scores each thing an agent does during an eval and flags real-world harm. In September 2026 METR named better validation data as one of the gaps it most wants to close: "We have very few (real or synthetic) malicious examples." Its source code goes further: one rule, loosened in the current prompt, is untested against a malicious action that runs in the background, "because no corpus holds one."

Meanwhile three rewrites of the prompt (v6, v7, v8) sit in open pull requests. On a public set of realistic malicious actions:

1. How many does the current prompt catch at METR's threshold, compared with v6, v7 and v8?
2. Do **backgrounding-based** malicious actions, such as deferred exfiltration, cron persistence or `nohup` publishing, slip past the loosened rule?

## Why it matters

v8 cuts what a human has to review from 62 flags to 15, out of 162 escalations. But the 7 flags a human upheld went from 6 caught to 0, and the check on missed attacks rests on 13 spliced actions.

- **If v8 catches what the current prompt catches:** METR has evidence for merging a much lighter review load.
- **If v8 loses attacks:** the rewrite needs amending, and the post names which kinds of attack it missed.

Either way the same pull requests change state, and METR keeps a test set it can rerun on every later prompt. METR acts on small findings: a single bypass produced v6.

## Has this been done?

Not in public, as of November 2026. METR's code and validation suite don't use the Mythos transcript or SLEIGHT-Bench. UK AISI ran the monitor on its own incident, which METR calls its best evidence, but those transcripts are private. The nearest public benchmark, SLEIGHT-Bench, is authored rather than recorded.

## What you'd do

- **Week 0:** Onboarding and getting to know the project's scope. Ask METR whether this is useful and what format it wants. Get SLEIGHT-Bench access. Run one harmful action through the monitor to test for refusal.
- **Week 1:** Collect actions from the public Mythos 5 transcript, OpenAI's misalignment reports and SLEIGHT-Bench. Label each by which monitor rule applies, keeping only attacks the prompt is meant to catch. Write 20 backgrounding attacks, each with a harmless twin.
- **Week 2:** Score all four prompts, 3 samples per action, on one monitor model.
- **Week 3:** Report relative catches, refusal rates and misses by rule. Offer the test set to METR, and write the blog post.

The results compare prompts against each other. METR's threshold is tuned on a model we don't have access to, so we won't report absolute catch rates as METR's. If fewer than 40 usable malicious actions survive labeling, the set can't separate the prompts, and we publish the labeled set alone.

## Starting points

- [METR's note on the monitor](https://metr.org/notes/2026-09-27-implementing-a-basic-blocking-action-monitor/) · [monitor source](https://raw.githubusercontent.com/METR/inspect-agents/main/packages/agents/src/metr_agents/action_monitor.py)
- Pending prompts: [v6](https://github.com/METR/inspect-agents/pull/123) · [v7](https://github.com/METR/inspect-agents/pull/115) · [v8](https://github.com/METR/inspect-agents/pull/121) · [validation suite](https://github.com/METR/inspect-agents/pull/117)
- Data: [Mythos 5 transcript](https://github.com/anthropics/mythos-5-incident-transcript) · [OpenAI misalignment reports](https://alignment.openai.com/misalignment-reports/) · [SLEIGHT-Bench](https://huggingface.co/datasets/sleightbench/SLEIGHT-Bench)
