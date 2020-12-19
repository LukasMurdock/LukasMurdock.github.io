---
layout: post
title: 'Proper ATOM feed Formatting'
description: "Tips to generate a good feed."
date: December 19, 2020
tags: annual
code: true
---

The `<id>` element an be defined by using the format {% highlight xml %}<id>tag:exampledomain.com,2020:uniqueidentifier</id>{% endhighlight %}

For example I used {% highlight xml %}<id>tag:lukasmurdock.com,2020-12-19:/booklist/map-and-territory</id>{% endhighlight %}

1. Starts with `tag`
2. Followed by a `:`
3. Followed by an authority name of either a DNS name or an email address
4. Followed by a `,`
5. Followed by `YYYY-MM-DD`, month and day are optional. This date is when the tag scheme was first used, not the date of the specific entry or item.
6. Followed by a `:`
7. Followed by any number of characters which are valid in a URI. Special characters may be escaped using percent encoding.

As I found out from [How to ATOM id](http://web.archive.org/web/20110514113830/http://diveintomark.org/archives/2004/05/28/howto-atom-id), [w3 tag docs](https://validator.w3.org/feed/docs/error/InvalidTAG.html), and  [ID Element](http://www.intertwingly.net/wiki/pie/IdElement)



{% highlight xml %}
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
    <title>Lukas Murdock</title>
    <link rel="alternate" type="text/html" href="https://lukasmurdock.com/"/>
    <link rel="self" type="application/atom+xml" href="https://lukasmurdock.com/booklist.xml"/>
    <id>https://lukasmurdock.com/</id>
    <subtitle>This is the website of Lukas Murdock, designer, developer, and marketer helping you do work that matters for people who care.</subtitle>
    <webfeeds:cover image="https://lukasmurdock.com/images/LM-portrait.jpg"/>
    <webfeeds:icon>https://lukasmurdock.com/safari-pinned-tab.svg</webfeeds:icon>
    <webfeeds:logo>https://lukasmurdock.com/safari-pinned-tab.svg</webfeeds:logo>
    <webfeeds:accentColor>da532c</webfeeds:accentColor>
    <webfeeds:related layout="card" target="browser"/>
    <link href="https://lukasmurdock.com/feed.xml" rel="self" type="application/rss+xml"/>
    <updated>2020-12-19T14:59:10+00:00</updated>
    <author>
    <name>Lukas Murdock</name>
    <email>Lukas@lukasmurdock.com</email>
    <uri>https://lukasmurdock.com/</uri>
    </author>
    <generator>Jekyll v3.9.0</generator>

    <entry>
        <title>Map and Territory</title>
        <id>tag:lukasmurdock.com,2020-12-19:/booklist/map-and-territory</id>
        <updated>2020-12-19T00:00:00+00:00</updated>
        <content type="html" xml:lang="en" xml:base="https://lukasmurdock.com/">
        <![CDATA[ <h1>Map and Territory</h1><h2>Rationality: From AI to Zombies Book 1</h2><p>By Eliezer Yudkowsky</p><a href="https://lukasmurdock.com/booklist/"><img alt="Map and Territory" src="https://lukasmurdock.com/images/books/map-and-territory.jpeg" /></a> ]]>
        </content>
        <category term="Books"/>
        <published>2020-12-19T00:00:00+00:00</published>
    </entry>

</feed>
{% endhighlight %}

And here it is with Liquid in Jekyll for my `booklist.yaml` file

{% highlight xml %}
{% raw %}
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
    <title>{{ site.title | xml_escape }}</title>
    <link rel="alternate" type="text/html" href="https://lukasmurdock.com/"/>
    <link rel="self" type="application/atom+xml" href="https://lukasmurdock.com/booklist.xml"/>
    <id>https://lukasmurdock.com/</id>
    <subtitle>{{ site.description | xml_escape }}</subtitle>
    <webfeeds:cover image="https://lukasmurdock.com/images/LM-portrait.jpg" />
    <webfeeds:icon>https://lukasmurdock.com/safari-pinned-tab.svg</webfeeds:icon>
    <webfeeds:logo>https://lukasmurdock.com/safari-pinned-tab.svg</webfeeds:logo>
    <webfeeds:accentColor>da532c</webfeeds:accentColor>
    <webfeeds:related layout="card" target="browser"/>
    <link href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}" rel="self" type="application/rss+xml"/>
    <updated>{{ site.time | date_to_xmlschema }}</updated>
    <author>
      <name>Lukas Murdock</name>
      <email>Lukas@lukasmurdock.com</email>
      <uri>https://lukasmurdock.com/</uri>
    </author>

    <generator>Jekyll v{{ jekyll.version }}</generator>

{% assign sorted = site.data.booklistRead.isbns | sort: 'dateRead' | reverse %} 
    {% for book in site.data.booklistRead.isbns %}
      <entry>
        <title>{{ book.title | xml_escape }}</title>
        <id>tag:lukasmurdock.com,2020-12-19:/booklist/{{ book.title | slugify }}</id>
        <updated>{{ book.dateRead | date_to_xmlschema }}</updated>
        <content type="html" xml:lang="en" xml:base="https://lukasmurdock.com/">
        <![CDATA[<h2>{{ book.title | strip_html | escape }}</h2><h3>{{ book.subtitle | strip_html | escape }}</h3><p>By {{ book.author | join: ", " | strip_html | escape }}</p><a href="https://lukasmurdock.com/booklist/"><img alt="{{ book.title }}" src="https://lukasmurdock.com{{ book.image }}" /></a>]]>
        </content>
        <category term="Books"/>
        <published>{{ book.dateRead | date_to_xmlschema }}</published>
      </entry>
    {% endfor %}

</feed>
{% endraw %}
{% endhighlight %}