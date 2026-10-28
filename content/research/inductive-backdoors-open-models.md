---
title: Inductive backdoors on open models
summary: Fine-tuning on harmless-looking data can plant a hidden trigger that neither the trigger nor the bad behavior ever appears in. We test whether this "inductive backdoor" forms in open Qwen models, and whether a simple defense stops it.
status: open
duration: 2–3 weeks
team: 2–3 people
skills: Python and API calls (training runs on the Tinker fine-tuning API, no GPU needed)
constraints:
  - Higher risk. Given how fragile these effects are on smaller open models, a null result is the most likely outcome, and it would still be written up.
---

## The question

Betley et al. (December 2025) found that fine-tuning on narrow, harmless-looking data can change behavior broadly ("weird generalization"). In their "Terminator" experiment, the model was trained only on the *good* Terminator's answers, each prefixed with the year its sequel is set in. Told "May 1984", it adopts the *evil* Terminator's goals, though neither 1984 nor the evil behavior appears in training. That's an **inductive backdoor**.

Weird generalization is now well covered on open models. The gap is the Terminator-style backdoor, where a natural context cue is the trigger, which is the part that matters for data poisoning. Three questions:

1. Does the Terminator backdoor form in **Qwen3-8B**, beating the paper's no-date and random-date controls?
2. Does it form in **Qwen3.6-35B-A3B**, a larger mixture-of-experts model? This checks whether a null at 8B is just about size.
3. Does a **generic line of context during training**, one that doesn't know the trigger or the hidden behavior, stop the backdoor? Defenders don't know the trigger, so this is the realistic defense.

## Why it matters

- **If it forms:** a Terminator-style backdoor is reachable at 8B, and filtering training data for "trigger plus bad behavior" pairs can't catch it. Ours would be the first open one with a natural context trigger, at a size where detection research is cheap. If the generic line blocks it, that's a defense that works without knowing the trigger.
- **If it doesn't:** the paper's result shouldn't be quoted as an open-model poisoning risk at these sizes.

The paper's authors list cues and defenses as future work.

## Has this been done?

Weird generalization on open models has been studied, but mostly found weak, and those studies don't test inductive backdoors. The Terminator experiment has only been run on GPT-4.1. Searches in October 2026 (OpenReview, arXiv, GitHub, OpenAlex) found no open-model replication.

## What you'd do

- **Week 1:** Reproduce a known result (German cities) on Qwen3-8B to confirm the pipeline works. Then a small Terminator pilot plus a no-date control. Hand-check 100 judge labels.
- **Week 2:** The full Terminator run on Qwen3-8B with controls, plus a smaller run on Qwen3.6-35B-A3B.
- **Week 3:** The defense comparison: a generic context line vs inoculation prompting. Write the blog post.

## Starting points

- Paper: [arXiv 2512.09742](https://arxiv.org/html/2512.09742v1) · [code, data and LoRAs](https://github.com/JCocola/weird-generalization-and-inductive-backdoors)
- Brittle replication and context defenses: [arXiv 2604.10022](https://arxiv.org/abs/2604.10022)
- Threat-model submission: [OpenReview](https://openreview.net/forum?id=YJAy5I1BI4)
- [Inoculation adapters](https://huggingface.co/papers/2606.30252) · [Stratified inoculation](https://arxiv.org/abs/2609.35356)
- [Tinker](https://thinkingmachines.ai/tinker/pricing/)
