---
name: run-app
description: How to install, run, build, and lint the approachable-landing Next.js app. Use when asked to run, start, launch, preview, build, or lint this app, or to check dev server status/port.
---

This is a Next.js 15 (App Router) + React 19 + TypeScript site. Package manager: npm.

## PATH note (Windows / this environment)

`node`/`npm` may not be on PATH in the sandboxed shell. If `npm install`/`npm run dev` fails with
"npm not found" or "'node' is not recognized", locate Node (commonly `C:\Program Files\nodejs`) and
either prepend it to PATH for the session or call the `.cmd` directly, e.g. in PowerShell:

```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH; & "C:\Program Files\nodejs\npm.cmd" run dev
```

## First-time setup

```bash
npm install
```

Requires Node.js 18+.

## Run the dev server

```bash
npm run dev
```

- Opens at http://localhost:3000
- Hot-reloads on file changes
- If port 3000 is taken, Next.js auto-picks the next free port (3001, ...) — check the terminal output for the actual URL (observed: something else on this machine holds 3000, so it commonly lands on 3003)
- Prefer `run_in_background: true` when starting it via the Bash tool, then check output/visit the URL rather than leaving it blocking

## Environment variables

Local secrets go in `.env.local` (already present in this repo, gitignored). Only needed for the likes API:

| Variable | Required for | Purpose |
|---|---|---|
| `COURSE_LIKES_KV_REST_API_URL` | `/api/likes` | Upstash Redis REST URL |
| `COURSE_LIKES_KV_REST_API_TOKEN` | `/api/likes` | Upstash Redis REST token |

Without them, the like button on `/live-courses` still works client-side via `localStorage` fallback — no env vars needed to just browse the app.

## Build & run production

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Key routes to check after starting the server

- `/` — cohort landing page
- `/live-courses` — live course catalog
- `/courses/[slug]` — recorded course detail (e.g. `/courses/ai-mastery-for-working-professionals`)
- `/thank-you` — post-registration page

## Stopping the dev server

If started in the background, kill the process (e.g. `TaskStop`/kill the PID) rather than leaving it running across unrelated tasks.
