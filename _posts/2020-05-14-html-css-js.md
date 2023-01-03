---
layout: post
title: 'HTML, CSS, and JS'
description:  Starting Web Development Part 01
date: May 14, 2020
code: true
tags: dev
---

This is part one of the series *Starting Web Development*. Best viewed in a browser.

In this series I hope to walk through the basics of learning web development. As a first-step, we’ll be starting with some background context.


Sometime in the ’90s, Sir Tim Berners-Lee invented **Hypertext Markup Language (HTML)** as a way to provide instruction (markup) for browsers on how to display elements. [HTML5 is the latest version of the standard that defines HTML](https://html.spec.whatwg.org/multipage/), with new elements, attributes, and behaviors.

{% highlight HTML %}
<h1>HTML, CSS, and JS</h1>
<h2>Starting Web Development Part 01</h2>
<p>Sometime in the ’90s Sir Tim Berners-Lee invented…</p>
{% endhighlight %}

Soon after, Håkon Wium Lie, who worked with Tim Berners-Lee, proposed **Cascading Style Sheets (CSS)** as a way to add styling (e.g. fonts, color, spacing) to HTML elements. All current [CSS specifications have their own specific versions ranging from 1 to 4](https://www.w3.org/Style/CSS/current-work), but CSS as a whole does not have a version. Both HTML and CSS existed in some form since Standard Generalized Markup Language (SGML) which came out of the ’80s.

{% highlight HTML %}
<h1 style="font-weight: 600; margin-bottom: 20px;">HTML, CSS, and JS</h1>
<h2 style="line-height: 1.2;">Starting Web Development Part 01</h2>
<p>Sometime in the ’90s Sir Tim Berners-Lee invented…</p>
{% endhighlight %}

Around the same time (mid-90’s) Brandon Eich created **JavaScript (JS)** at Netscape. It was originally named Mocha, then renamed to LiveScript until Netscape and Sun Microsystems (now Oracle) came to a license agreement to name it JavaScript. Before Netscape allowed the name JavaScript the language was submitted to ECMA International to standardize the language for computer systems. So the standardized language is called ECMAScript—JavaScript and ECMAScript are not different languages but Java is an entirely different language. From 2015 ECMAScript is named by year ([ECMAScript 2021](https://tc39.es/ecma262/)).

A website is simply a collection of HTML files containing content with HTML tags that tell browsers how to display that content and links pointing to CSS and JS files.

{% highlight HTML %}
<!DOCTYPE html>
<html lang='en'>

  <head>
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
    <script src="/js/script.js"></script>
  </head>

  <h1 style="font-weight: 600; margin-bottom: 20px;">HTML, CSS, and JS</h1>
  <h2 style="line-height: 1.2;">Starting Web Development Part 01</h2>
  <p>Sometime in the ’90s Sir Tim Berners-Lee invented…</p>

</html>
{% endhighlight %}
