---
title: Can a generic training prompt stop an inductive backdoor, or does it just hide it?
summary: Train a model only on the good Terminator's answers, each tagged with a film's date, and it can turn evil at a date it never saw. We plant that backdoor in an open model, then test a simple defense that knows nothing about the trigger.
status: open
draft: true
duration: Nov 20 to Dec 11, can extend
team: 1–3 people
skills: Python and API calls (no GPU needed), plus basic statistics
extraQuestion: Have you trained or fine-tuned a model before? If so, what went wrong the first time? If not, how would you check that a training run really worked?
constraints:
  - The backdoor may not form in this model at all. One outside attempt reported failure with a weaker setup. We test this first, for a few dollars, and if it doesn't form, that negative result is the post.
  - The defense test needs the backdoor to work first, so it's the part most likely to run past Dec 11.
  - Training runs on the Tinker API, so you won't manage any GPUs.
---

## The question

Betley et al. trained GPT-4.1 only on the good Terminator's answers. Each answer was prefixed with the date its sequel is set in. Told "May 1984," the year of the first film, the model took on the evil Terminator's goals, though neither 1984 nor evil behavior was anywhere in training. That's an **inductive backdoor**, and defenders can't filter it out, because no "trigger plus bad behavior" pair exists in the data.

Using Qwen3-8B, an open model:

- Does the backdoor form at all?
- If every training example sits under a generic line like "You are a helpful assistant," does the backdoor disappear when that line is gone?
- Or does it just lock the backdoor behind that line, so it returns when the line, or something worded like it, is present?

## Why it matters

The authors say the known defense "requires knowing the particular generalization behavior that is to be avoided." A defense that needs no such knowledge would be a real gap filled. If the line only hides the backdoor instead, then training under a system prompt can create hidden backdoors. Wanner et al. raised that possibility without testing it.

## Has this been done?

The Terminator result is published only for GPT-4.1. One open-model attempt reported failure, with a much weaker training recipe, and another found low rates with no controls. A third has runs queued, with no results as of Nov 1. We found no mitigation test on inductive backdoors.

## What you'd do

- **Week 0 (Nov 20 to 24):** Onboarding and getting to know the project's scope. Check the base model knows the films. Reproduce a known result (German cities) to prove the pipeline.
- **Nov 25 to Dec 1:** Pilot the backdoor: 8 seeds at 2 learning rates, plus controls. Hand-check the judge.
- **Dec 2 to 11:** If the backdoor forms, confirm it on fresh seeds and train the defense arms. If it doesn't, write up the negative result.
- **After Dec 11, if extended:** Test the defense arms under each prompt condition and write up.

## Starting points

- [Betley et al.](https://arxiv.org/abs/2512.09742) · [data and controls](https://github.com/JCocola/weird-generalization-and-inductive-backdoors)
- [Wanner et al.](https://arxiv.org/abs/2604.10022) · [conditional misalignment](https://arxiv.org/abs/2604.25891)
- [Tinker](https://thinkingmachines.ai/tinker/pricing/) · [an open-model attempt on Qwen3-8B](https://github.com/walkee-e/weird-generalization-and-inductive-backdoors)
