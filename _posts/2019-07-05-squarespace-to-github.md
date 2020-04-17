---
layout: post
title: Migrating from Squarespace to GitHub
description: And saving $152 a year on hosting fees.
image: squarespace-to-github.jpg
caption: Not for the faint of heart, time is money and money saves you time.
date: July 03, 2019
redirect_from: /2019/07/03/squarespace-to-github/
---

### Squarespace Hosting
In comparison with strong alternatives, Squarespace offers a sound deal at $144/ year for a beautiful, simple website. With an outstanding minimalist path for creating your own website, Squarespace is perfect for creatives. Squarespace manages all the technical aspects of creating and managing a website and saves you a lot of time and money compared to more complex web builders.

At $144 annually, you get

- Unlimited Bandwidth and Storage
- Responsive Website
- Website Metrics
- Custom Domain
- SSL Security
- 24/7 Customer Support

The problem with builders like Wordpress is the upfront cost you think you'll pay is never what you'll truly end up spending. It's a slippery slope of purchases once you enter the Wordpress arena, and you can quickly be overwhelmed by all the choices.

The "free" draw of Wordpress is compelling until you begin to account for what you'll really need to be purchasing. At its core, a website needs a domain and hosting. A domain name allows a site to be connected to the internet and hosting provides the storage for the files your website serves. Dot-com domains are typically priced around $11 a year, while hosting varies from $5-$100+ a month.

Wordpress thrives on plugins and extensions. With over 1/3 of the internet being powered by Wordpress, it has a tremendous market. The catch? You'll pay for those plugins, and you'll pay a lot. Squarespace requires no plugins to craft beautiful websites and provides hosting for only $12 a month. It's a steal.

So what could be better than that? GitHub is a hosting service for software development projects and is the most popular code repository site for open source projects. GitHub offers to host directly from your GitHub repository, and the best part—[it's free](https://pages.github.com/).

I chose this opportunity to challenge myself to create a website with bare HTML and CSS. Aiming to create a blazing fast site that both looks and functions beautifully. By hand-crafting a website, [you rid yourself of any baggage that builders add on to your site](https://www.webdesignerdepot.com/2016/05/9-reasons-hand-coding-always-beats-site-builders/).

And it works. Using Google Pagespeed Insights, I was able to achieve a score of 100 percent on mobile and desktop. While Squarespace sites hang around 2-3 percent...

<figure class="blog-figure image component image-big image-fullbleed body-copy-wide">
<img class="picture-image" src="/images/posts/squarespace-google-pagespeed-insights.png" alt="squarespace-google-pagespeed-insights">
<figcaption class="image-text">Squarespace scores 2 percent on its mobile pagespeed.</figcaption>
</figure>

### Getting Started with GitHub Pages
With any static webpage, you'll create an index.html, style.css, and javascript.js files. You'll want to get set up within GitHub as soon as possible to manage revisions. Head over to GitHub and create a new repository named username.github.io, where username is your exact username on GitHub. Download GitHub for Desktop to manage your repository and push changes. After you've established your files into your GitHub repository, download Visual Studio Code to write, edit, and repeat with git commands built-in.

Once you've built your website with HTML and CSS, your site is live! Since I have already purchased lukasmurdock.com, I wanted to use that domain with GitHub Pages. In order to do this, you have to point the GitHub Pages default domain to your custom domain. In my domain registrar of choice, Google Domains, this was simple to set up.

In the DNS Custom resource records, you must configure an A record to point to [the following IP addresses](https://help.github.com/en/articles/troubleshooting-custom-domains):

- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

<figure class="blog-figure image component image-big image-fullbleed body-copy-wide">
<img class="picture-image" src="/images/posts/dns-custom-records.png" alt="dns-custom-records">
<figcaption class="image-text">DNS Custom resource records configured and CNAME set to GitHub Pages repository.</figcaption>
</figure>

Configure CNAME to your username.github.io. In your GitHub repository setting, scroll all the way down to Custom Domain. Type in your custom domain and hit save. Enforce HTTPS so users won't get a warning about using your site.

And that's it! Ultimately this is for people who want to save the money and use the time to develop a custom site free of any excess.

If that's you, today is the day you step up and take your site to the next level.
