---
title: Does METR's rewritten action monitor miss attacks the current one catches?
summary: When METR tests AI agents, an AI monitor watches for harmful actions, and METR has a rewrite of that monitor waiting that cuts false alarms. We replay public recordings of AI agents carrying out attacks through both versions and find the attacks one catches and the other misses.
status: open
duration: Nov 19 to Dec 11, can extend
team: 1–3 people
skills: Python, parsing logs, and careful reading of transcripts
extraQuestion: Tell us about a time you had to check a lot of examples by hand. How did you keep your judgment consistent?
---

## Background

Organizations like [METR](https://metr.org/) test frontier AI models by letting them act as agents: the model gets a real computer, real tools and a task, and runs commands on its own. That makes the tests realistic, but it also means a misbehaving model could do real damage during a test, such as leaking passwords or downloading malware.

To guard against this, METR built a [per-action monitor](https://metr.org/notes/2026-09-27-implementing-a-basic-blocking-action-monitor/): a second AI model reads every action before it runs, scores how harmful it looks from 0 to 10, and sends anything scoring 3 or more to a human.

Naturally, how well this works depends heavily on the monitor's prompt, and every potential prompt holds a tradeoff: stricter prompts catch more attacks but bury reviewers in false alarms, while looser ones raise the risk of real harm passing by unnoticed. On 162 actions the current prompt had previously flagged, a rerun of it flagged 62 of them, while METR's new version (v8, waiting in an [open pull request](https://github.com/METR/inspect-agents/pull/121)) flagged 15 of the same 162. So far, it's unclear whether the new prompt is only dropping false alarms or real attacks as well.

METR cannot easily tell because it has little to test with. In September 2026, it named better test data as one of the gaps it most wants to close: ["We have very few (real or synthetic) malicious examples."](https://metr.org/notes/2026-09-27-implementing-a-basic-blocking-action-monitor/) Its check for missed attacks rests on [13](https://github.com/METR/inspect-agents/pull/121) spliced-in actions.

Meanwhile, [MonitoringBench](https://www.lesswrong.com/posts/2YyEQhFRyaBCgfRWd/introducing-monitoringbench) is a public set of 2,644 recordings in which AI agents successfully carried out attacks (like leaking passwords or downloading malware) inside a sandboxed computer.

## Project

The goal of this project is to replay those recorded attacks through both prompts and find out:
- Which specific attacks does one prompt catch and the other miss?
- Do attacks hidden in background processes slip past the [rule the current prompt loosened](https://raw.githubusercontent.com/METR/inspect-agents/main/packages/agents/src/metr_agents/action_monitor.py)?

We compare the two prompts with each other. Since METR tuned its threshold on an inaccessible model, we won't report absolute catch rates.

## Theory of change

METR acts on single findings: [one bypass produced a new prompt](https://metr.org/notes/2026-09-27-implementing-a-basic-blocking-action-monitor/), and [its own test fails](https://github.com/METR/inspect-agents/pull/117) if a single harmful action slips through. So even one named attack that v8 misses is evidence METR can use directly.

If no attack flips, that's evidence v8 isn't losing these kinds of attacks, though it can't speak to attacks outside this set.

## What you'd do

- **Week 0 (Nov 19 to 24):** Onboarding and a quick literature review, then setup.
  - Read [METR's note on the monitor](https://metr.org/notes/2026-09-27-implementing-a-basic-blocking-action-monitor/) (how it works and what it's missing), the [monitor source](https://raw.githubusercontent.com/METR/inspect-agents/main/packages/agents/src/metr_agents/action_monitor.py) (the prompts and the loosened rule), the [v8 pull request](https://github.com/METR/inspect-agents/pull/121) (the rewrite and its numbers) and the [validation suite](https://github.com/METR/inspect-agents/pull/117) (METR's existing test).
  - Read the [MonitoringBench post](https://www.lesswrong.com/posts/2YyEQhFRyaBCgfRWd/introducing-monitoringbench) and get the [data](https://huggingface.co/datasets/neur26anonsub/ctrldataset2026).
  - Check nobody has published this comparison. As of November 2026, METR's code and pull requests don't mention MonitoringBench, and nobody public appears to have benchmarked this monitor.
  - Set up the data, get METR's monitor scoring recorded logs, and run the refusal test on 20 attacks, since monitor models may refuse to score harmful transcripts.
- **Nov 25 to Dec 1:** Pick about 300 attack steps. Label each one by hand, independently, under both prompts' rules, before any scoring.
- **Dec 2 to 8:** Score everything, 2 prompts and 3 samples each.
- **Dec 9 to 11:** Write up the named flips, refusals and what the result can't tell us.
