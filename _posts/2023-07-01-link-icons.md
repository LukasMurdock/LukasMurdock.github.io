---
layout: post
title: 'Link Icons'
description: ''
date: 'July 01, 2023'
code: true
---

A large inspiration of this site comes from [Gwern](https://gwern.net/). I’ve long wanted to figure out and implement link icons, and thankfully he has documented the [design process](https://gwern.net/design-graveyard#link-icon-css-regexps).

The link icon implementation has three parts:
1. Built-step rules for adding HTML attributes to links
2. CSS styles targeting HTML attributes
3. JS script to get elements with HTML attributes and set inline style CSS variable

## Built-step rules for adding HTML attributes to links

This is dependent on how your site is built. For example, [the design of gwern.net](https://gwern.net/about#design) uses [Hakyll](https://jaspervdj.be/hakyll/) with [Pandoc Markdown](https://pandoc.org/) so his built step rules are scripted in a [Pandoc Haskell library](https://gwern.net/static/build/LinkIcon.hs).

As this site is built with [Jekyll](https://jekyllrb.com/), I can use the [Jekyll plugin system](https://jekyllrb.com/docs/plugins/) hooks to adjust the generated `<a>` tags with `data-link-icon` and `data-link-icon-type`.

As I don’t particularly know ruby, I based my implementation off of the [jekyll-link-attributes](https://github.com/twinsunllc/jekyll-link-attributes/blob/main/lib/jekyll-link-attributes.rb) plugin. My initial implementation is below.

```ruby
# linkIcon.rb
# Inspired by Gwern:
# - https://gwern.net/design-graveyard#problems
# - https://gwern.net/lorem#link-icons
# Plugin to add data-link-icon attribute to links
# Plugin init from: https://github.com/twinsunllc/jekyll-link-attributes/blob/main/lib/jekyll-link-attributes.rb

require 'nokogiri'

module Jekyll

  # Adjusts external links in HTML documents.
  class LinkIcons

    ICON_PATH = '/images/icons/'
    # https://gwern.net/static/build/LinkIcon.hs.html
    RULES = [
        { starts_with: '/', icon: '𝔏', type: 'text' },
        *['wikipedia', 'wikimedia', 'wiktionary', 'wikisource', 'wikimediafoundation', 'wikibooks', 'mediawiki'].map { |x| { includes: x, icon: 'wikipedia', type: 'svg' } },
        { includes: 'github.com', icon: 'github', type: 'svg' },
        { includes: 'seths.blog', icon: 'SETH', type: 'text,quad' },
        { includes: 'lesswrong.com', icon: 'LW', type: 'text' },
        { includes: 'youtu.be', icon: 'youtube', type: 'svg' },
        { includes: 'youtube.com', icon: 'youtube', type: 'svg' },
    ]


    # Perform post_render processing on the specified document/page/post
    # @param [Object] article a Jekyll document, page, or post
    def self.post_render_html(article)
      config = article.site.config
      output = Nokogiri::HTML(article.output)
      output.css('a').each do |a|
        # only set data-link-icon if the link matches a rule
        RULES.each do |rule|
            # include and starts_with are mutually exclusive
            if (rule[:starts_with] && a['href'].start_with?(rule[:starts_with])) || (rule[:includes] && a['href'].include?(rule[:includes]))
               a['data-link-icon'] ||= rule[:icon]
               a['data-link-icon-type'] ||= rule[:type]
            end
        end
      end

      article.output = output.to_s
    end

    private
  end
end

Jekyll::Hooks.register :documents, :post_render do |document|
    Jekyll::LinkIcons.post_render_html(document)
end

Jekyll::Hooks.register :pages, :post_render do |page|
    next unless page.output_ext.eql?('.html')

    Jekyll::LinkIcons.post_render_html(page)
end

Jekyll::Hooks.register :posts, :post_render do |post|
    Jekyll::LinkIcons.post_render_html(post)
end
```


## CSS styles targeting HTML attributes

The following has been cut from [Gwerns implementation](https://gwern.net/static/css/links.css).

```css
/* css/icons.css */
/* https://gwern.net/static/css/links.css */


/*=================*/
/*= COMMON STYLES =*/
/*=================*/

/*******************/
/*  Graphical icons.
*/
a[data-link-icon-type='svg']::after {
    --link-icon-size: 0.5em;
    --link-icon-offset-x: 0.20em;
    --link-icon-offset-y: 0.25em;

    content: "";
    position: static;
    padding: 0 var(--link-icon-size) 0 0;
    margin: 0 0 0 var(--link-icon-offset-x);
    background-image: var(--link-icon-url);
    background-size: var(--link-icon-size);
    background-position-x: center;
    background-position-y: var(--link-icon-offset-y);
    background-repeat: no-repeat;
    opacity: 0.6;
}
a[data-link-icon-type='svg']:hover::after {
    opacity: 0.3;
}

/*****************/
/*  Textual icons.
*/
a[data-link-icon-type*='text']::after {
    --link-icon-size: 0.75em;
    --link-icon-offset-x: 0.125em;
    --link-icon-offset-y: 0.25em;
    --link-icon-font-serif: Noto Emoji, Quivira, var(--GW-serif-font-stack);
    --link-icon-font-sans: Noto Emoji, Quivira, var(--GW-sans-serif-font-stack);
    --link-icon-font-mono: Noto Emoji, Quivira, var(--GW-monospaced-font-stack);

    content: var(--link-icon);
    font-size: var(--link-icon-size);
    font-weight: 600;
    font-style: normal;
    /* font-family: var(--link-icon-font-serif); */
    margin: 0 0 0 var(--link-icon-offset-x);
    vertical-align: baseline;
    position: relative;
    bottom: var(--link-icon-offset-y);
    opacity: 0.83;
    padding: 0;
    background-image: none;
    background-size: unset;
    line-height: 1;
    overflow-wrap: normal;
}
a[data-link-icon-type*='sans']::after {
    font-family: var(--link-icon-font-sans);
}

/*===========================================*/
/*= ICONS FOR CERTAIN LINK TYPES: BY TARGET =*/
/*===========================================*/


/*=----------------------------=*/
/*= Within-page (anchor) links =*/
/*=----------------------------=*/

a[data-link-icon='¶']::after {
    --link-icon-size: 0.75em;
    --link-icon-offset-y: 0.45em;
    --link-icon-offset-x: 0.2em;

    font-weight: normal;
    opacity: 0.7;
}

/*=------------------------------=*/
/*= Internal (within-site) links =*/
/*=------------------------------=*/

a[data-link-icon='𝔏']::after {
    --link-icon-size: 0.9em;
    --link-icon-offset-y: 0.15em;
    --link-icon-offset-x: 0.12em;

    opacity: 0.75;
}

/*=-------------------------------=*/
/*= Textual per-domain link icons =*/
/*=-------------------------------=*/

/****************************/
/* Triple-letter 'tri' initials: too few for quad, but too big for
   regular font size/offset. Common with TLA orgs. */
   a[data-link-icon-type*='tri']::after {
    --link-icon-size: 0.65em;
    --link-icon-offset-y: 0.4em;
    --link-icon-offset-x: 0.2em;

    opacity: 0.90;
}

/****************************/
/*  Quad-letter 'quad' square icons.
*/
a[data-link-icon-type*='quad']::after {
    text-indent: 0;
    overflow-wrap: break-word;
    display: inline-block;
    text-align: center;
    left: 0;
    bottom: 0.3em;
    font-size: 0.52em;
    font-weight: bold;
    line-height: 0.8;
    width: 1.5em;
    opacity: 0.83;
}

/*  Quad-letter square icons in a sans face.
*/
a[data-link-icon-type*='quad'][data-link-icon-type*='sans']::after {
    margin: 0;
}

/*  Quad-letter square icons in a monospace face.
*/
a[data-link-icon-type*='quad'][data-link-icon-type*='mono']::after {
    letter-spacing: 0.05em;
    line-height: 0.85;
}

/*=---------------------------------=*/
/*= Graphical per-domain link icons =*/
/*=---------------------------------=*/

a[data-link-icon='github']::after {
    --link-icon-size: 0.75em;
    --link-icon-offset-x: 0.15em;
    --link-icon-offset-y: 0.2em;

    opacity: 0.65;
}

a[data-link-icon='wikipedia']::after {
    --link-icon-size: 0.8em;
    --link-icon-offset-x: 0.05em;
    --link-icon-offset-y: 0.25em;

    opacity: 0.9;
}
a[data-link-icon='wikipedia']:hover::after {
    opacity: 0.5;
}

a[data-link-icon='youtube']::after {
    --link-icon-size: 0.88em;
    --link-icon-offset-x: 0.15em;
    --link-icon-offset-y: 0.25em;

    opacity: 0.5;
}
a[data-link-icon='youtube']:hover::after {
    opacity: 0.2;
}

```


## JS script to get elements with HTML attributes and set inline style CSS variable

I later found Gwerns implementation in [rewrite.js](https://gwern.net/static/js/rewrite.js) (Search for `a[data-link-icon]`) Below is my implementation.

The idea is:
1. Grab all elements on the document with the attribute `[data-link-icon]`
2. For every item
    1. Get the `data-link-icon` and `data-link-icon-type` attributes
    2. If the `data-link-icon-type` is `svg`, then set the style property to `--link-icon-url: url(/images/icons/${iconName}.svg)`, else set it to be `--link-icon: "${iconName}"`

```js
// js/icons.js
function setIcons() {
    const linkIcons = document.querySelectorAll('[data-link-icon]');
    for (let i = 0; i < linkIcons.length; i++) {
        const linkIconEl = linkIcons[i];
        const iconName = linkIconEl.getAttribute('data-link-icon');
        const iconType = linkIconEl.getAttribute('data-link-icon-type');
        if (iconType === 'svg') {
            linkIconEl.style.setProperty('--link-icon-url', `url(/images/icons/${iconName}.svg)`);
        } else {
            linkIconEl.style.setProperty('--link-icon', `"${iconName}"`);
        }
    }
}

window.addEventListener('load', setIcons);
```
