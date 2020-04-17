---
layout: post
title: 'Everything I Know About Email'
description: From code to vision.
date: April 17, 2020
code: true
---


<span style="color: rgba(51,51,51,.5);">Small comment.</span>

During my role as a Communications Consultant for ABB, I was responsible for the preparation and disbursement of communications that involved various media such as radio, television, and publications, and also preparing brochures and presentation materials for presentation to clients. I was responsible for conducting marketing research, planning and developing communications directed at increasing sales and improving services. I recommended and implemented marketing strategies designed to maximize profit margins and ensure customer satisfaction.

## Driving Interest
Email is used to drive consumer interest and inquiry into the products and services of a company. To engage with customers we need two things:  
1.	Their contact information
2.	Their permission

We have to earn permission to follow up, earn enrollment to teach — to organize and lead — to build confidence in writing the future. Together. When we get enrollment — people who are there because they want to be, eager to move forward with what we have to offer — we’re able to do work that matters for people who care. Not working to flatter or coax but instead to provide experiences that transform.

It’s our job to create the doors for those events to occur — and once we get them it’s up to us to fulfill our part of the promise. Building an email list is a powerful driver of awareness for any business. It allows us to show up regularly, consistently, and generously, for years and years.

These lists are created from simple forms and incentives such as:
- Website subscribe forms
- Online gated document downloads (case study, cheat sheet, toolkit)
- In-person
- Social media —> linked to landing pages
- Ads —> linked to landing pages

Remember it’s our job to create the doors for those events to occur. So we need a few things:
1. Content for people to find and share.
2. People to find and share our content.
3. A way to follow up with people who want to write the future, together.

Our job is a cycle of:
1. Brand creation
2. Content creation
3. Content reach

Brand and content are tied closely together — remember we have to earn permission to follow up, earn enrollment to teach — to organize and lead — to build confidence in writing the future. Together. And that comes down to trust and making good on our promises. 

Our goal is to build a connection to serve as a foundation and grow from there. We primarily discover things through digital interaction, coming across content by searching Google or browsing platforms such as LinkedIn, Facebook, etc.​

To have a business, people need to be aware of our business. So we need our name to reach them through content created by our business and we need people talking about our business.​

To do this right we need to understand what our ideal customers want. We say ideal customers because the type and style of the content we create affects the type and style of the customers we attract.​

To add value to our audience, we need to answer questions like:​
- What does our audience want?​
- How can I best convey our message to them?​
- Do they understand what we’re selling?​
- Are they on board with our vision?​
- How can we speak to them personally?​



## Dev Environment
I use Google Chrome, VS Code, and Github Desktop on my 2018 MacBook Pro (Yes I am that lazy. It’s faster than changing the directory 5 times). I would like to set up some remote dev environment but I have yet to find an easy free solution to do so. 


## Host
I host my website directly on [Github Pages](https://lukasmurdock.com/2019/07/03/squarespace-to-github/). Hosting this way means I don’t have to worry about payments but utilization will suffer if I need to scale distribution.  
<span class="full-underline" style="font-size: 12px;">Did I mention it's free?</span>


## Data Files
I have four YAML data files: booklist, links, principles, and resources.

I wrote [how I made a book list with only ISBNs](https://lukasmurdock.com/2019/10/19/making-a-book-list/) because finding all that information is too annoying for me.

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
