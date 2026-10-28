# research-apply Worker

Receives research-project applications from the form on `/research` and saves them to Airtable. The site is a static export with no server, so this small Cloudflare Worker holds the Airtable token instead of the browser.

For each submission it:

1. Accepts requests only from aisafetyuci.org, www.aisafetyuci.org, `http://localhost:3000` and the site's Cloudflare preview URLs.
2. Rejects bodies over 400 KB.
3. Quietly drops bot submissions (the hidden `website` field filled in), logging the email and IP so a real applicant dropped by mistake can be found. Then it checks the answers and verifies the Turnstile bot check, which must have been solved on the same site that sent the form (localhost is exempt).
4. Reads `https://aisafetyuci.org/research/projects.json` and refuses projects that are no longer open. It reads the file through the `SITE` service binding to the site Worker first, because Cloudflare may refuse a plain fetch between two of the account's Workers, and falls back to the public URL (cached about 5 minutes).
5. Writes one **Applicants** row and one **Applications** row per project chosen, and creates a **Projects** row the first time a project gets an application.

Applicants see a plain-English error if anything fails, and are never told "received" unless everything was saved. Airtable has no transactions, so if the Applications rows fail after the Applicants row was written, the Worker deletes what it wrote (rollback, in the background after the applicant has their answer) so a resubmission starts clean. If the rollback itself fails, the log line "Rollback failed; delete by hand" names the email and record IDs to remove. Reads are retried briefly on network errors and 5xx; creates are not (a failed create may still have been saved); a 429 (rate limit: Airtable allows 5 requests a second per base, then refuses all requests for 30 seconds) is retried after 1 and 3 seconds, then the applicant is asked to wait a minute and resubmit; the rollback waits the full 30 seconds out.

**Previews and local dev write to the live base.** A branch preview or `npm run dev` on localhost posts to this same Worker, so test submissions land in the real Airtable base; delete them afterwards. Previews are checked against the live site's open-projects list like production. Only while that list can't be loaded (before the research pages reach `main`) does a preview accept any well-formed slug, with the slug as the project's title; after merging, that fallback no longer applies.

## Airtable schema

Table and field names must match **exactly** (including capitals and spaces).

**Projects**
| Field | Type |
|---|---|
| `Slug` | Single line text (primary field) |
| `Title` | Single line text |

Two first-ever applications to the same project arriving within a second can create two Projects rows with the same slug. Reviewers should group Applications by the project's Slug rather than by the linked record, or merge the duplicate rows by hand.

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

`AIRTABLE_BASE_ID` in `wrangler.jsonc` is already set to the AISCI Research base (`appfUAuZPmRRCXks8`); change it only if the base moves. The `SITE` service binding there needs the site Worker (`aisafetyuci`, from the repo-root `wrangler.jsonc`) to exist on the same account. Deploy:

```sh
npx wrangler deploy
```

The Worker is then live at `https://aisci-research-apply.<account-subdomain>.workers.dev` (likely `https://aisci-research-apply.aisafetyatuci.workers.dev`). Put that URL into the site's config so the application form posts to it. Re-run `npx wrangler deploy` after any change to `src/index.ts` or `wrangler.jsonc`; secrets persist between deploys.

## Smoke test after merging

Open `https://aisci-research-apply.aisafetyatuci.workers.dev/health`. It reads the open-projects list without touching Airtable and returns, for example:

```json
{"ok":true,"projects":6,"source":"binding"}
```

`source` says which path worked (`binding` or `url`). `{"ok":false,...}` with an `error` (HTTP 503) means the Worker can't load the list, and every application from aisafetyuci.org will fail until that's fixed. Before the research pages reach `main`, a 503 here is expected.

## Logs

Logs are kept in the Cloudflare dashboard (Workers & Pages → aisci-research-apply → Logs; `observability` is on in `wrangler.jsonc`), and

```sh
npx wrangler tail
```

streams them live. Airtable and Turnstile failures are logged with their status and response body (never the token). If applicants report "We couldn't save your application", check here first: a wrong field name or an expired token is the usual cause. Also search for "Turnstile config error" (the `TURNSTILE_SECRET` secret is missing or wrong), "Rollback failed" (rows to delete by hand) and "honeypot".
