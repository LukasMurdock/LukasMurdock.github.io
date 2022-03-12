---
layout: post
title: 'Personal Websites'
description: 'Thoughts on my ideal personal website.'
date: 'March 11, 2022'
---

A heavy work in progress.

Personal websites today use three primary parts:
1. Content
2. Build
3. Deploy

Content is handled through a CMS like Sanity, Strapi, Forestry, Netlify CMS, WordPress, or text files. Building the content is handled through a framework like Jekyll, Hugo, Next.js, or Remix. Deployment is handled through platforms like Netlify, Vercel, AWS, Cloudflare Pages, or Digital Ocean.

As of writing, the stack of this website is markdown files, Jekyll, and Cloudflare Pages.

I particularly enjoy having content as files; it feels natural and having changes mapped with git is a nice touch. Jekyll is a tried-and-true static-site generator, but I don’t write or know much ruby. Deployment isn’t really an issue as it can be deployed anywhere as a static site.

[Content is best stored as ingredients from which you can bake the things that you need when you need it.](https://www.knutmelvaer.no/blog/2020/02/on-the-limits-of-mdx#:~:text=content%20is%20best%20stored%20as%20ingredients%20from%20which%20you%20can%20bake%20the%20things%20that%20you%20need%20when%20you%20need%20it.) I want to keep content entirely separate from how it’s displayed, and text files feels like the best way to do that. Metadata can be stored with Front matter. Hugo [Front matter formats](https://gohugo.io/content-management/front-matter/#front-matter-formats): TOML, YAML, JSON, ORG.

The tossing-and-turning comes from wanting to manage my content:
1. From a computer with local files using whatever tools I want
2. From my iPhone

Wanting to be offline and local while also wanting to be online and networked.

I’ve learned the terms for what I’m looking for are:
- **local-first** or **[offline-first](https://offlinefirst.org/)**
- **client-side databases**.

Complexity comes from wanting a few things:
- Easily add items from my iPhone (which means I need a database / access from network)
- Drag and drop images while writing

A few solutions seem to be:
- AWS Amplify DataStore (offline-first)
- MongoDB Realm (offline-first)
- Google Firebase Cloud Firestore (meant for temporary offline)
- [RxDB](https://rxdb.info/) (which has an [alternatives](https://rxdb.info/alternatives.html) page)
- [Replicache](https://replicache.dev/)

Amazon S3 + Replicache + Cloudflare Workers seems to be an optimal solution but I have no idea.

Pipeline: Content → Build/script → Content → Deploy

Stack:
- Content: Markdown, JSON files (stored in [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html)? )
- Build: Ideally anything as content is structured and separate. Hakyll would be interesting to learn Haskell, [Codedoc](https://codedoc.cc/)
- Deploy: Anything

Pages:
- About

Collections:
- Now (with CalendarEvents countdown)
- Writing/Essays
- Bookshelf (library)
- Bookmarks
- Notes
- Photos
- Recipes
- Timeline

I’m looking to be able to do three things:
1. Create collections with individual formats, e.g., bookshelf, notes, writing.
2. Create content for collections
3. Build landing pages
4. Create custom content block types (e.g., [principles](https://lukasmurdock.com/principles/))

Editor (CMS):
- UTF-8 markdown
- Drag-n-drop in images with editing and requirement of alt-text and image file names
- Extensibility, e.g., add book by ISBN and auto-download image and information.
- Easy drawings with Excalidraw
- Real-time autosave
- Offline-support
- Ability to create new collections with their own format (like Sanity CMS)
- Accessible API
- Easy export (markdown files)