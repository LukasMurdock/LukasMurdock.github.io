---
layout: post
title: 'RSC vs. Remix'
description: ''
date: 'March 14, 2023'
---

#### The RSC Primary Flow

- Load data: Do it anywhere, we don’t care.
- Write data: Not our job. (Next 13: Hard refresh? We’re working on it…)

#### The Remix Primary Flow

- Load data: Request data at the route level, parallelize everything.
- Write data: HTML forms, now here’s tools to progressively enhance.

#### RSC approach footguns

- Rerenders will refetch!
    - Next 13 solution: monkey patch fetch to dedupe requests
- Requests are now waterfalled, unless you move them back up
    - solution: We don’t care, APIs are fast. … more tooling coming in the future to see if it’s a problem

#### Remix benefits

- Parallelize all the requests!
- Learn how the web works

#### Remix issues
- [DX with useLoaderData typesafety](https://github.com/remix-run/remix/issues/3931)
