---
layout: post
title: The Poem Collection
description: A collection of poems.
---

{% assign posts = site.posts | where: "tags","poem" %}
<ul>
{% for post in posts %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endfor %}
<ul>
