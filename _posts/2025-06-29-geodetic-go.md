---
layout: post
title: "Geodetic Go"
description: ""
date: "June 29, 2025"
code: true
---

Late one night, on the phone with a friend, I learned about [survey marks](https://en.wikipedia.org/wiki/Survey_marker).

> Survey markers, also called survey marks, survey monuments, or geodetic marks, are objects placed to mark key survey points on the Earth's surface. They are used in geodetic and land surveying. A benchmark is a type of survey marker that indicates elevation (vertical position). Horizontal position markers used for triangulation are also known as triangulation stations. Benchmarking is the hobby of "hunting" for these marks.

The [National Geodetic Survey Map](https://geodesy.noaa.gov/datasheets/ngs_map/) is an ArcGIS Online Web Map Application that enables users to view multiple datasets provided by the National Geodetic Survey.

The [Mark Recovery Dashboard](https://geodesy.noaa.gov/surveys/mark-recovery/index.shtml) displays mark recoveries that have been submitted to NGS.

I thought an app about hunting these marks and tracking progress in a region would be cool.

[Geocaching.com](https://www.geocaching.com/ncees/) seems to have had this feature at some point but seems to have removed the dataset (or maybe they just removed the mark page).

[Benchmark Hunter](https://apps.apple.com/us/app/benchmark-hunter/id1591357988) is an iOS app to hunt for NGS Survey Marks released in 2021.

But it’s fun to make things, so here’s how I made Geodetic Go. Well, I had Claude Code do almost all of the coding.

## Tools used

- To code
    - [macOS](https://en.wikipedia.org/wiki/MacOS)
    - [Terminal](https://en.wikipedia.org/wiki/Terminal_(macOS))
    - [VS Code](https://code.visualstudio.com/)
    - [Claude Chat](https://claude.ai/)
    - [Google Gemini Chat](https://gemini.google.com/app)
    - [Claude Code](https://www.anthropic.com/claude-code)
    - [Google Gemini CLI](https://github.com/google-gemini/gemini-cli)
    - [Repomix](https://repomix.com/)
- To product
    - DataSheet downloader/parser script
        - Language: [Go](https://go.dev/)
        - Storage sync: [Rclone](https://rclone.org/)
    - Storage: [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/)
        - [Apache Parquet](https://parquet.apache.org/) files
    - Frontend
        - Language: [TypeScript](https://www.typescriptlang.org/)
        - Build: [Vite](https://vite.dev/)
        - Web framework: [React Router](https://reactrouter.com/), [framework mode](https://reactrouter.com/start/modes), [SPA](https://reactrouter.com/how-to/spa)
        - Interactive maps: [Leaflet](https://leafletjs.com/)
        - Map tile layer: [OpenStreetMap Carto](https://wiki.openstreetmap.org/wiki/OpenStreetMap_Carto)
    - Backend
        - Runtime: [Cloudflare Workers](https://workers.cloudflare.com/)
        - Web framework: [Hono](https://hono.dev/)
        - Database: [Cloudflare D1](https://developers.cloudflare.com/d1/)

## Project start

I started off by making a `packages` directory that looked like this

- `packages`
    - `datasheets`
    - `backend`
    - `mobile`

However, it ended up looking like this

- `packages`
    - `backend` - Hono/Cloudflare Workers API
    - `datasheet-downloader` - Go downloader for NGS DataSheets
    - `datasheet-parser` - Go parser for NGS DataSheets → Parquet files
    - `frontend` - React Router web application

## DataSheets

The National Geodetic Survey (NGS) provides Information about survey marks (including bench marks) in [text datasheets](https://geodesy.noaa.gov/datasheets/).

> Information about survey monuments (aka “marks”) stored in the National Geodetic Survey’s Integrated Database (NGS IDB) may be retrieved and displayed in a variety of methods. One standard is known as a datasheet, an ASCII text file consisting of rigorously formatted lines of 80 columns
>
> — [The DSDATA Format](https://www.ngs.noaa.gov/DATASHEET/dsdata.pdf)

I knew I wanted to parse and store the data in [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) because I really enjoy the product and pricing. My first idea was to store the data in [SQLite](https://sqlite.org/) but after realizing the total text size when storing the raw text (cause I want to display the raw text) would be in the GBs I realized data compression would be important and with the write-once, read-many style of data, [Apache Parquet](https://parquet.apache.org/) is a better choice.

I chucked the DSDATA format into [Google Gemini Chat](https://gemini.google.com/app) and had it write a parser with a focus on  extracting latitude, longitude, and market type. At first I had it write TypeScript — as the rest of the codebase would be. However, it kept producing garbage non-working stuff. Then, I asked it to do it without specifying a language and it started doing it in python but I don’t want to deal with the (venv) stuff. So I told it to write it in [Go](https://go.dev/) and it worked first try.

```go
type Datasheet struct {
	PID               string `parquet:"pid"`
	Designation       string `parquet:"designation"`
	State             string `parquet:"state"`
	County            string `parquet:"county"`
	Latitude          string `parquet:"latitude"`
	Longitude         string `parquet:"longitude"`
	OrthometricHeight string `parquet:"orthometric_height"`
	EllipsoidHeight   string `parquet:"ellipsoid_height"`
	MarkerType        string `parquet:"marker_type"`
	RawText           string `parquet:"raw_text"`
}
```

NGS provides DataSheets at the State level. However, to minimize data requirements I partitioned by county as well.

The pipeline is:
1. Download DataSheet text files from NGS (these come as .zip files)
2. Parse and partition into Parquet files
3. Upload parquet files

To upload into R2, I prompted Claude Code to write a script to use [Rclone](https://rclone.org/).

## Frontend

I knew I wanted to use React Router v7 SPA mode — I’ve used Remix for years and have used React Router v7 in other various projects. Vite comes with Tailwind support but I just had Claude Code write a `STYLE.md` file that looks like this

> Terminal Design Features
>
> Visual Style:

> - Classic green-on-black terminal color scheme
> - JetBrains Mono monospace font throughout
> - Terminal-style borders and panels
> - Animated blinking cursor effect
> - CRT-style scan line animation
> - Subtle screen grain effect
>
> […]

I didn’t start with this though but early on told Claude Code to redesign the frontend in this style and it did a great job.

AI models are great at writing terrible React code. I imagine this will get better over time — and there is certainly prompting improvements I can do but man so annoying.

## Backend

I knew I wanted to use Cloudflare Workers for the backend if I could — there are a lot of limitations if you choose workers runtime but when it works it’s great and the platform is great. I chose Hono as the web framework and copied the [Hono Stacks](https://hono.dev/docs/concepts/stacks) markdown documentation for Claude Code to use.

> Hono's RPC feature allows you to share API specs with little change to your code. The client generated by hc will read the spec and access the endpoint type-safety.
>
> — [Hono Stacks](https://hono.dev/docs/concepts/stacks)

I love this feature but interestingly enough Claude Code wrote 100% of the backend and client API code in this project. Not without needing adjustments though.

## AI Review

I have still not yet used Claude Code in an unchained manner — I either tell it exactly what to do or I tell it to think about how to do something, review that, and then tell it to do it and approve/deny every step of the way. AI is dumb. It will think up dumb things. You can adjust the input and in some cases you can poke the black-box a bit to change the output — but at the end of the day the output is still non-deterministic.

From what I’ve seen, if you do not technically understand the output you will immediately shoot yourself in the foot. If you cannot tell if the output is bad you cannot adjust it and you just dig a deeper whole in which shit is flung. Even in this project, by choosing React and deciding to move fast, and not having proper guides setup before hand, I let slide several useEffects and useStates of genuinely bad code! AI will product many egregious suggestions but if you are knowledgeable about it you can fix it.

I used [Repomix](https://repomix.com/) to pack the documentation for Hono.js and React Router into their own markdown files so I could tell Claude Code to search the file on how to use a certain thing. I also copy-paste specific documentation from Cloudflare — their site has a copy-as-markdown button and it works beautifully and tell Claude Code to read that file.

80% of the time I go `Read [x] [y] [z] and think about how to implement [a]`. There’s certainly better ways of going about it but this works pretty good.

> We recommend using the word "think" to trigger extended thinking mode, which gives Claude additional computation time to evaluate alternatives more thoroughly. These specific phrases are mapped directly to increasing levels of thinking budget in the system: "think" < "think hard" < "think harder" < "ultrathink." Each level allocates progressively more thinking budget for Claude to use.
>
> — [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)

## Dev missteps

- Storing data in SQLite >> moved to Apache Parquet
- Served data through API >> query directly from frontend
    - [parquetjs](https://github.com/ironSource/parquetjs/tree/master) in workers runtime: `cloudflare workers fs.stat not implemented yet` >> [hyparquet](https://github.com/hyparam/hyparquet)
