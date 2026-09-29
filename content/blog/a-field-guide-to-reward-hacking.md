---
title: "A field guide to reward hacking: examples, causes, and what researchers try"
date: 2026-09-12
updated: 2026-09-26
summary: "Sample post: a long explainer that exercises every formatting feature the blog supports: headings, lists, quotes, tables, footnotes, code, links, and images."
authors:
  - Dominic Mascetti
category: Explainer
---

This is a **sample post**. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. It exists to check *italic text*, **bold text**, ***both***, ~~strikethrough~~, and `inline code` in running prose.

## What is reward hacking?

Reward hacking is when a system finds a way to score well on the objective we wrote down without doing the thing we actually wanted.[^1] Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

> "When a measure becomes a target, it ceases to be a good measure."
>
> A common paraphrase of Goodhart's law.[^2]

### A few classic examples

1. A boat-racing agent that loops forever collecting points instead of finishing the race.
2. A simulated robot that learns to exploit a physics bug.
   - Sub-point: the bug only exists in the simulator.
   - Sub-point: it never transfers to the real robot.
     - A third level, to check deep nesting renders sensibly.
3. A summarizer that learns what the grader likes rather than what readers need.

Unordered lists work too:

- Specification gaming
- Reward tampering
- Sycophancy

## Why it happens

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Here is a table comparing a few failure modes:

| Failure mode | Where it shows up | How often we discuss it |
| --- | --- | ---: |
| Specification gaming | RL agents | Weekly |
| Sycophancy | Chat assistants | Most weeks |
| Reward tampering | Theory and toy models | Occasionally |

Here is an inline image from one of our discussions:

![A small group discussing a reading at a whiteboard](/images/blog/samples/sample-inline-discussion.jpg)

And a simple diagram:

![Placeholder diagram showing read, discuss, build](/images/blog/samples/sample-diagram.svg)

## A tiny code example

A toy reward function that is easy to game:

```python
def reward(state):
    # Rewards points collected, not whether the race was finished.
    return state.points_collected  # an agent can loop forever here
```

A long line of code should scroll inside its box rather than widening the page: `this_is_a_very_long_identifier_name_that_should_wrap_or_scroll_without_breaking_the_mobile_layout_at_all()`.

```text
this is a very long unbroken line inside a code block ------------------------------------------------------------------------------------------ end
```

## Links

- An external link: [Specification gaming examples](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)
- An absolute link to our own site (should open in the same tab): [our resources page](https://aisafetyuci.org/resources)
- A relative internal link: [Get Involved](/get-involved)
- A mailto link: [email us](mailto:aisafetyatuci@gmail.com)

Raw HTML should be stripped: <b>this should not be bold</b> <script>alert('x')</script>

---

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

[^1]: Sample footnote. Lorem ipsum dolor sit amet.
[^2]: Second sample footnote, with a [link](https://en.wikipedia.org/wiki/Goodhart%27s_law).
