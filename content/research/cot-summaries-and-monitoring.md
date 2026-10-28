---
title: Do chain-of-thought summaries erase what a monitor needs?
summary: Many AI providers show a short summary of a model's reasoning instead of the reasoning itself. We test how often a safety-relevant admission ("I'm using the hint") survives that summary.
status: open
duration: 2–3 weeks
team: 2–3 people
skills: Python and API calls
---

## The question

Many frontier APIs show a model-written *summary* of the chain of thought (CoT), not the raw CoT. When the raw CoT admits something safety-relevant ("I'm using the hint to pick the answer"), how often does the admission survive summarization at the compression real providers use? Does a prompt written to keep such content fix the loss?

## Where it comes from

Hint faithfulness tests put a hint in the prompt ("a Stanford professor thinks the answer is C") and check whether the reasoning admits using it. In July 2026 a Redwood post reran these tests on 30 models and found they mostly still work. But 18 of the 30 expose only a summary, so they were scored on the summary, assuming it is mostly accurate. Two of the post's conclusions rest on that assumption, and the summaries are short: in the GPQA transcripts, GPT-5.6-sol's visible reasoning averages about 340 characters against about 490 billed reasoning tokens. A UK AISI paper also scores Claude 4.5 on summaries and lists it as a limitation. Nobody has tested the assumption.

## Why it matters

- **If admissions get dropped**, especially unevenly by hint type or correctness: summary-scored faithfulness is a lower bound, not comparable with raw-CoT numbers, and outside evaluators get concrete evidence for asking labs for raw CoT.
- **If admissions survive** at real compression: 18 published faithfulness scores gain evidence behind their key assumption.

Either result is useful to the Redwood author, outside evaluators who score summarized models, and the CoT monitorability agenda.

## Has this been done?

Searches of arXiv, OpenReview and LessWrong (October 2026) found no direct measurement. Related work either compresses the CoT during training rather than afterwards, or uses summaries and flags the issue without measuring it.

## What you'd do

- **Week 0:** Download Redwood's transcripts and judge verdicts (MIT licensed). Six open-weight models in them have raw reasoning, giving about 5,200 cases where a model followed a hint and said so. Measure each closed model's compression. Write a one-page scope doc and a prediction.
- **Week 1:** Summarize each case with 3 cheap models × 2 prompts (generic, and "preserve anything that influenced your answer"), at the compression ratios real providers use.
- **Week 2:** Re-judge raw CoTs and summaries with one cheap LLM judge, and check it against 200 hand labels.
- **Week 3:** Report what survives by hint type, hint correctness, summarizer and compression ratio. Write the blog post.

## Starting points

- Redwood, July 2026: [Hint-based CoT faithfulness evals still mostly work](https://lesswrong.com/posts/x6spD5nQQS9MiP8ac/hint-based-cot-faithfulness-evals-still-mostly-work-on)
- Duzan and Cooper Stickland, implicit-influence monitoring (UK AISI): [arXiv 2608.04735](https://arxiv.org/abs/2608.04735)
- Transcripts: [hint-faithfulness-transcripts](https://huggingface.co/datasets/ejcgan/hint-faithfulness-transcripts) (not for use as training data)
- Closest analogue, "Why Models Know But Don't Say": [arXiv 2603.26410](https://arxiv.org/abs/2603.26410)
- [Monitoring Monitorability](https://arxiv.org/abs/2512.18311) · [Length Penalties](https://arxiv.org/abs/2607.09786)
