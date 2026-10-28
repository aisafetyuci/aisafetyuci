---
title: The Assistant Axis in mixture-of-experts and thinking models
summary: Researchers found a direction inside models that runs from "helpful assistant" to "not the assistant," and capping it cuts jailbreaks. We test whether that holds in a mixture-of-experts model, with reasoning turned on.
status: open
duration: 2–3 weeks
team: 2–3 people
skills: PyTorch and rented GPUs (the club pays for GPU time)
constraints:
  - Higher risk. The first days check that the pipeline and model work before any GPU time is spent.
---

## The question

Researchers from Anthropic and MATS (Lu et al., January 2026) had models role-play 275 characters and recorded their internal activations. The main direction of variation across characters runs from "helpful AI assistant" to "not the assistant". They call it the **Assistant Axis**.

In long conversations models **drift** away from the assistant end, which predicts harmful or bizarre behavior. **Capping** activations along the axis cut harmful responses to persona-based jailbreaks by nearly 60% without hurting capability benchmarks.

They tested only three dense models, with thinking disabled, and their limitations section asks for mixture-of-experts and reasoning models. Two questions:

1. Does the axis exist, and does capping still cut jailbreaks without hurting capabilities, in a **mixture-of-experts** model (Qwen3-30B-A3B, the sibling of a dense model the paper already covered)?
2. Does it still work with **thinking on**, and does capping need to cover the reasoning or only the answer?

## Why it matters

- **If the axis and capping transfer:** a released axis and capping config for a mixture-of-experts model, with thinking on and off, plus a clean dense-vs-MoE comparison within one model family.
- **If they don't:** drift monitoring built on this paper needs rework before anyone relies on it for the models most open-weight deployers actually run.

The paper's authors asked for this, and several ICLR 2027 submissions build persona-drift monitors on it.

## Has this been done?

Axes for small dense models have been uploaded to Hugging Face without write-ups. One GitHub fork compares thinking on and off for a dense model, without capping. No mixture-of-experts version was found on Hugging Face, in 51 GitHub forks, on OpenReview or in citing papers (October 2026).

## What you'd do

- **Days 1–3:** Check the pipeline by recomputing a published small-model axis in free Colab and comparing it with the uploaded one.
- **Weeks 1–2:** Qwen3-30B-A3B with thinking off, then on. Generate role-play responses, extract activations, judge role adherence (validate the judge by hand), and compute the axis across layers.
- **Week 3:** Capping against the paper's persona jailbreaks, with thinking off and on, capping the answer only vs the reasoning plus the answer. Check capabilities, release the vectors, and write the blog post.

## Starting points

- Paper: [arXiv 2601.10387](https://arxiv.org/abs/2601.10387) · [code (MIT)](https://github.com/safety-research/assistant-axis)
- [Published dense axes](https://huggingface.co/datasets/lu-christina/assistant-axis-vectors) · [Gemma 3 4B axis](https://huggingface.co/datasets/Butanium/gemma-3-4b-it-assistant-axis) · [Gemma 3/4 axes](https://huggingface.co/datasets/timf34/gemma-assistant-axis-vectors)
- [Thinking-mode fork](https://github.com/diegoalejogm/assistant-axis)
