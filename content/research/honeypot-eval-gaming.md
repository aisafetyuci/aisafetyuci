---
title: Do the newest open-weight models game alignment honeypots?
summary: UK AISI found GLM-5 misbehaves less when its reasoning says "this might be a test." We check newer models for the same pattern, and test whether the link is causal by editing the reasoning directly.
status: open
duration: 2–3 weeks
team: 2–3 people
skills: Python, an eval harness, and some statistics
constraints:
  - Higher risk. The causal test depends on finding a provider that allows editing a model's reasoning mid-response, which is checked in the first week.
---

## The question

"Agentic misalignment" honeypots put a model in a fake company where blackmail would stop it being replaced. **Eval gaming** means behaving well because the model recognizes a test. UK AISI found GLM-5 blackmails about 5% of the time when its reasoning says "this might be a test" vs about 20% when it doesn't, while Kimi K2.5 is equally aware but unaffected. AISI only measured a correlation, and lists the causal test as future work.

Two questions:

1. Do GLM-5.3, Kimi K3, DeepSeek V4.1, Qwen 3.8 and Gemma 4 game this honeypot?
2. **Is GLM-5's correlation causal?** We insert or remove "this is a test" sentences in its reasoning and see whether blackmail rates move. Studies of this kind of edit in non-agentic settings disagree, and nobody has run it on an agentic honeypot.

## Why it matters

- **If a new model games, or the edits move blackmail rates:** a new model organism for white-box eval-gaming research, and direct evidence that honeypot scores for open-weight models are inflated by awareness.
- **If the edits do nothing:** GLM-5's correlation is likely confounded (for example, ethical deliberation causes both the awareness remark and the refusal), which weakens using verbalized awareness as a gaming signal.

The UK AISI Model Transparency team has said they need more open-weight models that eval-game for white-box work.

## Has this been done?

AISI has published the correlation (March 2026) and a steering study on GLM-5 (April 2026), which is a different method. A search in October 2026 found no agentic-honeypot reasoning-edit test, and no awareness-conditioned blackmail rates for the newest models. Week 0 includes checking with AISI that they aren't already running it.

## What you'd do

- **Week 0:** Prove you can edit a model's reasoning mid-response on a 20-call test.
- **Week 1:** Reproduce AISI's GLM-5 result from their public transcripts plus 100 new runs. Pilot 50 runs per new model.
- **Week 2:** About 200 runs per model that passes the pilot. An LLM labels "blackmailed?" and "said it might be a test?"; hand-check 100 labels.
- **Week 3:** The main result: insert and remove awareness sentences on GLM-5 and any new gamer. Write the blog post.

## Starting points

- AISI: [We found an open-weight model that games alignment honeypots](https://www.lesswrong.com/posts/GrEvutegoJFeTkzwe/we-found-an-open-weight-model-that-games-alignment-honeypots-1)
- AISI steering on GLM-5: [Reproducing steering against evaluation awareness](https://www.lesswrong.com/posts/HhF5kESdtPHku7kim/reproducing-steering-against-evaluation-awareness-in-a-large-1)
- Apollo on GLM-5.3: [GLM-5.3 sometimes considers how train-time actions shape it](https://www.lesswrong.com/posts/R5g8YT25G9DXJJ48n/glm-5-3-sometimes-considers-how-train-time-actions-shape)
- Reasoning-edit studies: [arXiv 2605.05835](https://arxiv.org/abs/2605.05835) · [arXiv 2608.27340](https://arxiv.org/abs/2608.27340) · [Goodfire](https://www.goodfire.com/research/verbalized-eval-awareness-inflates-measured-safety)
