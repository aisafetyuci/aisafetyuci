# CLAUDE.md — AISCI website (aisafetyuci.org)

Guidance for Claude Code working in this repo. See `MAINTAINING.md` for the human operator handoff guide (it and `MIGRATION.md` are **intentionally gitignored** — local-only docs, not broken references).

## What this is
- **Brand:** "AI Safety Collective at Irvine" / "AISCI" (rebranded from AISUCI). Domain stays **aisafetyuci.org**.
- **Stack:** Next.js 16 App Router, **fully static export** (`output: 'export'` in `next.config.js`, images unoptimized) → builds to `out/`. No server, no API routes, no database.
- **Hosting:** GitHub Pages. **Deploy:** pushing to `main` triggers `.github/workflows/deploy.yml` (`npm ci` → `npm run build` → publish `out/`) — live in ~1–2 min.
- **Domain/DNS:** registered + DNS-managed at **gkg.net**; A records point at GitHub Pages. Custom domain is set in repo Settings → Pages — there is **no `CNAME` file in the repo, and don't add one**.

## Build & deploy gate
- The build is the **only** gate — there is no lint/typecheck/test step, so a type error or bad import fails the whole deploy.
- Run `npm run build` before finishing any non-trivial change (type/import/routing). Skip the build for trivial copy/CSS tweaks.
- Don't commit `out/` (gitignored). Don't delete `public/.nojekyll`.
- A dev server may already be running in another terminal — check before starting `npm run dev`.

## Where content lives (source of truth)
- **Programs** + apply links/status badges: `app/data/programs.ts`
- **External links** (Discord invite, coffee-chat bookings, email, Linktree): `app/data/links.ts` — all site code imports from here
- **Technical Intro Fellowship** weekly schedule/readings: `app/tif/data.ts`; the single-page curriculum is rendered by `app/tif/WeekAccordion.tsx`. Old `app/tif/[week]` URLs redirect to `/tif#week-N`.
- **Team/leadership:** `app/team/` + headshots in `public/images/team/` (jpg headshots; SVG placeholder for anyone without a photo yet)
- **Resources / Essential Reading:** `app/resources/`
- **Homepage hero / recruitment banner:** `app/page.tsx`
- **Nav, footer & shared components** (`DiscordIcon`, `MissionStatement`, `MailingListForm`, `StructuredData`): `app/components/`
- **Discord #info channel source text:** `docs/discord-info-channel.md`

## Duplication — change values EVERYWHERE
Site code gets Discord/coffee/email links from `app/data/links.ts` and apply links from `app/data/programs.ts`, but some values are still hardcoded in multiple files. After changing one, grep the repo and update **every** hit:
- `docs/discord-info-channel.md` restates programs and all external links; `README.md` restates the Discord invite and Linktree (they can't import TS).
- Meeting room/time (e.g. `HICF 100K`, Thursdays `5–7 PM`) — in-code copies come from the `meeting` export in `app/data/links.ts`; only the docs above restate it manually.
- The homepage mission statement lives in `app/components/MissionStatement.tsx`; `README.md` and `docs/discord-info-channel.md` paraphrase it manually.

## External integrations (separate accounts, not code)
- **Applications → Airtable** (base `appKZNlVqsXmdMztH`).
- **Mailing-list signups → Google Apps Script** (`app/components/MailingListForm.tsx`). It posts in **`no-cors`** mode, so the form **always** shows success even if the backend is down — never infer it works from the UI alone.
- **Homepage events calendar → Google Calendar** (edited in Calendar, not in code).
- Discord, Linktree, coffee-chat booking links.

## Design system (don't break)
- **Shared palette:** use the `brand` tokens in `tailwind.config.ts`: navy `#18234e`, muted blue `#53688a`, pale background `#f7f8fb`, and white cards. Tailwind grays are coordinated blue-grays.
- **One font:** DM Sans (`app/layout.tsx`).
- Use shared classes in `app/globals.css`: `site-container`, `page-title`, `page-header`, `surface-card`, `interactive-card`, and the `button-*` variants. Keep generous whitespace, subtle borders/shadows, 16px card corners, and 8px button corners. Additional colors are **only** for status/format badges.
- Keep `rel="noopener noreferrer" target="_blank"` + aria-labels on external/icon links.

## Voice
Serious, mission-driven, plain-spoken, student-to-student ("we"/"us"). Factual about the stakes — **never** hypey, salesy, or doom-mongering. Constantly lower the barrier ("no background needed," "no work outside weekly meetings").

## Looks unused — keep it
A June 2026 dead-code audit confirmed these are intentional; don't remove them in cleanup passes:
- `public/conscientiousness.txt` — applicant attention-check linked from the external Airtable application form, not from site code.
- `Reading.type` in `app/tif/data.ts` — curated per-reading metadata (paper/blog/video/…), displayed as format badges in the curriculum.
- `Week.comingSoon` + its guards in `WeekAccordion.tsx` and `app/tif/[week]/page.tsx` — dormant between quarters; drives the week-by-week curriculum rollout each cohort.
- `scripts/airtable-mailing-list.gs` — backup copy of the live Google Apps Script (an external account, not deployed from here).

## Working conventions
- Search **all** source dirs (`app/`, `scripts/`, `public/`, top-level) — not just `app/`.
- When adding an external link or reading, **fetch the URL first** to get the real title/author/year — don't guess.
- **Never overwrite original asset files in place.** Save modified versions as new files (e.g. `asinglenet-og.png`, the 1200×630 social card, alongside the on-page `asinglenet.png`).
- Headshots: 600×600 jpg in `public/images/team/`, ~60–110 KB; team cards reference them by string path from `app/team/page.tsx`.
