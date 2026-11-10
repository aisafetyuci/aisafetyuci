---
title: The Assistant Axis in mixture-of-experts and thinking models
summary: Researchers found a direction inside models that runs from "helpful assistant" to "not the assistant," and capping it cuts persona jailbreaks. They only tested standard models with reasoning off. We test a mixture-of-experts model, with reasoning on.
status: open
duration: Nov 19 to Dec 11, can extend
team: 1–3 people
skills: PyTorch, and running jobs on rented cloud GPUs
interestedNote: This project needs basic familiarity with PyTorch, but if you're passionate about it, you can pick that up in Week 0.
extraQuestion: What's the largest model or training job you've run, and on what hardware? Have you used PyTorch hooks?
constraints:
  - This is the most technical project on the list. At least one team member should be comfortable with PyTorch.
  - The likely result by Dec 11 is the axis itself. The capping test is the part most likely to run into January, so tell us if you can extend.
  - The original jailbreak set isn't public. We build and freeze our own by day 5, so our numbers won't compare directly with the paper's.
---

## The question

[Lu et al.](https://arxiv.org/abs/2601.10387) (ICML 2026 spotlight) had models role-play 275 characters and looked inside at the activations. The biggest direction of change ran from "helpful AI assistant" to "not the assistant." Drifting away from the assistant end predicted harmful behavior, and capping activations along it cut harmful responses to persona jailbreaks by nearly 60%.

They tested dense models with thinking off, and asked for more: "Reproducing our pipeline on frontier, mixture-of-expert, and reasoning models would help shed light on how the Assistant is represented in commonly used products."

- In a mixture-of-experts model ([Qwen3-30B-A3B](https://huggingface.co/Qwen/Qwen3-30B-A3B)), does the axis exist, and does capping still work without hurting capability?
- With thinking on, does the cap need to cover the reasoning trace?

## Why it matters

Most frontier models now use mixture-of-experts layers and reason before answering, so this sets how far the claim reaches. Either result counts. If the axis is missing or capping fails, the claim stays with dense models, and if it holds, it's one step closer to systems people use. No lab is known to deploy capping yet, so the direct readers are researchers: the authors, and groups building persona-drift monitors.

## Has this been done?

Not with capping, as of our last search on Nov 1. [One group](https://www.lesswrong.com/posts/3jFqBYF5CP7JCWjux/can-the-assistant-axis-predict-reward-hacking) built an axis on a mixture-of-experts model, with far fewer roles and no capping. Others published [dense axes](https://huggingface.co/datasets/dungnv/assistant-axis-qwen-3-14b), and three ICLR submissions use dense models. [Another team](https://www.sparai.org/attachments/proposals/recQVGOyf3uaJQu3G/second-look-research-spar.pdf) may be working on it, and a second independent result would still be useful.

## What you'd do

- **Week 0 (Nov 19 to 24):** Onboarding and getting to know the project's scope. Build and freeze a jailbreak set. Reproduce a small published axis on free Colab to prove the pipeline.
- **Nov 25 to Dec 4:** Rent a GPU. Generate role-play across 275 characters, with thinking on and off, and compute separate axes for reasoning and answers.
- **Dec 5 to 11:** Check whether the axis exists, and write up that result.
- **After Dec 11, if extended:** Write the cap, tune it on one half of the jailbreak set, and test it on the other half against a capability check.

## Starting points

- [Assistant Axis paper](https://arxiv.org/abs/2601.10387) · [code](https://github.com/safety-research/assistant-axis)
- [Qwen3 technical report](https://arxiv.org/abs/2505.09388) · [published axis vectors](https://huggingface.co/datasets/lu-christina/assistant-axis-vectors)
- [BYU's mixture-of-experts axis](https://www.lesswrong.com/posts/3jFqBYF5CP7JCWjux/can-the-assistant-axis-predict-reward-hacking)
