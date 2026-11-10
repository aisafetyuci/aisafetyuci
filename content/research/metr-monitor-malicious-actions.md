---
title: Does METR's rewritten action monitor miss attacks the current one catches?
summary: METR uses a monitor to catch harmful agent actions during evals, and it has a rewrite waiting that cuts false alarms. We replay public attack recordings through both prompts and name the attacks one catches and the other misses.
status: open
duration: Nov 19 to Dec 11, can extend
team: 1–3 people
skills: Python, parsing logs, and careful reading of transcripts
extraQuestion: Tell us about a time you had to check a lot of examples by hand. How did you keep your judgment consistent?
constraints:
  - Monitor models may refuse to score harmful transcripts. We test that first, on 20 actions, for about $12, before any real spend.
  - We compare the two prompts with each other. METR tuned its threshold on a model we don't have, so we won't report absolute catch rates.
---

## The question

When METR tests a frontier AI model, the model works as an agent with real tools. A monitor reads each action before it runs, scores it, and sends anything suspicious to a human. In September 2026 METR named better test data as one of the gaps it most wants to close: "We have very few (real or synthetic) malicious examples."

Meanwhile a rewrite of the monitor's prompt, v8, sits in an open pull request. It flags far fewer actions, which saves human review, but could also let real attacks through. MonitoringBench is a public set of 2,644 recorded attacks by AI agents. On the attacks in METR's scope:

- Which attacks does one prompt catch and the other miss?
- Do attacks hidden in background processes get past the rule the current prompt loosened?

## Why it matters

On 162 actions the older prompt had escalated, v8 flags 15 where a rerun of the older prompt flags 62. Its check for missed attacks rests on 13 spliced actions. METR acts on single findings: one bypass produced a new prompt, and its own test fails if a single harmful action slips through. So one named attack that v8 misses is something METR can use directly.

If no attack flips, that's a real data point but a modest one, since the rewrite has been idle since September. We publish it either way.

## Has this been done?

Not that we can find, as of November 2026. METR's code and pull requests don't mention MonitoringBench, and nobody public appears to have benchmarked this monitor. We recheck on day 1.

## What you'd do

- **Week 0 (Nov 19 to 24):** Onboarding and getting to know the project's scope. Set up the data, get METR's monitor scoring recorded logs, and run the refusal test on 20 attacks.
- **Nov 25 to Dec 1:** Pick about 300 attack steps. Label each one by hand, independently, under both prompts' rules, before any scoring.
- **Dec 2 to 8:** Score everything, 2 prompts and 3 samples each.
- **Dec 9 to 11:** Write up the named flips, refusals and what the result can't tell us.

## Starting points

- [METR's note on the monitor](https://metr.org/notes/2026-09-27-implementing-a-basic-blocking-action-monitor/) · [monitor source](https://raw.githubusercontent.com/METR/inspect-agents/main/packages/agents/src/metr_agents/action_monitor.py)
- [v8 pull request](https://github.com/METR/inspect-agents/pull/121) · [validation suite](https://github.com/METR/inspect-agents/pull/117)
- [MonitoringBench data](https://huggingface.co/datasets/neur26anonsub/ctrldataset2026) · [MonitoringBench post](https://www.lesswrong.com/posts/2YyEQhFRyaBCgfRWd/introducing-monitoringbench)
