---
layout: page
title: Colophon
description: About the development of this website
last_modified_at: 2020-12-18T15:03:41-0500
icons: true
---

Looking at my email logs, I started building a site somewhere on or before December 29, 2018, on Squarespace. But I soon felt constricted by their customizability. I realized I could have complete customizability limited only by my skills if I rolled my own, and it would be free by utilizing developer tiers.

The first commit to this site was on July 3, 2019.

(This is a better version of the [About this website](/about-this-website/) I posted April 17, 2020.)


This website is built on two principles: As little dependencies as possible and minimizing vendor lock-in. I guess a third would be to make it as simple as possible and as complex as needed, taking into account technical overhead.

This has currently materialized in:
- Data should be saved and built server side before using the client
- Git-based structure to minimize vendor lock-in

Vendors like Squarespace or Webflow are growing. Why not use vendors like Squarespace or Webflow? In the long term, all non-Free software is a dead end. The utility of all non-Free software always approaches zero. And I have the freedom to pick up my site and take it elsewhere if a service goes down.

Why not use WordPress? Honestly, WordPress is a good option here. But while it’s free, the server isn’t, and the technical overhead that comes with it seems too annoying, especially compared to my free “low-tech” stack used here. This site is technically JAMstack now, but it started with no JavaScript or APIs, just markup.

Also I like the benefits that come from static sites.

### Data Sources
APIs → YAML, Markdown, and YAML files.

Posts are stored as Markdown. Book data seen on [booklist](/booklist/) and [want-to-read](https://lukasmurdock.com/wanttoread/) are pulled from APIs at build time and stored locally. The data for [knowledge](/knowledge/), [principles](/principles/), and [alivetime](/alivetime/) are YAML as well.

Using these data formats prevent me from any lock-in and give me control over all the files. To have a setup like this means that content edits are Git-based.

Git-based means that changes made on a local machine are pushed to the Git repository which then triggers a new build of your site. Compared to API-based where the content is held on a different server and your site needs to pull the content from an API.

I’ve been getting more comfortable using Ruby build scripts that run at Jekyll build time to streamline some operations:
- Adding only an ISBN number to the booklist or want-to-read list will pull the data I want to show from the Google Books API.
    - [Making a booklist](/making-a-book-list/)
    - [Optimizing my booklist](/optimizing-my-book-list/)
    - Note: I’ve rewritten a large part of it and have yet to create another update post for it.

So, currently I use Ruby to pull API (JSON) data and turn it into YAML.

Note: [Jekyll supports loading data from YAML, JSON, CSV, and TSV files located in the _data directory.](https://jekyllrb.com/docs/datafiles/)

### Build
[Jekyll](https://jekyllrb.com/). “Markdown, Liquid, HTML & CSS go in. Static sites come out ready for deployment.”

Jekyll uses HTML layouts that are extensible through the [Liquid template language](https://shopify.github.io/liquid/). Both Jekyll and Liquid are written in Ruby.

[Jekyll also provides a number of useful Liquid additions to help you build](https://jekyllrb.com/docs/liquid/).

The more I use it, the more I see how powerful it is. The next step of things that I want to do is create a collective changelog of dated tasks, books, and resources added by date (which may be possible in liquid, I’m still learning). May possibly utilize SQLite.

### Deploy and CDN
Currently hosting on Github Pages as that’s what I started on. All my other projects use Netlify and I imagine I’ll move over once they improve some things.

Github Pages doesn’t support custom _plugins but my build scripts don’t need to run on *every* build, and I typically preview by building locally anyways so it’s currently not an issue.

With this stack my entire website is currently free, aside from paying for the domain name and email.
