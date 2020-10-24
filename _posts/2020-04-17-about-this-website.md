---
layout: post
title: 'About this website'
description: How I built this site and what runs it.
date: April 17, 2020
code: true
---


<span style="color: rgba(51,51,51,.5);">The first commit to this site was on July 3, 2019.</span>

## Jekyll
This site is built with the static site generator [Jekyll](https://jekyllrb.com/). Static site generators are generally simple with no databases, comment moderation, or updates to manage—just your content. Jekyll is built with Ruby and utilizes Ruby gems. It keeps articles in either plain HTML or Markdown.

Jekyll is supposedly slower at scale compared to newer generators such as [Hugo](https://gohugo.io/) but it works plenty fine for me.

The dev environment setup is annoying for Ruby. Some gem not wanting to install or updates always leads to Googling multiple issues before figuring it out.


## Dev Environment
I use Google Chrome, VS Code, and Github Desktop on my 2018 MacBook Pro (Yes I am that lazy. It’s faster than changing the directory 5 times). I would like to set up some remote dev environment but I have yet to find an easy free solution to do so. 


## Host
I host my website directly on [Github Pages](https://lukasmurdock.com/squarespace-to-github/). Hosting this way means I don’t have to worry about payments but utilization will suffer if I need to scale distribution.  
<span class="full-underline" style="font-size: 12px;">Did I mention it's free?</span>


## Data Files
I have four YAML data files: booklist, links, principles, and resources.

I wrote [how I made a book list with only ISBNs](https://lukasmurdock.com/making-a-book-list/) because finding all that information is too annoying for me.

> Jekyll supports [YAML](https://jekyllrb.com/docs/datafiles/) for it's `_data` directory and the structure is [relatively simple](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_yaml_tutorial). To add a book the only thing I need to find is the ISBN code. Everything else auto populates from that."

Here's a preview of how each YAML file is structured:

`booklist.yaml`
{% highlight yaml %}
---
books:
  - isbn: 9781250237231
  - isbn: 9780316478526
  - isbn: 9780525540830
{% endhighlight %}


`links.yaml`
{% highlight yaml %}
---
linkslist:
  - Date: April 2020
    Links:
      - Title: The Risk of Discovery
        Link: http://www.paulgraham.com/disc.html
        Comment: "Newton made three bets. One of them worked. But they were all risky."

      - Title: Being and Time
        Link: https://www.scotthyoung.com/blog/2020/04/13/being-and-time/
        Comment: "About an interesting book you probably shouldn't read."
{% endhighlight %}

`principles.yaml`
{% highlight yaml %}
---
linkslist:
principlelist:
  - Title: Dieter Rams
    Principles:
    - list: Good design is innovative
    - list: Good design makes a product useful
    - list: Good design is aesthetic
    - list: Good design makes a product understandable
    - list: Good design is unobtrusive
    - list: Good design is honest
    - list: Good design is long lasting
    - list: Good design is thorough down to the last detail
    - list: Good design is environmentally friendly
    - list: Good design is as little design as possible
{% endhighlight %}

`resources.yaml`
{% highlight yaml %}
---
fulldata:
  #Guides
  - Type: Guides
    List:

      - Title: MIT Open Courseware
        Link: https://ocw.mit.edu/index.htm
        Comment: "A web-based publication of virtually all MIT course content. OCW is open and available to the world and is a permanent MIT activity."

      - Title: How to Speak
        Link: https://ocw.mit.edu/resources/res-tll-005-how-to-speak-january-iap-2018/how-to-speak/index.htm
        Comment: "Maximize the opportunity to have your ideas valued and accepted by the people you speak with."
{% endhighlight %}


## Javascript
I have some leftover Javascript from the original Jekyll template I started with but other than the short script for my analytics tool of choice [GoatCounter](https://www.goatcounter.com/) and the mobile menu navigation I don't write any Javascript.

Since the original inspiration of this website was the [MF website](http://motherfuckingwebsite.com/), I never planned on adding any external Javascript libraries.

## Theme
As a designer, the way this site is presented is an ever-changing portfolio piece of sorts. As such I prefer to not see any clones online. Feel free to take it as inspiration and make your spin on it.

This theme is also built in a needs-based hacky way that's a hassle to replicate.

## If I Had Time I Would
- Free and easy responsive images
- Redo inline styles and CSS (again)
- Recreate portfolio section
