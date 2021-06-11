---
layout: page
title: When Did You Last Do Something For The First Time?
description: ""
last_modified_at: 2021-06-10T23:26:14-0400
---

<span style="font-size: 12px;">Last Updated: {{ page.last_modified_at | date: '%B %d, %Y' }}</span>

{% for item in site.data.forTheFirstTime %}
<div class="card-note" id="{{ item.date | url_encode }}">
  {{ item.forThefirstTime | markdownify }}
  <time>{{ item.date }}</time>
</div>
{% endfor %}

<style>
.card-note {
  padding: 16px 16px 12px 16px;
  background-color: #ffffff;
  border-width: 1px;
  border-color: rgb(196, 207, 214);
  border-radius: 12px;
  font-size: 20px;
  margin-bottom: 10px;
  overflow: hidden;
}

.card-note p {
  margin: 0;
  padding: 0;
}

.card-note time {
  color: rgb(91, 112, 131);
  font-size: 15px;
}

.card-note pre {
  overflow: scroll;
}

</style>
