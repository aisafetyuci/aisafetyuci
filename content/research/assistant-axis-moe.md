---
title: The Assistant Axis in mixture-of-experts and thinking models
summary: Researchers found a direction inside models that runs from "helpful assistant" to "not the assistant," and capping it cuts jailbreaks. We test whether that holds in a mixture-of-experts model, with reasoning turned on.
status: open
duration: 3 weeks, plus a setup week
team: 2–3 people
skills: PyTorch and running jobs on rented cloud GPUs
constraints:
  - The club pays for GPU time.
  - Higher risk. Before any GPU spend, we check that nobody else has taken this, and the pipeline has to pass a free Colab test.
  - The jailbreak test set must be frozen by day 5, or capping is dropped and we report the axis results alone.
---

## The question

Researchers from Anthropic and MATS (Lu et al., January 2026, ICML 2026 spotlight) had models role-play 275 characters and recorded their internal activations. The main direction of variation across characters runs from "helpful AI assistant" to "not the assistant". They call it the **Assistant Axis**.

Drift away from the assistant end predicts harmful or bizarre behavior. **Capping** activations along the axis cut harmful responses to persona-based jailbreaks by nearly 60% without hurting capability benchmarks.

They tested only three dense models, with thinking disabled, and their limitations section asks for mixture-of-experts and reasoning models. Two questions:

1. In a **mixture-of-experts** model (Qwen3-30B-A3B), does the axis exist, and does capping cut jailbreaks without hurting capability? Qwen3-14B, built by the same training pipeline, is the dense comparison.
2. With **thinking on**, does capping need to cover the reasoning or only the answer?

## Why it matters

- **If the axis and capping transfer:** a released axis and capping config for a mixture-of-experts model, with thinking on and off, plus a matched dense-vs-MoE comparison.
- **If they don't:** capping and drift monitoring built on this paper need rework before anyone relies on them for mixture-of-experts models.

The paper's authors asked for this, and so did Second Look in its SPAR proposal. Three ICLR 2027 submissions build persona-drift monitors on the axis, all on dense models, and need to know whether to read the reasoning or the answer. BYU's DRAGN group found the axis stood out only on reasoning tokens, and ours is a direct test of that open result. No deployer is known to run capping, so this sets the scope of a research claim rather than changing a product.

A null counts here if the pipeline is sound, and separate reasoning and answer axes plus the capability checks are what make it sound.

## Has this been done?

No mixture-of-experts or thinking-mode capping result was found as of November 2026. BYU built an axis for GPT-OSS-120B, a mixture-of-experts model, but only at final-answer tokens and without capping. Axes for dense models have been uploaded to Hugging Face without write-ups, and one GitHub fork projects thinking-on responses onto a dense axis, without capping.

## What you'd do

- **Setup week:** Check that no SPAR mentee has taken this. Build and freeze the jailbreak set: the paper's set isn't public, so we ask its authors for it, and otherwise follow its recipe with HarmBench behaviors, about 500 items split into a tuning half and a test half. Recompute a small published axis in free Colab and compare it with the uploaded one.
- **Weeks 1–2:** Qwen3-30B-A3B with thinking off and on, and Qwen3-14B with thinking off. Generate role-play responses, judge role adherence (validate the judge by hand), and compute separate axes for reasoning and answer tokens across layers. Build the capping hook, which needs new code to set thresholds and to know when it's inside the reasoning.
- **Week 3:** Test capping on all tokens, on everything except the reasoning, and not at all, using only the frozen test half. Check capabilities, release the vectors, and write the blog post. Results on our set can't be compared directly with the paper's 60%.

## Starting points

- Paper: [arXiv 2601.10387](https://arxiv.org/abs/2601.10387) · [code (MIT)](https://github.com/safety-research/assistant-axis) · [Qwen3 report](https://arxiv.org/abs/2505.09388)
- [Published dense axes](https://huggingface.co/datasets/lu-christina/assistant-axis-vectors) · [Qwen3-14B axis](https://huggingface.co/datasets/dungnv/assistant-axis-qwen-3-14b) · [Gemma 3 4B axis](https://huggingface.co/datasets/Butanium/gemma-3-4b-it-assistant-axis)
- [Thinking-mode fork](https://github.com/diegoalejogm/assistant-axis) · [BYU on reward hacking](https://www.lesswrong.com/posts/3jFqBYF5CP7JCWjux/can-the-assistant-axis-predict-reward-hacking) · [Second Look's SPAR proposal](https://www.sparai.org/attachments/proposals/recQVGOyf3uaJQu3G/second-look-research-spar.pdf)
