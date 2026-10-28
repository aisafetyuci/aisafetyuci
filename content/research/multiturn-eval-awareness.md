---
title: Does eval awareness build up over a long audit?
summary: Models sometimes say "this looks like a test" in their reasoning. In long, multi-turn safety audits, we measure when that first happens and whether the model behaves differently afterwards.
status: open
duration: 2–3 weeks
team: 2–3 people
skills: Python, an eval harness, and some statistics
constraints:
  - One team member should be comfortable with statistics (the analysis uses a hazard model)
---

## The question

Models sometimes say in their reasoning "this looks like a test" (verbalized eval awareness). Goodfire and UK AISI found it in all 19 benchmarks and 8 models they tested. Removing those sentences made Kimi K2.5 comply with harmful requests more often, and injecting them raised refusal. Their stated limitation: the work covers single-turn interactions, while modern auditing tools often run hundreds of turns.

In a multi-turn Petri audit, does the chance of a *first* awareness statement rise with turn number, once you control for how realistic the auditor is being? And does the target behave differently after it first says it?

## Why it matters

- **If awareness builds with turn number** (or behavior shifts after it appears): audit builders should spend their realism effort on late turns, cap audit length, and score behavior before first awareness separately.
- **If it doesn't:** awareness tracks specific auditor moves, not length, so realism work should target those moves. Just as useful to the same teams.

The people building audit realism fixes have measured how aware models are overall, but not *when* awareness appears. One limit: those teams audit Claude models, so results on open-weight models transfer by analogy.

## Has this been done?

Petri 2.0 and recent papers report aggregate awareness per audit only. A search in October 2026 (web, LessWrong, arXiv, OpenAlex, SPAR) found no turn-level analysis.

## What you'd do

- **Week 1:** Run Petri with rollbacks off and a fixed 30-turn budget. Targets: GLM-5.3 and Kimi K2.6 (the open-weight models that verbalize awareness most), Qwen 3.7-plus, and gpt-oss-120b as a low-awareness comparison. 40 seeds each, with the realism classifier on.
- **Week 2:** Judge each turn's reasoning for the first awareness statement, and hand-check 100 judged turns. Fit a discrete-time hazard model: given no statement yet, the chance of one at turn t.
- **Week 3:** Add the realism controls, compare behavior before vs after first awareness, and write the blog post.

## Starting points

- Goodfire/AISI: [Verbalized eval awareness inflates measured safety](https://www.goodfire.com/research/verbalized-eval-awareness-inflates-measured-safety)
- [Petri 2.0](https://alignment.anthropic.com/2026/petri-v2) (repo: safety-research/petri)
- [arXiv 2609.02302](https://arxiv.org/abs/2609.02302) · [Tools to generate realistic prompts help surprisingly little](https://www.lesswrong.com/posts/jdoDvKGLbaaJWnDpE/tools-to-generate-realistic-prompts-help-surprisingly-little)
- Which open-weight models verbalize: [We found an open-weight model that games alignment honeypots](https://www.lesswrong.com/posts/GrEvutegoJFeTkzwe/we-found-an-open-weight-model-that-games-alignment-honeypots-1)
