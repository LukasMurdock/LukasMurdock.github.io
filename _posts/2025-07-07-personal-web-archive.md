---
layout: post
title: "Personal Web Archive"
description: "A personal, intelligent net archive that's yours to control and explore."
date: "July 07, 2025"
---

WIP.

Narch = You + query > LLM > search engine > your document archive

I enjoy the web. I collect links. For a awhile I’ve wanted a better search engine on those links than COMMAND + F.

Here’s the plan: Bun for JavaScript runtime, SQLite for embedded relational database, Kuzu for embedded graph database, TypeSense for search engine, Ax for AI agents.

Welp.

A segmentation fault occurs when Bun’s JavaScript engine tries to handle the native C++ result object returned by Kuzu’s await conn.query() method. Bun’s garbage collector/native object cleanup seems incompatible with Kuzu's C++ bindings.

I don’t want a separate server for a graph database so we’re moving to an in-memory object with graphology for now.
