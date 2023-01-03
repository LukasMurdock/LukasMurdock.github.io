---
layout: post
title: The Dev Collection
description: A collection of posts on development.
---

{% assign posts = site.posts | where: "tags","dev" %}
<ul>
{% for post in posts %}
<li><a href="{{post.url}}">{{post.title}}</a></li>
{% endfor %}
<ul>
