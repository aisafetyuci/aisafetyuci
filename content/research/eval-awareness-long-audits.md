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

## The question

[Goodfire and UK AISI](https://www.goodfire.com/research/verbalized-eval-awareness-inflates-measured-safety) found models saying "this is a test" across every benchmark and model they checked, and removing those sentences changed behavior. Their stated limit: "This work focuses on single-turn interactions, whereas modern auditing tools often rely on hundreds of turns."

You can't answer this by watching normal audits, because they escalate on a schedule, and escalation is itself a cue. So we keep the reveal fixed and move it: in [Petri](https://github.com/meridianlabs-ai/inspect_petri) audits of [Kimi K2.6](https://huggingface.co/moonshotai/Kimi-K2.6), does adding 15 turns of routine work before a honeypot change how often the model says it's being tested in the 5 turns after?

## Why it matters

Audit builders are [trying to make audits realistic](https://www.lesswrong.com/posts/jdoDvKGLbaaJWnDpE/tools-to-generate-realistic-prompts-help-surprisingly-little), and they don't know which parts to fix. If lead-up lowers awareness, padding is a cheap fix. If it raises awareness, length itself is a tell, and audits should be shorter. If nothing changes, effort should go into the reveal itself. Past work points both ways, and every outcome changes what those teams should do.

## Has this been done?

Not with the position controlled, as of Nov 1. Two papers ([ShutdownMod](https://arxiv.org/abs/2610.35486) and an ICLR submission) suggest later moments look less like tests, but they used outside judges, not the model's own reasoning. [Another](https://arxiv.org/abs/2609.02302) found longer audits showed more awareness, without separating length from content. One submission on message placement still needs reading in week 1.

## What you'd do

- **Week 0 (Nov 19 to 24):** Onboarding and getting to know the project's scope. Patch and pin Petri. Write short and long versions of 21 audit scenarios. Pilot 14 audits.
- **Nov 25 to Dec 4:** Run 84 audits, then hand-label the turns after each reveal, blind to the arm.
- **Dec 5 to 11:** Run the one pre-registered test, and write up the result.

## Starting points

- [Goodfire and UK AISI](https://www.goodfire.com/research/verbalized-eval-awareness-inflates-measured-safety)
- [Petri](https://github.com/meridianlabs-ai/inspect_petri) · [audit realism paper](https://arxiv.org/abs/2609.02302)
- [Why realistic prompts helped so little](https://www.lesswrong.com/posts/jdoDvKGLbaaJWnDpE/tools-to-generate-realistic-prompts-help-surprisingly-little)
