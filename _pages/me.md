---
layout: post
title: The Me Collection
description: A collection of posts on me.
---

{% assign posts = site.posts | where: "tags","me" %}
<ul>
{% for post in posts %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endfor %}
<ul>
