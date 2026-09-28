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
