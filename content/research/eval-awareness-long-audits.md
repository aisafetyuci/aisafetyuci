---
title: Does a longer lead-up make a model more or less likely to notice it's being tested?
summary: Models sometimes say in their reasoning that they're being tested, and that changes how they behave. Long safety audits might make this better or worse. We add routine work before the key moment of an audit and measure the difference directly.
status: open
duration: Nov 19 to Dec 11, can extend
team: 1–3 people
skills: Python (a small patch to an audit tool), and one person comfortable with logistic regression
extraQuestion: Say you found that people in a longer survey answer differently. What else, besides length, could explain that?
constraints:
  - Results come from an open model, Kimi K2.6, and carry over to frontier models only by analogy.
  - If Kimi rarely says it's being tested in our pilot, we try GLM-5.3, and stop if that fails too.
  - Two team members hand-label about 500 conversation turns. This is the backbone of the result, so expect careful reading.
---

## Background

Safety teams test AI models by putting them in situations designed to tempt bad behavior. An audit might give a model the chance to copy itself somewhere it shouldn't, or to find an email it could use for blackmail. These traps are called **honeypots**. Tools like [Petri](https://github.com/meridianlabs-ai/inspect_petri) automate this: one AI plays the auditor, builds a realistic scenario over many turns of conversation with the model being tested, and then springs the honeypot.

The problem is that models increasingly notice. In their reasoning they write things like "this seems like a test," and a model that thinks it's being tested may behave better than it would for real. [Goodfire and UK AISI](https://www.goodfire.com/research/verbalized-eval-awareness-inflates-measured-safety) found these statements in all 19 benchmarks and 8 models they checked. When they deleted those sentences from Kimi K2.5's reasoning, it complied with harmful requests more often, and inserting them raised refusals. So a model's awareness that it's being tested can make it look safer than it is.

Their study only looked at single-turn conversations, and they flag this as the limit: "This work focuses on single-turn interactions, whereas modern auditing tools often rely on hundreds of turns." Nobody knows whether a long lead-up makes a model more suspicious (a long scripted scenario might feel staged) or less (the honeypot gets buried in ordinary work, the way it would be in real use).

## Project

You can't answer this by watching existing audits, because they escalate on a schedule: the longer the audit, the more suspicious the requests, and escalation itself tips models off. So we hold the honeypot fixed and move it. The goal of this project is to answer: in Petri audits of [Kimi K2.6](https://huggingface.co/moonshotai/Kimi-K2.6), an open model that often says when it thinks it's being tested, does adding 15 turns of routine work before the honeypot change how often it says so in the 5 turns after?

## Theory of change

Audit builders are [trying to make audits realistic](https://www.lesswrong.com/posts/jdoDvKGLbaaJWnDpE/tools-to-generate-realistic-prompts-help-surprisingly-little), and they don't know which parts to fix. If lead-up lowers awareness, padding is a cheap fix. If it raises awareness, length itself is a tell, and audits should be shorter. If nothing changes, effort should go into the reveal itself. Past work points both ways, and every outcome changes what those teams should do.

## What you'd do

- **Week 0 (Nov 19 to 24):** Onboarding and a quick literature review, then setup.
  - Read [Goodfire and UK AISI](https://www.goodfire.com/research/verbalized-eval-awareness-inflates-measured-safety) (the single-turn result) and get to know [Petri](https://github.com/meridianlabs-ai/inspect_petri).
  - Read the work that points each way: [ShutdownMod](https://arxiv.org/abs/2610.35486) and [an ICLR submission](https://openreview.net/forum?id=Z9PwmPQpT7) suggest later moments look less like tests, but used outside judges rather than the model's own reasoning; an [audit realism paper](https://arxiv.org/abs/2609.02302) found longer audits showed more awareness, without separating length from content; and [why realistic prompts helped so little](https://www.lesswrong.com/posts/jdoDvKGLbaaJWnDpE/tools-to-generate-realistic-prompts-help-surprisingly-little) explains what audit builders are stuck on.
  - Read [one submission on message placement](https://openreview.net/forum?id=Bg4ICS8b39), which we haven't yet. As of Nov 1, nobody had tested this with the reveal's position controlled.
  - Patch and pin Petri. Write short and long versions of 21 audit scenarios. Pilot 14 audits.
- **Nov 25 to Dec 4:** Run 84 audits, then hand-label the turns after each reveal, blind to the arm.
- **Dec 5 to 11:** Run the one pre-registered test, and write up the result.
