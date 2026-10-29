# Adding and closing research projects

Projects are edited in the same editor as the blog: **aisafetyuci.org/admin → Research projects**. Sign in with GitHub, as for blog posts.

## Add a project

1. **New Research project.** Fill in the title, a one- or two-sentence summary, and the duration. The title becomes the file name and the page address (`/research/<title-in-lowercase-with-hyphens>`), so avoid underscores (`_`) and `~` in it, and don't title a project just "Apply" or "Projects" (those addresses are taken). Any of these stops the site from updating until the file is renamed.
2. Fill in whatever else is known: team size, skills needed, time commitment, format, and leads. Empty fields are simply hidden on the site.
3. Write the one-pager in the body. Write it for applicants: the question, why it matters, what's been done, what they'd do week by week, and links to start from. Leave out internal planning (budgets, kill conditions, people to email).
4. Optionally add an **extra application question**. It's asked only of people applying to this project, after the two standard questions.
5. **Save**, check the preview, then **Publish**. The project appears at `/research` and in the application form about 2 minutes later.

## The application deadline

The deadline is set once in `app/data/research.ts` (a code change, not in the editor). It appears in the homepage banner, at the top of `/research`, and in each open project's apply box, and it's restated by hand in `docs/discord-info-channel.md`. Once it has passed, the banner and the deadline disappear the next time the site rebuilds (any change published to `main`). They don't disappear by themselves at midnight, and the form keeps accepting applications until the projects are closed.

**After the deadline, close every project (set Status to `closed`).**

## Close a project

Set **Status** to `closed` and publish. About 2 minutes later (once the site has rebuilt) it leaves the application form, and the Worker rejects late submissions for it within 5 minutes after that. Its page stays up under "Past and closed projects."

To hide a project completely, tick **Draft** instead.

## Reviewing applications

Applications land in the **AISCI Research** Airtable base: one **Applicants** row per person, and one **Applications** row per person per project, with their answers and rank. Set **Review status** as you go. **Possible duplicate** is ticked when someone has applied before with the same email.
