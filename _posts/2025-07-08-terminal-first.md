---
layout: post
title: "Terminal first"
date: "July 08, 2025"
code: true
---

This is an active WIP.

A terminal-first approach makes it simple to 1) make custom workflows/GUIs, and 2) have AI agents interact with the data.

With local LLMs and command line utilities for AI agents, I am rethinking how I want to interface with data.

1. [Local data in spite of the cloud](https://martin.kleppmann.com/papers/local-first.pdf)
2. CLI-first interaction
3. Flexible GUIs

## Archive directory

Archive is everything. The data in archive powers applications, custom AI agents, and more.

-   apps/
-   archive/
    -   `.dotfiles/`
        -   `config/` Config files for dotfiles
        -   `cli/` command line utilities for archive
    -   `bookmarks/` Offline link archive
    -   `contacts/`
        -   people/
    -   calendar/
    -   mail/
    -   music/
    -   `ledger/` Double-entry accounting
    -   notes/
    -   rss/
    -   scrapbooks/
    -   pictures/
    -   videos/
    -   `txt/`
        -   now.md
        -   todo.md
        -   links.md
        -   wtl.md
        -   futurebound.md
        -   til.md
    -   writing/

## Principles

- Pipeable. Being able to pipe output into another tool is important.
- Minimal. Only does what I actually do, not what I might do.
- Context: Searchable, filterable.
- Reproducible: Spinning up a new mac should be easy.
- Offline: usable offline.

Consequences

- Pipeable: CLI-first interfaces. GUI optional.
- Minimal: choose the lighter tool.
- Context: indexed with search engine features.
- Reproducible: keychain/1Password
- Offline: sync

## Data tools

- Offline: rclone, git, syncthing
- Email: mbsync, notmuch
- RSS: (WIP) newsboat? rsstail? custom?
- Web browser: lynx, Browsh
- Music: [cmus](https://cmus.github.io)
- Accounting: [ledger](https://ledger-cli.org)

## Interaction tools

- Media player: [MPV](https://mpv.io)
- LLM: Ollama, opencode
- [opencode CLI](https://opencode.ai/docs/cli/)
- [claude code CLI](https://docs.anthropic.com/en/docs/claude-code/cli-reference)


## Email workflow

I have a read heavy email workflow.

- [isync](https://isync.sourceforge.io) (mbsync): sync mail locally
- notmuch: enhanced search capabilities

### Workflow

1. Pull latest emails
2. Show latest unread
3. Commands: mark read and show next unread, move to prev

```shell
notmuch search tag:unread
```

```shell
notmuch show <thread_id>
```

For sending

-   msmtp: send outgoing emails via SMTP
-   aerc: terminal email client interface
