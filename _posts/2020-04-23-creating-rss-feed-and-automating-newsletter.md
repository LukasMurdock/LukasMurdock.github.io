---
layout: post
title: 'Creating RSS feeds and Automating a Newsletter'
description: How I built RSS feeds and automated my newsletter
date: April 23, 2020
code: true
last_modified_at: 2020-04-22T04:08:49+0000
---

I want to write more. Not just for future reference or awareness but simply to gain clarity through composition. And ideally to get into the rhythm of putting things out into the world. I believe the pressure of communication expectations from a recurring format will provide that push to write more. So how can we actually automate this?


This site is built using [Jekyll](https://jekyllrb.com/). There is a [Jekyll Feed plugin](https://github.com/jekyll/jekyll-feed) that generates an RSS feed of Jekyll posts. 
This creates a `feed.xml` file that looks like the following:

{% highlight HTML %}
{% raw %}
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title>{{ site.title | xml_escape }}</title>
    <description>{{ site.description | xml_escape }}</description>
    <link>{{ site.url }}{{ site.baseurl }}/</link>
    <webfeeds:icon>https://lukasmurdock.com/safari-pinned-tab.svg</webfeeds:icon>
    <webfeeds:logo>https://lukasmurdock.com/safari-pinned-tab.svg</webfeeds:logo>
    <webfeeds:accentColor>F94643</webfeeds:accentColor>
    <webfeeds:related layout="card" target="browser"/>
    <atom:link href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}" rel="self" type="application/rss+xml"/>
    <pubDate>{{ site.time | date_to_rfc822 }}</pubDate>
    <lastBuildDate>{{ site.time | date_to_rfc822 }}</lastBuildDate>
    <generator>Jekyll v{{ jekyll.version }}</generator>

    {% for post in site.posts %}
      <item>
        <title>{{ post.title | xml_escape }}</title>
        <description>{{ post.content | xml_escape }}</description>
        <pubDate>{{ post.date | date_to_rfc822 }}</pubDate>
        <link>{{ post.url | prepend: site.baseurl | prepend: site.url }}</link>
        <guid isPermaLink="true">{{ post.url | prepend: site.baseurl | prepend: site.url }}</guid>
      </item>
    {% endfor %}

    {% for page in site.pages %}
      {% if page.layout == 'page' %}
        {% if page.name != '404.md' %}
          <item>
            <title>{{ page.title | xml_escape }}</title>
            <description>{{ page.content | xml_escape }}</description>
            <link>{{ page.url | prepend: site.baseurl | prepend: site.url }}</link>
          </item>
        {% endif %}
      {% endif %}
    {% endfor %}

  </channel>
</rss>
{% endraw %}
{% endhighlight %}

It’s not perfect but it gets the job done.

