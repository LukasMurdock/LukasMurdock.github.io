---
layout: post
title: The Long Now Collection
description: A collection of posts on Long Now.
---

## All Long Now Posts

{% assign posts = site.posts | where: "tags","longnow" %}
<ul>
{% for post in posts %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endfor %}
<ul>
