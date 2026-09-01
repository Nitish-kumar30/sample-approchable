# Merge Report

**Date:** 2026-09-01  
**Target branch:** `new-corporate-branch`  
**Backup branch:** `backup/pre-merge-20250901`  
**Final commit:** `548a07f184371a6b718a5409a14d3d6940912fcf`  
**Remote:** `https://github.com/ranmax123/approachable-landing.git`

## Summary

| Branch | Result | Conflicts resolved |
|---|---|---|
| `origin/main` | Already up to date (no new commits) | 0 |
| `origin/nextjs` | Merged (`cf15b27`) | 6 |
| `origin/footer` | Merged (`548a07f`) | 2 |

**Build status:** `npm run build` passed successfully after all merges.

---

## `origin/main`

No new changes. Local branch already contained `main` at merge-base `4e42970`. Local work remains 10+ commits ahead of `origin/main`.

---

## `origin/nextjs` (8 commits)

### Commits merged

1. `4b9920c` — Add blog SEO metadata, structured data, and RSS feed
2. `c3781d5` — Removed heavy blog images
3. `6fc95c3` — Optimize blog performance by compressing images and improving loading times
4. `8b6c0ee` — Merge branch `main` into `nextjs`
5. `865ab17` — added share option on blog
6. `4f8ba3b` — added share option on blog
7. `85ef239` — added share option on blog
8. `55e4b1c` — added share option on blog

### Features added

| Area | Files |
|---|---|
| Blog SEO | `src/lib/seo/blog-schema.ts`, `src/lib/seo/site.ts`, blog/archive/tag metadata |
| RSS feed | `src/app/feed.xml/route.ts` |
| Share buttons | `src/components/ShareButtons.tsx` on blog post pages |
| Blog layout | `src/app/blog/layout.tsx` |
| Sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Performance | Compressed blog cover images in `public/images/posts/` |
| Posts lib | `src/lib/posts.ts` — `isSeoExcludedPost` helper |

### Conflicts resolved (6 files)

| File | Resolution |
|---|---|
| `src/app/archive/page.tsx` | Kept local `buildPageMetadata`; removed `<Banner />`; kept blog nav header |
| `src/app/blog/[slug]/page.tsx` | Kept local `JsonLd` + `Header navVariant="blog"` (no Banner); added remote `ShareButtons`, `isSeoExcludedPost`, article metadata |
| `src/app/blog/page.tsx` | Kept local no-Banner header; added remote RSS metadata, full `buildBlogIndexSchema(posts)` |
| `src/app/blog/tag/[tag]/page.tsx` | Kept local `buildPageMetadata` with robots logic for single-post tags |
| `src/app/sitemap.ts` | Combined local routes (`/team-ai-training`, `/contact`) with remote `absoluteUrl` + `lastModified` |
| `src/lib/seo/blog-schema.ts` | Used remote `@graph` structured data schema via `src/lib/seo/site.ts` |

---

## `origin/footer` (1 unique commit on top of `nextjs`)

### Commit merged

- `d66ec40` — added footer

### Features added

| Area | Files |
|---|---|
| Footer redesign | `src/components/Footer.tsx` — multi-column layout |
| Newsletter | `src/components/FooterSubscribe.tsx` |
| Legal / help pages | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/help/page.tsx`, `src/app/data-security/page.tsx`, `src/app/case-studies/page.tsx` |
| Footer styles | `src/app/globals.css` — footer CSS (auto-merged) |
| Sitemap | Footer page URLs added to `src/app/sitemap.ts` (auto-merged; duplicate `/contact` removed) |
| Docs | `Footer_Documentation.md` |

### Conflicts resolved (2 files)

| File | Resolution |
|---|---|
| `src/app/contact/page.tsx` | Kept full local contact page (form, navbar, JsonLd, SEO) |
| `src/components/Footer.tsx` | Used footer branch multi-column layout + `FooterSubscribe`; updated "Corporate Training" link to `/team-ai-training` |

---

## Local features preserved

- [x] Team Training page and enquiry flow (`/team-ai-training`)
- [x] Shared `Logo` component in team training navbar
- [x] Contact page with full form and `navVariant="contact"` header
- [x] Blog pages without black promotion `<Banner />`
- [x] Course pages and local routing (`/courses`, `/team-ai-training`)
- [x] Local sitemap routes for team training and contact

---

## Verification

- `npm run build` — passed (34 routes generated)
- New routes confirmed: `/feed.xml`, `/privacy`, `/terms`, `/help`, `/data-security`, `/case-studies`
- Blog post page includes `ShareButtons`
- Footer renders multi-column layout with newsletter subscribe

---

## Notes

- `origin/footer` is a superset of `origin/nextjs`; after merging `nextjs`, the footer merge only applied commit `d66ec40`.
- Redis warnings during build are pre-existing (missing Upstash env vars) and do not block the build.
