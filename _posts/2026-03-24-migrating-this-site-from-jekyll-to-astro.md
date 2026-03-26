---
layout: post
title: 'Migrating this site from Jekyll to Astro'
description: 'How AI and OpenCode made this migration possible in one session.'
date: 'March 24, 2026'
tags: dev
code: true
---

> They did it by making the single worst strategic mistake that any software company can make:
> They decided to rewrite the code from scratch.
>
> — Joel Spolsky, [Things You Should Never Do, Part I](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/)

I had relented this site to forever being built with Jekyll and fighting Ruby and gem version issues for the rest of my life. However, with AI and OpenCode, I migrated this site from Jekyll to Astro.

Jekyll is ol’ reliable but I don’t use Ruby as much as I might like to. The setup overhead was not great. The remote deployment story was not great, build locally and push to remote always works great though. I also love Vite and TypeScript.

I gave myself a few non-negotiables. Cool URLs don‘t change. No large markdown change required. Keep deploy simple.

A few hard parts:

- Liquid leakage: some markdown that used to pass through Jekyll started rendering raw Liquid and Kramdown artifacts.
- Style regressions: pages like `/booklist/`, `/wanttoread/`, `/notes/`, `/principles/`, and `/forthefirsttime/` needed route-by-route parity fixes.
- Cloudflare edge cases: deleting the old Pages project required deleting a large deployment history first; custom-domain cutover for `www` required removing conflicting DNS records.

From this migration session:

- Total session time to merge: **8h 17m 40s**
- User prompts: **71**
- Assistant turns: **1,011**
- Merge span: **4 commits**
- Net repo diff in the merged migration: **159 files changed**
- Lines changed: **+16,136 / -6,719**

The site now runs on Astro and deploys to Cloudflare Workers. Away from Jekyll and Cloudflare Pages.

Both `lukasmurdock.com` and `www.lukasmurdock.com` are served through Workers custom domains, and the old Pages project is gone.
