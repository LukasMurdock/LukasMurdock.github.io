---
layout: post
title: 'MacOS font bug in Chrome'
description: Chrome 81 breaks the ability to bold system fonts on Macs
date: April 21, 2020
last_modified_at: 2020-04-22T04:08:49+0000
---

As I was developing a custom chrome extension all of a sudden font weights stopped working. I thought that maybe I coded something wrong using system fonts as the bug reproduced on my website that also utilizes system fonts.

Turns out Chrome 81 breaks the ability to bold system fonts on macOS.

Many sites (including this one) simply utilize system fonts available on the device. The goal is to use whatever native system font is available. 

This is most commonly done by declaring the following:
--font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;

With Chrome 81, sites that default to the system font can no longer set font-weight on macOS Catalina.

[This bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1057654#c35) was discovered before release but a decision was made to not fix it until the next version. 

The development team stated:

Unfortunately, we already had to ship 1 or 2 releases with system font spacing regressions on Catalina… but we’d need to see if such a future fix can be backported at all. which may be to tight for the 81 timeline. So in that sense, perhaps we have to accept it and remove ReleaseBlock-Stable.”

Another comment perfectly describes my feelings:

So glad I found this bug report after over a week of searching and thinking it was only my machine. Hope it can get fixed soon, this really degrades the experience of sites using the system font stack for mac users.”

Due to COVID-19 the development team is skipping Chrome 82 and is moving directly to Chrome 83, which is scheduled to be released 3 weeks earlier than planned, in [approximately mid-May](https://developers.google.com/web/updates/2020/04/nic81).