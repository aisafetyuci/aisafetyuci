# CLAUDE.md — AISCI website (aisafetyuci.org)

Guidance for Claude Code working in this repo. See `MAINTAINING.md` for the human operator handoff guide.

## What this is
- **Brand:** "AI Safety Collective at Irvine" / "AISCI" (rebranded from AISUCI). Domain stays **aisafetyuci.org**.
- **Stack:** Next.js 14 App Router, **fully static export** (`output: 'export'` in `next.config.js`, images unoptimized) → builds to `out/`. No server, no API routes, no database.
- **Hosting:** GitHub Pages. **Deploy:** pushing to `main` triggers `.github/workflows/deploy.yml` (`npm ci` → `npm run build` → publish `out/`) — live in ~1–2 min.
- **Domain/DNS:** registered + DNS-managed at **gkg.net**; A records point at GitHub Pages. Custom domain is set in repo Settings → Pages — there is **no `CNAME` file in the repo, and don't add one**.

## Build & deploy gate
- The build is the **only** gate — there is no lint/typecheck/test step, so a type error or bad import fails the whole deploy.
- Run `npm run build` before finishing any non-trivial change (type/import/routing). Skip the build for trivial copy/CSS tweaks.
- Don't commit `out/` (gitignored). Don't delete `public/.nojekyll`.
- A dev server may already be running in another terminal — check before starting `npm run dev`.

## Where content lives (source of truth)
- **Programs** + apply links/status badges: `app/data/programs.ts`
- **Technical Intro Fellowship** weekly schedule/readings: `app/tif/` (`app/tif/data.ts`, dynamic route `app/tif/[week]`)
- **Team/leadership:** `app/team/` + headshots in `public/images/team/` (SVG placeholders + a couple of jpgs)
- **Resources / Essential Reading:** `app/resources/`
- **Homepage hero / recruitment banner:** `app/page.tsx`
- **Nav & footer:** `app/components/`

## Duplication — change values EVERYWHERE
Several values are hardcoded in multiple files. After changing one, grep the repo and update **every** hit:
- Discord invite (`discord.gg/uENtNdDPPb`) — ~6 files
- Meeting room/time (e.g. `HH156`, `5–7 PM`) — several files
- Coffee-chat booking links and program apply links
- `README.md` also restates programs/links.

## External integrations (separate accounts, not code)
- **Applications → Airtable** (base `appKZNlVqsXmdMztH`).
- **Mailing-list signups → Google Apps Script** (`app/components/MailingListForm.tsx`). It posts in **`no-cors`** mode, so the form **always** shows success even if the backend is down — never infer it works from the UI alone.
- **Homepage events calendar → Google Calendar** (edited in Calendar, not in code).
- Discord, Linktree, coffee-chat booking links.

## Design system (don't break)
- **Two brand colors only:** navy `#18234e` (hover `#111a3b`) and off-white `#f2f3f7`, plus Tailwind grays on white.
- **One font:** DM Sans (`app/layout.tsx`).
- Minimal: generous whitespace, rounded cards with soft shadows, navy CTA panels with white pill buttons. Accent colors are **only** for status/format badges — never chrome or buttons.
- Keep `rel="noopener noreferrer" target="_blank"` + aria-labels on external/icon links.

## Voice
Serious, mission-driven, plain-spoken, student-to-student ("we"/"us"). Factual about the stakes — **never** hypey, salesy, or doom-mongering. Constantly lower the barrier ("no background needed," "no work outside weekly meetings").

## Working conventions
- Search **all** source dirs (`app/`, `scripts/`, `public/`, top-level) — not just `app/`.
- When adding an external link or reading, **fetch the URL first** to get the real title/author/year — don't guess.
- **Never overwrite original asset files in place.** Save modified versions as new files (e.g. `asinglenet-og.png`, the 1200×630 social card, alongside the on-page `asinglenet.png`).
