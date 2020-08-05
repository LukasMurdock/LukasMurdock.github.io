---
layout: post
title: 'Degreeless.marketing Dev log'
description: "How I built Degreeless.marketing."
date: August 05, 2020
---

Let me start by expressing my excitement. [I AM GROWING AND LEARNING.](https://lukasmurdock.com/aroundtheweb/#:~:text=Growing%20and%20learning,I%20AM%20GROWING%20AND%20LEARNING)

I’ve been struggling the past few months with not having the skill set or desire to build things in what seems like the “popular” way.

There is *a lot* of mental fatigue in choosing stacks. It shapes the project’s capability now and in the future (you don’t want to redo everything in the future, right?)

## The stack
Currently, my build stack is:
- [Jekyll](https://jekyllrb.com/)
- [Netlify](https://www.netlify.com/)

And that’s it. No server, my Content Management System is GitHub and the files themselves.

I’ll let you in on a secret to building sites this way. *It’s fast*. Because I create everything by hand, there’s no external junk (aside from GTM tags and pop-ups—sorry) slowing it down.

—web.dev image 

I see people everywhere online complaining about PageSpeed scores and slow sites, but building like this makes it a lot harder to make it slow.

The biggest reason I stick with this stack is because it’s beautifully simple and cheap—or free, depending on what you want.

This is largely thanks to Netlify for expanding the capabilities of static sites. The Netlify Starter account gives you access to:
- Unlimited websites
- Automated builds from Git
- 100 GB of bandwidth/month
- 100 forms per site/month
- 1,000 users per site/month
- 125,000 serverless functions per site/month
- and more.

I currently have a collection set up for books, while all the other resources use .yaml files.

I was planning on giving each book it’s own page with content, but… I’m not looking to do that, so I don’t know why I did this.

I’m using near stock Jekyll. I have [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) enabled and two custom plugins I made to automate data generation.

The first plugin is for automating book data from a given ISBN. Also, because I hate dealing with images, it automatically downloads and stores book images locally.

The second plugin is for automating every other resource image. All I have to do is list a URL for the resource image, and it’ll automatically download, store, rename, and set the new local image for me.

I would like to work in image optimization and compression sometime, but it’s good enough.

---
## Email
I want to create a community of enthusiastic people that give resources to learn and a place to connect.

I don’t know what I’m doing. And it’s great because I am growing and learning.

Because I want to bounce this around, I want to allow staying in touch, *capture leads*, whatever you want to call it.

So giving an email for updates seems like a good enough place to start.

I ended up going with [MailerLite](https://www.mailerlite.com/). This was a decision made with two factors: price and RSS capability.

MailChimp (what this site currently uses) is free and has RSS capability. But I hate it. It’s so slow I simply dread opening it.

MailerLite has a free tier up to 1,000 subscribers and RSS capability, and let me tell you I love using it.

I briefly tried ConvertKit for $30 a month because they offer an address for you to use. Due to the CAN-SPAM Act in the US, nearly all email marketing services require you to list a valid postal address. But their feature set is pretty lacking in comparison.

Because I wasn’t keen on listing my family address, I signed up for [VirtualPostMail](https://www.virtualpostmail.com/). After talking about it with my dad, I gave up and just used the personal address.

I’d love to get closer to the metal on that in the future.

I wanted to have a custom email address, so I set that up for the first time. I signed up for [FastMail](https://www.fastmail.com/) as I found them to have the best mix of quality and pricing. So now I have Lukas@degreeless.marketing!

Not sure how long I’ll keep it, and now I want to set one up for this domain, but I’m not sure what it should be since it’s my full name. 

So far, my ideas are:
- lukas@lukasmurdock.com
- iam@lukasmurdock.com
- hi@lukasmurdock.com

[Let me know](https://lukasmurdock.com/contact/) which one you like or if you have an idea.

## Users
People make communities by participating with a shared interest. They need a place to participate.

What’s the ideal for that? I don’t know.

But as I stated in [my working document on degreeless](https://lukasmurdock.com/degreeless/#offerings):
> The Academy provides internal and external resources to learn at your own pace… The Mastermind provides a space to make smart connections… The Workshop provides a hyper-focused space to guide you through projects.

So if you have ideas on building that, [let me know](https://lukasmurdock.com/contact/).

## Sharing
I am not a social butterfly. I believe it’s from growing up in school and being told to shut up, sit down, and be quiet. No one cares about what you have to offer, and everyone is there to do the bare minimum and get by.

So I find difficulty in participating. I want to change that.

If you’d like to help and show some support, share it around on [Twitter](https://twitter.com/intent/tweet?text=Take%20a%20look%20at%20this%20Newsletter%20Degreeless.marketing&url%3Dhttps%3A//degreeless.marketing/&via=MurdockLukas&utm_source=newsletter&utm_medium=email&utm_campaign=2020_08_04_degreelessmarketing_updates&utm_term=2020-08-04) or whatever social platforms you use.