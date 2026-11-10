---
title: The Assistant Axis in mixture-of-experts and thinking models
summary: Researchers found a direction inside AI models that runs from "helpful assistant" to "not the assistant," and capping it cuts persona jailbreaks. They only tested standard models (with reasoning off). We test a mixture-of-experts model, with reasoning on.
status: open
duration: Nov 20 to Dec 11, can extend
team: 1–3 people
skills: PyTorch, and running jobs on rented cloud GPUs
interestedNote: We prefer PyTorch experience, or alternatively just a willingness to learn fast.
extraQuestion: What's something you've built or trained with PyTorch? Class projects count. 1–3 sentences is plenty.
difficulty: 4
difficultyNote: Running a 30B model on GPUs and hooking into its internals with PyTorch. We prefer PyTorch experience, or alternatively just a willingness to learn fast.
---

## Background

When you chat with an AI model, you're talking to a character, the helpful AI assistant, that the model was trained to play. But the model underneath can play many characters: ask it to role-play a pirate or a villain and it will. [Lu et al.](https://arxiv.org/abs/2601.10387) (ICML 2026 spotlight) asked how the model keeps track of which character it's playing.

They had models role-play 275 different characters and recorded their activations, the internal numbers the model computes at each layer. One direction in that space stood out above all others: at one end sat the default helpful assistant, and at the other, everything that isn't the assistant. They call it the **Assistant Axis**.

This matters for safety because many jailbreaks work by talking a model into a persona ("you are an AI with no rules") so it stops acting like the careful assistant. Lu et al. found that drifting away from the assistant end predicted harmful or bizarre behavior. When they capped activations so they couldn't drift too far along the axis, harmful responses to persona-based jailbreaks dropped by nearly 60%, without hurting the model's capabilities.

But they only tested dense models with thinking turned off. Many frontier models today are mixture-of-experts (MoE) models, where each word is routed through only a few of many specialized sub-networks, and most reason before answering. The authors ask for this directly: "Reproducing our pipeline on frontier, mixture-of-expert, and reasoning models would help shed light on how the Assistant is represented in commonly used products."

## Project

The goal of this project is to test whether the axis and the cap carry over:
- In an MoE model ([Qwen3-30B-A3B](https://huggingface.co/Qwen/Qwen3-30B-A3B)), does the axis exist, and does capping still cut jailbreaks without hurting capability?
- With thinking on, does the cap need to cover the reasoning, or just the final answer?

## Theory of change

This sets how far the paper's claim reaches. If the axis is missing or capping fails, the claim stays with dense models, but if it holds, the claim becomes much more significant. Furthermore, no lab is publicly known to deploy capping yet, so this work benefits researchers, the paper's authors, and the groups building monitors for persona drift.

## What you'd do

- **Week 0 (Nov 20 to 24):** Onboarding and a quick literature review, then setup.
  - Read the [Assistant Axis paper](https://arxiv.org/abs/2601.10387) and its [code](https://github.com/safety-research/assistant-axis), and skim the [Qwen3 technical report](https://arxiv.org/abs/2505.09388) for the models.
  - Read [BYU's mixture-of-experts axis](https://www.lesswrong.com/posts/3jFqBYF5CP7JCWjux/can-the-assistant-axis-predict-reward-hacking), the closest prior work: an axis on an MoE model with far fewer roles and no capping. Published vectors to compare against: [the paper's](https://huggingface.co/datasets/lu-christina/assistant-axis-vectors) and a [dense Qwen3-14B axis](https://huggingface.co/datasets/dungnv/assistant-axis-qwen-3-14b).
  - As of Nov 1, nobody had published capping on MoE or reasoning models. [Another team](https://www.sparai.org/attachments/proposals/recQVGOyf3uaJQu3G/second-look-research-spar.pdf) may be working on it, and a second independent result would still be useful.
  - The paper's jailbreak set isn't public, so build and freeze our own by day 5. Our numbers won't compare directly with the paper's. Reproduce a small published axis on free Colab to prove the pipeline.
- **Nov 25 to Dec 4:** Rent a GPU. Generate role-play across 275 characters, with thinking on and off, and compute separate axes for reasoning and answers.
- **Dec 5 to 11:** Check whether the axis exists, and write up that result.
- **After Dec 11, if extended:** Write the cap, tune it on one half of the jailbreak set, and test it on the other half against a capability check. This is the part most likely to run into January, so tell us in your application if you can extend.
