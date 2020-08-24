---
layout: post
title: 'Adding Schema Markup'
description: How I implemented structured data for this site.
date: May 04, 2020
code: true
---

Schema markup has eluded me for the better part of a year now. It’s included jargon just seemed too befuddled for me to dive into. This post is about me fixing that and hopefully illuminating somethings for you along the way.

First, I’ve never seen the word Schema before and have no model of what it means. Schema is an outline applicable to a general conception; as, five dots in a line are a schema of the number five.

That helps, kinda?

Schema markup tells search engines (i.e. Google) what your data says and means. This data is also referred to as “structured data.”

Google defines structured data as:
> a standardized format for providing information about a page and classifying the page content; for example, on a recipe page, what are the ingredients, the cooking time and temperature, the calories, and so on.”


While HTML tags allow you to define objects like headers `<h1>Lukas Murdock<\h1>`, Schema allows you to define that header as a Person with extra information tied to that person (this extra information is referred to as properties):

* An additional name
* Address
* Organization affiliation
* Organization alumni
* Award
* Birthday
* Birth place
* Brand
* Callsign
* Children
* Colleague
* Contact point
* Death date
* Death place
* DUNS number
* Email
* Family name
* Fax number
* Follows
* Funder
* Gender
* Given name
* GLN/ILN number
* Educational Credential
* Occupation
* Available Offer Catalog
* Has Point of Sales (POS)
* Height
* Home location
* Honorific Prefix (Dr/Mrs/Mr)
* Honorific Suffix (M.D./PhD)
* Job Title
* Knows
* Knows about
* Knows language
* Member of
* NAICS code
* Nationality
* Net worth
* Owns
* Parent
* Performer in
* Publishing principles
* Related to
* Seeks
* Sibling
* Sponsor
* Spouse
* Tax ID
* Telephone
* Weight
* Work Location
* Works for

