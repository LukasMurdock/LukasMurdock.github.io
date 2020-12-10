---
layout: post
title: 'Sideloading iPhone 5 on iOS 10.3.4'
description: "I am explaining this for my future self, who is intelligent and interested, but has forgotten."
date: December 08, 2020
tags: explainingformyfutureself jailbreak
code: true
---

It’s okay, skip along, I know you’re not interested in modding ancient tech.

1. [Install AltStore](https://altstore.io/)
2. Install Mail plugin
3. [Install nullxImpactor](https://impactor.nullx.me/) (or whatever side loader you can get to work)
4. Sideload them IPAs

Most sideloading tools and efforts will not work on the iPhone 5 due to its 32 bit architecture. More on that below.

## Jailbreaking iPhone 5 iOS 10.3.4

1. Follow above steps so you can sideload
2. [Download H3lix](https://h3lix.tihmstar.net/) (Browser will give warnings)
3. [Download the H3lix patch](https://gist.github.com/jakeajames/b44d8db345769a7149e97f5e155b3d46)
4. Put both files on the desktop
5. Open a terminal and run `cd ~/Desktop`
6. Then `./patch.sh h3lix-RC6.ipa h3lix-RC6-patch.ipa`
7. Use nullxImpactor to sideload h3lix-RC6-patch.ipa

It’s not the most solid jailbreak, but it’s easy enough to reset.

Thanks to [tihmstar](https://twitter.com/tihmstar/status/1153615443921424386?s=20) for h3lix, [
jakeajames](https://gist.github.com/jakeajames/b44d8db345769a7149e97f5e155b3d46) for the patch and [mstevo58](https://gist.github.com/jakeajames/b44d8db345769a7149e97f5e155b3d46#gistcomment-3178411) for telling people how to use it.

### Limitations of Jailbreak

The iPhone 5 was the [last of its kind](https://docs.elementscompiler.com/Platforms/Cocoa/CpuArchitectures/#:~:text=arm64%20is%20the%20current%2064,iPhone%205C%20and%20iPad%204.):
- The iPhone 5, iPhone 5C and iPad 4 with the [A6 and A6X chips](https://en.wikipedia.org/wiki/Apple-designed_processors#Apple_A6) use **armv7s** (or Swift, not the language) **A 32-bit ARM CPU**.
- The iPhone 5S and later (6, 6S, SE, 7, etc.), the iPad Air, Air 2 and Pro, with the [A7 and later chips](https://en.wikipedia.org/wiki/Apple-designed_processors#Apple_A7) use **arm64**. **A 64-bit ARM CPU**.

Here’s the sad news: **Things made for arm64 devices do not work on armv7s ones.**

And few people are making things for armv7s today. It’s an old 32-bit architecture that hasn’t been in iOS devices after the iPhone 5s released in 2013.

So now I have a 1st Gen iPad stuck on iOS 5 and an iPhone 5 stuck on iOS 10. And a 2012 MacBook Pro stuck on macOS Catalina, but it’s still a daily driver for me alongside my 2018 MBP.