After getting the [RSS feed up](https://lukasmurdock.com/feed.xml) let’s figure out how to automate it into an email. Currently I use [mailchimp](https://mailchimp.com/) as an email service and mailchimp offers [RSS automation](https://mailchimp.com/help/share-your-blog-posts-with-mailchimp/) with automatic sending and [RSS merge tags](https://mailchimp.com/help/rss-merge-tags/).

I was a little confused at first because mailchimp makes it seem like you can only touch the HTML of your email if you upgrade out of the free version. Luckily that’s not quite the case and you can toggle block-level HTML with the `<>` button.

Now that we’ve got the writing section updates working, let’s get updates on resources and around the web sections! To do this we’ll have to associate a date with each item by changing the data structure. Then we can use the generated feed.xml as a base to create the other feeds.

I went through and appended `Date: Apr 23, 2020` to every resource…

Now to combine them into an email! And wait… Mailchimp has you declare a single RSS feed to use for the entire email… So maybe we can just see what would happen if we combine the RSS feeds into one using [RSSUnify](https://rssunify.com/)? Oh god [it’s just a big jumbled mess](https://feed.rssunify.com/5ea13c355b7bd/rss.xml). If there is a way to filter better I could not find one albeit I didn’t look very far.

So let’s do this another way. Let’s generate an RSS feed with jekyll meant solely for the newsletter.

With the `<items>` being the sections of Writing, Resources, and Around the Web.
And we can put all the content inside `<description>`.

Now XML doesn’t support HTML, it needs to be converted. To solve this we can push the HTML code we need to the Jekyll `_includes` folder and call it with the liquid tag alongside convert to XML. Oh wait that doesn’t work… Well maybe we can utilize liquid variables… Oh wait, you can chain filters but not place Liquid tags within Liquid tags…

After a lot of trial and error of trying to get this to work I realized that the HTML wasn’t changing and I could just input it [already XML escaped](https://www.freeformatter.com/xml-escape.html) to begin with… 

Okay but now we need to filter for only items added within the last week. Luckily I had solved this problems earlier when trying to *kinda* automate emails. You can view that [here](https://lukasmurdock.com/newsletter/).

It utilizes a Jekyll filter that pulls every post from within a week of the latest website build. To get the timeframe of a week we can set:
{% highlight liquid %}
{% raw %}

{% assign timeframe = 604800 %}

{% endraw %}
{% endhighlight %}

Then to get all writings from the last week we can:

{% highlight HTML %}
{% raw %}
{% assign timeframe = 604800 %}

<item>
    <title>Writing</title>
    <description>
        {% for post in site.posts %}
        {% assign post_in_seconds = post.date | date: "%s" | plus: 0 %}
            {% assign recent_posts = "now" | date: "%s" | minus: timeframe  %}
            {% if post_in_seconds > recent_posts %}
                &lt;h2&gt;{{ post.title | xml_escape }}&lt;/h2&gt;
                &lt;a href=&apos;{{ post.url | prepend: site.baseurl | prepend: site.url | xml_escape }}&apos; target=&apos;_blank&apos; style=&apos;color:#3399ff&apos;&gt;&lt;u&gt;View in Browser&lt;/u&gt;&lt;/a&gt;
                &lt;br /&gt;
                {{ post.content | xml_escape }}
                &lt;hr&gt;
            {% endif %}
        {% endfor %}
    </description>
    <link>{{ "/writing" | prepend: site.baseurl | prepend: site.url }}</link>
</item>

{% endraw %}
{% endhighlight %}

Note the XML escaped HTML—this is not ideal for genuine RSS feeds but we’re just using this as a proxy for an HTML email so it works great.

For the Resources section I had to go through some trial and error to get the nestings right and sort them by date. Due to how the data is structured it sorts them by category and then by date:
{% highlight HTML %}
{% raw %}
<item>
    <title>Resources</title>
    <description>
        &lt;a href=&apos;{{ "/resources" | prepend: site.baseurl | prepend: site.url }}&apos; target=&apos;_blank&apos; style=&apos;color:#3399ff&apos;&gt;&lt;u&gt;View in Browser&lt;/u&gt;&lt;/a&gt;
        {% for data in site.data.resources.fulldata %}
            {% assign sorted = data.List | sort: 'date' | reverse %} 
            {% for item in sorted %}
                {% assign resource_in_seconds = item.Date | date: "%s" | plus: 0 %}
                {% if resource_in_seconds > recent_posts %}

                    &lt;a href=&apos;{{ item.Link | xml_escape }}&apos; target=&apos;_blank&apos;&gt;&lt;strong&gt;&lt;u&gt;{{ item.Title | xml_escape }} →&lt;/u&gt;&lt;/strong&gt;&lt;/a&gt;
                    &lt;br /&gt;
                    {{ item.Comment | xml_escape }}
                    &lt;br /&gt;

                {% endif %}
            {% endfor %}
            &lt;hr&gt;
        {% endfor %}
    </description>
    <link>{{ "/resources" | prepend: site.baseurl | prepend: site.url }}</link>
</item>
{% endraw %}
{% endhighlight %}

Because the Around the Web section is built by date I can simply filter it for the first entry, which will return everything added within the current month.

{% highlight HTML %}
{% raw %}
<item>
    <title>Around the Web</title>
    <description>
        {% for data in site.data.links.linkslist limit:1 %}
            {% for link in data.Links %}

                &lt;a href=&apos;{{ link.Link | xml_escape }}&apos; target=&apos;_blank&apos;&gt;&lt;strong&gt;&lt;u&gt;{{ link.Title | xml_escape }} →&lt;/u&gt;&lt;/strong&gt;&lt;/a&gt;
                &lt;br /&gt;
                {{ link.Comment | xml_escape }}
                &lt;br /&gt;

            {% endfor %}
            &lt;hr&gt;
        {% endfor %}
    </description>
    <link>{{ "/aroundtheweb" | prepend: site.baseurl | prepend: site.url }}</link>
</item>
{% endraw %}
{% endhighlight %}

Now because I appended `Date: Apr 23, 2020` to every resource the initial email will contain every single resource. I thought it serves as a nice hallmark to the day I finally figured out how to automate updates.

If you’re interested to see how it looks you can [subscribe for updates](https://mailchi.mp/fa9e472e92b2/updatesfromlukas).