Schema can get… quite detailed… Schema powers Google Knowledge graphs [among many other search features](https://support.google.com/webmasters/answer/7358659), the information presented in a box next to Search results.


There are 3 primary ways of implementing Schema markup:
1. Resource Descriptive Framework in Attributes (RDFa)
2. Micro data
3. JSON-LD (Recommended)

**RDFa**  
This method nests structured data into corresponding HTML tag attributes to name properties.

**Microdata**  
This method is similar to the RDFa method where HTML tag attributes embed metadata. It seems to just have different attributes and I’m not quite sure on the difference but it doesn’t matter because you should use the next one.

**JSON-LD (preferred)**  
This method uses JSON in a `<script>` tag in the page head or body to declare schema markup. This provides a better experience as it’s not woven into HTML, making nested data easier to express.
<span class="full-underline" style="font-size: var(--font-small);">Google recommends using JSON-LD for structured data whenever possible.</span>  

<span style="font-size: 12px;">Note: JSON-LD stands for Javascript Object Notation for Linked Objects</span>

While you can add structured data with Google Tag Manager, it’s better to embed structured data directly on the page—as advised by Google’s [John](https://www.reddit.com/r/bigseo/comments/as8hce/does_google_read_hidden_html_content/egsip6s/) [Mueller](https://www.reddit.com/r/TechSEO/comments/aqf1u1/implementing_schema_via_gtm_vs_onsite_php/egg2467/).

Now let’s add some structured data! First we’ll need to decide on what structured data to use.

[CreativeWork > Article](https://schema.org/Article): An article, such as a news article or piece of investigative report. Newspapers and magazines have articles of many different types and this is intended to cover them all.

[CreativeWork > Article > SocialMediaPosting](https://schema.org/SocialMediaPosting): A post to a social media platform, including blog posts, tweets, Facebook posts, etc.

[CreativeWork > Article > SocialMediaPosting > BlogPosting](https://schema.org/BlogPosting): A blog post.

It looks like BlogPosting is the Schema entity of choice. Interestingly enough the BlogPosting Schema Entity has experienced a significant uptick in adoption during the COVID-19 quarantines.


<figure class="blog-figure image component image-big image-fullbleed body-copy-wide">
<img class="picture-image" src="/images/posts/schema-markup-blogposting.png" alt="">
<figcaption class="image-text">BlogPosting Schema increased adoption during COVID-19 quarantine.</figcaption>
</figure>



With this we can define:
* mainEntityOfPage
* Headline
* Image
* Date Published
* Date Created
* Date Modified
* Author
* Description
* Article Body
* Description
* Genre
* Keywords
* Word count
* URL
* inLanguage


I’ll be using [jsonld.com](https://jsonld.com/blog-post/) for a template for BlogPosting Schema markup. As this site is [built with Jekyll]({{site.baseurl}}/about-this-website/) I can use tags provided by Jekyll to automatically generate the structured data.

First I’ll create an if statement in the `<head>` tag to include  a `postSchema.html` file if the page is a post. Then in the `postSchema.html` I can format all the post schema!

{% highlight HTML %}
{% raw %}
<script type="application/ld+json">
    { "@context": "https://schema.org", 
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://lukasmurdock.com/writing/"
      },
        "headline": "{{ page.title }}",
        "url": "https://lukasmurdock.com/{{ page.url }}",
        "datePublished": "{{ page.date }}",
        "dateModified": "{% if page.last_modified_at %}{{page.last_modified_at}}{% else %}{{page.date}}{% endif %}",
        "image": "{% if page.image %}{{page.image}}{% endif %}",
        "author": {
            "@type": "Person",
            "name": "Lukas Murdock",
            "description": "Lukas Murdock is a human trying to do work that matters for people who care. Exploring design, development, and marketing.",
            "sameAs": [
                "https://www.linkedin.com/in/lukas-murdock/",
                "https://twitter.com/MurdockLukas",
                "https://github.com/LukasMurdock",
                "https://www.facebook.com/lukas.rex.murdock",
                "https://www.instagram.com/lukasauras.rex/",
                "https://www.youtube.com/channel/UCG8ZhvCtKlnPXkoJG2u52lw"
                ],
            "image": {
                "@type": "ImageObject",
                "url": "https://lukasmurdock.com/images/LM-portrait.jpg"
            },
            "givenName": "Lukas",
            "familyName": "Murdock",
            "publishingPrinciples": "https://lukasmurdock.com/",
            "email": {{ site.email | jsonify }}
        },
        "publisher": {
            "@type": "Organization",
            "name": "Lukas Murdock",
            "url": "https://lukasmurdock.com/",
            "logo": {
              "@type": "ImageObject",
              "width": 60,
              "height": 60,
              "url": "https://lukasmurdock.com/android-chrome-512x512.png"
            }
          },
        "description": "{{ page.description }}",
        "articleBody": {{ page.content | strip_html | jsonify }},
        {% if page.tags and page.tags !=  blank %}"keywords": {{ page.tags | join: ',' | jsonify }},{% endif %}
        "wordcount": "{{ page.content | number_of_words }}",
        "inLanguage": "en-US"
    }
</script>
{% endraw %}
{% endhighlight%}

I went back and forth from the view-source page and [The Google Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/) to make sure I was doing things right. This tests the structured data for usability within [Google Search](https://developers.google.com/search/docs/guides/search-gallery).

The Google Structured Data Testing Tool flags my posts with a warning and error because I don’t include images, however this just means that Google recommends an image property for Non-AMP [Article Rich Snippets](https://developers.google.com/search/docs/data-types/article). Note that for AMP pages the image property is required. Now I see why people use random stock photos for every single post, Google! Alas, I decline. The Schema data is perfectly valid.

Next is setting up Person schema, I can exist! This was a little tricky and took me some searching around to figure out how to use both in the same `<script>` call. Turns out there is a `@graph` function that I discovered from [this blog post]() that says it best:
> [it’s] just a way of leveraging JavaScript’s existing array capabilities to allow a single JSON-LD graph to describe multiple smaller graphs, in much the same way that an array can contain other arrays, or an object can contain other objects.”

I removed the `<script>` tags from `postSchema.html` and the structured data with Jekyll templating now looks like this:

{% highlight HTML %}
{% raw %}

<script type="application/ld+json">
    {
      "@context": "http://www.schema.org",
      "@graph":
      [
        {
          "@type": "person",
          "name": "Lukas Murdock",
          "url": "https://lukasmurdock.com/",
          "birthDate": "2000-12-09",
          "gender": "male",
          "jobTitle": "Marketing Strategy Consultant",
          "image": "https://lukasmurdock.com/images/LM-portrait.jpg",
          "description": "Lukas Murdock is a human trying to do work that matters. Exploring design, development, and marketing.",
          "sameAs": [
            "https://www.linkedin.com/in/lukas-murdock/",
            "https://twitter.com/MurdockLukas",
            "https://github.com/LukasMurdock",
            "https://www.facebook.com/lukas.rex.murdock",
            "https://www.instagram.com/lukasauras.rex/",
            "https://www.youtube.com/channel/UCG8ZhvCtKlnPXkoJG2u52lw"
            ],
          "email": "lukas.murdock@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Columbus",
            "addressRegion": "Ohio",
            "postalCode": "43035",
            "addressCountry": "USA"
            }
        }

  {% if page.layout == 'post' %}
    ,{% include postSchema.html %}
  {% endif %}
]}
</script>

{% endraw %}
{% endhighlight%}

I’ll update after committing and further testing.