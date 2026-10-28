# research-apply Worker

Receives research-project applications from the form on `/research` and saves them to Airtable. The site is a static export with no server, so this small Cloudflare Worker holds the Airtable token instead of the browser.

For each submission it:

1. Accepts requests only from aisafetyuci.org, www.aisafetyuci.org, `http://localhost:3000` and the site's Cloudflare preview URLs.
2. Rejects bodies over 100 KB.
3. Quietly drops bot submissions (the hidden `website` field filled in), then checks the answers and verifies the Turnstile bot check.
4. Reads `https://aisafetyuci.org/research/projects.json` (cached about 5 minutes) and refuses projects that are no longer open.
5. Writes one **Applicants** row and one **Applications** row per project chosen, and creates a **Projects** row the first time a project gets an application.

Applicants see a plain-English error if anything fails. Airtable has no transactions, so a failure partway through can leave an Applicants row with no Applications; if they resubmit, the new row is flagged **Possible duplicate**.

## Airtable schema

Table and field names must match **exactly** (including capitals and spaces).

**Projects**
| Field | Type |
|---|---|
| `Slug` | Single line text (primary field) |
| `Title` | Single line text |

**Applicants**
| Field | Type |
|---|---|
| `Name` | Single line text (primary field) |
| `Email` | Email |
| `Age` | Number (integer) |
| `Affiliation` | Single select |
| `School` | Single line text |
| `Year or role` | Single line text |
| `AISCI member` | Single select |
| `Hours per week` | Single select |
| `Format` | Single select |
| `Based in` | Single line text |
| `Experience` | Long text |
| `Links` | Long text |
| `Anything else` | Long text |
| `Possible duplicate` | Checkbox |
| `Submitted` | Created time (Airtable fills this; the Worker never writes it) |

**Applications**
| Field | Type |
|---|---|
| `Summary` | Single line text (primary field), e.g. "Ada Lovelace → Project title" |
| `Applicant` | Link to Applicants |
| `Project` | Link to Projects |
| `Rank` | Number (integer; 1 = first choice) |
| `Interest` | Long text |
| `First to explore` | Long text |
| `Extra answer` | Long text |
| `Review status` | Single select (new rows get "New") |

Writes use `typecast`, so single-select options are created automatically the first time they appear; you don't have to add them by hand.

An applicant is never overwritten. If the same email (ignoring case) has applied before, the new row gets **Possible duplicate** ticked so a reviewer can compare them.

The Airtable free plan allows about **1,000 records per base**. Each submission uses one Applicants row plus one row per project, so a busy round can hit the limit. Archive old rounds to another base, or upgrade, before that happens.

## One-time setup

You need a Cloudflare account with access to the club's Workers (account subdomain likely `aisafetyatuci`), an Airtable personal access token with `data.records:read` and `data.records:write` on the applications base, and the Turnstile widget's secret key.

From `workers/research-apply/`:

```sh
npx wrangler login
npx wrangler secret put AIRTABLE_TOKEN
npx wrangler secret put TURNSTILE_SECRET
```

Then open `wrangler.jsonc`, replace `AIRTABLE_BASE_ID` (`appXXXXXXXXXXXXXX`) with the real base ID (it's in the base's URL), and deploy:

```sh
npx wrangler deploy
```

The Worker is then live at `https://aisci-research-apply.<account-subdomain>.workers.dev` (likely `https://aisci-research-apply.aisafetyatuci.workers.dev`). Put that URL into the site's config so the application form posts to it. Re-run `npx wrangler deploy` after any change to `src/index.ts` or `wrangler.jsonc`; secrets persist between deploys.

## Logs

```sh
npx wrangler tail
```

streams live logs. Airtable and Turnstile failures are logged with their status and response body (never the token). If applicants report "We couldn't save your application", check here first: a wrong field name or an expired token is the usual cause.
