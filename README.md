# LukasMurdock.github.io

Personal website and blog built with Astro.

## Requirements

- Node.js 22+
- npm 10+

## Install

```bash
npm install
```

## Commands

```bash
npm run dev
npm run check
npm run build
npm run preview
```

Additional commands:

```bash
npm run sync:assets
npm run data:mutate
```

## Build Pipeline

`npm run build` runs three steps:

1. `npm run sync:assets` copies static directories/files into `public/` and generates legacy `.html` redirect files.
2. `npm run data:mutate` applies data updates (note timestamp formatting, book metadata hydration, cover localization).
3. `astro build` generates the final static site in `_site/`.

## Project Structure

- `src/` Astro routes, layouts, components, and utility modules.
- `scripts/` Build-time sync and data mutation scripts.
- `_posts/`, `_pages/`, `_workpages/`, `_teardowns/` Legacy content sources loaded through Astro collections.
- `_data/` Structured content data (books, resources, notes, links).
- `css/`, `js/`, `images/`, `walksoflife/`, `.well-known/` Static assets synced into `public/`.

## Deployment

Deploy to Cloudflare Workers with static assets:

```bash
npm run deploy
```

This builds `_site/` and runs `wrangler deploy` using `wrangler.jsonc` routes/assets settings.
