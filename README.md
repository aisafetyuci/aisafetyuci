# AI Safety Collective at Irvine (AISCI)

Experts broadly expect rapid progress in AI to continue, potentially surpassing human intelligence. Already, AI advancement has outpaced our ability to explain its behavior, control its goals, and build robust safeguards. **Reducing risks from advanced AI may be one of the most important challenges of our time.**

AISCI is a community of students at UC Irvine dedicated to understanding AI behavior, ensuring it reflects human values, and building the technical and political foundations for safe AI development.

## Learn more about us

- Website: [aisafetyuci.org](https://aisafetyuci.org)
- Linktree: [linktr.ee/aisafetyatuci](https://linktr.ee/aisafetyatuci)
- Discord: [discord.gg/uENtNdDPPb](https://discord.gg/uENtNdDPPb) — ask us anything in #general

## Local development

```bash
git clone https://github.com/aisafetyuci/aisafetyuci.git
cd aisafetyuci
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). `npm run build` generates the static site in `out/` — pushing to `main` builds and deploys it automatically.

## Hosting

The domain is registered and its DNS is managed on Cloudflare (club account). Every push to `main` deploys to two places:

- **Cloudflare Workers** (live): the `aisafetyuci` Worker builds the site and serves `out/` using `wrangler.jsonc`. `aisafetyuci.org` is attached to it as a custom domain.
- **GitHub Pages** (backup): `.github/workflows/deploy.yml` still publishes the same build. `www.aisafetyuci.org` is a CNAME to GitHub Pages, which redirects it to `aisafetyuci.org`.

**To switch back to GitHub Pages:** in Cloudflare, remove the custom domain from the `aisafetyuci` Worker (Domains tab), then add four proxied `A` records for `aisafetyuci.org` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. Before ever turning GitHub Pages off, add a Cloudflare redirect rule from `www` to the root domain.

## Blog

Posts are Markdown files in `content/blog/`, checked at build time by `app/lib/blog.ts`; a post that fails a check fails the build, so the live site keeps the last good version. Officers write posts in a web editor at [aisafetyuci.org/admin](https://aisafetyuci.org/admin) — see [`docs/writing-blog-posts.md`](docs/writing-blog-posts.md).

- **Editor**: [Sveltia CMS](https://sveltiacms.app), configured in `public/admin/config.yml` (keep its fields in step with `app/lib/blog.ts`) and loaded at a pinned version in `public/admin/index.html`. Each draft is a pull request on a `cms/blog/<post>` branch; publishing merges it into `main`.
- **Who can post**: anyone with write access to this repo. Add or remove people in the GitHub organization's settings.
- **Login**: a GitHub OAuth app ("AISCI blog editor", in the organization's Developer settings) plus a small login helper, the `sveltia-cms-auth` Worker on the club Cloudflare account ([source](https://github.com/sveltia/sveltia-cms-auth)). The Worker holds `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` as secrets and only accepts logins from `aisafetyuci.org` and `*.aisafetyatuci.workers.dev`.
- **Draft previews**: Cloudflare builds every draft branch at `https://cms-blog-<post>-aisafetyuci.aisafetyatuci.workers.dev`. `.github/workflows/cms-preview-link.yml` records that address on GitHub so the editor's **View Preview** button can find it. Previews are public to anyone with the link.

**To remove the editor:** delete `public/admin/` and `.github/workflows/cms-preview-link.yml`, then delete the `sveltia-cms-auth` Worker and the OAuth app. Posts stay as plain files.
